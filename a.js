var modelUK = "a0815fbe357b46a1aeef835213f9b09b";
var aliasAndAttr = {};
var executeData = {};
var i = 0;
var result;

aliasAndAttr.abc = "1f34a9d5f771436aaaa8e8c5d0b7398b";

var requestDataMap = args.request.data;

do {
            
    requestDataMap["_modelUniqueKey"] = modelUK;
    //executeData["_lifecycleInstance"]={status:"RUNNING",states:[{uniqueKey:"",status:"RUNNING"}]};
    console.log("request data is " + JSON.stringify(requestDataMap));
    dataRepository.save(context, modelUK, requestDataMap);
    result = {'success': true, 'data': executeData, 'code': '200'}; 
    
} while (false);
console.log("result is " + JSON.stringify(result));
result
db['tenant_certification_8ab01f70-c741-4bcd-b2ff-56d33c646ae4'].insert({'name':'sendApi','createdDate':new Date(), 'lastModifiedDate':new Date(), 'privateKey':'+MPGUTbDSfoSccfEJOPE+sOBUEwvqxRZzvU5SOqQJnUCCdmYQrMY0cCIzyvJIqvBvea6LUw7GijafkVB2rYd6og7Wdg79mnamdr7UQYiVfavY9pGE6yT0YL3lArJXfdjE8Ze64rKUVpxJbTSnbAUtteSw7oXbqMciEJQUPK7Or0cvbr5S77R3b06OBxT1kaCthYWDtUiaJmZAoxMYCLN7IRd2cAUiaZmiDAbxWOq+eMvoG8+2Vtn3zoPtXSRB7gBbagyPM+KsEUs6Q9j13alJCIeEJ+sYSz61nWlVXDs+Tkwri+HknNJe+xe9Hwmp/2xzKDPQfGQAaZ8to1PRdzA0AGF2eA1/NS9o7ko3UX7371D03rfQylUUW8eFn+HB6tmIFkDcyN1Y1RF3nTIvdyReI6/OYpYiE22q6WCtKKKcbnEH8U2tVXbR4cpP5lThc43g13ZvqLS7EzrAzF6WIVw934BB9XcJnVBzmeTli+zGZDF1gEFbAoycHgYh6LACaFZf12/3kiKZDGuJ51UjFmt2Mw08zR2NgW3a+iQBpJO6w/JTX0i7wCWNjA6UlD9yCwXnqGVSfUXAawQB8ZxcaqfJdIpiEuGNT34iQB2QbP4irbpc3gExGZ3xjGzl61CmrWATwnab1PdusBQracWCYgLl0C6XUzSeFpal+/kKostX9+xkadbph5QipZ5PD5iar2tmvne4cse6x1g53H+jPa0L/Lf6Rr3vfxYIxYiG51R4hvWOgd+XjmC/4r58Oz+aTWOn3VQbyUq7w5t2MZy5ESzmDqWJXt4SYOwFzaScN/LqBCTg0jMPe79y/4E8vVeIVG0oiAoe6Lm9w2WYi7tfh5HA/QVGfmQnta6ypvhA9FxKJL7gd5pqU0RlOlTW2xhcEClEHK4hMigNpMjNq+vP/9kzlrQt0/oG187F2ASyMzeGHC5hKTrMllb0zjbZCVMoHc2A1cDWdBjdjMkbA+9oaTMOEpU9bCixutxbHp48uLCE0+BeTrpzLxhQB/YHMBaApkWjerlWKzCCNZn1fTTn5G6RtfbIwVd6fyR6KXOknvY1g1Z4nQU1sjxUYBUHGwln/Eqz1GI+bHJThjh+ibcxi0E+2T3zinIBwNiDHx1KytSPNc=','env':'sandbox'})

