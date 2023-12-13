// 批量创建综合费用

// 综合费用模型
var zonghe_model_uk = "42c37bd381a84966b5d6698056720c3c";
// 企业模型
var corp_model_uk = "503a2b1bfdc04bda93f8c2a0f5c260a1";
var corp_model_name_uk = "30b824a9c3e749b49bb49d8c6ebb06b2";
var corp_model_dianfei_type_uk = "8df10bd163d5422f9fa03aa8a0132c8c";
var corp_model_zonghe_detail_uk = "c5f207e42e1c4c4ca463699eaf3936c8";
var corp_zhangdan_uk = "796c90e924654d07adb08167b567f1c1";
var dianfeidanjia_model_price_uk = "9575a474a3da46ecabcc97951973fdbb";
var lastMon_zonghe_uk = "e8958bf68f83440da7d49125e8f2d81b";// 获取上期账单费用明细
var corp_building_uk = "corp_building";
//综合费用模型
// 入驻企业
var zonghe_corp_uk = "zonghe_corpid";
// 公司名称
var zonghe_corp_name_uk = "zonghe_corpname";
// 费用月
var zonghe_month_uk = "zonghe_month";
//所属楼幢
var zonghe_building_uk = "zonghe_building";
// 水电费用
var zonghe_shuidian_uk = "2142aae8fb9343569a7d9fb3917b4f44";
// 费用清单内嵌
var zonghe_embedded_uk = "b3cb4375e4e04b75b21ee89f48177ffa";
var zonghe_embedded_name_uk = "e17f0b662fb3495480ee3af87eb6dcab";
var zonghe_embedded_info_uk = "f3485d4c59414edfbf6e990e61f535d8";
// 费用类目
var zonghe_feeCategory_uk = "db8f11baffe54438a0af3d25c3d91e39";

// 费用类目模型
var feeCategory_model_uk = "381574664a9b48818be29fa87896a904";
var feeCategory_embedded_uk = "c0e4d1bfd3a2496693ec1d3ea63ec26b";
var feeCategory_embedded_name_uk = "f235728504744160a6f238da6793a4c7";
var feeCategory_embedded_info_uk = "5d3b86ec0dd54462840066434c259401";
var SYSTEM_ITMES = "items";
var cycle = 10;// 一批查5次
var SYSTEM_ID = "_id"


