// 发送请求，供应商审核
var SUPPLIER_MODEL_UK = "ac8cb6f6e8984abea6004c4bffce5591";
var DATA_ID = "_id";
var SYSTEM_MODEL = "_modelUniqueKey";
var SYSTEM_VERSION = "_version";
var SYSTEM_CONTENT = "content";
var SUPPLIER_GROUP_ALIAS = "supplierAccountGrp";
var SUPPLIER_BANKS_ALIAS = "banks";
var ITEMS_ATTRIBUTE_NAME = "items";
var ITEMS_BANKT_ALIAS = "bkont";
var ITEMS_ISBILL_ALIAS = "isBillBank";
var REQUEST_SIGN_API_NAME = "sendApi";
var UNIQUE_TAX = "taxNo1";
var SUPPLIER_TYPE_ENUM = {
    '96ed97f52b864e8abc8ccf21a3b6cba8': 'ZR01',
    'ba7bf9ea18b54ca9bbdbfe54b381310f': 'ZR02',
    '174c31b6a00b4846ab63bcc3fed11d99': 'ZR03',
    '5efd7324209843d29efa926854a47a8e': 'ZR04',
    '55557e4c744643349892ffefc306bd41': 'ZR05',
    '42373c46326b49b9b4bcf8d234d8f86c': 'ZR06',
    '9ee3a17a89a143f292255be80e5f0026': 'ZR07',
    'dfeae585b56d43f293d5e133dbcf3ca6': 'ZR08',
    '29fe4453958340f9be2e4550b8b95943': 'ZR09',
    '0b14faeb846946bab8671d057220c90a':'Z003'
}
var BANK_CONTROL_ENUM = {
    'ffbb2e206a464c479fe8d2d8d902f89d' : '10',
    'da2869d2976e4d8eaa44da114bba9246' : '20'
}
var REQUEST_API = "http://gateway.xinri.com:9233/test/centre/csrm/autmSupplier";
var RESPONSE_CODE = "code";
var RESPONSE_RESULT = "result";
var RESPONSE_SUCCESS = "000";

var requestData = args.request.data;
var preview = args.preview;
var result;

// 枚举需要特殊处理
do {
    // 唯一标识，不存在则返回
    if (!requestData[DATA_ID]) {
        result = {'success': false, 'code': '40001','message': 'dataId value is null. modelUK ' + SUPPLIER_MODEL_UK};
        break; 
    }
    
    // dataid查询主表
    var supAliasRes = dataQuery.findById(context, SUPPLIER_MODEL_UK, requestData[DATA_ID]);
    var supAliasDto = supAliasRes[SYSTEM_CONTENT];
    if (supAliasDto === void 0 ) {
        result = {'success': false, 'code': '40001','message': 'supplier alias data is null. modelUK ' + SUPPLIER_MODEL_UK};
        break; 
    }
 
    let supplierRequestDto = {};
    // 拼装request
    for (let supKey in supAliasDto) {
        if (supKey === SUPPLIER_GROUP_ALIAS) {
            console.log("supKey is " + supKey);
            let typeUKList = supAliasDto.get(supKey);
            let typeUK = typeUKList.get(0);
            supplierRequestDto[SUPPLIER_GROUP_ALIAS] = SUPPLIER_TYPE_ENUM[typeUK];
        } else if (supKey === SUPPLIER_BANKS_ALIAS) {
            var itemsMap = supAliasDto.get(supKey);
            var itemsList = itemsMap.get(ITEMS_ATTRIBUTE_NAME);
            // 拼接item
            let requestBankList = [];
            for (var index in itemsList) {
                let requestBank = {};
                let element = itemsList.get(index);
                for (let itemKey in element) {
                    if (itemKey === ITEMS_BANKT_ALIAS) {
                        let bankcontrolUKList = element.get(itemKey);
                        let bankcontrolUK = bankcontrolUKList.get(0);
                        let bankcontrolValue = BANK_CONTROL_ENUM[bankcontrolUK];
                        requestBank[itemKey] = bankcontrolValue;
                    } else if (itemKey === ITEMS_ISBILL_ALIAS) {
                        if (element.get(itemKey)) {
                            requestBank[itemKey] = 1;
                        } else {
                            requestBank[itemKey] = 0;
                        }
                    } else {
                        requestBank[itemKey] = element.get(itemKey);
                    }
                }
                requestBankList.push(requestBank);
            };
            supplierRequestDto[supKey] = requestBankList;
        } else {
            supplierRequestDto[supKey] = supAliasDto.get(supKey);
        }
    }
    
    var timestamp = new Date().getTime();
    var signMap = {
        'requestBody': supplierRequestDto,
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
    console.log("supplierRequestDto is " + JSON.stringify(supplierRequestDto));
    var response;
    // start to request
    if (preview === 'false') {
        response = httpClient.exchange(PRO_REQUEST_API, 'POST', requestHeader, JSON.stringify(supplierRequestDto));
    } else {
        response = httpClient.exchange(REQUEST_API, 'POST', requestHeader, JSON.stringify(supplierRequestDto));
    }
    // var response = "{\"code\":\"000\", \"mes\":\"succes\", \"result\":\"100920\"}";
    console.log("response is " + response);

    if (!response) {
        result = {'success': false, 'code': '40001','message': 'supplier response is null. modelUK ' + SUPPLIER_MODEL_UK};
        break; 
    }

    dataRepository.begin(context);

    var updateMap = {
    }
    updateMap[DATA_ID] = requestData[DATA_ID];
    updateMap[SYSTEM_MODEL] = requestData[SYSTEM_MODEL];
    // 全局唯一识别号，需添加
    updateMap[UNIQUE_TAX] = supAliasDto.get(UNIQUE_TAX);
    if (requestData[SYSTEM_VERSION]) {
        updateMap[SYSTEM_VERSION] = requestData[SYSTEM_VERSION];
    }
    var responseMap = JSON.parse(response);
    var auditRes;
    if (responseMap[RESPONSE_CODE] === RESPONSE_SUCCESS) {
        console.log("response result is " + responseMap[RESPONSE_RESULT]);
        // supAliasRes.put('code',responseMap[RESPONSE_RESULT]);
        updateMap['code'] = responseMap[RESPONSE_RESULT];
    
        // todo 状态变成审核成功
        auditRes = Boolean("true");
        dataRepository.update(context, SUPPLIER_MODEL_UK,requestData[DATA_ID], updateMap);
    } else {
        // 审核异常
        result = {'success': false, 'code': '40001','message': responseMap['mes']};
        break; 
    }

    var res = dataRepository.commit(context);
    if (res) {
        context.runtimeContext.put('autmSupplier', auditRes);
        console.log("current auditRes " + auditRes);
        result = {'success': true, 'code': '200','data': requestData};
    } else {
        result = {'success': false, 'code': '40002','message': 'transaction commit execute error. modelUK ' + SUPPLIER_MODEL_UK};
    }

} while (false);

// 结果输出
result