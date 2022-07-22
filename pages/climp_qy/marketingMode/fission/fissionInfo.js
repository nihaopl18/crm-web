/**
 * @created by hujun3 on 2019-4-10 17:57:21
 * @updated by
 * @description 裂变组件
 */

define(['pages/climp_qy/marketingMode/collectCard/collectCard.css',
  './custom/widgets/js/yufpProdSelector.js',
  './custom/widgets/js/yufpGoodsSelector.js',
  './custom/widgets/js/yufpVitureSelector.js',
  './custom/widgets/js/ElTinymceX.js','libs/tinymce/tinymce.min.js',
  'pages/cimp/marketcenter/marketcomptform/mobilebank/materialCenter.js'], function (require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('MUST_FIELDS,RELATE_PROD_TYPE,FISSION_TYPE');
      yufp.custom.vue({
        el: cite.el,
        ncmpobj: data.ncmpobj,
        data: function () {
          return {
            prizeTypeOptionsAll: [],
            formData: {},
            addformdata: {},
            imgType: '',
            imgTypeOpt: [],
            imgForm: [],
            signUpForm: {
            },
            dialogVisible1: false,
            dialogVisible: false, // 新增/修改弹出框
            prizeTableData: [], // 奖励表格数据
            options2: [
              { key: '1', value: '分享' },
              { key: '2', value: '助力' }
            ],
            prizeTypeOptions: [
              { key: '1', value: '商品' },
              { key: '2', value: '权益' }
            ],
            prizeData: [],
            'collapseName0': ['2'],
            signUpDate: [],
            busNo: '',
            tempPicData: {},
            tinymceId: 'tinymceEditor',
            toolbar: [
              'removeformat undo redo |  bullist numlist | outdent indent | forecolor | fullscreen code',
              'bold italic blockquote | h2 p | link | alignleft aligncenter alignright | table'
            ],
            rules: {
              fissionTitle: [
                { required: true, message: '字段不能为空' }
              ],
              startTime: [
                { required: true, message: '字段不能为空', trigger: 'change' }
              ],
              fissionMode: [
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
            fissionForm: {},
            previewVisible: false,
            backgroundImage: {
              url: '',
              type: ''
            },
            headImage: {
              url: '',
              type: ''
            },
            dialogTittle: '新增',
            tempPrizeType: ''
          };
        },
        mounted: function () {
          var _this = this;
          var nodeId = _this.$options.ncmpobj.instanceObj.nodeId;
          var aaa = [{ key: '1001', value: '手机' }, { key: '1002', value: '笔记本' }];
          var bbb = [{ key: '2001', value: '送积分10' }, { key: '2002', value: '送积分100' }];
          for (var i = 0; i < aaa.length; i++) {
            _this.prizeTypeOptionsAll.push(aaa[i]);
          }
          for (var i = 0; i < bbb.length; i++) {
            _this.prizeTypeOptionsAll.push(bbb[i]);
          }

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
                    if (option.mktSet === '背景图') {
                      _this.backgroundImage.type = option.id
                    }
                    if (option.mktSet === '头图') {
                      _this.headImage.type = option.id
                    }
                  }

                }

                yufp.service.request({
                  url: '/api/yscimcfmkactifission/getInfoByAssemble',
                  method: 'GET',
                  async: false,
                  data: { nodeId: nodeId },
                  callback: function (code, message, response) {
                    if (code == '0') {
                      var re = response.data;
                      if (re) {
                        yufp.extend(_this.formData, re);
                        _this.prizeTableData = re.rewards;


                        _this.signUpDate.push(re.startTime);
                        _this.signUpDate.push(re.endTime);

                        var imgList = re.images;
                        for (var i = 0; i < imgList.length; i++) {
                          _this.imgForm[imgList[i].imgType].imgUrl = imgList[i].imgUrl;
                          if (imgList[i].imgType === _this.backgroundImage.type) { // 设置背景图
                            _this.backgroundImage.url = imgList[i].imgUrl
                          }
                          if (imgList[i].imgType === _this.headImage.type) { // 设置背景图
                            _this.headImage.url = imgList[i].imgUrl
                          }
                        }

                      }


                    }
                  }
                });

              }
            }
          });
        },
        methods: {
          /**
          * 添加图片
          */
          addPic: function (key) {

            var _this = this;
            if(key){
              _this.imgType = key;
            }else{
              _this.imgType = "";
            }
            _this.dialogVisible1 = true;
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
          getPicData: function (data) {

            this.tempPicData = data;
          },
          handleDateChange: function (date) {
            const dates = date && date.split(' - ')
            this.formData.startTime = dates[0]
            this.formData.endTime = dates[1];
            var _this = this;
            this.$nextTick(function () {
              _this.$refs.cardform.validateField('startTime')
            })
          },
          preSeeFn: function () {
            this.previewVisible = true;
          },
          sureFn: function () {

            var _this = this;
            var naturalSize = this.tempPicData.naturalSize;
            if (_this.imgType) {
              if (_this.imgForm[_this.imgType].imgSize == naturalSize) {
                _this.imgForm[_this.imgType].imgUrl = _this.tempPicData.imgThumbNailId;
                if(_this.imgType === _this.backgroundImage.type) { // 设置背景图
                  _this.backgroundImage.url = _this.tempPicData.imgThumbNailId
                }
                if (_this.imgType === _this.headImage.type) { // 设置背景图
                  _this.headImage.url = _this.tempPicData.imgThumbNailId
                }
              } else {
                _this.$message.error('图片尺寸与栏位不服！！！,当前栏位尺寸：' + _this.imgForm[_this.imgType].imgSize);
              }
            } else {
              _this.formData.imageurl = _this.tempPicData.imgThumbNailId;
              _this.formData.imageSize = naturalSize;
            }

            _this.$refs.material.resetSelectId()
            _this.handleMaterialClose()
          },
          handleMaterialClose: function () {
            this.dialogVisible1 = false
          },
          /**
           * 商品值改变
           */
          prizeChange: function (val) {
            this.addformdata.prizeId = val;
          },
          /**
           * 奖品类型改变
           */
          prizeTypeChange: function (val) {
            console.log(val)
            var _this = this;
            _this.prizeData = [];
            console.log(_this.tempPrizeType)
            if (_this.tempPrizeType) {
              _this.addformdata.prizeName = '';
            }
            var aaa = [{ key: '1001', value: '手机' }, { key: '1002', value: '笔记本' }];
            var bbb = [{ key: '2001', value: '送积分10' }, { key: '2002', value: '送积分100' }];
            if (val == '1') {
              for (var i = 0; i < aaa.length; i++) {
                _this.prizeData.push(aaa[i]);
              }
            } else if (val == '2') {
              for (var i = 0; i < bbb.length; i++) {
                _this.prizeData.push(bbb[i]);
              }
            }
            _this.tempPrizeType = val;
          },
          delPrizeFn: function () {
            var _this = this;
            var ids = '';
            var selections = _this.$refs.yutable.selections;
            for (let i = 0; i < selections.length; i++) {
              ids += selections[i].id + ','
            }
            console.log(ids)
            var arr = yufp.extend([], _this.prizeTableData)
            var newArr = arr.filter(function (item) {
              return ids.indexOf(item.id) === -1;
            })
            _this.prizeTableData = newArr;
          },
          dealTableData: function (arr) {
            var temArr = [];
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].isAdd) {
                arr[i].id = "";
                delete arr[i].isAdd
              }
              temArr.push(arr[i])
            }
            return temArr
          },
          /**
             * 保存
             */
          saveFn: function () {

            var _this = this;
            var model = {};
            var myNodeId = _this.$options.ncmpobj.instanceObj.nodeId;
            model.nodeId = myNodeId;
            model.flag = 'fission';
            yufp.service.request({
              url: '/api/cmfrcnodepresent/insertlist',
              method: 'POST',
              data: model,
              async: false,
              callback: function (code, message, response) {

                if (response.data == 1) {
                  var fissionModel = {};
                  fissionModel = yufp.clone(fissionModel, _this.formData);
                  fissionModel.nodeId = myNodeId;
                  fissionModel.rewards = _this.dealTableData(_this.prizeTableData);

                  var imgList = [];
                  for (var i = 0; i < _this.imgTypeOpt.length; i++) {debugger
                    var imgObj = {};
                    imgObj.signUpId = myNodeId;
                    imgObj.imgType = _this.imgTypeOpt[i].id;
                    imgObj.imgUrl = _this.imgForm[_this.imgTypeOpt[i].id].imgUrl;
                    imgObj.imgSize = _this.imgForm[_this.imgTypeOpt[i].id].imgSize;
                    imgObj.imgTypeName = _this.imgTypeOpt[i].mktSet;
                    imgList.push(imgObj);
                  }
                  fissionModel.images = imgList;
                  yufp.service.request({
                    url: '/api/yscimcfmkactifission/save',
                    method: 'POST',
                    data: fissionModel,
                    callback: function (code, message, response) {
                      if (code == '0' && response.data) {
                        _this.$message("保存成功");
                      }
                    }
                  });
                }
              }
            });
          },
          /**
           * 修改奖励
           */
           updPrizepFn: function () {
            var _this = this;
            var selection = _this.$refs.yutable.selections;
            if (selection.length != 1) {
              _this.$message('请选择一条数据');
              return;
            }
            _this.dialogTittle = '修改';
            _this.dialogVisible = true;
            _this.$nextTick(function () {
              yufp.extend(_this.addformdata, selection[0]);
              console.log(_this.addformdata)
            });
          },
          /**
           * 新增奖励
           */
          addPrizeFn: function () {
            var _this = this;
            _this.dialogTittle = '新增';
            _this.dialogVisible = true;
            _this.$nextTick(function () {
              delete _this.addformdata.id;
              _this.$refs.addrefForm.resetFields();
            });
          },
          /**
           * 关闭奖励弹窗
           */
          handleDialogClose: function() {
            this.tempPrizeType = '';
            this.$refs.addrefForm.resetFields();
            this.dialogVisible = false;
          },
          /**
           * 确定保存新增/修改
           */
          surePriceFn: function() {
            var _this = this;
            var validate = false;
            _this.$refs.addrefForm.validate(function (valid) {
              validate = valid;
            });
            if (!validate) {
              return;
            };
            if(_this.addformdata.id) {
              console.log('修改')
              _this.updPrizeFn()
            } else {
              _this.saveprizeFn()
            }
            _this.handleDialogClose()
          },
          /**
           * 新增保存奖励
           */
          saveprizeFn: function () {
            var data = yufp.clone(this.addformdata, {});
            data.id = new Date().getTime();
            data.isAdd = true
            this.prizeTableData.push(data);
          },
          
        }
      })
        ;
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