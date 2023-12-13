// 接受请求，物料同步
// https://xinri.hyperpaas.com/workspace/app/308ba09ccef846599f7d22f6747acb01/model/cfad5b98693b45008a129eddfefe43db/operation/fd983c0efa984dc39f80d14edd378024/896dc8b1eceb4a05be1bf10f5a6c41d4
var META_MODEL_UK = "cfad5b98693b45008a129eddfefe43db";
var SYSTEM_ID = "_id";
var SYSTEM_MODEL = "_modelUniqueKey";

var requestData = args.request.data;
var result;

do {
    requestData[SYSTEM_MODEL] = META_MODEL_UK;

    var queryMap = {'sapMateNo' : {'$eq' : requestData['sapMateNo']}};
    var queryData = dataQuery.query(context, META_MODEL_UK,queryMap);
    console.log("queryData type " + typeof queryData);
    console.log("queryData content is " +  typeof queryData.get('content'));
    let items = queryData.get('content');
    // 超过多条，异常
    if (items != null && items.size() > 1) {
        console.log("item element is " + items.size());
        result = {'success': false, 'code': '409', 'message': 'data is over one. ' + items.size()};
        break;
    }

    dataRepository.begin(context);
    // 已存在，直接更新
    if (items != null && items.size() === 1) {
        var existItem = items.get(0);
        for (var requestKey in requestData) {
            existItem.set(requestKey, requestData.get(requestKey));
        }
        dataRepository.update(context, META_MODEL_UK,existItem.get(SYSTEM_ID), existItem);
        dataRepository.commit(context);
        result = {'success': true, 'code': '200', 'message': 'update exist data success. '};
        break;
    }
    dataRepository.save(context, META_MODEL_UK, requestData);
    dataRepository.commit(context);
    result = {'success': true, 'data': requestData, 'code': '200'}; 
} while (false);

result