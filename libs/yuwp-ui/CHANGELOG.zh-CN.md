## 更新日志

## 使用方式

下载对应的包并通过script引入到系统中  [yuwp-ui-1.4.16](yuwp-ui-1.4.16.zip)

通过npm引用，需要提前配置私服地址
  
  ```html
  yarn add yuwp-ui@1.4.16 --registry=http://192.168.251.162:8081/repository/yx-npm-mirrors  
  ```

### 1.4.16
*2020-12-10*
- 【修复】`popper`没有显示时，不更新位置。
- 【修复】`Popper`组件`focus`时，边框有一圈黑色的问题
- 【修复】`xtable`火狐浏览器，表头不显示边框问题。
- 【修复】`xtable`复选框翻页后 选择后视图未显示选中状态。
- 【修复】`xtable`静态数据，`push`后，数据未双相绑定问题。
- 【修复】`xtable`多个示例使用一个静态数据时，选中状态会同步的问题。
- 【修复】`xtable`序号还原。翻页之后，序号统一从1开始[#禅道6066](http://114.255.138.160:9037/zentao/bug-view-6066.html)。
- 【修复】`xtable`静态数据初始为空，`push`数据后，无响应问题。
- 【修复】`xtable`修复配置静态数据时分页选中数据存在的问题
- 【修复】`xtable`如果先点击了某个分页(假设是4)，再调用`remoteData`且传了`page：4`，然后点击其他分页的时候会出现不发起请求的问题[#禅道6059](http://114.255.138.160:9037/zentao/bug-view-6059.html)。
- 【修复】`xtable`增加`tooltip`超长才提示的功能
- 【修复】`xtable`隐藏表头，滚动条功能不正常问题。
- 【修复】`xtable`column列中数据字典异步翻译样式可能不正确问题
- 【修复】`xtable`组件配置`data`属性，不显示数据，需要加上v-if才会显示。
- 【修复】`xtable`组件`header`与数据行会有轻微错位。
- 【修复】`xtable`组件，可编辑表格校验示例不正常。
- 【修复】`xtable`可编辑表格，如果嵌套使用`select`组件，当select组件可创建条目时，新增条目不会添加在下拉框选项，并且select失去焦点后会不显示值
- 【修复】`xtable`树形数据的配置项`treeProp`，实际配置无效，只会应用默认值
- 【修复】`xtable`可编辑表格校验功能不正常。
- 【修复】`panel`	不配置`title`时，不显示查询展开按钮问题[#禅道6041](http://114.255.138.160:9037/zentao/bug-view-6041.html)。
- 【修复】`xform`	修复重庆农商发现问题，`xform`组件，设置`disabled`属性后，在更改这个属性的值不会生效
- 【修复】`xform` 高级查询，支持`moreFieldsLength`配置，超过次数目的查询条件会显示在高级查询条件中[#禅道6063](http://114.255.138.160:9037/zentao/bug-view-6063.html)。
- 【修复】`xtable-x`	选中某几条数据或者全选时，翻页之后选中状态不清空问题。
- 【修复】`tablex`添加翻页多选功能`reserveSelection`。
- 【修复】`XtableX`表格的序列号宽度改为与Xtable保持一致(55px)。
- 【修复】`XtableX`封装表格，同时设置checkbox和row-index，序号应该显示在复选框之后[#禅道6054](http://114.255.138.160:9037/zentao/bug-view-6054.html)。
- 【修复】`input`	input文档，增加unit属性说明[#禅道6267](http://114.255.138.160:9037/zentao/bug-view-6267.html)。
- 【修复】`input`，`num`数值框，能输入特殊字符问题[#禅道6057](http://114.255.138.160:9037/zentao/bug-view-6057.html)。
- 【修复】`date-picker`	`yu-date-picker` 采用时间格式为yyyy-MM-dd HH:mm:ss 时，赋初始值时，表单数据未格式化。
- 【修复】`date-picker`配置`form-type`为`detail`后，`datepicker`组件没有按预期显示
- 【修复】`xcascader`,	`getSelectdText`方法只支持三级级联的问题
- 【修复】`Xcascader` 封装级联选择器，设置默认值不生效[#禅道6040](http://114.255.138.160:9037/zentao/bug-view-6040.html)。
- 【修复】`cascader`级联选择器，ie11下，有初始值时会默认打开问题。
- 【修复】`xselect`	`yu-xform-item` `ctype="select"`设置了multiple为true, 在初始化页面的时候就会触发校验
- 【修复】`xselect`下拉框多选，且选项换行时，点击输入框，无法触发focus事件问题[#禅道6035](http://114.255.138.160:9037/zentao/bug-view-6035.html)。
- 【修复】`xselect`解决`placeholder`会变成选项的问题。
- 【修复】`xselect`在`xform`上使用时，`form-type`为details时，字典值不翻译的问题
- 【修复】`xdialog`	增加弹出框head中扩展图标功能[#禅道6083](http://114.255.138.160:9037/zentao/bug-view-6083.html)。
- 【修复】`combo-tree`	修复`combo-tree`单选时数据不回显的问题。
- 【修复】`combo-tree`单选时，第一次加载报错。
- 【修复】`combo-tree`增加高度height属性[#禅道6264](http://114.255.138.160:9037/zentao/bug-view-6264.html)。
- 【修复】`button-drop`	无文档示例[#禅道6064](http://114.255.138.160:9037/zentao/bug-view-6064.html)。
- 【修复】`button-drop`	插槽内容为空时，显示一个空按钮的问题。
- 【修复】`xtree`组件在小宽度下显示会换行[#禅道6263](http://114.255.138.160:9037/zentao/bug-view-6263.html)。

### 1.4.15
*2020-09-17*
- 【修复】`xtable`多个使用一个静态数据时，选中状态会同步的问题。
- 【修复】`xform`组件，设置disabled属性后，在更改这个属性的值不会生效。
- 【修复】`el-table-x`组件多选问题。
- 【修复】`xtable`序号还原。

### 1.4.14
*2020-08-31*
- 【修复】`Anchor`，Anchor 锚点，第一个示例代码操作后，前端报错[#禅道4962](http://114.255.138.160:9037/zentao/bug-view-4962.html)。
- 【修复】`DatePicker`，DatePicker 日期选择器，设置value属性，选择日期不成功[#禅道4983](http://114.255.138.160:9037/zentao/bug-view-4983.html)。
- 【修复】`DatePicker`， DatePicker 日期选择器，实际运行示例代码，选中当天后再查看，日期数字显示不出来[#禅道4980](http://114.255.138.160:9037/zentao/bug-view-4980.html)。
- 【修复】`Xselect`， Xselect封装下拉框，设置multiple，调用方法clear清空后再进行选择，会多一个空选项, select组件也有这个问题[#禅道4919](http://114.255.138.160:9037/zentao/bug-view-4919.html)。
- 【修复】yu-xform-item ctype="select"设置了multiple为true, 在初始化页面的时候就会触发校验(select.vue的value发生了变化,触发了change事件)

### 1.4.13
*2020-08-28*
- 【修复】Xtree 封装树，属性lazy懒加载，不支持情况说明清楚（只支持远程url）[#禅道4803](http://114.255.138.160:9037/zentao/bug-view-4803.html)。
- 【修复】Xtree 封装树，属性indent设置不生效[#禅道4802](http://114.255.138.160:9037/zentao/bug-view-4802.html)。
- 【修复】Xtree 封装树，属性只设置props不成功[#禅道4800](http://114.255.138.160:9037/zentao/bug-view-4800.html)。
- 【修复】Xtree 封装树，属性只设置了empty-text前端报错[#禅道4799](http://114.255.138.160:9037/zentao/bug-view-4799.html)。
- 【修复】Xtree 封装树，高度不自动伸缩[#禅道4798](http://114.255.138.160:9037/zentao/bug-view-4798.html)。
- 【修复】XsplitScreen 分屏组件，属性indicator-position可选值设置为none和属性indicator设置为false都是不显示，建议取消none可选值[#禅道4793](http://114.255.138.160:9037/zentao/bug-view-4793.html)。
- 【修复】XsplitScreen 分屏组件，中当设置高度时，只有一行默认会显示第二行，第一行高度会自动变窄；当未设置高度时，样式显示超过当前区域[#禅道4792](http://114.255.138.160:9037/zentao/bug-view-4792.html)。
- 【修复】Xtable中，XTable-Column Attributes中reserve-selection属性不生效[#禅道4791](http://114.255.138.160:9037/zentao/bug-view-4791.html)。
- 【修复】Xtable中，方法setColumnFix中参数direction不设置默认是left，文档未写出[#禅道4779](http://114.255.138.160:9037/zentao/bug-view-4779.html)。
- 【修复】Xtable中，方法sort中传参不应该这样写：prop: string, order: string，实际直接（string1, string2）[#禅道4778](http://114.255.138.160:9037/zentao/bug-view-4778.html)。
- 【修复】Xtable中，方法sort文档描述错误，order: string中string应该是descending和ascending[#禅道4777](http://114.255.138.160:9037/zentao/bug-view-4777.html)。
- 【修复】Xtable中，方法doLayout调用重新布局不会生效[#禅道4773](http://114.255.138.160:9037/zentao/bug-view-4773.html)。
- 新增下拉联动对label宽度的监听，实时调整下拉框宽度

### 1.4.12
*2020-08-27*
- 【修复】` InputNumber`，设置precision属性后没输入完就格式数据[#禅道4963](http://114.255.138.160:9037/zentao/bug-view-4963.html)。
- 【修复】` InputNumber`，设置了precision和step,增减数值精度不生效[#禅道4995](http://114.255.138.160:9037/zentao/bug-view-4995.html)。
- 【修复】` Xselect`，修复filterable、default-first-option设置为true，回车选择匹配项，显示的都是第一个选项的key值，同时点击下拉选项报错[#禅道4901](http://114.255.138.160:9037/zentao/bug-view-4901.html)。
- 【修复】`input`、密码框示例，修复切换隐藏显示密码时的图标显示，[#禅道4947](http://114.255.138.160:9037/zentao/bug-view-4947.html)。
- 【文档】`input`，更新icon、suffix-icon属性使用说明文档 [#禅道4958](http://114.255.138.160:9037/zentao/bug-view-4958.html)。

### 1.4.11
*2020-08-26*
- 【修复】`input`，密码框示例，修复切换隐藏显示密码时的图标显示，[#禅道4947](http://114.255.138.160:9037/zentao/bug-view-4947.html)。
- 【文档】`input`，更新icon、suffix-icon属性使用说明文档 [#禅道4958](http://114.255.138.160:9037/zentao/bug-view-4958.html)。
- 【修复】`input`，Input带输入建议输入框，输入内容后，修复可选择列表的样式问题[#禅道4952](http://114.255.138.160:9037/zentao/bug-view-4952.html)。
- 【修复】`input`，密码框设置show-password，点击图标切换隐藏或显示，修复光标会跑到行首的问题[#禅道4948](http://114.255.138.160:9037/zentao/bug-view-4948.html)
- xtable表头右键增加nonedisplay-rightmenu事件

### 1.4.10
*2020-08-13*
- 【修复】 `Xform` 表单,属性`label-suffix`设置后不生效[#禅道4837](http://114.255.138.160:9037/zentao/bug-view-4837.html)。
- 【修复】 `Xform` 表单,属性`hidden-del-val`必须在item中使用hidden后才生效，此处测试此属性设置为true后没有删除该隐藏字段的数据[#禅道4835](http://114.255.138.160:9037/zentao/bug-view-4835.html)。
- 【修复】`panel`中查询事件对应的方法不执行问题;修改search事件返回值

### 1.4.9
*2020-07-30*
- 【修复】xtable.md中的`getEditRows`方法说明更改到xtable-utrace.md中。[#禅道4772](http://114.255.138.160:9037/zentao/bug-view-4772.html)。
- 【修复】xtable.md修改`setBorder`方法描述。[#禅道4776](http://114.255.138.160:9037/zentao/bug-view-4776.html)。
- 【新增】panel组件提供`toggle-fn`方法。
- 【修复】`xtable` 设置隐藏显示列时，布局问题。
- 【修复】`xtable` 多选时，当前行变更时不触发`current-change`事件[#禅道4768](http://114.255.138.160:9037/zentao/bug-view-4768.html)。
- 【修复】`xtable` `clearSelection` 不能清空选中项
- 【修复】`xtable` `setCurrentRow`未设置参数时，报错，且无法清空[#禅道4771](http://114.255.138.160:9037/zentao/bug-view-4771.html)。
- 【修复】`Xtable`中，属性设置`selection-type="checkbox"`时，第一次点击最上面全选图标，当前全选未选中[#禅道4770](http://114.255.138.160:9037/zentao/bug-view-4770.html)。
- 【修复】`Xtable`中，属性`select-on-indeterminate`，设置为`false`时，其实效果就是反选，描述和实际不一致，实际效果：取消了选择的，未选择的全部选中[#禅道4750](http://114.255.138.160:9037/zentao/bug-view-4750.html)。
- 【修复】`Xtable`中，属性`show-hidden-menu`设置不生效，`hide-column`设置`ture`和`false`都没作用[#禅道4749](http://114.255.138.160:9037/zentao/bug-view-4749.html)。
- 【新增】`xtable`，`xtable`设置`lazy`属性，懒加载数据时添加增在加载的图标切换功能。
 - 【修复】Xselect 封装下拉，属性clearable，在select中默认是不能清空，Xselect 此处默认是可以清空，但描述中是false，实际和描述不符并且要不要和sleect保持一致？[#禅道4809](http://114.255.138.160:9037/zentao/bug-view-4809.html)。
 - 【修复】Xselect 封装下拉，属性name，默认值为yu-xselect，但是实际结果为：el-select-x[#禅道4810](http://114.255.138.160:9037/zentao/bug-view-4810.html)。
- 【新增】`xtable`，`xtable`remoteData方法，可自定义page，size。
- 【修复】`xcascader`，清空值以后，下拉选项依旧高亮问题。
- 【修复】`cascader`，清空值以后，下拉选项依旧高亮问题。

### 1.4.8
*2020-07-28*
- 【新增】`xtable.md`，`xtable.md`添加`lazy`,`tooltip-effectde`的默认值。
- 【新增】`xtable.md`，`xtable.md`添加`before-page-change`属性的使用示例，更改属性说明。
- 【修复】`xtable-header`，`xtable`设置了`header-row-style`属性，样式不生效的问题。
- 【新增】`xtable.md`，`xtable.md`添加`header-row-style`,`header-cell-style`，`header-row-class-name`, `header-cell-class-name`属性的使用示例。
- 【修复】`YuXform`小U留痕不能点击

### 1.4.7
*2020-07-27*
- 【修复】`xtree`，`xtree`设置了props的icon时, 图标不展示的bug。

### 1.4.6
*2020-07-24*
- `xtable`，`xtable`没有可展开列，但配置了`default-expand-all`属性为`true`时，每一行数据会多出空白行。

### 1.4.5
*2020-07-21*
- `xtable`，`xtable`某一列文字过多超出设置宽度后不会出现...省略。

### 1.4.4
*2020-06-30*
- `dialog`，`xdialog`内部内容渲染时，高度计算有偏差的问题。
- `xtable`，固定列时，固定列单元格高度不对的问题。
- `xtable`查询刷新时，表格无法选中的问题。
- `xtable`右键生成自定义内容被遮挡的问题。
- 【修复】`xtable-x`多级表头固定列渲染问题,表头高度；表格高度正常产生滚动条问题；IE加载初始化宽度不对问题
- 【新增】新增`YuPabel`组件
- 【优化】修改`YuButtonDrop`按钮数量配置
- 【文档】修改`YuPanel`文档

### 1.4.3
*2020-06-12*
- 【修复】`xtable-x`多级表头固定列渲染问题

### 1.4.2
*2020-06-12*
- 【修复】`xtable`多级表头固定列渲染问题，修改safari表格表头错位问题

### 1.4.1
*2020-06-09*
- 【优化】`ElSubmenu`修改竖向右侧箭头
- `dialog`，`xdialog`在ie中，垂直居中位置计算错误问题
- `xtable`，复选时，取消选中时无法取消高亮问题。
- 【优化】`xtable`，复选框的宽度，以及居中。
- 【优化】`xtable`传参数据类型错误时，异常处理，调整滚动异常问题。
- 【优化】`YuSubmenu`、`YuMenuItem`增加属性标注菜单顺序号/修改横向菜单位置计算。

### 1.4.0
*2020-06-08*
- 【修复】`table`加载报错问题

### 1.3.50
*2020-06-05*
- `combo-tree`，支持配置，点击节点或点击箭头展开。（默认点击节点展开）
- `menu`，`menu-item`支持`start-padding-level` 属性。
- `xtree`增加`remote-param-name`，`remove-empty`属性。
- `xtable`，`table`处理，第一列默认展开时，会报错问题。
- `xtable`列宽度计算问题。
- `xform-item`修复高度被撑高，导致布局混乱的问题。

### 1.3.49
*2020-06-04*
- 【修复】Xtable示例文档中自适应宽度问题示例修改。
- 【优化】调整`YuSubmenu`右侧箭头图标。
- 【新增】调整`YuXtree`增加参数`remove-empty`,标注查询时是否清空空参数;修改参数`remoteParamName`可支持多字段。
- 【新增】调整`YuXtable`、`YuTable`增加属性`enableLength`配置开始视窗加载优化表格性能。

### 1.3.48
*2020-06-03*
- 【新增】messagebox 增加showTopWindow，以支持是否显示消息框在根部window。
-  调整`date-picker`，`time-picker`等时间，日期选择器图标位置。
-  `xselect`，`xcascader`修复，开启性能优化时，滚动加载数据不正常的问题。
- 【新增】`YuMenuItem`、`YuSubmenu`增加参数`startPaddingLevel`标注菜单开始计算缩进级别，默认值为0。
- 【文档】更新`xtable`小U留痕示例代码 [#禅道3861](http://114.255.138.160:9037/zentao/bug-view-3861.html)。
- 【文档】更新`xtable`、`xform`小U留痕说明文档 [#禅道3852](http://114.255.138.160:9037/zentao/bug-view-3852.html)。
- 【修复】更新`xtable`文档中示例代码增加了固定宽度导致不能自适应，实际中，应该取消固定宽度，现修改前端文档中增加的固定宽度[#禅道3837]、[#禅道3836]
- 【修复】调整`date-pick`，`time-pick`等日期，时间选择器图标位置。
- 【优化】添加`xtable`所有列固定宽度时，table宽度固定，不再自适应。
- 【优化】优化`xtable`横向滚动时，表头延迟明显[#禅道3840]。

### 1.3.46
*2020-05-28*
- 【优化】`xcascader`大数据，性能优化。
- 【修复】表格自适应问题，表格隐藏列问题
- 【修复】复选框对齐
- 【修复】page-assist组件样式通用性修改

### 1.3.45
*2020-05-25*
- 表单类组件，`change`事件支持传递新值，旧值。文档修改。
- `xform-x`迁移`append`插槽功能。
- `xtable-x`，`xtable`支持`encode`，编码参数功能迁移。
- `input`组件，增加 `triger-click` 属性控制，禁用时能否点击图标。
- `xtable`提供冻结，隐藏行号，去除单选或复选列，去掉行边框线的方法。
- `xtable`解决，有多个可扩展列，会同时展开，且内容会被覆盖的问题。
- `xselect`大数据优化，支持`options`，`dataCode`。
- `message-box`嵌套问题。
- `anchor`锚点组件，支持配置，原点是否充满所有锚点。
- `anchor`组件选中时会刷新，window.href会改变问题。
- `anchor`组件配置无效的容器选择器时，提示信息不友好。
- `xform`，`date-picker`样式居中问题。
- `xform-item`嵌套时，显示多余星号问题。
- `xform-item`支持`labelSuffix`配置。
- `xform`查询表单，查询按钮增加间距。
- `xform`详情表单，文字对齐。
- `xtable`，`xtable-column`增加`is-fit`属性，设置列的宽度是否根据内容自适应。

### 1.3.44 
*2020-05-11*
- 按钮增加disabledMask属性，配置button disabled时点击，并去掉1.3.41中添加的alt-click事件
- `xtable`增加`getColumnWidth`方法，获取列的宽度。
- 按钮icon增加图标全称支持

### 1.3.43 
*2020-05-09*
- 修复xtable单选框设置行选中问题
- 修复xtable单元格点击事件抛出

### 1.3.42 
*2020-05-08*
- 修复xtable滚动问题，及空数据滚动问题

### 1.3.41
*2020-05-07*
- button 增加alt-click的事件
- 表格增加行高设定属性rowHeight，
- 增加xtable获取表格列的方法getTableColumns
- 修复表格样式，修改节点为原生表格

### 1.3.40
*2020-05-06* 
- 修复表格slot append元素滚动报错
- 修复xtable选中样式切换问题，跨行合并问题

### 1.3.39
*2020-04-30*
- 修改表格优化后问题
- 去掉表格中checkbox组件引入改为原生引入
- 优化表格渲染
- 修改多语言组件翻译报错逻辑，未找到修改内容，直接显示当前需要翻译内容
- 修改divider分隔线样式兼容问题
- 升级throttel-debounce依赖
- ctype="num"的yu-xform-item组件，在非最前面输入负号或输入多个小数点时，出现NaN的问题

### 1.3.37
*2020-04-27*
- `datetimerange` 时间日期选择器支持配置`value-type`属性设置`value`格式（string，array）
- 修复`xcheckbox`复选框`value-type`为`string`时，配置`separator`时，不能选中问题
- form-item-x.vue destroyed钩子unwatch方法报错
- message-box组件和popup/index.js中doClose方法报错not a function

### 1.3.36
*2020-04-21*
- 【修复】`YuAvatar`组件,触发error回调并返回false时，自定移除图片节点
- xtable 解决setShowColumns,setHiddenColumns 设置后高度后，表格收缩高度有滚动条

### 1.3.35
*2020-04-20*
- 增加xform组件resetFields方法参数,不清除默认值

### 1.3.34
*2020-04-19*
- 修正xtable 中setShowColumns，setHiddenColumns 调用后有空白列情况,并删除xtable.md 文件中无用测试示例

### 1.3.33
*2020-04-16*
- 优化input.md性能，释放BigNumber
- select 添加节流方法优化性能
- 删除xselect日志打印
- 组件示例form报错信息修改

### 1.3.32
*2020-04-14*
- 修复xselect示例demo 点击按钮弹出选择框问题, xselect设置值添加key设置，修复设置值后获取值异常问题
- 释放scrollbar-width中节点
- 调整xtable设置隐藏或显示列方法体逻辑
- xtable 移除contextmenu的事件监听时先判断此节点是否存在(showHiddenMenu为false时没有渲染contextmenu，导致报错) 
- xtable 增加设置显示或隐藏列方法，并修复前面版本中导致的邮件错误异常
- 优化echarts组件 添加IE内存销毁机制，销毁前处理实例对象
- transfer组件 添加$watch销毁
- form组件/color-picker组件/rate组件/slider组件销毁前移除事件监听器。
- input-number 添加自定义指令解绑逻辑,自定义指令：repeatClick添加解绑逻辑
- citySelect 将示例城市数据js移动到示例文件中，打包时不再引用
- xtable 销毁mouseleave事件报错问题

### 1.3.28
*2020-04-08*
- 优化color 优化透明度视图更新性能问题
- 优化radio 优化keyframe动画性能问题
- select组件销毁前移除事件监听器。
- tabs和dropdown组件销毁前移除事件监听器。
- 去掉1.3.26 中在xform-item中添加的placeholder
- 修复代码格式，并在xform-item上添加placeholder。

### 1.3.25
*2020-04-07*
- 弹出框增加自定义按钮功能。

### 1.3.21
*2020-03-21*
- 【修复】`YuAvatar`组件,触发error回调并返回false时，自定移除图片节点

### 1.3.20
*2020-03-04*
- 【新增】`xform`组件
  - 增加属性控制是否自适应布局
  - hidden隐藏时，表单中是否含有字段的问题。增加hidden-del-val属性控制
  - 高级查询，增加事件配置
  - 查询表单，增加属性，可自定义查询逻辑
  - 高级查询功能，增加5个属性配置
  - 增加翻译信息
  - 新增高级查询功能
  - xform重置时保留初始值
  - 增加设置表单数据方法
  - 增加小U按月查询方法
  - 小U增加按月查询修改历史记录
  - 增加小U标记滑过显示title信息开关
  - 增加属性控制 type 为search的时候，点击查询按钮时提交的数据为空字符串时不往后台送
  - 增加模糊查询功能，调整xform 模糊查询功能描述
- 【优化】`xform`组件
  - 小U功能拆分
  - 小U增加showUtitleMessage属性配置
  - 高级查询支持传入事件
  - 详情表单功能重做
  - 表单xform配置hidden-rule属性时，不校验表单隐藏项
  - 调整hidden-rule校验hidden字段时状态值
  - 数值输入框格式化导致浏览器崩溃问题
  - 调整表单保存小U时数据处理
  - 修复inline属性控制问题
  - 增加强制保存小U数据功能
  - 配置conditionKey为空，查询参数不再带有condition
  - 调整高级查询模糊搜索为变量
- 【修复】`xform`组件
  - xform查询，在2.0工程中，若xtable ref重复，查询功能不正常
  - 修复表单项校验不支持2000后的出生日期
  - 在表单最后一项为隐藏验证项时，会导致其他验证失败无效
  - 修复Xform item 动态生成，resetFields清除数据失败
  - 修改xform setFormData方法设置的参数名称
  - 修复前面xform 添加的模糊查询功能。调整取值属性，并增加moreFields 的模糊查询
  - 增强 fuzzyQuery 属性逻辑处理的判断
  - 配置rules为required时，校验信息显示为label名不能为空
  - 先修改再新增时，数据无法清空问题
  - 修复v-if控制字段隐藏，formdata数据问题
  - 小u留痕，默认根据修改日期排序
  - 修改小U按月查询
  - 修改xform detail 模式时多个连续空格，页面上只显示一个的问题
  - 解决详情表单中，数字字典不返现问题
  - 查询表单，配置查询参数是否带condition
  - 解决查询表单和关联表格问题
  - 修改当最后一个item为hidden不执行validate方法问题
   - 解决高级查询时，数值框显示零的问题
- 【新增】`xtable`组件
  - 调整表格字段字典格式化时，数组数据处理
  - 新增表格小U数据保存方法
  - 新增xtable编辑数据获取方法
  - 增加翻页时对数据的校验
  - 添加全局配置，解决loading不关闭问题
  - 增加小U标记滑过显示title信息开关
  - xtable 增加右键隐藏/显示功能
  - 小U查询增加参数
  - 小U按月查询传参增加mFieldId
  - 小U增加按月查询修改历史记录
  - 增加props pageSize
  - 增加表格自动排序功能
  - 小u功能,增加`utraceTitle` props, `xform` `utraceTitle`设置默认值
  - 新增表格右键生成自定义内容功能
  - 增加表格分页页码参数
  - 可编辑表格清除校验时改变选中状态
  - 增加表格selectAll全选方法
  - 增加对下拉多选字符串值的转换支持
  - 增加表格pageSizes属性
  - 新增表格clearData方法，清空表格数据
  - 可编辑表格校验异步方法增加，校验结果标志的参数
- 【优化】`xtable`组件
  - 增加强制保存小U数据功能
  - 翻页后保持上页选中数据属性
  - 请求返回后 预处理属性parseResponse
  - 调整表格loading加载执行顺序
- 【修复】`xtable`组件
  - 动态增减table-column时，显示问题
  - 切换select-type时显示不正常问题
  - 配置单选，序号后，位置问题
  - table，xtable增加切换全选的方法
  - 小u留痕，默认根据修改日期排序
  - 解决未发请求时，不能直接翻页发请求
  - 调整上一版本表格唯一标识符产生位置（由属性产生调整为变量产生）
  - 解决表格数据字典显示和数据字典注册异步问题
  - 修改小U按月查询
  - xcolumn 配置options并配置props 时无法转义问题
  - 同步消费信贷，大分辨率，xtable使用fixed时，出现滚动条问题
  - 不能设置width问题
  - 拖动改变高度时，不产生滚动条问题
  - 解决xtable出现滚动调原因
  - 表格单选，显示省略号问题
  - 调整xtable小U数据保存时参数处理
  - 同步表格直接添加数据，xtable 校验回调不执行问题
  - 调整表格小U部分支持多语言
  - 小U修复mPkV截位，少一位
  - 同步消费信贷中发现的小U和xtable问题
  - 解决table中loading在低版本ie中无法关闭问题
  - 修复可编辑表格中，单选框显示问题
  - 解决表格在火狐下，单选时单选框位置问题
  - 解决表格在ie11低版本下，loading不正常关闭问题
  - setCurrentRow方法，选中数据后，selections属性依然为空问题
  - 数据加载不显示loading问题
  - 优化yufp-web中表格数据的请求异常时，表格loading无法关闭的问题
  - 小U弹窗关闭按钮触发请求小U数据
  - 列配置fixed属性值为left,right以外的字符串列会消失的问题，并增加报错提示
  - 修复 xtable unshift方式添加tabledata 清除不掉选中行样式
  - 修复Xtable中XTable-Column Attributes属性fixed设置为'true','false'时，此列就会消失的问题
  - 多选时，只能点击前面的复选框选中和取消，避免可编辑表格输入框聚焦时会切换选中状态
  - 修复绑定静态数据后-》选中数据-》重新绑定数据，选中状态依然存在问题
  - 修复可编辑表格日期校验
  - 修改可编辑表格小U数据保存逻辑，增加可传递参数
  - 增加多语言处理
  - 修改xtable 可编辑表格，下拉框可能通不过校验问题（有change事件时）
  - 修复可编辑表格change事件未调用问题
- 【新增】`xtable-x`组件
  - 增加props pageSize
  - 增加表格自动排序功能
  - 增加parseResponse 属性
- 【修复】`xtable-x`组件
  - 解决表格数据字典显示和数据字典注册异步问题
  - 修改小U按月查询
  - xcolumn 配置options并配置props 时无法转义问题
  - 调整上一版本表格唯一标识符产生位置（由属性产生调整为变量产生）
  - 解决未发请求时，不能直接翻页发请求
  - 添加全局配置，解决loading不关闭问题
  - 解决table中loading在低版本ie中无法关闭问题
  - 解决表格在火狐下，单选时单选框位置问题
  - 解决表格在ie11低版本下，loading不正常关闭问题
  - 合并修改东莞银行ie11 xtable-x多次加载数据时，导致loading不能消失问题
  - 组件属性全局配置功能
- 【新增】`table`组件
  - 新增表格右键生成自定义内容功能
  - 表格行操作时，将行号传递出来
- 【优化】`table`调整表格校验返回值
- 【修复】`table`组件
  - 调整上一版本表格唯一标识符产生位置（由属性产生调整为变量产生）
  - 单选时，selection属性没有值的问题
  - 修复特殊分辨率下出现滚动条问题
  - 解决东莞银行用ywui.extend 赋值为tablex ，第一次无法显示（需要点击别个刷新才可以渲染）问题
  - 解决隐藏,设置show-header 并且设置height,字段缩在一起的问题
  - 解决表格滚动条问题
  - 无法设置高度问题，及table-x报错问题
  - 解决表格tooltip内容未超时会显示问题
  - 修复chrone30，时表格表头错乱问题
- 【新增】`xselect`组件
  - 增加separator，value-type属性，控制下拉框值的类型
  - 增加lock-height 属性
  - 增加dataCode方式获取数据时，使用exclude-key 排除数据项
- 【优化】`xselect`组件
  - 使用数据字典时自定义下拉框选项对应的key/value键名
  - 请求数据时传参name改为url
  - 调整select字典过滤方法datacode-filter返回参数
- 【修复】`xselect`组件
  - 数据字典不显示问题
  - 下拉框中值选中后，再次打开下拉框点击清空图标，此时placeholder值为上一次选中的值
  - xform高级查询 ，重置后 this.value 获取到的是undefined, 顾增加判断
  - 下拉框复选时可配置separator属性，将值变为以该字符分割的字符串
- 【新增】`select`组件
  - 增加separator，value-type属性，控制下拉框值的类型
  - 增加lock-height 属性
  - 增加对象值判断
  - 增加下拉框提示信息动态变更
- 【优化】`select`组件
  - 模糊查询
  - 下拉框增加value 判断，当就值从undefined赋值为空时，不执行watch 逻辑，避免xform初始化后执行下拉框change事件
- 【修复】`select`组件
  - 修复表单select初始值为空的时候也能触发change事件问题
  - 由于前面版本为实现xform detail模式在input.vue中增加了外部div，所以原取组件的层级发生变化，故重新调整取childNodes[0].children（使用场景为下拉多选换行时）
  - 下拉框复选时可配置separator属性，将值变为以该字符分割的字符串
  - 修改xform 初始化执行下拉框change事件问题
  - 调整remove-empty属性的判断（原只判断了字符串，现增加数组为空判断）
  - 调整多语言翻译项函数调用
  - 解决下拉框赋值为空的问题
  - 修改下拉框多选时高度不能计算问题
  - 搜索时, option中高亮显示搜索词改为可配置项
- 【新增】`tree`组件
  - tree组件筛选，若父节点满足条件，子节点不再隐藏
  - 添加v-noreeat指令及配合修改button的变量
  - 增加右键点击事件和右键自定义内容属性
  - 增加节点图标配置属性
  - 增加remoteParamName 参数
- 【修复】`tree`组件
  - 筛选时，懒加载，所有节点都加载的问题
  - lazy模式时强制通过forceNodeType 返回true可强制节点类型为叶子节点
- 【新增】`xtree`组件
  - 增加右键点击事件和右键自定义内容属性
- 【修复】`xtree`组件
  - lazy模式时强制通过forceNodeType 返回true可强制节点类型为叶子节点
  - 复选时会出现一个复选节点，以及传递的数据被更改的问题
- 【新增】`combo-tree`
  - 增加详情模式
  - 添加all-node-value属性支持，单选选中任意节点
  - 增加jsonData 默认值
  - 配合后端数据结构调整赋值时的取值结构
  - 添加node-click事件
  - 增加属性以配合查询返显数据
  - 增加赋值时 查询后台显示中文的功能
  - 增加remoteParamName 参数
- 【修复】`combo-tree`组件
  - lazy模式时强制通过forceNodeType 返回true可强制节点类型为叶子节点
  - 修复在查询form中无法显示对应的label数据
  - 修改校验对0的判断
  - 禁用时依然弹出的问题
  - 初始化时赋值不反显问题
  - 不支持选根节点
  - 重置时值不变问题
- 【修复】解决`popver`每次弹出，`z-index`不断增加的问题
- 【新增】`xcalender`日历
- 【修复】`xcalender`组件
  - 日历组件加载慢问题
  - 修复日历组件不能二次标记的问题
  - 修改日历组件代码格式
  - 日历组件优化和bug修复
- 【新增】`upload`组件
  - 增加基础路径前缀参数
  - 增加encode属性，标注文件上传时是否url编码文件名称
- 【优化】`upload`组件
  - 上传组件picture-card支持配置上传数量，超过时不在能上传
- 【修复】`num`组件
  - 修复格式化利率时bug（导致表单无法赋值问题）
  - 利率组件，增加输入过滤和符号输入处理
  - 利率格式组件增加利率格式时也格式化的需求，增加formatRate属性，格式化利率，默认不格式化
  - 设置默认允许输入的字符
  - 数值组件增加`isRounding` 属性判断是否 四舍五入
  - 去掉设置的默认的`limitChar`的值
- 【新增】`xcheckbox `组件
  - 增加exclude-key  datacode-filter 属性
  - 增加多语言处理
  - 增加单选框/复选框datacode-filter方法
- 【优化】`xcheckbox `组件
  - 调整xcheckbox valueType默认属性值为array
  - xcheckbox增加参数，标注返回值类型
  - 调整xform及原始xcheckbox值获取
  - 更新复选框字符串值
  - 增加ElCheckboxGroup valueType 关联
- 【修复】`xcheckbox`组件
  - 修复resetFields 清除后 xcheckbox 点击选择，会全选问题
  - 同步消费信贷中修改的valueType和checkbox 数组，字符串问题
  - 修复xcheckbox 设置value-type 为array 无效的问题
  - 增加xcheck/xradio选项options单独的disabled值处理
  - 赋初始值不显示问题
- 【新增】`pagination`组件
  - beforeSizeChange和beforePageChange 增加callback参数，用于处理异步问题
  - 增加page和size变换的接口函数
  - 同步修改翻页组件，同时切换页面和回车只执行一次change
- 【新增】`linkage-select`组件
  - 增加搜索filterable属性
  - 增加options的watch逻辑
  - 修复赋值不上问题
- 【新增】`input`输入框增加输入符号、￥‘’
- 【修复】`input`组件
  - 输入框查询字段首尾有空格
  - limitChar第一次输入特殊符号被正则匹配替换后，再次输入无法替换bug
  - 解决数值框负数格式化问题
  - change触发多次的问题
  - 取值不为数字问题
  - 兼容输入框maxlength可为字符串
  - type 为 num时，增加负数兼容
  - 多个input框一排换行问题
  - 详情表单，输入框不显示值问题
- 【新增】`message-box`组件新增内容换行属性
- 【修复】`message-box`组件区分取消和关闭
- 【新增】`message`组件新增内容换行属性
- 【修复】解决`message`弹出位置问题
- 【修复】`autoComplete`值变更时不搜索的问题
- 【修复】`cascader`支持多选功能
- 【新增】`cascader-panel`级联面板组件
- 【修复】`checkbox-group`组件，值含有boolean值时报错问题
- 【新增】`combo-table`增加详情模式
- 【修复】`combo-table`组件
 - 禁用时依然弹出的问题
 - 初始化时赋值不反显问题
- 【修复】`date-time`修复在ie下兼容性问题
- 【修复】`date-picker`组件
  - 解决日期框输入值，无法重置的问题
  - 年份选择出现负数问题
  -  修正xform中日期框变短问题
  - 同步消费信贷分支功能（详情表单功能）
- 【修复】`linkage-select`组件
  - 调整watch 内代码位置，同步消费信贷（两个赋值还原到上一次逻辑情况）
  - 更新组件YuLinkageSelect支持默认值为字符串类型
- 【新增】`xdialog`支持size属性
- 【修复】`xdialog`拖动时，滚动条问题
- 【优化】`xform-x`组件
  - 调整formx传递拓展参数处理
  - 修改formx自定义组件传参，将所有信息传递过去
- 【新增】`form-q`增加适配的分辨率功能
- 【优化】`xform-q`组件
  - 按钮间距调整
  - 增加模糊查询功能，调整xform 模糊查询功能描述
  - xform-q.js 中添加remove-empty 属性，可设置是否移除未输入条件的字段（原没有输入数据的字段会获取到数据空字符串）
- 【新增】`xdynamic-form`组件
  - 增加方法setFormData更新表单值
  - 新增`label-width`属性，能统一配置宽度，并调整对应的文档说明
- 【新增】`tabs`增加before-leave属性，可用于阻止切换
- 【新增】`xradio`组件
  - 增加exclude-key  datacode-filter 属性
  - 增加多语言处理
  - 增加单选框/复选框datacode-filter方法
  - 增加options 的监听
- 【修复】`combo-table`重置时值不变问题
- 【新增】`collapse`组件，增加配置属性，提供给外部class用于计算title宽度，从而动态调整collapse-item背景图片宽度
- 【优化】`collapse`组件，调整collapse标题不能点击属性
- 【新增】`countup`数字动画组件
- 【新增】城市选择器组件`city-select`
- 【修改】`cityselect`组件样式
- 【修复】`cityselect`,`countup`组件bug
- 【修复】`range`组件
  - 修改数字区间保留小数位数未生效
  - 区间组件增加左右区间值边界判断
- 【修复】`YuNum`组件
  - 修改YuNum组件，在xform-item中使用时，会触发两次blur事件的bug
  - 修改YuNum组件，在xform中使用时，如果使用该组件的值首次赋值为undefined时，点击输入框会出现undefined，的问题
- 【文档】更新文档 
  - citySelect组件支持列表数据下载
  - 新增文档在mobile端的适配样式
  - xform组件文档增加`custom-search-fn`（自定义查询事件）
  - `range`区间组件文档增加`value-type`配置属性
  - `num`组件更新文档说明
  - 调整组件文档，修改属性描述，增加示例等
  - 完善数字/日期区间组件`range`方法和文档
  - 增加`upload`文件名转码示例
  - 在`YuForm` 和 `YuXform`组件文档中添加 `async-validator` 的说明文档链接
  - 新增 async-validator校验规则的说明
- 【其他】  
  - 从消费信贷迁移`linkage-select`组件
  - 新增日期/数字区间`range`组件
  - 将消费信贷分支的`YuNum`组件迁移至dev分支

### 1.3.0
*2019-05-24*

- 集成xform/xtable组件小U留痕&emsp;[小U资料](utrace.zip)
  - xform增加参数utrace标注是否开启小U留痕操作，并可通过slot自定义小U列表
  - xform提供saveUTrace方法保存数据，参数为表单编辑前数据
- 更新xform/xtable组件文档
  - 新增使用示例
  - 新增文档属性/方法/事件描述

### 1.2.1
*2019-05-13*

- 引入mock模块，将界面上示例与示例工程保持一致,  **引入的文件来源于示例工程，但有更改及删减**
  - 由于校验license.json路径问题，需要将ywui.core.min.js放在index.tpl中
  - 将mock数据文件放在index.tpl中引用
  - 调整mock数据文件加载方式
  - 删除ywui.service中关于token部分代码[组件文档中不使用]

### 1.2.0
*2019-03-08*

- 组件工程编译模块升级，去掉过时的cooking，换成全新的webpack4.x
  - 统一工程import别名为@，去除多余的main、examples、packages.
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


