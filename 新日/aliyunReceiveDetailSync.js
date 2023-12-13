// 发送请求，收货明细单条入库同步
var SYSTEM_ID = "_id";
var SYSTEM_MODEL = "_modelUniqueKey";
var SYSTEM_VERSION = "_version";
var SYSTEM_CONTENT = "content";
var RECEIVE_TO_SUB_ALIAS = "item_tab";
var RECEIVE_SUB_MODEL_UK = "f6cfcc04835444f39ee10901b2a6dcdb";
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

    var subCreateItem = {};
    for (var subItemKey in recieveDetailDataDto) {
        console.log("subQueryKey is " + subItemKey);
        if (subItemKey !== SUB_TO_MAJOR_TAG && subItemKey !== 'sendParam' && subItemKey !== 'podetail') {
            subCreateItem[subItemKey] = recieveDetailDataDto.get(subItemKey);
        }
    }
    var subCreateList = [];
    subCreateList.push(subCreateItem);
    
    var createDataList = [];

    var createData = {};
    createData[RECEIVE_TO_SUB_ALIAS] = subCreateList;
    var date = new Date();
    var yy = date.getFullYear();
    var mm = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var dd = date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate();
    var hh = date.getHours() < 10 ? '0'+ date.getHours() : date.getHours();
    var mi = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    createData[MAJOR_CREATE_DATE] = yy +''+ mm + '' + dd;
    createData[MAJOR_CREATE_TIME] = hh +''+ mi +''+ ss;
    // 主表主数据
    var majorDataMap = recieveDetailDataDto.get('param');
    createData[MAJOR_ZVBELN_SRM] = majorDataMap[MAJOR_ZVBELN_SRM];
    
    createDataList.push(createData);

    var cancelDataList = [];
    // 请求参数
    var createRequest = {
        "goodsmvt_cancel" : cancelDataList,
        "goodsmvt_create" :createDataList
    };

    var timestamp = date.getTime();
    var signMap = {
        'requestBody': createRequest,
        'timestamp' : timestamp
    }

    var signValue = tools.sign(context, REQUEST_SIGN_API_NAME, signMap);

    var requestHeader = {
        "XR-CLIENT-ID" : "HYPER",
        "XR-TIMESTAMP" : timestamp,
        "XR-SIGN" : signValue
    };

    console.log("request header is " + JSON.stringify(requestHeader));
    console.log("receive createData is " + JSON.stringify(createRequest));
    var response;
    console.log("preview is " + preview);
    if (preview === 'false') {
        response = httpClient.exchange(PRO_REQUEST_API, 'POST', requestHeader, JSON.stringify(createRequest));
    } else {
        response = httpClient.exchange(REQUEST_API, 'POST', requestHeader, JSON.stringify(createRequest));
    }
    console.log("response is " + response);

    if (!response) {
        result = {'success': false, 'code': '40001','message': 'supplier response is null. modelUK ' + RECEIVE_SUB_MODEL_UK};
        break; 
    }

    dataRepository.begin(context);

    var responseMap = JSON.parse(response);
    console.log("responseMap is " + JSON.stringify(responseMap));
    // 直接判断返回结果中create result 单条明细
    var errorMsgList = [];
    if (responseMap[RESPONSE_RESULT]) {
        let responseResult = responseMap[RESPONSE_RESULT];
        
        let createResultList = [];
        createResultList = responseResult[RESPONSE_CREATE_RESULT];
        console.log("response createResultList is " + JSON.stringify(createResultList));
        if (createResultList) {
            // 拼接请求itemMap
            var subItemMap = {};
            for (let subItemIndex in subCreateList) {
                let subItem = subCreateList[subItemIndex];
                subItemMap[subItem[SUB_PRIMARY_TAG]] = subItem;
            }
            for (let subResultIndex in createResultList) {
                let subResultItem = createResultList[subResultIndex];
                if (subResultItem['msg_type'] === 'S') {
                    console.log("subResultItem is " + JSON.stringify(subResultItem));
                    let subItemUpdate = subItemMap[subResultItem[SUB_PRIMARY_TAG]];
                    var updateItem = {};
                    updateItem['mblnr'] = subResultItem['mblnr'];
                    updateItem['mjahr'] = subResultItem['mjahr'];
                    updateItem['zeile'] = subResultItem['zeile'];
                    updateItem[SYSTEM_ID] = subItemUpdate[SYSTEM_ID];
                    updateItem[SYSTEM_MODEL] = subItemUpdate[SYSTEM_MODEL];
                    updateItem[SYSTEM_VERSION] = subItemUpdate[SYSTEM_VERSION]
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
        result = {'success': false, 'code': '40003','message': "receive order create error."};
        dataRepository.commit(context);
        break;
    }

    var res = dataRepository.commit(context);
    if (res) {
        if (errorMsgList.length > 0) {
            result = {'success': false, 'code': '40001', 'message': JSON.stringify(errorMsgList)};
        } else {
            result = {'success': true, 'code': '200'};
        }
    } else {
        result = {'success': false, 'code': '40002','message': 'transaction commit execute error. modelUK ' + RECEIVE_SUB_MODEL_UK};
    }
} while (false);

result