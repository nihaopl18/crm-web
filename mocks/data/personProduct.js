//交易对手风险预警数据
define(function (require, exports) {
    var List = [
    
    {
    'account':'000011','currency':'156','buyDate':'2016-05-12','startDate':'2016-05-12','endDate':'2017-05-11',
    'balance':'5000','custId':'00015'
    },
    {
        'account':'000011','currency':'156','buyDate':'2016-05-12','startDate':'2016-05-12','endDate':'2017-05-11',
        'balance':'5000','custId':'00215'
    },
    {
        'account':'000011','currency':'156','buyDate':'2016-05-12','startDate':'2016-05-12','endDate':'2017-05-11',
        'balance':'5000','custId':'004343'
    },
    {
        'account':'000011','currency':'156','buyDate':'2016-05-12','startDate':'2016-05-12','endDate':'2017-05-11',
        'balance':'5000','custId':'644543'
    },
    {
        'account':'000011','currency':'156','buyDate':'2016-05-12','startDate':'2016-05-12','endDate':'2017-05-11',
        'balance':'5000','custId':'1000342'
    },
    {
        'account':'000011','currency':'156','buyDate':'2016-05-12','startDate':'2016-05-12','endDate':'2017-05-11',
        'balance':'5000','custId':'44004015'
    },
    {
        'account':'000011','currency':'156','buyDate':'2016-05-12','startDate':'2016-05-12','endDate':'2017-05-11',
        'balance':'5000','custId':'00554'
    },
    {
        'account':'000011','currency':'156','buyDate':'2016-05-12','startDate':'2016-05-12','endDate':'2017-05-11',
        'balance':'5000','custId':'0043015'
    },
    {
        'account':'000011','currency':'156','buyDate':'2016-05-12','startDate':'2016-05-12','endDate':'2017-05-11',
        'balance':'5000','custId':'0005315'
    }
    ];
    // var count = 55;
    var count = 15;
    Mock.Random.increment(1000)

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

    exports.getList = function(config){
        // var reqData = paramBody2Obj(config.body)
        var reqData = paramUrl2Obj(config.url);
        var page = reqData.page;
        var size = reqData.size;
        var condition = reqData.condition ? JSON.parse(reqData.condition) : {};
        var create_at = condition.create_at;
        var type = condition.type;
        var title = condition.title;
        var sort = condition.sort;
        var id = reqData.id;
        var jydsfxyjFqkhmc = condition.jydsfxyjFqkhmc;
        var jydsfxyjFxlx = condition.jydsfxyjFxlx;
        // var { condition, page = 1, size = 20 } = param2Obj(config.url)
        // var { create_at, type, title, sort } = JSON.parse(condition)


        var mockList = List.filter(function (item) {
            if (jydsfxyjFxlx && item.jydsfxyjFxlx !== jydsfxyjFxlx)
                return false;
            if (jydsfxyjFqkhmc && item.jydsfxyjFqkhmc.indexOf(jydsfxyjFqkhmc) < 0)
                return false;
            return true
        });
        if (sort === '-id') {
            mockList = mockList.reverse()
        }
        var pageList = [];
        if (page && size) {
            pageList = mockList.filter(function(item, index){
                return index < size * page && index >= size * (page - 1)
            });
        } else {
            pageList = mockList;
        }
        return {
            total: mockList.length,
            data: pageList
        }
    };

    exports.filterList = function(){
        return pageList;
    }

    exports.save = function(){
        return {test:'test'}
    };
});

