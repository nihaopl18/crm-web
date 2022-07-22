/**
 * @created by 罗顺 on 2018/11/16.
 * @description 营销组件FORM表单-渠道组件-手机银行
 */
define([
  'pages/cimp/marketcenter/marketcomptform/mobilebank/materialCenter.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CUST_TYPE,CUST_STAT,IDENT_TYPE');
    // 1.创建一个组件构造器
    var myComponent = Vue.extend({
      template: '<yu-radio-group v-if="options1.length != 0" v-model="modelProp"  placeholder="选择营销栏位">\
                        <yu-radio v-for="item in options1" :key="item.key" :label="item.key">{{item.value}}</yu-radio >\
                    </yu-radio-group>',
      props: {
        modelProp: {
          type: String,
          required: true
        },
        options1: {
          type: Array,
          required: true
        }
      }
    });
    yufp.custom.vue({
      el: cite.el,
      // 特别注意：流程表单组件传递过来的对象（只读），只能绑定在此，不允许绑定至data方法中
      ncmpobj: data.ncmpobj,
      components: {
        // 2. 将myComponent组件注册到Vue实例下
        'select-mktfield': myComponent
      },
      data: function () {
        var _this = this;
        return {
          displayOptions: [
            { 'key': '1', 'value': '图片' },
            { 'key': '4', 'value': '视频' },
            { 'key': '2', 'value': '文章' }
          ],
          marketAssemblyId: {},
          marketAssemblyName: {},
          articleOptions: [],
          value: '',
          activeNames: ['1', '2', '3'],
          activeName1: 'person',
          activeName2: 'PRODUCT',
          custGroupTableData: [],
          proInTableData: [],
          careInTableData: [],
          picker: { selectableRange: '08:00:00 - 18:00:00' },
          riskInTableData: [],
          mktFields: [], // 渠道关联的营销位
          selectFields: [], // 选择的营销位
          options: [],
          proTableData: [],
          careTableData: [],
          riskTableData: [],
          imageUrl: '',
          options1: [],
          uploadAction: yufp.service.getUrl({ url: backend.gatewayService + backend.fileService + '/api/file/provider/uploadfile?access_token=' + yufp.service.getToken() }),
          activityType: '', // 活动类型
          buttonHiden: true, // 操作表单按钮显示与否
          model: {},
          rules: {
            // marketHurdles: [{required: true, message: '请选择营销栏位', trigger: 'change' }],
            marketBeginTime: [{ type: 'date', required: true, message: '请输入开始时间', trigger: 'change' }],
            marketEndTime: [{ type: 'date', required: true, message: '请输入结束时间', trigger: 'change' }]
          },
          requiredbt: false,
          requiredwz: false,
          activeNames: [],
          typeOptions: [],
          tempFiled: {
            marketTypeId: '',
            displayType: '',
            activityStartPic: '',
            marketBeginTime: '',
            marketEndTime: '',
            ctNodeId: ''
          },
          tempModelKey: '',
          modelDisplayType: '',
          dialogVisible: false,
          tempPicData: {},
          validStartDate: { // 开始日期小于结束日期
            disabledDate: function (time) {
              console.log(time)
              var beginDateVal = _this.tempModelKey && _this.model[_this.tempModelKey].marketEndTime
              if (time.getTime() < Date.now() - 8.64e7) {
                return true;
              }
              if (beginDateVal) {
                return time.getTime() > beginDateVal;
              }
            }
          },
          validEndDate: { // 结束日期大于开始日期
            disabledDate: function (time) {
              var beginDateVal = _this.tempModelKey && _this.model[_this.tempModelKey].marketBeginTime;
              if (time.getTime() < Date.now() - 8.64e7) {
                return true;
              }
              if (beginDateVal) {
                return time.getTime() < beginDateVal;
              }
            }
          },
        };
      },
      methods: {
        reset: function () {
          //   this.$refs.myform.resetFields();
          for (const key1 in this.model) {
            var tempObj = this.model[key1]
            for (const key2 in tempObj) {
              tempObj[key2] = ''
            }
          }
        },
        // 时间选择事件
        changeTimeFn: function (value) {
          this.picker.selectableRange = value + ' - 18:00:00';
        },
        selectFn: function (val) {
          // var _this = this;
          // var selectInfo = val;
          // // var seleceData = [];
          // var str = '';
          // var otherData = _this.selectFields;
          // _this.selectFields = [];
          // for (var i = 0; i < selectInfo.length; i++) {
          //   var ss = selectInfo[i];
          //   for (var s = 0; s < otherData.length; s++) {
          //     if (ss === otherData[s].mktSetSign) {
          //       _this.selectFields.push(otherData[s]);
          //       str = str + ',' + ss;
          //       break;
          //     }
          //   }
          // }
          // for (var i = 0; i < val.length; i++) {
          //   var info = val[i];
          //   if (str.search(info) == -1) {
          //     for (var i = 0; i < _this.mktFields.length; i++) {
          //       if (info == _this.mktFields[i].mktSetSign) {
          //         var obj = _this.mktFields[i];
          //         _this.$set(obj, 'prop', '');
          //         _this.selectFields.push(obj);
          //         break;
          //       }
          //     }
          //   }
          // }
          // for (var i = 0; i < seleceData.length; i++) {
          //   var ss = seleceData[i];
          //   var flag = false;
          //   for (var s = 0; s < otherData.length; s++) {
          //     if (ss.mktSetSign === otherData[s].mktSetSign) {
          //       flag = true;
          //       _this.selectFields.push(otherData[s]);
          //       break;
          //     }
          //   }
          //   if (!flag) {
          //     _this.selectFields.push(ss);
          //   }
          // }
        },
        /**
         * 活动头图上传成功方法
         */
        handleAvatarSuccess: function (res, file) {
          var url = yufp.settings.ssl ? 'https://' : 'http://';
          url += yufp.settings.url;
          url += backend.fileService;
          url += '/api/file/provider/download?fileId=' + res.data.filePath;
          this.model.activityStartPic = res.data.filePath;
          this.imageUrl = yufp.util.addTokenInfo(url);
        },
        /**
         * 上传图片校验方法
         */
        beforeAvatarUpload: function (file) {
          var type = file.type;
          var size = file.size / 1024 / 1024;
          if (type !== 'image/jpeg' && type !== 'image/png' && type !== 'image/jpg' && type !== 'image/jpg') {
            this.$message.error('只能上传图片或者视频!');
          }
          if (size > 2) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return type && size;
        },
        getModelKey: function (key, name) {
          console.log(key)
          this.tempModelKey = key;
        },
        displaySelectFn: function (val) {
          console.log(this.tempModelKey)
          if (this.tempModelKey) this.model[this.tempModelKey].activityStartPic = '';
          if (val == '3') {
            this.imageUrl = '';
            this.requiredwz = true;
            this.requiredbt = false;
          } else {
            this.requiredwz = false;
            this.requiredbt = true;
          }
          // var _this = this;
          // var selectInfo = val;
          // // var seleceData = [];
          // var str = '';
          // var otherData = _this.selectFields;
          // _this.selectFields = [];
          // for (var i = 0; i < selectInfo.length; i++) {
          //   var ss = selectInfo[i];
          //   for (var s = 0; s < otherData.length; s++) {
          //     if (ss === otherData[s].mktSetSign) {
          //       _this.selectFields.push(otherData[s]);
          //       str = str + ',' + ss;
          //       break;
          //     }
          //   }
          // }
          // for (var i = 0; i < val.length; i++) {
          //   var info = val[i];
          //   if (str.search(info) == -1) {
          //     for (var i = 0; i < _this.mktFields.length; i++) {
          //       if (info == _this.mktFields[i].mktSetSign) {
          //         var obj = _this.mktFields[i];
          //         _this.$set(obj, 'prop', '');
          //         _this.selectFields.push(obj);
          //         break;
          //       }
          //     }
          //   }
          // }
        },
        handleInputClick: function (tab, event) {
          var _this = this;
          if (_this.$options.ncmpobj.instanceObj == undefined) {
            _this.proInTableData = [];
            _this.careInTableData = [];
            _this.riskInTableData = [];
          } else {
            if (_this.actionType == '02') { // 事件引擎
              var param = {
                condition: JSON.stringify({
                  actionType: tab.name,
                  nodeId: _this.$options.ncmpobj.instanceObj.nodeId
                })
              };
              yufp.service.request({
                method: 'GET',
                url: backend.adminService + '/api/cmfrcruleresultresource/getmegin',
                data: param,
                callback: function (code, message, response) {
                  if (response.data.length > 0) {
                    var info = response.data;
                    if (tab.name == 'CARE') {
                      _this.careInTableData = info;
                    } else if (tab.name == 'RISK') {
                      _this.riskInTableData = info;
                    } else {
                      _this.proInTableData = info;
                    }
                  };
                }
              });
            }
          }
        },
        changeMarketType: function(val){

          var _this = this;
          var thisMarketAssemblyId = _this.marketAssemblyId[val];
          
          if(thisMarketAssemblyId == '14' && this.tempModelKey){
            yufp.service.request({
              method: 'GET',
              url: backend.adminService + '/api/cmicappassemblesignup/getInfoById?id=' + val,
              callback: function (code, message, response) {
                
                var a = response.data;
                for(var i = 0;i<_this.mktFields.length;i++){
                  var thisField;
                  if(_this.mktFields[i].id == _this.tempModelKey){
                    thisField = _this.mktFields[i];
                  }
                }
                if(!thisField || a.imageSize != thisField.mktSetSize){
                  _this.$message.error('报名栏位图片尺寸与当前栏位尺寸不符合，请重新选择');
                  _this.model[_this.tempModelKey].marketTypeId = "";
                }
              }
            });
          }else if(thisMarketAssemblyId == '55' && this.tempModelKey){
            yufp.service.request({
              method: 'GET',
              url: backend.adminService + '/api/yscimcfmkactifission/getInfoByAssemble?nodeId=' + val,
              callback: function (code, message, response) {
                
                var a = response.data;
                for(var i = 0;i<_this.mktFields.length;i++){
                  var thisField;
                  if(_this.mktFields[i].id == _this.tempModelKey){
                    thisField = _this.mktFields[i];
                  }
                }
                if(!thisField || a.imageSize != thisField.mktSetSize){
                  _this.$message.error('报名栏位图片尺寸与当前栏位尺寸不符合，请重新选择');
                  _this.model[_this.tempModelKey].marketTypeId = "";
                }
              }
            });
          }else if(thisMarketAssemblyId == '71' && this.tempModelKey){
            yufp.service.request({
              method: 'GET',
              url: backend.adminService + '/api/yscimcfmkactishare/getInfoByAssemble?nodeId=' + val,
              callback: function (code, message, response) {
                
                var a = response.data;
                for(var i = 0;i<_this.mktFields.length;i++){
                  var thisField;
                  if(_this.mktFields[i].id == _this.tempModelKey){
                    thisField = _this.mktFields[i];
                  }
                }
                if(!thisField || a.imageSize != thisField.mktSetSize){
                  _this.$message.error('报名栏位图片尺寸与当前栏位尺寸不符合，请重新选择');
                  _this.model[_this.tempModelKey].marketTypeId = "";
                }
              }
            });
          }
          
          var e = _this.mktFields;


        },
        handleClick: function (tab, event) {
          var _this = this;
          if (_this.$options.ncmpobj.instanceObj == undefined) {
            _this.careTableData = [];
            _this.riskTableData = [];
            _this.proTableData = [];
          } else {
            if (_this.actionType == '02') { // 事件引擎
              var param = {
                condition: JSON.stringify({
                  runConnectType: 'DEAL',
                  actionType: tab.name,
                  nodeId: _this.$options.ncmpobj.instanceObj.nodeId
                })
              };
              yufp.service.request({
                method: 'GET',
                url: backend.adminService + '/api/cmfrcruleresultresource/getmegout',
                data: param,
                callback: function (code, message, response) {
                  if (response.data.length > 0) {
                    var info = response.data;
                    if (tab.name == 'CARE') {
                      _this.careTableData = info;
                    } else if (tab.name == 'RISK') {
                      _this.riskTableData = info;
                    } else {
                      _this.proTableData = info;
                    }
                  };
                }
              });
            }
          }
        },
        delSomeFields: function(obj) {
          delete obj.displayType

          return obj
        },
        // 校验表单
        validFn: function(obj) {
          var flag = true;
          if(obj.marketTypeId){
            return flag
          }
          for (let key1 in obj) {
            if(!obj[key1] && key1 != 'marketTypeId') {
              flag = false
            }
          }
          return flag
        },
        save: function () {

          var _this = this;
          var tempArr = [];
          var nodeId = _this.$options.ncmpobj.instanceObj.nodeId;
          var assamlyId = _this.$options.ncmpobj.instanceObj.assemblyId;
          var activityId = _this.$options.ncmpobj.instanceObj.flowId;

          for (var key1 in _this.model) {
            var tempObj = _this.model[key1]
            if (_this.validFn(tempObj)) {
              tempObj.assamlyId = assamlyId;
              tempObj.activityId = activityId;
              tempObj.channelNodeId = nodeId;
              tempObj.mktPositCode = key1;
              tempObj.ctNodeId = tempObj.ctNodeId;
              // 如果营销方式为报名就删除一些不需要的字段
              if(_this.marketAssemblyId[tempObj.marketTypeId] === '14' || _this.marketAssemblyId[tempObj.marketTypeId] === '55' || _this.marketAssemblyId[tempObj.marketTypeId] === '71') {
                delete tempObj.displayType;
                delete tempObj.activityStartPic;
              } else {
                tempObj.vsStartDate = tempObj.marketBeginTime;
                tempObj.vsEndDate = tempObj.marketEndTime;
              }
              tempArr.push(
                tempObj
              )
            }
          }
          if (!tempArr.length) {
            _this.$message.error('请至少填写一项完整的提交内容');
            return
          }
          console.log(tempArr)
          _this.buttonHiden = true;
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/marketplan/savemktpositcontent',
            data: JSON.stringify(tempArr),
            callback: function (code, message, response) {
              if (response.data != null) {
                var info = response.data;
                _this.$message({ message: info.info, type: 'warn' });
              } else {

              }
              _this.buttonHiden = false;
              _this.$message({ message: '操作保存成功', type: 'success' });
            }
          });
          //   var nodeId = _this.$options.ncmpobj.instanceObj.nodeId;
          //   var preData = [];
          //   for (var i = 0; i < _this.selectFields.length; i++) {
          //     var preObj = {};
          //     preObj.assamlyId = _this.$options.ncmpobj.instanceObj.assemblyId;
          //     preObj.activityId = _this.$options.ncmpobj.instanceObj.flowId;
          //     preObj.channelNodeId = nodeId;
          //     preObj.ctNodeId = _this.selectFields[i].prop;
          //     preObj.mktPositCode = _this.selectFields[i].mktSetSign;
          //     preObj.vsStartDate = _this.model.marketBeginTime;
          //     preObj.vsEndDate = _this.model.marketEndTime;
          //     preObj.activityStartPic = _this.model.activityStartPic;
          //     preObj.displayType = _this.model.displayType;
          //     preData.push(preObj);
          //   }
          //   yufp.service.request({
          //     method: 'POST',
          //     url: backend.adminService + '/api/marketplan/savemktpositcontent',
          //     data: JSON.stringify(preData),
          //     callback: function (code, message, response) {
          //       if (response.data != null) {
          //         var info = response.data;
          //         _this.$message({message: info.info, type: 'warn'});
          //       } else {

          //       }
          //       _this.buttonHiden = true;
          //       _this.$message({message: '操作保存成功', type: 'success'});
          //     }
          //   });
        },
        close: function () {
          this.$options.ncmpobj.close();
        },
        fomatData: function (row, column, cellValue) { // 表格数据转码
          if (column.property == 'prodState') {
            return yufp.lookup.convertKey('PROD_STATE', cellValue);
          } else if (column.property == 'money') {
            return yufp.lookup.convertKey('JYBZ', cellValue);
          } else if (column.property == 'riskLevel') {
            return yufp.lookup.convertKey('RISK-LEVEL', cellValue);
          } else if (column.property == 'ifSuccess') {
            return yufp.lookup.convertKey('YESNO', cellValue);
          } else if (column.property == 'custType') {
            return yufp.lookup.convertKey('CUST_TYPE', cellValue);
          }
        },
        /**
         * 图片url补全
         */
        comUrlFn: function (path) {
          let url = yufp.settings.ssl ? 'https://' : 'http://';
          url += yufp.settings.url;
          url += backend.fileService;
          url += '/api/file/provider/download?fileId=' + path;
          return yufp.util.addTokenInfo(url);
        },
        /**
         * 添加图片
         */
        addPic: function (key) {
          var _this = this;
          _this.tempModelKey = key;
          _this.modelDisplayType = _this.model[key].displayType;
          _this.dialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.material.remoteMaterial()
          })

        },
        handleMaterialClose: function () {
          this.dialogVisible = false
        },
        getPicData: function (data) {
          this.tempPicData = data;
        },
        sureFn: function () {

          this.model[this.tempModelKey].activityStartPic = this.tempPicData.imgThumbNailId;
          this.model[this.tempModelKey].ctNodeId = this.tempPicData.id;

          this.$refs.material.resetSelectId()
          this.handleMaterialClose()
        },
        /**
 * 获取图片URL
 */
        fileIdToURL: function (fileId) {
          var url = yufp.settings.ssl ? 'https://' : 'http://';
          url += yufp.settings.url;
          url += backend.fileService;
          url += '/api/file/provider/download?fileId=' + fileId;
          return yufp.util.addTokenInfo(url);
          // return url;
        },
      },
      mounted: function () {
        var _this = this;
        yufp.lookup.bind('RUN_CONNECT_TYPE', function (data) {
          _this.sendOptions = data;
        });
        if (_this.$options.ncmpobj.instanceObj == undefined) {
          _this.buttonHiden = true;
        } else {
          _this.buttonHiden = false;
          var flowId = _this.$options.ncmpobj.instanceObj.flowId;
          var asseiblyId = _this.$options.ncmpobj.instanceObj.assemblyId;
          // 查询流程中的营销方式节点
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/presentationform/getmarkettypeall',
            data: {
              flowId: flowId
            },
            callback: function (code, message, response) {

              var from = response.data;
              if(from){
                _this.options1 = [];
                for(var i = 0;i<from.length;i++){
                  var marketObj = {};
                  marketObj.key = from[i].nodeId;
                  marketObj.value = from[i].nodeName;
                  _this.options1.push(marketObj);
                  _this.$set(_this.marketAssemblyId,from[i].nodeId,from[i].assemblyId);
                  _this.$set(_this.marketAssemblyName,from[i].nodeId,from[i].assemblyName);
                }
              }


            }
          });
          yufp.service.request({
            method: 'GET',
            url: backend.yuspClimpPoolService + '/api/cmicappluckdraw/displaylist',
            callback: function (code, message, response) {
              if (code == 0) {
                var from = response.data;
                for (var i = 0; i < from.length; i++) {
                  _this.articleOptions.push({
                    key: from[i].key,
                    value: from[i].value
                  });
                }
              }
            }
          });
          // 查询渠道组建的栏位信息
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/asseibly/getfieldschannelbyid?id=' + asseiblyId,
            callback: function (code, message, response) {
              var from = response.data;
              _this.mktFields = from;
              var obj = {}
              for (var i = 0; i < _this.mktFields.length; i++) {


                _this.options.push({
                  key: _this.mktFields[i].id,
                  value: _this.mktFields[i].mktSet
                });
                _this.$set(
                  obj,
                  _this.mktFields[i].id,
                  _this.tempFiled
                );
               // obj[from[i].id].mktSetSize = from[i].mktSetSize;
                // _this.$set(obj, 'marketBeginTime', '');
                // _this.$set(obj, 'marketEndTime', '');
              }


              _this.model = yufp.clone(obj, {})
              //_this.activeNames[0] = _this.mktFields[0].id
              // 查询流程中的营销方式节点内容
              yufp.service.request({
                method: 'GET',
                url: backend.adminService + '/api/marketplan/getmktpositcontent?nodeId=' + _this.$options.ncmpobj.instanceObj.nodeId,
                callback: function (code, message, response) {

                  var from = response.data;
                  if (from != null && from.length) {
                    for (var i = 0; i < from.length; i++) {
                      var obj = from[i];

                      _this.model[obj.mktPositCode].marketTypeId = obj.marketTypeId;
                      _this.model[obj.mktPositCode].displayType = obj.displayType;
                      _this.model[obj.mktPositCode].activityStartPic = obj.activityStartPic;
                      _this.model[obj.mktPositCode].marketBeginTime = new Date(obj.vsStartDate);
                      _this.model[obj.mktPositCode].marketEndTime = new Date(obj.vsEndDate);
                      _this.model[obj.mktPositCode].ctNodeId = obj.ctNodeId;

                    }
                  }
                }
              });
            }
          });

        }
      },
      destroyed: function () {
      }
    });
  };


  /**
   * 页面销毁时触发destroy方法
   * @param id 路由ID
   * @param cite 页面站点信息
   */
  exports.destroy = function (id, cite) {
  };
});