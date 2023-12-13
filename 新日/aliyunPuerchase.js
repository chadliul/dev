// 接受请求，采购单采购明细级联生成
// https://xinri.hyperpaas.com/api/app/308ba09ccef846599f7d22f6747acb01/model/be9ce205b05b47ca893505fa65abf61c/operation/4c3abb3911464b8494e453c5a6485b00/b0590584be7544958cd56a3487a2e238
var MAJOR_MODEL_UK = "be9ce205b05b47ca893505fa65abf61c";
var MAJOR_PRIMARY_TAG = "order_no";
var MAJOR_SUB_TAG = "details";
var MAJOR_SEP_SUB_ALIAS = "details";
var SUB_PRIMARY_TAG = "id";
var SUB_MODEL_UK = "07e9406b17a7431881c8eb56cb975a70";
var SUB_AGR_MAJOR_ALIAS = "param";
var SUPPLIER_RELATED_ALIAS = "erp_code";
var SUPPLIER_MODEL_UK = "facd9b98cdc24534acf2c5ba51480676";
var SYSTEM_MODEL = "_modelUniqueKey";
var SYSTEM_ID = "_id";
var SYSTEM_CONTENT = "content";
var SYSTEM_ITEMS_TAG = "items";
var SYSTEM_VERSION = "_version";
var APPROVE_STATE_ENUM = {
    "1": ["9cccc9227f934c62adbce6a936b1ffa0"],
    "2": ["07eacf509a3949e58e768f9c7be91140"]
}
var MAJOR_DELETE_TAG = "deleteflag";
var SUB_LINE_DELETE_TAG = "state";
var SUB_PROJECT_TYPE = "project_type";

var requestData = args.request.data;
var result;

