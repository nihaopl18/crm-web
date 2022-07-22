/**
 * 事件业务工具类
 * created by chenlin3 2018-11-05
 */
(function (yufp, window, factory) {
  var exports = factory(yufp, window, window.document);
  if (typeof define === 'function') {
    define(exports);
  }
  window.yufp.util = exports;
}(yufp, window, function (yufp, window, document) {
  /**
  * 业务工具类
  * @constructor
  */
  function Utils () {
  }

  Utils.getOperator = function (operator, variableType) {
    alert(123);
  };
}));