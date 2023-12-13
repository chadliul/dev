// 同步采购信息到暂估价模型中
var META_MODEL_UK = "718db73476a44020b9be03afedba503f";
var PURCHASE_INFO_RECORD_DATA_ALIAS = "esokz";// 采购信息记录分类
var EFFECTIVE_DATE = "datab";// 开始生效日期
var EXPIRY_DATE = "datbi";// 有效截止日期
var CONTENT_TAG = "content"
var INPUT_TAG = "input";
var PURCHASE_INFO_RECORD_ENUM = {
    '0': ['84859c52db4f43b4ba8676925d74814a'],// 标准
    '2': ['10358b3a4e694d18a4d298ade4c074ed'],// 寄售
    '3': ['8fbbcbb802654a6dbe6d0aa6b01389b1']// 外协
}

var requestData = args.request.data;
var result;

do {
    var inputDataList = requestData[INPUT_TAG];
    if (inputDataList) {
        var toSaveList = [];
        // 数据处理
        for (var i = 0; i < inputDataList.length; i++) {
            var inputData = inputDataList[i];

            // 日期时间处理
            var toSaveElement = {};
            for (var key in inputData) {
                if (key === EFFECTIVE_DATE || key === EXPIRY_DATE) {
                    var date = new Date(inputData[key]);
                    if (!isNaN(date.getTime())) {
                        toSaveElement[key] = { 'start': date.getTime(), 'end': date.getTime() }
                    }
                } if (key === PURCHASE_INFO_RECORD_DATA_ALIAS) {
                    toSaveElement[key] = PURCHASE_INFO_RECORD_ENUM[inputData[PURCHASE_INFO_RECORD_DATA_ALIAS]]
                } else {
                    toSaveElement[key] = inputData[key];
                }
            }
            toSaveList.push(toSaveElement);
        }
        // 事务处理
        dataRepository.begin(context);
        for (var i = 0; i < toSaveList.length; i++) {
            dataRepository.save(context, META_MODEL_UK, toSaveList[i]);
        }
        var transactionResut = {};
        transactionResut = dataRepository.commit(context);
        if (transactionResut) {
            result = { 'success': true, 'code': '200' };
        } else {
            result = { 'success': false, 'code': '40001', 'message': '事务执行失败' };
        }
    } else {
        result = { 'success': true, 'code': '200' };
    }
} while (false);

result