db.core_tenant_init_key.insert({'createdDate':new Date(), 'lastModifiedDate':new Date(), 'tenantId':'8ab01f70-c741-4bcd-b2ff-56d33c646ae4','key':'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCLTHIQUbbAdXlrBsVIWwR+Zp8TTWkkK1lfpkaWa5Q7bvv9nrnbbNGbFeTDpz5HIe8GhiI/ZjQai/knN654LKRH1O0w8DJZP+JgotY8vnRq3oSxNAiiclGzxE1he/uvx4rTXNrMC1FCjjNKjGMxWAVsur0osNj8yeDIwHcMx4rA4QIDAQAB','env':'prod'})
db['tenant_certification_8ab01f70-c741-4bcd-b2ff-56d33c646ae4_sandbox'].insert({'name':'sendApi','createdDate':new Date(), 'lastModifiedDate':new Date(), 'privateKey':'+MPGUTbDSfoSccfEJOPE+sOBUEwvqxRZzvU5SOqQJnUCCdmYQrMY0cCIzyvJIqvBwS6ZNhjwXG8up4pgF6FvjppbwL8kWXClrYSLmjANZn8FH+xHOwugsmVOVBH4yXpCJA+C/5oH2gYe+nONz4N7HkYzjhgt+Lh7d3FMulXa6umrylg5hGr7dFvCFHDEQh0gF/GCpaXWTt+1aKtBFkGpISB5wug4qAiQK6TPOFqnFs5WG2+8a4rGtP3N29i4OKNbejlx7B8Z179o6OwA+AnjwTZCRZfS2J7FB/wPcdk8VMMFf5x9E4YRq6DwA8xRaVG1IaHcFhKaHvnyWC0B1r3hPBddQK2fnIeb2vsmIPf/XiUP/qisXxOz1JOPj3jHU8rORyXYDmAKPZ2EqEiCgNA3CzNIwm1QAfDxDkop8UbjsmvgUZP0vJafEjVYPzGwCXEGT6A+lLpjseREymdYFAmLxXgc0QORvrRcIi1C02L4s6rM36E5geMpHACOfzOFa6f/UWhJfk5cYG46tq/SjyuytoCHGTStf/oFLfy3aucDAtHjdk/7WFmCCxN7xM71hL6WGQrkPZe4ofljLbSqeDOj65ZNAM5Ut07R9oojlJhoFXYRJiKsD7piKPPB8aQc25HV7SeGQlGuQS6zENikbBBdatd0RKhpctXUx0/JC2l2mBD5hLT0f6T1/zl2pqNvmfL0KRcholgQBjszZv7xoseukNW9i0AKf8gnRGpSJHFS8MtnEGGfrux02GHKWfV4EXif9ZbAMc2DRDqgw7r7y7yV+QH3HXYe8WZanflwouO2GhMuZvLQCd6B6fNNI9+FZBB1h/7kEJE3bIimdfA7fG6T1JN2I8Uy9gBF4m/IK5ho77uB6cwKvd7UpsT4aYX+lTAq85Z3Fyzy6PrMuYAiF2ld1IZQh5j6pMebsnIYAgmAwsJ1mQ32beNtAlUAGps/vu0ed7rXGxs/O/zaih3tS43IKs5vCc+i7r/sM+nt6YsYLO7y71pd+vovxTv2ZVeUmemkYGNR6GMn3dHw5p2dKtg7phgOEHMWbaHSZEfaF9UcB3i4oGqIv4q8kgiMwHpGoEx+uKisE3yxSVj/W6LrwxLlYWj2xXTV9NZ0oC/+uMpVGnA=','env':'sandbox'})
db['tenant_certification_8ab01f70-c741-4bcd-b2ff-56d33c646ae4_sandbox'].updateOne({'_id': new ObjectId('6360eed0028ea1b721f9d5c7')},{$set:{'privateKey':'+MPGUTbDSfoSccfEJOPE+sOBUEwvqxRZzvU5SOqQJnUCCdmYQrMY0cCIzyvJIqvBvea6LUw7GijafkVB2rYd6og7Wdg79mnamdr7UQYiVfavY9pGE6yT0YL3lArJXfdjE8Ze64rKUVpxJbTSnbAUtteSw7oXbqMciEJQUPK7Or0cvbr5S77R3b06OBxT1kaCthYWDtUiaJmZAoxMYCLN7IRd2cAUiaZmiDAbxWOq+eMvoG8+2Vtn3zoPtXSRB7gBbagyPM+KsEUs6Q9j13alJCIeEJ+sYSz61nWlVXDs+Tkwri+HknNJe+xe9Hwmp/2xzKDPQfGQAaZ8to1PRdzA0AGF2eA1/NS9o7ko3UX7371D03rfQylUUW8eFn+HB6tmIFkDcyN1Y1RF3nTIvdyReI6/OYpYiE22q6WCtKKKcbnEH8U2tVXbR4cpP5lThc43g13ZvqLS7EzrAzF6WIVw934BB9XcJnVBzmeTli+zGZDF1gEFbAoycHgYh6LACaFZf12/3kiKZDGuJ51UjFmt2Mw08zR2NgW3a+iQBpJO6w/JTX0i7wCWNjA6UlD9yCwXnqGVSfUXAawQB8ZxcaqfJdIpiEuGNT34iQB2QbP4irbpc3gExGZ3xjGzl61CmrWATwnab1PdusBQracWCYgLl0C6XUzSeFpal+/kKostX9+xkadbph5QipZ5PD5iar2tmvne4cse6x1g53H+jPa0L/Lf6Rr3vfxYIxYiG51R4hvWOgd+XjmC/4r58Oz+aTWOn3VQbyUq7w5t2MZy5ESzmDqWJXt4SYOwFzaScN/LqBCTg0jMPe79y/4E8vVeIVG0oiAoe6Lm9w2WYi7tfh5HA/QVGfmQnta6ypvhA9FxKJL7gd5pqU0RlOlTW2xhcEClEHK4hMigNpMjNq+vP/9kzlrQt0/oG187F2ASyMzeGHC5hKTrMllb0zjbZCVMoHc2A1cDWdBjdjMkbA+9oaTMOEpU9bCixutxbHp48uLCE0+BeTrpzLxhQB/YHMBaApkWjerlWKzCCNZn1fTTn5G6RtfbIwVd6fyR6KXOknvY1g1Z4nQU1sjxUYBUHGwln/Eqz1GI+bHJThjh+ibcxi0E+2T3zinIBwNiDHx1KytSPNc='}})


