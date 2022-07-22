/**
 * @created by chenlin on 2019-3-14 10:13:34
 * @updated by
 * @description 拼团组件
 */
define(['pages/climp_qy/marketingMode/assemble/assemble.css',
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
    yufp.lookup.reg('MUST_FIELDS,RELATE_PROD_TYPE,MATERIAL_TYPE');
    // 创建virtual model
    yufp.custom.vue({
      el: cite.el,
      ncmpobj: data.ncmpobj,
      data: function () {
        var _this = this;
        return {
          buttonDisable: false,
          displayList: [],
          displayType: '',
          dialogVisible: false,
          dialogVisible1: false,
          ifShowButton: true,
          imageSrc: '',
          collapseName0: ['2'],
          dialogImageUrl: '',
          dialogImageUrl1: '',
          imageUrl: '',
          uploadAction: yufp.service.getUrl({url: backend.gatewayService + backend.fileService + '/api/file/provider/uploadfile?access_token=' + yufp.service.getToken()}),
          fieldsVisible: false, // 选择必输项弹出框
          paramsOrg: {
            needCheckbox: true
          },
          mustItems: [], // 必输项内容-显示的时候用到
          mustItemsInfo: [], // 这个主要是保存的时候用到
          markPics: [], // 活动说明图片
          fileList: [], // 上传图片列表
          selectFormData: {
            mustSelect: ''
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
          options: [],
          formData: {
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
            modelId: '',
            prodOldPrice: 0,
            IffullPay: '',
            originPrice: 0,
            firstGroupNum: 0,
            firstGroupPrice: 0,
            twoGroupNum: 0,
            twoGroupPrice: 0,
            threeGroupNum: 0,
            threeGroupPrice: 0,
            ifVirtualGroup: '',
            ifNotFullGroup: '',
            ifOriginPrice: '',
            limitProdNum: '',
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
          if (type !== 'image/jpeg' && type !== 'image/png' && type !== 'image/jpg' && type !== 'video/mp4') {
            this.$message.error('活动素材图片只能是 JPG 格式!');
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
          this.$refs.myform.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          _this.buttonDisable = true;
          var nodeId = this.$options.ncmpobj.instanceObj.nodeId;
          var preData = [];
          for (var i = 0; i < this.$refs.myform.fields.length; i++) {
            var preObj = {};
            preObj.formOperationFiled = this.$refs.myform.fields[i].name;// 'startTime';
            if (this.$refs.myform.fields[i].name == 'startTime' || this.$refs.myform.fields[i].name == 'endTime') {
              preObj.formOperationVal = yufp.util.dateFormat(this.$refs.myform.fields[i].fieldValue, '{y}-{m}-{d}');
            } else if (this.$refs.myform.fields[i].name == 'mastItems' || this.$refs.myform.fields[i].name == 'markPic') {
              if (this.$refs.myform.fields[i].fieldValue != null && this.$refs.myform.fields[i].fieldValue != '') {
                preObj.formOperationVal = this.$refs.myform.fields[i].fieldValue.join(',');
              }
            } else {
              preObj.formOperationVal = this.$refs.myform.fields[i].fieldValue;
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
              // _this.saveFlag = 'true';
              _this.buttonDisable = false;
              _this.$message({message: '操作保存成功', type: 'success'});
            }
          });
        },
        preview: function () {
          var _this = this;
          // 目前仅显示一个图片
          _this.dialogImageUrl1 = 'pages/climp_qy/marketingMode/assemble/assemble.png';
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
        },
        /**
         * 礼品选择后的回调方法
         */
        setGiftParam: function (commodity) {
          var _this = this;
          _this.formData.prodName = commodity[0].commodityName;
          yufp.service.request({
            method: 'GET',
            url: backend.adminService + '/api/loyqycommmodel/modelparamquery',
            data: {
              commodityCode: commodity[0].commodityCode
            },
            callback: function (code, message, response) {
              var tab = response.data;
              for (var i = 0; i < tab.length; i++) {
                var option = {};
                option.key = tab[i].key;
                option.value = tab[i].value;
                _this.options.push(option);
              }
            }
          });
        },
        /**
         * 金融产品选择后的回调方法
         */
        setProdParam: function (commodity) {
          var _this = this;
          _this.formData.prodName = commodity[0].prodName;
        },
        /**
         * 虚拟票券选择后的回调方法
         */
        setVitParam: function (commodity) {
          var _this = this;
          _this.formData.prodName = commodity[0].merchantName;
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
                // for (var j = 0; j < _this.$refs.myform.fields.length; j++) {
                if (from[i].formOperationFiled == 'startTime') {
                  if (from[i].formOperationVal != null && from[i].formOperationVal != '') {
                    _this.formData.startTime = new Date(from[i].formOperationVal.replace(/-/g, '/'));
                  }
                } else if (from[i].formOperationFiled == 'endTime') {
                  if (from[i].formOperationVal != null && from[i].formOperationVal != '') {
                    _this.formData.endTime = new Date(from[i].formOperationVal.replace(/-/g, '/'));
                  }
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
                } else if (from[i].formOperationFiled == 'prodInfo') {
                  if (from[i].formOperationVal != null && from[i].formOperationVal != '') {
                    yufp.service.request({
                      method: 'GET',
                      url: backend.adminService + '/api/loyqycommmodel/modelparamquery',
                      data: {
                        commodityCode: from[i].formOperationVal
                      },
                      callback: function (code, message, response) {
                        var tab = response.data;
                        for (var i = 0; i < tab.length; i++) {
                          var option = {};
                          option.key = tab[i].key;
                          option.value = tab[i].value;
                          _this.options.push(option);
                        }
                      }
                    });
                  }
                  _this.formData.prodInfo = from[i].formOperationVal;
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