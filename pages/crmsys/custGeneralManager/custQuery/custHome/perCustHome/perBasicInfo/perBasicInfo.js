/**
 * @Created by 宋雨 songyu4@yusys.com.cn on 2019-1-17 14:31:58.
 * @updated by
 * @description 零售客户基本信息
 */


define(['./libs/js-xlsx/xlsx.full.min.js',
  './custom/widgets/js/yufpOrgTree.js',
  './custom/widgets/js/yufpRoleSelector.js',
  './libs/jsencrypt/jsencrypt.min.js',
  './custom/widgets/js/yufpDptTree.js',
  './custom/widgets/js/yufpExtTree.js'], function (require, exports) {
    /**
      * 页面加载完成时触发
      * @param hashCode 路由ID
      * @param data 传递数据对象
      * @param cite 页面站点信息
      */
    exports.ready = function (hashCode, data, cite) {
      var custId = data.custId;// 获取客户id
      yufp.lookup.reg('CD0447,CD0288,CD0019,CD0017,CD0009,CD0010,CD0005,CD0049,CD0048,CD0008,CD0242,CD0425,CD0025,CD0240,CD0069,CD0004,CD0254,CD0253,CD0419,CD0280,CD0047,CD0124,CD0281,CD0417,SEX_TYPE,CD0279,CD0070');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          return {
            saveButton: !yufp.session.checkViewCtrl('save', data.id),
            hisButton: !yufp.session.checkViewCtrl('his', data.id),
            addBtn: !yufp.session.checkViewCtrl('add', data.id),
            editBtn: !yufp.session.checkViewCtrl('edit', data.id),
            expandCollapseName: ['base'],
            uploadAction: yufp.service.getUrl({ url: backend.gatewayService + backend.fileService + '/api/file/provider/uploadfile?access_token=' + yufp.service.getToken() }),
            imageUrl: '',
            //  custPhotoStr: '',
            formdata1: {}, // 基本信息
            basedata: '',
            formdata2: {}, // 工作信息
            workdata: '',
            formdata3: {}, // 履历信息
            formdata4: {}, // 与我行关系
            ralationdata: '',
            formdata5: {}, // 涉农个性标识
            farmerdata: '',
            formdata6: {}, // 重要标志信息
            importdata: '',
            oldData1: {}, // 基本信息修改前
            oldData2: {}, // 工作信息修改前
            oldData4: {}, // 与我行关系修改前
            oldData6: {}, // 重要标志信息修改前
            dataUrl: backend.custpersonService + '/api/pcustbaseview/queryresumelist/' + custId, // 履历信息查询url
            dialogVisible: false, // 履历信息
            formDisabled: false, // 履历信息
            viewType: 'DETAIL', // 履历信息
            viewTitle: yufp.lookup.find('CRUD_TYPE', false), // 履历信息
            saveBtnShow: true, // 履历信息
            hisdataUrl: backend.custpersonService + '/api/pcustbaseview/queryCustUpdateHis/' + custId, // 修改历史查询
            hisdialogVisible: false,
            hisviewType: 'DETAIL',
            hisviewTitle: yufp.lookup.find('CRUD_TYPE', false),
            rule: {
              englishName: [
                { max: 25, message: '最大长度不超过25个字符', trigger: 'blur' },
                { message: '字段不能为空', trigger: 'blur' }
              ],
              titleCd: [
                { max: 10, message: '最大长度不超过10个字符', trigger: 'blur' },
                { message: '字段不能为空', trigger: 'blur' }
              ],
              polStat: [

                { message: '字段不能为空', trigger: 'blur' }
              ],
              brnPlace: [
                { max: 25, message: '最大长度不超过25个字符', trigger: 'blur' },
                { message: '字段不能为空', trigger: 'blur' }
              ],
              regPlace: [
                { max: 60, message: '最大长度不超过60个字符', trigger: 'blur' },
                { message: '字段不能为空', trigger: 'blur' }
              ],
              faithStat: [

                { message: '字段不能为空', trigger: 'blur' }
              ],
              indivOcc: [

                { message: '字段不能为空', trigger: 'blur' }
              ],
              birthDt: [

                { message: '字段不能为空', trigger: 'blur' }
              ],
              marriStat: [

                { message: '字段不能为空', trigger: 'blur' }
              ],
              higEduDgr: [

                { message: '字段不能为空', trigger: 'blur' }
              ],
              higEduRec: [

                { message: '字段不能为空', trigger: 'blur' }
              ],
              agriFlg: [

                { message: '字段不能为空', trigger: 'blur' }
              ],
              hltStat: [

                { message: '字段不能为空', trigger: 'blur' }
              ],
              passportFlg: [

                { message: '字段不能为空', trigger: 'blur' }
              ],
              socSecurStat: [
                { max: 40, message: '最大长度不超过40个字符', trigger: 'blur' },
                { message: '字段不能为空', trigger: 'blur' }
              ],
              curWorkUnit: [
                { max: 40, message: '最大长度不超过40个字符', trigger: 'blur' }

              ],
              unitConPer: [
                { max: 20, message: '最大长度不超过20个字符', trigger: 'blur' }

              ],
              department: [
                { max: 20, message: '最大长度不超过20个字符', trigger: 'blur' }

              ],
              position: [
                { max: 20, message: '最大长度不超过20个字符', trigger: 'blur' }

              ],
              totalLenSer: [
                { validator: yufp.validator.number, message: '请输入数字' }

              ],
              city: [
                { max: 10, message: '最大长度不超过10个字符', trigger: 'blur' }

              ],
              comSch: [
                { max: 40, message: '最大长度不超过40个字符', trigger: 'blur' }

              ],
              dept: [
                { max: 40, message: '最大长度不超过40个字符', trigger: 'blur' }

              ],
              schDept: [
                { max: 40, message: '最大长度不超过40个字符', trigger: 'blur' }

              ],
              schMajor: [
                { max: 40, message: '最大长度不超过40个字符', trigger: 'blur' }

              ],
              schLength: [
                { max: 10, message: '最大长度不超过10个字符', trigger: 'blur' }

              ],
              remarks: [
                { max: 100, message: '最大长度不超过100个字符', trigger: 'blur' }

              ],
              amoOfIns: [
                { validator: yufp.validator.number, message: '请输入数字' }
              ],
              insurance: [
                { validator: yufp.validator.number, message: '请输入数字' }
              ]


            }
          };
        },
        mounted: function () {
          // 反显页面数据
          this.initPageData();
        },
        // beforeUpdate: function () {
        //   var url = yufp.settings.ssl ? 'https://' : 'http://';
        //   url += yufp.settings.url;
        //   url += backend.fileService;
        //   url += '/api/file/provider/download?fileId=' + this.custPhotoStr;
        //   this.imageUrl = yufp.util.addTokenInfo(url);
        // },
        methods: {

          // handleAvatarSuccess: function (res, file) {
          //   var url = yufp.settings.ssl ? 'https://' : 'http://';
          //   url += yufp.settings.url;
          //   url += backend.fileService;
          //   url += '/api/file/provider/download?fileId=' + res.data.filePath;
          //   this.custPhotoStr = res.data.filePath;
          //   this.imageUrl = yufp.util.addTokenInfo(url);
          // },
          // beforeAvatarUpload: function (file) {
          //   var type = file.type;
          //   var size = file.size / 1024 / 1024;
          //   if (type !== 'image/jpeg' && type !== 'image/png' && type !== 'image/jpg') {
          //     this.$message.error('上传头像图片只能是 JPG 格式!');
          //   }
          //   if (size > 2) {
          //     this.$message.error('上传头像图片大小不能超过 2MB!');
          //   }
          //   return type && size;
          // },
          /**
           * 表单初始化数据
           */
          initPageData: function () {
            var _this = this;
            yufp.service.request({ // 查询业务数据
              method: 'GET',
              async: false,
              url: backend.custpersonService + '/api/pcustbaseview/querylist/' + custId, // custId   /api/pcustbaseview/querylist
              callback: function (code, message, response) {
                if (code == 0) { // code等于0 说明成功
                  //  _this.$refs.baseForm.formdata == response.data.baseInfo[0];
                  if (response.data.baseInfo[0]) {
                    yufp.clone(response.data.baseInfo[0], _this.$refs.baseForm.formdata);// 基本信息
                    yufp.clone(_this.$refs.baseForm.formdata, _this.oldData1);
                  }
                  if (response.data.baseInfo[0]) {
                    yufp.clone(response.data.workInfo[0], _this.$refs.workForm.formdata);// 工作信息
                    yufp.clone(_this.$refs.workForm.formdata, _this.oldData2);
                  }
                  if (response.data.baseInfo[0]) {
                    yufp.clone(response.data.baseInfo[0], _this.$refs.relationForm.formdata);// 与我行关系
                    yufp.clone(_this.$refs.relationForm.formdata, _this.oldData4);
                  }
                  if (response.data.relatInfo[0]) {
                    yufp.clone(response.data.relatInfo[0], _this.$refs.relatForm.formdata);// 涉农个性标识
                  }
                  if (response.data.importInfo[0]) {
                    yufp.clone(response.data.importInfo[0], _this.$refs.importForm.formdata);// 重要标志信息
                    yufp.clone(_this.$refs.importForm.formdata, _this.oldData6);
                  }
                  // 将照片路径传送到前台
                  var url = yufp.settings.ssl ? 'https://' : 'http://';
                  url += yufp.settings.url;
                  url += backend.fileService;
                  url += '/api/file/provider/download?fileId=' + response.data.baseInfo[0].custPhoto;
                  this.imageUrl = yufp.util.addTokenInfo(url);
                }
              }
            });
          },
          /**
           * 保存
           */
          saveFn: function () {
            var _this = this;
            var baseinfomodel = {};// 基本信息
            var workinfomodel = {};// 工作信息
            var relationmodel = {};// 与我行关系
            var relatmodel = {};// 涉农个性标识
            var importmodel = {};// 重要标志
            //    _this.formdata1.custPhoto = this.custPhotoStr;
            yufp.clone(_this.formdata1, baseinfomodel);// 基本信息
            yufp.clone(_this.formdata2, workinfomodel);// 工作信息
            yufp.clone(_this.formdata4, relationmodel);// 与我行关系
            yufp.clone(_this.formdata5, relatmodel);// 涉农个性标识
            yufp.clone(_this.formdata6, importmodel);// 重要标志


            _this.basedata = JSON.stringify(_this.formdata1);// 基本
            _this.workdata = JSON.stringify(_this.formdata2);// 工作
            _this.ralationdata = JSON.stringify(_this.formdata4);// 与我行关系
            _this.farmerdata = JSON.stringify(_this.formdata5);// 涉农
            _this.importdata = JSON.stringify(_this.formdata6);// 重要标识
            var validate = false;
            _this.$refs.baseForm.validate(function (valid) { // 校验基本信息
              validate = valid;
            });
            if (!validate) {
              _this.$message('请检查基本信息是否填写正确！');
              return;
            }
            _this.$refs.workForm.validate(function (valid) { // 校验工作信息
              validate = valid;
            });
            if (!validate) {
              _this.$message('请检查工作信息是否填写正确！');
              return;
            }
            _this.$refs.relationForm.validate(function (valid) { // 校验与我行关系信息
              validate = valid;
            });
            if (!validate) {
              _this.$message('请检查与我行关系是否填写正确！');
              return;
            }
            _this.$refs.relatForm.validate(function (valid) { // 校验涉农个性标识信息
              validate = valid;
            });
            if (!validate) {
              _this.$message('请检查涉农个性标识是否填写正确！');
              return;
            }
            _this.$refs.importForm.validate(function (valid) { // 校验重要标志信息
              validate = valid;
            });

            if (!validate) {
              _this.$message('请检查重要标志是否填写正确！');
              return;
            }

            // 向后台发送保存请求
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/pcustbaseview/updateinfo',
              data: {
                'baseinfomodel': baseinfomodel,
                'workinfomodel': workinfomodel,
                'relationmodel': relationmodel,
                'relatmodel': relatmodel,
                'importmodel': importmodel,
                'basedata': _this.basedata,
                'workdata': _this.workdata,
                'ralationdata': _this.ralationdata,
                'farmerdata': _this.farmerdata,
                'importdata': _this.importdata,
                'custId': custId
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  // 比对基础信息修改字段
                  var baseChange = [];
                  for (var key in _this.formdata1) {
                    if (_this.formdata1[key] != _this.oldData1[key] && _this.formdata1[key]) {
                      var map = {};
                      map.chgEngName = key;
                      map.chgBefValueValue = _this.oldData1[key];
                      map.chgAftValueValue = _this.formdata1[key];
                      map.chgChiName = _this.$refs[key].label;
                      map.chgBefKeyValue = _this.oldData1[key];
                      map.chgAftKeyValue = _this.formdata1[key];
                      map.dataCode = _this.$refs[key].dataCode;
                      baseChange.push(map);
                    }
                  }
                  // 工作信息比较
                  var workChange = [];
                  for (var key in _this.oldData2) {
                    if (_this.formdata2[key] != _this.oldData2[key] && _this.formdata2[key]) {
                      var map = {};
                      map.chgEngName = key;
                      map.chgBefValueValue = _this.oldData2[key];
                      map.chgAftValueValue = _this.formdata2[key];
                      map.chgChiName = _this.$refs[key].label;
                      map.chgBefKeyValue = _this.oldData2[key];
                      map.chgAftKeyValue = _this.formdata2[key];
                      map.dataCode = _this.$refs[key].dataCode;
                      workChange.push(map);
                    }
                  }
                  // 与我行关系比较
                  var relationChange = [];
                  for (var key in _this.oldData4) {
                    if (_this.formdata4[key] != _this.oldData4[key] && _this.formdata4[key]) {
                      var map = {};
                      map.chgEngName = key;
                      map.chgBefValueValue = _this.oldData4[key];
                      map.chgAftValueValue = _this.formdata4[key];
                      map.chgChiName = _this.$refs[key].label;
                      map.chgBefKeyValue = _this.oldData4[key];
                      map.chgAftKeyValue = _this.formdata4[key];
                      map.dataCode = _this.$refs[key].dataCode;
                      relationChange.push(map);
                    }
                  }
                  // 重要标志信息
                  var importChange = [];
                  for (var key in _this.oldData6) {
                    if (_this.formdata6[key] != _this.oldData6[key] && _this.formdata6[key]) {
                      var map = {};
                      map.chgEngName = key;
                      map.chgBefValueValue = _this.oldData6[key];
                      map.chgAftValueValue = _this.formdata6[key];
                      map.chgChiName = _this.$refs[key].label;
                      map.chgBefKeyValue = _this.oldData6[key];
                      map.chgAftKeyValue = _this.formdata6[key];
                      map.dataCode = _this.$refs[key].dataCode;
                      importChange.push(map);
                    }
                  }

                  yufp.service.request({
                    method: 'POST',
                    url: backend.custpersonService + '/api/pcustbaseview/changelist',
                    data: {
                      'baseChange': baseChange,
                      'workChange': workChange,
                      'relationChange': relationChange,
                      'importChange': importChange,
                      'custId': custId
                    },
                    callback: function (code, message, response) {
                      if (code == 0) {
                        yufp.clone(_this.formdata1, _this.oldData1);
                        yufp.clone(_this.formdata2, _this.oldData2);
                        yufp.clone(_this.formdata4, _this.oldData4);
                        yufp.clone(_this.formdata6, _this.oldData6);
                        _this.$message('操作成功');
                      }
                    }
                  });
                }
              }
            });
          },
          /**
           * 修改历史
           */
          selectHis: function () {
            var _this = this;
            this.hisdialogVisible = true;
            _this.$nextTick(function () {
              _this.$refs.hisrefTable.remoteData();
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
          saveResumeFn: function () {
            var _this = this;
            var resumemodel = {};
            yufp.clone(_this.formdata3, resumemodel);
            var validate = false;
            _this.$refs.refForm.validate(function (valid) {
              validate = valid;
            });
            if (!validate) {
              return;
            }
            // 向后台发送保存请求
            yufp.service.request({
              method: 'POST',
              url: backend.custpersonService + '/api/pcustbaseview/updateinfo',
              data: {
                'resumemodel': resumemodel,
                'custId': custId
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  // _this.$refs.refTable.remoteData();
                  _this.$message('操作成功');
                  _this.dialogVisible = false;
                  _this.$refs.refTable.remoteData();
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
            _this.$nextTick(function () {
              _this.$refs.refForm.resetFields();
              _this.formdata3.country = '156';
            });
          },
          /**
           * 修改
           */
          modifyFn: function () {
            var _this = this;
            if (_this.$refs.refTable.selections.length != 1) {
              _this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            if (_this.$refs.refTable.selections[0].lastChgUsr != yufp.session.user.loginCode) {
              _this.$message({ message: '只能维护自己创建的数据', type: 'warning' });
              return;
            }
            _this.switchStatus('EDIT', true);
            _this.$nextTick(function () {
              _this.$refs.refForm.resetFields();
              var obj = _this.$refs.refTable.selections[0];
              yufp.clone(obj, _this.formdata3);
            });
          }

        }
      });
    };
  });