if (StringUtils.isBlank(changeItem.getIndex().get(0).getPath())) {
    if (StringUtils.isBlank(changeItem.getIndex().get(0).getItemIdKey())
        || DataDto.ID.equalsIgnoreCase(changeItem.getIndex().get(0).getItemIdKey())) {
        // DBRef ,全匹配
        update.pullAll(key, changeItem.getItems().toArray());
    } else {
        // 条件匹配删除
        update.pull(key, Query.query(Criteria.where(changeItem.getIndex().get(0).getItemIdKey()).in(
                changeItem.getItems().toArray())));
    }
} else {
    // 基于最外层key拼接多级key
    if (StringUtils.isBlank(changeItem.getIndex().get(0).getItemIdKey())
        || DataDto.ID.equalsIgnoreCase(changeItem.getIndex().get(0).getItemIdKey())) {
        // DBRef ,全匹配
        update.pullAll(key + "." +changeItem.getIndex().get(0).getPath(),changeItem.getItems().toArray());
    } else {
        // 条件匹配删除
        update.pull(key + "." +changeItem.getIndex().get(0).getPath(),
                    Query.query(Criteria.where(changeItem.getIndex().get(0).getItemIdKey()).in(
                changeItem.getItems().toArray())));
    }
}


//准备
db.order.insert({
    _id: ObjectId("6368babe18cb6eea507ac3b4"),
    subjectMatterTerm:{
       products:[
           {key:"1", name:"iPhone 14 Plus Max",amount:3 },
           {key:"2", name:"MacBookPro 16", amount:5}
       ]
   }
})

//添加Mac Mini M1
db.order.update({_id:ObjectId("6368babe18cb6eea507ac3b4")},
   {$addToSet: {"subjectMatterTerm.products":{key:"3", name:"Mac Mini M1",amount:7 } } 
})

//删除MacBookPro 16 同时增加MacBookPro 14
db.order.update({_id:ObjectId('6368babe18cb6eea507ac3b4')},
[{ 
$set: {
       "subjectMatterTerm.products": {
         $concatArrays: [
           {
             $filter: {
               input: "$subjectMatterTerm.products",
               cond: { $ne: ["$$this.key", "2"] },
             },
           },
           [{key:"4", name:"MacBookPro 14",amount:5 }]
         ],
       },
     }
}])



db.students4.updateOne({_id: 2},
    [{$set : {quizzes:{$concatArrays:[{$filter:{input:"$quizzes",cond:{$and:[{$ne:["$$item",8]},{$ne:["$$item",3]}]}}},[9]]}}}])




