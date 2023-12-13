// 接受请求，采购退货单
// https://xinri.hyperpaas.com/workspace/app/308ba09ccef846599f7d22f6747acb01/model/505781e08751408684734b8468bd23a3/operation/34d69defd3bf48bb938cfac84160054c/b5e0340bc6774bb7afab4cfe2af6d300
var RETURN_MODEL_UK = "505781e08751408684734b8468bd23a3";
var RETURN_MODEL_LIST_TAG = "list";
var RETURN_PRIMARY_ALIAS = 'zmblnr';
var SUPPLIER_MODEL_UK = 'facd9b98cdc24534acf2c5ba51480676';
var SUPPLIER_TAG = 'lifnr';
var META_MODEL_UK = 'cfad5b98693b45008a129eddfefe43db';
var META_TAG = 'matnr';
var SYSTEM_MODEL = "_modelUniqueKey";
var SYSTEM_ID = "_id";
var SYSTEM_CONTENT = "content";
var SYSTEM_VERSION = "_version";

var requestData = args.request.data;
var result;

do {
    // 唯一标识，不存在则返回
    if (!requestData[RETURN_MODEL_LIST_TAG]) {
        result = {'success': false, 'code': '40001','message': 'request value is null.'};
        break; 
    }
    
    var requestDateList = requestData[RETURN_MODEL_LIST_TAG];
    // 遍历request
    var toSaveList = [];
    var toQueryReturnList = [];
    var toQuerySupplierList = [];
    var toQueryMetaList = [];
    for (var requestIndex in requestDateList) {
        var requestElement = requestDateList[requestIndex];
        if (!requestElement[RETURN_PRIMARY_ALIAS]) {
            continue;
        }
        toQueryReturnList.push(requestElement[RETURN_PRIMARY_ALIAS]);
        var toSaveElement = {};
        for (var requestElementKey in requestElement) {
            if (requestElementKey === 'budat_mkpf') {
                let dataString = requestElement[requestElementKey];
                if (dataString) {
                    let date = new Date(dataString);
                    console.log("date is " + date.getTime());
                    toSaveElement[requestElementKey] = {'start': date.getTime(), 'end': date.getTime()};
                }
            } else if (requestElementKey === SUPPLIER_TAG) {
                // 查询供应商
                if (requestElement[requestElementKey] != null) {
                    toQuerySupplierList.push(requestElement[requestElementKey]);
                }
                toSaveElement[requestElementKey] = requestElement[requestElementKey];
            } else if (requestElementKey === META_TAG) {
                // 查询物料
                if (requestElement[requestElementKey] != null) {
                    toQueryMetaList.push(requestElement[requestElementKey]);
                }
                toSaveElement[requestElementKey] = requestElement[requestElementKey];
            } else if (requestElementKey === 'shkzg') {
                // 借贷中文转化
                if (requestElement[requestElementKey] != null) {
                    if (requestElement[requestElementKey] === 'S') {
                        toSaveElement[requestElementKey] = '退货';
                    }
                    if (requestElement[requestElementKey] === 'H') {
                        toSaveElement[requestElementKey] = '取消退货';
                    }
                }
            } else {
                toSaveElement[requestElementKey] = requestElement[requestElementKey];
            }
        }
        toSaveList.push(toSaveElement);
    }

    var existResMap = {};
    // alias查询主表
    let existQueryMap = {'zmblnr' : {'$in' : toQueryReturnList}};
    let existResult = dataQuery.query(context, RETURN_MODEL_UK, existQueryMap);
    let existsItems = existResult.get(SYSTEM_CONTENT);

    if (existsItems != null && existsItems.size() > 0) {
        for (var existsIndex in existsItems) {
            var exist = existsItems[existsIndex];
            existResMap[exist[RETURN_PRIMARY_ALIAS]] = exist;
        }
    }

    var supplierResMap = {};
    if (toQuerySupplierList.length > 0) {
        // alias查询主表
        let supplierQueryMap = {"code" : {'$in' : toQuerySupplierList}};
        let supplierResult = dataQuery.query(context, SUPPLIER_MODEL_UK, supplierQueryMap);
        let supplierItems = supplierResult.get(SYSTEM_CONTENT);
    
        if (supplierItems != null && supplierItems.size() > 0) {
            for (var supplierIndex in supplierItems) {
                var supplier = supplierItems[supplierIndex];
                supplierResMap[supplier['code']] = supplier[SYSTEM_ID];
            }
        }
    }

    var metaResMap = {};
    if (toQueryMetaList.length > 0) {
        // alias查询主表
        let metaQueryMap = {"sapMateNo" : {'$in' : toQueryMetaList}};
        let metaResult = dataQuery.query(context, META_MODEL_UK, metaQueryMap);
        let metaItems = metaResult.get(SYSTEM_CONTENT);
    
        if (metaItems != null && metaItems.size() > 0) {
            for (var metaIndex in metaItems) {
                var meta = metaItems[metaIndex];
                metaResMap[meta['sapMateNo']] = meta[SYSTEM_ID];
            }
        }
    }

    dataRepository.begin(context);

    for (var toSaveIndex in toSaveList) {
        let toSave = toSaveList[toSaveIndex];
        if (toSave[SUPPLIER_TAG] !== null) {
            var currentValue = toSave[SUPPLIER_TAG];
            console.log("current supplier value is " + currentValue);
            console.log("current supplier resMap value is " + supplierResMap[currentValue]);
            if (currentValue != null && supplierResMap[currentValue]) {
                var referId = {"_id" : supplierResMap[currentValue]};
                console.log("referId is " + JSON.stringify(referId));
                toSave[SUPPLIER_TAG] = [referId];
            } else {
                console.log("no supplier found " + currentValue);
                toSave[SUPPLIER_TAG] = [];
            }
        }
        if (toSave[META_TAG] !== null) {
            var currentMeta = toSave[META_TAG];
            console.log("current meta value is " + currentMeta);
            console.log("current meta resMap value is " + metaResMap[currentMeta]);
            if (currentMeta != null && metaResMap[currentMeta]) {
                var metaRefer = {"_id" : metaResMap[currentMeta]};
                toSave[META_TAG] = [metaRefer];
            } else {
                console.log("no meta found " + currentMeta);
                toSave[META_TAG] = [];
            }
        }
        if (existResMap[toSave[RETURN_PRIMARY_ALIAS]]) {
            let existItem = existResMap[toSave[RETURN_PRIMARY_ALIAS]];
            toSave[SYSTEM_ID] = existItem.get(SYSTEM_ID);
            toSave[SYSTEM_MODEL] = existItem.get(SYSTEM_MODEL);
            toSave[SYSTEM_VERSION] = exist.get(SYSTEM_VERSION);
            console.log("to update is " + JSON.stringify(toSave));
            dataRepository.update(context, RETURN_MODEL_UK,toSave[SYSTEM_ID], toSave);
        } else {
            console.log("to create is " + JSON.stringify(toSave));
            dataRepository.save(context, RETURN_MODEL_UK, toSave);   
        }
    }
    

    // todo commit
    var transactionResut = {};
    transactionResut = dataRepository.commit(context);
    if (transactionResut) {
        result = {'success': true, 'code': '200'};
    } else {
        result = {'success': false, 'code': '40001','message': 'result is empty.'};
    }
    
} while (false);

// 结果输出
result