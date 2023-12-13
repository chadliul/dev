// 发送请求，收货单
var RECEIVE_MODEL_UK = "b627c7ca4ee349dc848aff2a13353622";
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
        result = {'success': false, 'code': '40001','message': 'dataId value is null. modelUK ' + RECEIVE_MODEL_UK};
        break; 
    }
    
    console.log("current id is " + requestData[SYSTEM_ID]);
    // dataid查询主表
    var receiveQueryRes = dataQuery.findById(context, RECEIVE_MODEL_UK, requestData[SYSTEM_ID]);
    var recieveDataDto = receiveQueryRes.get(SYSTEM_CONTENT);
    if (recieveDataDto == null || recieveDataDto.size() == 0) {
        result = {'success': false, 'code': '40001','message': 'receive orders alias data is null. modelUK ' + RECEIVE_MODEL_UK};
        break; 
    }
    
    var createData = {};
    var subItemIdList = [];
    if (recieveDataDto.get(MAJOR_ZVBELN_SRM) != null) {
        createData[MAJOR_ZVBELN_SRM] = recieveDataDto.get(MAJOR_ZVBELN_SRM);
    }
    if (recieveDataDto.get(MAJOR_CREATE_DATE) != null) {
        // todo
        var date = new Date(recieveDataDto.get(MAJOR_CREATE_DATE).get('start'));
        var yy = date.getFullYear();
        var mm = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
        var dd = date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate();
        var hh = date.getHours() < 10 ? '0'+ date.getHours() : date.getHours();
        var mi = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        createData[MAJOR_CREATE_DATE] = yy +''+ mm + '' + dd;
        createData[MAJOR_CREATE_TIME] = hh +''+ mi +''+ ss;
    }
    if (recieveDataDto.get(RECEIVE_TO_SUB_ALIAS) != null) {
        var itemsMap = recieveDataDto.get(RECEIVE_TO_SUB_ALIAS);
        var itemsList = itemsMap.get(SYSTEM_ITEMS_TAG);
        if (itemsList != null && itemsList.size() > 0) {
            for (var index in itemsList) {
                var idMap = itemsList.get(index);
                console.log("sub id is " + idMap.get(SYSTEM_ID));
                subItemIdList.push(idMap.get(SYSTEM_ID));
            };
        } 
    }

    var subItemList = [];
    if (subItemIdList.length) {
        console.log("subItemIdList is " + JSON.stringify(subItemIdList))
        var subQueryRes = dataQuery.findByIds(context, RECEIVE_SUB_MODEL_UK, subItemIdList);
        var subQueryList = subQueryRes.get(SYSTEM_CONTENT);
        if (subQueryList != null && subQueryList.size() > 0) {
            for (var index in subQueryList) {
                var subQueryItem = subQueryList.get(index);
                var subCreateItem = {};
                for (var subQueryKey in subQueryItem) {
                    console.log("subQueryKey is " + subQueryKey);
                    if (subQueryKey !== SUB_TO_MAJOR_TAG && subQueryKey !== 'sendParam' && subQueryKey !== 'podetail') {
                        subCreateItem[subQueryKey] = subQueryItem.get(subQueryKey);
                    }
                }
                console.log("subCreateItem is " + JSON.stringify(subCreateItem));
                subItemList.push(subCreateItem);
            }
        }
    }
    createData[CREATE_SUB_TAG] = subItemList;

    var subCancelList = [];

    var createDataList = [];
    createDataList.push(createData);

    // 请求参数
    var requestCreateData = {
        "goodsmvt_cancel" : subCancelList,
        "goodsmvt_create" : createDataList
    };

    var timestamp = new Date().getTime();
    var signMap = {
        'requestBody': requestCreateData,
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
    console.log("receive createData is " + JSON.stringify(requestCreateData));
    var response;
    if (preview === 'false') {
        response = httpClient.exchange(PRO_REQUEST_API, 'POST', requestHeader, JSON.stringify(requestCreateData));
    } else {
        response = httpClient.exchange(REQUEST_API, 'POST', requestHeader, JSON.stringify(requestCreateData));
    }
    
    console.log("response is " + response);

    if (!response) {
        result = {'success': false, 'code': '40001','message': 'supplier response is null. modelUK ' + RECEIVE_MODEL_UK};
        break; 
    }

    dataRepository.begin(context);

    var responseMap = JSON.parse(response);
    console.log("responseMap is " + JSON.stringify(responseMap));
    // 直接判断返回结果中create result 单条明细
    var errorMsgList = [];
    if (responseMap[RESPONSE_RESULT]) {
        let responseResult = responseMap[RESPONSE_RESULT];
        console.log("response result is " + JSON.stringify(responseResult));
        
        let createResultList = [];
        createResultList = responseResult[RESPONSE_CREATE_RESULT];
        console.log("response createResultList is " + JSON.stringify(createResultList));
        if (createResultList) {
            // 拼接请求itemMap
            var subItemMap = {};
            for (let subItemIndex in subItemList) {
                let subItem = subItemList[subItemIndex];
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
        result = {'success': false, 'code': '40002','message': 'transaction commit execute error. modelUK ' + RECEIVE_MODEL_UK};
    }
} while (false);

result