db.students4.updateOne( { _id: 2 },
    [ { $set: { quizzes: { $concatArrays: [{$filter:{input:"$quizzes",as:"item",cond:{$and:[{$ne:["$$item",5]}]}}}, [9 ]  ] } } } ])



    db.students4.insertMany( [
        { "_id" : 1, "quizzes" : [ 4, 6, 7 ] },
        { "_id" : 2, "quizzes" : [ {"a":123,"b":123},{"a":24,"b":23} ] }
      ] )
      db.students4.insertMany( [
        { "_id" : 1, "quizzes" : [ 4, 6, 7 ] },
        { "_id" : 2, "quizzes" : {"items":[ {"a":123,"b":123},{"a":123,"b":32} ]} }
      ] )

      {$filter:{input:"$quizzes.items",as:"item",cond:{$and:[{$ne:["$$item.a",123]}]}}}
      db.students4.updateOne( { _id: 1},
        [ { $set: { "quizzes.items" : { $concatArrays: [[ {"a":123,"b":333}],
        {$ifNull:[{$filter:{input:"$quizzes.items",as:"item",cond:{$and:[{$ne:["$$item.b",333]}]}}}, []]} ]} } } ,
        {$set:{"quizzes.test":[1342]}}]
      )

      db.students4.updateOne( { _id: 1 },
        { $push: { "quizzes.items": { $each: [ 90, 92, 85 ] } } }
      )

      db.students4.updateOne( { _id: 2 },
        [ { $set: { "quizzes.items" : [] } } ]
      )

      db.students4.updateOne( { _id: 2 },
        [ { $set: { "quizzes.items" : null } } ]
      )


      https://stackoverflow.com/questions/34217874/mongodb-array-push-and-pull
      https://github.com/spring-projects/spring-data-mongodb/blob/main/spring-data-mongodb/src/test/java/org/springframework/data/mongodb/core/MongoTemplateUpdateTests.java

      https://github.com/spring-projects/spring-data-mongodb/blob/main/spring-data-mongodb/src/test/java/org/springframework/data/mongodb/core/ReactiveMongoTemplateUpdateTests.java


      https://github.com/spring-projects/spring-data-mongodb/blob/main/spring-data-mongodb/src/test/java/org/springframework/data/mongodb/core/ReactiveMongoTemplateUnitTests.java

      org.springframework.data.mongodb.UncategorizedMongoDbException: Command failed with error 15983 (Location15983): 'Invalid $set :: caused by :: An object representing an expression must have exactly one field: { $ref: "data_06b7848b287349b592b0cc82a721c1b8_sandbox", $id: ObjectId('63303d2c91c98628dd9521e6') }' on server hyperpaas-mongodb-0.hyperpaas-mongodb-svc.mongodb.svc.cluster.local:27017. The full response is {"ok": 0.0, "errmsg": "Invalid $set :: caused by :: An object representing an expression must have exactly one field: { $ref: \"data_06b7848b287349b592b0cc82a721c1b8_sandbox\", $id: ObjectId('63303d2c91c98628dd9521e6') }", "code": 15983, "codeName": "Location15983", "$clusterTime": {"clusterTime": {"$timestamp": {"t": 1668008399, "i": 1}}, "signature": {"hash": {"$binary": {"base64": "1WPIKF6wBo/XOYCDu/LLTUSAhsI=", "subType": "00"}}, "keyId": 7121631186421547014}}, "operationTime": {"$timestamp": {"t": 1668008399, "i": 1}}}; nested exception is com.mongodb.MongoCommandException: Command failed with error 15983 (Location15983): 'Invalid $set :: caused by :: An object representing an expression must have exactly one field: { $ref: "data_06b7848b287349b592b0cc82a721c1b8_sandbox", $id: ObjectId('63303d2c91c98628dd9521e6') }' on server hyperpaas-mongodb-0.hyperpaas-mongodb-svc.mongodb.svc.cluster.local:27017. The full response is {"ok": 0.0, "errmsg": "Invalid $set :: caused by :: An object representing an expression must have exactly one field: { $ref: \"data_06b7848b287349b592b0cc82a721c1b8_sandbox\", $id: ObjectId('63303d2c91c98628dd9521e6') }", "code": 15983, "codeName": "Location15983", "$clusterTime": {"clusterTime": {"$timestamp": {"t": 1668008399, "i": 1}}, "signature": {"hash": {"$binary": {"base64": "1WPIKF6wBo/XOYCDu/LLTUSAhsI=", "subType": "00"}}, "keyId": 7121631186421547014}}, "operationTime": {"$timestamp": {"t": 1668008399, "i": 1}}}



      do update dataDto is {"_id":"63708affbdf3d01f36c68e0b","_modelUniqueKey":"e63a0de853934e7098f8642ec819a244","3b77a3c1fed947e5a024e62a7dea7040":{"finite":true,"high":3475653012423180288,"infinite":false,"low":400,"naN":false,"negative":false},"_tenantId":"8ab01f70-c741-4bcd-b2ff-56d33c646ae4","_lastModifiedDate":"2022-11-13T06:27:31.62Z","_lastModifiedBy":"7ce953be-9118-4a97-94e9-23f9efa9f7fd"}
      do update dataDto is {"_id":"63708affbdf3d01f36c68e0b","_modelUniqueKey":"e63a0de853934e7098f8642ec819a244","_version":7,"3b77a3c1fed947e5a024e62a7dea7040":{"finite":true,"high":3475653012423180288,"infinite":false,"low":300,"naN":false,"negative":false},"52ac84f632f24faaae5f5f684b9be928":"CG1","_tenantId":"8ab01f70-c741-4bcd-b2ff-56d33c646ae4","_lastModifiedDate":"2022-11-13T06:32:52.502Z","_lastModifiedBy":"7ce953be-9118-4a97-94e9-23f9efa9f7fd"}

      start to update {"arrayFilters":[],"updateObject":{"$set":{"_modelUniqueKey":"e63a0de853934e7098f8642ec819a244","3b77a3c1fed947e5a024e62a7dea7040":{"finite":true,"high":3475653012423180288,"infinite":false,"low":500,"naN":false,"negative":false},"_tenantId":"8ab01f70-c741-4bcd-b2ff-56d33c646ae4","_lastModifiedDate":"2022-11-13T06:42:27.804Z","_lastModifiedBy":"7ce953be-9118-4a97-94e9-23f9efa9f7fd"},"$inc":{"_version":1}}}, preview is true

      :"2022-11-15T15:39:50.294Z","_lastModifiedBy":"7ce953be-9118-4a97-94e9-23f9efa9f7fd","_lifecycleInstance":{"status":"WAITING","states":[{"uniqueKey":"7af5ccc610cf11ed8d154a29d0e817e0","status":"WAITING","activities":[]}]},"_states":["合格供应商"],"_operations":[{"cascadeRefer":false,"disable":false,"editable":false,"label":"淘汰","lazy":false,"primaryKey":{"activityUniqueKey":"7af5cc8010cf11ed8d154a29d0e817e0","operationUniqueKey":"67bef1c4f82643cc8e31bcd26339232a"},"primaryKeyVariables":["_id"],"required":false,"type":"action"}],"8639939268c44e6694bd9c0954ad229c":"100920","eaa9a412eda74213a4f51dffc952fc67":"sdf2222244444444","5afcd7d6b8214b7a867ff9575ee8ec5d":"sdf2222","ba9f7f224fd8451094c87e2b6d583ffd":"sdf","a8f84e0a3c9943ee831e6d4bde48113b":"sdf","ec4f3367a8db493c95a9ae9960bebc26":["96ed97f52b864e8abc8ccf21a3b6cba8"],"597ce594e1684899a9ab88e808fe4e86":{"items":[{"_id":"4d225266c2b64be2a1f960286166fcda","ac686e66497f47fdb3b0cdf1732740fc":["ffbb2e206a464c479fe8d2d8d902f89d"],"eca8a128f185427497c59b45e7628be3":"sdf"}],"totalCount":1}}] 




1.结算单&结算明细
https://xinri.hyperpaas.com/api/app/308ba09ccef846599f7d22f6747acb01/model/18ce46d2e0124e2185fd4ff6684786c8/operation/88117c127b4540bc87f914c3e1242ed9/2237728aeddc4e1f9a9685ced7c5d227
2.采购退货单
https://xinri.hyperpaas.com/api/app/308ba09ccef846599f7d22f6747acb01/model/505781e08751408684734b8468bd23a3/operation/34d69defd3bf48bb938cfac84160054c/b5e0340bc6774bb7afab4cfe2af6d300
3.采购单采购明细级联生成
https://xinri.hyperpaas.com/api/app/308ba09ccef846599f7d22f6747acb01/model/be9ce205b05b47ca893505fa65abf61c/operation/4c3abb3911464b8494e453c5a6485b00/b0590584be7544958cd56a3487a2e238
4.物料同步
https://xinri.hyperpaas.com/api/app/308ba09ccef846599f7d22f6747acb01/model/cfad5b98693b45008a129eddfefe43db/operation/fd983c0efa984dc39f80d14edd378024/896dc8b1eceb4a05be1bf10f5a6c41d4


