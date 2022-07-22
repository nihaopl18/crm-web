
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: '#fileOpDemo',
      data: function () {
        return {
          height: yufp.custom.viewSize().height,

          // 上传url
          uploadAction: '/zuul' + backend.example + '/api/fileop/uploadfile',
          downloadUrl: backend.example + '/api/fileop/downloadfile?fileId=',
          dataUrl: backend.example + '/api/fileop/',
          // 额外请求参数
          data: {
            busNo: 'xxxxxxx'
          },
          // 是否需要上传按钮
          uploadVisible: true,
          // 是否支持同时选多个文件
          multiple: true,
          downloadVisible: true,
          deleteVisible: true,
          tableColumns: Array,
          // 指定文件地址,删除/下载物理文件时需要该参数
          fileAddress: 'filePath',
          headers: {
            'Authorization': 'Bearer ' + yufp.service.getToken()
          },
          fileList: [],
          columns: [{
            label: '文件名称',
            prop: 'fileName'
          }, {
            label: '文件路径',
            prop: 'filePath'
          }, {
            label: '文件大小 /kb',
            prop: 'fileSize'
          }, {
            label: '上传时间',
            prop: 'uploadTime'
          }]
        };
      },
      computed: {
        action: function () {
          var me = this;
          return yufp.service.getUrl({url: me.uploadAction});
        }
      },
      methods: {
        // 文件上传成功处理逻辑
        onSuccess: function () {
          // 刷新table
          this.queryFn();
        },
        onError: function () {
          this.$message('文件上传失败!', '提示');
        },
        onChange: function (file, fileList) {
          // 添加文件时，把文件名称单独列出来
          this.data.fileName = file.name;
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
            url: backend.example + '/api/fileop/deletefiles/',
            data: {
              fileIds: fileIds
            },
            method: 'get',
            callback: function (code, message, res) {
              if (code == 0) {
                me.$message('删除成功!', '提示');
                me.queryFn();
              } else {
                me.$message('删除失败!' + message, '提示');
              }
            }
          });
        },
        queryFn: function () {
          this.$refs.accessTable.remoteData();
        }
      }
    });
  };

  // 消息处理
  exports.onmessage = function (type, message) {

  };

  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {

  };
});