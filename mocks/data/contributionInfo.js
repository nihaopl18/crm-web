//贡献度详情
define(function (require, exports) {
        var List = [
        
        {'contributionType':'存款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '00015'},
        {'contributionType':'贷款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '00015'},
        {'contributionType':'中间业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '00015'},
        {'contributionType':'票据贴现贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '00015'},
        {'contributionType':'客户国际业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '00015'},
        {'contributionType':'存款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '00215'},
        {'contributionType':'贷款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '00215'},
        {'contributionType':'中间业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '00215'},
        {'contributionType':'票据贴现贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '00215'},
        {'contributionType':'客户国际业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '00215'},
        {'contributionType':'存款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '004343'},
        {'contributionType':'贷款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '004343'},
        {'contributionType':'中间业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '004343'},
        {'contributionType':'票据贴现贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '004343'},
        {'contributionType':'客户国际业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '004343'},
        {'contributionType':'存款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '644543'},
        {'contributionType':'贷款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '644543'},
        {'contributionType':'中间业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '644543'},
        {'contributionType':'票据贴现贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '644543'},
        {'contributionType':'客户国际业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '644543'},
        {'contributionType':'存款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '1000342'},
        {'contributionType':'贷款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '1000342'},
        {'contributionType':'中间业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '1000342'},
        {'contributionType':'票据贴现贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '1000342'},
        {'contributionType':'客户国际业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '1000342'},
        {'contributionType':'存款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '44004015'},
        {'contributionType':'贷款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '44004015'},
        {'contributionType':'中间业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '44004015'},
        {'contributionType':'票据贴现贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '44004015'},
        {'contributionType':'客户国际业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '44004015'},
        {'contributionType':'存款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '00554'},
        {'contributionType':'贷款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '00554'},
        {'contributionType':'中间业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '00554'},
        {'contributionType':'票据贴现贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '00554'},
        {'contributionType':'客户国际业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '00554'},
        {'contributionType':'存款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '004315'},
        {'contributionType':'贷款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '004315'},
        {'contributionType':'中间业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '004315'},
        {'contributionType':'票据贴现贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '004315'},
        {'contributionType':'客户国际业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '004315'},
        {'contributionType':'存款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '0043343'},
        {'contributionType':'贷款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '0043343'},
        {'contributionType':'中间业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '0043343'},
        {'contributionType':'票据贴现贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '0043343'},
        {'contributionType':'客户国际业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '0043343'},
        {'contributionType':'存款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '0043015'},
        {'contributionType':'贷款贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '0043015'},
        {'contributionType':'中间业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '0043015'},
        {'contributionType':'票据贴现贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '0043015'},
        {'contributionType':'客户国际业务贡献度','contributionDegree':'0.4','statisticsTime':'2018-01-01','custId': '0043015'},
        
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
            var reqData = paramUrl2Obj(config.url);
            var page = reqData.page;
            var size = reqData.size;
            var condition = reqData.condition ? JSON.parse(reqData.condition) : {};
            var create_at = condition.create_at;
            var type = condition.type;
            var title = condition.title;
            var sort = condition.sort;
            var id = reqData.id;
            var custId = condition.custId;
    
            var mockList = List.filter(function (item) {
                if (custId && item.custId !== custId)
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
        exports.getTree = function(){
            return clients_tree_data;
        };
        exports.getproductInfoTree = function(){
            return productInfo_tree_data;
        };
        exports.filterList = function(){
            return pageList;
        }
    
        exports.save = function(config){
            
            return {
                code: 0
            };
        };
    });
    