dev环境:
tenantId : 5f031839-4782-11ed-8918-72023bdf094d

aliyun环境:

api certification 

tenantId: 1148f762-5348-11ed-8f0b-00163e1c5a46

db.core_api_certification.insert({'createdDate':new Date(), 'lastModifiedDate':new Date(), 'tenantId':'1148f762-5348-11ed-8f0b-00163e1c5a46','publicKey':'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC6z7/lpWdGd6XcPIk12KpsdTnDvhR8dI55X+30j4/aEViJQ3Sz3lSxqHSw3dZR9LOKrLM0TC1BoiYMTDSgWqrv1YGuPdbxeqqJZDWiTB29xa/ksDWLm4sAdcxjWnGny2zxNpt83AcQbq1ufOhTzaIFL1p1/VA6ixq5zdJGUkjIhQIDAQAB','env':'sandbox'})

db.core_tenant_init_key.insert({'createdDate':new Date(), 'lastModifiedDate':new Date(), 'tenantId':'1148f762-5348-11ed-8f0b-00163e1c5a46','key':'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCLTHIQUbbAdXlrBsVIWwR+Zp8TTWkkK1lfpkaWa5Q7bvv9nrnbbNGbFeTDpz5HIe8GhiI/ZjQai/knN654LKRH1O0w8DJZP+JgotY8vnRq3oSxNAiiclGzxE1he/uvx4rTXNrMC1FCjjNKjGMxWAVsur0osNj8yeDIwHcMx4rA4QIDAQAB','env':'sandbox'})
db['tenant_certification_1148f762-5348-11ed-8f0b-00163e1c5a46_sandbox'].insert({'name':'sendApi','createdDate':new Date(), 'lastModifiedDate':new Date(), 'privateKey':'LknLe1e+ogdeZoyRjxrqV2TblzIwcCZ77cDcaK7ptcUTV36EekwAJ7ZFV29eoNyD/MFE9ntsXSoQtUAFWdFhgWreyRHkg1TET0KyzUR4S9MSF8I4eHlfASErO7fDYmyn52YVnimv41ec1I7saBT/0U7zmEv1mvhf6sCbPamwvbsJoaMfd+VmTSKSOCClTOIB96OtsDigB9zkVdVbY7QOoqym0tqFw4YMGeV3GVu+qEXYL4NGUKIr7MQMGMSfzWr8RZRW5+hVaiiaWJp3iPee96ABtWatgl03Hlx0v2ifeFJ4Abiii6nLwsAPGNbO18D5RqYYoZtuGKurXJbfpwAR7ILccToaR5e6KjIku9Jffqz4V0BR92z5FZe8UJCCGMVufxvDJE0/5gRlpoIXgfdFQ3KAR7pkBg7w6TXweOqz485q2x9CzbrbvUYlPA/a4xjNGXb/NW3g2tatNpORNI321pPA+jW7MKhpPuBWsyHDOoFVOj44Jsb+JpIay5LwsHA5BpRS0kw2cN9+kOSf2h31iSSCX9vXIC169h91+1Y5trxwm/BTX9JwOyBStDCBXFuZTVG0jPt065kROxfsoPu1FMqBcG99UZ7QvSiJWoPaVARS8QN1KJLQNIHUKD+el+g+66M6p7QLarCuflW0XivSv9AeozDZvM+i4lHWdofSqByR8jfZzZRTcqgDB7iRPyxlTzHgKGhW4k8tl+YJUDAexVI/d42a7ydTF+odyA8fscukGXNdCJYME0A2e6Vjf9PSCAceKQgipyKd4+H+VFmn4bIxKlNJ+sUl0L/1bUnZwR5FEnsadSdat6Rx3zanwzTDSlcBDTC24dwQjRC/da9l25mPxmfxEYBAq74RYdwsGZvTCqWlNN3vlisKp6EbOrCfQGjqxzctGu4qQmxN6Juyx+BUe5Xi8oODhzdQWAHaox2W27VcUDay/fy4opteZgCGpvBDNDz+mi9MTyey0KFGsWotI1gsLr+sZ1GRjG0lS2kQeqmi8lwtKpTrsWWCNH2lx71yjV0636Q3no7vY7o2fp/e8sjK2bgERPFFAKipTo1Zms8XLM67xpDqOGcIlSABnjRTEIi8CNNbF6zsfDgWPbQyYEOVCHm3P8cY8Gx6r0c=','env':'sandbox'})




