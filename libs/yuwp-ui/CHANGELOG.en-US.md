## Changelog

### 1.2.0
*2019-03-08*

- 组件工程编译模块升级，去掉过时的cooking，换成全新的webpack4.x
  - 组件import别名调整为@。
- 单元测试增强

### 1.1.2
*2019-03-07*

- 新增`TimeLine`组件
- 修复`Xtable`组件
  - 增加tableColumn属性，用于导出
  - 增加可编辑表格校验功能
  - 增加表格合并行列
  - 增加监听dataUrl，baseParams，增加defaultLoad是否默认加载属性
  - 修复分页问题
  - 修复可编辑表格多表头问题解决
  - 修复动态更改data数据无效问题
  - 修复校验导致点击无法选中问题
- 修复`XForm`组件
  - 增加支持自定义内容
  - 增加组件必输校验时显示星号
  - 增加force-column属性，控制查询按钮是否紧跟查询条件或独占一行
  - 增加xform表单属性hiddenRule,输入项隐藏时，不执行该输入项规则验证
  - 修复查询表单间距调整
  - 修复初始值校验问题
  - 修复输入框增加金额格式化示例
  - 修复数值类型输入框初始值为0时无法显示
  - 修复下拉多选框，复选框提交的数据中数组第一个元素是empty
  - 修复多选框，单选框，日期框，值改变时不触发校验问题
  - 修复自定义组件中查询表单查询失效问题
  - 修复数值检验提示信息优化
  - 修复校验某个字段不生效问题
- 修复`XDynamicForm`组件
  - 增加获取数据方法，required校验问题修复
  - 增加联动功能，数值类型输入框格式化问题修复
  - 增加可配置是否有折叠
  - 增加静态模版数据支持linkage为字符串形式
  - 修复动态数据校验问题解决
  - 修复赋初值动态表单联动功能完善
  - 修复数值类型输入框输入字母显示NAN问题解决
  - 修复赋初始值触发联动，默认值无法更改值问题，隐藏的字段无法触发联动问题
  - 修复dataUrl，初始值不显示问题
- 修复`XSelect`组件，
  - 增加下拉框支持禁用某个选项
  - 修复chang事件触发两次问题
- 修复`Tree`组件
  - 调整tree css样式（解决文字过多问题,没有滚动条问题）
- 修复`XDialog`、`Dialog`组件
  - 全屏时不居中显示问题


### 1.1.1
*2018-10-10*

- 组件工程规范化调整
  - 组件import别名调整为yufp-wp。
  - 全局变量别名由`ELEMENT`调整为`YUFPWP`，避免和其它版本冲突。
- 组件文档版本切换修复


### 1.1.0
*2018-09-29*

- 业务组件统一命名为x系列，如：xtable、xform、xselect等等。
  - XDialog <- DialogX 对话框
  - Xtree <- TreeX 封装树
  - Xselect <- SelectX 封装下拉框
  - Xradio <- RadioX 封装单选框
  - Xcheckbox <- CheckboxX 封装复选框
  - Xcascader <- CascaderX 封装级联选择器
  - XtableX <- TableX 封装表格，不推荐使用，推荐使用Xtable
  - XformQ <- FormQ 表单查询，不推荐使用，推荐使用Xform
  - XformX <- FormX 封装表单，不推荐使用，推荐使用Xform
- 组件更改统一命名为`yu-`前缀，同时兼容老版本`el-`前缀


### 1.0.3
*2018-09-15*

- 新增Xtable组件。
- 新增Xform组件。
- 新增Echarts组件，自动销毁
- Tree/TreeX
  - 新增allow-drag属性
  - 新增allow-drop属性
  - 新增node-dbclick事件，提供双击事件
- Popup
  - 内存优化，解绑全局事件
- Message
  - 修改showClose属性默认值为true
- 文档
  - 在线文档持续集成至 jenkins 自动部署发布。


### 1.0.2
*2018-06-25*

- 新增 ComboTree 组件。
- 新增 ComboTable 组件。
- 新增 Lazy 组件。
- 新增 Dialog 的 draggable 属性。
- 新增 DialogX 的 draggable 属性。
- MessageBox
  - 修复确定与取消按钮位置。
- Loading
  - 修复 this.$loading().close() 不能关闭遮罩的问题。
- Upload 
  - 修复IE9下不能正常使用问题。
  - 新增timeout属性。
  - 新增ontimeout钩子函数。
- 文档
  - 统一将文档调整为ES 5语法。
- 编译
  - 新增打包sourceMap源映射文件生成


### 1.0.1
*2018-03-20*

- 新增 Input 的`limit-char`属性。
- 修复 Input 的去除值前后空格。
- TableX
  - 单选、复选列宽度调整。
  - 新增行disable禁用属性，禁用行css样式提交（el-table__row__disabled应用于tr）
- FormX
  - 新增数值框类型配置。
  - 下拉框类型支持复选配置。
  - 金额类型字段格式化配置
- Vue.js 依赖库升级为最新版本v2.5.13


### 1.0.0 
*2018-02-27*

- 新增 FormQ 组件。
- 新增 FormX 组件。
- 新增 TableX 组件。
- 新增 TreeX 组件。
- 新增 SelectX 组件。
- 新增 RadioX 组件。
- 新增 CheckboxX 组件。
- 新增 CascaderX 组件。
- 新增 DialogX 组件。


### 0.1.0
*2018-02-07*

- YUFP-PC 组件初始化版本，以 ElementUI-1.4.12 。
