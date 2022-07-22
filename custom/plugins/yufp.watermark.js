/**
 * @created by wy 2018-11-14
 * @updated by
 * @description 水印
 */
(function (yufp, window, factory) {
  var exports = factory(yufp, window, window.document);
  if (typeof define === 'function') {
    define(exports);
  }
  window.yufp.watermark = exports;
}(yufp, window, function (yufp, window, document) {
  /**
   * 水印
   * @constructor
   */
  function Watermark () {
    var _options = {
      watermarkText: yufp.session.userCode + ' _' + yufp.session.userName, // 水印内容，默认为用户编码_用户姓名
      fontFamily: '微软雅黑', // 文字字体，默认为微软雅黑
      fontColor: 'rgba(0,0,0,0.20)', // 文字颜色，默认为黑色20%透明
      fontSize: 20, // 水印文字字号，默认14px
      display: 'table',
      // watermarkBox: ['.yu-idxTabBox', '.yu-box', '.el-table', '.el-dialog', '.el-dialog-x', '.el-tree', '.el-select-dropdown__list', '.el-form', '.el-collapse', '.el-tabs', '.el-message-box', '.el-transfer-panel' ] // 水印显示区域为组件或容器的id或className，默认已设置tab工作区、dialog弹出窗口等容器、面板类组件，需根据客户化需求配置
      // #RT_5c5498122c5741cda58a7ebce99c0229 :first-child
      watermarkBox: [
        '#RT_c934a4c10c1444218d6c9ce92113639d :first-child .el-table__body-wrapper', // 公告管理
        '#RT_5c5498122c5741cda58a7ebce99c0229 :first-child .el-table__body-wrapper', // 所辖客户查询
        '#RT_188c545d7a8e4435b8475435318e89ee :first-child .el-table__body-wrapper', // 我的关注客户
        '#RT_33e57b22a720491eb540898ce1887794 :first-child .el-table__body-wrapper', // 客户分配
        '#RT_722c8348b7a248ec8f392a6b721e0027 :first-child .el-table__body-wrapper', // 客户贡献度查询
        '#RT_b9af8426d8a64d29b766425474980579 :first-child .el-table__body-wrapper', // 客户等级查询
        '#RT_eb51a9f3d77543b2ba2979b0d1603617 :first-child .el-table__body-wrapper', // 等级临界客户查询
        '#RT_a0e903804913455f8834019ef69b2b73 :first-child .el-table__body-wrapper', // 服务等级手工调整
        '#RT_8c7e31a3ee254bdba73d9d0743b436e2 :first-child .el-table__body-wrapper', // 等级变动查询
        '#RT_e5b303228707406ebf0b97dd9be447ba :first-child .el-table__body-wrapper', // 全行客户查询
        '#RT_bc632c57e2f64b6190d1b541ed38a7f9 :first-child .el-table__body-wrapper', // 客户经理管户清单
        '#RT_261ffaa200fc4f23ba00f5badfdd14dd :first-child .el-table__body-wrapper', // 客户流失预警
        '#RT_4be5edd5568c4db8abfeeacf4a82b28d :first-child .el-table__body-wrapper', // 客户认领
        '#RT_7f12c32f4ebe4df8b2850affef0d9958 :first-child .el-table__body-wrapper', // 客户移交
        '#RT_478f93cd9b1a4f1888db00538805b5ff :first-child .el-table__body-wrapper', // 潜在客户管理
        '#RT_a66f340d8018430da65abd3f74410005 :first-child .el-table__body-wrapper', // 客户群视图-手动添加群成员信息
        '#RT_clientsclientInfo2 :first-child :first-child .el-table__body-wrapper', // 客户群视图-自动筛选
        '#RT_d313e37356214d2c9f983c0a8ee92f9f :first-child .el-table__body-wrapper', // 集团视图-集团成员信息
        '#RT_d816cbf46325449fa0205d1695e5eea3 :first-child .el-table__body-wrapper', // 客户经理视图-业绩明细查询
        '#RT_9f380c0c061849619f41169564275019 :first-child .el-table__body-wrapper', // 客户经理团队视图-客户信息
        '#RT_6894c1a00b3d446bb9d2e93409c6e29c :first-child .el-table__body-wrapper', // 产品视图-目标客户
        '#RT_b9bcf00b84dc46eeaa62d5cbaa367896 :first-child .el-table__body-wrapper', // 客户经理管理-业绩明细查询
        '#RT_clientsclientInfo :first-child .el-table__body-wrapper', // 客户综合管理——客户群管理——新增客户群选择客户页面
        // '#RT_59bafd4e60514d029bbad244763626f6 :first-child .el-table__body-wrapper', // 日程安排-客户选择放大镜
        // <div id="c_menu_id_1555751459807" class="yu-gridContextMenu">
        '#RT_e1e5b29615a84741938723b93ad3e32a :first-child .el-table__body-wrapper', // 零售客户视图-账号信息
        '#RT_633d3186f2974500b698435b9a8a166f :first-child .el-table__body-wrapper', // 对公客户视图-账户信息
        '#RT_2b7f73d9a5e049d7b43f476d44edcee7 :first-child .el-table__body-wrapper', // 准入客户
        '#RT_ff5065abc85b46f0a1bee867f7449a16 :first-child .el-table__body-wrapper' // 数据查询
      ]
    };
    yufp.extend(this, _options);
    this.init();
  };

  /**
   * 初始化
   */
  Watermark.prototype.init = function () {
    // 开启水印时默认给body加入yu-watermark类名，便于UI扩展控制
    document.querySelector('body').className += 'yu-watermark';
    this.setWatermark();
  };

  /**
   * 获取水印图片
   */
  var getWatermarkPic = function (text, fontColor, fontSize, fontFamily) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = context.measureText(text).width;
    canvas.height = fontSize;
    context.font = fontSize + 'px ' + fontFamily;
    context.textBaseline = 'middle';
    context.fillText(text, 0, fontSize / 2);
    canvas.width = context.measureText(text).width;
    canvas.height = canvas.width;
    context.fillStyle = fontColor;
    context.font = fontSize + 'px ' + fontFamily;
    context.textBaseline = 'middle';
    context.rotate(-45 * Math.PI / 180);
    context.fillText(text, -canvas.width / 2, (canvas.width / 2) + (fontSize * 2));
    context.fillText(text, -fontSize, -fontSize / 2);
    context.borderCollapse = 'collapse';
    return canvas.toDataURL('image/png');
  };

  /**
   * 设置水印
   * @param options {text,fontSize,fontColor,fontFamily,dom}
   * @param text  水印文字内容，可选
   * @param fontSize  水印字号，可选
   * @param fontColor  水印文字颜色，可选
   * @param fontFamily  水印文字字体，可选
   * @param dom  待显示水印的dom对象，可选
   */
  Watermark.prototype.setWatermark = function (options) {
    var _options = options || {};
    var _text = _options.text ? _options.text : this.watermarkText;
    var _fontColor = _options.fontColor ? _options.fontColor : this.fontColor;
    var _fontSize = _options.fontSize ? _options.fontSize : this.fontSize;
    var _fontFamily = _options.fontFamily ? _options.fontFamily : this.fontFamily;
    if (_options.dom) {
      options.dom.style.backgroundImage = 'url(' + getWatermarkPic(_text, _fontColor, _fontSize, _fontFamily) + ')';
    } else {
      var style = document.createElement('style');
      style.innerHTML = this.watermarkBox.join(',') + '{background-image: url(' + getWatermarkPic(_text, _fontColor, _fontSize, _fontFamily) + ');}';
      document.querySelector('head').appendChild(style);
    }
  };
  return new Watermark();
}));
