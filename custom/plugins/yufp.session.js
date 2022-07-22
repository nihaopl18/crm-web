/**
 * @created by helin3 2017-11-30
 * @updated by
 * @description 会话信息
 * 依赖：custom/plugins/yufp.service.js
 *      custom/plugins/yufp.sessionstorage.js
 */
(function (yufp, window, factory) {
  var exports = factory(yufp, window, window.document);
  if (typeof define === 'function') {
    define(exports);
  }
  window.yufp.session = exports;
}(yufp, window, function (yufp, window, document) {
  /**
   * 会话信息对象
   * @constructor
   */
  function LocalSession () {
    var _settings = {
      settings: {
        logoutUrl: backend.uaaService + '/api/logout', // 注销URL
        // userUrl: backend.uaaService + '/api/session/info', // 会话URL
        userUrl: backend.uaaService + '/api/session/userinfo', // 会话URL
        userJsonRoot: '', // 用户返回数据节点,如：'data.user'
        userStoreKey: 'YUFP-SESSION-USER', // 会话存储前缀
        userMapping: { // 用户后端数据模型映射
          userId: 'userId', // 用户ID
          userName: 'userName', // 用户姓名
          userCode: 'loginCode', // 用户登录码
          userAvatar: 'userAvatar', // 用户头像
          logicSys: 'logicSys', // 逻辑系统Object
          roles: 'roles', // 角色数组Object
          selectRole: 'selectRole', // 默认角色ID
          org: 'org', // 机构Object
          dpt: 'dpt', // 部门Object
          instu: 'instu', // 金融机构Object
          upOrg: 'upOrg', // 上级机构Object
          upDpt: 'upDpt' // 上级部门Object
        },

        // menuUrl: backend.uaaService + '/api/account/menuandcontr', // 菜单远程URL
        menuUrl: backend.uaaService + '/api/session/menuandcontr', // 菜单远程URL
        menuRootPid: '0', // 菜单根节点父级Id
        // menuJsonRoot: 'menu', // 菜单返回数据节点,如：'data.menus'
        menuJsonRoot: 'menu', // 静态数据修改-hujun3
        menuStoreOgKey: 'YUFP-SESSION-MENUS-OG',
        menuStoreKey: 'YUFP-SESSION-MENUS', // 菜单存储前缀
        menuMapping: { // 菜单后端数据模型映射
          mId: 'menuId', // 菜单ID
          mText: 'menuName', // 菜单名称
          mPid: 'upMenuId', // 上级菜单ID
          mIcon: 'menuIcon', // 菜单图标
          routeId: 'funcId', // 菜单功能ID
          routeUrl: 'funcUrl', // 菜单功能URL
          mType: 'menuType' // 菜单类型
        },

        // ctrlUrl: backend.uaaService + '/api/session/menuandcontr', // 控制点远程URL
        ctrlUrl: backend.uaaService + '/api/session/datacontr', // 控制点远程URL
        // 视图控制点远程url
        viewctrlUrl: '/api/ocrmfsysviewauth/selectcontrlist',
        ctrlJsonRoot: 'contr', // 控制点返回数据节点,如：'data.ctrls'，控制点数据，查询需按菜单ID、功能ID排序返回
        ctrlStoreOgKey: 'YUFP-SESSION-STRLS-OG',
        ctrlStoreKey: 'YUFP-SESSION-STRLS',
        ctrlMapping: {
          mId: 'menuId', // 菜单ID
          rId: 'funcId', // 菜单功能ID
          cId: 'contrCode', // 控制点CODE
          cText: 'contrName' // 控制点名称
        },
        // 视图的控制点信息映射
        viewCtrlMapping: {
          rId: 'viewItemId', // 视图项ID
          cId: 'contrCode', // 控制点CODE
          cText: 'contrName' // 控制点名称
        }

      }
    };
    yufp.extend(this, _settings);
  };

  /**
   * private 存储数据
   * @param key
   * @param array
   */
  var storagePut = function (key, array) {
    yufp.sessionStorage.put(key, JSON.stringify(array));
  };

  /**
   * private 获取数据
   * @param key
   */
  var storageGet = function (key) {
    var obj = yufp.sessionStorage.get(key);
    if (obj) {
      obj = JSON.parse(obj);
    } else {
      obj = undefined;
    }
    return obj;
  };

  /**
   * private 移除数据
   * @param key
   */
  var storageRemove = function (key) {
    yufp.sessionStorage.remove(key);
  };

  /**
   * private 获取namespace数据
   * @param obj 待获取对象
   * @param ns namespace，如：'json.data'
   * @returns {*}
   */
  var getObjectKey = function (obj, ns) {
    if (!ns) {
      return obj;
    }
    var keys = ns.split('.');
    for (var i = 0, len = keys.length; i < len; i++) {
      if (!obj) {
        break;
      }
      obj = obj[keys[i]];
    }
    return obj;
  };

  /**
   * 加载会话用户数据
   * @param callback
   */
  LocalSession.prototype.loadUserSession = function (callback, role) {
    var processFn = function (data) {
      var _this = this, userMapping = _this.settings.userMapping;
      for (var key in userMapping) {
        _this[key] = data[userMapping[key]] || '';
      }
      _this.user = data;
      storagePut(_this.settings.userStoreKey, _this.user);
    };
    var _this = this;
    // debugger;
    var userStore = storageGet(_this.settings.userStoreKey);
    var menuStoreOg = storageGet(_this.settings.menuStoreOgKey);
    var ctrlStoreOg = storageGet(_this.settings.ctrlStoreOgKey);
    if (userStore && menuStoreOg && role == undefined) {
      processFn.call(_this, userStore);
      _this.processMenus(menuStoreOg);
      _this.ctrls = _this.processCtrls(ctrlStoreOg, _this.settings.ctrlMapping, _this.orginalCtrls);
      typeof callback === 'function' ? callback.call(_this) : '';
      return;
    }
    yufp.service.request({
      url: _this.settings.userUrl + '?roleId=' + role,
      method: 'get',
      callback: function (code, message, data) {
        data = getObjectKey(data, _this.settings.userJsonRoot);
        if (code == '0' && data) {
          data.userAvatar = getUserPicUrl(data.userAvatar); // 设置用户头像图片展示URL
          data.currentSelectRole = '';
          processFn.call(_this, data);
        }
        _this.loadMenus(callback, role);
        // _this.loadCtrls(); //由于控制点数据和菜单一起加载则无需要单独加载
      }
    });
  };

  /**
   * 根据用户头像文件存储路径(/p01/01/xxxx.jpg)，构建页面访问该图片的完整路径(http://...........)
   * @param picPath 用户头像文件存储路径
   * @created by wzy6 2018-11-19
   */
  var getUserPicUrl = function (picPath) {
    var userPicUrl = picPath;
    if (picPath != null && picPath != '') {
      userPicUrl = backend.gatewayService + backend.fileService;
      userPicUrl = userPicUrl + '/api/file/provider/download?fileId='; // 拼接图片下载Action
      userPicUrl = userPicUrl + picPath; // 拼接用户头像文件存储路径
      userPicUrl = userPicUrl + '&access_token='; // 拼接token参数
      userPicUrl = userPicUrl + yufp.service.getToken(); // 拼接token字符串
      userPicUrl = yufp.service.getUrl({ url: userPicUrl }); // 将路径转换成功标准的URL，如http://xxxxx/xxxx/xxxxx
    }
    return userPicUrl;
  };

  /**
   * 移除会话信息
   * @param already 服务已登出
   */
  LocalSession.prototype.logout = function (already) {
    var settings = this.settings;
    var already = arguments[0];
    if (already === true || already == undefined) {
      yufp.service.request({
        url: settings.logoutUrl,
        method: 'POST',
        callback: function (code, message, response) {
          /* if (code != 0 || (response && response.code != 0)) {
                        var errMsg = response && response.message ? response.message : '系统错误，请联系系统管理员！';
                        var vm = yufp.util.globalVm;
                        vm.$message({ message: errMsg, type: 'warning' });
                    }*/
          window.location.reload(true);
        }
      });
    }
    yufp.service.removeToken();
    yufp.router.to('login');
    storageRemove(settings.userStoreKey);
    storageRemove(settings.menuStoreOgKey);
    storageRemove(settings.menuStoreKey);
    storageRemove(settings.ctrlStoreOgKey);
    storageRemove(settings.ctrlStoreKey);
  };

  /**
   * 当前会话页
   */
  LocalSession.prototype.getCurrentRoute = function () {
    return yufp.service.getToken() ? 'frame' : '';
  };

  /**
   * 加载菜单数据
   */
  LocalSession.prototype.loadMenus = function (callback, role) {
    var _this = this;
    yufp.service.request({
      url: _this.settings.menuUrl + '?roleId=' + role,
      method: 'get',
      callback: function (code, message, data) {
        var menuData = getObjectKey(data, _this.settings.menuJsonRoot);
        if (code == '0' && menuData) {
          _this.processMenus(menuData);
          var ctrlData = getObjectKey(data, _this.settings.ctrlJsonRoot);
          if (ctrlData) {
            _this.ctrls = _this.processCtrls(ctrlData, _this.settings.ctrlMapping, _this.orginalCtrls);
          }
          typeof callback === 'function' ? callback.call(_this) : '';
        }
      }
    });
  };

  /**
   * 加工处理菜单数据
   * 20181120 liujie 修改菜单处理问题,暂时注释代码，如无问题就删除注释的代码
   * @param data
   */
  LocalSession.prototype.processMenus = function (data) {
    var _this = this, mm = _this.settings.menuMapping;
    _this.orginalMenus = JSON.parse(JSON.stringify(data));
    var leafMenus = [];// nonLeafMenus = [], nosubMenu = [];
    var i, len, obj;
    for (i = 0, len = data.length; i < len; i++) {
      obj = data[i];
      for (var key in mm) {
        if (mm[key] != key) {
          obj[key] = obj[mm[key]] || '';
          delete obj[mm[key]];
        }
      }
      obj.routeId && obj.routeUrl ? leafMenus.push(obj) : '';// nonLeafMenus.push(obj);
    }
    var routeTable = {};
    for (i = 0, len = leafMenus.length; i < len; i++) {
      obj = leafMenus[i];
      // var flag = false;
      var httpindex = obj.routeUrl.indexOf('http://');
      var httpsindex = obj.routeUrl.indexOf('https://');
      if (httpindex > -1 || httpsindex > -1) {
        var url;
        var param;
        // -5 是因为字符串中包括?url=
        if (httpindex > -1) {
          url = obj.routeUrl.substring(0, httpindex - 5);
          param = obj.routeUrl.substring(httpindex, obj.routeUrl.length - 1);
        } else {
          url = obj.routeUrl.substring(0, httpsindex - 5);
          param = obj.routeUrl.substring(httpsindex, obj.routeUrl.length - 1);
        }
        routeTable[obj.routeId] = { html: obj.routeUrl, js: '' };
      } else {
        // 20181025增加url 参数时的解析
        var index = obj.routeUrl.indexOf('?');
        if (index > -1) {
          routeTable[obj.routeId] = { html: obj.routeUrl.substring(0, index) + '.html' + obj.routeUrl.substring(index, obj.routeUrl.length), js: obj.routeUrl.substring(0, index) + '.js' + obj.routeUrl.substring(index, obj.routeUrl.length) };
        } else {
          routeTable[obj.routeId] = { html: obj.routeUrl + '.html', js: obj.routeUrl + '.js' };
        }
      }
      /**
      for (var j = 0, jlen = nonLeafMenus.length; j < jlen; j++) {
        var pObj = nonLeafMenus[j];
        if ('' + obj.mPid == '' + pObj.mId) {
          pObj.children = pObj.children ? pObj.children : [];
          pObj.children.push(obj);
          flag = true;
          break;
        }
      }
      if (!flag) {
        nosubMenu.push(obj);
      }*/
    }
    // nonLeafMenus = nosubMenu.concat(nonLeafMenus);
    yufp.router.addRouteTable(routeTable);
    var root = yufp.util.array2tree(data, { id: 'mId', pid: 'mPid', root: _this.settings.menuRootPid });
    if (root.children && root.children.length > 0) {
      root.children[0].isIndex = true;
    }
    _this.menus = root.children;
    storagePut(_this.settings.menuStoreOgKey, _this.orginalMenus);
    storagePut(_this.settings.menuStoreKey, _this.menus);
  };

  /**
   * 获取树结构的菜单数据
   * @returns {*}
   */
  LocalSession.prototype.getMenuTree = function () {
    return this.menus || storageGet(this.settings.menuStoreKey);
  };

  /**
   * 获取数组结构的菜单数据
   * @returns {*}
   */
  LocalSession.prototype.getMenus = function () {
    return this.orginalMenus || storageGet(this.settings.menuStoreOgKey);
  };

  /**
   * 根据菜单ID返回菜单对象数据
   * @param menuId
   */
  LocalSession.prototype.getMenuById = function (menuId) {
    var settings = this.settings;
    for (var i = 0, len = this.orginalMenus.length; i < len; i++) {
      var menu = this.orginalMenus[i];
      if (menu[settings.menuMapping.mId] == menuId) {
        return menu;
      }
    }
  };

  /**
   * 加载控制权限数据
   * 注：若控制权限数据和菜单一起加载，则无需调用此方法
   */
  LocalSession.prototype.loadCtrls = function (callback) {
    var _this = this;
    yufp.service.request({
      url: _this.settings.ctrlUrl,
      method: 'get',
      callback: function (code, message, data) {
        data = getObjectKey(data, _this.settings.ctrlJsonRoot);
        if (code == '0' && data) {
          _this.ctrls = _this.processCtrls(data, _this.settings.ctrlMapping, _this.orginalCtrls);
        }
        typeof callback === 'function' ? callback.call(_this) : '';
      }
    });
  };

  /**
   * 加载处理控制点权限,后台需要排序
   * updated by taoting1 2019-1-25
   * @param data
   * @param ctrlMapping 控制点map
   * @param orginalCtrls 处理前的数据
   * @param storeToStorage 是否存储到sessionStorage中，如果传值为false或不传，则存入sessionStorage
   */
  LocalSession.prototype.processCtrls = function (data, ctrlMapping, orginalCtrls, storeToStorage) {
    if (!data || data.length < 1) {
      return;
    }
    var _this = this, mm = ctrlMapping;
    orginalCtrls = JSON.parse(JSON.stringify(data));
    var lastObj = {};
    for (var i = 0, len = data.length; i < len; i++) {
      var obj = data[i];
      for (var key in mm) {
        if (mm[key] != key) {
          obj[key] = obj[mm[key]] || '';
          delete obj[mm[key]];
        }
      }
      if (lastObj[obj.rId]) {
        lastObj[obj.rId][obj.cId] = 1;
      } else {
        lastObj[obj.rId] = {};
        lastObj[obj.rId][obj.cId] = 1;
      }
    }
    var ctrls = lastObj;
    // 如果传值为false或不传，则存入sessionStorage
    if (storeToStorage) {
      return ctrls;
    }
    storagePut(_this.settings.ctrlStoreOgKey, orginalCtrls);
    storagePut(_this.settings.ctrlStoreKey, ctrls);
    return ctrls;
  };

  /**
   * 检查是否有控制点权限，有权限返回false，无权限返回true
   * @param ctrlCode 控制点代码
   * @param menuId 菜单ID，可选值，默认取当前页签ID，无需提供
   * @param isView 是否视图菜单，可选值，默认false，配置为true时，若menuId配置为'',
   *               则取得menuId强制按视图方式获取
   */
  LocalSession.prototype.checkCtrl = function (ctrlCode, menuId, isView) {
    var ctrls = this.ctrls;
    menuId = menuId || '';
    if (!menuId) {
      // TODO 视图菜单时，获取控制点ID逻辑暂且未定
      menuId = isView ? '' : yufp.frame.tab().url;
    }
    if (!ctrlCode || !ctrls || !menuId) {
      return false;
    }
    if (ctrls && menuId && ctrls[menuId] && ctrls[menuId][ctrlCode]) {
      return false;
    }
    return true;
  };

  /**
   * 加载处理视图控制点权限
   */
  LocalSession.prototype.loadViewCtrls = function () {
    var _this = this;
    var obj = {};
    obj.loginCode = _this.userCode;
    obj.sysId = '1cab27def8fb4c0f9486dcf844b783c0';
    yufp.service.request({
      method: 'GET',
      url: _this.settings.viewctrlUrl,
      data: obj,
      callback: function (code, message, response) {
        if (code == '0' && response.code == '0') {
          // 视图控制点数据
          _this.viewctrls = _this.processCtrls(response.data, _this.settings.viewCtrlMapping, _this.viewOrginalCtrls);
        } else {
          _this.$message('控制点信息查询有误');
        }
      }
    });
  };

  /**
   * 检查视图是否有控制点权限，有权限返回false，无权限返回true
   * created by taoting1 2019-1-25
   * @param ctrlCode 控制点代码，必传
   * @param viewItemId 视图项id，必传
   */
  LocalSession.prototype.checkViewCtrl = function (ctrlCode, viewItemId) {
    var viewctrls = this.viewctrls;
    // 如果没传控制点代码，表示无效，则控制点按钮照常显示
    if (!viewItemId || !ctrlCode) {
      return false;
    }
    // 通过视图项id及控制点代码判断是否有该项权限
    if (viewctrls && viewItemId && viewctrls[viewItemId] && viewctrls[viewItemId][ctrlCode]) {
      return false;
    }
    return true;
  };

  return new LocalSession();
}));
