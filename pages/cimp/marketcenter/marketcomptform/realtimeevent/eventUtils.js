(function (vue, $, name) {
  // 删除产品动作内容
  var customRowOpProducts = function (scope, op) {
    for (var i = 0; i < this.productsdata.length; i++) {
      if (this.productsdata[i].modelName == scope.row.modelName) {
        this.productsdata.splice(i, 1);
      }
    }
  };
  // 删除风险动作内容
  var customRowOpRisks = function (scope, op) {
    for (var i = 0; i < this.risksdata.length; i++) {
      if (this.risksdata[i].modelName == scope.row.modelName) {
        this.risksdata.splice(i, 1);
      }
    }
  };
  // 删除关怀动作内容
  var customRowOpCaresdata = function (scope, op) {
    for (var i = 0; i < this.caresdata.length; i++) {
      if (this.caresdata[i].modelName == scope.row.modelName) {
        this.caresdata.splice(i, 1);
      }
    }
  };
});