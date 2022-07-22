/**
 * @Created by lixt1 lixt1@yusys.com.cn on 2020-4-24 09:47:17.
 * @updated by lixt1 2021-01-18  增加单元格类型-岗位/所属机构/考核对象编号
 * @description 考核方案-excel组件
 */
(function (vue, a, name) {
  yufp.lookup.reg('EXCEL_CELL_TYPE,EXCEL_RESULT_TYPE,OBJ,YE_TYPE,INDEX_APPLY_TYPE');
  // 注册用户组件
  vue.component(name, {
    template: '\
      <div id="excelCenter">\
        <div id="excelDesignLayout" style="width: 99.8%;">\
          <div id="excelLeftDiv" v-if="excelLeftDivIf && !readOnly" position="left">\
            <div id="excelObjCellLayout">\
              <div position="center" title="考核对象">\
                <div class="objTreeContainer" id="excelObjTreeContainer"\
                  style="width: 100%; height: 95%; overflow: scroll; clear: both; background-color: #FFFFFF;">\
                  <ul id="excelObjTree" style="font-size: 12; background-color: #FFFFFF; width: 92%" class="ztree"></ul>\
                </div>\
              </div>\
            </div>\
          </div>\
          <div id="excelCenterDiv" position="center">\
            <div id="excelSpread" style="width: 99.8%; border-bottom: 1px solid #D0D0D0;">\
            </div>\
          </div>\
          <div id="excelRightDiv" position="right" v-if="!readOnly" v-show="schemeExcelShow" title="单元格信息">\
            <yu-xform ref="excelCellInfoForm" label-width="100px" style="margin: 10px 10px;" label-position="left" v-model="excelCellInfoFormData">\
              <yu-xform-group column="1">\
                <yu-xform-item label="当前单元格" ctype="input" name="cellNo" :disabled="true"></yu-xform-item>\
                <yu-xform-item label="单元格类型" ctype="select" name="cellType" data-code="EXCEL_CELL_TYPE"\
                  :disabled="excelCellInfoFormData.cellType==\'09\' ? true : excelCellInfoFormData.isExtend ? true : false"></yu-xform-item>\
                <yu-xform-item label="基础指标" ctype="yufp-schemeexcelindex-selector" name="indexId" @select-fn="baseIndexSelectFn"\
                  :hidden="excelCellInfoFormData.cellType != \'03\'" placeholder="请选择基础指标" :params="baseIndexSelParams"\
                  :disabled="excelCellInfoFormData.isExtend ? true : false"></yu-xform-item>\
                <yu-xform-item label="派生指标" ctype="yufp-schemeexcelindex-selector" name="evlindexId" :params="evlIndexSelParams"\
                  @select-fn="evlIndexSelectFn"\
                  :hidden="excelCellInfoFormData.cellType != \'05\'"></yu-xform-item>\
                <yu-xform-item label="元素类型" ctype="select" name="resultType" data-code="EXCEL_RESULT_TYPE"\
                  :hidden="excelCellInfoFormData.cellType != \'13\'"></yu-xform-item>\
                <yu-xform-item label="关联指标" ctype="yufp-schemeexcelindex-selector" name="relIndexId" @select-fn="relIndexSelectFn"\
                  :hidden="excelCellInfoFormData.cellType != \'13\'"></yu-xform-item>\
                <yu-xform-item label="评价对象" ctype="select" name="evlObjType" data-code="OBJ"\
                  :hidden="excelCellInfoFormData.cellType != \'03\' && excelCellInfoFormData.cellType != \'13\'\
                            && excelCellInfoFormData.cellType != \'05\'"\
                  :disabled="true"></yu-xform-item>\
                <yu-xform-item label="余额类型" ctype="select" name="balType" data-code="YE_TYPE"\
                  :hidden="excelCellInfoFormData.cellType != \'03\' && excelCellInfoFormData.cellType != \'13\'\
                            && excelCellInfoFormData.cellType != \'05\'"\
                  :disabled="true"></yu-xform-item>\
                <yu-xform-item label="应用类型" ctype="select" name="applyType" data-code="INDEX_APPLY_TYPE"\
                  :hidden="excelCellInfoFormData.cellType != \'03\' && excelCellInfoFormData.cellType != \'13\'\
                            && excelCellInfoFormData.cellType != \'05\'"\
                  :disabled="true"></yu-xform-item>\
                <yu-xform-item label="公式内容" ctype="input" name="excelFormula"\
                  :hidden="excelCellInfoFormData.cellType != \'04\' && excelCellInfoFormData.cellType != \'13\'"></yu-xform-item>\
                <yu-xform-item label="机构参数" ctype="yufp-orgparam-selector" name="orgParamId" @select-fn="orgParamSelectFn"\
                  :hidden="excelCellInfoFormData.cellType != \'11\'"\
                  :disabled="excelCellInfoFormData.isExtend ? true : false"></yu-xform-item>\
                <yu-xform-item label="岗位参数" ctype="yufp-postparam-selector" name="postParamId" @select-fn="postParamSelectFn"\
                  :hidden="excelCellInfoFormData.cellType != \'12\'"\
                  :disabled="excelCellInfoFormData.isExtend ? true : false"></yu-xform-item>\
                <yu-xform-item label="默认值" ctype="input" name="defaultValue"\
                  :hidden="excelCellInfoFormData.cellType==\'09\' || excelCellInfoFormData.cellType==\'14\' || excelCellInfoFormData.cellType==\'15\' || excelCellInfoFormData.cellType==\'16\'"></yu-xform-item>\
                <yu-xform-item label="考核对象编号" ctype="input" name="evlObjId" :hidden="excelCellInfoFormData.cellType!= \'16\'" :disabled="true"></yu-xform-item>\
                <yu-xform-item label="考核对象ID" ctype="input" name="evlObjId" :hidden="excelCellInfoFormData.cellType!=\'09\'"\
                  :disabled="true"></yu-xform-item>\
                <yu-xform-item label="考核对象" ctype="input" name="evlObjName" :hidden="excelCellInfoFormData.cellType!=\'09\'"\
                  :disabled="true"></yu-xform-item>\
              </yu-xform-group>\
            </yu-xform>\
            <!-- 如果是主动选择的考核对象类型，需要提示是左侧拖拽的考核对象，不允许编辑，并在此处增加重置按钮 -->\
            <center v-if="excelCellInfoFormData.cellType == \'09\' && !excelCellInfoFormData.evlObjName">\
              <div class="yu-grpButton">\
                <yu-button icon="yx-loop2" type="primary" @click="resetFn">重置</yu-button>\
              </div>\
              <div slot="tip" class="el-upload__tip" style="color:red;">考核对象需要从左侧拖拽</div>\
            </center>\
          </div>\
          <yu-xdialog title="样式文件上传" :visible.sync="uploadExcelStyleDialogVisible" width="40%">\
            <center>\
              <yu-upload\
                class="upload-demo"\
                :action="action"\
                :data="uploadData"\
                :headers="uploadHeaders"\
                :before-upload="beforeFileUpload"\
                :on-success="uploadSuccessFn"\
                :on-error="uploadErrorFn"\
                :on-timeout="uploadTimeoutFn"\
                :timeout="120000"\
                :show-file-list="false"\
                :auto-upload="true"\
                >\
                <yu-button size="small" type="primary">点击上传</yu-button>\
                <div slot="tip" class="el-upload__tip">请导入考核方案模板文件</div>\
              </yu-upload>\
            </center>\
          </yu-xdialog>\
          <yu-xdialog :title="colWidthRowHeightTitle" :visible.sync="colWidthRowHeightDialogVisible" width="30%">\
            <yu-xform ref="colWidthRowHeightForm" label-width="80px" v-model="colWidthRowHeightFormData">\
              <yu-xform-group column="1">\
                <yu-xform-item :label="colWidthRowHeightLabel" ctype="num" name="data"></yu-xform-item>\
              </yu-xform-group>\
              <div class="yu-grpButton">\
                <yu-button type="primary" @click="colWidthRowHeightSaveFn">设置</yu-button>\
                <yu-button type="primary" @click="colWidthRowHeightCancelFn">取消</yu-button>\
              </div>\
            </yu-xform>\
          </yu-xdialog>\
        </div>\
      </div>\
    ',
    props: {
      schemeId: { // 考核方案ID
        type: String,
        required: true
      },
      templateType: { // 外部传参  02单元格类; 04指标列表（纵）; 05指标列表（横）
        type: String,
        required: true
      },
      evlObjType: { // 外部传参  01员工; 02机构(人); 03团队; 04机构(业务，账面)
        type: String,
        required: true
      },
      params: Object
    },
    data: function () {
      return this.createData();
    },
    beforeCreate: function () {
    },
    mounted: function () {
      if ($.browser.msie && parseInt($.browser.version, 10) < 9) {
        $('#ssbridge_id').attr('src', 'libs/excel/js/wijmo/spreadjs/scripts/ssbridge_20151.js');
        if (typeof window.JSON == 'undefined' && typeof window.JSON2 == 'object') {
          window.JSON = {};
          jQuery.extend(window.JSON, window.JSON2);
        }
      }
      var me = this;
      // 根据考核方案id查询设计器信息，新增的考核方案设计器信息为空
      if (me.excelModel == '01' && me.schemeId) {
        yufp.service.request({
          url: me.excelGetDesignDataUrl + me.schemeId,
          method: 'GET',
          callback: function (code, message, response) {
            if (code == 0) {
              if (response.code == 0) {
                if (response.data) {
                  me.templateId = response.data.tmpInfo.templateId;
                  me.designInfo = response.data;
                  // 根据考核对象数据集，设置-objIndex、objCount
                  if (me.designInfo && me.designInfo.evalobjArray && me.designInfo.evalobjArray.length > 0) {
                    me.Design.objIndex = me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V ? me.designInfo.evalobjArray[0].rowId
                      : me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H ? me.designInfo.evalobjArray[0].colId : null;
                    me.Design.objCount = me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V || me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H
                      ? me.designInfo.evalobjArray.length : 0;
                  }
                }
                // 横/纵向考核方案需要查询并展示考核对象面板，只读时不查询
                if (!me.readOnly && (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V || me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H)) {
                  me.excelLeftDivIf = true; // 展示考核对象面板
                  yufp.service.request({
                    url: me.excelGetEvlObjUrl + me.schemeId,
                    method: 'GET',
                    callback: function (code, message, response) {
                      if (code == 0) {
                        if (response.code == 0) {
                          me.evlObjInfo = response.data;
                          me.initPage(); // 初始化页面
                        }
                      }
                    }
                  });
                } else {
                  me.initPage(); // 初始化页面
                }
              } else {
                me.$message({ message: '获取考核方案模板信息异常', type: 'warning' });
                return;
              }
            }
          }
        });
      } else if (me.excelModel == '02') { // 预览
        yufp.service.request({
          url: me.excelGetPreviewInfoUrl,
          method: 'GET',
          data: {
            schemeId: me.schemeId,
            etlDate: me.etlDate,
            evlObjId: me.evlObjId
          },
          callback: function (code, message, response) {
            if (code == 0) {
              if (response.code == 0) {
                if (response.data) {
                  me.templateId = response.data.tmpInfo.templateId;
                  me.designInfo = response.data;
                }
                me.initPage(); // 初始化页面
              } else {
                me.$message({ message: '获取考核方案预览信息异常', type: 'warning' });
                return;
              }
            }
          }
        });
      } else if (me.excelModel == '03') { // 运行结果查询/发布
        yufp.service.request({
          url: me.excelGetRunResultInfoUrl,
          method: 'GET',
          data: {
            schemeId: me.schemeId,
            etlDate: me.etlDate,
            evlObjId: me.evlObjId
          },
          callback: function (code, message, response) {
            if (code == 0) {
              if (response.code == 0) {
                if (response.data) {
                  me.templateId = response.data.tmpInfo.templateId;
                  me.designInfo = response.data;
                }
                me.initPage(); // 初始化页面
              } else {
                me.$message({ message: '获取考核方案运行结果信息异常', type: 'warning' });
                return;
              }
            }
          }
        });
      } else if (me.excelModel == '04') { // 我的方案运行结果查询
        yufp.service.request({
          url: me.excelGetMySchemeResultInfoUrl,
          method: 'GET',
          data: {
            schemeId: me.schemeId,
            etlDate: me.etlDate
          },
          callback: function (code, message, response) {
            if (code == 0) {
              if (response.code == 0) {
                if (response.data) {
                  me.templateId = response.data.tmpInfo.templateId;
                  me.designInfo = response.data;
                }
                me.initPage(); // 初始化页面
              } else {
                me.$message({ message: '获取我的考核方案运行结果信息异常', type: 'warning' });
                return;
              }
            }
          }
        });
      } else if (me.excelModel == '05') { // 机构员工方案运行结果查询
        yufp.service.request({
          url: me.excelGetOrgStaffSchemeResultInfoUrl,
          method: 'GET',
          data: {
            schemeId: me.schemeId,
            etlDate: me.etlDate,
            evlObjId: me.evlObjId
          },
          callback: function (code, message, response) {
            if (code == 0) {
              if (response.code == 0) {
                if (response.data) {
                  me.templateId = response.data.tmpInfo.templateId;
                  me.designInfo = response.data;
                }
                me.initPage(); // 初始化页面
              } else {
                me.$message({ message: '获取机构员工考核方案运行结果信息异常', type: 'warning' });
                return;
              }
            }
          }
        });
      } else {
        me.initPage(); // 初始化页面
      }
    },
    // 组件销毁前，重置Design对象信息
    beforeDestroy: function () {
      this.Design.rptIdxs = [];
      this.Design.objIndex = null;
      this.Design.objCount = 0;
    },
    methods: {
      createData: function () {
        var me = this;
        var temp = me.getDefaultData();
        yufp.extend(true, temp, me.params);
        return temp;
      },
      getDefaultData: function () {
        return {
          schemeExcelShow: false, // 默认不展示excel组件,initPage完成后，展示excel组件
          excelModel: '01', // excel组件模式: 01设计  02预览  03运行结果查询/发布  04我的方案运行结果查询  05机构员工方案运行结果查询
          etlDate: '', // 数据日期，预览/结果查询使用
          evlObjId: '', // 考核对象编号，单元格类型方案-预览/结果查询使用
          baseIndexSelParams: { type: '1' },
          evlIndexSelParams: { type: '2' },
          Design: yufp.require.use('./libs/excel/js/report/cfg/views/rptdesign.js').Design,
          Constants: yufp.require.use('./libs/excel/js/report/cfg/utils/constants.js').Constants,
          Utils: yufp.require.use('./libs/excel/js/report/cfg/utils/designutil.js').Utils,
          SelectionModule: yufp.require.use('./libs/excel/js/report/cfg/modules/SelectionModule.js').SelectionModule,
          Detail: yufp.require.use('./libs/excel/js/report/cfg/views/celldetail.js').Detail,
          Toolbar: yufp.require.use('./libs/excel/js/report/cfg/views/toolbar-awesome.js').ToolbarAwesome,
          ParamComp: yufp.require.use('./libs/excel/js/report/cfg/modules/ParamComp.js').ParamComp,
          RptIdxInfo: yufp.require.use('./libs/excel/js/report/cfg/modules/RptIdxInfo.js').RptIdxInfo,
          RowCol: yufp.require.use('./libs/excel/js/report/cfg/modules/RowCol.js').RowCol,
          Context: yufp.require.use('./libs/excel/js/report/cfg/views/contextmenu.js').Context,
          templateId: '', // excel模板ID
          designInfo: {}, // 设计器信息，根据考核方案id获取，加载页面时查询
          evlObjInfo: [], // 考核对象数据集
          excelLeftDivIf: false, // 考核对象面板v-if属性
          readOnly: false, // 是否只读（若是只读模式，默认不会有toolbar和contextMenu，单元格不可编辑且只展示设计器面板）
          cellDetail: true, // 是否展示单元格明细
          showRowName: true, // 是否展示行名
          showColumnName: true, // 是否展示列名
          spread: null,
          selectionToolBar: { // 已选中的报表指标单元格(工具栏用)
            font: ko.observable('宋体'),
            fontSize: ko.observable(10),
            bold: ko.observable('normal'),
            italic: ko.observable('normal'),
            textDecoration: ko.observable('normal')
          },
          excelGetPreviewInfoUrl: '/api/commonexcel/getpreviewinfo', // excel查询方案预览数据url
          excelGetRunResultInfoUrl: '/api/commonexcel/getrunresultinfo', // excel查询方案运行结果数据url
          excelGetDesignDataUrl: '/api/commonexcel/getdesigninfobyschemeid/', // excel获取设计器数据url
          excelGetEvlObjUrl: '/api/commonexcel/getevlobjbyschemeid/', // excel获取考核对象数据url
          excelSaveUrl: '/api/commonexcel/savetemplateanddesigndata', // execl保存url
          excelGetMySchemeResultInfoUrl: '/api/commonexcel/getmyschemeresultinfo', // excel查询我的方案运行结果数据url
          excelGetOrgStaffSchemeResultInfoUrl: '/api/commonexcel/getorgstaffschemeresultinfo', // excel查询机构辖内员工方案运行结果数据url
          uploadExcelStyleDialogVisible: false, // 上传样式文件dialog-可见属性
          action: yufp.service.getUrl({url: '/api/commonexcel/uploadexcelstyle'}),
          uploadData: {},
          uploadHeaders: {
            'Authorization': 'Bearer ' + yufp.service.getToken()
          },
          notAllowedIcon: './libs/excel/images/classics/icons/cancel.gif',
          allowedIcon: './libs/excel/images/classics/icons/accept.png',
          // 正在拖拽的节点对象
          draggingNode: {},
          draggingTreeId: {},
          moduleTreeObj: {},
          excelCellInfoFormData: {}, // 单元格信息
          colWidthRowHeightTitle: '',
          colWidthRowHeightDialogVisible: false,
          colWidthRowHeightFormData: {},
          colWidthRowHeightLabel: '高度'
        };
      },
      clearObj: function (obj) {
        for (var key in obj) {
          obj[key] = null;
        }
        return obj;
      },
      genUUID: function (len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
        if (len) {
          for (i = 0; i < len; i++) {
            uuid[i] = chars[0 | Math.random() * radix];
          }
        } else {
          var r;
          uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
          uuid[14] = '4';
          for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
              r = 0 | Math.random() * 16;
              uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
            }
          }
        }
        return uuid.join('');
      },
      // 初始化页面
      initPage: function () {
        var me = this;
        me.schemeExcelShow = true;
        var $content = $('#excelCenter').parent(); // 获取父元素
        var height = $content.height();
        $('#excelCenter').height((height > 552 ? height : 552) - 2);
        me.RptIdxInfo.initObjs(me.Utils, me.Constants);
        me.Design.initObjs(me.Constants, me.Utils, me.SelectionModule, me.Detail, me.Toolbar,
          me.ParamComp, me.RptIdxInfo, me.RowCol, me.Context);
        me.Utils.initObjs(me.Toolbar);
        me.Toolbar.initObjs(me.Design, me.Utils, me.cssImport);
        me.ParamComp.initObjs(me.Constants);
        me.RowCol.initObjs(me.Constants);
        me.Context.initObjs(me.Design, me.RptIdxInfo, me.RowCol, me.Utils, me.Constants);
        // 布局
        me.initLayout();
        // 初始化考核对象树
        if (me.excelLeftDivIf && !me.readOnly) {
          me.initObjTree();
        }
        // 初始化设计器
        me.initDesign();

        // 针对excelModel=03/04/05模式，designInfo.hideInfo非空，需要设置隐藏的行/列
        if ((me.excelModel == '03' || me.excelModel == '04' || me.excelModel == '05') && me.designInfo.hideInfo) {
          me.hideRowCols(me.designInfo.hideInfo);
        }
      },
      // 设置隐藏行/列
      hideRowCols: function (hideInfo) {
        var me = this;
        if (hideInfo) {
          var currSheet = me.Design.spread.getActiveSheet();
          if (hideInfo.cols) { // 隐藏列
            var colsArr = hideInfo.cols.split('$');
            for (var i in colsArr) {
              if (colsArr[i] != '') {
                currSheet.getColumn(parseInt(colsArr[i])).visible(false);
              }
            }
          }
          if (hideInfo.rows) { // 隐藏行
            var rowsArr = hideInfo.rows.split('$');
            for (var i in rowsArr) {
              if (rowsArr[i] != '') {
                currSheet.getRow(parseInt(rowsArr[i]) - 1).visible(false);
              }
            }
          }
        }
      },
      // 显示-样式文件上传dialog
      cssImport: function () {
        this.uploadExcelStyleDialogVisible = true;
      },
      // 上传表样回调函数
      cssLoadHandler: function (jsonObj) {
        var me = this;
        if (jsonObj != null && typeof jsonObj != 'undefined') {
          var objResult = JSON.parse(jsonObj);
          me.RptIdxInfo.initIdxKO(me.selectionIdx);
          me.Design.fromJSON(objResult.json);

          // 样式文件导入成功后，重置指标/考核对象信息
          me.Design.rptIdxs = [];
          me.Design.objIndex = null;
          me.Design.objCount = 0;
          if (objResult.formula) {
            for (var posi in objResult.formula) {
              var formulaTmp = objResult.formula[posi];
              if (formulaTmp == null || formulaTmp == '') {
                continue;
              }
              var posis = posi.split(',');
              if (posis.length == 2) {
                var rowTmp = posis[0];
                var colTmp = posis[1];
                if (rowTmp == null || rowTmp == '' ||
                  colTmp == null || colTmp == '') {
                  continue;
                }
                var cellTmp = me.Design.spread.getActiveSheet().getCell(rowTmp, colTmp);
                var seqTmp = me.genUUID(32, 36);
                var currLabel = me.Utils.initAreaPosiLabel(rowTmp, colTmp);
                cellTmp.tag(seqTmp);
                var rptIdxTmp = me.RptIdxInfo.newInstance(me.Constants.CELL_TYPE_FORMULA);
                rptIdxTmp.seq = seqTmp;
                // rptIdxTmp.cellNm = currLabel;
                rptIdxTmp.realIndexNo = me.genUUID(32, 36);
                rptIdxTmp.excelFormula = formulaTmp;
                me.Design.rptIdxs[seqTmp] = rptIdxTmp;
              }
            }
          }
        }
      },
      // 文件导入前，对文件大小、格式做预校验
      beforeFileUpload: function (file) {
        // todo 此处考虑是否需要限制上传文件大小
        // var isLt10M = file.size / 1024 / 1024 < 10;
        // if (!isLt10M) {
        //   this.$message.error('上传文件大小不能超过 10MB!');
        // }
        var index = file.name.lastIndexOf('.');
        var ext = file.name.substr(index + 1);
        var fileType = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        var count = 0;
        var fileCheck = true;
        for (var i in fileType) {
          if (file.type == fileType[i] || ext == 'rar') {
            count++;
          }
        }
        if (count == 0) {
          this.$message.error('上传文件格式不正确，请上传xls/xlsx文件');
        }
        // return fileCheck && isLt10M;
        return fileCheck;
      },
      // 文件导入成功
      uploadSuccessFn: function (response) {
        if (response.code == 0) {
          this.cssLoadHandler(response.data);
          this.uploadExcelStyleDialogVisible = false;
        } else {
          this.$message({ message: response.message, type: 'error' });
        }
      },
      // 文件导入失败
      uploadErrorFn: function (rep) {
      },
      // 文件导入超时
      uploadTimeoutFn: function (event, file) {
        this.$message({
          message: '文件上传超时',
          type: 'warning'
        });
      },
      // 初始化布局
      initLayout: function () {
        var me = this;
        // 初始化layout title
        if (me.excelLeftDivIf && !me.readOnly) {
          var leftTitle = '<div width="8%" ' +
            ' style="float: left; position: relative; height: 20p; margin-top: 5px"> ' +
            ' <img src="./libs/excel/images/classics/icons/application_side_tree.png" /> ' +
            '</div> ' +
            '<div width="90%"> ' +
            ' <span ' +
            '  style="font-size: 12; float: left; position: relative; line-height: 25px; padding-left: 2px"> ' +
            '  <span style="font-size: 12">工具栏</span> ' +
            ' </span> ' +
            '</div> ';
          $('#excelLeftDiv').attr('title', leftTitle);
        }
        var centerTitleName = me.excelModel == '04' || me.excelModel == '05' ? '报表信息' : '布局信息';
        var centerTitle = '<div width="8%" ' +
          ' style="float: left; position: relative; height: 20p; margin-top: 5px"> ' +
          '  <img src="./libs/excel/images/classics/icons/excel.gif" /> ' +
          '</div> ' +
          '<div width="90%"> ' +
          ' <span ' +
          '  style="font-size: 12; float: left; position: relative; line-height: 25px; padding-left: 2px"> ' +
          '  <span style="font-size: 12">' + centerTitleName + '</span> ' +
          ' </span> ' +
          '</div> ';
        $('#excelCenterDiv').attr('title', centerTitle);
        // 初始化ligerlayout
        var centerWidth = $('#excelCenter').width() < 1200 ? 1200 : $('#excelCenter').width();

        $('#excelDesignLayout').ligerLayout({
          height: $('#excelCenter').height(),
          // leftWidth: (centerWidth - 220) * 0.21, // 考核对象面板宽度
          // centerWidth: (centerWidth - 220) * 0.79, // 布局信息面板宽度
          // rightWidth: 220, // 单元格信息面板宽度
          leftWidth: centerWidth * (me.excelLeftDivIf && !me.readOnly ? 0.16 : 0), // 考核对象面板宽度
          centerWidth: centerWidth * (me.excelLeftDivIf && !me.readOnly ? 0.63 : 0.79), // 布局信息面板宽度
          rightWidth: centerWidth * (me.readOnly ? 0 : 0.21), // 单元格信息面板宽度
          allowLeftResize: false,
          allowRightResize: false,
          onEndResize: function () {
          }
        });
        if (me.excelLeftDivIf && !me.readOnly) {
          var idxLayoutHeight = ($('#excelCenter').height() - 25 - 2) * 0.60;
          var dimLayoutHeight = ($('#excelCenter').height() - 25 - 2) - idxLayoutHeight - 2;
          // 初始化考核对象列表工具栏layout
          $('#excelObjCellLayout').ligerLayout({
            height: $('#excelCenter').height(),
            centerWidth: (centerWidth - 220) * 0.21,
            centerBottomWidth: (centerWidth - 220) * 0.21,
            centerHeight: dimLayoutHeight,
            centerBottomHeight: idxLayoutHeight,
            onEndResize: function () {
            }
          });
        }
      },
      // 初始化考核对象树
      initObjTree: function () {
        var target = $('#excelObjTree');
        var setting = {
          data: {
            keep: {
              parent: true
            },
            key: {
              name: 'name'
            },
            simpleData: {
              enable: true,
              idKey: 'id',
              pIdKey: 'pId',
              rootPId: '99'
            }
          },
          view: {
            selectedMulti: false
          },
          callback: {
            onNodeCreated: this.objTreeOnNodeCreated,
            beforeDrag: null
          }
        };
        var objTreeData = [{
          id: '03',
          pId: '99',
          name: '考核对象组',
          type: '2'
        }];
        objTreeData = objTreeData.concat(this.evlObjInfo);
        $.fn.zTree.init(target, setting, objTreeData);
      },
      // 考核对象树节点-创建事件
      objTreeOnNodeCreated: function (event, treeId, treeNode) {
        if (treeNode.type === '2') { // 只能拖拽考核对象类型，即组
          this.setDragDrop('#' + treeNode.tId + '_span', '#excelSpread');
        }
      },
      // 添加考核对象拖拽控制
      setDragDrop: function (dom, receiveDom) {
        var me = this;
        if (typeof dom == 'undefined' || dom == null) {
          return;
        }
        $(dom).ligerDrag({
          proxy: function (target, g, e) {
            // var treeAId = target.current.target.attr('id');
            var defaultName = '';
            if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V) {
              defaultName = '列 ';
            } else if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H) {
              defaultName = '行 ';
            }
            var proxyLabel = me.notAllowedIcon;
            var targetTitle = $(dom).html() == null ? defaultName : defaultName + ':' + $(dom).html();
            var proxyHtml = '<div style="width：150;position: absolute;padding-left: 10px;color: #183152;font-weight: bold;height: 20px;line-height: 19px;overflow: hidden;background: #E5EFFE ;border: 1px solid #DDDDDD;border-top:none; z-index:9999;">';
            proxyHtml = proxyHtml + '<span class="dragimage_span" style="position:absolute;width:16px;height:16px;left:5px;top:2px;background:url(\'' + proxyLabel + '\')" ></span>';
            proxyHtml = proxyHtml + '<span style="padding-left: 14px;">' + targetTitle + '</span>';
            proxyHtml = proxyHtml + '</div>';
            var div = $(proxyHtml);
            div.appendTo('#excelCenter');
            return div;
          },
          revert: false,
          receive: receiveDom || '#excelSpread',
          onStartDrag: function (current, e) {
            // 获取拖拽树节点信息
            var treeAId = current.target.attr('id');
            if (treeAId) {
              var strsTmp = treeAId.split('_');
              var treeId = treeAId;
              if (strsTmp.length > 1) {
                var newStrsTmp = [];
                for (var i = 0; i < strsTmp.length - 1; i++) {
                  newStrsTmp.push(strsTmp[i]);
                  if (i == 0) {
                    me.draggingTreeId = strsTmp[i];
                  }
                }
                treeId = newStrsTmp.join('_');
              }
              var treeObj = me.moduleTreeObj;
              // 纵/横向考核方案客户拖拽考核对象
              if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V || me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H) {
                treeObj = $.fn.zTree.getZTreeObj(me.draggingTreeId);
              }
              me.draggingNode = treeObj.getNodeByTId(treeId);
            }
          },
          onDragEnter: function (receive, source, e) {
            var allowLabel = me.allowedIcon;
            source.children('.dragimage_span').css('background', 'url(\'' + allowLabel + '\')');
          },
          onDragLeave: function (receive, source, e) {
            var notAllowLabel = me.notAllowedIcon;
            source.children('.dragimage_span').css('background', 'url(\'' + notAllowLabel + '\')');
          },
          onDrop: function (obj, target, e) {
            if (typeof me.spread != 'undefined' && me.spread != null && e != null) {
              if (me.Design.objCount != 0) {
                me.$message({ message: '考核对象只能拖拽一次，需要更改请先删除excel中的考核对象', type: 'warning' });
                return false;
              }
              var sheet = me.spread.getActiveSheet();
              var canvasOffset = sheet._eventHandler._getCanvasOffset();
              var absolutePosX = e.clientX - canvasOffset.left;
              var absolutePosY = e.clientY - canvasOffset.top;
              var currRow = null;
              var currCol = null;
              var targetCell = sheet.hitTest(absolutePosX, absolutePosY);
              if (targetCell != null) {
                var targetRow = targetCell.row;
                var targetCol = targetCell.col;
                if ((typeof targetRow == 'undefined' || targetRow == null) &&
                   (typeof targetCol == 'undefined' && targetCol == null)) {
                  currRow = sheet.getActiveRowIndex();
                  currCol = sheet.getActiveColumnIndex();
                } else {
                  currRow = targetRow;
                  currCol = targetCol;
                }
              }
              var spans = me.Design.getSelectionSpans(sheet, currRow, currCol);
              if (spans && typeof spans.length != 'undefined' && spans.length > 0) {
                currRow = spans[0].row;
                currCol = spans[0].col;
              }
              var returnFlag = me.colObjNodeDrop(currRow, currCol, me.draggingNode, sheet);
              // if (!(returnFlag === false)) {
              //   me.Design.autoSetColumnWidth(sheet, currCol);
              // }
            }
          }
        });
      },
      // 考核对象树，拖拽drop处理
      colObjNodeDrop: function (row, col, treeNode, sheet) {
        var me = this;
        if (row != null && col != null &&
          treeNode != null && typeof treeNode != 'undefined') {
          var dsNode = treeNode;
          if (dsNode == null) {
            return;
          }
          // 考核对象数量为0，设置'考核对象'所在行为空
          if (me.Design.objCount == 0) {
            me.Design.objIndex = null;
          }
          if (me.Design.objIndex == null) {
            me.Design.objIndex = me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V ? row : col;
          } else {
            if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V && me.Design.objIndex != row) {
              me.$message({ message: '请保持列表数据在同一行上', type: 'warning' });
              return false;
            }
            if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H && me.Design.objIndex != col) {
              me.$message({ message: '请保持列表数据在同一列上', type: 'warning' });
              return false;
            }
          }
          if (treeNode.children != null && treeNode.children != 'undefined') {
            var childrenData = treeNode.children;
            for (var i = 0; i < childrenData.length; i++) {
              var childTreeNode = childrenData[i];
              var currCell = null;
              var rowTmp = 0;
              var colTmp = 0;
              if (i == 0) {
                rowTmp = row;
                colTmp = col;
              } else if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V) {
                rowTmp = row + i;
                colTmp = col;
              } else if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H) {
                rowTmp = row;
                colTmp = col + i;
              }
              currCell = sheet.getCell(rowTmp, colTmp);
              var cellTmp = {
                cellNo: me.Utils.initAreaPosiLabel(rowTmp, colTmp),
                rowId: rowTmp,
                colId: colTmp
              };
              var uuid = me.genUUID(32, 36);
              currCell.value(childTreeNode.name);
              currCell.tag(uuid);
              var rptIdxTmp = me.RptIdxInfo.newInstance(me.Constants.CELL_TYPE_EVALOBJ);
              rptIdxTmp.seq = uuid;
              rptIdxTmp.evlObjName = childTreeNode.name;
              rptIdxTmp.evlObjId = childTreeNode.id;
              yufp.clone(cellTmp, rptIdxTmp);
              // todo 此处要考虑单元格重复情况
              me.Design.rptIdxs[uuid] = rptIdxTmp;
              // 重新拖拽考核对象后，需要为各单元格重新设置evlObjId值
              me.Design.setEvlObjIdToIdxCells(rptIdxTmp.evlObjId, rptIdxTmp.rowId, rptIdxTmp.colId);
            }
            me.Design.objCount = childrenData.length;
          }
        }
      },
      // 初始化设计器
      initDesign: function () {
        var me = this;
        var jsonStr = me.templateId ? me.designInfo.tmpInfo.templateContentjson : '';
        // 初始化设计器
        var settings = {
          excelModel: me.excelModel,
          targetHeight: $('#excelCenterDiv').height() - 2,
          templateType: me.templateType,
          ctx: '',
          readOnly: me.readOnly,
          // onEnterCell : cellEnterCell,
          onLeaveCell: me.spreadLeaveCell,
          onEditedCell: me.spreadEditedCell,
          onCellDoubleClick: me.spreadDbclkCell,
          onSelectionChanged: me.spreadSelectionChanged,
          onDragFillBlockCheck: me.spreadDragFillBlockCheck,
          onDragFillBlockDltRptIdx: me.spreadDragFillBlockDltRptIdx,
          onExcuteFillInfo: me.spreadExcuteFillInfo,
          // onIdxsChanged: idxsChanged,
          onSave: me.rptSave,
          onCssImport: me.cssImport, // 导入excel样本
          onResetEvlObj: me.resetEvlObj, // 重置考核对象
          onClearCurFormData: me.clearCurFormData, // 清空当前单元格表单数据
          onCheckSelectionRange: me.checkSelectionRange, // 清除-校验所选区域是否存在考核对象类型的单元格
          onInsertBefore: me.insertBefore, // 处理插入(前)操作
          onInsertAfter: me.insertAfter, // 处理插入(后)操作
          onDeleteCell: me.deleteCell, // 处理删除行/列操作
          onSetColWidthRowHeight: me.setColWidthRowHeight, // 设置列宽/行高操作
          onCheckMergeSelection: me.checkMergeSelection, // 合并-校验所选区域不存在已编辑的单元格
          onHideOrShowRowCols: me.hideOrShowRowCols, // 处理隐藏/取消隐藏操作
          cellDetail: me.cellDetail, // 是否展示单元格明细
          showRowName: me.showRowName, // 是否展示行名
          showColumnName: me.showColumnName, // 是否展示列名
          toolbar: true,
          isBusiLine: false, // 平台报表没有子业务条线
          // 报表单元格数据初始化
          comCells: me.designInfo.commonArray == null ? null : me.designInfo.commonArray,
          // moduleCells: me.objTmp == null ? null : me.objTmp.moduleCells,
          formulaCells: me.designInfo.formulaArray == null ? null : me.designInfo.formulaArray,
          idxCells: me.designInfo.idxArray == null ? null : me.designInfo.idxArray,
          evlidxCells: me.designInfo.evlidxArray == null ? null : me.designInfo.evlidxArray,
          // staticCells: me.objTmp == null ? null : me.objTmp.staticCells,
          // idxCalcCells: me.objTmp == null ? null : me.objTmp.idxCalcCells,
          // colIdxCells: me.objTmp == null ? null : me.objTmp.colIdxCells,
          // colDimCells: me.objTmp == null ? null : me.objTmp.colDimCells,
          evalobjCells: me.designInfo.evalobjArray == null ? null : me.designInfo.evalobjArray,
          orgParamCells: me.designInfo.orgParamArray == null ? null : me.designInfo.orgParamArray,
          postParamCells: me.designInfo.postParamArray == null ? null : me.designInfo.postParamArray,
          svwCells: me.designInfo.svwArray == null ? null : me.designInfo.svwArray,
          dutyCells: me.designInfo.dutyArray == null ? null : me.designInfo.dutyArray,
          orgCells: me.designInfo.orgArray == null ? null : me.designInfo.orgArray,
          objIdCells: me.designInfo.objIdArray == null ? null : me.designInfo.objIdArray,
          // rowCols: me.objTmp == null ? null : me.objTmp.batchCfgs,
          initJson: jsonStr
        };
        me.spread = me.Design.init($('#excelSpread'), settings);
        // 初始化单元格明细
        me.initDetailForm();
        // 初始化工具栏
        me.initToolBar();

        // 根据当前选中的单元格，初始化单元格表单信息数据
        var currSheet = me.spread.getActiveSheet();
        var selections = currSheet.getSelections();
        if (selections.length > 0) {
          var currCell = currSheet.getCell(selections[0].row, selections[0].col);
          var seq = currCell.tag();
          if (seq && me.Design.rptIdxs[seq]) {
            yufp.clone(me.Design.rptIdxs[seq], me.excelCellInfoFormData);
            me.Design._SelectionModule.set('positionX', selections[0].row);
            me.Design._SelectionModule.set('positionY', selections[0].col);
            me.Design._SelectionModule.set('positionLabel', me.Utils.initAreaPosiLabel(selections[0].row, selections[0].col));
          }
        }
      },
      // 保存当前设计信息数据
      rptSave: function () {
        var me = this;
        me.Design.leaveCurrCell(); // 离开当前单元格，触发LeaveCell方法保存当前编辑的单元格信息
        var validateObj = me.rptValidate();
        if (validateObj.validateFlag === false) {
          // 未通过校验
          if (typeof validateObj.msg != 'undefined' && validateObj.msg != '') {
            me.$message({ message: validateObj.msg, type: 'warning' });
          }
          return;
        }
        var designData = me.prepareSaveData();
        me.executeSave(designData);
      },
      // 获取excel展示内容json
      getExcelJson: function () {
        return this.spread.toJSON();
      },
      // 保存前校验 todo
      // @return obj{ validateFlag : 校验成功标识 ; msg : 校验信息}
      rptValidate: function () {
        return {
          validateFlag: true,
          msg: '校验通过'
        };
      },
      // 准备设计器当前编辑的数据
      prepareSaveData: function () {
        var me = this;
        var saveObj = null;
        if (me.Design && me.spread) {
          saveObj = {
            commonArray: [], // 所有单元格数据集
            idxArray: [], // 基础指标数据集
            evlidxArray: [], // 派生指标数据集
            formulaArray: [], // 公式数据集
            evalobjArray: [], // 考核对象数据集
            orgParamArray: [], // 机构参数数据集
            postParamArray: [], // 岗位参数数据集
            svwArray: [], // 得分/计价/权重数据集
            dutyArray: [], // 岗位数据集
            orgArray: [], // 所属机构数据集
            objIdArray: [] // 考核对象编号数据集
          };
          var currSheet = me.spread.getActiveSheet();
          // 获取全部cell，挨个分析是否有seq属性
          var rowCount = currSheet.getRowCount();
          var colCount = currSheet.getColumnCount();
          for (var r = 0; r <= rowCount; r++) {
            for (var c = 0; c <= colCount; c++) {
              var cellTmp = currSheet.getCell(r, c);
              var seqTmp = cellTmp.tag();
              if (seqTmp) {
                me.Design.rptIdxs[seqTmp].displayData = me.Design.rptIdxs[seqTmp].cellLabel();
                saveObj.commonArray.push(me.Design.rptIdxs[seqTmp]);
                if (me.Design.rptIdxs[seqTmp].cellType == me.Constants.CELL_TYPE_IDX) {
                  saveObj.idxArray.push(me.Design.rptIdxs[seqTmp]);
                } else if (me.Design.rptIdxs[seqTmp].cellType == me.Constants.CELL_TYPE_EVLIDX) {
                  saveObj.evlidxArray.push(me.Design.rptIdxs[seqTmp]);
                } else if (me.Design.rptIdxs[seqTmp].cellType == me.Constants.CELL_TYPE_FORMULA) {
                  saveObj.formulaArray.push(me.Design.rptIdxs[seqTmp]);
                } else if (me.Design.rptIdxs[seqTmp].cellType == me.Constants.CELL_TYPE_EVALOBJ) {
                  saveObj.evalobjArray.push(me.Design.rptIdxs[seqTmp]);
                } else if (me.Design.rptIdxs[seqTmp].cellType == me.Constants.CELL_TYPE_ORGPARAM) {
                  saveObj.orgParamArray.push(me.Design.rptIdxs[seqTmp]);
                } else if (me.Design.rptIdxs[seqTmp].cellType == me.Constants.CELL_TYPE_POSTPARAM) {
                  saveObj.postParamArray.push(me.Design.rptIdxs[seqTmp]);
                } else if (me.Design.rptIdxs[seqTmp].cellType == me.Constants.CELL_TYPE_SVW) {
                  saveObj.svwArray.push(me.Design.rptIdxs[seqTmp]);
                } else if (me.Design.rptIdxs[seqTmp].cellType == me.Constants.CELL_TYPE_DUTY) {
                  saveObj.dutyArray.push(me.Design.rptIdxs[seqTmp]);
                } else if (me.Design.rptIdxs[seqTmp].cellType == me.Constants.CELL_TYPE_ORG) {
                  saveObj.orgArray.push(me.Design.rptIdxs[seqTmp]);
                } else if (me.Design.rptIdxs[seqTmp].cellType == me.Constants.CELL_TYPE_OBJID) {
                  saveObj.objIdArray.push(me.Design.rptIdxs[seqTmp]);
                }
              }
            }
          }
        }
        return saveObj;
      },
      // 执行保存操作
      executeSave: function (designData) {
        var me = this;
        var data = {};
        var jsonStr = '';
        if (designData) {
          data = JSON.stringify(designData);
          var jsonTmp = me.spread.toJSON();
          var jsonMin;
          if (me.Utils && typeof me.Utils.jsonMin == 'function') {
            jsonMin = me.Utils.jsonMin(jsonTmp, null); // 压缩json
          } else {
            jsonMin = jsonTmp;
          }
          jsonStr = JSON.stringify(jsonMin);
          var ajaxData = {};
          ajaxData.schemeId = me.schemeId; // 考核方案编号
          ajaxData.designData = data; // 单元格信息集
          ajaxData.templateId = me.templateId; // 模板ID
          ajaxData.templateType = me.templateType; // 模板类型
          ajaxData.templateJson = jsonStr; // excel样式集
          ajaxData.evlObjType = me.evlObjType; // 考核对象类型
          yufp.service.request({
            url: me.excelSaveUrl,
            method: 'POST',
            data: ajaxData,
            callback: function (code, message, response) {
              if (code == 0) {
                if (response.code == 0) {
                  me.$message('保存成功');
                  me.$emit('excel-save-success', {}); // 保存成功，触发回调函数
                } else {
                  me.$message({ message: response.message, type: 'warning' });
                  return;
                }
              }
            }
          });
        }
      },
      // 基础指标放大镜选择回调函数
      baseIndexSelectFn: function (data) {
        if (data && data.length > 0 && data[0].indexName) {
          this.excelCellInfoFormData.indexName = data[0].indexName;
          this.excelCellInfoFormData.evlObjType = data[0].evlObjType;
          this.excelCellInfoFormData.balType = data[0].balType;
          this.excelCellInfoFormData.applyType = data[0].applyType;
        }
      },
      // 机构参数放大镜选择回调函数
      orgParamSelectFn: function (data) {
        if (data && data.length > 0 && data[0].paramName) {
          this.excelCellInfoFormData.orgParamName = data[0].paramName;
        }
      },
      // 岗位参数放大镜选择回调函数
      postParamSelectFn: function (data) {
        if (data && data.length > 0 && data[0].paramName) {
          this.excelCellInfoFormData.postParamName = data[0].paramName;
        }
      },
      // 派生指标放大镜选择回调函数
      evlIndexSelectFn: function (data) {
        if (data && data.length > 0) {
          this.excelCellInfoFormData.evlindexName = data[0].indexName;
          this.excelCellInfoFormData.evlindexId = data[0].indexId;
          this.excelCellInfoFormData.evlObjType = data[0].evlObjType;
          this.excelCellInfoFormData.balType = data[0].balType;
          this.excelCellInfoFormData.applyType = data[0].applyType;
        }
      },
      // 关联指标放大镜选择回调函数
      relIndexSelectFn: function (data) {
        if (data && data.length > 0) {
          if (data[0].type == '1') { // 基础指标
            this.excelCellInfoFormData.indexId = data[0].indexId;
            this.excelCellInfoFormData.evlindexId = '';
            this.excelCellInfoFormData.evlObjType = data[0].evlObjType;
            this.excelCellInfoFormData.balType = data[0].balType;
            this.excelCellInfoFormData.applyType = data[0].applyType;
          } else if (data[0].type == '2') { // 派生指标
            this.excelCellInfoFormData.indexId = '';
            this.excelCellInfoFormData.evlindexId = data[0].indexId;
            this.excelCellInfoFormData.evlObjType = data[0].evlObjType;
            this.excelCellInfoFormData.balType = data[0].balType;
            this.excelCellInfoFormData.applyType = data[0].applyType;
          }
        }
      },
      // 扩展基础指标单元格
      extendIdxCells: function (row, col, cell) {
        var me = this;
        var seq = cell.tag();
        // 单元格类型考核方案不扩展基础指标
        if (me.templateType == me.Constants.TEMPLATE_TYPE_IDX) {
          return;
        }
        // 对于基础指标类型的单元格，根据考核方案类型，自动扩展
        if (seq && me.Design.rptIdxs[seq] && me.Design.rptIdxs[seq].cellType == me.Constants.CELL_TYPE_IDX) {
          for (var i = 1; i < me.Design.objCount; ++i) {
            var cellTmp = null;
            if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V) {
              cellTmp = {
                cellNo: me.Utils.initAreaPosiLabel(row + i, col),
                rowId: row + i,
                colId: col
              };
            } else {
              cellTmp = {
                cellNo: me.Utils.initAreaPosiLabel(row, col + i),
                rowId: row,
                colId: col + i
              };
            }
            var uuid = me.genUUID(32, 36);
            var rptIdxTmp = {};
            var extendCell = me.Design.spread.getActiveSheet().getCell(cellTmp.rowId, cellTmp.colId);
            var oriDefaultValue = null; // 获取之前的默认值
            if (extendCell.tag()) { // 如果之前改单元格绑定了对象，需要先删除
              oriDefaultValue = me.Design.rptIdxs[extendCell.tag()].defaultValue;
              delete me.Design.rptIdxs[extendCell.tag()];
            }
            yufp.clone(me.Design.rptIdxs[seq], rptIdxTmp);
            yufp.clone(cellTmp, rptIdxTmp);
            rptIdxTmp.seq = uuid;
            rptIdxTmp.isExtend = 1; // 设置是否扩展属性为1，不是扩展的单元格isExtend为空
            // 横/纵向考核方案，需要额外给evlObjId赋值
            if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V || me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H) {
              rptIdxTmp.evlObjId = me.Design.getEvlObjIdFromRptIdxs(rptIdxTmp.rowId, rptIdxTmp.colId);
            }
            if (oriDefaultValue != null && oriDefaultValue != '') {
              rptIdxTmp.defaultValue = oriDefaultValue;
            }
            me.Design.rptIdxs[uuid] = Object.assign({}, rptIdxTmp);
            extendCell.tag(uuid);
            extendCell.value(rptIdxTmp.cellLabel());
            // me.Design.autoSetColumnWidth(me.spread.getActiveSheet(), rptIdxTmp.colId);
          }
        }
      },
      // 扩展派生指标单元格
      extendEvlIdxCells: function (row, col, cell) {
        var me = this;
        var seq = cell.tag();
        // 单元格类型考核方案不扩展派生指标
        if (me.templateType == me.Constants.TEMPLATE_TYPE_IDX) {
          return;
        }
        // 对于派生指标类型的单元格，根据考核方案类型，自动扩展
        if (seq && me.Design.rptIdxs[seq] && me.Design.rptIdxs[seq].cellType == me.Constants.CELL_TYPE_EVLIDX) {
          for (var i = 1; i < me.Design.objCount; ++i) {
            var cellTmp = null;
            if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V) {
              cellTmp = {
                cellNo: me.Utils.initAreaPosiLabel(row + i, col),
                rowId: row + i,
                colId: col
              };
            } else {
              cellTmp = {
                cellNo: me.Utils.initAreaPosiLabel(row, col + i),
                rowId: row,
                colId: col + i
              };
            }
            var uuid = me.genUUID(32, 36);
            var rptIdxTmp = {};
            var extendCell = me.Design.spread.getActiveSheet().getCell(cellTmp.rowId, cellTmp.colId);
            var oriDefaultValue = null; // 获取之前的默认值
            if (extendCell.tag()) { // 如果之前改单元格绑定了对象，需要先删除
              oriDefaultValue = me.Design.rptIdxs[extendCell.tag()].defaultValue;
              delete me.Design.rptIdxs[extendCell.tag()];
            }
            yufp.clone(me.Design.rptIdxs[seq], rptIdxTmp);
            yufp.clone(cellTmp, rptIdxTmp);
            rptIdxTmp.seq = uuid;
            rptIdxTmp.isExtend = 1; // 设置是否扩展属性为1，不是扩展的单元格isExtend为空
            // 横/纵向考核方案，需要额外给evlObjId赋值
            if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V || me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H) {
              rptIdxTmp.evlObjId = me.Design.getEvlObjIdFromRptIdxs(rptIdxTmp.rowId, rptIdxTmp.colId);
            }
            if (oriDefaultValue != null && oriDefaultValue != '') {
              rptIdxTmp.defaultValue = oriDefaultValue;
            }
            me.Design.rptIdxs[uuid] = Object.assign({}, rptIdxTmp);
            extendCell.tag(uuid);
            extendCell.value(rptIdxTmp.cellLabel());
            // me.Design.autoSetColumnWidth(me.spread.getActiveSheet(), rptIdxTmp.colId);
          }
        }
      },
      // 扩展机构/岗位参数单元格
      extendParamCells: function (row, col, cell) {
        var me = this;
        var seq = cell.tag();
        // 单元格类型考核方案不扩展机构/岗位参数
        if (me.templateType == me.Constants.TEMPLATE_TYPE_IDX) {
          return;
        }
        // 对于机构/岗位参数类型的单元格，根据考核方案类型，自动扩展
        if (seq && me.Design.rptIdxs[seq] &&
          (me.Design.rptIdxs[seq].cellType == me.Constants.CELL_TYPE_ORGPARAM ||
            me.Design.rptIdxs[seq].cellType == me.Constants.CELL_TYPE_POSTPARAM)) {
          for (var i = 1; i < me.Design.objCount; ++i) {
            var cellTmp = null;
            if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V) {
              cellTmp = {
                cellNo: me.Utils.initAreaPosiLabel(row + i, col),
                rowId: row + i,
                colId: col
              };
            } else {
              cellTmp = {
                cellNo: me.Utils.initAreaPosiLabel(row, col + i),
                rowId: row,
                colId: col + i
              };
            }
            var uuid = me.genUUID(32, 36);
            var rptIdxTmp = {};
            var extendCell = me.Design.spread.getActiveSheet().getCell(cellTmp.rowId, cellTmp.colId);
            var oriDefaultValue = null; // 获取之前的默认值
            if (extendCell.tag()) { // 如果之前改单元格绑定了对象，需要先删除
              oriDefaultValue = me.Design.rptIdxs[extendCell.tag()].defaultValue;
              delete me.Design.rptIdxs[extendCell.tag()];
            }
            yufp.clone(me.Design.rptIdxs[seq], rptIdxTmp);
            yufp.clone(cellTmp, rptIdxTmp);
            rptIdxTmp.seq = uuid;
            rptIdxTmp.isExtend = 1; // 设置是否扩展属性为1，不是扩展的单元格isExtend为空
            // 横/纵向考核方案，需要额外给evlObjId赋值
            if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V || me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H) {
              rptIdxTmp.evlObjId = me.Design.getEvlObjIdFromRptIdxs(rptIdxTmp.rowId, rptIdxTmp.colId);
            }
            if (oriDefaultValue != null && oriDefaultValue != '') {
              rptIdxTmp.defaultValue = oriDefaultValue;
            }
            me.Design.rptIdxs[uuid] = Object.assign({}, rptIdxTmp);
            extendCell.tag(uuid);
            extendCell.value(rptIdxTmp.cellLabel());
            // me.Design.autoSetColumnWidth(me.spread.getActiveSheet(), rptIdxTmp.colId);
          }
        }
      },
      // 扩展岗位单元格
      extendDutyCells: function (row, col, cell) {
        var me = this;
        var seq = cell.tag();
        // 单元格类型考核方案不扩展岗位
        if (me.templateType == me.Constants.TEMPLATE_TYPE_IDX) {
          return;
        }
        // 对于岗位类型的单元格，根据考核方案类型，自动扩展
        if (seq && me.Design.rptIdxs[seq] && me.Design.rptIdxs[seq].cellType == me.Constants.CELL_TYPE_DUTY) {
          for (var i = 1; i < me.Design.objCount; ++i) {
            var cellTmp = null;
            if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V) {
              cellTmp = {
                cellNo: me.Utils.initAreaPosiLabel(row + i, col),
                rowId: row + i,
                colId: col
              };
            } else {
              cellTmp = {
                cellNo: me.Utils.initAreaPosiLabel(row, col + i),
                rowId: row,
                colId: col + i
              };
            }
            var uuid = me.genUUID(32, 36);
            var rptIdxTmp = {};
            var extendCell = me.Design.spread.getActiveSheet().getCell(cellTmp.rowId, cellTmp.colId);
            // var oriDefaultValue = null; // 获取之前的默认值
            if (extendCell.tag()) { // 如果之前改单元格绑定了对象，需要先删除
              // oriDefaultValue = me.Design.rptIdxs[extendCell.tag()].defaultValue;
              delete me.Design.rptIdxs[extendCell.tag()];
            }
            yufp.clone(me.Design.rptIdxs[seq], rptIdxTmp);
            yufp.clone(cellTmp, rptIdxTmp);
            rptIdxTmp.seq = uuid;
            rptIdxTmp.isExtend = 1; // 设置是否扩展属性为1，不是扩展的单元格isExtend为空
            // 横/纵向考核方案，需要额外给evlObjId赋值
            if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V || me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H) {
              rptIdxTmp.evlObjId = me.Design.getEvlObjIdFromRptIdxs(rptIdxTmp.rowId, rptIdxTmp.colId);
            }
            // if (oriDefaultValue != null && oriDefaultValue != '') {
            //   rptIdxTmp.defaultValue = oriDefaultValue;
            // }
            me.Design.rptIdxs[uuid] = Object.assign({}, rptIdxTmp);
            extendCell.tag(uuid);
            extendCell.value(rptIdxTmp.cellLabel());
            // me.Design.autoSetColumnWidth(me.spread.getActiveSheet(), rptIdxTmp.colId);
          }
        }
      },
      // 扩展所属机构单元格
      extendOrgCells: function (row, col, cell) {
        var me = this;
        var seq = cell.tag();
        // 单元格类型考核方案不扩展所属机构
        if (me.templateType == me.Constants.TEMPLATE_TYPE_IDX) {
          return;
        }
        // 对于所属机构类型的单元格，根据考核方案类型，自动扩展
        if (seq && me.Design.rptIdxs[seq] && me.Design.rptIdxs[seq].cellType == me.Constants.CELL_TYPE_ORG) {
          for (var i = 1; i < me.Design.objCount; ++i) {
            var cellTmp = null;
            if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V) {
              cellTmp = {
                cellNo: me.Utils.initAreaPosiLabel(row + i, col),
                rowId: row + i,
                colId: col
              };
            } else {
              cellTmp = {
                cellNo: me.Utils.initAreaPosiLabel(row, col + i),
                rowId: row,
                colId: col + i
              };
            }
            var uuid = me.genUUID(32, 36);
            var rptIdxTmp = {};
            var extendCell = me.Design.spread.getActiveSheet().getCell(cellTmp.rowId, cellTmp.colId);
            // var oriDefaultValue = null; // 获取之前的默认值
            if (extendCell.tag()) { // 如果之前改单元格绑定了对象，需要先删除
              // oriDefaultValue = me.Design.rptIdxs[extendCell.tag()].defaultValue;
              delete me.Design.rptIdxs[extendCell.tag()];
            }
            yufp.clone(me.Design.rptIdxs[seq], rptIdxTmp);
            yufp.clone(cellTmp, rptIdxTmp);
            rptIdxTmp.seq = uuid;
            rptIdxTmp.isExtend = 1; // 设置是否扩展属性为1，不是扩展的单元格isExtend为空
            // 横/纵向考核方案，需要额外给evlObjId赋值
            if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V || me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H) {
              rptIdxTmp.evlObjId = me.Design.getEvlObjIdFromRptIdxs(rptIdxTmp.rowId, rptIdxTmp.colId);
            }
            // if (oriDefaultValue != null && oriDefaultValue != '') {
            //   rptIdxTmp.defaultValue = oriDefaultValue;
            // }
            me.Design.rptIdxs[uuid] = Object.assign({}, rptIdxTmp);
            extendCell.tag(uuid);
            extendCell.value(rptIdxTmp.cellLabel());
            // me.Design.autoSetColumnWidth(me.spread.getActiveSheet(), rptIdxTmp.colId);
          }
        }
      },
      // 扩展考核对象编号单元格
      extendObjIdCells: function (row, col, cell) {
        var me = this;
        var seq = cell.tag();
        // 单元格类型考核方案不扩展考核对象编号
        if (me.templateType == me.Constants.TEMPLATE_TYPE_IDX) {
          return;
        }
        // 对于考核对象编号类型的单元格，根据考核方案类型，自动扩展
        if (seq && me.Design.rptIdxs[seq] && me.Design.rptIdxs[seq].cellType == me.Constants.CELL_TYPE_OBJID) {
          for (var i = 1; i < me.Design.objCount; ++i) {
            var cellTmp = null;
            if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V) {
              cellTmp = {
                cellNo: me.Utils.initAreaPosiLabel(row + i, col),
                rowId: row + i,
                colId: col
              };
            } else {
              cellTmp = {
                cellNo: me.Utils.initAreaPosiLabel(row, col + i),
                rowId: row,
                colId: col + i
              };
            }
            var uuid = me.genUUID(32, 36);
            var rptIdxTmp = {};
            var extendCell = me.Design.spread.getActiveSheet().getCell(cellTmp.rowId, cellTmp.colId);
            // var oriDefaultValue = null; // 获取之前的默认值
            if (extendCell.tag()) { // 如果之前改单元格绑定了对象，需要先删除
              // oriDefaultValue = me.Design.rptIdxs[extendCell.tag()].defaultValue;
              delete me.Design.rptIdxs[extendCell.tag()];
            }
            yufp.clone(me.Design.rptIdxs[seq], rptIdxTmp);
            yufp.clone(cellTmp, rptIdxTmp);
            rptIdxTmp.seq = uuid;
            rptIdxTmp.isExtend = 1; // 设置是否扩展属性为1，不是扩展的单元格isExtend为空
            // 横/纵向考核方案，需要额外给evlObjId赋值
            if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V || me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H) {
              rptIdxTmp.evlObjId = me.Design.getEvlObjIdFromRptIdxs(rptIdxTmp.rowId, rptIdxTmp.colId);
            }
            // if (oriDefaultValue != null && oriDefaultValue != '') {
            //   rptIdxTmp.defaultValue = oriDefaultValue;
            // }
            me.Design.rptIdxs[uuid] = Object.assign({}, rptIdxTmp);
            extendCell.tag(uuid);
            extendCell.value(rptIdxTmp.cellLabel());
            // me.Design.autoSetColumnWidth(me.spread.getActiveSheet(), rptIdxTmp.colId);
          }
        }
      },
      // spread移出单元格事件扩展
      spreadLeaveCell: function (sender, args, cell) { // 点击切换单元格事件，当前为之前点击的单元格
        var me = this;
        if (me.readOnly) { // 只读时不处理直接返回
          return;
        }
        // 单元格类型非空且不是考核对象类型，保存信息到Design.rptIdxs数组
        if (me.excelCellInfoFormData.cellType && me.excelCellInfoFormData.cellType != me.Constants.CELL_TYPE_EVALOBJ) {
          if (!me.checkObjIndex() && me.excelCellInfoFormData.cellType != me.Constants.CELL_TYPE_COMMON) { // 一般单元格不做校验
            me.$message({ message: '请先拖拽考核对象', type: 'warning' });
            args.cancel = true;
            return;
          }
          var currRow = me.Design._SelectionModule.get('positionX') == '' ? 0 : me.Design._SelectionModule.get('positionX');
          var currCol = me.Design._SelectionModule.get('positionY') == '' ? 0 : me.Design._SelectionModule.get('positionY');
          var currCell = me.Design.spread.getActiveSheet().getCell(currRow, currCol);
          // 基础指标、机构/岗位参数、岗位、所属机构、考核对象编号类型的单元格，根据考核方案类型，校验当前单元格与考核对象在同一行/列上
          if ((me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V || me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H) &&
            (me.excelCellInfoFormData.cellType == me.Constants.CELL_TYPE_IDX || me.excelCellInfoFormData.cellType == me.Constants.CELL_TYPE_ORGPARAM ||
              me.excelCellInfoFormData.cellType == me.Constants.CELL_TYPE_POSTPARAM || me.excelCellInfoFormData.cellType == me.Constants.CELL_TYPE_DUTY ||
              me.excelCellInfoFormData.cellType == me.Constants.CELL_TYPE_ORG || me.excelCellInfoFormData.cellType == me.Constants.CELL_TYPE_OBJID) &&
            !me.excelCellInfoFormData.isExtend) { // 如果是扩展的单元格，不做校验
            if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V && me.Design.objIndex != currRow) {
              me.$message({ message: '请保持列表数据在同一行上', type: 'warning' });
              return;
            } else if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H && me.Design.objIndex != currCol) {
              me.$message({ message: '请保持列表数据在同一列上', type: 'warning' });
              return;
            }
          }
          if (!me.excelCellInfoFormData.seq) { // 新建uuid并赋值给cellInfoFormData，放入到rptIdxs数组中；更新当前cell的tag
            var uuid = me.genUUID(32, 36);
            me.excelCellInfoFormData.seq = uuid;
            me.Design.rptIdxs[uuid] = Object.assign({}, me.excelCellInfoFormData);
            currCell.tag(uuid);
            me.extendIdxCells(currRow, currCol, currCell); // 新增的基础指标单元格进行扩展
            me.extendEvlIdxCells(currRow, currCol, currCell); // 新增的派生指标单元格进行扩展
            me.extendParamCells(currRow, currCol, currCell); // 新增的机构/岗位参数单元格进行扩展
            me.extendDutyCells(currRow, currCol, currCell); // 新增的岗位单元格进行扩展
            me.extendOrgCells(currRow, currCol, currCell); // 新增的所属机构单元格进行扩展
            me.extendObjIdCells(currRow, currCol, currCell); // 新增的考核对象编号单元格进行扩展
          } else { // 直接更新Design.rptIdxs[seq]对应数据
            me.Design.rptIdxs[me.excelCellInfoFormData.seq] = Object.assign({}, me.excelCellInfoFormData);
            if (me.excelCellInfoFormData.cellType == me.Constants.CELL_TYPE_IDX && !me.excelCellInfoFormData.isExtend) {
              me.extendIdxCells(currRow, currCol, currCell); // 更新基础指标单元格进行扩展
            }
            if (me.excelCellInfoFormData.cellType == me.Constants.CELL_TYPE_EVLIDX && !me.excelCellInfoFormData.isExtend) {
              me.extendEvlIdxCells(currRow, currCol, currCell); // 新增的派生指标单元格进行扩展
            }
            if ((me.excelCellInfoFormData.cellType == me.Constants.CELL_TYPE_ORGPARAM ||
                  me.excelCellInfoFormData.cellType == me.Constants.CELL_TYPE_POSTPARAM) &&
              !me.excelCellInfoFormData.isExtend) {
              me.extendParamCells(currRow, currCol, currCell); // 更新机构/岗位参数单元格进行扩展
            }
            if (me.excelCellInfoFormData.cellType == me.Constants.CELL_TYPE_DUTY && !me.excelCellInfoFormData.isExtend) {
              me.extendDutyCells(currRow, currCol, currCell); // 新增的岗位单元格进行扩展
            }
            if (me.excelCellInfoFormData.cellType == me.Constants.CELL_TYPE_ORG && !me.excelCellInfoFormData.isExtend) {
              me.extendOrgCells(currRow, currCol, currCell); // 新增的所属机构单元格进行扩展
            }
            if (me.excelCellInfoFormData.cellType == me.Constants.CELL_TYPE_OBJID && !me.excelCellInfoFormData.isExtend) {
              me.extendObjIdCells(currRow, currCol, currCell); // 新增的考核对象编号单元格进行扩展
            }
          }
          // 公式/派生指标/得分/计价/权重类型、默认值为空时，给单元格formula赋值
          if ((me.excelCellInfoFormData.cellType == me.Constants.CELL_TYPE_FORMULA ||
                me.excelCellInfoFormData.cellType == me.Constants.CELL_TYPE_EVLIDX ||
                me.excelCellInfoFormData.cellType == me.Constants.CELL_TYPE_SVW) &&
            (
              (me.excelCellInfoFormData.defaultValue == null || me.excelCellInfoFormData.defaultValue == '')
            )) {
            if (me.excelCellInfoFormData.excelFormula) { // 公式内容非空校验
              currCell.formula(me.excelCellInfoFormData.cellLabel());
            } else {
              currCell.value(me.excelCellInfoFormData.cellLabel());
            }
          } else {
            currCell.formula('');
            currCell.value(me.excelCellInfoFormData.cellLabel());
          }
          // me.Design.autoSetColumnWidth(me.spread.getActiveSheet(), currCol);
        }
      },
      // spread单元格编辑后回调事件
      spreadEditedCell: function (sender, args) {
        if (args) {
          var me = this;
          var currCell = me.Design.spread.getActiveSheet().getCell(args.row, args.col);
          var editText = args.editingText == null ? '' : args.editingText;
          var seq = currCell.tag();
          var isFormal = editText.indexOf('=') == '0'; // 是否编辑公式  todo 对于公式的正确性前台不做校验，在数据回显时由组件自身处理
          var cellTmp = {
            cellNo: me.Utils.initAreaPosiLabel(args.row, args.col),
            rowId: args.row,
            colId: args.col
          };
          if (editText && !me.checkObjIndex()) {
            me.$message({ message: '请先拖拽考核对象', type: 'warning' });
            currCell = currCell.formula('');
            currCell.value('');
            args.cancel = true;
            return;
          }
          if (seq && me.Design.rptIdxs[seq]) { // 如果是编辑过的单元格，更新rptIdxs及cellInfoFormData数据
            if (editText) { // 编辑value非空，
              if (isFormal) { // 是公式
                if (me.Design.rptIdxs[seq].cellType == me.Constants.CELL_TYPE_FORMULA) { // 原来是公式类型
                  me.Design.rptIdxs[seq].excelFormula = editText;
                  yufp.clone(me.Design.rptIdxs[seq], me.excelCellInfoFormData);
                } else { // 单元格类型变化，new RptIdxInfo对象
                  var rptIdxTmp = me.RptIdxInfo.newInstance(me.Constants.CELL_TYPE_FORMULA);
                  rptIdxTmp.excelFormula = editText;
                  rptIdxTmp.seq = seq;
                  yufp.clone(cellTmp, rptIdxTmp); // 初始化当前单元格字段值
                  // 横/纵类型的考核方案，设置公式单元格-考核对象编号值
                  if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V || me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H) {
                    rptIdxTmp.evlObjId = me.Design.getEvlObjIdFromRptIdxs(args.row, args.col);
                  }
                  yufp.clone(rptIdxTmp, me.Design.rptIdxs[seq]);
                  yufp.clone(rptIdxTmp, me.excelCellInfoFormData);
                }
              } else { // 非公式,即一般单元格(只有公式/一般单元格可编辑)
                if (me.Design.rptIdxs[seq].cellType == me.Constants.CELL_TYPE_COMMON) { // 原来是一般单元格
                  me.Design.rptIdxs[seq].defaultValue = editText;
                  yufp.clone(me.Design.rptIdxs[seq], me.excelCellInfoFormData);
                } else { // 单元格类型变化，new RptIdxInfo对象
                  var rptIdxTmp = me.RptIdxInfo.newInstance(me.Constants.CELL_TYPE_COMMON);
                  rptIdxTmp.defaultValue = editText;
                  rptIdxTmp.seq = seq;
                  yufp.clone(cellTmp, rptIdxTmp); // 初始化当前单元格字段值
                  yufp.clone(rptIdxTmp, me.Design.rptIdxs[seq]);
                  yufp.clone(rptIdxTmp, me.excelCellInfoFormData);
                }
              }
            } else { // 如果编辑value为空：删除rptIdxs中数据，当前单元格tag为空
              currCell.tag('');
              delete me.Design.rptIdxs[seq];
            }
          } else { // 新编辑的单元格，只需要更新cellInfoFormData，Design.rptIdxs会在spreadLeaveCell方法中更新
            if (editText) { // 如果编辑value非空，value如果为空不做处理
              var rptIdxTmp = {};
              if (isFormal) { // 是公式
                rptIdxTmp = me.RptIdxInfo.newInstance(me.Constants.CELL_TYPE_FORMULA);
                rptIdxTmp.excelFormula = editText;
                // 横/纵类型的考核方案，设置公式单元格-考核对象编号值
                if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V || me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H) {
                  rptIdxTmp.evlObjId = me.Design.getEvlObjIdFromRptIdxs(args.row, args.col);
                }
              } else { // 非公式,即一般单元格(只有公式/一般单元格可编辑)
                rptIdxTmp = me.RptIdxInfo.newInstance(me.Constants.CELL_TYPE_COMMON);
                rptIdxTmp.defaultValue = editText;
              }
              var uuid = me.genUUID(32, 36);
              rptIdxTmp.seq = uuid;
              yufp.clone(cellTmp, rptIdxTmp); // 初始化当前单元格字段值
              yufp.clone(rptIdxTmp, me.excelCellInfoFormData);
              me.Design.rptIdxs[uuid] = Object.assign({}, me.excelCellInfoFormData);
              currCell.tag(uuid);
            }
          }
        }
      },
      // 双击单元格事件
      spreadDbclkCell: function (sender, args) {
      },
      // spread选择区域发生变化事件扩展
      spreadSelectionChanged: function (sender, args, cell) {
        var me = this;
        me.clearObj(me.excelCellInfoFormData);
        // me.$refs.excelCellInfoForm.resetFields(); // 重置单元格信息面板
        var currRow = me.Design._SelectionModule.get('positionX');
        var currCol = me.Design._SelectionModule.get('positionY');
        if (cell.cellType) { // 之前编辑了该单元格信息
          yufp.clone(cell, me.excelCellInfoFormData);
        } else { // 初始化单元格信息
          var cellDefault = {
            cellNo: me.Utils.initAreaPosiLabel(currRow, currCol),
            rowId: currRow,
            colId: currCol
          };
          yufp.clone(cellDefault, me.excelCellInfoFormData);
        }
      },
      // 拖拽单元格校验事件
      spreadDragFillBlockCheck: function (sender, args) {
        if (this.readOnly) {
          args.cancel = true;
          return;
        }
        if (!this.excelCellInfoFormData.cellType ||
          (this.excelCellInfoFormData.cellType != this.Constants.CELL_TYPE_FORMULA &&
            this.excelCellInfoFormData.cellType != this.Constants.CELL_TYPE_EVLIDX &&
            this.excelCellInfoFormData.cellType != this.Constants.CELL_TYPE_SVW)) {
          this.$message({ message: '只能拖拽公式/派生指标/得分计价权重类型的单元格', type: 'warning' });
          args.cancel = true;
        } else {
          if (this.templateType == this.Constants.TEMPLATE_TYPE_IDXCOL_V && args.fillDirection != '3') {
            this.$message({ message: '纵向的报表只允许向下拖拽', type: 'warning' });
            args.cancel = true;
          } else if (this.templateType == this.Constants.TEMPLATE_TYPE_IDXCOL_H && args.fillDirection != '1') {
            this.$message({ message: '纵向的报表只允许向右拖拽', type: 'warning' });
            args.cancel = true;
          } else if (this.templateType == this.Constants.TEMPLATE_TYPE_IDX &&
            (args.fillDirection != '3' && args.fillDirection != '1')) {
            this.$message({ message: '单元格类型的报表只允许向下/向右拖拽', type: 'warning' });
            args.cancel = true;
          }
        }
      },
      // 校验成功后，如果拖拽路径所过的单元格tag非空，删除Design.rptIdxs对应的数据
      spreadDragFillBlockDltRptIdx: function (sender, args) {
        var me = this;
        if (args.fillDirection == '3') { // 向下拖拽
          var colTmp = args.fillRange.col;
          for (var i = 0; i < args.fillRange.rowCount; ++i) {
            var rowTmp = args.fillRange.row + i;
            var cell = me.spread.getActiveSheet().getCell(rowTmp, colTmp);
            if (cell.tag()) {
              delete me.Design.rptIdxs[cell.tag()];
            }
          }
        } else if (args.fillDirection == '1') { // 向右拖拽
          var rowTmp = args.fillRange.row;
          for (var i = 0; i < args.fillRange.colCount; ++i) {
            var colTmp = args.fillRange.col + i;
            var cell = me.spread.getActiveSheet().getCell(rowTmp, colTmp);
            if (cell.tag()) {
              delete me.Design.rptIdxs[cell.tag()];
            }
          }
        }
      },
      // 拖拽公式单元格执行事件
      spreadExcuteFillInfo: function (fillCells) {
        // 实现拖拽公式单元格内容的自动匹配，并新增Design.rptIdxs数据(需考虑覆盖原来数据的情况)
        var me = this;
        var row = fillCells.fillRange.row;
        var col = fillCells.fillRange.col;
        var rowCount = fillCells.fillRange.rowCount;
        var colCount = fillCells.fillRange.colCount;
        for (var i = 0; i < rowCount; i++) {
          for (var j = 0; j < colCount; j++) {
            var cellTmp = null;
            var currow = row + i;
            var curcol = col + j;
            if (fillCells.fillDirection == '0' || fillCells.fillDirection == '1') {
              if (fillCells.fillDirection == '0') {
                curcol = col - j;
              }
              cellTmp = fillCells.rptIdxs[i];
            }
            if (fillCells.fillDirection == '2' || fillCells.fillDirection == '3') {
              // if (fillCells.fillDirection == '2') {
              //   currow = row - i;
              // }
              cellTmp = fillCells.rptIdxs[j];
            }
            if (cellTmp != null) {
              var cellBaseInfo = { // 拖拽的单元格基本信息
                cellNo: me.Utils.initAreaPosiLabel(currow, curcol),
                rowId: currow,
                colId: curcol
              };
              var uuid = me.genUUID(32, 36);
              var newCell = {};
              yufp.clone(cellTmp, newCell);
              yufp.clone(cellBaseInfo, newCell);
              newCell.seq = uuid;
              var cell = me.spread.getActiveSheet().getCell(currow, curcol);
              if (newCell.cellType == me.Constants.CELL_TYPE_FORMULA ||
                  newCell.cellType == me.Constants.CELL_TYPE_EVLIDX ||
                  newCell.cellType == me.Constants.CELL_TYPE_SVW) {
                newCell.excelFormula = cell.formula() ? '=' + cell.formula() : null;
              }
              // 纵/横向考核方案，设置公式/派生指标类型单元格-考核对象编号字段值
              if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V || me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H) {
                newCell.evlObjId = me.Design.getEvlObjIdFromRptIdxs(currow, curcol);
              }
              cell.tag(uuid);
              me.Design.rptIdxs[uuid] = newCell;
            }
          }
        }
      },
      // 判断是否已经配置了考核对象
      checkObjIndex: function () {
        if (this.templateType == this.Constants.TEMPLATE_TYPE_IDX) { // 单元格类型，不需要配置考核对象
          return true;
        } else {
          return this.Design.objCount != 0;
        }
      },
      // 初始化单元格明细模板
      initDetailForm: function () {
        var me = this;
        // 默认设置当前选中A1单元格
        me.Design._SelectionModule.set('positionX', 0);
        me.Design._SelectionModule.set('positionY', 0);
        me.Design._SelectionModule.set('positionLabel', me.Utils.initAreaPosiLabel(0, 0));
        // 初始化单元格信息的数据绑定
        this.initCellForm();
      },
      // 初始化ko数据绑定
      initToolBar: function () {
        if (ko != null && typeof ko == 'object' && !this.readOnly) {
          ko.applyBindings(this.selectionToolBar, $('.toolbar-awesome')[0]);
        }
      },
      // 初始化右侧单元格信息form
      initCellForm: function () {
        var me = this;
        // 初始化ko数据绑定
        if (ko != null && typeof ko == 'object' &&
          me.RptIdxInfo != null && typeof me.RptIdxInfo != 'undefined') {
          var currSheet = me.Design.spread.getActiveSheet();
          var currRow = me.Design._SelectionModule.get('positionX');
          var currCol = me.Design._SelectionModule.get('positionY');
          var currCell = currSheet.getCell(currRow, currCol);
          var seq = currCell.tag();
          if (!seq) {
            // 不存在数据，默认初始化cellInfoFormData
            var cellTmp = {
              cellNo: me.Utils.initAreaPosiLabel(currRow, currCol),
              rowId: currRow,
              colId: currCol
            };
            yufp.clone(cellTmp, me.excelCellInfoFormData);
          }
          // var sheet = me.spread.getActiveSheet();
          // var seq = sheet.getCell(sheet.getActiveRowIndex(),
          //   sheet.getActiveColumnIndex(), $.wijmo.wijspread.SheetArea.viewport).tag();
          // var rptIdxTmp = Design.rptIdxs[seq];
          // var commonCellTmp = Design.commonCells[seq];
          // me.selectionIdx = RptIdxInfo.newInstanceKO();
          // if (rptIdxTmp) {
          //   // $('#rightCellForm [name=\'cellNo\']').val(Utils.initAreaPosiLabel(sheet.getActiveRowIndex(), sheet.getActiveColumnIndex()));
          //   RptIdxInfo.initIdxKO(me.selectionIdx, rptIdxTmp);
          // } else if (commonCellTmp) {
          //   // $('#rightCellForm [name=\'cellNo\']').val(Utils.initAreaPosiLabel(sheet.getActiveRowIndex(), sheet.getActiveColumnIndex()));
          //   RptIdxInfo.initIdxKO(me.selectionIdx, commonCellTmp);
          // } else {
          //   var uuid = me.genUUID(32, 36);
          //   var commonCellTmp = RptIdxInfo.newInstance('01');
          //   Design.commonCells[uuid] = commonCellTmp;
          //   RptIdxInfo.initIdxKO(me.selectionIdx, commonCellTmp);
          //   me.selectionIdx.seq(uuid);
          // }
          // ko.applyBindings(me.selectionIdx, $('#rightCellForm')[0]);
        }
      },
      // 重置单元格信息面板数据
      resetFn: function () {
        var cellNoTemp = this.excelCellInfoFormData.cellNo;
        this.$refs.excelCellInfoForm.resetFields();
        this.excelCellInfoFormData.cellNo = cellNoTemp;
      },
      // 重置excel中已经拖拽的考核对象数据
      resetEvlObj: function () {
        var me = this;
        if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V ||
          me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H) { // 横向/纵向考核方案可以重置考核对象
          if (me.Design.objIndex || me.Design.objCount > 0) { // 判断当前已经拖拽了考核对象
            for (var i in me.Design.rptIdxs) {
              if (me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_EVALOBJ) {
                var seq = me.Design.rptIdxs[i].seq;
                var targetCell = me.Design.spread.getActiveSheet().getCell(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
                delete me.Design.rptIdxs[seq];
                targetCell.tag('');
                targetCell.value('');
              }
            }
            me.Design.objCount = 0;
          }
        } else {
          me.$message({
            message: '单元格类型考核方案不允许重置考核对象',
            type: 'warning'
          });
        }
      },
      // 清空当前选中单元格表单数据
      clearCurFormData: function (row, col) {
        var me = this;
        if (me.excelCellInfoFormData.rowId == row && me.excelCellInfoFormData.colId == col) {
          me.clearObj(me.excelCellInfoFormData);
          var cellTmp = {
            cellNo: me.Utils.initAreaPosiLabel(row, col),
            rowId: row,
            colId: col
          };
          yufp.clone(cellTmp, me.excelCellInfoFormData);
        }
      },
      // 清除-校验所选区域是否存在考核对象类型的单元格
      checkSelectionRange: function (beginRow, endRow, beginCol, endCol) {
        var me = this;
        if (me.templateType == me.Constants.TEMPLATE_TYPE_IDX) { // 单元格类型的考核方案，不需要校验
          return true;
        }
        var currSheet = me.Design.spread.getActiveSheet();
        for (var m = beginRow, n = endRow; m <= n; m++) {
          // 行
          for (var k = beginCol, l = endCol; k <= l; k++) {
            // 列
            var currCell = currSheet.getCell(m, k);
            if (currCell.tag() && me.Design.rptIdxs[currCell.tag()].cellType == me.Constants.CELL_TYPE_EVALOBJ) {
              me.$message({ message: '考核对象类型的单元格不能清除', type: 'warning' });
              return false;
            }
          }
        }
        return true;
      },
      // 插入(前)操作
      // mode: 1行 2列;  curIndex: 当前选中行/列索引
      insertBefore: function (mode, curIndex) {
        var me = this;
        var sheet = me.Design.spread.getActiveSheet();
        if (mode == 1) {
          // 针对纵向考核方案，考核对象所在行索引+1
          if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V &&
            me.Design.objIndex != null && me.Design.objIndex >= curIndex) {
            me.Design.objIndex += 1;
          }
          for (var i in me.Design.rptIdxs) {
            if (me.Design.rptIdxs[i].rowId >= curIndex) {
              // 重置rptIdxs中对应单元格基本参数rowId/colId/cellNo
              me.Design.rptIdxs[i].rowId = me.Design.rptIdxs[i].rowId + 1;
              me.Design.rptIdxs[i].cellNo = me.Utils.initAreaPosiLabel(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
              // 由于excel组件中cell对象自动绑定了tag/value/formula数据，在添加新行/列时，对应关系保持不变，所以不需要给cell重新赋值
              // 对于公式/派生指标/得分计价权重单元格，由于添加新行/列后，cell公式内容会根据实际情况改变，所以需要依据cell的formula内容给rptIdxs的excelFormula赋值
              if (me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_FORMULA ||
                  me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_EVLIDX ||
                  me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_SVW) {
                var newCell = sheet.getCell(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
                if (newCell.formula()) {
                  me.Design.rptIdxs[i].excelFormula = newCell.formula();
                }
              }
            }
          }
        } else if (mode == 2) {
          // 针对横向考核方案，考核对象所在列索引+1
          if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H &&
            me.Design.objIndex != null && me.Design.objIndex >= curIndex) {
            me.Design.objIndex += 1;
          }
          for (var i in me.Design.rptIdxs) {
            if (me.Design.rptIdxs[i].colId >= curIndex) {
              // 重置rptIdxs中对应单元格基本参数rowId/colId/cellNo
              me.Design.rptIdxs[i].colId = me.Design.rptIdxs[i].colId + 1;
              me.Design.rptIdxs[i].cellNo = me.Utils.initAreaPosiLabel(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
              // 由于excel组件中cell对象自动绑定了tag/value/formula数据，在添加新行/列时，对应关系保持不变，所以不需要给cell重新赋值
              // 对于公式/派生指标/得分计价权重单元格，由于添加新行/列后，cell公式内容会根据实际情况改变，所以需要依据cell的formula内容给rptIdxs的excelFormula赋值
              if (me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_FORMULA ||
                  me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_EVLIDX ||
                  me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_SVW) {
                var newCell = sheet.getCell(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
                if (newCell.formula()) {
                  me.Design.rptIdxs[i].excelFormula = newCell.formula();
                }
              }
            }
          }
        }
      },
      // 插入(后)操作
      // mode: 1行 2列;  curIndex: 当前选中行/列索引
      insertAfter: function (mode, curIndex) {
        var me = this;
        var sheet = me.Design.spread.getActiveSheet();
        if (mode == 1) {
          // 针对纵向考核方案，考核对象所在行索引+1
          if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V &&
            me.Design.objIndex != null && me.Design.objIndex > curIndex) {
            me.Design.objIndex += 1;
          }
          for (var i in me.Design.rptIdxs) {
            if (me.Design.rptIdxs[i].rowId > curIndex) {
              // 重置rptIdxs中对应单元格基本参数rowId/colId/cellNo
              me.Design.rptIdxs[i].rowId = me.Design.rptIdxs[i].rowId + 1;
              me.Design.rptIdxs[i].cellNo = me.Utils.initAreaPosiLabel(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
              // 由于excel组件中cell对象自动绑定了tag/value/formula数据，在添加新行/列时，对应关系保持不变，所以不需要给cell重新赋值
              // 对于公式/派生指标/得分计价权重单元格，由于添加新行/列后，cell公式内容会根据实际情况改变，所以需要依据cell的formula内容给rptIdxs的excelFormula赋值
              if (me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_FORMULA ||
                  me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_EVLIDX ||
                  me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_SVW) {
                var newCell = sheet.getCell(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
                if (newCell.formula()) {
                  me.Design.rptIdxs[i].excelFormula = newCell.formula();
                }
              }
            }
          }
        } else if (mode == 2) {
          // 针对横向考核方案，考核对象所在列索引+1
          if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H &&
            me.Design.objIndex != null && me.Design.objIndex > curIndex) {
            me.Design.objIndex += 1;
          }
          for (var i in me.Design.rptIdxs) {
            if (me.Design.rptIdxs[i].colId > curIndex) {
              // 重置rptIdxs中对应单元格基本参数rowId/colId/cellNo
              me.Design.rptIdxs[i].colId = me.Design.rptIdxs[i].colId + 1;
              me.Design.rptIdxs[i].cellNo = me.Utils.initAreaPosiLabel(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
              // 由于excel组件中cell对象自动绑定了tag/value/formula数据，在添加新行/列时，对应关系保持不变，所以不需要给cell重新赋值
              // 对于公式/派生指标/得分计价权重单元格，由于添加新行/列后，cell公式内容会根据实际情况改变，所以需要依据cell的formula内容给rptIdxs的excelFormula赋值
              if (me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_FORMULA ||
                  me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_EVLIDX ||
                  me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_SVW) {
                var newCell = sheet.getCell(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
                if (newCell.formula()) {
                  me.Design.rptIdxs[i].excelFormula = newCell.formula();
                }
              }
            }
          }
        }
      },
      // 处理删除行/列操作
      // mode: 1行 2列; beginRow:选中行开始索引; rowCount:选中行数; beginCol:选中列开始索引; colCount:选中列数
      deleteCell: function (mode, beginRow, rowCount, beginCol, colCount) {
        var me = this;
        var sheet = me.Design.spread.getActiveSheet();
        if (mode == 1) { // 删除行
          var endRow = beginRow + rowCount - 1; // 索引号需要减1
          if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V) { // 纵向考核方案
            for (var i in me.Design.rptIdxs) {
              if (me.Design.rptIdxs[i].rowId >= beginRow && me.Design.rptIdxs[i].rowId <= endRow) { // 删除所选区域内的元素
                if (me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_EVALOBJ) {
                  me.Design.objCount -= 1;
                }
                delete me.Design.rptIdxs[i];
              } else if (me.Design.rptIdxs[i].rowId > endRow) { // 大于所选区域，更新rowId为 rowId-rowCount
                me.Design.rptIdxs[i].rowId -= rowCount;
                me.Design.rptIdxs[i].cellNo = me.Utils.initAreaPosiLabel(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
                // 公式/派生指标/得分计价权重类型的单元格，需要刷新excelFormula值
                if (me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_FORMULA ||
                    me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_EVLIDX ||
                    me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_SVW) {
                  var newCell = sheet.getCell(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
                  if (newCell.formula()) {
                    me.Design.rptIdxs[i].excelFormula = newCell.formula();
                  }
                }
              }
            }
            // 所有考核对象所在行都删除，objIndex=null;
            if (me.Design.objCount == 0) {
              me.Design.objIndex = null;
            } else if (me.Design.objIndex >= beginRow) {
              // 考核对象所在行/列索引在所选区域内
              // 需要更新objIndex，并设置所选区域下一行的 基础指标/机构参数/岗位参数/岗位/所属机构/考核对象编号rptIdxs-isExtend为null
              me.Design.objIndex = beginRow;
              for (var j in me.Design.rptIdxs) {
                if (me.Design.rptIdxs[j].rowId == me.Design.objIndex &&
                  (me.Design.rptIdxs[j].cellType == me.Constants.CELL_TYPE_IDX ||
                    me.Design.rptIdxs[j].cellType == me.Constants.CELL_TYPE_ORGPARAM ||
                    me.Design.rptIdxs[j].cellType == me.Constants.CELL_TYPE_POSTPARAM ||
                    me.Design.rptIdxs[j].cellType == me.Constants.CELL_TYPE_DUTY ||
                    me.Design.rptIdxs[j].cellType == me.Constants.CELL_TYPE_ORG ||
                    me.Design.rptIdxs[j].cellType == me.Constants.CELL_TYPE_OBJID)) {
                  me.Design.rptIdxs[j].isExtend = null;
                }
              }
            }
          } else if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H) { // 横向考核方案
            var containsEvlObj = false;
            for (var i in me.Design.rptIdxs) {
              if (me.Design.rptIdxs[i].rowId >= beginRow && me.Design.rptIdxs[i].rowId <= endRow) { // 删除所选区域内的元素
                if (!containsEvlObj && me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_EVALOBJ) {
                  containsEvlObj = true;
                }
                delete me.Design.rptIdxs[i];
              } else if (me.Design.rptIdxs[i].rowId > endRow) { // 大于所选区域，更新rowId为 rowId-rowCount
                me.Design.rptIdxs[i].rowId -= rowCount;
                me.Design.rptIdxs[i].cellNo = me.Utils.initAreaPosiLabel(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
                // 公式/派生指标/得分计价权重类型的单元格，需要刷新excelFormula值
                if (me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_FORMULA ||
                    me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_EVLIDX ||
                    me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_SVW) {
                  var newCell = sheet.getCell(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
                  if (newCell.formula()) {
                    me.Design.rptIdxs[i].excelFormula = newCell.formula();
                  }
                }
              }
            }
            if (containsEvlObj) { // 横向考核方案删除行时，当选中区域内有考核对象说明所有考核对象都被删除了，重置objIndex/objCount
              me.Design.objIndex = null;
              me.Design.objCount = 0;
            }
          } else if (me.templateType == me.Constants.TEMPLATE_TYPE_IDX) { // 单元格考核方案
            for (var i in me.Design.rptIdxs) {
              if (me.Design.rptIdxs[i].rowId >= beginRow && me.Design.rptIdxs[i].rowId <= endRow) { // 删除所选区域内的元素
                delete me.Design.rptIdxs[i];
              } else if (me.Design.rptIdxs[i].rowId > endRow) { // 大于所选区域，更新rowId为 rowId-rowCount
                me.Design.rptIdxs[i].rowId -= rowCount;
                me.Design.rptIdxs[i].cellNo = me.Utils.initAreaPosiLabel(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
                // 公式/派生指标/得分计价权重类型的单元格，需要刷新excelFormula值
                if (me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_FORMULA ||
                    me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_EVLIDX ||
                    me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_SVW) {
                  var newCell = sheet.getCell(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
                  if (newCell.formula()) {
                    me.Design.rptIdxs[i].excelFormula = newCell.formula();
                  }
                }
              }
            }
          }
        } else if (mode == 2) { // 删除列
          var endCol = beginCol + colCount - 1; // 索引号需要减1
          if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V) { // 纵向考核方案
            var containsEvlObj = false;
            for (var i in me.Design.rptIdxs) {
              if (me.Design.rptIdxs[i].colId >= beginCol && me.Design.rptIdxs[i].colId <= endCol) { // 删除所选区域内的元素
                if (!containsEvlObj && me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_EVALOBJ) {
                  containsEvlObj = true;
                }
                delete me.Design.rptIdxs[i];
              } else if (me.Design.rptIdxs[i].colId > endCol) { // 大于所选区域，更新colId为 colId-colCount
                me.Design.rptIdxs[i].colId -= colCount;
                me.Design.rptIdxs[i].cellNo = me.Utils.initAreaPosiLabel(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
                // 公式/派生指标/得分计价权重类型的单元格，需要刷新excelFormula值
                if (me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_FORMULA ||
                    me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_EVLIDX ||
                    me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_SVW) {
                  var newCell = sheet.getCell(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
                  if (newCell.formula()) {
                    me.Design.rptIdxs[i].excelFormula = newCell.formula();
                  }
                }
              }
            }
            if (containsEvlObj) { // 纵向考核方案删除列时，当选中区域内有考核对象说明所有考核对象都被删除了，重置objIndex/objCount
              me.Design.objIndex = null;
              me.Design.objCount = 0;
            }
          } else if (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H) { // 横向考核方案
            for (var i in me.Design.rptIdxs) {
              if (me.Design.rptIdxs[i].colId >= beginCol && me.Design.rptIdxs[i].colId <= endCol) { // 删除所选区域内的元素
                if (me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_EVALOBJ) {
                  me.Design.objCount -= 1;
                }
                delete me.Design.rptIdxs[i];
              } else if (me.Design.rptIdxs[i].colId > endCol) { // 大于所选区域，更新colId为 colId-colCount
                me.Design.rptIdxs[i].colId -= colCount;
                me.Design.rptIdxs[i].cellNo = me.Utils.initAreaPosiLabel(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
                // 公式/派生指标/得分计价权重类型的单元格，需要刷新excelFormula值
                if (me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_FORMULA ||
                    me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_EVLIDX ||
                    me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_SVW) {
                  var newCell = sheet.getCell(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
                  if (newCell.formula()) {
                    me.Design.rptIdxs[i].excelFormula = newCell.formula();
                  }
                }
              }
            }
            // 所有考核对象所在行都删除，objIndex=null;
            if (me.Design.objCount == 0) {
              me.Design.objIndex = null;
            } else if (me.Design.objIndex >= beginCol) {
              // 考核对象所在行/列索引在所选区域内
              // 需要更新objIndex，并设置所选区域下一行的 基础指标/机构参数/岗位参数/岗位/所属机构/考核对象编号rptIdxs-isExtend为null
              me.Design.objIndex = beginCol;
              for (var j in me.Design.rptIdxs) {
                if (me.Design.rptIdxs[j].colId == me.Design.objIndex &&
                  (me.Design.rptIdxs[j].cellType == me.Constants.CELL_TYPE_IDX ||
                    me.Design.rptIdxs[j].cellType == me.Constants.CELL_TYPE_ORGPARAM ||
                    me.Design.rptIdxs[j].cellType == me.Constants.CELL_TYPE_POSTPARAM ||
                    me.Design.rptIdxs[j].cellType == me.Constants.CELL_TYPE_DUTY ||
                    me.Design.rptIdxs[j].cellType == me.Constants.CELL_TYPE_ORG ||
                    me.Design.rptIdxs[j].cellType == me.Constants.CELL_TYPE_OBJID)) {
                  me.Design.rptIdxs[j].isExtend = null;
                }
              }
            }
          } else if (me.templateType == me.Constants.TEMPLATE_TYPE_IDX) { // 单元格考核方案
            for (var i in me.Design.rptIdxs) {
              if (me.Design.rptIdxs[i].colId >= beginCol && me.Design.rptIdxs[i].colId <= endCol) { // 删除所选区域内的元素
                delete me.Design.rptIdxs[i];
              } else if (me.Design.rptIdxs[i].colId > endCol) { // 大于所选区域，更新colId为 colId-colCount
                me.Design.rptIdxs[i].colId -= colCount;
                me.Design.rptIdxs[i].cellNo = me.Utils.initAreaPosiLabel(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
                // 公式/派生指标/得分计价权重类型的单元格，需要刷新excelFormula值
                if (me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_FORMULA ||
                    me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_EVLIDX ||
                    me.Design.rptIdxs[i].cellType == me.Constants.CELL_TYPE_SVW) {
                  var newCell = sheet.getCell(me.Design.rptIdxs[i].rowId, me.Design.rptIdxs[i].colId);
                  if (newCell.formula()) {
                    me.Design.rptIdxs[i].excelFormula = newCell.formula();
                  }
                }
              }
            }
          }
        }
      },
      // 设置列宽/行高操作
      // type 1设置行高 2设置列宽
      // curNum 选择的第一行/列的高度/宽度
      setColWidthRowHeight: function (type, curNum) {
        if (type == '1') { // 行高
          this.colWidthRowHeightTitle = '设置行高';
          this.colWidthRowHeightLabel = '高度';
        } else if (type == '2') { // 列宽
          this.colWidthRowHeightTitle = '设置列宽';
          this.colWidthRowHeightLabel = '宽度';
        }
        this.colWidthRowHeightFormData.data = curNum;
        this.colWidthRowHeightFormData.type = type;
        this.colWidthRowHeightDialogVisible = true;
      },
      // 合并-校验所选区域不存在已编辑的单元格
      checkMergeSelection: function (beginRow, rowCount, beginCol, colCount) {
        var me = this;
        var endRow = beginRow + rowCount - 1;
        var endCol = beginCol + colCount - 1;
        var sheet = me.Design.spread.getActiveSheet();
        for (var m = beginRow, n = endRow; m <= n; m++) {
          // 行
          for (var k = beginCol, l = endCol; k <= l; k++) {
            // 列
            var cell = sheet.getCell(m, k);
            if (cell.tag() && me.Design.rptIdxs[cell.tag()]) {
              me.$message({ message: '所选区域包含已编辑的单元格，需要清除内容后再合并', type: 'warning' });
              return false;
            }
          }
        }
        return true;
      },
      // 处理隐藏/取消隐藏操作
      hideOrShowRowCols: function (selectionModule, visibleFlag) {
        var params = {};
        params.selectionModule = selectionModule;
        params.visibleFlag = visibleFlag;
        params.utils = this.Utils;
        this.$emit('hide-or-show-row-cols', params);
      },
      // 设置行高/列宽dialog-设置按钮
      colWidthRowHeightSaveFn: function () {
        var me = this;
        var validate = false;
        me.$refs.colWidthRowHeightForm.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          return;
        }
        var curNum = me.colWidthRowHeightFormData.data;
        var currSheet = me.spread.getActiveSheet();
        var selectionModules = currSheet.getSelections();
        if (me.colWidthRowHeightFormData.type == '1') { // 设置行高
          var offset = 0;
          while (offset < selectionModules.length) {
            var rowTemp = selectionModules[offset].row;
            var rowCount = selectionModules[offset].rowCount;
            for (var i = 0; i < rowCount; ++i) {
              currSheet.setRowHeight(rowTemp + i, curNum);
            }
            ++offset;
          }
        } else if (me.colWidthRowHeightFormData.type == '2') { // 设置列宽
          var offset = 0;
          while (offset < selectionModules.length) {
            var colTemp = selectionModules[offset].col;
            var colCount = selectionModules[offset].colCount;
            for (var i = 0; i < colCount; ++i) {
              currSheet.setColumnWidth(colTemp + i, curNum);
            }
            ++offset;
          }
        }
        me.colWidthRowHeightDialogVisible = false;
      },
      // 设置行高/列宽dialog-取消按钮
      colWidthRowHeightCancelFn: function () {
        this.colWidthRowHeightFormData.data = 0;
        this.colWidthRowHeightFormData.type = '';
        this.colWidthRowHeightDialogVisible = false;
      }
    },
    watch: {
      'excelCellInfoFormData.cellType': function (val) { // 监听单元格类型字段，为空时，更新cellInfoFormData
        var me = this;
        if (val && // 选择了单元格类型
          (!me.excelCellInfoFormData.seq || // 当前单元格未编辑
          (me.excelCellInfoFormData.seq && me.Design.rptIdxs[me.excelCellInfoFormData.seq].cellType != val)) // 编辑过的单元格重新修改类型
        ) {
          var currRow = me.Design._SelectionModule.get('positionX') == ''
            ? 0 : me.Design._SelectionModule.get('positionX');
          var currCol = me.Design._SelectionModule.get('positionY') == ''
            ? 0 : me.Design._SelectionModule.get('positionY');
          var cellTmp = {
            cellNo: me.Utils.initAreaPosiLabel(currRow, currCol),
            rowId: currRow,
            colId: currCol
          };
          var seqTmp = me.excelCellInfoFormData.seq; // 备份seq值
          var rptIdxTmp = me.RptIdxInfo.newInstance(val);
          rptIdxTmp.seq = seqTmp;
          yufp.clone(cellTmp, rptIdxTmp);
          yufp.clone(rptIdxTmp, me.excelCellInfoFormData);
          // 基础指标/公式/派生指标/机构参数/岗位参数/得分计价权重/岗位/所属机构/考核对象编号类型时，横/纵向考核方案，需要额外给evlObjId赋值
          if ((val == me.Constants.CELL_TYPE_IDX || val == me.Constants.CELL_TYPE_FORMULA ||
               val == me.Constants.CELL_TYPE_EVLIDX || val == me.Constants.CELL_TYPE_ORGPARAM ||
               val == me.Constants.CELL_TYPE_POSTPARAM || val == me.Constants.CELL_TYPE_SVW ||
               val == me.Constants.CELL_TYPE_DUTY || val == me.Constants.CELL_TYPE_ORG ||
               val == me.Constants.CELL_TYPE_OBJID) &&
            (me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_V || me.templateType == me.Constants.TEMPLATE_TYPE_IDXCOL_H)) {
            me.excelCellInfoFormData.evlObjId = me.Design.getEvlObjIdFromRptIdxs(currRow, currCol);
          }
        }
      }
    }
  });
}(Vue, yufp.$, 'yufp-scheme-excel'));