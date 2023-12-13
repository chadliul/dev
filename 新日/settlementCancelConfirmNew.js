// 发送请求，结算单取消确认
var SETTLEMENT_MODEL_UK = "ec21b3384f564a5696a268fec7dfec40";
var SETTLEMENT_PRIMARY_TAG = "kptz";
var SYSTEM_MODEL = "_modelUniqueKey";
var SYSTEM_ID = "_id";
var SYSTEM_CONTENT = "content";
var SYSTEM_VERSION = "_version";
var REQUEST_SIGN_API_NAME = "sendApi";
var REQUEST_API = "http://gateway.xinri.com:9233/test/centre/csrm/srm009";
var PRO_REQUEST_API = "http://gateway.xinri.com:9233/pro/centre/csrm/srm009";
var RESPONSE_CODE = "code";
var RESPONSE_RESULT = "result";
var RESPONSE_SUCCESS = "000";

var requestData = args.request.data;
var result;
var preview = args.preview;

// 枚举需要特殊处理
do {
    var createFlag = true; 

    // 唯一标识，不存在则返回
    if (!requestData[SYSTEM_ID]) {
        result = {'success': false, 'code': '40001','message': 'dataId value is null. modelUK ' + SETTLEMENT_MODEL_UK};
        break; 
    }
    
    // dataid查询主表
    var settlementAliasRes = dataQuery.findById(context, SETTLEMENT_MODEL_UK, requestData[SYSTEM_ID]);
    var settlementAliasDto = settlementAliasRes[SYSTEM_CONTENT];
    if (settlementAliasDto === void 0 ) {
        result = {'success': false, 'code': '40001','message': 'settlement alias data is null. modelUK ' + SETTLEMENT_MODEL_UK};
        break; 
    }
 
    // 拼装request
    let settlemntRequestDto = {};
    settlemntRequestDto['confirmed'] = null;
    settlemntRequestDto[SETTLEMENT_PRIMARY_TAG] = settlementAliasDto.get(SETTLEMENT_PRIMARY_TAG);
    
    
    var timestamp = new Date().getTime();
    var signMap = {
        'requestBody': settlemntRequestDto,
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
    console.log("settlementRequestDto is " + JSON.stringify(settlemntRequestDto));
    var response;
    if (preview === 'true') {
        response = httpClient.exchange(REQUEST_API, 'POST', requestHeader, JSON.stringify(settlemntRequestDto));
    } else {
        response = httpClient.exchange(PRO_REQUEST_API, 'POST', requestHeader, JSON.stringify(settlemntRequestDto));
    }
    console.log("response is " + response);

    if (!response) {
        result = {'success': false, 'code': '40001','message': 'settlement response is null. modelUK ' + SETTLEMENT_MODEL_UK};
        break; 
    }
    var responseMap = JSON.parse(response);
    if (responseMap[RESPONSE_CODE] === void 0 || responseMap[RESPONSE_CODE] != RESPONSE_SUCCESS) {
        result = {'success': false, 'code': '40001','message': response};
        break;
    }

    dataRepository.begin(context);

    var updateMap = {
        SYSTEM_ID : requestData[SYSTEM_ID],
        SYSTEM_MODEL : requestData[SYSTEM_MODEL]

    }
    if (settlementAliasDto[SYSTEM_VERSION]) {
        updateMap[SYSTEM_VERSION] = settlementAliasDto[SYSTEM_VERSION];
    }
    
    if (responseMap[RESPONSE_CODE] === RESPONSE_SUCCESS) {
        updateMap['confirmed'] = "对账已取消确认";
    
        // todo 状态变成审核成功
        dataRepository.update(context, SETTLEMENT_MODEL_UK,requestData[SYSTEM_ID], updateMap);
    }

    var res = dataRepository.commit(context);
    if (res) {
        result = {'success': true, 'code': '200','data': requestData};
    } else {
        result = {'success': false, 'code': '40002','message': 'transaction commit execute error. modelUK ' + SETTLEMENT_MODEL_UK};
    }

} while (false);

// 结果输出
result