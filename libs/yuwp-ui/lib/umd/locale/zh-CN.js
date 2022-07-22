(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('@/locale/zh-CN', ['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.YUFPWP.lang = global.YUFPWP.lang || {}; 
    global.YUFPWP.lang.zhCN = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  exports.__esModule = true;
  exports.default = {
    el: {
      autocomplete: {
        getDataError: '组件数据必须数组'
      },
      breadcrumb: {
        noYufpRouter: 'yufp.router not found!'
      },
      carousel: {
        indexMustInteger: '[Element Warn][Carousel]index must be an integer.'
      },
      countdown: {
        error: '结束时间已过期'
      },
      linkageselect: {
        levelError: '联动层级属性值需大于0！'
      },
      notification: {
        btnOK: '确定'
      },
      colorpicker: {
        confirm: '确定',
        clear: '清空'
      },
      datepicker: {
        now: '此刻',
        today: '今天',
        cancel: '取消',
        clear: '清空',
        confirm: '确定',
        selectDate: '选择日期',
        selectTime: '选择时间',
        startDate: '开始日期',
        startTime: '开始时间',
        endDate: '结束日期',
        endTime: '结束时间',
        prevYear: '前一年',
        nextYear: '后一年',
        prevMonth: '上个月',
        nextMonth: '下个月',
        year: '年',
        month1: '1 月',
        month2: '2 月',
        month3: '3 月',
        month4: '4 月',
        month5: '5 月',
        month6: '6 月',
        month7: '7 月',
        month8: '8 月',
        month9: '9 月',
        month10: '10 月',
        month11: '11 月',
        month12: '12 月',
        // week: '周次',
        weeks: {
          sun: '日',
          mon: '一',
          tue: '二',
          wed: '三',
          thu: '四',
          fri: '五',
          sat: '六'
        },
        months: {
          jan: '一月',
          feb: '二月',
          mar: '三月',
          apr: '四月',
          may: '五月',
          jun: '六月',
          jul: '七月',
          aug: '八月',
          sep: '九月',
          oct: '十月',
          nov: '十一月',
          dec: '十二月'
        }
      },
      combotable: {
        placeholder: '请选择'
      },
      combotree: {
        placeholder: '请选择'
      },
      xcascader: {
        placeholder: '请选择'
      },
      select: {
        loading: '加载中',
        noMatch: '无匹配数据',
        noData: '无数据',
        placeholder: '请选择'
      },
      cascader: {
        noMatch: '无匹配数据',
        loading: '加载中',
        placeholder: '请选择',
        noData: '暂无数据'
      },
      rate: {
        texts1: '极差',
        texts2: '失望',
        texts3: '一般',
        texts4: '满意',
        texts5: '惊喜'
      },
      slider: {
        noStep: '[Element Warn][Slider]step should not be 0.'
      },
      steps: {
        finishStatus: 'finish',
        processStatus: 'process'
      },
      switch: {
        onText: 'ON',
        offText: 'OFF'
      },
      pagination: {
        goto: '前往',
        pagesize: '条/页',
        total: '共 {total} 条',
        pageClassifier: '页'
      },
      messagebox: {
        title: '提示',
        confirm: '确定',
        cancel: '取消',
        error: '输入的数据不合法!'
      },
      upload: {
        delete: '删除',
        preview: '查看图片',
        continue: '继续上传',
        defaultFileList: 'default-file-list is renamed to file-list.',
        showUploadList: 'show-upload-list is renamed to show-file-list.',
        thumbnailMode: 'thumbnail-mode has been deprecated, you can implement the same effect according to this case: http://element.eleme.io/#/zh-CN/component/upload#yong-hu-tou-xiang-shang-chuan'
      },
      xdialog: {
        cancelText: '取消',
        sureText: '确认'
      },
      xformq: {
        btnSearchText: '搜索',
        btnResetText: '重置',
        btnMoreText: '高级'
      },
      xselect: {
        noValue: '值不存在',
        maximumLength: '设置的item超出下拉选项',
        noValueOrNotNumber: '值不存在或不是数字'
      },
      norepeat: {
        dateTypeError1: '防重复提交控制时间类型设置错误！',
        dateTypeError2: '防重复提交控制时间需为数字,且大于0！'
      },
      table: {
        emptyText: '暂无数据',
        confirmFilter: '筛选',
        resetFilter: '重置',
        clearFilter: '全部',
        sumText: '合计',
        order: '序号',
        failure: '表格验证未通过！',
        fixedError: 'the value of fixed can only be true, false, "left" or "right"',
        layoutNotEvent: 'Table Layout don\'t have event {event}.',
        noTableLayout: 'table is required for Table Layout',
        noStoreLayout: 'store is required for Table Layout',
        noDataUrl: 'ElTableX dataUrl参数未配置',
        saveUTraceFailure: '获取基础信息失败!',
        saveUTraceNoUpdate: '没有变更数据',
        noUTrace: '没有开启表格小U监控',
        uTraceNoParam: '小U留痕 uPkValue参数未配置',
        uTraceTableCol1: '序号',
        uTraceTableCol2: '被修改的域',
        uTraceTableCol3: '修改前',
        uTraceTableCol4: '修改后',
        uTraceTableCol5: '修改人',
        uTraceTableCol6: '修改时间',
        uTraceTableDialogBtn: '关闭',
        uTraceMessage: '{time}: 被用户{usrId}从[{mOldDispV}]修改为[{mNewDispV}]'
      },
      xtablex: {
        noDataUrl: 'ElTableX dataUrl参数未配置',
        headerIndex: '序号'
      },
      tree: {
        emptyText: '暂无数据',
        noFilterNodeMethodFn: '[Tree] filterNodeMethod is required when filter',
        noSetCheckedNodes: '[Tree] nodeKey is required in setCheckedNodes',
        noSetCheckedKeys: '[Tree] nodeKey is required in setCheckedKeys',
        noGetCurrentKey: '[Tree] nodeKey is required in getCurrentKey',
        noSetCurrentKey: '[Tree] nodeKey is required in setCurrentKey',
        noSetCurrentNode: '[Tree] nodeKey is required in setCurrentNode',
        expanded: '展开',
        notExpanded: '收缩'
      },
      transfer: {
        noMatch: '无匹配数据',
        noData: '无数据',
        titles: ['列表 1', '列表 2'],
        filterPlaceholder: '请输入搜索内容',
        noCheckedFormat: '共 {total} 项',
        hasCheckedFormat: '已选 {checked}/{total} 项'
      },
      form: {
        search: '查询',
        reset: '重置',
        collapseText: '收起',
        expandText: '更多',
        noResetFieldsFn: '[Element Warn][Form]model is required for resetFields to work.',
        noModel: '[Element Warn][Form]model is required for validate to work!.',
        validateFieldMustValidPropString: 'must call validateField with valid prop string!',
        noDataUrl: 'YuXform dataUrl参数未配置',
        saveUTraceFailure: '获取基础信息失败!',
        saveUTraceNoUpdate: '没有变更数据',
        uTraceDialogTitle: '修改痕迹信息',
        noUTrace: '没有开启表单小U监控',
        uTraceNoParam: '小U留痕 uPkValue参数未配置',
        uTraceTableCol1: '序号',
        uTraceTableCol2: '被修改的域',
        uTraceTableCol3: '修改前',
        uTraceTableCol4: '修改后',
        uTraceTableCol5: '修改人',
        uTraceTableCol6: '修改时间',
        uTraceTableDialogBtn: '关闭'
      },
      image: {
        error: '加载失败'
      },
      panel: {
        collaspaseText: '高级查询'
      }
    }
  };
  module.exports = exports['default'];
});