do {
    var createFlag = 'true';

    // 唯一标识，不存在则返回
    if (!requestData[MAJOR_PRIMARY_TAG]) {
        result = {'success': false, 'code': '40001','message': '订单编号为空'};
        break;
    }

    // alias查询主表
    var queryMap = {"order_no" : {'$eq' : requestData[MAJOR_PRIMARY_TAG]}};
    var major = dataQuery.query(context, MAJOR_MODEL_UK,queryMap);
    var items = major.get('content');
    var majorDataId;
    var majorDataVersion;
    var majorQueryDto;
    if (items != null && items.size() > 0) {
        majorQueryDto = items.get(0);
        majorDataId = majorQueryDto.get(SYSTEM_ID);
        createFlag = 'false';
    }

    var majorMap = {};
    for(var majorKey in requestData) {
        if (majorKey === 'order_date') {
            let dataString = requestData['order_date'];
            let date = new Date(dataString);
            majorMap[majorKey] = {'start': date.getTime(), 'end': date.getTime()};
        } else if (majorKey === SUPPLIER_RELATED_ALIAS && requestData[SUPPLIER_RELATED_ALIAS]){
            let supplierQuery = {'code': {'$eq':requestData[SUPPLIER_RELATED_ALIAS]}};
            let supplier = dataQuery.query(context,SUPPLIER_MODEL_UK,supplierQuery);
            let supplierList = supplier.get(SYSTEM_CONTENT);
            if (supplierList == null || supplierList.size() == 0) {
                console.log("'供应商不存在。请求供应商编码（erp_code）为：' " + requestData[SUPPLIER_RELATED_ALIAS]);
                result = {'success': false, 'code': '40001','message': '供应商不存在。请求供应商编码（erp_code）为：' + requestData[SUPPLIER_RELATED_ALIAS]};
                break;
            }
            majorMap[majorKey] = supplierList;
        } else if (majorKey === 'approve_state') {
            if (requestData['approve_state']) {
                majorMap[majorKey] = [requestData['approve_state']];
            }
        } else if (majorKey === MAJOR_DELETE_TAG && requestData[MAJOR_DELETE_TAG]) {
            if (requestData[MAJOR_DELETE_TAG] === '1') {
                majorMap[majorKey] = '删除';
            }
        } else {
            if (majorKey !== MAJOR_SUB_TAG) {
                majorMap[majorKey] = requestData[majorKey];
            }
        }

    }
    majorMap[SYSTEM_MODEL] = MAJOR_MODEL_UK;

    // todo begin
    dataRepository.begin(context);
    var majorId;
    if (createFlag === 'true') {
        majorId = dataRepository.save(context, MAJOR_MODEL_UK, majorMap);
    } else {
        majorMap[SYSTEM_ID] = majorDataId;
        majorMap[SYSTEM_VERSION] = majorQueryDto.get(SYSTEM_VERSION);
        dataRepository.update(context, MAJOR_MODEL_UK,majorDataId, majorMap);
    }

    // 不存在子表
    if (!requestData.get(MAJOR_SUB_TAG)) {
        result = {'success': true, 'code': '200','data': requestData};
        break;
    }

    var subItemList = requestData[MAJOR_SUB_TAG];
    var subItemCreateList = [];
    var subItemUpdateList = [];
    // 主数据创建，存在子数据直接创建
    if (createFlag === 'true') {
        for(var index in subItemList) {
            let element = subItemList[index];
            let createElement = {};
            createElement['order_no'] = majorMap['order_no'];
            for (var elementKey in element) {
                if (elementKey === 'plan_date' && element['plan_date'] != null) {
                    let dateString = element['plan_date'];
                    let date = new Date(dateString);
                    createElement[elementKey] = {'start' : date.getTime(), 'end' : date.getTime()};
                } else {
                    createElement[elementKey] = element[elementKey];
                }

            }
            createElement['supplier'] = majorMap[SUPPLIER_RELATED_ALIAS];
            subItemCreateList.push(createElement);
        };
    } else {
        var queryList = majorQueryDto.get(MAJOR_SUB_TAG).get(SYSTEM_ITEMS_TAG);
        // 查询结果中不存在明细，直接创建
        if (queryList == null || queryList.size() == 0) {
            for(var index in subItemList) {
                let element = subItemList[index];
                element['order_no'] = majorMap['order_no'];
                for (let elementKey in element) {
                    if (elementKey === 'plan_date' && elementKey['plan_date'] != null) {
                        let dateString = element['plan_date'];
                        let date = new Date(dateString);
                        element[subKey] = {'start' : date.getTime(), 'end': date.getTime()};
                    }
                }
                element['supplier'] = majorMap[SUPPLIER_RELATED_ALIAS];
                subItemCreateList.push(element);
            };
        } else {
            // 判断查询结果，是否需要更新
            var findIds = [];
            for (let idIndex in queryList) {
                var idMap = queryList.get(idIndex);
                findIds.push(idMap.get(SYSTEM_ID));
            }
            console.log("findIds are " + JSON.stringify(findIds));
            var subExistRes = dataQuery.findByIds(context, SUB_MODEL_UK, findIds);
            var subExistList = subExistRes.get(SYSTEM_CONTENT);
            if (subExistList != null && subExistList.size() > 0) {
                // 存在数组转map做查询
                var existSubItemMap = {};
                for (let i in subExistList) {
                    let subExistItem = subExistList.get(i);
                    existSubItemMap[subExistItem.get(SUB_PRIMARY_TAG)] = subExistItem;
                };
                console.log("existSubMap is " + JSON.stringify(existSubItemMap));

                // 遍历请求数组判断创建或更新
                var checkSumResult = 'true';
                var errorRequestElement = '';
                for (let index in subItemList) {
                    let subResElement = subItemList[index];
                    console.log("request subItem is " + JSON.stringify(subResElement));
                    if (existSubItemMap[subResElement[SUB_PRIMARY_TAG]] == void 0) {
                        for (let subKey in subResElement) {
                            if (subKey === 'plan_date' && subResElement['plan_date'] != null) {
                                let dateString = subResElement['plan_date'];
                                let date = new Date(dateString);
                                subResElement[subKey] = {'start' : date.getTime(), 'end': date.getTime()};
                            }
                        }
                        subResElement['order_no'] = majorMap['order_no'];
                        subResElement['supplier'] = majorMap[SUPPLIER_RELATED_ALIAS];
                        subItemCreateList.push(subResElement);
                    } else {
                        let existItem = existSubItemMap[subResElement[SUB_PRIMARY_TAG]];
                        // 校验update数量
                        var sum = 0;
                        if (existItem.get('warehousing_num') != null) {
                            sum = sum + existItem.get('warehousing_num');
                        }
                        if (existItem.get('delivery_num') != null) {
                            sum = sum + existItem.get('delivery_num');
                        }

                        if (subResElement['order_num'] < sum) {
                            checkSumResult = 'false';
                            errorRequestElement = subResElement[SUB_PRIMARY_TAG];
                            break;
                        }

                        for (let resKey in subResElement) {
                            if (resKey === 'plan_date' && subResElement['plan_date'] != null) {
                                let dateString = subResElement['plan_date'];
                                let date = new Date(dateString);
                                subResElement.put(resKey, {'start' : date.getTime(), 'end': date.getTime()});
                            } else {
                                subResElement.put(resKey, subResElement[resKey]);
                            }
                        }

                        subResElement[SYSTEM_ID] = existItem.get(SYSTEM_ID);
                        subResElement[SYSTEM_MODEL] = existItem.get(SYSTEM_MODEL);
                        subResElement[SYSTEM_VERSION] = existItem.get(SYSTEM_VERSION);
                        subItemUpdateList.push(subResElement);
                    }

                }
                if (checkSumResult === 'false') {
                    result = {'success': false, 'code': '40001','message': '当前订单数量小于总和。' + errorRequestElement};
                    break;
                }
            } else {
                for(var index in subItemList) {
                    let element = subItemList[index];
                    for (let elementKey in element) {
                        if (elementKey === 'plan_date' && elementKey['plan_date'] != null) {
                            let dateString = element['plan_date'];
                            let date = new Date(dateString);
                            element[subKey] = {'start' : date.getTime(), 'end': date.getTime()};
                        }
                    }
                    element['supplier'] = majorMap[SUPPLIER_RELATED_ALIAS];
                    element['order_no'] = majorMap['order_no'];
                    subItemCreateList.push(element);
                }
            }
        }
    }

    if (subItemCreateList) {
        for (let i in subItemCreateList) {
            let createItem = subItemCreateList[i];
            if (createFlag === 'true') {
                createItem[SUB_AGR_MAJOR_ALIAS] = majorId;
            } else {
                createItem[SUB_AGR_MAJOR_ALIAS] = {"_id" : majorDataId, "_modelUniqueKey": MAJOR_MODEL_UK};
            }
            if (createItem[SUB_LINE_DELETE_TAG]) {
                if (createItem[SUB_LINE_DELETE_TAG] === 'L') {
                    createItem[SUB_LINE_DELETE_TAG] = '删除';
                } else if (createItem[SUB_LINE_DELETE_TAG] === 'X') {
                    createItem[SUB_LINE_DELETE_TAG] = '交货完成';
                }
            }
            if (createItem[SUB_PROJECT_TYPE]) {
                if (createItem[SUB_PROJECT_TYPE] === '0') {
                    createItem[SUB_PROJECT_TYPE] = '标准';
                } else if (createItem[SUB_PROJECT_TYPE] === '2') {
                    createItem[SUB_PROJECT_TYPE] = '委外';
                } else if (createItem[SUB_PROJECT_TYPE] === '3') {
                    createItem[SUB_PROJECT_TYPE] = '外协';
                }
            }

            createItem[SYSTEM_MODEL] = SUB_MODEL_UK;
            createItem['_lifecycleInstance'] = {
                'status' : 'WAITING',
                'states' : [
                    {
                        'uniqueKey':'7af5d05e10cf11ed8d154a29d0e817e0',
                        'status' : 'WAITING',
                        'activities' : []
                    }
                ]
            };
            // alias 保存
            console.log("to create item " + JSON.stringify(createItem));
            var subId = dataRepository.save(context, SUB_MODEL_UK, createItem);

            // todo collection add majorMap
            if (createFlag === 'true') {
                // 使用形参id进行记录更行
                dataRepository.recordOneToMany(context, MAJOR_MODEL_UK, majorId, MAJOR_SEP_SUB_ALIAS,"items", subId);
            } else {
                // 存在则使用真实主id进行记录更行
                dataRepository.recordOneToMany(context, MAJOR_MODEL_UK, majorDataId, MAJOR_SEP_SUB_ALIAS,"items", subId);
            }
        }
    }
    if (subItemUpdateList) {
        for (let i in subItemUpdateList) {
            let updateItem = subItemUpdateList[i];
            if (updateItem[SUB_LINE_DELETE_TAG]) {
                if (updateItem[SUB_LINE_DELETE_TAG] === 'L') {
                    updateItem[SUB_LINE_DELETE_TAG] = '删除';
                } else if (updateItem[SUB_LINE_DELETE_TAG] === 'X') {
                    updateItem[SUB_LINE_DELETE_TAG] = '交货完成';
                }
            }
            if (updateItem[SUB_PROJECT_TYPE]) {
                if (updateItem[SUB_PROJECT_TYPE] === '0') {
                    updateItem[SUB_PROJECT_TYPE] = '标准';
                } else if (updateItem[SUB_PROJECT_TYPE] === '2') {
                    updateItem[SUB_PROJECT_TYPE] = '委外';
                } else if (updateItem[SUB_PROJECT_TYPE] === '3') {
                    updateItem[SUB_PROJECT_TYPE] = '外协';
                }
            }
            dataRepository.update(context, SUB_MODEL_UK, updateItem.get(SYSTEM_ID), updateItem);
        }
    }

    // todo commit
    var transactionResut = {};
    transactionResut = dataRepository.commit(context);
    if (transactionResut) {
        result = {'success': true, 'code': '200'};
    } else {
        result = {'success': false, 'code': '40001','message': '事务执行错误'};
    }

} while (false);

// 结果输出
result