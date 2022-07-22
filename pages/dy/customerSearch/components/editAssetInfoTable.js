/*
 * @create by: yangding@yusys.com.cn
 * @Date: 2021-09-03 09:36:44
 * @update by:
 * @description: 客户查询编辑
 */

(function(vue, name) {
    vue.component(name, {
        template: '  <div class="bankAccount">\
    <link rel="stylesheet" type="text/css" href="./pages/dy/customerSearch/components/editAssetInfoTable.css"/>\
      <div class="tableTitle">\
        <span class="mr15">房产信息</span>\
        <el-button size="mini" type="primary" @click="add()">+新增一行</el-button>\
      </div>\
      <yu-xtable\
        @cell-dblclick="cellClick"\
        ref="yutable"\
        :data="tableData1"\
        :pageable="false"\
        style="width: 100%">\
        <yu-xtable-column\
          rules="required"\
          :options="options"\
          ctype="select"\
          @change="change(event)"\
          prop="name"\
          label="房产抵押情况">\
        </yu-xtable-column>\
        <yu-xtable-column\
          prop="date"\
          ctype="datepicker"\
          label="购置时间">\
        </yu-xtable-column>\
        <yu-xtable-column\
          ctype="input"\
          placeholder="请输入地址"\
          prop="address"\
          label="购置原价">\
        </yu-xtable-column>\
        <yu-xtable-column\
          label="操作"\
          width="80"\
          align="center"\
        >\
          <template slot-scope="scope">\
            <yu-button\
              @click.native.prevent="deleteRow(scope.$index,tableData1)"\
              type="text"\
              size="small">\
              删除\
            </yu-button>\
          </template>\
        </yu-xtable-column>\
      </yu-xtable>\
    </div>',
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        data: function() {
            return {
                rules: {
                    address: [
                        { required: true, message: '请输入地址', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ]
                },
                options: [
                    { key: '01', value: '草稿' },
                    { key: '02', value: '已发布' },
                    { key: '03', value: '已删除' }
                ],
                tableData1: [{
                    id: '1',
                    date: '2016-05-03',
                    name: '01',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    area: ['CN', 'EU'],
                    tag: '家'
                }, {
                    id: '2',
                    date: '2016-05-02',
                    name: '02',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    area: ['EU'],
                    tag: '公司'
                }, {
                    id: '3',
                    date: '2016-05-04',
                    name: '03',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    area: ['JP', 'EU'],
                    tag: '家'
                }, {
                    id: '4',
                    date: '2016-05-04',
                    name: '02',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    area: ['US', 'EU'],
                    tag: '家'
                }]
            };
        },
        methods: {
            change: function(event) {
                console.log(123);
            },
            clickFn: function() {
                this.$refs.yutable.validate();
            },
            cellClick: function(row, column, cell, event) {
                console.log(1243);
            },
            deleteRow: function(index, rows) { // 删除
                rows.splice(index, 1);
                // this.$emit('tableInfo', this.master_user.data);
            },
            validate: function() {
                console.log('validate');
                this.$refs.yutable.validate(function(fields) {
                    console.log(fields);
                }, true);
            },
            clearValidate: function() {
                this.$refs.yutable.clearValidateMessage();
            },
            add: function() {
                var row = {
                    date: '',
                    address: '',
                    name: ''
                };
                var flag = false;
                // 校验表格数据
                this.$refs.yutable.validate(function(fields) {
                    console.log('fields', fields);
                    if (!fields) {
                        flag = true;
                    }
                });
                // 校验通过添加数据
                if (flag) {
                    this.tableData1.push(row);
                    this.$refs.yutable.setCurrentRow(row);
                }
            },
            validate: function() {
                this.$refs.yutable.validate(function(fields) {
                    console.log('fields', fields);
                }, true);
            },
            clearValidate: function() {
                this.$refs.yutable.clearValidateMessage();
            }
        },
        mounted: function() {
            let _this = this;
            console.log(this.$refs.yutable.$el);
            // this.$nextTick(function () {
            window.document.getElementsByClassName('el-dialog__body')[0].addEventListener('click', function(e) {
                _this.validate();
            });
        }
    });
}(Vue, 'edit-asset-info-table'));