/**
 * 业务工具类
 * created by helin3 2017-12-05
 */
(function (yufp, window, factory) {
    var exports = factory(yufp, window, window.document);
    if (typeof define === 'function') {
        define(exports);
    }
    window.yufp.util = exports;
}(yufp, window, function (yufp, window, document) {
    var clipboard = null;
    /**
     * 业务工具类
     * @constructor
     */
    function Utils() {
        // 定义全局的vm对象，避免多次new Vue实例，造成内存泄漏
        this.globalVm = new Vue();
    }

    /**
     * 并发执行，等所有异步方法执行回调方法后，再统一回调
     * var a = function(callback) {
     *     setTimeout(callback, 1000);
     * };
     * var b = function(callback) {
     *     setTimeout(callback, 5000);
     * };
     * var c = function(callback) {
     *     setTimeout(callback, 3000);
     * };
     * yufp.util.parallelRequest(a, b, c, function(){
     *   // 所有异步方法执行完毕再调用
     *   yufp.logger.info(1);
     * });
     */
    Utils.prototype.parallelRequest = function () {
        if (arguments.length < 2) {
            yufp.logger.warn('方法参数个数不对');
        }
        var args = [],
            validFlag = true;
        for (var i = 0, len = arguments.length; i < len; i++) {
            var fn = arguments[i];
            if (typeof fn !== 'function') {
                validFlag = false;
                break;
            }
            args.push(fn);
        }
        if (!validFlag) {
            return;
        }
        var total = args.length - 1;
        var callback = args[total];
        var prEventName = 'parallel-req' + new Date().getTime();
        var prEvent = new CustomEvent(prEventName, {
            detail: { counter: total },
            bubbles: false,
            cancelable: false
        });
        document.body.addEventListener(prEventName, function (e) {
            if (e.detail && e.detail.counter === 0) {
                callback();
            }
        });
        var everyCallback = function () {
            var counter = prEvent.detail.counter;
            prEvent.detail.counter = --counter;
            document.body.dispatchEvent(prEvent);
        };
        for (var i = 0, len = args.length - 1; i < len; i++) {
            var fn = args[i];
            fn(everyCallback);
        }
    };

    /**
     *
     * @param time
     * @param format
     * @returns {*}
     */
    Utils.prototype.dateFormat = function (time, format) {
        if (arguments.length === 0) {
            return null;
        }
        format = format || '{y}-{m}-{d} {h}:{i}:{s}';
        var date;
        if (typeof time === 'object') {
            date = time;
        } else {
            if (('' + time).length === 10) {
                time = parseInt(time) * 1000;
            }
            date = new Date(time);
        }
        var formatObj = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds(),
            a: date.getDay()
        };
        var timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, function (result, key) {
            var value = formatObj[key];
            if (key === 'a') {
                return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
            }
            if (result.length > 0 && value < 10) {
                value = '0' + value;
            }
            return value || 0;
        });
        return timeStr;
    };

    /**
     *
     * 判断当前浏览器类型
     * @author
     * @returns {*}
     */
    Utils.prototype.getExplorer = function () {
        var explorer = window.navigator.userAgent;
        // ie
        if (explorer.indexOf('MSIE') >= 0) {
            return 'ie';
        }
        // firefox
        else if (explorer.indexOf('Firefox') >= 0) {
            return 'Firefox';
        }
        // Chrome
        else if (explorer.indexOf('Chrome') >= 0) {
            return 'Chrome';
        }
        // Opera
        else if (explorer.indexOf('Opera') >= 0) {
            return 'Opera';
        }
        // Safari
        else if (explorer.indexOf('Safari') >= 0) {
            return 'Safari';
        }
    };

    /**
     *
     * 判断当前浏览器类型
     * @param options  导出参数
     * options:{type:'table',ref:table_ref_obj}
     * type 导出类型为table  ref table对应的vue对象ref
     * options:{type:'json',data:{head:[],body:[]}}
     * type 导出类型为json自定义数据  data head为表头,body为数据
     * @author
     * @returns {*}
     */
    Utils.prototype.exportExcelByTable = function (options) {
        var tableRef = options.ref;
        var colums = tableRef.tableColumns;
        var tableColumns = colums.concat([]);
        var collectionHtml = tableRef.$el.getElementsByClassName('el-table__header-wrapper')[0].getElementsByTagName('tr');
        var rowspanIndex = 1;
        var maxrowspan = function (list, parList) {
            if (list && list instanceof Array == true) {
                for (var i = 0; i < list.length; i++) {
                    var obj = list[i];
                    if (obj.children && obj.children instanceof Array == true) {
                        obj.colspan = obj.children.length - 1;
                        if (rowspanIndex < obj.children.length) {
                            parList.map(function (obj_, index_) {
                                if (obj.label != obj_.label) {
                                    obj_.rowspan = (obj_.rowspan == undefined ? 0 : obj_.rowspan) + 1;
                                }
                            });
                            rowspanIndex += 1;
                        }
                        maxrowspan(obj.children, obj.children, i);
                    }
                }
            }
        };
        maxrowspan(tableColumns, tableColumns);
        var getMerge = function (obj, index, rownum, cellNum) {
            var merges_ = {
                s: { // s为开始
                    c: 0, // 开始列
                    r: 0 // 开始取值范围
                },
                e: { // e结束
                    c: 0, // 结束列
                    r: 0 // 结束范围
                }
            };
            if (obj.colspan == 0 && !cellNum) {
                merges_.s.c = index;
                merges_.e.c = index;
            } else if (obj.colspan == 0 && cellNum) {
                merges_.s.c = cellNum;
                merges_.e.c = cellNum;
            } else if (obj.colspan != 0 && !cellNum) {
                merges_.s.c = index;
                merges_.e.c = parseInt(index + obj.colspan);
            } else if (obj.colspan != 0 && cellNum) {
                merges_.s.c = cellNum;
                merges_.e.c = parseInt(cellNum + obj.colspan);
            }
            merges_.s.r = rownum;
            merges_.e.r = parseInt(rownum + obj.rowspan);
            return merges_;
        };


        var head = [];
        var merges = [];
        var headSheel = [];
        var letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var rownum = 0;
        var rowspanIndex_ = 1;
        var addIndex = 0;
        var exportRule = function (list, parList, cellNum) {
            if (list && list instanceof Array == true) {
                for (var i = 0; i < list.length; i++) {
                    var obj = list[i];
                    head.push(obj.label);
                    obj.rowspan = obj.rowspan == undefined ? 0 : obj.rowspan;
                    obj.colspan = obj.colspan == undefined ? 0 : obj.colspan;
                    if (obj.children && obj.children instanceof Array == true) {
                        headSheel.push(letter.charAt(parseInt(i + rownum)) + '1');
                        var mg = getMerge(obj, i, rownum);
                        merges.push(mg);
                        rowspanIndex_ += 1;
                        rownum = rownum + 1;
                        addIndex = 0;
                        exportRule(obj.children, obj.children, i);
                        rownum = rownum - 1;
                        addIndex = parseInt(obj.children.length - 1);
                    } else {
                        var mg = getMerge(obj, i + addIndex, rownum, cellNum + i);
                        merges.push(mg);
                        if (cellNum) {
                            headSheel.push(letter.charAt(cellNum + i) + rowspanIndex_);
                        } else {
                            headSheel.push(letter.charAt(parseInt(i + rowspanIndex_ - 1)) + '1');
                        }
                    }
                }
            }
        };
        exportRule(tableColumns, tableColumns);
        // 获取列的字段名称
        var getColumnsName = function (name, tableColumns) {
            var key;
            for (var i = 0; i < tableColumns.length; i++) {
                if (tableColumns[i].children && tableColumns[i].children instanceof Array == true) {
                    key = getColumnsName(name, tableColumns[i].children);
                } else {
                    if (name == tableColumns[i].label && tableColumns[i].prop) {
                        key = tableColumns[i].prop;
                        break;
                    }
                }
            }
            return key;
        };
        var headList_ = [];
        for (var i = 0; i < head.length; i++) {
            var key = getColumnsName(head[i], tableColumns);
            if (key) {
                headList_[headList_.length] = key;
            }
        }

        var getColumnsDataCode = function (column, tableColumns) {
            var code;
            for (var i = 0; i < tableColumns.length; i++) {
                if (tableColumns[i].children && tableColumns[i].children instanceof Array == true) {
                    key = getColumnsName(column, tableColumns[i].children);
                } else {
                    if (column == tableColumns[i].prop && tableColumns[i].prop) {
                        code = tableColumns[i].dataCode;
                        break;
                    }
                }
            }
            return code;
        };
        var data = [];
        var tableData = [];
        if (options.importType == 'page') {
            tableData = tableRef.data;
        } else if (options.importType == 'selected') {
            tableData = tableRef.selections;
        } else if (options.importType == 'service') {
            yufp.service.request({
                url: options.url,
                async: false,
                data: options.param,
                method: options.method ? options.method : 'GET',
                callback: function (code, message, response) {
                    if (options.jsonData) {
                        var tmp = options.jsonData.split('.');
                        var obj = response;
                        for (var z = 0; z < tmp.length; z++) {
                            if (!obj) {
                                break;
                            }
                            obj = obj[tmp[z]];
                        }
                        tableData = obj;
                    } else {
                        tableData = response.data;
                    }
                }
            });
        }
        for (var i = 0; i < tableData.length; i++) {
            var o = {};
            var rowData = tableData[i];
            for (var j = 0; j < headList_.length; j++) {
                var k = headList_[j];
                var code = getColumnsDataCode(k, tableColumns);
                if (code) {
                    var val = yufp.lookup.convertKey(code, rowData[k]);
                    o['' + k + ''] = val;
                } else {
                    var val = rowData[k];
                    /* 张成龙 添加 为 证件号码 脱敏 sta */
                    if (options.desensitizationData != undefined && options.desensitizationData != '') {
                        if (options.desensitizationData.indexOf(k) > -1) {
                            // 未符合条件的数据进行脱敏 --zcl 添加
                            if (val.length > 8) {
                                // val = val.substr(0, val.length / 2);
                                val = val.substring(0, 4) + '******' + val.substring(val.length - 4);
                            } else {
                                val = '******';
                            }
                        }
                    }
                    /* 张成龙 添加 为 证件号码 脱敏 end */
                    o['' + k + ''] = val;
                }
            }
            data.push(o);
        }

        for (var i = 1; i < collectionHtml.length; i++) {
            data.unshift({});
        }
        var wopts = { bookType: 'xlsx', bookSST: true, type: 'binary' }; // 这里的数据是用来定义导出的格式类型
        var saveAs = function (obj, fileName) { // 当然可以自定义简单的下载文件实现方式
            var tmpa = document.createElement('a');
            tmpa.download = fileName || '下载';
            tmpa.href = URL.createObjectURL(obj); // 绑定a标签
            tmpa.click(); // 模拟点击实现下载
            setTimeout(function () { // 延时释放
                URL.revokeObjectURL(obj); // 用URL.revokeObjectURL()来释放这个object URL
            }, 100);
        };
        var s2ab = function (s) {
            if (typeof ArrayBuffer !== 'undefined') {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i != s.length; ++i) {
                    view[i] = s.charCodeAt(i) & 0xFF;
                }
                return buf;
            } else {
                var buf = new Array(s.length);
                for (var i = 0; i != s.length; ++i) {
                    buf[i] = s.charCodeAt(i) & 0xFF;
                }
                return buf;
            }
        };
        var wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
        data = XLSX.utils.json_to_sheet(data);
        for (var i = 0; i < headSheel.length; i++) {
            data[headSheel[i]] = { t: 's', v: head[i] };
        }
        data['!merges'] = merges;
        wb.Sheets['Sheet1'] = data;
        saveAs(new Blob([s2ab(XLSX.write(wb, wopts))], { type: 'application/octet-stream' }), options.fileName + '.' + (wopts.bookType == 'biff2' ? 'xls' : wopts.bookType));
        tableRef = colums = tableColumns = collectionHtml = maxrowspan = exportRule = getColumnsName = getColumnsDataCode = saveAs = s2ab = options = null;
    };
    /**
     * @description 判断传入的节点是不是选中节点的子节点
     * @param value 当前输入信息
     * @param nodeData 当前节点属性信息
     * @param label 当前节点名称
     */
    Utils.prototype.checkBelongToChooseNode = function (value, node, label) {
        var level = node.level;
        // 如果传入的节点本身就是一级节点就不用校验了
        if (level === 1) {
            return false;
        }
        // 先取当前节点的父节点
        var parentData = node.parent;
        // 遍历当前节点的父节点
        var index = 0;
        while (index < level - 1) {
            // 如果匹配到直接返回
            if (parentData.data[label] && parentData.data[label].indexOf(value) !== -1) {
                return true;
            }
            // 否则的话再往上一层做匹配
            parentData = parentData.parent;
            index++;
        }
        // 没匹配到返回false
        return false;
    };
    Utils.prototype.array2tree = function (data, options) {
        var _options = { id: 'id', pid: 'parentId', root: '0' };
        yufp.extend(_options, options || {});
        var idField = _options.id,
            pidField = _options.pid;
        var root, children = [];
        if (typeof _options.root === 'object') {
            root = _options.root;
        } else {
            var tempObj = {};
            tempObj[idField] = _options.root;
            root = tempObj;
        }
        var rId = '' + root[idField];
        for (var i = 0, len = data.length; i < len; i++) {
            var d = data[i];
            if (rId === '' + d[idField]) {
                root = d;
            } else if (rId === '' + d[pidField]) {
                children.push(d);
            }
        }
        root.id = root[idField];
        children = root.children ? root.children.concat(children) : children;
        root.children = children;
        for (var i = 0, len = root.children.length; i < len; i++) {
            _options.root = root.children[i];
            root.children[i] = this.array2tree(data, _options);
        }
        return root;
    };
    /** 根据数组和对应属性返回满足el-tree的树形数据,
     *id: 对应id,
     *pid: 对应pid,
     *label: 对应展示字段,
     *root: 如果值为空或不存在则计算
     */
    Utils.prototype.genTree = function (data, attr) {
        var root = {};
        if (data == null || data.length == 0) {
            return [];
        }
        if (attr.root == null || attr.root == undefined || attr.root == '') {
            var getRootData = function (data, attributes) {
                var _root = {};
                _root = data[0];
                for (var k = 1; k < data.length; k++) {
                    var i = 1;
                    for (; i < data.length; i++) {
                        if (data[i][attributes.id] == _root[attributes.pid]) {
                            _root = data[i];
                            break;
                        }
                    }
                    if (i == data.length - 1) {
                        break;
                    }
                }
                return _root;
            };

            root.id = getRootData(data, attr)[attr.pid];
        } else if (typeof attr.root == 'object') {
            var root = attr.root;
            root.id = root[attr.id] === undefined ? root.id : root[attr.id];
            root.pid = root[attr.pid] === undefined ? root.pid : root[attr.pid];
            root.label = root[attr.label] === undefined ? root.label : root[attr.label];
        } else {
            for (var i in data) {
                if (data[i][attr.id] == attr.root) {
                    root.id = data[i][attr.pid];
                    break;
                }
            }
            root.id = root.id == undefined ? attr.root : root.id;
        }

        var genTreeData = function (data, attr) {
            var ckey = {},
                pkey = {};

            for (var i = 0; i < data.length; i++) {
                var row = data[i];
                row.id = row[attr.id];
                row.pid = row[attr.pid];
                row.label = row[attr.label];
                row.children = [];

                ckey[row.id] = row;
                if (pkey[row.pid]) {
                    pkey[row.pid].push(row);
                } else {
                    pkey[row.pid] = [row];
                }

                var c = pkey[row.id];
                if (c) {
                    row.children = c.concat();
                }

                var p = ckey[row.pid];
                if (p) {
                    p.children.push(row);
                }
            }
            return pkey;
        };

        if (root.label) {
            root.children = genTreeData(data, attr)[root.id];
            return [root];
        }
        return genTreeData(data, attr)[root.id];
    };

    // 实现对象的深度克隆
    Utils.prototype.clone = function (obj) {
        var result = {};
        if (typeof obj == 'object') {
            var _this = this;
            var objClone = function (o) {
                var t = {};
                for (var k in o) {
                    var copy = o[k];
                    if (typeof copy == 'object') {
                        t[k] = _this.objClone(copy);
                    } else {
                        t[k] = o[k];
                    }
                }
                return t;
            };
            result = objClone(obj);
        } else {
            yufp.logger.error('clone方法目前只支持对象!');
        }
        return result;
    };
    Utils.prototype.getRSAPublicKey = function () {
        return 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrDUHc85ADQVxXRP4M90nqttWoZctV6JJVVdPjIle5vd9G2/4kgIhNc78Jd+ENxg+n4Gj9UMwNhJmb2jnMaW3zyGB+qi/ZrMO5dEUhW8salirzRgGg/4Arz4ObPmCWlZsws3Ij/3IEsFD3vMdIZD2j8b33DAbj47PjcCcMbtHYuQIDAQAB';
    };
    /**
     * 为url添加token信息
     * @param url
     * @returns {string}
     */
    Utils.prototype.addTokenInfo = function (url) {
        var token = 'access_token=';
        var _url = '';
        if (url == null || url == '') {
            return _url;
        }

        if (!url.indexOf(token) > -1) {
            _url = url + (url.indexOf('?') > -1 ? '&' : '?') + token + yufp.service.getToken();
        }
        return _url;
    };

    Utils.prototype.download = function (url) {
        if (url) {
            if (url.indexOf('http') <= -1) {
                // 当不包含http时拼接gateway地址
                url = yufp.service.getUrl({
                    url: url
                });
            }
        } else {
            this.$message('必须设置请求url!', '警告');
        }
        // url添加token
        url = this.addTokenInfo(url);
        // 模拟a标签进行下载
        var a = document.createElement('a');
        a.href = url;
        a.click();
    };


    /**
     * @created by zhangkun6
     * @updated by 2018/01/14
     * @description 数字金额格式化(千分位)
     */
    Utils.prototype.moneyFormatter = function (money, num) {
        /*
         * 参数说明：
         * money：要格式化的数字
         * num：保留几位小数
         * */
        let string = '';
        if (num == 'no') {
            num = 0;
            string = 'no'
        } else {
            num = num > 0 && num <= 20 ? num : 2;
        }
        money = parseFloat((money + '').replace(/[^\d.-]/g, '')).toFixed(num) + '';
        var l = money.split('.')[0],
            r = money.split('.')[1];
        var reg = /(-?\d+)(\d{3})/;
        while (reg.test(l)) {
            l = l.replace(reg, "$1,$2");
        }
        if (string == 'no') {
            return l;
        } else {
            return l + '.' + r;
        }
    };

    /**
     * @created by zhangkun6
     * @updated by 2018/05/03
     * @description 数值百分比显示
     */
    Utils.prototype.toPercent = function (money, num) {
        /*
         * 参数说明：
         * money：要格式化的数字
         * num：保留几位小数
         * */
        num = num > 0 && num <= 20 ? num : 2;
        money = parseFloat(money * 100 + '').toFixed(num) + '%';
        return money;
    };
    /**
     * @created by zhangkun6
     * @updated by 2018/05/03
     * @description 数值百分比显示
     */
    Utils.prototype.toPercentno = function (money, num) {
        /*
         * 参数说明：
         * money：要格式化的数字
         * num：保留几位小数
         * */
        num = num > 0 && num <= 20 ? num : 2;
        money = parseFloat(money * 100 + '').toFixed(num);
        return money;
    };

    /**
     * @created by zhangkun6
     * @updated by 2018/01/14
     * @description 数字金额转汉字金额
     */
    Utils.prototype.moneyToUpper = function (money) {
        /*
         * 参数说明：
         * money：要转化的数字
         * */
        // 汉字的数字
        var cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        // 基本单位
        var cnIntRadice = ['', '拾', '佰', '仟'];
        // 对应整数部分扩展单位
        var cnIntUnits = ['', '万', '亿', '兆'];
        // 对应小数部分单位
        var cnDecUnits = ['角', '分', '毫', '厘'];
        // 整数金额时后面跟的字符
        var cnInteger = '整';
        // 整型完以后的单位
        var cnIntLast = '元';
        // 最大处理的数字
        var maxNum = 999999999999999.9999;
        // 金额整数部分
        var integerNum;
        // 金额小数部分
        var decimalNum;
        // 输出的中文金额字符串
        var chineseStr = '';
        // 分离金额后用的数组，预定义
        var parts;
        if (money == '') {
            return '';
        }
        money = parseFloat(money);
        if (money >= maxNum) {
            // 超出最大处理数字
            return '';
        }
        if (money == 0) {
            chineseStr = cnNums[0] + cnIntLast + cnInteger;
            return chineseStr;
        }
        // 转换为字符串
        money = money.toString();
        if (money.indexOf('.') == -1) {
            integerNum = money;
            decimalNum = '';
        } else {
            parts = money.split('.');
            integerNum = parts[0];
            decimalNum = parts[1].substr(0, 4);
        }
        // 获取整型部分转换
        if (parseInt(integerNum, 10) > 0) {
            var zeroCount = 0;
            var IntLen = integerNum.length;
            for (var i = 0; i < IntLen; i++) {
                var n = integerNum.substr(i, 1);
                var p = IntLen - i - 1;
                var q = p / 4;
                var m = p % 4;
                if (n == '0') {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        chineseStr += cnNums[0];
                    }
                    // 归零
                    zeroCount = 0;
                    chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                }
                if (m == 0 && zeroCount < 4) {
                    chineseStr += cnIntUnits[q];
                }
            }
            chineseStr += cnIntLast;
        }
        // 小数部分
        if (decimalNum != '') {
            var decLen = decimalNum.length;
            for (var i = 0; i < decLen; i++) {
                var n = decimalNum.substr(i, 1);
                if (n != '0') {
                    chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                }
            }
        }
        if (chineseStr == '') {
            chineseStr += cnNums[0] + cnIntLast + cnInteger;
        } else if (decimalNum == '') {
            chineseStr += cnInteger;
        }
        return chineseStr;
    };

    /**
     * @created by zhangkun6
     * @updated by 2018/01/19
     * @description 汉字金额转数字金额
     */
    Utils.prototype.upperToMoney = function (upper) {
        /*
         * 参数说明：
         * upper：要转化的汉字
         */
        // 金额数值
        var num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        // 汉字的数字
        var cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        // 对应单位的乘积
        var upperMap = [10, 100, 1000];
        // 基本单位
        var cnIntRadice = ['拾', '佰', '仟'];
        // 对应整数部分扩展单位
        // var cnIntUnits = ['万', '亿', '兆'];
        // 对应小数部分单位乘积
        var cnDecMap = [0.1, 0.01];
        // 对应小数部分单位
        var cnDecUnits = ['角', '分'];
        // 金额整数部分
        var integerNum;
        // 金额小数部分
        var decimalNum;
        // 输出的数字金额字符串
        var moneyNum;
        // 金额单位亿之前的数值数组
        var maxArray = [];
        // 金额单位亿和万之间的数值数组
        var middleArray = [];
        // 金额单位万和元之间的数值数组
        var minArray = [];

        var part = upper.split('元');
        integerNum = part[0];
        decimalNum = part[1].split('');
        if (integerNum.indexOf('亿') !== -1) {
            maxArray = integerNum.split('亿')[0].split('');
            if (integerNum.indexOf('万') !== -1) {
                middleArray = integerNum.split('亿')[1].split('万')[0].split('');
                minArray = integerNum.split('亿')[1].split('万')[1].split('');
            } else {
                minArray = integerNum.split('亿')[1].split('');
            }
        } else if (integerNum.indexOf('万') !== -1) {
            middleArray = integerNum.split('万')[0].split('');
            minArray = integerNum.split('万')[1].split('');
        } else {
            minArray = integerNum.split('');
        }
        var getNum = function (upArray, cnNums, cnRadice, numArray, map) {
            var length = upArray.length;
            var num = 0;
            var sum = 0;
            for (var i = 0; i < length; i++) {
                var index = cnNums.indexOf(upArray[i]);
                var _index = cnRadice.indexOf(upArray[i]);
                if (index !== -1) {
                    num += numArray[index];
                    if (i == (length - 1)) {
                        sum += num;
                    }
                }
                if (_index !== -1) {
                    num *= map[_index];
                    sum += num;
                    num = 0;
                }
            }
            return sum;
        };
        var maxSum = getNum(maxArray, cnNums, cnIntRadice, num, upperMap);
        var middleSun = getNum(middleArray, cnNums, cnIntRadice, num, upperMap);
        var minSun = getNum(minArray, cnNums, cnIntRadice, num, upperMap);
        var cesSum = getNum(decimalNum, cnNums, cnDecUnits, num, cnDecMap);
        moneyNum = (maxSum * 100000000) + (middleSun * 10000) + minSun + cesSum;
        return moneyNum;
    };

    // 菜单访问日志工具
    Utils.prototype.logInfo = function (log, url) {
        if (yufp.settings.debugModel) {
            return false;
        }
        yufp.service.request({
            url: url,
            method: 'post',
            data: log,
            callback: function (code, msg, response) {
                if (code !== 0 || !response) {
                    yufp.logger.warn('日志上传失败');
                }
            }
        });
    };
    // 按钮操作日志工具
    Utils.prototype.butLogInfo = function (menuId, menuName, butTitle) {
        if (yufp.settings.debugModel) {
            return false;
        }
        var log = {
            'userId': yufp.session.userId,
            'orgId': yufp.session.org.id,
            'menuId': menuId,
            'operFlag': '按钮操作',
            'logTypeId': '4',
            'beforeValue': '',
            'afterValue': '',
            'operObjId': menuName,
            'content': '操作菜单[' + menuName + ']的按钮:' + butTitle
        };
        yufp.service.request({
            url: yufp.frame.baseFrameOptions.viewMenuLogUrl,
            method: 'post',
            data: log,
            callback: function (code, msg, response) {
                if (code !== 0 || !response) {
                    yufp.logger.warn('日志上传失败');
                }
            }
        });
    };
    var utils = new Utils();

    /**
     * 日期默认格式
     * @returns {*}
     */
    Date.prototype.toJSON = function () {
        return utils.dateFormat(this, '{y}-{m}-{d}');
    };
    /**
     * 复制功能
     */
    Utils.prototype.setClipBoardData = function (dom, str, success, err) {
        var func = function () {
            if (clipboard == null) {
                clipboard = new window.ClipboardJS(dom, {
                    // 通过target指定要复印的节点
                    text: function () {
                        return str;
                    }
                });
            }
            clipboard.on('success', function (e) {
                if (success && yufp.type(success) == 'function') {
                    success(e);
                }
            });
            clipboard.on('error', function (e) {
                if (err && yufp.type(err) == 'function') {
                    err(e);
                }
            });
        };
        if (clipboard == null) {
            yufp.require.require('./libs/clipboard/clipboard.min.js', func);
        } else {
            func();
        }
    };


    Utils.prototype.returnUpOrDownClass = function (data) {
        const tempData = parseFloat(data);
        if (data && !isNaN(tempData)) {
            return tempData > 0 ? 'el-icon-caret-top red' : 'el-icon-caret-bottom green';
        } else {
            return 'el-icon-caret-top red';
        }
    };

    Utils.prototype.returnPercent = function (data) {
        const tempData = parseFloat(data);
        if (data && !isNaN(tempData)) {
            const subData = parseFloat(tempData) * 100;
            return Math.abs(subData.toFixed(2)); // 取绝对值
        } else if (data == 0) {
            return '0';
        } else {
            return '-';
        }
    };
    /**
     *
     * @param {*需要打印的页面容器} container
     * @param {*pdf文件名称} fileName
     */
    Utils.prototype.exportPDF = function (container, fileName) {
        var pdfDom = $(container);
        var w = pdfDom.width(); // 获得该容器的宽
        var h = pdfDom.height(); // 获得该容器的高
        var offsetTop = pdfDom.offset().top; // 获得该容器到文档顶部的距离
        var offsetLeft = pdfDom.offset().left; // 获得该容器到文档最左的距离
        var canvas = document.createElement('canvas');
        var abs = 0;
        var win_i = $(window).width(); // 获得当前可视窗口的宽度（不包含滚动条）
        var win_o = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）
        if (win_o > win_i) {
            abs = (win_o - win_i) / 2; // 获得滚动条长度的一半
        }
        canvas.width = w * 4; // 将画布宽&&高放大4倍
        canvas.height = h * 4;
        var context = canvas.getContext('2d');
        context.scale(4, 4);
        context.translate(-offsetLeft - abs, -offsetTop);
        // 这里默认横向没有滚动条的情况，因为offset.left(),有无滚动条的时候存在差值，因此
        // translate的时候，要把这个差值去掉
        html2canvas(pdfDom, {
            allowTaint: true,
            taintTest: true,
            canvas: canvas,
            dpi: 172, // 导出pdf清晰度
            onrendered: function (canvas) {
                // 开始canvas截图
                // 开始准备工作
                var contentWidth = canvas.width;
                var contentHeight = canvas.height;

                // 一页pdf显示html页面生成的canvas高度;
                var pageHeight = contentWidth / 595.28 * 841.89;
                // 未生成pdf的html页面高度
                var leftHeight = contentHeight;
                // pdf页面偏移
                var position = 0;
                // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                var imgWidth = 555.28;
                var imgHeight = 555.28 / contentWidth * contentHeight;

                var pageData = canvas.toDataURL('image/jpeg', 1.0);

                var pdf = new jsPDF('', 'pt', 'a4');
                // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                // 当内容未超过pdf一页显示的范围，无需分页
                if (leftHeight < pageHeight) {
                    pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
                } else {
                    while (leftHeight > 0) {
                        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                        leftHeight -= pageHeight;
                        position -= 841.89;
                        // 避免添加空白页
                        if (leftHeight > 0) {
                            pdf.addPage();
                        }
                    }
                }

                let date = new Date()
                let year = date.getFullYear() + ''
                let month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 + '' : '0' + (date.getMonth() + 1)
                let day = date.getDate() >= 10 ? date.getDate() + '' : '0' + date.getDate()
                let hh = date.getHours() >= 10 ? date.getHours() + '' : '0' + date.getHours()
                let mm = date.getMinutes() >= 10 ? date.getMinutes() + '' : '0' + date.getMinutes()
                let ss = date.getSeconds() >= 10 ? date.getSeconds() + '' : '0' + date.getSeconds()
                let time = year + month + day + hh + mm + ss;

                pdf.save(fileName + time + '.pdf');
            }
        });
    };
    /**
     *
     * @param {*} id
     */
    Utils.prototype.valid2jump = function (id, callback) {
        var params = {
            custId: id,
            mgrId: yufp.session.userId
        };
        yufp.service.request({
            method: 'GET',
            url: '/api/pcustviewheader/ispcustview',
            data: { condition: JSON.stringify(params) },
            callback: function (code, message, response) {
                if (code === 0 && response.code === 0) {
                    callback(response.data);
                }
            }
        });
    };
    /**
   * 解析字符串
   */
    Utils.prototype.getList = function (data) {
        var compare = function (property) {
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            };
        };
        var toHump = function (name) {
            return name.toLowerCase().replace(/\_(\w)/g, function (all, letter) {
                return letter.toUpperCase();
            });
        };
        var retuData = {
            queryList: [],
            colunmNamelist: [],
            datacodeList: '',
            queryDateList: {},
            key: [],
            amt: '',
            dstrType: '',
            dataAuth: '',
            model: {},
            maxDstrRate: '',
            minAmt: '',
            dstrPeriod: '',
            allowRepeat: ''
        };
        var datacodeList = '';
        var queryDateList = {};
        var dataTableArray = Object.values(data.tableInfo);
        var dataTable = dataTableArray.filter(function (obj) {
            return obj.funSubType == '01';
        });
        if (dataTable.length > 0) {
            var tableCode = dataTable[0].tableCode;
            var columnInfoListArray = Object.values(data.columnInfo[tableCode]);
            retuData.dstrType = data.pageCfgInfo.DSTR_TYPE;
            retuData.dataAuth = data.pageCfgInfo.DATA_AUTH;
            retuData.maxDstrRate = data.pageCfgInfo.MAX_DSTR_RATE;
            retuData.dstrPeriod = data.pageCfgInfo.DSTR_PERIOD;
            retuData.allowRepeat = data.pageCfgInfo.ALLOW_REPEAT;
            if (retuData.dstrType == '2') {
                retuData.minAmt = data.pageCfgInfo.MIN_AMT;
            }
            retuData.model.interOrg = data.pageCfgInfo.INTER_ORG;
            retuData.model.interDept = data.pageCfgInfo.INTER_DEPT;
            retuData.model.virtualDstr = data.pageCfgInfo.VIRTUAL_DSTR;
            retuData.model.interOrgLv = data.pageCfgInfo.INTER_ORG_LV;
            for (var i = 0; i < columnInfoListArray.length; i++) {
                var queryModel = columnInfoListArray[i];
                var columnCfgInfo = data.columnCfgInfo[queryModel.columnCode];
                // 查询项
                if (columnCfgInfo.SEARCH_FIELD == '1') {
                    var addFlag = true;
                    var model = {};
                    model.name = queryModel.columnCnName;
                    model.ename = toHump(queryModel.columnName);
                    if (columnCfgInfo.LOOKUP_ID != undefined && columnCfgInfo.LOOKUP_ID != null) {
                        model.dataCode = columnCfgInfo.LOOKUP_ID;
                        model.type = 'select';
                    } else {
                        if (columnCfgInfo.SEARCH_TYPE == 'orgchoose') {
                            model.type = 'yufp-org-tree';
                            if (columnCfgInfo.SUB_ORG == '1') {
                                // model.dataRoot = 'yufp.session.details.grantOrgCode';
                                model.dataRoot = 'yufp.session.org.code';
                            }
                        } else if (columnCfgInfo.SEARCH_TYPE == 'userchoose') {
                            model.type = 'yufp-user-selector';
                            if (columnCfgInfo.SUB_ORG == '1') {
                                // model.dataRoot = 'yufp.session.details.grantOrgCode';
                                model.dataRoot = 'yufp.session.org.code';
                            }
                        } else if (columnCfgInfo.SEARCH_TYPE == 'dateSpan') {
                            let dateFieldFrom = {};
                            let dateFieldTo = {};
                            yufp.clone(model, dateFieldFrom);
                            yufp.clone(model, dateFieldTo);
                            let dateFormat = '';
                            if (columnCfgInfo.DATE_FORMAT == 'Ymd') {
                                dateFormat = 'yyyyMMdd';
                            } else { // 默认格式 Y-m-d
                                dateFormat = 'yyyy-MM-dd';
                            }

                            dateFieldFrom.ename += 'Span1';
                            dateFieldFrom.name += '从';
                            dateFieldFrom.type = 'datepicker';
                            dateFieldFrom.editable = false;
                            dateFieldFrom.format = dateFormat;

                            dateFieldTo.ename += 'Span2';
                            dateFieldTo.name += '到';
                            dateFieldTo.type = 'datepicker';
                            dateFieldTo.editable = false;
                            dateFieldTo.format = dateFormat;
                            retuData.queryList.push(dateFieldFrom);
                            retuData.queryList.push(dateFieldTo);
                            queryDateList[dateFieldFrom.ename] = dateFormat; // 记录 日期组件值得格式，查询方法使用
                            queryDateList[dateFieldTo.ename] = dateFormat; // 记录 日期组件值得格式，查询方法使用
                            addFlag = false;
                        } else if (columnCfgInfo.SEARCH_TYPE == 'dateOnly') {
                            let dateFieldOnly = {};
                            yufp.clone(model, dateFieldOnly);
                            let dateFormat = '';
                            if (columnCfgInfo.DATE_FORMAT == 'Ymd') {
                                dateFormat = 'yyyyMMdd';
                            } else { // 默认格式 Y-m-d
                                dateFormat = 'yyyy-MM-dd';
                            }

                            dateFieldOnly.ename += 'Only';
                            dateFieldOnly.type = 'datepicker';
                            dateFieldOnly.editable = false;
                            dateFieldOnly.format = dateFormat;
                            queryDateList[dateFieldOnly.ename] = dateFormat; // 记录 日期组件值得格式，查询方法使用
                            retuData.queryList.push(dateFieldOnly);
                            addFlag = false;
                        } else if (columnCfgInfo.SEARCH_TYPE == 'moneySpan') {
                            let dateFieldFrom = {};
                            let dateFieldTo = {};
                            yufp.clone(model, dateFieldFrom);
                            yufp.clone(model, dateFieldTo);

                            dateFieldFrom.ename += 'MoneySpan1';
                            dateFieldFrom.name += '从';
                            dateFieldFrom.type = 'num';
                            dateFieldFrom.editable = false;

                            dateFieldTo.ename += 'MoneySpan2';
                            dateFieldTo.name += '到';
                            dateFieldTo.type = 'num';
                            retuData.queryList.push(dateFieldFrom);
                            retuData.queryList.push(dateFieldTo);
                            addFlag = false;
                        } else {
                            model.type = 'input';
                        }
                    }
                    if (columnCfgInfo.ALLOW_BLANK == '0') {
                        model.rule = 'required';
                    }
                    if (addFlag) {
                        retuData.queryList.push(model);
                    }
                }

                // 显示列
                if (columnCfgInfo.GRID_FIELD == '1') {
                    var model = {};

                    model.name = queryModel.columnCnName;
                    model.ename = toHump(queryModel.columnName);
                    model.sort = queryModel.sort;
                    if (columnCfgInfo.LOOKUP_ID != undefined && columnCfgInfo.LOOKUP_ID != null) {
                        model.dataCode = columnCfgInfo.LOOKUP_ID;
                        datacodeList = datacodeList + columnCfgInfo.LOOKUP_ID + ',';
                    }
                    if (columnCfgInfo.RESULT_WIDTH != undefined && columnCfgInfo.LOOKUP_ID != null) {
                        model.width = columnCfgInfo.RESULT_WIDTH;
                    }
                    retuData.colunmNamelist.push(model);
                }
                // 主键
                if (columnCfgInfo.IS_PK == '1') {
                    var model = {};
                    model.name = queryModel.columnCnName;
                    model.ename = toHump(queryModel.columnName);
                    model.sort = queryModel.sort;
                    retuData.key.push(model);
                }
                // 金额
                if (columnCfgInfo.IS_AMT == '1') {
                    retuData.amt = toHump(queryModel.columnName);
                }
            }
        }
        if (retuData.colunmNamelist.length > 0) {
            retuData.colunmNamelist = retuData.colunmNamelist.sort(compare('sort'));
        }
        // 手动插入字段DSTR_STS
        var obj = {};
        obj.type = 'select';
        obj.dataCode = 'DSTR_STS';
        obj.name = '分配状态';
        obj.ename = 'dstrSts';
        datacodeList = datacodeList + 'DSTR_STS';

        retuData.queryList.push(obj);
        retuData.colunmNamelist.push(obj);
        retuData.datacodeList = datacodeList;
        retuData.queryDateList = queryDateList;
        return retuData;
    };

    Utils.prototype.downTableList = function (seqno, hashCode, callback) {
        let arrCrmList = [];
        var params = {};
        if (seqno) {
            params.seqno = seqno;
        } else {
            params.userId = yufp.session.userId;
        }
        yufp.service.request({
            method: 'GET',
            data: {
                condition: JSON.stringify(params)
            },
            url: '/api/cmssfcifq/EsExportQueryList',
            callback: function (code, message, response) {
                if (code === 0 && response.code === 0) {
                    yufp.util.butLogInfo(hashCode, '灵活查询', '下载列表');
                    let listArr = response.data;
                    let crmListData = listArr.crmFEsExportQueryList
                    let crmFEsExData = listArr.crmFEsExportZhQueryList
                    for (let i = 0; i < crmListData.length; i++) {
                        for (let j = i + 1; j < crmListData.length; j++) {
                            if (crmListData[i].seqno === crmListData[j].seqno) {
                                crmListData[i].spread += ',' + crmListData[j].spread;
                                crmListData[i].width = '180';
                                crmListData[i].showOverflowTooltip = true;
                                crmListData.splice(j, 1);
                                j--;
                            }
                        }
                    }
                    let newCrmList = JSON.parse(JSON.stringify(crmListData))
                    for (let z = 0; z < newCrmList.length; z++) {
                        let arr = []
                        newCrmList[z].columnName = '';
                        for (let t = 0; t < crmFEsExData.length; t++) {
                            if (newCrmList[z].seqno === crmFEsExData[t].seqno) {
                                arr.push(crmFEsExData[t])
                            }
                        }
                        let str = '';
                        for (let h = 0; h < arr.length; h++) {
                            if (arr[h].columnName !== null) {
                                str += arr[h].columnName + '_'
                            } else {
                                str = '客户号' + '_' + '客户名称' + '_'
                            }
                        }
                        let newStr = str.substring(0, str.lastIndexOf('_'))
                        newCrmList[z].columnName = newStr;
                        arr = null;
                        let crmObj = {
                            columnName: newCrmList[z].columnName,
                            spread: newCrmList[z].spread,
                            status: newCrmList[z].status,
                            createUser: newCrmList[z].createUser,
                            createDate: newCrmList[z].createDate,
                            instanceId: newCrmList[z].instanceId,
                            seqno: newCrmList[z].seqno,
                            password: newCrmList[z].password
                        }
                        arrCrmList.push(crmObj)
                    }
                }
                callback(arrCrmList)
            }
        })
    }
    return utils;
}));