/**
 * 渠道选择器yufp-act-file-upload
 * @authors zly6
 * @date    2019-3-5
 */
(function (vue, $, name) {
  // 注册附件管理表格
  vue.component(name, {
    template: '<div>\
           <el-upload style="display: inline-block;" v-if="uploadVisible" :show-file-list = true :multiple="multiple"\
               :file-list="fileList" :succcess-fn="successFn" :headers="headers" :action="action" :data="data"\
               :on-success="onSuccess" :on-error="onError" :on-change="onChange" :before-upload="beforeUpload">\
               <el-button>上传</el-button>\
           </el-upload>\
           <el-button v-if="downloadVisible" @click="downloadFile">下载</el-button>\
           <el-button v-if="deleteVisible" @click="deleteFile">删除</el-button>\
           <el-table-x ref="accessTable" :checkbox="true" :data-url="dataUrl" :base-params="dataParams" :table-columns="columns" :default-sort="defaultSort"></el-table-x>\
       </div>',
    props: {
      // 处理上传成功之后的业务逻辑
      successFn: Function,
      // 是否需要上传按钮
      uploadVisible: {
        type: Boolean,
        default: true
      },
      beforeUpload: Function,
      // 是否支持同时选多个文件
      multiple: {
        type: Boolean,
        default: true
      },
      dataParams: Object,
      // 上传url
      uploadAction: {
        type: String,
        // default: '/zuul' + backend.fileService + "/api/file/provider/uploadfile"
        default: backend.fileService + '/api/file/provider/uploadfile'
      },
      // 额外请求参数
      data: {
        type: Object,
        default: function () {
          return {
            busNo: 'simplefile'
          };
        }
      },
      downloadVisible: {
        type: Boolean,
        default: false
      },
      deleteVisible: {
        type: Boolean,
        default: false
      },
      dataUrl: {
        type: String,
        default: backend.adminService + '/api/mkt/actifilelistquery'
      },
      tableColumns: Array,
      // 指定文件地址,删除/下载物理文件时需要该参数
      fileAddress: {
        type: String,
        default: 'filePath'
      }
    },
    data: function () {
      var me = this;
      var _data = me.genDefaultData();
      if (me.tableColumns) {
        yufp.extend(true, _data.columns, me.tableColumns);
      }
      return _data;
    },
    methods: {
      genDefaultData: function () {
        return {
          headers: {
            'Authorization': 'Bearer ' + yufp.service.getToken()
          },
          downloadUrl: backend.fileService + '/api/file/provider/download?fileId=',
          fileList: [],
          columns: [{
            label: '文件名称',
            prop: 'fileName'
          }, {
            label: '文件编号',
            prop: 'fileId'
          }, {
            label: '文件大小 /kb',
            prop: 'fileSize'
          }, {
            label: '上传时间',
            prop: 'uploadTime'
          }, {
            label: '文件备注',
            prop: 'fileRemark'
          }],
          defaultSort: {
            prop: 'uploadTime',
            order: 'descending'
          }
        };
      },
      // 文件上传成功处理逻辑
      onSuccess: function (response, file, fileList) {
        // this.successFn(response, this.queryFn);
        // 刷新table
        this.$emit('success-fn', response);
        this.queryFn();
      },
      onError: function () {
        this.$message('文件上传失败!', '提示');
      },
      onChange: function (file, fileList) {
        // 添加文件时，把文件名称单独列出来
        this.data.fileName = encodeURI(file.name);
      },
      // 文件下载
      downloadFile: function () {
        var _data = this.$refs.accessTable.selections;
        if (_data == null || _data.length == 0) {
          this.$message('请至少选择一条数据', '提示');
          return;
        }
        for (var i in _data) {
          yufp.util.download(this.downloadUrl + _data[i][this.fileAddress]);
        }
      },
      // 文件删除
      deleteFile: function () {
        var me = this;
        // 删除文件
        var _data = this.$refs.accessTable.selections;
        if (_data == null || _data.length == 0) {
          this.$message('请至少选择一条数据', '提示');
          return;
        }

        var ids = '', fileIds = '';
        for (var i = 0; i < _data.length; i++) {
          if (i == 0) {
            ids += _data[i].fileId;
            fileIds += _data[i][this.fileAddress];
          } else {
            ids += ',' + _data[i].fileId;
            fileIds += ',' + _data[i][this.fileAddress];
          }
        }
        yufp.service.request({
          url: backend.fileService + '/api/file/provider/deleteFile',
          method: 'get',
          data: {
            fileId: fileIds
          },
          callback: function (code, message, res) {
            if (code == 0) {
              me.$message('删除成功!', '提示');
              me.queryFn();
            }
          }
        });
      },
      queryFn: function () {
        var me = this;
        var params = me.dataParams;
        this.$refs.accessTable.remoteData(params);
      }
    },
    computed: {
      action: function () {
        var me = this;
        return yufp.service.getUrl({ url: me.uploadAction });
      }
    }
  });
}(Vue, yufp.$, 'yufp-act-file-upload'));