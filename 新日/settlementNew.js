// 接受请求，结算单&结算明细
var SETTLEMENT_MODEL_UK = "ec21b3384f564a5696a268fec7dfec40";
var SUPPLIER_MODEL_UK = "ac8cb6f6e8984abea6004c4bffce5591";
var SETTLEMENT_PRIMARY_TAG = "kptz";
var SETTLEMENT_DATA_TAG = "bills";
var SETTLEMENT_EMBEDDED_TAG = "rows";
var SETTLEMENT_FLAG_ENUM = {
    "true" : "8507b92bcfd7493b80714600deab721d",
    "false" : "b7a207d0d126490c8d10c252c8edb77f"
};
var SETTLEMENT_SUB_MODEL_UK = "69ddb78bd10c4c7988b8d3e45a5763dc";
var MAJOR_TO_SUB_TAG = "details";
var SUB_TO_MAJORT_TAG = "param";
var SYSTEM_MODEL = "_modelUniqueKey";
var SYSTEM_ID = "_id";
var SYSTEM_CONTENT = "content";
var SYSTEM_VERSION = "_version";
var DELETE_STATE = "delete_state";

var requestData = args.request.data;
var result;

// 枚举需要特殊处理
do {
    // 唯一标识，不存在则返回
    if (!requestData[SETTLEMENT_DATA_TAG]) {
        result = {'success': false, 'code': '40001','message': 'request value is null.'};
        break; 
    }
    
    var requestDateList = requestData[SETTLEMENT_DATA_TAG];
    console.log("request dateList is " + JSON.stringify(requestElement));
    // 遍历request
    var toSaveList = [];
    var toSaveSubMap = {};
    var toQueryExistList = [];
    var toQuerySupplierList = [];
    for (var requestIndex in requestDateList) {
        var requestElement = requestDateList[requestIndex];
        console.log("request element is " + JSON.stringify(requestElement));
        // todo 主数据没有理论上报错
        if (!requestElement[SETTLEMENT_PRIMARY_TAG]) {
            continue;
        }
        toQueryExistList.push(requestElement[SETTLEMENT_PRIMARY_TAG]);
        var toSaveElement = {};
        var settlementSubList = [];
        for (var requestElementKey in requestElement) {
            if (requestElementKey === 'zdzjzrq' || requestElementKey === 'cjrq') {
                let dataString = requestElement[requestElementKey];
                if (dataString) {
                    let date = new Date(dataString);
                    console.log("date is " + date.getTime());
                    toSaveElement[requestElementKey] = {'start': date.getTime(), 'end': date.getTime()};
                }
            } else if (requestElementKey === 'rows') {
                if (requestElement['rows']) {
                    var requestEmbeddedList = requestElement['rows'];
                    for (var embeddedIndex in requestEmbeddedList) {
                        var embeddItemMap = requestEmbeddedList[embeddedIndex];
                        var embeddElement = {};
                        for (var embeddedItemKey in embeddItemMap) {
                            if (embeddedItemKey === 'budat') {
                                if (embeddItemMap['budat']) {
                                    let embeddedDate = new Date(embeddItemMap[embeddedItemKey]);
                                    embeddElement[embeddedItemKey] = {'start': embeddedDate.getTime(), 'end': embeddedDate.getTime()};
                                }
                            } else {
                                console.log("embeddedItemKey is " + embeddedItemKey);
                                embeddElement[embeddedItemKey] = embeddItemMap[embeddedItemKey];
                            }
                        }
                        console.log("embedded element is " + JSON.stringify(embeddElement));
                        settlementSubList.push(embeddElement);
                    }
                    if (settlementSubList) {
                        toSaveElement['details_count'] = "共有" + settlementSubList.length + "条明细";
                    } else {
                        toSaveElement['details_count'] = "共有0条明细";
                    }
                }

            } else if (requestElementKey === 'zflag')  {
                toSaveElement[requestElementKey] = [SETTLEMENT_FLAG_ENUM[requestElement[requestElementKey]]];
            } else if (requestElementKey === 'status_t') {
                toSaveElement[requestElementKey] = "已发布";
            } else {
                toSaveElement[requestElementKey] = requestElement[requestElementKey];
            }
        }
        if (toSaveElement['lifnr']) {
            toQuerySupplierList.push(toSaveElement['lifnr']);
        }
        toSaveSubMap[toSaveElement[SETTLEMENT_PRIMARY_TAG]] = settlementSubList;
        toSaveList.push(toSaveElement);
    }

    var existResMap = {};
    // alias查询主表
    let existQueryMap = {'kptz' : {'$in' : toQueryExistList}};
    let existResult = dataQuery.query(context, SETTLEMENT_MODEL_UK, existQueryMap);
    let existsItems = existResult.get(SYSTEM_CONTENT);
    if (existsItems != null && existsItems.size() > 0) {
        for (var existsIndex in existsItems) {
            var exist = existsItems[existsIndex];
            existResMap[exist[SETTLEMENT_PRIMARY_TAG]] = exist;
        }
    }

    // alias查询供应商
    var existSupplierResMap = {};
    let existSupplierQuery = {'code' : {'$in' : toQuerySupplierList}};
    let existSupplierResult = dataQuery.query(context, SUPPLIER_MODEL_UK, existSupplierQuery);
    let existSupplierItems = existSupplierResult.get(SYSTEM_CONTENT);
    if (existSupplierItems != null && existSupplierItems.size() > 0) {
        for (var supplierIndex in existSupplierItems) {
            var existSupplier = existSupplierItems.get(supplierIndex);
            existSupplierResMap[existSupplier.get('code')] = existSupplier;
        }
    }


    dataRepository.begin(context);

    for (var toSaveIndex in toSaveList) {
        let toSave = toSaveList[toSaveIndex];
        if (existResMap[toSave[SETTLEMENT_PRIMARY_TAG]]) {
            var existItem = existResMap[toSave[SETTLEMENT_PRIMARY_TAG]];
            toSave[SYSTEM_ID] = existItem.get(SYSTEM_ID);
            toSave[SYSTEM_MODEL] = existItem.get(SYSTEM_MODEL);
            toSave[SYSTEM_VERSION] = existItem.get(SYSTEM_VERSION);
            if (toSave[DELETE_STATE] && toSave[DELETE_STATE] === 'X') {
                // 执行删除逻辑
                console.log("start to delete. " + toSave[SETTLEMENT_PRIMARY_TAG] + " _id is " + toSave[SYSTEM_ID]);
                dataRepository.delete(context, SETTLEMENT_MODEL_UK, toSave[SYSTEM_ID]);
                if (existItem.get(MAJOR_TO_SUB_TAG)) {
                    let subItems = existItem.get(MAJOR_TO_SUB_TAG).get('items');
                    if (subItems && subItems.length > 0) {
                        console.log("start to delete subItems.");
                        for (let subItemIndex in subItems) {
                            let subItem = subItems[subItemIndex];
                            dataRepository.delete(context, SETTLEMENT_SUB_MODEL_UK, subItem.get(SYSTEM_ID));
                        }
                    }
                }
            } else {
                if(toSave[DELETE_STATE] === void 0) {
                    toSave[DELETE_STATE] = "";
                }
                console.log("to update data is " + JSON.stringify(toSave));
                // 该场景子表不用更新
                dataRepository.update(context, SETTLEMENT_MODEL_UK,toSave[SYSTEM_ID], toSave);
            }
        } else {
            console.log("to save data is " + JSON.stringify(toSave));
            // 填充供应商
            if (toSave['lifnr']) {
                if (existSupplierResMap[toSave['lifnr']]) {
                    var refList = [];
                    refList.push(existSupplierResMap[toSave['lifnr']]);
                    toSave['supplier'] = refList;
                }
            }
            majorId = dataRepository.save(context, SETTLEMENT_MODEL_UK, toSave);
            let toSaveSubList = toSaveSubMap[toSave[SETTLEMENT_PRIMARY_TAG]];
            // 创建子表，更新子表
            if (toSaveSubList && toSaveSubList.length > 0) {
                console.log("to create sub items.");
                for (var subIndex in toSaveSubList) {
                    let subCreateItem = toSaveSubList[subIndex];
                    // 填充供应商
                    subCreateItem['row_supplier'] = toSave['supplier'];
                    subCreateItem[SUB_TO_MAJORT_TAG] = majorId;
                    subCreateItem[SYSTEM_MODEL] = SETTLEMENT_SUB_MODEL_UK;
                    // alias 保存
                    var subId = dataRepository.save(context, SETTLEMENT_SUB_MODEL_UK, subCreateItem);
                    // 使用形参id进行记录更行
                    dataRepository.recordOneToMany(context, SETTLEMENT_MODEL_UK, majorId, MAJOR_TO_SUB_TAG,"items", subId);
                }
            }
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