/**
 * @created by chenlin on 2019-3-12 17:57:21
 * @updated by
 * @description 集卡组件
 */
define(['pages/climp_qy/marketingMode/collectCard/collectCard.css',
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
      yufp.lookup.reg('MUST_FIELDS,RELATE_PROD_TYPE,CARD_TYPE');
      yufp.custom.vue({
        el: cite.el,
        ncmpobj: data.ncmpobj,
        data: function () {
          var _this = this;
          return {
            displayList:[],
            dialogVisible: false,
            dialogVisible1: false,
            imageSrc: '',
            collapseName0: ['2'],
            ifShowButton: true,
            dialogImageUrl: '',
            dialogImageUrl1: '',
            imageUrl: '',
            imageUrl1: '',
            uploadAction: yufp.service.getUrl({ url: backend.gatewayService + backend.fileService + '/api/file/provider/uploadfile?access_token=' + yufp.service.getToken() }),
            fieldsVisible: false, // 选择必输项弹出框
            paramsOrg: {
              needCheckbox: true
            },
            mustItems: [], // 必输项内容-显示的时候用到
            mustItemsInfo: [], // 这个主要是保存的时候用到
            markPics: [], // 活动说明图片
            cardFileList: [], // 卡片上传列表 
            cardFileLists: [], // 卡片保存列表
            fileList: [], // 上传图片列表
            selectFormData: {
              mustSelect: ''
            },
            // 金融机构选择列表
            instuOptions: [],
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
              displayType:'',
              avtivityTitle: '',
              activityStartPic: '',
              startTime: null,
              endTime: null,
              activityOrg: '',
              ifIdentOrg: '',
              mastItems: [],
              routeUrl: '',
              prodType: '',
              prodInfo: '',
              prodOldPrice: 0,
              IffullPay: '',
              originPrice: 0,
              limitNumDay: 0,
              shareReward: 0,
              cardType: '02',
              cardContent: '',
              personNum: 0,
              prodNum: 0,
              mark: '',
              markPic: '',
              acitvityRule: ''
            }
          };
        },
        methods: {
          /**
           * 点击图片删除的方法
           */
          handleRemove: function (file, fileList) {
            //  console.log(file, fileList);
            var _this = this;
            yufp.service.request({
              url: backend.fileService + '/api/file/provider/deleteFile',
              method: 'get',
              data: {
                fileId: file.response.data.filePath
              },
              callback: function (code, message, res) {
                if (code == 0) {
                  for (let i = 0; i < _this.markPics.length; i++) {
                    if (_this.markPics[i] == file.response.data.filePath) {
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
           * 点击卡片删除的方法
           */
          handleRemove2: function (file, fileList) {
            var _this = this;
            yufp.service.request({
              url: backend.fileService + '/api/file/provider/deleteFile',
              method: 'get',
              data: {
                fileId: file.response.data.filePath
              },
              callback: function (code, message, res) {
                if (code == 0) {
                  for (let i = 0; i < _this.cardFileLists.length; i++) {
                    if (_this.cardFileLists[i].cardPic == file.response.data.fileId) {
                      _this.cardFileLists.splice(i, 1);
                      break;
                    }
                  }
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
             * 卡片内容图上传成功方法
             */
          handleAvatarSuccess2: function (res, file) {
            var url = yufp.settings.ssl ? 'https://' : 'http://';
            url += yufp.settings.url;
            url += backend.fileService;
            url += '/api/file/provider/download?fileId=' + res.data.filePath;
            this.formData.cardContent = res.data.filePath;
            this.imageUrl1 = yufp.util.addTokenInfo(url);
            // 卡片列表
            var card = {
              actyId: this.$options.ncmpobj.instanceObj.flowId,
              cardName: res.data.fileName,
              cardPic: res.data.filePath,
              cardType: res.data.extName
            };
            this.cardFileLists.push(card);
          },
          /**
             * 上传图片校验方法
             */
          beforeAvatarUpload: function (file) {
            var type = file.type;
            var size = file.size / 1024 / 1024;
            if (type !== 'image/jpeg' && type !== 'image/png' && type !== 'image/jpg' && type !== 'image/jpg') {
              // this.$message.error('只能上传图片或者视频!');
            }
            if (size > 2) {
              // this.$message.error('上传头像图片大小不能超过 2MB!');
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
             * 活动说明图片上传成功方法
             */
          handleAvatarSuccess1: function (res, file) {
            this.markPics.push(res.data.filePath);
            this.formData.markPic = this.markPics;
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
            // 填入必填选项前先清空之前的内容
            _this.mustItems.splice(0,_this.mustItems.length);
            _this.mustItemsInfo.splice(0,_this.mustItemsInfo.length);
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
            this.$refs.cardform.validate(function (valid) {
              validate = valid;
            });
            if (!validate) {
              return;
            }
            var nodeId = this.$options.ncmpobj.instanceObj.nodeId;
            var preData = [];
            for (var i = 0; i < this.$refs.cardform.fields.length; i++) {
              var preObj = {};
              preObj.formOperationFiled = this.$refs.cardform.fields[i].name;// 'startTime';
              if (this.$refs.cardform.fields[i].name == 'startTime' || this.$refs.cardform.fields[i].name == 'endTime') {
                preObj.formOperationVal = yufp.util.dateFormat(this.$refs.cardform.fields[i].fieldValue, '{y}-{m}-{d} {h}:{i}:{s}');
              } else if (this.$refs.cardform.fields[i].name == 'mastItems') {
                 // 报名必填
                 if (this.$refs.cardform.fields[i].fieldValue == undefined || this.$refs.cardform.fields[i].fieldValue == '') {
                  preObj.formOperationVal = this.$refs.cardform.fields[i].fieldValue;
                } else {
                  preObj.formOperationVal = this.$refs.cardform.fields[i].fieldValue.join(',');
                }    
              } else if (this.$refs.cardform.fields[i].name == 'markPic') {
                // 活动图片
                if (this.markPics.length == 0) {
                  preObj.formOperationVal = '';
                } else {
                  preObj.formOperationVal = this.markPics.join(',');
                }
              } else if (this.$refs.cardform.fields[i].name == 'cardContent') {
                // 卡图片
                var arr = [];
                for (var j = 0; j < _this.cardFileLists.length; j++) {
                  arr[j] = _this.cardFileLists[j].cardPic;
                }
                preObj.formOperationVal = arr.join(',');
              } else {
                preObj.formOperationVal = this.$refs.cardform.fields[i].fieldValue;
              }
              preData.push(preObj);
            }
            // 卡片新增
            var cardList = [];
            for (var i = 0; i < this.cardFileLists.length; i++) {
              cardList.push(this.cardFileLists[i]);
            }
            yufp.service.request({
              method: 'post',
              url: '/api/cimpappcardinfo/insertcard', 
              data: {cards: cardList},
              callback: function(code, message, response) {
                if (response.code == 0) {
                  var cardNum = response.data;
                }
              }
            });
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/presentationform/savepre',
              data: {
                preData: JSON.stringify(preData),
                nodeId: nodeId
              },
              callback: function (code, message, response) {
                _this.$message({ message: '操作保存成功', type: 'success' });
              }
            });
          },
          preview: function () {
            var _this = this;
            _this.dialogImageUrl1 = 'pages/climp_qy/marketingMode/collectCard/collectCard.png';
            _this.dialogVisible1 = true;
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
          }
        },
        created: function () {
          var _this = this;
          // 父积分池查询
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
        mounted() {
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
                var ifPic = false;
                for (var i = 0; i < from.length; i++) {
                  // for (var j = 0; j < _this.$refs.cardform.fields.length; j++) {
                  if (from[i].formOperationFiled == 'startTime') {
                    _this.formData.startTime = new Date(from[i].formOperationVal.replace(/-/g, '/'));
                  } else if (from[i].formOperationFiled == 'endTime') {
                    _this.formData.endTime = new Date(from[i].formOperationVal.replace(/-/g, '/'));
                  } else if (from[i].formOperationFiled == 'mastItems') {
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
                  } else if (from[i].formOperationFiled == 'activityStartPic') {
                    _this.formData.activityStartPic = from[i].formOperationVal;
                    _this.imageUrl = _this.comUrlFn(from[i].formOperationVal);
                  } else if (from[i].formOperationFiled == 'cardType' && from[i].formOperationVal == '02') {
                    _this.formData.cardType = from[i].formOperationVal;
                    ifPic = true;
                    _this.imageUrl1 = _this.comUrlFn(_this.formData.cardContent);
                  } else if (from[i].formOperationFiled == 'cardContent') { // && ifPic 加入数字卡片判断条件
                    _this.formData.cardContent = from[i].formOperationVal.split(',');
                    _this.cardFileLists = from[i].formOperationVal.split(',');
                    // var urlarr = from[i].formOperationVal.split(',');
                    for (let i = 0; i < _this.cardFileLists.length; i++) {
                      let info = {};
                      info.url = _this.comUrlFn(_this.cardFileLists[i]);
                      info.name = i + '';
                      _this.cardFileList.push(info);
                    }
                    // _this.imageUrl1 = _this.comUrlFn(from[i].formOperationVal);
                  } else {
                    _this.formData[from[i].formOperationFiled] = from[i].formOperationVal;
                  }
                  // }
                }
              }
            });
          }
          // 获取金融机构
          yufp.service.request({
            url: '/api/loyqycommoditycategory/getinstus',
            method: 'get',
            callback: function (code, message, response) {
              var data = response.data;
              for (var i = 0; i < data.length; i++) {
                _this.instuOptions.push(data[i]);
              }
            }
          });
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