xinri production:
public is: MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDoR+zRUg60L+dBIcsdazvX+SGv8M1avS5reN9sxMLoVbTS+WQ53tgr6ipzeqYIlVrsPvr8WyfYLZcXV1s2LR5GhdGiKE9aJRS2bji9refTf2RJxofiaOErxp6GfCy6lR1UTKeg6Ny8gk5nA/+udySD3ATRI64IELWOqdYbmrIFEQIDAQAB
private is: 
-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAOhH7NFSDrQv50Eh
yx1rO9f5Ia/wzVq9Lmt432zEwuhVtNL5ZDne2CvqKnN6pgiVWuw++vxbJ9gtlxdX
WzYtHkaF0aIoT1olFLZuOL2t59N/ZEnGh+Jo4SvGnoZ8LLqVHVRMp6Do3LyCTmcD
/653JIPcBNEjrggQtY6p1huasgURAgMBAAECgYBItttn26xGtAhM12tiVkNxpMfq
8BMZKMfzVO98eUwat1nYAcJia2R4uuF3LRn07ex8sGqZvV+HyR3XbL1dBFrJWCy7
gt9NjvNRip32KjSatwKb8V28m7upmVHu7wG/HKRgwRx88kWyLU/l4NKnE6/Iwodk
ThxlXZJwqHqkk8DxAQJBAPzJZl1yynX4KqDPVQ7NtC8HHKADA3GrIA3BQqWnJJVy
VNN4uY6rMPJG6p4g+7E1O8pfk4cfj9IGzqPV+npR6qkCQQDrO8v+b4wpfEWNOxSR
MR7R0eJh2AAKBlAju3iiJ8Y76x4mnOJ59GWkRInqR9CXbkCz9VCCcZO40gKesNsF
DfApAkEAiwn/yuCLqa1xTPgdMcJFHCTOQtjFeS0FuWsWTGUNw0GalKJvdaCFkI0f
GRDNP6AnHd3KGGVsxrnFyOm2Fred2QJBAMzcV8zvcn6SprPXlxLXV4Ldqa0Sgv43
/0UPOIDn6ME4AxsXmDkjef10XzO0dVnb/+d5pjLkHQVhiDyRwzyEpfkCQCqp+Yo+
T93tciil2X4YVWjHmltUsUsjNwB8x5BD/pmQdHrj4JuvVz8xY7ZeLERGMMW67vNL
Zt8bxPKR+AKE4mA=
-----END PRIVATE KEY-----


SimpleAggregateCondition
{
    "type":"simple",
    "criteria":{"xxxxuk":{$eq:{
        "type":"constant",
        "value":"0"
    }}}
}

AggregateProjection:
{
    "type":"aggregate",
    "aggregateCondition":{
        "type":"simple",
        "criteria":{"xxxxuk":{$eq:{
            "type":"constant",
            "value":"0"
        }}}
    }
}
{"type":"formula","formula":{"formula":"varc10cf10e + var4a29d0e8","variableBindings":{"varc10cf10e":{"attributeIndex":["e7d07bd89acc4413936cab70730fec08","188378fd700741c7af78fb78df4c99bc"],"defaultValue":0}},"persistedVariableBindings":{"var4a29d0e8":{"attributeIndex":["f240a5c3a6d64d2db6eb3be07a12fd46"],"defaultValue":0}}}}


{"formula":"var5cee1ed8 * var7af5cf00","variableBindings":{"var5cee1ed8":{"attributeIndex":["677a75ed5c994161a547567421db07b9"]},"var7af5cf00":{"attributeIndex":["7af5c91a10cf11ed8d154a29d0e817e0"]}}}


{"type":"formula","formula":{"formula":"varc10cf10e + var4a29d0e8","variableBindings":{"varc10cf10e":{"attributeIndex":["bb6c9e73bbf947a7bda567d0c9b7b8ba","51b572ff7a3a4a629ecbcb88c19f69f3"]}},"persistedVariableBindings":{"var4a29d0e8":{"attributeIndex":["62a025bd861f4a42a5239176fa228033"],"defaultValue":0}}}}



ILdVAq0NkseAX3AZSnAhdAHGWNMVGcSkTmpXiUt8lEAHiDixrT7Lyuwfxt/zXwBAPMIihKVDV9n22ZjttC3mgGXhATZ4dD9iCZn/QPSVAZNbiJ3EAmQfaOCB1/kV5UKF2ROVHTaIq3nUlPKeeNeeawAzq5vUiM59ms9FE75cvvo=

CQ/XtfbQIYVbCMqhdJGq8NYSUyd18dxakHxjMlA/wWUtNTu6IsNX2LZas2hTtRQbopfvo65+JddcGLvrQel9v1an8CdNjWRroBROmmb7kGHHj+MgBQfMuTXDlogcAqUcGX+uDjDmWNkngg1AQwMK/NEJ3z/peRnH8kI0DRRw1FM=

db.data_3d74bfa5d5584f7b95d751b79d31e25a_sandbox.aggregate([{ 
  "$project" : {
  'sendTotal' : {$ifNull:['$5c70631c4c9546f791dd1044e9260425', new Decimal128('0.00')]},
  'sendingTotal' : {$ifNull:['$9798822e4bd042b094f56992be13b98c', new Decimal128('0.00')]},
  'orderTotal' : '$1660f7d2f501418697afe7d001956d9e',
  'totalSum' : { $multiply : [ "$sendTotal", "$sendingTotal" ] }
 }
},{$match:{$expr:{$lte:["$totalSum", "$orderTotal"]}}}])



