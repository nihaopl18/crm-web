/**
 * yufp-excel-import
 * @created by kongqg 2018/11/24
 * @description excel文件导入
 * 注：对文件类型会进行校验
 */
(function (vue, name) {
  vue.component(name, {
    template: '<div v-if="showImport" style="display:inline-block">\
                <el-upload style="display:inline-block" :show-file-list="false" ref="refUpload" :headers="hds" :action="action" :on-remove="handleRemove" :on-error="onError" :before-upload="beforeAvatarUpload" :on-success="handleUploadSuccess" :auto-upload="autoImport">\
                  <el-button slot="trigger":icon="icon" size="small" :type="type"><slot>选择文件</slot></el-button>\
                </el-upload>\
                <el-button size="small" :type="type" @click="btnImportFn">导入</el-button>\
                <el-dialog-x :visible.sync="dialogVisible" :show-close="showClose" :title="title" :width="width" :height="height">\
                  <el-progress :status="progressStatus" :percentage="percentage" :stroke-width="10" style="margin: 10px"></el-progress>\
                </el-dialog-x>\
              </div>\
              <div v-else style="display:inline-block">\
                <el-upload style="display:inline-block" :show-file-list="false" ref="refUpload" :headers="hds" :action="action" :on-remove="handleRemove" :on-error="onError" :before-upload="beforeAvatarUpload" :on-success="handleUploadSuccess" :auto-upload="autoImport">\
                  <el-button slot="trigger":icon="icon" size="small" :type="type"><slot>导入</slot></el-button>\
                </el-upload>\
                <el-dialog-x :visible.sync="dialogVisible" :show-close="showClose" :title="title" :width="width" :height="height">\
                  <el-progress :status="progressStatus" :percentage="percentage" :stroke-width="10" style="margin: 10px"></el-progress>\
                </el-dialog-x>\
              </div>',
    props: {
      type: {
        type: String,
        default: 'primary'
      },
      size: String,
      icon: {
        type: String,
        default: 'el-upload'
      },
      showClose: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '导入中...'
      },
      width: {
        type: String,
        default: '400px'
      },
      height: {
        type: String,
        default: '80px'
      },
      // 导出成功后是否自动下载
      autoImport: {
        type: Boolean,
        default: true
      },
      // 是否显示导入按钮，在非自动导入时，默认显示
      showImport: {
        type: Boolean,
        default: false
      },
      // 文件上传请求头是否需要浏览器指纹
      needTerminalFP: {
        type: Boolean,
        default: false
      },
      // 文件上传请求头是否需要Hmac
      needHmac: {
        type: Boolean,
        default: false
      },
      // 文件上传请求头是否需要toke
      needToken: {
        type: Boolean,
        default: true
      },
      // 文件最大值，单位为M，默认为1M
      maxSize: {
        type: Number,
        default: 1
      },
      // 请求头加注信息
      headers: {
        type: Object,
        default: null
      },
      // 开始导入路径
      startUrl: String,
      startBaseParam: Object,
      startRequestType: {
        type: String,
        default: 'POST'
      },
      // 导出进度查询路径
      progressUrl: {
        type: String,
        default: backend.example + '/excel/queryInfo'
      },
      progressBaseParam: Object,
      progressRequestType: {
        type: String,
        default: 'GET'
      }
    },
    data: function () {
      var hds = {};
      if (this._checkEmptyObject(this.headers)) {
    	 yufp.extend(true, hds, this.headers);
      }
      // 初始化请求头
      this.needToken ? hds[yufp.service.tokenId] = 'Bearer ' + yufp.service.getToken() : '';
      return {
        hds: hds,
        // 导出进度弹窗显示
        dialogVisible: false,
        // 进度条默认进度
        percentage: 1,
        // 导出进度查询定时器
        progressTimer: false,
        // 导出任务ID
        taskId: false,
        // 导入查询进度事件间隔
        delay: 1000,
        // 进度条状态
        progressStatus: '',
        // 文件类型,目前只支持excel上传
        fileType: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
      };
    },
    computed: {
      action: function () {
        // 获取全路径
        return yufp.service.getUrl({ url: this.startUrl });
      }
    },
    methods: {
      /**
       * 重置进度状态
       */
      _resetDefaultData: function () {
        this.dialogVisible = false;
        this.percentage = 1;
        if (this.progressTimer) {
          window.clearTimeout(this.progressTimer);
          this.progressTimer = null;
        }
      },
      /**
       * 校验是否空对象
       */
      _checkEmptyObject: function (obj) {
        return !obj || !Object.keys(obj).length;
      },
      /**
       * 获取上传文件最大值显示文本信息
       */
      _getFileSizeStr: function () {
        if (this.maxSize / (1024 * 1024) >= 1) {
          return (this.maxSize / (1024 * 1024)).toFixed(2) + 'TB';
        } else if (this.maxSize / 1024 >= 1) {
          return (this.maxSize / 1024).toFixed(2) + 'GB';
        } else if (this.maxSize >= 1) {
          return this.maxSize + 'MB';
        } else {
          return (this.maxSize * 1024).toFixed(2) + 'KB';
        }
      },
      /**
       * 校验文件大小,超过最大值时给出提示信息
       */
      _checkFileSize: function (size) {
        if (size / (this.maxSize * 1024 * 1024) > 1) {
          return false;
        }
        return true;
      },
      /**
       * 校验文件后缀
       */
      _checkFileType: function (type) {
        var isFile = false;
        for (var i = 0, ft = this.fileType, len = ft.length; i < len; i++) {
          if (type == ft[i]) {
            isFile = true;
            break;
          }
        }
        return isFile;
      },
      /**
       * 导入文件
       */
      _autoImportFn: function () {
        this.percentage = 0;
        this.dialogVisible = true;
        this.$refs.upload.submit();
      },
      handleRemove: function (file, fileList) {
        var _this = this;
        _this.$message('文件移除成功');
        _this.changeImportStatus('error');
        setTimeout(function () {
          _this._resetDefaultData();
          _this.$emit('error-fn');
          _this.$message({ message: '导入失败', type: 'error' });
        }, _this.delay);
      },
      handleUploadSuccess: function (response, file, fileList) { // 上传成功
        this.taskId = response.data;
        if (this.taskId != 'failure') {
          this.showProgressFn();
        }
      },
      onError: function () {
        this.$emit('error-fn');
        this.$message('文件上传失败!', '提示');
      },
      /**
       * 文件上传前进行校验
       */
      beforeAvatarUpload: function (file) {
        var _this = this;
        if (file.type) {
          if (!_this._checkFileType(file.type)) {
            this.$message.error('文件只能是excel格式!');
            return false;
          }
        } else {
          var filename = file.name;
          var suffix = filename.substr(filename.lastIndexOf('.'));
          if (suffix != '.xls' && suffix != '.xlsx') {
            this.$message.error('文件只能是excel格式!');
            return false;
          }
        }
        if (!_this._checkFileSize(file.size)) {
          this.$message({ message: '文件大小不能超过 ' + this._getFileSizeStr(file.size), type: 'warning' });
          return false;
        }
        return true;
      },
      btnImportFn: function () { // 导入操作
        this._autoImportFn();
      },
      /**
       * 轮询查询进度
       * @param {String} taskId 任务ID
       */
      showProgressFn: function () {
        var _this = this;
        _this.dialogVisible = true;
        var pbpData = yufp.clone({}, _this.progressBaseParam);
        pbpData.taskId = _this.taskId;
        yufp.service.request({
          url: _this.progressUrl,
          method: _this.progressRequestType,
          data: pbpData,
          callback: function (code, message, res) {
            if (code != 0) {
              return;
            }
            var data = res && res.data ? res.data : {};
            if (data.percent == undefined || data.percent == '-1') {
              _this._resetDefaultData();
              _this.$message.error('操作失败！');
              return;
            }
            _this.percentage = data.percent;
            if (_this.percentage < 100) {
              _this.dialogVisible = true;
              _this.progressTimer = setTimeout(_this.showProgressFn, _this.delay);
            } else {
              // 刷新数据表格
              // 将事件导出
              _this.changeImportStatus('success');
              setTimeout(function () {
                _this._resetDefaultData();
                _this.$emit('success-fn');
                _this.$message({ message: '导入成功', type: 'success' });
              }, _this.delay);
            };
          }
        });
      },
      changeImportStatus: function (status) {
        var _this = this;
        if (status == 'success') {
          _this.title = '导入成功';
          _this.progressStatus = 'success';
        }
        if (status == 'error') {
          _this.title = '导入失败';
          _this.progressStatus = 'error';
        }
      }
    },
    created: function () {
      // 校验是否存在SparkMD5对象类 和 浏览器是否支持 FileReader对象
      if (typeof window.SparkMD5 == 'undefined') {
        this.needHmac = false;
        yufp.logger.error('插件SparkMD5缺失，请添加引用!');
      }
      if (typeof FileReader == 'undefined') {
        this.needHmac = false;
        yufp.logger.error('浏览器不支持FileReader');
      }
      // 改变默认值
      this.autoImport = !this.showImport;
    }
  });
}(Vue, 'yu-excel-import'));