define(function (require, exports) {
    var List = {},
        keys = ['duty', 'notice', 'remind'];
    var index = 5;
    Mock.Random.increment(1000)
    for (var i = 0, idx = keys.length; i < idx; i++) {
        List[keys[i]] = Mock.mock({
            id: '@increment(2)',
            title: '@ctitle(8, 15)',
            value: '@integer(40, 100)',
            precent: '@integer(1, 100)',
            color: '@color()',
            tablelist: getTablelist()
        })
    }
    List['pred-model'] = createPredictionModelData();
    function createPredictionModelData(){
        var list = [];
        for (var i = 0, idx = 5; i < idx; i++) {
            list[i] = Mock.mock({
                id: '@increment(2)',
                modelname: ['黄金响应','出国留学','网点基准','基金预测','客户激活'][i],
                thm: '@integer(1,100)',
                phm: '@integer(1, 100)',
                thmhitrate: '@integer(1, 100)',
                uod:'@integer(0,1)',
                phmhitrate: '@integer(1, 100)',
                score:'@integer(1, 100)',
            });
        }
        return list;
    }
    function getTablelist() {
        var tablelist = [];
        for (var i = 0, len = 5; i < len; i++) {
            tablelist[i] = Mock.mock({
                id: '@increment(2)',
                title: '@ctitle(8, 15)',
                desc: '@ctitle(10, 200)',
                create: '@date("yyyy-MM-dd")'
            })
        }
        return tablelist;
    }

    function paramUrl2Obj(url) {
        var search = url.split('?')[1]
        if (!search) {
            return {}
        }
        return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\n/g, '\\n') + '"}')
    }

    function paramBody2Obj(body) {
        if (!body) {
            return {}
        }
        return JSON.parse('{"' + decodeURIComponent(body).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\n/g, '\\n') + '"}')
    }

    exports.subList = function (config) {
        /*var reqData = paramUrl2Obj(config.url);
        // var page = reqData.page;
        // var size = reqData.size;
        // var condition = reqData.condition ? JSON.parse(reqData.condition) : {};
        // var create_at = condition.create_at;
        // var type = condition.type;
        // var title = condition.title;
        // var sort = condition.sort;
        var id = reqData.id;

        var filterData = List.filter(function(item, index){
            return item.id == id;
        })

        return {
            data: filterData
        };*/
        return {
            data: List
        }
    }
});