var objectDataList = args.request;
var result;
do {
    var date = new Date();
    var offset = 8 * 60 * 60 * 1000;
    var cstTimestamp = date.getTime() + offset;
    var cstDate = new Date(cstTimestamp);
    var year = cstDate.getFullYear();
    var month = cstDate.getMonth();
    var utcFirstDay = new Date(year, month, 1, 0, 0, 0, 0);
    var firstDayTimestamp = utcFirstDay.getTime() - offset;
    console.log("firstDayTimestamp is " + firstDayTimestamp);

    // 查询是否已存在当前日期结果
    var zongheQueryMap = { '5eda2be340364f85b2510c14ef49c5b6': { '$eq': firstDayTimestamp } };
    var queryzongheData = dataQuery.query(context, zonghe_model_uk, zongheQueryMap);
    let zongheItems = queryzongheData.get('content');
    if (zongheItems != null && zongheItems.size() > 0) {
        console.log("zongheItems is " + zongheItems.size());
        result = { 'success': false, 'code': '409', 'message': '当月已生成综合费用。' };
        break;
    }

    // query 公司，需要确认状态
    var queryMap = { '_states': { '$eq': 'st0x8D1VHEhqyhkb' } };
    var queryCorpData = dataQuery.query(context, corp_model_uk, queryMap);
    var corpItems = queryCorpData.get('content');
    // 超过多条，异常
    if (corpItems == null || corpItems.size() == 0) {
        console.log("corpItems element is empty.");
        result = { 'success': true, 'code': '200', 'message': 'corp is empty.' };
        break;
    }

    var feeCategoryQueryMap = {};
    var feeCategoryData = dataQuery.query(context, feeCategory_model_uk, feeCategoryQueryMap);
    var feeCategoryItems = feeCategoryData.get('content');
    if (feeCategoryItems == null || feeCategoryItems.size() == 0) {
        console.log("feeCategoryItems element is empty.");
        result = { 'success': true, 'code': '200', 'message': 'feeCategoryItems is empty.' };
        break;
    }

    var feeCategoryItem = feeCategoryItems[0];
    var categoryItems;
    if (feeCategoryItem.get(feeCategory_embedded_uk)
        && feeCategoryItem.get(feeCategory_embedded_uk).get(SYSTEM_ITMES)) {
        categoryItems = feeCategoryItem.get(feeCategory_embedded_uk).get(SYSTEM_ITMES);
    }

    // 获取上期时间戳
    var utcLastMonDay;
    if (month == 1) {
        utcLastMonDay = new Date(year - 1, 12, 1, 0, 0, 0, 0);
    } else {
        utcLastMonDay = new Date(year, month - 1, 1, 0, 0, 0, 0);
    }
    var lastDayMonTimestamp = utcLastMonDay.getTime() - offset;
    // 分段查询上期数据并填充到综合通知单集合中
    //var zongheItemList = [];
    var zongheItemMap = new Map();
    // 每十组公司查询一次
    for (var i = 0; i < corpItems.size() / cycle; i++) {
        var queryList = [];
        for (var index = i * cycle; index < corpItems.size() && index < i * cycle + cycle; index++) {
            // 构建每段的查询条件
            queryList.push(corpItems[index].get(corp_model_name_uk));
            // 装填基础数据
            let corpItem = corpItems[index];
            if (!corpItem.get(corp_zhangdan_uk)) {
                continue;
            }
            let zongheItem = {};
            // 取公司信息
            zongheItem[zonghe_corp_uk] = corpItem;
            // 取公司名
            zongheItem[zonghe_corp_name_uk] = corpItem.get(corp_model_name_uk);
            // 取所属楼幢
            zongheItem[zonghe_building_uk] = corpItem.get(corp_building_uk);
            // 日期
            zongheItem[zonghe_month_uk] = { 'start': firstDayTimestamp, 'end': firstDayTimestamp };
            // 生命周期
            zongheItem['_lifecycleInstance'] = { 'status': 'WAITING', 'states': [{ 'uniqueKey': 'st0xBYkBm9hC2grh', 'status': 'WAITING', 'activities': [] }] };
            //zongheItemList.push(zongheItem);
            zongheItemMap.set(corpItem.get(SYSTEM_ID), zongheItem);
        }
        var zongheOldQueryMap = { '5eda2be340364f85b2510c14ef49c5b6': { '$eq': lastDayMonTimestamp }, '62472bc79c7f4dba843d4812426642b4': { '$in': queryList } };
        var queryzongheData = dataQuery.query(context, zonghe_model_uk, zongheOldQueryMap);
        let zongheLastMonItems = queryzongheData.get('content');
        // 为一段中每个item匹配装填 "获取上期费用明细" 与 “费用清单”
        for (let lastIndex in zongheLastMonItems) {
            let zongheLastMonItem = zongheLastMonItems[lastIndex];
            let zongheItem = zongheItemMap.get(zongheLastMonItem.get(zonghe_corp_uk)._id);
            console.log("lastMonthItem id is " + zongheLastMonItem.get(zonghe_corp_uk)._id);
            console.log("zongheItem can '  t find id is " + zongheItem.zonghe_corpid._id);
            console.log("item is " + JSON.stringify(zongheItem));
            let zongheEmbeddedList = [];
            let zongheLastMonList = [];
            if (zongheItem) {
                zongheEmbeddedList = zongheLastMonItem.get(zonghe_embedded_uk);
                zongheItem[zonghe_embedded_uk] = zongheEmbeddedList;
                zongheLastMonList.push(zongheLastMonItem);
                zongheItem[lastMon_zonghe_uk] = zongheLastMonList;
            }
        }
    }
    result = { 'success': true, 'code': '200' };

    dataRepository.begin(context);
    for (let [id, item] of zongheItemMap) {
        console.log("item: " + JSON.stringify(item));
        var zongheId = dataRepository.save(context, zonghe_model_uk, item);
        // 企业表中增加综合明细
        dataRepository.recordOneToMany(context, corp_model_uk, item.zonghe_corpid._id, corp_model_zonghe_detail_uk, "items", zongheId);
    }

    dataRepository.commit(context);
    result = { 'success': true, 'code': '200' };
} while (false);

result