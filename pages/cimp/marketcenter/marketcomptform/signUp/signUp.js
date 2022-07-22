/**
 * @created by zhangkun6 on 2021-12-22 10:16:09
 * @updated by
 * @description 报名
 */

define([
  './custom/widgets/js/ElTinymceX.js','libs/tinymce/tinymce.min.js',
  'pages/cimp/marketcenter/marketcomptform/mobilebank/materialCenter.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      ncmpobj: data.ncmpobj,
      data: function () {
        return {
          tempPicData: {},
          dialogVisible: false,
          previewVisible: true,
          testValue: '',
          imgType: '',
          imgTypeOpt: [],
          imgForm: [],
          signUpForm: {
            limitcustflag: false
          },
          busNo: '',
          tinymceId: 'tinymceEditor',
          toolbar: [
            'removeformat undo redo |  bullist numlist | outdent indent | forecolor | fullscreen code',
            'bold italic blockquote | h2 p | link | alignleft aligncenter alignright | table'
          ],
          dataUrl: '',
          imageUrl: '',
          preFormData: {},
          preLoading: false,
          rules: {
            signupTitle: [
              { required: true, message: '字段不能为空' }
            ],
            actStartTime: [
              { required: true, message: '字段不能为空' }
            ],
            limitcustflag: [
              { required: true, message: '字段不能为空' }
            ],
            limittype: [
              { required: true, message: '字段不能为空' }
            ],
            limitnum: [
              { required: true, message: '字段不能为空' }
            ],
            imageurl: [
              { required: true, message: '字段不能为空' }
            ],
            content: [
              { required: true, message: '字段不能为空' }
            ],
          },
          radioOptions: [
            {
              key: '1',
              value: '每天'
            },
            {
              key: '2',
              value: '报名期间'
            },
          ],
          signUpDate: [],
          backgroundImage: {
            url: '',
            type: ''
          },
          headImage: {
            url: '',
            type: ''
          },
        };
      },
      mounted: function () {
        var _this = this;
        var nodeId = _this.$options.ncmpobj.instanceObj.nodeId;

        //加载栏位
        yufp.service.request({
          method: 'GET',
          url: '/api/material/getfieldschannel',
          data: {},
          callback: function (code, message, response) {
            if (response.code == 0) {
              // 先清空栏位列表
              var dd = response.data;
              for (var i = 0; i < dd.length; i++) {
                var option = dd[i];
                if (option.channelName == '报名') {
                  _this.imgTypeOpt.push(option);
                  _this.imgForm[option.id] = {};
                  _this.imgForm[option.id].imgSize = option.mktSetSize;
                  _this.imgForm[option.id].imgUrl = "";
                  if(option.mktSet === '背景图') {
                    _this.backgroundImage.type = option.id
                  }
                  if (option.mktSet === '头图') {
                    _this.headImage.type = option.id
                  }
                }

              }

              yufp.service.request({
                method: 'GET',
                url: backend.adminService + '/api/cmicappassemblesignup/getInfoById?id=' + nodeId,
                callback: function (code, message, response) {
                  if (response && response.data) {
                    yufp.extend(_this.signUpForm, response.data);
                    if (_this.signUpForm.limitcustflag == 'true') {
                      _this.signUpForm.limitcustflag = true;
                    } else {
                      _this.signUpForm.limitcustflag = false;
                    }
                    _this.signUpDate.push(_this.signUpForm.actStartTime);
                    _this.signUpDate.push(_this.signUpForm.actEndTime);
                    if(response.data.list){
                      var imgList =response.data.list;
                      for(var i = 0 ;i<imgList.length;i++){
                        _this.imgForm[imgList[i].imgType].imgUrl = imgList[i].imgUrl;
                        if(imgList[i].imgType === _this.backgroundImage.type) { // 设置背景图
                          _this.backgroundImage.url = imgList[i].imgUrl
                        }
                        if (imgList[i].imgType === _this.headImage.type) { // 设置背景图
                          _this.headImage.url = imgList[i].imgUrl
                        }
                      }
                    }
                  };
                }
              });

            }
          }
        });
      },
      methods: {
        sureFn: function () {
          var _this = this;
          var naturalSize = this.tempPicData.naturalSize;
          if (_this.imgType) {
            if(_this.imgForm[_this.imgType].imgSize == naturalSize){
              _this.imgForm[_this.imgType].imgUrl = _this.tempPicData.imgThumbNailId;
              if(_this.imgType === _this.backgroundImage.type) { // 设置背景图
                _this.backgroundImage.url = _this.tempPicData.imgThumbNailId
              }
              if (_this.imgType === _this.headImage.type) { // 设置背景图
                _this.headImage.url = _this.tempPicData.imgThumbNailId
              }
              
            }else{
              this.$message.error('图片尺寸与栏位不服！！！');
              this.$refs.material.resetSelectId()
              this.handleMaterialClose()
            }
            
          } else {
            _this.signUpForm.imageurl = this.tempPicData.imgThumbNailId;
            _this.signUpForm.imageSize = naturalSize;
            
          }

          this.signUpForm.ctNodeId = this.tempPicData.id;

          this.$refs.material.resetSelectId()
          this.handleMaterialClose()
        },
        handleMaterialClose: function () {
          this.dialogVisible = false
        },
        getPicData: function (data) {

          this.tempPicData = data;
        },
        /**
         * 添加图片
         */
        addPic: function (key, name) {

          var _this = this;
          if(key){
            _this.imgType = key;
          }else{
            _this.imgType = "";
          }
          _this.dialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.material.remoteMaterial()
          })

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
        handleAvatarSuccess: function (res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload: function (file) {
          var isJPG = file.type === 'image/jpeg';
          var isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        preSeeFn: function () {
          var _this = this;
          _this.previewVisible = true;
          // _this.preLoading = true;
          // setTimeout(function () {
          //   _this.preLoading = false;
          //   _this.preFormData = yufp.clone(_this.signUpForm, {});
          //   _this.preFormData.imgPath = this.imageUrl;
          // }, 1000)
        },
        handleDateChange: function (date) {
          console.log(date)
          const dates = date && date.split(' - ')
          this.signUpForm.actStartTime = dates[0]
          this.signUpForm.actEndTime = dates[1]
        },
        handleLimitFlgChange: function () {
          this.$refs.refFormDemo.validateField('limitcustflag')
        },
        saveFn: function () {
          //this.$refs.refFormDemo.validate(() => { });
          var _this = this;
          if (!_this.previewVisible) {
            _this.$message("请先预览效果图");
            return;
          }

          var nodeId = _this.$options.ncmpobj.instanceObj.nodeId;
          var param = {};
          yufp.extend(param, _this.signUpForm);
          param.id = nodeId;
          param.actHtmlContent = '<html>' + _this.$refs.previewHtml.$el.innerHTML + '</html>';
          var imgList = [];
          for (var i = 0; i < _this.imgTypeOpt.length; i++) {
            var imgObj = {};
            imgObj.signUpId = nodeId;
            imgObj.imgType = _this.imgTypeOpt[i].id;
            imgObj.imgUrl = _this.imgForm[_this.imgTypeOpt[i].id].imgUrl;
            imgObj.imgSize = _this.imgForm[_this.imgTypeOpt[i].id].imgSize;
            imgObj.imgTypeName = _this.imgTypeOpt[i].mktSet;
            imgList.push(imgObj);
          }
          param.list = imgList;
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/cmicappassemblesignup/save',
            data: param,
            callback: function (code, message, response) {
              if (response.data = 1) {
                _this.$message("保存成功");
              };
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