dev:
 db.data_3d74bfa5d5584f7b95d751b79d31e25a_sandbox.aggregate([
  { 
  "$project" : {
  'sendTotal' : {$ifNull:['$5c70631c4c9546f791dd1044e9260425', new Decimal128('0.00')]},
  'sendingTotal' : {$ifNull:['$9798822e4bd042b094f56992be13b98c', new Decimal128('0.00')]},
  'orderTotal' : {$ifNull:['$1660f7d2f501418697afe7d001956d9e', new Decimal128('0.00')]},
  '_lifecycleInstance':1,
  'total' : { $add : [ {$ifNull:['$5c70631c4c9546f791dd1044e9260425', new Decimal128('0.00')]}, 
  {$ifNull:['$9798822e4bd042b094f56992be13b98c', new Decimal128('0.00')]} ] }}
},{$match:{$expr:{$lte:["$total", "$orderTotal"]}}}]).forEach( function(doc) { 
  db.data_3d74bfa5d5584f7b95d751b79d31e25a_sandbox.updateOne({'_id': ObjectId(doc._id)},
  {$set:{'_lifecycleInstance':{
    status: 'WAITING',
    states: [
      {
        uniqueKey: '7af5d05e10cf11ed8d154a29d0e817e0',
        status: 'WAITING',
        activities: []
      }
    ]
  }}}); } )

  aliyun:
  db.data_07e9406b17a7431881c8eb56cb975a70_sandbox.aggregate([
    { 
    "$project" : {
    'sendTotal' : {$ifNull:['$e4cfb8d010e64feca0b2b5cc937789ca', NumberDecimal('0.00')]},
    'sendingTotal' : {$ifNull:['$1dbbfc9cfbdd49dcb7727709828662ef', NumberDecimal('0.00')]},
    'orderTotal' : {$ifNull:['$677a75ed5c994161a547567421db07b9', NumberDecimal('0.00')]},
    '_lifecycleInstance':1,
    'total' : { $add : [ {$ifNull:['$e4cfb8d010e64feca0b2b5cc937789ca', NumberDecimal('0.00')]}, 
    {$ifNull:['$1dbbfc9cfbdd49dcb7727709828662ef', NumberDecimal('0.00')]} ] }}
  },{$match:{$expr:{$lte:["$total", "$orderTotal"]}}}])


    db.data_07e9406b17a7431881c8eb56cb975a70_sandbox.aggregate([
      { 
      "$project" : {
      'sendTotal' : {$ifNull:['$e4cfb8d010e64feca0b2b5cc937789ca', NumberDecimal('0.00')]},
      'sendingTotal' : {$ifNull:['$1dbbfc9cfbdd49dcb7727709828662ef', NumberDecimal('0.00')]},
      'orderTotal' : {$ifNull:['$677a75ed5c994161a547567421db07b9', NumberDecimal('0.00')]},
      '_lifecycleInstance':1,
      'total' : { $add : [ {$ifNull:['$e4cfb8d010e64feca0b2b5cc937789ca', NumberDecimal('0.00')]}, 
      {$ifNull:['$1dbbfc9cfbdd49dcb7727709828662ef', NumberDecimal('0.00')]} ] }}
    },{$match:{$expr:{$lte:["$total", "$orderTotal"]}}}]).forEach( function(doc) {
      db.data_07e9406b17a7431881c8eb56cb975a70_sandbox.updateOne({'_id': ObjectId(doc._id)},
  {$set:{'_lifecycleInstance':{
    status: 'WAITING',
    states: [
      {
        uniqueKey: '7af5d05e10cf11ed8d154a29d0e817e0',
        status: 'WAITING',
        activities: []
      }
    ]
  }}});
    } )



已发货

 {
  status: 'WAITING',
  states: [
    {
      uniqueKey: '7af5d06810cf11ed8d154a29d0e817e0',
      status: 'WAITING',
      activities: []
    }
  ]
}

可发货
{
  status: 'WAITING',
  states: [
    {
      uniqueKey: '7af5d05e10cf11ed8d154a29d0e817e0',
      status: 'WAITING',
      activities: []
    }
  ]
}



cat result  | grep ObjectId | awk '{print $2}' | sed -e 's/ObjectId(//g' -e 's/)//g'

find取id
cat testIds  | grep ObjectId | awk '{print $3}' | sed -e 's/ObjectId(//g' -e 's/)//g' -e 's/$/&,/g'

cat testIds | grep ObjectId | awk '{print $2}' | sed 's/$/&,/g' | awk BEGIN{RS=EOF}'{gsub(/\n/,"");print}'

 db.data_3d74bfa5d5584f7b95d751b79d31e25a_sandbox.updateMany( 
  {},
  [
    { 
      "$project" : {
      'sendTotal' : {$ifNull:['$5c70631c4c9546f791dd1044e9260425', new Decimal128('0.00')]},
      'sendingTotal' : {$ifNull:['$9798822e4bd042b094f56992be13b98c', new Decimal128('0.00')]},
      'orderTotal' : {$ifNull:['$1660f7d2f501418697afe7d001956d9e', new Decimal128('0.00')]},
      '_lifecycleInstance':1,
      'total' : { $add : [ {$ifNull:['$5c70631c4c9546f791dd1044e9260425', new Decimal128('0.00')]}, 
      {$ifNull:['$9798822e4bd042b094f56992be13b98c', new Decimal128('0.00')]} ] }}
    },
    { $set: { '_lifecycleInstance': {
      $switch :{
        branches:[
          {case :{$gte:["$total", "$orderTotal"]}, then : {
            status: 'WAITING',
            states: [
              {
                uniqueKey: '7af5d06810cf11ed8d154a29d0e817e0',
                status: 'WAITING',
                activities: []
              }
            ]
          }},
          {case : {$lt:["$total", "$orderTotal"]}, then :{
            status: 'WAITING',
            states: [
              {
                uniqueKey: '7af5d05e10cf11ed8d154a29d0e817e0',
                status: 'WAITING',
                activities: []
              }
            ]
          } }
        ]
      }
    } }
    }
  ]
)

