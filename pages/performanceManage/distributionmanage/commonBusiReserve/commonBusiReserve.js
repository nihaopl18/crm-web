/**
 * @Created by xujiawei xujy3@yusys.com.cn on 2020-1-2 16:28:00.
 * @updated by
 * @description 业绩预约
 */
define([
  './custom/widgets/js/yufpExtTree.js',
  './custom/widgets/js/yufpOrgTreeApp.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CARD_TYPE,BUS_TYPE,ETL_RES');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrl: backend.appBaseService + '/api/pmafappointauditinfo/querylist',
          formdata: {},
          rule: [
            { required: true, message: '字段不能为空', trigger: 'blur' },
            { validator: yufp.validator.number, message: '数字', trigger: 'blur' }
          ],
          options: [],
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          saveBtnShow: true,
          colunmNamelist: [],
          amtFloat: 0, // 浮动金额
          endRank: 0, // 日期范围
          amtFloatType: '', // 浮动金额类型
          loading: false
        };
      },
      mounted: function () {
        var _this = this;
        var model = {};
        // 查询业务数据
        yufp.service.request({
          method: 'GET',
          url: backend.appBaseService + '/api/pmafappointset/getsetting',
          data: model,
          callback: function (code, message, response) {
            if (response.code === 0) {
              _this.options = response.data.filter(function (obj) {
                return obj.checked == 'true';
              });
            }
          }
        });
      },
      watch: {
        'formdata.amt': function (val) {
          var _this = this;
          if (val) {
            if (_this.amtFloatType == '01') {
              _this.formdata.amtStart = parseFloat(val) - parseFloat(_this.amtFloat);
              _this.formdata.amtEnd = parseFloat(val) + parseFloat(_this.amtFloat);
            } else {
              _this.formdata.amtStart = parseFloat(val);
              _this.formdata.amtEnd = parseFloat(val) * parseFloat(_this.amtFloat);
            }
          }
        },
        'formdata.startDate': function (val) {
          var _this = this;
          if (val) {
            var valString = yufp.util.dateFormat(val, '{y}-{m}-{d}');
            var dd = new Date(valString);
            dd.setDate(dd.getDate() + _this.endRank);
            _this.formdata.endDate = dd;
          }
        }
      },
      methods: {
        loadedHandler: function () {
          var _this = this;
          _this.loading.close();
        },
        searchFn: function () {
          var _this = this;
          _this.$refs['refQuery'].validate(function (valid) {
            if (valid) {
              // 显示loading
              var options = {
                target: cite.el, // Loading 需要覆盖的 DOM 节点
                body: false, // 遮罩是否插入至 DOM 中的 body 中，true: 插入，false: 不插入，
                fullscreen: false, // 遮罩是否全屏, true: 全屏，false: 非全屏
                text: '拼命加载中', // 显示在加载图标下方的加载文案
                customClass: 'trans-class' // Loading 的自定义类名
              };
              _this.loading = _this.$loading(options);
              let model = {};
              yufp.clone(_this.$refs['refQuery'].formdata, model);
              var param = { condition: JSON.stringify(model) };
              _this.$refs.refTable.remoteData(param);
            } else {
              return;
            }
          });
        },
        // 重置按钮
        resetFn: function () {
          var _this = this;
          _this.$nextTick(function () {
            _this.$refs['refQuery'].resetFields();
          });
        },
        lookUpChange: function (val) {
          var _this = this;
          if (val == undefined) {
            return;
          }
          if (_this.viewType == 'DETAIL') {
            // 详情不走
            return;
          }
          _this.colunmNamelist = [];
          var obj = _this.options.filter(function (obj) {
            return obj.key == val;
          });
          var isShowList = obj[0].formList.filter(function (obj) {
            return obj.ifShow == '1';
          });
          for (var i = 0; i < isShowList.length; i++) {
            var model = {};
            model.name = isShowList[i].fieldCnName;
            model.ename = _this.toHump(isShowList[i].fieldEnName);
            model.type = isShowList[i].columnType;
            if (isShowList[i].allowBlank == '1') {
              model.rule = 'required';
            }
            if (isShowList[i].ifLookUp) {
              model.dataCode = isShowList[i].ifLookUp;
            }
            _this.colunmNamelist.push(model);
            if (isShowList[i].endRank) {
              _this.endRank = parseInt(isShowList[i].endRank);
              // 预约结束时间
              var modelOne = {};
              modelOne.name = '预约结束时间';
              modelOne.ename = 'endDate';
              modelOne.type = 'datepicker';
              modelOne.disabled = true;
              _this.colunmNamelist.push(modelOne);
            }
            if (isShowList[i].amtRank) {
              _this.amtFloat = parseInt(isShowList[i].amtRank);
              _this.amtFloatType = isShowList[i].amtRankType;
              // 上下浮动金额
              var modelTwo = {};
              modelTwo.name = '金额开始区间';
              modelTwo.ename = 'amtStart';
              modelTwo.type = 'num';
              modelTwo.disabled = true;
              _this.colunmNamelist.push(modelTwo);
              var modelThree = {};
              modelThree.name = '金额结束区间';
              modelThree.ename = 'amtEnd';
              modelThree.type = 'num';
              modelThree.disabled = true;
              _this.colunmNamelist.push(modelThree);
            }
          }
        },
        toHump: function (name) {
          return name.toLowerCase().replace(/\_(\w)/g, function (all, letter) {
            return letter.toUpperCase();
          });
        },
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.formdata, model);
          if (model.startDate > model.endDate) {
            _this.$message({message: '结束日期不能小于开始日期！', type: 'warning'});
            return;
          }
          if (model.startDate <= new Date()) {
            _this.$message({message: '开始日期请从当前日期的第二天开始！', type: 'warning'});
            return;
          }
          if (model.startDate) {
            model.startDate = yufp.util.dateFormat(model.startDate, '{y}{m}{d}');
          }
          if (model.endDate) {
            model.endDate = yufp.util.dateFormat(model.endDate, '{y}{m}{d}');
          }
          model.applyTime = yufp.util.dateFormat(new Date(), '{y}{m}{d}');
          model.amtFloat = _this.amtFloat;
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          if (!model.appointPhone && !model.cardId) {
            _this.$message({message: '证件号码与预约电话至少填写一个', type: 'warning'});
            return;
          }
          yufp.service.request({
            method: 'POST',
            url: backend.appBaseService + '/api/pmafappointauditinfo/add',
            data: model,
            callback: function (code, message, response) {
              if (response.code == 0) {
                _this.$refs.refTable.remoteData();
                _this.$message(response.message);
                _this.dialogVisible = false;
              } else {
                _this.$message({message: response.message, type: 'error'});
              }
            }
          });
        },
        /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.saveBtnShow = editable;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 新增按钮
         */
        addFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true);
          _this.colunmNamelist = [];
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            _this.formdata.id = null;
          });
        },
        /**
         * 详情
         */
        infoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.switchStatus('DETAIL', false);
          _this.colunmNamelist = [];
          var obj = _this.options.filter(function (obj) {
            return obj.key == selectionsAry[0].busType;
          });
          var isShowList = obj[0].formList.filter(function (obj) {
            return obj.ifShow == '1';
          });
          for (var i = 0; i < isShowList.length; i++) {
            var model = {};
            model.name = isShowList[i].fieldCnName;
            model.ename = _this.toHump(isShowList[i].fieldEnName);
            model.type = isShowList[i].columnType;
            if (isShowList[i].allowBlank == '1') {
              model.rule = 'required';
            }
            if (isShowList[i].ifLookUp) {
              model.dataCode = isShowList[i].ifLookUp;
            }
            _this.colunmNamelist.push(model);
            if (isShowList[i].endRank) {
              // 预约结束时间
              var modelOne = {};
              modelOne.name = '预约结束时间';
              modelOne.ename = 'endDate';
              modelOne.type = 'datepicker';
              modelOne.disabled = true;
              _this.colunmNamelist.push(modelOne);
            }
            if (isShowList[i].amtRank) {
              // 上下浮动金额
              var modelTwo = {};
              modelTwo.name = '金额开始区间';
              modelTwo.ename = 'amtStart';
              modelTwo.type = 'num';
              modelTwo.disabled = true;
              _this.colunmNamelist.push(modelTwo);
              var modelThree = {};
              modelThree.name = '金额结束区间';
              modelThree.ename = 'amtEnd';
              modelThree.type = 'num';
              modelThree.disabled = true;
              _this.colunmNamelist.push(modelThree);
            }
          }
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(selectionsAry[0], _this.formdata);
          });
        },
        /**
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].id);
          }
          _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.appBaseService + '/api/pmafappointauditinfo/delete',
                  data: arr.join(','),
                  callback: function (code, message, response) {
                    _this.$refs.refTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        }
      }
    });
  };
});