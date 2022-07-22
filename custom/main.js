/**
 * Created by jiangcheng 2018-02-27.
 * @description 全局配置入口
 * @update 20180601 liujie yufp.config增加debug 参数
 */
(function (window, yufp) {
    var config = window.YUFP_SYS_CONFIG,
        debug = config.debugModel,
        mockModel = config.mockModel;
    yufp.config({
        // 别名配置
        alias: {
            'vue': './libs/vue/vue' + (debug ? '' : '.min') + '-2.5.13.js',
            'mock': './libs/mockjs/mock' + (debug ? '' : '.min') + '.js',
            'jquery': './libs/jquery/jquery' + (debug ? '' : '.min') + '.js',
            'echarts': './libs/echarts/echarts.min.js',
            'html2canvas': './libs/html2canvas.min.js'
        },
        charset: config.charset,
        version: config.version,
        debug: config.debugModel
    });

    // css依赖库
    var libsCss = [
        './libs/yuwp-ui/lib/theme-default/index.css',
        './libs/element-ui-1/lib/theme-chalk/index.css',
        './libs/element-ui/index.css',
        './themes/common/icoFonts/icoFonts.css',
        './themes/dyTheme/main.css'
    ];

    // js依赖库
    var libsJs = [
        'vue',
        'jquery',
        'html2canvas',
        './libs/jspdf.debug.min.js-master/jspdf.debug.js',
        './libs/element-ui-1/lib/index.js',
        './libs/element-ui/index.js',
        './libs/yuwp-ui/lib/index.js',
        './custom/common/app.data.service.js',
        './custom/plugins/yufp.settings.js',
        './custom/plugins/yufp.localstorage.js',
        './custom/plugins/yufp.sessionstorage.js',
        './custom/plugins/yufp.service.js',
        './custom/plugins/yufp.validator.js',
        './custom/plugins/yufp.util.js',
        './custom/plugins/yufp.lookup.js',
        './custom/plugins/yufp.base64.js',
        './custom/plugins/yufp.session.js',
        './custom/plugins/yufp.frame.js',
        // './custom/plugins/yufp.vue.directive.resize.js',
        './custom/common/app.js',
        './custom/widgets/js/yufpExtTree.js',
        './custom/widgets/js/yufpProdTreeSelector.js',
        './custom/widgets/js/yufpOrgTree.js',
        './custom/widgets/js/yufpCustTree.js',
        './custom/widgets/js/yufpOrgAllTree.js',
        './custom/widgets/js/yufpCustGroup.js',
        './custom/widgets/js/yufpAddCust.js',
        // './custom/widgets/js/yufpRoleSelector.js,',
        './custom/widgets/js/yufpAllotSelector.js',
        './custom/widgets/js/yufpSelectCust.js',
        './custom/widgets/js/yufpProdSelector.js',
        './custom/widgets/js/yufpProdCatlTree.js',
        './custom/widgets/js/YufpUserSelector.js',
        './custom/widgets/js/YufpWfInit.js',
        './custom/widgets/js/yuquarter.js',
        './custom/widgets/js/YufpMgrSelector.js',
        './custom/widgets/js/YufpMgrAllSelector.js',
        './custom/widgets/js/yufpAllCustSelector.js',
        './custom/widgets/js/yufpDptTree.js',
        '/custom/widgets/js/yufpGovernedCustSelector.js',
        './custom/widgets/js/yufpUploadTable.js',
        './custom/widgets/js/yufpAllCustSelector.js',
        './custom/widgets/js/yufpMktActiSelector.js',
        './custom/widgets/js/yufpActFileUpload.js',
        './custom/widgets/js/yufpTagList.js',
        'custom/widgets/js/flexibleQuery.js',
        'custom/widgets/js/flexiblemanyQuery.js',
        './custom/widgets/js/YufpNodeCmp.js'
    ];

    // 路由表
    var routeTables = [
        './custom/route-tables/route.common.js',
        './custom/route-tables/route.calculator.js',
        'custom/route-tables/route.view.js',
        'custom/route-tables/route.echain.js',
        'custom/route-tables/route.custGroup.js',
        'custom/route-tables/route.indexPage.js',
        'custom/route-tables/route.activity.js',
        './custom/route-tables/route.custView.js',
    ];

    // 合并lib
    var libs = libsCss.concat(libsJs, routeTables);
    yufp.require.use(libs).done(function () {
        // yufp别名
        window.yu = window.yufp;
        // 设置配置
        yufp.settings.config(config);
        // mock加载
        if (mockModel) {
            yufp.require.require('./mocks/index.js');
        }
        // 紧凑模式
        if (config.compactMode) {
            yufp.require.require('./themes/common/compact.css');
        }
        var logoutFlag = true;
        // 加入请求过滤器
        yufp.service.addFilter({
            // 过滤器名称
            name: 'messageParser',
            // 请求前触发
            before: function (event) {
                // 定义请求头
                var headers = {};
                // 定义请求数据
                var reqData = {
                    // 请求头
                    headers: headers,
                    // 请求数据
                    data: event.data
                };
                // 保存导出数据
                event.code = 0;
                event.data = reqData;
                // 返回处理标志，true则继续处理，false则中断处理
                return true;
            },

            // 数据返回后触发
            after: function (event) {
                // 只处理JSON对象
                if (yufp.type(event.data) == 'object' && yufp.type(event.data.header) != 'undefined') {
                    // 获取响应头
                    var rspHeader = event.data.header;
                    // 获取响应数据
                    var rspData = event.data.data;

                    if (yufp.type(rspHeader.code) == 'undefined' || rspHeader.code == 0) {
                        // 保存导出数据
                        event.code = 0;
                        event.message = '';
                        event.data = rspData;
                        // 返回处理标志，true则继续处理，false则中断处理
                        return true;
                    } else {
                        // 保存导出数据
                        event.code = rspHeader.code;
                        event.message = rspHeader.msg;
                        event.data = rspData;
                        // 返回处理标志，true则继续处理，false则中断处理
                        return true;
                    }
                }

                // 返回处理标志，true则继续处理，false则中断处理
                return true;
            },
            // HTTP请求异常
            exception: function (event) {
                var status = event.xhr.status;
                var flag = true;
                var me = yufp.custom.vue({});
                var responseUrl = event.xhr.responseURL;
                if (responseUrl.indexOf(yufp.session.settings.logoutUrl) > -1) {
                    logoutFlag = false;
                }
                switch (status) {
                    case 401:
                        if (window.localStorage.getItem('tokenfalse') == null || window.localStorage.getItem('tokenfalse') == true) {
                            window.localStorage.setItem('tokenfalse', false);
                            me.$message({
                                message: '用户会话失效,请重新登录!',
                                type: 'warning'
                            });
                            yufp.session.logout(logoutFlag);
                            setTimeout(function () {
                                window.localStorage.setItem('tokenfalse', true);
                            }, 3000);
                        }
                        // me.$message({
                        //   message: '用户会话失效,请重新登录!',
                        //   type: 'warning'
                        // });
                        flag = false;
                        break;
                    case 403:
                        me.$message({
                            message: '您无权限访问，请联系系统管理员!',
                            type: 'warning'
                        });
                        flag = false;
                        break;
                    case 404:
                        me.$message({
                            message: '系统错误，请联系系统管理员!',
                            type: 'error'
                        });
                        flag = false;
                        break;
                    /* ==============wzy，20190308，增加这段逻辑处理================开始============***/
                    /**
                     * 请求超时，
                     * 后台返回的状态status=='0'，
                     * 且编码event.code=='1'，
                     * 且信息event.message=='timeout'
                     */
                    case 0:
                        if (event && event.code == '1' && event.message == 'timeout') {
                            me.$message({
                                message: '请求超时，请重新操作！',
                                type: 'error'
                            });
                        } else {
                            me.$message({
                                message: '系统错误，请联系系统管理员!',
                                type: 'error'
                            });
                        }
                        flag = false;
                        break;
                    /* ==============wzy，20190308，增加这段逻辑处理================结束============***/
                    default:
                        me.$message({
                            message: '系统错误，请联系系统管理员!',
                            type: 'error'
                        });
                        flag = false;
                        break;
                }
                return flag;
            }
        });

        // 设置默认root id
        yufp.router.setDefaultRootId(config.defaultRootId);
        // 加入路由过滤器
        yufp.router.addFilter({

            /**
             * 过滤器名称
             */
            name: 'default',

            /**
             * 路由跳转前执行
             * @param code
             * @param cite
             */
            before: function (code, data, cite) {
                if (config.debugModel) {
                    var route = yufp.router.getRoute(code) || {};
                    yufp.logger.info('【Router-JS】【' + code + '】: ' + route.js);
                }
                return true;
            },

            /**
             * 加载路由内容前执行
             * @param code
             * @param cite
             */
            mount: function (code, cite) { },

            /**
             * ready函数执行
             * @param exports
             * @param code
             * @param data
             * @param cite
             */
            ready: function (exports, code, data, cite) { },

            /**
             * 卸载路由内容前执行
             * @param code
             * @param cite
             */
            unMount: function (code, cite) {

            },

            /**
             * destroy函数执行
             * @param exports
             * @param code
             * @param cite
             */
            destroy: function (exports, code, cite) {

            }

        });

        /**
         * 创建hash处理事件
         */
        var hashFn = function () {
            function GetQueryString(name) {
                var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
                var r = window.location.search.substr(1).match(reg);
                if (r != null) {
                    return unescape(r[2]);
                }
                return null;
            };

            var route = config.startPage,
                data = {},
                hash = location.hash ? location.hash : '';
            var currRoute = yufp.session.getCurrentRoute();
            route = currRoute || route;
            var sIndex = hash.indexOf('!'),
                eIndex = hash.indexOf('?');
            if (sIndex != -1) {
                route = eIndex != -1 ? hash.substring(sIndex + 1, eIndex) : hash.slice(sIndex + 1);
            }
            if (eIndex != -1 && hash.slice(eIndex + 1)) {
                data = JSON.parse('{"' +
                    decodeURIComponent(hash.slice(eIndex + 1))
                        .replace(/"/g, '\\"')
                        .replace(/&/g, '","')
                        .replace(/=/g, '":"')
                        .replace(/\n/g, '\\n') +
                    '"}');
            }
            // yufp.logger.info('触发hash事件,hash:' + hash);
            // 调试模式true时，有mocks请求，故延迟加载
            var delay = mockModel ? 300 : 0;
            if (data.debug && route.indexOf('%2F')) {
                // IDE 预览入口
                var idePreview = 'idePreview',
                    url = decodeURIComponent(route),
                    route = 'frame';
                var t = new Date().getTime();
                yufp.router.addRoute(idePreview, { html: url + '.html?t=' + t, js: url + '.js?t=' + t });
                setTimeout(function () {
                    yufp.session.loadUserSession(function () {
                        var options = {};
                        options.func = function (_this) {
                            // 清除面包屑信息
                            _this.$refs.refFrame.menuPath = [];
                            yufp.frame.addTab({
                                id: idePreview, // 菜单功能ID（路由ID）
                                key: 'custom_' + t, // 自定义唯一页签key,请统一使用custom_前缀开头
                                title: 'IDE-自动预览', // 页签名称
                                data: data
                            });
                        };
                        yufp.router.to(route, data, '', options);
                    });
                }, delay);
            } else if (route == config.startPage) {
                if (location.href.indexOf('?') > -1) { // 判断是否带参数访问，如果是就进入，如果不是就跳转到E家登陆页面
                    // data.code = location.search.split('=')[1];// OA访问传递登陆标识过来，通过标识获取登陆号-hujun3 20180912
                    data.code = GetQueryString('username');

                    console.log('token' + data.token);

                    console.log('csrf' + data.csrf);

                    console.log('username' + data.code);

                    setTimeout(function () {
                        yufp.router.to('loginsso', data);
                    }, delay);
                } else {
                    // window.location.href=backend.fLogin;
                    setTimeout(function () {
                        yufp.router.to(route, data);
                    }, delay);
                }
            } else {
                setTimeout(function () {
                    yufp.session.loadUserSession(function () {
                        yufp.router.to(route, data);
                    });
                }, delay);
            }
        };
        // 添加hash change事件
        if (window.addEventListener) {
            window.addEventListener('hashchange', hashFn, false);
        } else if (window.attachEvent) {
            window.attachEvent('on' + 'hashchange', hashFn);
        } else {
            window['onhashchange'] = hashFn;
        }
        // 页面跳转
        hashFn();
    });
}(window, yufp));