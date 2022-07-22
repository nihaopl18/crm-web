/**
 * [一个调度任务周期表达式编辑面板]
 * @param  {[type]} vue  [description]
 * @param  {[type]} $    [description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
(function (vue, $, name) {
  var tabs = [{
    name: 'second',
    label: '秒'
  }, {
    name: 'minute',
    label: '分钟'
  }, {
    name: 'hour',
    label: '小时'
  }, {
    name: 'day',
    label: '日'
  }, {
    name: 'month',
    label: '月'
  }, {
    name: 'week',
    label: '周'
  }, {
    name: 'year',
    label: '年'
  }];
    // cron表达式注册
  vue.component(name, {
    template: '<div>\
            <el-input :disabled="disabled" :size="size" readonly placeholder="cron表达式"\
                @focus="dialogVisible = true" v-model="selectedVal"></el-input>\
            <el-dialog-x :visible.sync= "dialogVisible"\
                height="500px" width = "1100px" @open="openCronEditor">\
                <el-tabs v-model="activeName">\
                   <el-tab-pane v-for="(time,index) in times" :key="time.name" :label="time.label" :name="time.name">\
                       <el-radio-group v-model="time.value" @change="radioChange" class="radiogroup">\
                           <el-radio label="first" size="small">{{time.label}} 允许的通配符[, - * /]</el-radio>\
                           <el-radio label="second" size="small">周期从\
                               <el-input-number v-model="time.start1" size="small" :min="1" :max="time.max" @change="handleChange1"></el-input-number>-\
                               <el-input-number v-model="time.end1" size="small" :min="2" :max="time.max" @change="handleChange2">\
                               </el-input-number>{{time.label}}\
                           </el-radio>\
                          <el-radio v-if="index <5" label="third" size="small">从\
                               <el-input-number v-model="time.start2" size="small" :min="0" :max="time.max" @change="handleChange3">\
                               </el-input-number>{{time.label}}开始， 每\
                               <el-input-number v-model="time.end2" size="small" :min="1" :max="time.max" @change="handleChange4">\
                               </el-input-number>{{time.label}}执行一次\
                           </el-radio>\
                           <el-radio v-if="index == 3" label="five" size="small">每月\
                               <el-input-number v-model="time.start3" size="small" :min="1" :max="time.max" @change="nearWeekChange">号最近的那个工作{{time.label}}\
                               </el-input-number>\
                           </el-radio>\
                           <el-radio v-if="index == 3" label="six" size="small">本月最后一天</el-radio>\
                           <el-radio v-if="index ==5" label="seven" size="small">第\
                               <el-input-number v-model="time.start4" size="small" :min="1" :max="time.max" @change="handleChange5">\
                               </el-input-number>{{time.label}} 的星期\
                               <el-input-number v-model="time.end4" size="small" :min="1" :max="time.max" @change="handleChange6">\
                               </el-input-number>\
                           </el-radio>\
                           <el-radio v-if="index ==5" label="eight" size="small">本月最后一个星期\
                               <el-input-number v-model="time.start5" size="small" :min="1" :max="time.max" @change="lastWeekChange">\
                               </el-input-number>\
                           </el-radio>\
                           <el-radio v-if="index>4" label="nine" size="small">不指定\
                           </el-radio>\
                           <el-radio v-if="index !=6" label="four" size="small">指定\
                           </el-radio>\
                       </el-radio-group>\
                       <el-checkbox-group v-if="index !=6" class="timeList" v-model="time.box" @change="listChange">\
                           <el-checkbox v-for="item in time.list" :label="item" :key="item" size="small">\
                           </el-checkbox>\
                       </el-checkbox-group>\
                   </el-tab-pane>\
               </el-tabs>\
               <div class="exForm">\
                    <el-form ref="form" :model="form" label-width="80px">\
                        <el-row v-for="row in fields" :key="row" :gutter="10">\
                            <el-col v-for="i in row.fields" v-show="i.hidden !==true" :key="i" :span="24/row.columnCount">\
                                <el-form-item :label="i.label" :label-width="row.labelWidth">\
                                    <el-input :type="i.type" :rows="i.rows" v-model="form[i.field]" :size="i.size"></el-input>\
                                </el-form-item>\
                            </el-col>\
                        </el-row>\
                    </el-form>\
               </div>\
               <div slot="footer" class="dialog-footer"  align="center">\
                    <el-button type="primary" @click="confirmFn">确 定</el-button>\
                </div>\
            </el-dialog-x>\
        </div>',
    props: {
      // 输入框属性
      disabled: Boolean,
      size: String,
      rawValue: String,
      value: {
        required: true
      },
      params: Object
    },
    data: function () {
      return this.initData();
    },
    created: function () {
      this.selectedVal = this.rawValue ? this.rawValue : this.value;
    },
    watch: {
      value: function (val) {
        this.selectedVal = val;
      },
      rawValue: function (val) {
        this.selectedVal = val;
      }
    },
    methods: {
      /**
             * [openCronEditor 打开dialog时会回调该方法]
             * @return {[type]} [description]
             */
      openCronEditor: function () {
        this.$nextTick(function () {
          this.initEl();
        });
        this.$nextTick(function () {
          this.computeTime();
        });
      },
      /**
             * [initEl 初始表达式]
             * @return {[type]} [description]
             */
      initEl: function () {
        if (this.selectedVal) {
          var list = this.selectedVal.split(' ');
          var model = this.form;
          for (var i = 0; i < list.length; i++) {
            model[tabs[i].name] = list[i];
          }
          model.crons = this.selectedVal;
        } else {
          var times = this.times;
          for (var i = 0; i < times.length; i++) {
            this.changeEl(times[i].value, times[i].name);
          }
          this.updateEl();
        }
      },
      /**
             * [computeTime 调用后台计算最近五次的时间]
             * @return {[type]} [description]
             */
      computeTime: function () {
        var me = this;
        var fm = me.form;
        yufp.service.request({
          url: backend.appOcaService + '/api/util/crons',
          method: 'get',
          data: {
            crons: fm.crons,
            count: 5
          },
          callback: function (code, message, response) {
            me.form.counts = '';
            if (response != null && response.data != null) {
              var data = response.data;
              for (var i = 0; i < data.length; i++) {
                me.form.counts += data[i] + '\n';
              }
              if (data.length > 0) {
                me.$message('请求成功!');
              }
            } else {
              me.$message('不正确的表达式');
            }
          }
        });
      },
      sortNumber: function (a, b) {
        return a - b;
      },
      getIndexByName: function (name) {
        for (var i = 0; i < tabs.length; i++) {
          if (tabs[i].name == name) {
            return i;
          }
        }
      },
      updateEl: function () {
        var me = this;
        var fm = me.form;
        fm.crons = '';
        for (var i = 0; i < tabs.length; i++) {
          if (fm[tabs[i].name] && fm[tabs[i].name] != '') {
            if (i == 0) {
              fm.crons += fm[tabs[i].name];
            } else {
              fm.crons += ' ' + fm[tabs[i].name];
            }
          }
        }
        me.form = fm;
      },
      changeEl: function (label, time) {
        var me = this;
        var fm = me.form;
        var index = me.getIndexByName(time) || 0;
        if (label == 'first') {
          // 每秒，匹配*
          fm[time] = '*';
        } else if (label == 'second') {
          var start = me.times[index].start1;
          var end = me.times[index].end1;
          fm[time] = start + '-' + end;
        } else if (label == 'third') {
          // 循环
          var start = me.times[index].start2;
          var end = me.times[index].end2;
          fm[time] = start + '/' + end;
        } else if (label == 'four') {
          // 指定
          var checkList = me.times[index].box;
          checkList.sort(me.sortNumber);
          var tmp = '';
          for (var i = 0; i < checkList.length; i++) {
            if (i == 0) {
              tmp += '' + checkList[i];
            } else {
              tmp += ',' + checkList[i];
            }
          }
          fm[time] = tmp;
        } else if (label == 'five') {
          var value = me.times[index].start3;
          value += 'W';
          fm[time] = value;
        } else if (label == 'six') {
          fm[time] = 'L';
        } else if (label == 'seven') {
          var start = me.times[index].start4;
          var end = me.times[index].end4;
          fm[time] = start + '#' + end;
        } else if (label == 'eight') {
          var start = me.times[index].start5;
          fm[time] = start + 'L';
        } else if (label == 'nine') {
          if (time == 'week') {
            fm[time] = '?';
          } else {
            fm[time] = '';
          }
        }
        me.form = fm;
      },
      changeExpression: function (label) {
        var me = this;
        this.$nextTick(function () {
          me.changeEl(label, me.activeName);
        });
        this.$nextTick(function () {
          me.updateEl();
        });
        this.$nextTick(function () {
          me.computeTime();
        });
      },
      handleChange1: function (value) {
        this.changeExpression('second');
      },
      handleChange2: function (value) {
        this.changeExpression('second');
      },
      handleChange3: function (value) {
        this.changeExpression('third');
      },
      handleChange4: function (value) {
        this.changeExpression('third');
      },
      handleChange5: function (value) {
        this.changeExpression('seven');
      },
      handleChange6: function (value) {
        this.changeExpression('seven');
      },
      listChange: function (event) {
        if (this.radio == 'four') {
          this.changeExpression('four');
        }
      },
      nearWeekChange: function (value) {
        this.changeExpression('five');
      },
      lastWeekChange: function (value) {
        this.changeExpression('eight');
      },
      radioChange: function (label) {
        this.radio = label;
        this.changeExpression(label);
      },
      /**
             * [confirmFn 确认反现事件]
             * @return {[type]} [description]
             */
      confirmFn: function () {
        var me = this;
        var model = me.form;
        this.$emit('input', model.crons);
        this.$emit('select-fn', model);
        this.$nextTick(function () {
          me.selectedVal = model.crons;
        });
        this.dialogVisible = false;
      },
      /**
             * [initData 初始化数据]
             * @return {[type]} [description]
             */
      initData: function () {
        var times = [];
        for (var i = 0; i < 7; i++) {
          var time = {};
          time.name = tabs[i].name;
          time.label = tabs[i].label;
          time.start1 = '';
          time.end1 = '';
          time.start2 = '';
          time.end2 = '';
          time.start3 = '';
          time.start5 = '';
          time.start4 = '';
          time.end4 = '';
          if (i == 6) {
            time.value = 'nine';
          } else {
            time.value = 'first';
          }
          time.box = [];
          var j = 0;
          if (i > 2) {
            j = 1;
          }
          if (i == 0 || i == 1) {
            time.max = 59;
          } else if (i == 2) {
            time.max = 23;
          } else if (i == 3) {
            time.max = 31;
          } else if (i == 4) {
            time.max = 12;
          } else if (i == 5) {
            time.max = 7;
          }
          var list = [];
          for (; j <= time.max; j++) {
            list.push('' + j);
          }
          time.list = list;
          times.push(time);
        }

        return {
          selectedVal: '',
          dialogVisible: false,
          activeName: 'second',
          times: times,
          radio: '',
          fields: [{
            columnCount: 8,
            labelWidth: '40px',
            fields: [{
              label: '秒',
              field: 'second',
              type: 'input',
              size: 'mini'
            }, {
              label: '分钟',
              field: 'minute',
              type: 'input',
              size: 'mini'
            }, {
              label: '小时',
              field: 'hour',
              type: 'input',
              size: 'mini'
            }, {
              label: '日',
              field: 'day',
              type: 'input',
              size: 'mini'
            }, {
              label: '月',
              field: 'month',
              type: 'input',
              size: 'mini'
            }, {
              label: '星期',
              field: 'week',
              type: 'input',
              size: 'mini'
            }, {
              label: '年',
              field: 'year',
              type: 'input',
              size: 'mini'
            }]
          }, {
            columnCount: 1,
            labelWidth: '100px',
            fields: [{
              label: 'Cron表达式',
              field: 'crons',
              type: 'input',
              size: 'mini'
            }, {
              label: '最近五次',
              field: 'counts',
              type: 'textarea',
              rows: 5
            }]
          }],
          form: {
            second: '',
            minute: '',
            hour: '',
            day: '',
            month: '',
            week: '',
            year: '',
            crons: '',
            counts: ''
          }
        };
      }
    }
  });
}(Vue, yufp.$, 'yufp-cron-editor'));