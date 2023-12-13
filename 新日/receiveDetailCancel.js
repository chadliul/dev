// 发送请求，收货明细单条取消SAP结果, 当前单条行记录进行取消
var SYSTEM_ID = "_id";
var SYSTEM_MODEL = "_modelUniqueKey";
var SYSTEM_VERSION = "_version";
var SYSTEM_CONTENT = "content";
var RECEIVE_TO_SUB_ALIAS = "item_tab";
var RECEIVE_SUB_MODEL_UK = "9a8b63215e1f41bc8abb211d1c97456e";
var SYSTEM_ITEMS_TAG = "items";
var MAJOR_ZVBELN_SRM = "zvbeln_srm";
var MAJOR_CREATE_DATE = "create_date";
var MAJOR_CREATE_TIME = "create_time";
var SUB_TO_MAJOR_TAG = "param";
var CREATE_SUB_TAG = "item_tab";
var REQUEST_SIGN_API_NAME = "sendApi";
var RESPONSE_CREATE_RESULT = "create_result";
var RESPONSE_CANCEL_RESULT = "cancle_result";
var SUB_PRIMARY_TAG = "zposnr_srm";
var RESPONSE_RESULT = "result";
var REQUEST_API = "http://gateway.xinri.com:9233/test/centre/csrm/srm008";
var PRO_REQUEST_API = "http://gateway.xinri.com:9233/pro/centre/csrm/srm008";

var requestData = args.request.data;
var result;
var preview = args.preview;

do { 

    // 唯一标识，不存在则返回
    if (!requestData[SYSTEM_ID]) {
        result = {'success': false, 'code': '40001','message': 'dataId value is null. modelUK ' + RECEIVE_SUB_MODEL_UK};
        break; 
    }
    
    console.log("current id is " + requestData[SYSTEM_ID]);
    // dataid查询明细
    var receiveDetailQueryRes = dataQuery.findById(context, RECEIVE_SUB_MODEL_UK, requestData[SYSTEM_ID]);
    var recieveDetailDataDto = receiveDetailQueryRes.get(SYSTEM_CONTENT);
    if (recieveDetailDataDto == null || recieveDetailDataDto.size() == 0) {
        result = {'success': false, 'code': '40001','message': 'receive detial order alias data is null. modelUK ' + RECEIVE_SUB_MODEL_UK};
        break; 
    }

    var cancelData = {};
    var date = new Date();
    var yy = date.getFullYear();
    var mm = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var dd = date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate();
    var hh = date.getHours() < 10 ? '0'+ date.getHours() : date.getHours();
    var mi = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    cancelData['cancel_date'] = yy +''+ mm + '' + dd;
    cancelData['cancel_time'] = hh +''+ mi +''+ ss;
    cancelData['mblnr'] = recieveDetailDataDto['mblnr'];
    cancelData['mjahr'] = recieveDetailDataDto['mjahr'];
    cancelData['zeile'] = recieveDetailDataDto['zeile'];

    
    var cancelDataList = [];
    cancelDataList.push(cancelData);

    var createDataList = [];
    // 请求参数
    var cancelRequest = {
        "goodsmvt_cancel" : cancelDataList,
        "goodsmvt_create" :createDataList
    };

    var timestamp = date.getTime();
    var signMap = {
        'requestBody': cancelRequest,
        'timestamp' : timestamp
    }

    var signValue = tools.sign(context, REQUEST_SIGN_API_NAME, signMap);
    console.log("sign is " + signValue);

    var requestHeader = {
        "XR-CLIENT-ID" : "HYPER",
        "XR-TIMESTAMP" : timestamp,
        "XR-SIGN" : signValue
    };

    console.log("request header is " + JSON.stringify(requestHeader));
    console.log("receive createData is " + JSON.stringify(cancelRequest));
    var response;
    if (preview === 'false') {
        response = httpClient.exchange(PRO_REQUEST_API, 'POST', requestHeader, JSON.stringify(cancelRequest));
    } else {
        response = httpClient.exchange(REQUEST_API, 'POST', requestHeader, JSON.stringify(cancelRequest));
    }
    console.log("response is " + response);

    if (!response) {
        result = {'success': false, 'code': '40001','message': 'supplier response is null. modelUK ' + RECEIVE_SUB_MODEL_UK};
        break; 
    }

    dataRepository.begin(context);

    var responseMap = JSON.parse(response);
    console.log("responseMap is " + JSON.stringify(responseMap));
    var errorMsgList = [];
    // 直接判断返回结果中create result 单条明细
    if (responseMap[RESPONSE_RESULT]) {
        let responseResult = responseMap[RESPONSE_RESULT];
        console.log("response result is " + JSON.stringify(responseResult));
        
        let cancelResultList = [];
        cancelResultList = responseResult[RESPONSE_CANCEL_RESULT];
        console.log("response cancelResultList is " + JSON.stringify(cancelResultList));
        if (cancelResultList) {
            // 理论上只有单条，先做数组循环操作
            for (let subResultIndex in cancelResultList) {
                let subResultItem = cancelResultList[subResultIndex];
                if (subResultItem['msg_type'] === 'S') {
                    console.log("subResultItem is " + JSON.stringify(subResultItem));
                    var updateItem = {};
                    updateItem['mblnr'] = "";
                    updateItem['mjahr'] = "";
                    updateItem['zeile'] = "";
                    updateItem[SYSTEM_ID] = recieveDetailDataDto[SYSTEM_ID];
                    updateItem[SYSTEM_MODEL] = recieveDetailDataDto[SYSTEM_MODEL];
                    updateItem[SYSTEM_VERSION] = recieveDetailDataDto[SYSTEM_VERSION]
                    console.log("updateItem is " + JSON.stringify(updateItem));
                    // todo 状态变成审核成功
                    dataRepository.update(context, RECEIVE_SUB_MODEL_UK, updateItem[SYSTEM_ID], updateItem);
                } else {
                    errorMsgList.push(subResultItem);
                }
            }
        }

    } else {
        // 可以忽略
        result = {'success': false, 'code': '400', 'messate':  "receive order detail cancel error."};
        dataRepository.commit(context);
        break;
    }

    var res = dataRepository.commit(context);
    if (res) {
        if (errorMsgList.length > 0) {
            result = {'success': false, 'code': '40001', 'message': JSON.stringify(errorMsgList)};
        } else {
            result = {'success': true, 'code': '200', 'message': "cancel success."}
        }
    } else {
        result = {'success': false, 'code': '40002','message': 'transaction commit execute error. modelUK ' + RECEIVE_SUB_MODEL_UK};
    }
} while (false);
result