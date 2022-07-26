/**
 * @created by chenlin on 2019-3-14 10:07:13
 * @updated by
 * @description 抽奖
 */
define(['pages/climp_qy/marketingMode/luckDraw/luckDraw.css',
  './custom/widgets/js/yufpProdSelector.js',
  './custom/widgets/js/yufpGoodsSelector.js',
  './custom/widgets/js/yufpVitureSelector.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('MUST_FIELDS,RELATE_PROD_TYPE,LUCK_TYPE');
    yufp.custom.vue({
      ncmpobj: data.ncmpobj,
      el: cite.el,
      data: function () {
        var _this = this;
        return {
          displayList:[],
          dialogVisible: false,
          dialogVisible1: false,
          imageSrc: '',
          ifShowButton: true,
          collapseName0: ['2'],
          dialogImageUrl: '',
          dialogImageUrl1: '',
          imageUrl: '',
          imageUrl1: '',
          imageUrl2: '',
          imageUrl3: '',
          imageUrl4: '',
          uploadAction: yufp.service.getUrl({url: backend.gatewayService + backend.fileService + '/api/file/provider/uploadfile?access_token=' + yufp.service.getToken()}),
          mustItems: [], // 必输项内容-显示的时候用到
          mustItemsInfo: [], // 这个主要是保存的时候用到
          markPics: [], // 活动说明图片
          secondPics: [], // 二等奖图片信息
          fistPics: [], // 一等奖图片信息
          fileList: [], // 活动说明上传图片列表
          fieldsVisible: false, // 选择必输项弹出框
          selectFormData: {
            mustSelect: ''
          },
          paramsOrg: {
            needCheckbox: true
          },
          startTime: { // 有效期开始日期小于结束日期
            disabledDate: function (time) {
              var beginDateVal = _this.formData.endTime;
              if (time.getTime() < Date.now() - 8.64e7) {
                return true;
              }
              if (beginDateVal) {
                return time.getTime() > beginDateVal;
              }
            }
          },
          endTime: { // 有效期结束日期大于开始日期
            disabledDate: function (time) {
              var beginDateVal = _this.formData.startTime;
              if (time.getTime() < Date.now() - 8.64e7) {
                return true;
              }
              if (beginDateVal) {
                return time.getTime() < beginDateVal;
              }
            }
          },
          formData: {
            fissionGiftName:'',
            fissionNum:'',
            ifrepeat:'',
            giftType:'',
            displayType:'',
            avtivityTitle: '',
            activityStartPic: '',
            startTime: null,
            endTime: null,
            activityOrg: '',
            ifIdentOrg: 'false',
            mastItems: [],
            routeUrl: '',
            luckType: '',
            luckNumByDay: '',
            luckNumByAct: '',
            luckRate: '',
            inviteReward: '',
            firstReWard: 'true',
            firstName: '',
            firstRewardName: '',
            prodType1: '',
            fistPic: '',
            firstRewardNum: '',
            firstLimit: '',
            secondReward: 'false',
            secondName: '',
            secondRewardName: '',
            prodType2: '',
            secondPic: '',
            secondRewardNum: '',
            secondLimit: '',
            threeReward: 'false',
            threeName: '',
            threeRewardName: '',
            prodType3: '',
            threePic: '',
            threeRewardNum: '',
            threeLimit: '',
            fourReward: 'false',
            fourName: '',
            fourRewardName: '',
            prodType4: '',
            fourPic: '',
            fourRewardNum: '',
            fourLimit: '',
            remark: '',
            markPic: [],
            activityRule: ''
          }
        };
      },
      methods: {
        'tianJia38': function () {

        },
        preview: function () {
          var _this = this;
          _this.dialogImageUrl1 = 'pages/climp_qy/marketingMode/luckDraw/luckDraw.png';
          _this.dialogVisible1 = true;
        },
        /**
         * 活动点击图片删除的方法
         */
        handleRemove: function (file, fileList) {
        //  console.log(file, fileList);
          var _this = this;
          let fieldId = '';
          if (file.url.indexOf('fileId') > -1) {
            fieldId = file.url.split('fileId=')[1].split('&')[0];
          } else {
            fieldId = file.response.data.filePath;
          }
          yufp.service.request({
            url: backend.fileService + '/api/file/provider/deleteFile',
            method: 'get',
            data: {
              fileId: fieldId
            },
            callback: function (code, message, res) {
              if (code == 0) {
                for (let i = 0; i < _this.markPics.length; i++) {
                  if (_this.markPics[i] == fieldId) {
                    _this.markPics.splice(i, 1);
                    break;
                  }
                }
                _this.formData.markPic = _this.markPics;
              }
            }
          });
        },

        /**
         * 活动头图上传成功方法
         */
        handleAvatarSuccess: function (res, file) {
          var url = yufp.settings.ssl ? 'https://' : 'http://';
          url += yufp.settings.url;
          url += backend.fileService;
          url += '/api/file/provider/download?fileId=' + res.data.filePath;
          this.formData.activityStartPic = res.data.filePath;
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
        /**
         * 点击图片放大方法
         */
        handlePictureCardPreview: function (file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        /**
         * 一等奖说明图片上传成功方法
         */
        handleAvatarSuccess0: function (res, file) {
          var url = yufp.settings.ssl ? 'https://' : 'http://';
          url += yufp.settings.url;
          url += backend.fileService;
          url += '/api/file/provider/download?fileId=' + res.data.filePath;
          this.formData.fistPic = res.data.filePath;
          this.imageUrl1 = yufp.util.addTokenInfo(url);
        },
        /**
         * 二等奖说明图片上传成功方法
         */
        handleAvatarSuccess1: function (res, file) {
          var url = yufp.settings.ssl ? 'https://' : 'http://';
          url += yufp.settings.url;
          url += backend.fileService;
          url += '/api/file/provider/download?fileId=' + res.data.filePath;
          this.formData.secondPic = res.data.filePath;
          this.imageUrl2 = yufp.util.addTokenInfo(url);
        },
        /**
         * 三等奖说明图片上传成功方法
         */
        handleAvatarSuccess3: function (res, file) {
          var url = yufp.settings.ssl ? 'https://' : 'http://';
          url += yufp.settings.url;
          url += backend.fileService;
          url += '/api/file/provider/download?fileId=' + res.data.filePath;
          this.formData.threePic = res.data.filePath;
          this.imageUrl3 = yufp.util.addTokenInfo(url);
        },
        /**
         * 三等奖说明图片上传成功方法
         */
        handleAvatarSuccess4: function (res, file) {
          var url = yufp.settings.ssl ? 'https://' : 'http://';
          url += yufp.settings.url;
          url += backend.fileService;
          url += '/api/file/provider/download?fileId=' + res.data.filePath;
          this.formData.fourPic = res.data.filePath;
          this.imageUrl4 = yufp.util.addTokenInfo(url);
        },
        /**
         * 活动说明图片上传成功方法
         */
        handleAvatarSuccess2: function (res, file) {
          this.markPics.push(res.data.filePath);
          this.formData.markPic = this.markPics;
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
         * 客户属性添加
         */
        custInfoAddFn: function () {
          this.fieldsVisible = true;
        },
        selectFieldFn: function () {
          var _this = this;
          var selected = _this.$refs.selectFieldForm.formdata.mustSelect;
          for (let i = 0; i < selected.length; i++) {
            let info = selected[i];
            let label = yufp.lookup.convertKey('MUST_FIELDS', info);
            _this.mustItems.push({
              key: info,
              label: label
            });
            _this.mustItemsInfo.push(info);
          }
          _this.formData.mastItems = _this.mustItemsInfo;
          this.fieldsVisible = false;
        },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          var validate = false;
          this.$refs.luckForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var nodeId = this.$options.ncmpobj.instanceObj.nodeId;
          var preData = [];
          for (var i = 0; i < this.$refs.luckForm.fields.length; i++) {
            var preObj = {};
            preObj.formOperationFiled = this.$refs.luckForm.fields[i].name;// 'startTime';
            if (this.$refs.luckForm.fields[i].name == 'startTime' || this.$refs.luckForm.fields[i].name == 'endTime') {
              preObj.formOperationVal = yufp.util.dateFormat(this.$refs.luckForm.fields[i].fieldValue, '{y}-{m}-{d} {h}:{i}:{s}');
            } else if (this.$refs.luckForm.fields[i].name == 'mastItems' || this.$refs.luckForm.fields[i].name == 'markPic') {
              if (this.$refs.luckForm.fields[i].fieldValue != null && this.$refs.luckForm.fields[i].fieldValue != '') {
                preObj.formOperationVal = this.$refs.luckForm.fields[i].fieldValue.join(',');
              }
            } else {
              preObj.formOperationVal = this.$refs.luckForm.fields[i].fieldValue;
            }

            preData.push(preObj);
          }
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/presentationform/savepre',
            data: {
              preData: JSON.stringify(preData),
              nodeId: nodeId
            },
            callback: function (code, message, response) {
              _this.$message({message: '操作保存成功', type: 'success'});
            }
          });
        }
      },
      created: function () {
        var _this = this;
        yufp.service.request({
          method: 'GET',
          url: backend.yuspClimpPoolService + '/api/cmicappluckdraw/displaylist',
          callback: function (code, message, response) {
            if (code == 0) {
              var data = response.data;
              if (data.length) {
                for (var i = 0; i < data.length; i++) {
                  _this.displayList.push(data[i]);
                }
              }
            }
          }
        });
      },
      mounted () {
        var _this = this;
        if (_this.$options.ncmpobj.instanceObj == undefined) {
          _this.ifShowButton = false;
        } else {
          _this.ifShowButton = true;
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/presentationform/getpre',
            data: {
              nodeId: _this.$options.ncmpobj.instanceObj.nodeId
            },
            callback: function (code, message, response) {
              var from = response.data;
              for (var i = 0; i < from.length; i++) {
                // for (var j = 0; j < _this.$refs.luckForm.fields.length; j++) {
                if (from[i].formOperationFiled == 'startTime') {
                  _this.formData.startTime = new Date(from[i].formOperationVal.replace(/-/g, '/'));
                } else if (from[i].formOperationFiled == 'endTime') {
                  _this.formData.endTime = new Date(from[i].formOperationVal.replace(/-/g, '/'));
                } else if (from[i].formOperationFiled == 'mastItems') {
                  if (from[i].formOperationVal != null && from[i].formOperationVal != '') {
                    let items = from[i].formOperationVal.split(',');
                    for (let i = 0; i < items.length; i++) {
                      var info = items[i];
                      var label = yufp.lookup.convertKey('MUST_FIELDS', info);
                      _this.mustItems.push({
                        key: info,
                        label: label
                      });
                    }
                    _this.mustItemsInfo = items;
                    _this.formData.mastItems = items;
                  }
                } else if (from[i].formOperationFiled == 'markPic') {
                  if (from[i].formOperationVal != null && from[i].formOperationVal != '') {
                    _this.formData.markPic = from[i].formOperationVal.split(',');
                    _this.markPics = from[i].formOperationVal.split(',');
                    for (let i = 0; i < _this.markPics.length; i++) {
                      let info = {};
                      info.url = _this.comUrlFn(_this.markPics[i]);
                      info.name = i + '';
                      _this.fileList.push(info);
                    }
                  }
                } else if (from[i].formOperationFiled == 'fistPic') {
                  _this.formData.fistPic = from[i].formOperationVal;
                  _this.imageUrl1 = _this.comUrlFn(from[i].formOperationVal);
                } else if (from[i].formOperationFiled == 'secondPic') {
                  _this.formData.secondPic = from[i].formOperationVal;
                  _this.imageUrl2 = _this.comUrlFn(from[i].formOperationVal);
                } else if (from[i].formOperationFiled == 'threePic') {
                  _this.formData.threePic = from[i].formOperationVal;
                  _this.imageUrl3 = _this.comUrlFn(from[i].formOperationVal);
                } else if (from[i].formOperationFiled == 'fourPic') {
                  _this.formData.fourPic = from[i].formOperationVal;
                  _this.imageUrl4 = _this.comUrlFn(from[i].formOperationVal);
                } else if (from[i].formOperationFiled == 'activityStartPic') {
                  _this.formData.activityStartPic = from[i].formOperationVal;
                  _this.imageUrl = _this.comUrlFn(from[i].formOperationVal);
                } else {
                  _this.formData[from[i].formOperationFiled] = from[i].formOperationVal;
                }
                // }
              }
            }
          });
        }
      }
    });
  };

  /**
   * 页面传递消息处理
   * @param type 消息类型
   * @param message 消息内容
   */
  exports.onmessage = function (type, message) {
  };

  /**
   * 页面销毁时触发destroy方法
   * @param id 路由ID
   * @param cite 页面站点信息
   */
  exports.destroy = function (id, cite) {
  };
});