//准备
db.order.insert({
  _id: ObjectId("6368babe18cb6eea507ac3b4"),
  subjectMatterTerm:{
 products:[
   {key:"1", name:"iPhone 14 Plus Max",amount:3 },
   {key:"2", name:"MacBookPro 16", amount:5}
 ]
}
})

//添加Mac Mini M1
db.order.update({_id:ObjectId("6368babe18cb6eea507ac3b4")},
{$addToSet: {"subjectMatterTerm.products":{key:"3", name:"Mac Mini M1",amount:7 } } 
})

//删除MacBookPro 16 同时增加MacBookPro 14
db.order.update({_id:ObjectId('6368babe18cb6eea507ac3b4')},
[{ 
$set: {
     "subjectMatterTerm.products": {
       $concatArrays: [
         {
           $filter: {
             input: "$subjectMatterTerm.products",
             cond: { $ne: ["$$this.key", "2"] },
           },
         },
         [{key:"4", name:"MacBookPro 14",amount:5 }]
       ],
     },
   }
}])


// 订正采购订单/dev
db.data_3b7c93066ad1488392d5976162046466_sandbox.updateMany( 
  {_id : {$in: [ObjectId("63bf736febf2e2789e88aa5f"),
  ObjectId("63bf7da9ebf2e2789e88ae1c")]}},
  {$set:{'1bba042495ba49089448003ec25fba2f':'07eacf509a3949e58e768f9c7be91140'}}
)

// 订正采购订单/aliyun/9cccc9227f934c62adbce6a936b1ffa0 - 1
db.data_be9ce205b05b47ca893505fa65abf61c_sandbox.find({'eb6f9477b8e24a45b18fc2089d078bf3':'9cccc9227f934c62adbce6a936b1ffa0'},{_id:1}).sort({_id:-1})

db.data_be9ce205b05b47ca893505fa65abf61c_sandbox.updateMany( 
  {_id : {$in: [ObjectId("63bf736febf2e2789e88aa5f"),
  ObjectId("63bf7da9ebf2e2789e88ae1c")]}},
  {$set:{'eb6f9477b8e24a45b18fc2089d078bf3':['1']}}
)

// 订正采购订单/aliyun/07eacf509a3949e58e768f9c7be91140 - 2
db.data_be9ce205b05b47ca893505fa65abf61c_sandbox.find({'eb6f9477b8e24a45b18fc2089d078bf3':'07eacf509a3949e58e768f9c7be91140'},{_id:1}).sort({_id:-1})

db.data_be9ce205b05b47ca893505fa65abf61c_sandbox.updateMany( 
  {_id : {$in: [ObjectId("63a312009dd53e291f34ce06"),ObjectId("63a30c409dd53e291f34cdfd"),ObjectId("63928b774e3e4c416e6969ab"),ObjectId("6386d7788d8d603d8eb004af"),ObjectId("63774804aab28b0312bf581f"),ObjectId("63773de0d5b30e353807e0f8"),ObjectId("63771605aab28b0312bf57ea"),ObjectId("63771549aab28b0312bf57e5")]}},
  {$set:{'eb6f9477b8e24a45b18fc2089d078bf3':['2']}}
)



// 结算单/aliyun /c249b0270cc2453ba94553ca7382e4e6 - true- 扣除
db.data_18ce46d2e0124e2185fd4ff6684786c8_sandbox.find({'c249b0270cc2453ba94553ca7382e4e6':'0b84152c6554413dbfd9170ac50ed39e'},{_id:1}).sort({_id:-1})
db.data_18ce46d2e0124e2185fd4ff6684786c8_sandbox.updateMany( 
  {_id : {$in: [ObjectId("63a312009dd53e291f34ce06"),ObjectId("63a30c409dd53e291f34cdfd"),ObjectId("63928b774e3e4c416e6969ab"),ObjectId("6386d7788d8d603d8eb004af"),ObjectId("63774804aab28b0312bf581f"),ObjectId("63773de0d5b30e353807e0f8"),ObjectId("63771605aab28b0312bf57ea"),ObjectId("63771549aab28b0312bf57e5")]}},
  {$set:{'c249b0270cc2453ba94553ca7382e4e6':['true']}}
)


// 结算单/aliyun /c249b0270cc2453ba94553ca7382e4e6 - false - 不扣除
db.data_18ce46d2e0124e2185fd4ff6684786c8_sandbox.find({'c249b0270cc2453ba94553ca7382e4e6':'b92f584e36f248ea933b624291b9591f'},{_id:1}).sort({_id:-1})
db.data_18ce46d2e0124e2185fd4ff6684786c8_sandbox.updateMany( 
  {_id : {$in: [ObjectId("63a312009dd53e291f34ce06"),ObjectId("63a30c409dd53e291f34cdfd"),ObjectId("63928b774e3e4c416e6969ab"),ObjectId("6386d7788d8d603d8eb004af"),ObjectId("63774804aab28b0312bf581f"),ObjectId("63773de0d5b30e353807e0f8"),ObjectId("63771605aab28b0312bf57ea"),ObjectId("63771549aab28b0312bf57e5")]}},
  {$set:{'c249b0270cc2453ba94553ca7382e4e6':['false']}}
)