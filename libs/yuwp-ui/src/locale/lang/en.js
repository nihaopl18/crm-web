export default {
  el: {
    autocomplete: {
      getDataError: 'Component data must be an array.'
    },
    breadcrumb: {
      noYufpRouter: 'yufp.router method does not exist.'
    },
    carousel: {
      indexMustInteger: '[Element Warn][Carousel]index must be an integer.'
    },
    linkageselect: {
      levelError: 'Property value of linkage level must be greater than 0!'
    },
    notification: {
      btnOK: 'ok'
    },
    colorpicker: {
      confirm: 'ok',
      clear: 'clear'
    },
    datepicker: {
      now: 'Now',
      today: 'Today',
      cancel: 'Cancel',
      clear: 'Clear',
      confirm: 'OK',
      selectDate: 'Select date',
      selectTime: 'Select time',
      startDate: 'Start Date',
      startTime: 'Start Time',
      endDate: 'End Date',
      endTime: 'End Time',
      prevYear: 'Previous Year',
      nextYear: 'Next Year',
      prevMonth: 'Previous Month',
      nextMonth: 'Next Month',
      year: '',
      month1: 'January',
      month2: 'February',
      month3: 'March',
      month4: 'April',
      month5: 'May',
      month6: 'June',
      month7: 'July',
      month8: 'August',
      month9: 'September',
      month10: 'October',
      month11: 'November',
      month12: 'December',
      // week: '周次',
      weeks: {
        sun: 'Sun',
        mon: 'Mon',
        tue: 'Tue',
        wed: 'Wed',
        thu: 'Thu',
        fri: 'Fri',
        sat: 'Sat'
      },
      months: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'May',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Aug',
        sep: 'Sep',
        oct: 'Oct',
        nov: 'Nov',
        dec: 'Dec'
      }
    },
    combotable: {
      placeholder: 'Select'
    },
    combotree: {
      placeholder: 'Select'
    },
    xcascader: {
      placeholder: 'Select'
    },
    select: {
      loading: 'Loading',
      noMatch: 'No matching data.',
      noData: 'No data.',
      placeholder: 'Select'
    },
    cascader: {
      noMatch: 'No matching data.',
      loading: 'Loading',
      placeholder: 'Select',
      noData: 'No data.'
    },
    rate: {
      texts1: 'oops',
      texts2: 'disappointed',
      texts3: 'normal',
      texts4: 'good',
      texts5: 'great'
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
      goto: 'go to',
      pagesize: 'pieces/page',
      total: '{total} piece(s) of data',
      pageClassifier: 'page'
    },
    messagebox: {
      title: 'Prompt',
      confirm: 'OK',
      cancel: 'cancel',
      error: 'Invaild data!'
    },
    upload: {
      delete: 'delete',
      preview: 'view images',
      continue: 'continue to upload',
      defaultFileList: 'default-file-list is renamed to file-list.',
      showUploadList: 'show-upload-list is renamed to show-file-list.',
      thumbnailMode: 'thumbnail-mode has been deprecated, you can implement the same effect according to this case: http://element.eleme.io/#/zh-CN/component/upload#yong-hu-tou-xiang-shang-chuan'
    },
    xdialog: {
      cancelText: 'cancel',
      sureText: 'confirm'
    },
    xformq: {
      btnSearchText: 'search',
      btnResetText: 'reset',
      btnMoreText: 'Advanced options'
    },
    xselect: {
      noValue: 'The value does not exist.',
      maximumLength: 'The item value set exceeds the drop-down option value',
      noValueOrNotNumber: 'The value does not exist or is not a number.'
    },
    norepeat: {
      dateTypeError1: 'Wrong type setting of control time to prevent repeated submission!',
      dateTypeError2: 'The control time to prevent repeated submission must be a number and greater than 0!'
    },
    table: {
      emptyText: 'No data.',
      confirmFilter: 'Filter',
      resetFilter: 'reset',
      clearFilter: 'all',
      sumText: 'total',
      order: 'line number',
      failure: 'Form validation failed!',
      fixedError: 'the value of fixed can only be true, false, "left" or "right"',
      layoutNotEvent: 'Table Layout don\'t have event {event}.',
      noTableLayout: 'table is required for Table Layout',
      noStoreLayout: 'store is required for Table Layout',
      noDataUrl: 'ElTableX dataUrl parameter is not configured',
      saveUTraceFailure: 'Failed to get basic information!',
      saveUTraceNoUpdate: 'No change data',
      noUTrace: 'Utrace monitoring is not enabled for this table',
      uTraceNoParam: 'utrace uPkValue parameter is not configured',
      uTraceTableCol1: 'line number',
      uTraceTableCol2: 'Modified domain',
      uTraceTableCol3: 'Before modification',
      uTraceTableCol4: 'After modification',
      uTraceTableCol5: 'Modifier',
      uTraceTableCol6: 'Modification time',
      uTraceTableDialogBtn: 'close',
      uTraceMessage: '{time}: modified by user{usrId} from [{mOldDispV}] to [{mNewDispV}]'
    },
    xtablex: {
      noDataUrl: 'ElTableX dataUrl parameter is not configured',
      headerIndex: 'line number'
    },
    tree: {
      emptyText: 'No data.',
      noFilterNodeMethodFn: '[Tree] filterNodeMethod is required when filter',
      noSetCheckedNodes: '[Tree] nodeKey is required in setCheckedNodes',
      noSetCheckedKeys: '[Tree] nodeKey is required in setCheckedKeys',
      noGetCurrentKey: '[Tree] nodeKey is required in getCurrentKey',
      noSetCurrentKey: '[Tree] nodeKey is required in setCurrentKey',
      noSetCurrentNode: '[Tree] nodeKey is required in setCurrentNode',
      expanded: 'expand',
      notExpanded: 'contract'
    },
    transfer: {
      noMatch: 'No matching data.',
      noData: 'No data.',
      titles: ['List 1', 'List 2'],
      filterPlaceholder: 'Please enter the search content',
      noCheckedFormat: '{total} items',
      hasCheckedFormat: 'Selected {checked}/{total} items'
    },
    form: {
      search: 'search',
      reset: 'reset',
      collapseText: 'collapse',
      expandText: 'expand',
      noResetFieldsFn: '[Element Warn][Form]model is required for resetFields to work.',
      noModel: '[Element Warn][Form]model is required for validate to work!.',
      validateFieldMustValidPropString: 'must call validateField with valid prop string!',
      noDataUrl: 'YuXform dataUrl parameter is not configured',
      saveUTraceFailure: 'Failed to get basic information!',
      saveUTraceNoUpdate: 'No change data',
      uTraceDialogTitle: 'Modify trace information',
      noUTrace: 'Utrace monitoring is not enabled for this form',
      uTraceNoParam: 'utrace uPkValue parameter is not configured',
      uTraceTableCol1: 'line number',
      uTraceTableCol2: 'Modified domain',
      uTraceTableCol3: 'before modification',
      uTraceTableCol4: 'after modification',
      uTraceTableCol5: 'Modifier',
      uTraceTableCol6: 'Modification time',
      uTraceTableDialogBtn: 'close'
    },
    panel: {
      collaspaseText: 'More search'
    }
  }
};
