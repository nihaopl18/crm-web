/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-06 15:41:53
 * @update by:
 * @description:
 */
(function (vue, $, name) {
  // 日历-星期展示组件
  vue.component(name, {
    template: '<yu-xdialog title="新增工作报告" width="800px" :visible.sync="reportVisible" :before-close="handleClose" top="5%">\
    <div class="report-add">\
      <div class="step-box">\
        <div class="step-item">\
          <div v-if="stepActive === 1" :class="[stepActive === 1? \'active\' : \'\']">1</div>\
          <div v-else class="el-icon-check finish"></div>\
          <p  :class="[stepActive === 1? \'active\' : \'\']">选择模板</p>\
        </div>\
        <div class="line"></div>\
        <div class="step-item">\
          <div  :class="[stepActive === 2? \'active\' : \'\']">2</div>\
          <p  :class="[stepActive === 2? \'active\' : \'\']">填写内容</p>\
        </div>\
      </div>\
      <div v-if="stepActive === 1" class="model-container">\
        <ul>\
          <li v-for="model in models" :key="model.key" :class="activeKey === model.key ? \'active\' : \'\'">\
            <p class="title">{{ model.name }}</p>\
            <p class="description">{{ model.description }}</p>\
          </li>\
        </ul>\
      </div>\
      <div class="formBox" v-if="stepActive === 2">\
        <yu-form ref="refReportForm" label-position="top" :model="reportformdata" :rules="reportRules">\
        <yu-row :gutter="20">\
          <yu-col :span="12">\
            <yu-form-item label="类型" prop="type">\
              <yu-select v-model="reportformdata.type" placeholder="请选择">\
                <yu-option v-for="item in reportTypes" :key="item.key" :label="item.value" :value="item.value"></yu-option>\
              </yu-select>\
            </yu-form-item>\
          </yu-col>\
          <yu-col :span="12">\
            <yu-form-item label="日期" prop="date">\
              <yu-date-picker v-model="reportformdata.date" type="date" placeholder="选择日期" :picker-options="pickerOptions0" style="width: 100%"></yu-date-picker>\
            </yu-form-item>\
          </yu-col>\
          <yu-col :span="24">\
            <yu-form-item label="工作内容" prop="workContent">\
              <yu-row :gutter="20">\
                <yu-col :span="isCustomerTouch ? 4 : 24">\
                  <yu-checkbox v-model="isCustomerTouch">客户接触</yu-checkbox>\
                </yu-col>\
                <yu-col :span="20" v-if="isCustomerTouch">\
                  <yu-form label-position="top" v-model="customerTouchformdata">\
                    <yu-row :gutter="20">\
                      <yu-col :span="12">\
                        <yu-form-item label="接触类型">\
                          <yu-select v-model="customerTouchformdata.type" placeholder="请选择">\
                            <yu-option v-for="item in touchTypes" :key="item.key" :label="item.value" :value="item.value"></yu-option>\
                          </yu-select>\
                        </yu-form-item>\
                      </yu-col>\
                      <yu-col :span="12">\
                        <yu-form-item label="接触目的">\
                          <yu-select v-model="customerTouchformdata.type" placeholder="请选择">\
                            <yu-option v-for="item in touchProperties" :key="item.key" :label="item.value" :value="item.value"></yu-option>\
                          </yu-select>\
                        </yu-form-item>\
                      </yu-col>\
                      <yu-col :span="24">\
                        <yu-form-item label="产品">\
                          <yu-input v-model="customerTouchformdata.productName"></yu-input>\
                        </yu-form-item>\
                      </yu-col>\
                      <yu-col :span="24">\
                        <yu-form-item label="接触反馈">\
                        <yu-input v-model="customerTouchformdata.feedback"></yu-input>\
                        </yu-form-item>\
                      </yu-col>\
                    </yu-row>\
                  </yu-form>\
                </yu-col>\
                <yu-col :span="24">\
                  <yu-checkbox v-model="isMeetting">会议</yu-checkbox>\
                </yu-col>\
                <yu-col :span="24">\
                  <yu-checkbox v-model="isTrain">培训</yu-checkbox>\
                </yu-col>\
                <yu-col :span="24">\
                  <yu-checkbox v-model="isStudy">研读</yu-checkbox>\
                </yu-col>\
                <yu-col :span="24">\
                  <yu-checkbox v-model="isOther">其他</yu-checkbox>\
                </yu-col>\
              </yu-row>\
            </yu-form-item>\
          </yu-col>\
          <yu-col :span="24">\
            <yu-form-item label="" prop="otherContent">\
              <yu-input type="textarea" :rows="2" :account="true" placeholder="请输入内容详情" v-model="reportformdata.detail"></yu-input>\
            </yu-form-item>\
          </yu-col>\
          <yu-col :span="24">\
            <yu-form-item label="后续工作计划" prop="workPlan">\
              <yu-input type="textarea" :rows="2" :account="true" placeholder="请输入后续工作计划" v-model="reportformdata.detail"></yu-input>\
            </yu-form-item>\
          </yu-col>\
          <yu-col :span="24">\
            <yu-form-item label="附件">\
              <yu-upload\
                class="upload-demo"\
                action="https://jsonplaceholder.typicode.com/posts/"\
                :on-preview="handlePreview"\
                :on-remove="handleRemove"\
                :on-timeout="handleTimeout"\
                :timeout="100"\
                :file-list="fileList">\
                <yu-button size="small" type="primary">点击上传</yu-button>\
                <div slot="tip" class="el-upload__tip">支持word、pdf、jpg、docx格式文件</div>\
              </yu-upload>\
            </yu-form-item>\
          </yu-col>\
        </yu-row>\
        </yu-form>\
      </div>\
    </div>\
    <span slot="footer" class="dialog-footer">\
      <yu-button @click="handleClose">取 消</yu-button>\
      <yu-button v-if="stepActive === 1" type="primary" @click="nextStep">下一步</yu-button>\
      <yu-button v-else type="primary" @click="saveFn">保存</yu-button>\
    </span>\
  </yu-xdialog>',
    props: {
      reportVisible: {
        type: Boolean,
        default: false
      },
      selectDate: String
    },
    data: function () {
      return {
        options: [],
        reportformdata: {
          workContent: [],
          date: '',
          type: '',
          workPlan: '',
          otherContent: ''
        },
        customerTouchformdata: {},
        stepActive: 1,
        activeKey: '0',
        models: [
          {
            name: '默认模板',
            key: '0',
            description: '模板描述，地点，参与人员等'
          },
          {
            name: '默认模板1',
            key: '1',
            description: '包含的模板内容，地点，参与人员等'
          },
          {
            name: '默认模板2',
            key: '2',
            description: '包含的模板内容，地点，参与人员等'
          }
        ],
        reportTypes: yufp.lookup.find('WORKREPORT_TYPES'),
        touchTypes: yufp.lookup.find('TOUCH_TYPES'),
        touchProperties: yufp.lookup.find('TOUCH_PROPERTIES'),
        isCustomerTouch: false,
        isMeetting: false,
        isTrain: false,
        isStudy: false,
        isOther: false,
        fileList: [],
        pickerOptions0: {
          disabledDate: function (time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        reportRules: {
          workContent: [
            {required: true, message: '请选择工作内容'}
          ],
          date: [
            {required: true, message: '请选择日期'}
          ],
          type: [
            {required: true, message: '请选择类型'}
          ],
          otherContent: [
            {validator: (rule, value, callback) => {
              if (this.isOther && !value) {
                callback(new Error('请填写内容'));
              } else {
                callback();
              }
            }}
          ]
        }
      };
    },
    watch: {
      reportVisible: function () {
        this.$nextTick(() => {
          this.reportformdata.date = this.selectDate;
        });
      }
    },
    methods: {
      handleClose: function () {
        this.stepActive = 1;
        this.stepActive === 2 && this.$refs.refReportForm.resetFields();
        this.$emit('closeAdd');
      },
      nextStep: function () {
        this.stepActive = 2;
      },
      saveFn: function () {
        this.$refs.refReportForm.validate(valid => {
          if (valid) {

          }
        });
      },
      handleRemove: function (file, fileList) {
        yufp.logger.info(file, fileList);
      },
      handlePreview: function (file) {
        yufp.logger.info(file);
      },
      handleTimeout: function (e, file) {
        yufp.logger.info(e, file);
      }
    }
  });
}(Vue, yufp.$, 'report-add'));