/**
 * yufp-cust-flexy-query
 * 灵活查询
 * Created by lixt1 on 2020/12/24.
 */
(function (vue, $, name) {
    var tags1 = [];
    var columnOptions = [];
    var chartTagOptions = [];
    var xchartTagOptions = [];
    var chartTargetOptions = [];
    var ychartTargetOptions = [];
    var customersColumnOptions = [];
    var firstOptions = [];
    var secondOptions = [];
    var thirdOptions = [];
    var fourOptions = [];
    var fiveOptions = [];
    var comboSelectOptions = [];
    var typeOptions = [];
    var countSumOptions = [];
    var textOptions = [];
    var radioComboOptions = [];
    var querysql = '';
    var graphSql = '';
    var graphInfo;
    var sumNamesOptions = [];
    var custObject;
    yufp.lookup.reg('CUST_CLASS,CD0033,YEAR_SELECTION_LIST,CD0070,CD0069,FINANCIAL_RISK,CUST_GRADE,YES_NO,SEX_TYPE');
    // 注册用户组件
    vue.component(name, {
        template: '<div id="custFlexyQuery">' +
            '    <div class="cust-flexy-query-main">' +
            '        <div v-show="!(custGroupOperateFlag || markOperateFlag)" class="cust-flexy-list" :style="{width: widthsol, transition: \'width .3s linear\'}">' +
            '            <div class="title">' +
            '                <span v-show="!collapse">方案列表</span>' +
            '                <span class="oper-bar">' +
            '                    <i class="el-icon-d-arrow-left cust-icon-oper" v-show="!collapse" @click="shrinkFn"></i>' +
            '                    <i class="el-icon-d-arrow-right cust-icon-oper" v-show="collapse" @click="expandFn"></i>' +
            '                </span>' +
            '            </div>' +
            '            <div v-show="!collapse" class="yu-toolBar">' +
            '                <yu-button-group>' +
            '                    <yu-button icon="delete" @click="datasetaddFn">新增</yu-button>' +
            '                    <yu-button icon="delete" @click="datasetDeleteFn">删除</yu-button>' +
            '                </yu-button-group>' +
            '            </div>' +
            '            <el-table-x v-show="!collapse" ref="filterTable" :checkbox="false" :max-height="height"' +
            '                        @row-dblclick="dblclick"' +
            '                        @select="rowClickFn" :data-url="ssolutionUrl"' +
            '                        :table-columns="ssolutiontableColumns" :pageable=false>' +
            '            </el-table-x>' +
            '        </div>' +
            '        <div class="cust-flexy-tree" style="width: 300px;">' +
            '            <yu-input placeholder="输入关键字进行过滤" v-model="filterText"></yu-input>' +
            '            <yu-xtree  ref="flexytree" :height="height - 20" v-bind:style="{height: (height-40) + \'px\' }" draggable' +
            '                       :allow-drop="allowDroprow"' +
            '                       @node-drag-start="handleDragStart" @node-click="nodeClickHandle" :data-url="treeUrl" data-id="nodeid" :data-params="groupparam"' +
            '                       data-label="name" data-pid="parentId"' +
            '                       node-key="nodeid" :root-visible="true" data-root="1" style="margin:10px 0 0 0;"' +
            '                       @load-all-data=\'getdata\' :filter-node-method="filterNode">' +
            '            </yu-xtree >' +
            '        </div>' +
            '        <div class="custFlexytab">' +
            '             <yu-row :gutter="10" v-if="markFilterShow" style="padding-bottom: 15px;">' +
            '               <yu-col :span="4" style="line-height: 30px; text-align:right">是否排重</yu-col>' +
            '               <yu-col :span="6">' +
            '                 <yu-select v-model="orRepeat">' +
            '                    <yu-option' +
            '                      v-for="item in repeatOrNotlist"' +
            '                      highlight' +
            '                      :key="item.key"' +
            '                      :label="item.value"' +
            '                     :value="item.key">' +
            '                    </yu-option>' +
            '                </yu-select>' +
            '                </yu-col>' +
            '              </yu-row>' +
            '<el-tabs v-model="activeName" @tab-click="handleClick">' +
            '<el-tab-pane label="业务模式" name="businessModel">' +

            '              <div style="margin-top: 20px">' +
            '                <div style="width: 65px; font-size: 16px; margin: 10px 20px; border-bottom: 2px solid #ccc; cursor: pointer;" ' +
            '                :style="{color: isSearchBtn ? \'red\' : \'#ccc\' }" @click="searchBtn">查询条件</div>' +

            '              </div>' +
            '                    <div id="queryCon" style="background-color:#eee; height: 250px;"' +
            '                         @drop="bnsAllowDropSear($event)"' +
            '                         @dragover=\'allowDropover($event)\'>' +
            '                        <div class="ys-stGroup" v-for="(item,index) in list" :key="index">' +
            '                            <el-form label-width="80px" ref="item.index" :model="dataSqlTemp[item.id]">' +
            '                                <div @drop=\'childrenallowDrop($event,index)\' @dragover=\'Dragover($event)\'>' +
            '                                    <div class="formrow">' +
            '                                        <el-row>' +
            '                                            <el-col :span="8">' +
            '                                                <el-form-item label="属性" class="mustWrite">' +
            '                                                    <yu-input :placeholder="item.name"' +
            '                                                              v-model="dataSqlTemp[item.id].proPer"' +
            '                                                              readonly></yu-input>' +
            '                                                </el-form-item>' +
            '                                            </el-col>' +
            '                                            <el-col :span="6">' +
            '                                                <el-form-item label="操作符" class="mustWrite" :rules="opRule"' +
            '                                                              prop="signOp">' +
            '                                                    <!-- <el-select placeholder="请选择" v-model="dataSqlTemp[item.id].signOp" @change="signchange">' +
            '                                                        <el-option v-for="(items, index) in signOptions" :key="index" :label="items.value" :value="items.key">' +
            '                                                        </el-option>' +
            '                                                    </el-select> -->' +
            '                                                    <yu-xform-item-part v-model="dataSqlTemp[item.id].signOp"' +
            '                                                        rules="required" :ctype="item.section.ctype" @change="signOpChange($event, item.id, index)"' +
            '                                                        :options="item.section.options" :disabled="item.disFlag || item.section.disFlag"></yu-xform-item-part>' +
            '                                                </el-form-item>' +
            '                                            </el-col>' +
            '                                            <el-col :span="7">' +
            '                                                <el-form-item label="属性值" class="mustWrite selInpVal" :rules="signvRule"' +
            '                                                              prop="signVal">' +
            '                                                    <yu-xform-item-part :key="item.items.type" v-model="dataSqlTemp[item.id].signVal"' +
            '                                                                        :unit="item.items.unit"' +
            '                                                                        :ctype="item.items.ctype"' +
            '                                                                        :type="item.items.type" :multiple="item.items.multiple"' +
            '                                                                        :options="item.items.options" :disabled="item.disFlag"></yu-xform-item-part>' +
            '                                                </el-form-item>' +
            '                                            </el-col>' +
            '                                            <el-col :span="2" v-if="!item.disFlag">' +
            '                                                <i class="el-icon-yx-cross"' +
            '                                                   @click="queryCondelTableRow(index,list,item)"></i>' +
            '                                            </el-col>' +
            '                                        </el-row>' +
            '                                        <div v-for="(item,index) in item.children">' +
            '                                            <el-form label-width="80px" ref="refQueryChd"' +
            '                                                     style="margin: 0px;margin-top: 10px;">' +
            '                                                <!-- TODO -->' +
            '                                                <el-radio-group v-model="dataSqlTemp[item.id].radio2">' +
            '                                                    <!-- <el-radio-group > -->' +
            '                                                    <el-radio :label="item.and"></el-radio>' +
            '                                                    <el-radio :label="item.or"></el-radio>' +
            '                                                </el-radio-group>' +
            '                                                <div>' +
            '                                                    <el-row class="formrow" style="margin-top: 0px;padding: 10px;">' +
            '                                                        <el-col :span="7">' +
            '                                                            <el-form-item label="属性" class="mustWrite">' +
            '                                                                <yu-input :placeholder="item.name"' +
            '                                                                          v-model="dataSqlTemp[item.id].proPer"' +
            '                                                                          readonly></yu-input>' +
            '                                                                <!-- <yu-input :placeholder="item.name"  readonly></yu-input> -->' +
            '                                                            </el-form-item>' +
            '                                                        </el-col>' +
            '                                                        <el-col :span="7">' +
            '                                                            <el-form-item label="操作符" class="mustWrite"' +
            '                                                                          :rules="opRule" prop="childSignOp">' +
            '                                                                <!-- <el-select v-model="dataSqlTemp[item.id].signOp">' +
            '                                                                    <el-option v-for="(items, index) in signOptions" :key="index" :label="items.value" :value="items.key">' +
            '                                                                </el-option>' +
            '                                                                    </el-select> -->' +
            '                                                                <yu-xform-item-part' +
            '                                                                        v-model="dataSqlTemp[item.id].signOp"' +
            '                                                                        rules="required" :ctype="item.section.ctype"' +
            '                                                                        :options="item.section.options"></yu-xform-item-part>' +
            '                                                            </el-form-item>' +
            '                                                        </el-col>' +
            '                                                        <el-col :span="7">' +
            '                                                            <el-form-item label="属性值" class="mustWrite"' +
            '                                                                          :rules="signvRule" prop="childsignVal">' +
            '                                                                <yu-input placeholder=\'请填写\'' +
            '                                                                          v-model="dataSqlTemp[item.id].signVal"></yu-input>' +
            '                                                                <!-- <yu-input placeholder=\'请填写\'></yu-input> -->' +
            '' +
            '                                                            </el-form-item>' +
            '                                                        </el-col>' +
            '                                                        <el-col :span="3">' +
            '                                                            <!-- TODO 需要添加删除逻辑 -->' +
            '                                                            <i class="el-icon-yx-cross"></i>' +
            '                                                        </el-col>' +
            '                                                    </el-row>' +
            '                                                </div>' +
            '                                            </el-form>' +
            '                                        </div>' +
            '                                    </div>' +
            '                                </div>' +
            '                            </el-form>' +
            '                        </div>' +
            '                    </div>' +
            '            <div v-if="showBtn" class="yu-toolBar" style="text-align: center">' +
            '                <yu-button type="primary" @click="resetSearchFn">清空</yu-button>' +
            '                <yu-button type="primary" @click="chooseDefault(\'search\')">选择默认</yu-button>' +
            '                <yu-button type="primary" @click="queryInfoFn(\'search\')">保存为默认</yu-button>' +
            '            </div>' +
            '              <div>' +
            '                <div style="width: 65px; font-size: 16px; margin: 10px 20px; border-bottom: 2px solid #ccc; cursor: pointer;" ' +
            '                :style="{color: isColBtn ? \'red\' : \'#ccc\' }" @click="colBtn">展示数据</div>' +
            '              </div>' +
            '                    <div id="shouColumn"' +
            '                         style="background-color:#eee; height: 250px;">' +
            '                        <div id="queryCon1"' +
            '                             style="background-color:#eee;margin-top: 20px; height:200px; " @drop="bnsAllowDropShow($event)"' +
            '                             @dragover=\'allowDropover($event)\'>' +
            '                               <div v-for="(item, index) in conlist" :key="item.name" style="margin: 5px 10px 5px 5px; float: left;">' +
            '                                   <yu-tag type="" >{{ dataTemp[item.id].proPer }}</yu-tag>' +
            '                                   <i class="el-icon-yx-cross" @click="delShowColList(index,conlist,item)"></i>' +
            '                               </div>' +
            '                        </div>' +
            '                    </div>' +
            '                <div v-if="showBtn" class="yu-toolBar" style="text-align: center">' +
            '                    <yu-button type="primary" @click="resetColFn">清空</yu-button>' +
            '                 <yu-button type="primary" @click="chooseDefault(\'col\')">选择默认</yu-button>' +
            '                 <yu-button type="primary" @click="queryInfoFn(\'col\')">保存为默认</yu-button>' +
            '                </div>' +
            '            <div v-if="showBtn" class="yu-toolBar" style="text-align: center">' +
            '                <span v-if="pageInput">筛选条数：</span>' +
            '                <yu-input v-model="limitNum" v-if="pageInput" type="num" style="width: 60px;" @blur="yufp.util.number($event)"></yu-input>' +
            '                <yu-button type="primary" :disabled="btndisabled" v-if="queryBtn" :loading="queryLoading" @click="queryInfoFn(\'businessModel\')">{{queryLoading ? \'查询中...\' : \'查询结果\'}}</yu-button>' +
            '                <yu-button type="primary" v-if="resetBtn" @click="resetconditionFn">重置</yu-button>' +
            '                <yu-button type="primary" v-if="resetBtn" @click="exportListFn">下载列表....</yu-button>' +
            '            </div>' +
            '            <div style="color: red;font-size:14px; margin-left: 10px;margin-top:3%">注: 数值字段区间值格式为:数字~数字</div>' +
            '</el-tab-pane>' +
            '<el-tab-pane label="Excel导入模式" name="importModel">' +
            '             <div style="margin-top: 20px">' +
            '                <span style="width: 65px; font-size: 16px;color: red;margin: 10px 20px; border-bottom: 2px solid #ccc; cursor: pointer;" ' +
            '                   >展示数据</span>' +
            '                  <span style="margin-left: 10px">' +
            '                      <yu-button type="primary"  @click="downloadTemplateFn">下载模板</yu-button>' +
            '<yu-upload ref="upload" style="display: inline-block;margin-left:10px;" :action="actionUrl" :headers="headers" :data="uploadData" :show-file-list="false" :on-change="onChange" :on-success="onSuccess" :before-upload="beforeAvatarUpload">' +
            '<yu-button type="primary">上传</yu-button>' +
            '</yu-upload>' +
            '                  </span>' +
            '              </div>' +
            '                    <div id="shouColumn2"' +
            '                         style="background-color:#eee; height: 453px;">' +
            '                        <div id="queryCon2"' +
            '                             style="background-color:#eee;margin-top: 20px; height:400px; " @drop="excelAllowDrop($event)"' +
            '                             @dragover=\'excelAllowDropover($event)\'>' +
            '                               <div v-for="(item, index) in importModelList" :key="item.name" style="margin: 5px 10px 5px 5px; float: left;">' +
            '                                   <yu-tag type="" >{{ dataTemp[item.id].proPer }}</yu-tag>' +
            '                                   <i class="el-icon-yx-cross" @click="delShowColList2(index,importModelList,item)"></i>' +
            '                               </div>' +
            '                        </div>' +
            '                    </div>' +
            '            <div v-if="showBtn" class="yu-toolBar" style="text-align: center">' +
            '                <span v-if="pageInput">筛选条数：</span>' +
            '                <yu-input v-model="limitNum" v-if="pageInput" type="num" style="width: 60px;" @blur="yufp.util.number($event)"></yu-input>' +
            '                <yu-button type="primary" :disabled="btndisabled" v-if="queryBtn" :loading="imPortentLoading" @click="queryInfoFn(\'importModel\')">{{queryLoading ? \'查询中...\' : \'查询结果\'}}</yu-button>' +
            '                <yu-button type="primary" v-if="resetBtn" @click="importResetFn">重置</yu-button>' +
            '                <yu-button type="primary" v-if="resetBtn" @click="exportListFn">下载列表....</yu-button>' +
            '            </div>' +
            '</el-tab-pane>' +
            '</el-tabs>' +



            '    <!-- 查询结果展示-->' +
            '    <el-dialog-x title="查询结果" :visible.sync="dialogFormVisible1" width="900px" class="dialogOne dialog1100" :before-close="handleCustListClose">' +
            '        <div>' +
            '            <div class="yu-toolBar">' +
            '                <yu-button-group>' +
            '                    <yu-button icon="plus" @click="incustFn" :disabled="userSelectRole">加入客户群</yu-button>' +
            '                    <yu-button @click="exportListDataFn">导出</yu-button>' +
            '                    <yu-button style="color: #48576a" type="text" v-if="exportPassword">文档密码: {{exportPassword}}</yu-button>' +
            '                </yu-button-group>' +
            '            </div>' +
            '            <yu-xtable v-loading="loadingFlag" element-loading-text="拼命加载中" ref="qryresult" :data="data" border tooltip-effect="dark" ' +
            '                      style="margin-bottom: 20px; width: 100%;"' +
            '                      @selection-change="selectionChange" @row-click="rowClick">' +
            '                <yu-xtable-column type="selection"></yu-xtable-column>' +
            '                <yu-xtable-column v-for="(item, index) in tableColumnList" :key="index" :label="item.name" :prop="item.ename" width="150">' +
            '                </yu-xtable-column>' +
            '            </yu-xtable>' +
            '           <yu-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"' +
            '               :page-size="10" layout="total, prev, pager, next" :total="paginationTotal">' +
            '            </yu-pagination>' +
            '        </div>' +
            '    </el-dialog-x>' +
            '    <!-- 报表发布-->' +
            '    <el-dialog-x ref="reportpub" title="报表发布" :visible.sync="reportdialogVisible" width="600px" height="80px"' +
            '                 class="dialogOne">' +
            '        <el-form label-width="100px" ref="reportTemp" :model="reportTemp">' +
            '            <el-row :gutter="20">' +
            '                <el-col :span="24">' +
            '                    <el-form-item label="报表名称" class="mustWrite">' +
            '                        <yu-input placeholder=\'请填写\' v-model="reportTemp.reportName"></yu-input>' +
            '                    </el-form-item>' +
            '                </el-col>' +
            '            </el-row>' +
            '        </el-form>' +
            '        <div slot="footer" class="dialog-footer">' +
            '            <yu-button type="primary" icon="yx-checkmark" :disabled="pubbuttonsDisabled" @click="reportPublish">发布' +
            '            </yu-button>' +
            '            <yu-button type="primary" icon="yx-checkmark" :disabled="closebuttonsDisabled" @click="closedialog">关闭' +
            '            </yu-button>' +
            '        </div>' +
            '    </el-dialog-x>' +
            '    <!--保存方案-->' +
            '    <el-dialog-x ref="solutionform" title="保存方案" :visible.sync="solutionformVisible" width="500px" height="230px"' +
            '                 class="dialogOne cc">' +
            '        <el-form label-width="100px" ref="itemssTemp" :model="itemssTemp">' +
            '            <el-row :gutter="20">' +
            '                <el-col :span="15">' +
            '                    <el-form-item label="方案名称" class="mustWrite">' +
            '                        <yu-input placeholder=\'请填写方案名称\' v-model="itemssTemp.ssName"></yu-input>' +
            '                    </el-form-item>' +
            '                </el-col>' +
            '            </el-row>' +
            '        </el-form>' +
            '        <div slot="footer" class="dialog-footer">' +
            '            <yu-button type="primary" icon="yx-checkmark" @click="saveSolutionsub">保存</yu-button>' +
            '            <yu-button type="primary" icon="yx-checkmark" :disabled="closecustbuttonsDisabled" @click="closesave">关闭</yu-button>' +
            '        </div>' +
            '    </el-dialog-x>' +
            '<yu-xdialog title="请选择" :visible.sync="selectDialogVisible" width="500px">' +
            '       <div style="display:flex;font-size: 16px;">' +
            '    <div style="width: 50%;text-align: center;"><span @click="yescustomers">已有客户群<span></div>' +
            '    <div style="width: 50%;text-align: center"><span @click="nocustomers">新建客户群</span></div>' +
            '       </div>' +
            '    </yu-xdialog>' +
            '    <!-- 保存为客户群-->' +
            '    <el-dialog-x ref="customersdialog" title="新增自动筛选客户群" :visible.sync="addcustomersdialogVisible" width="600px"' +
            '                 height="400px"' +
            '                 class="dialogOne" :before-close="handleCustGroupClose">' +
            '        <el-form label-width="100px" ref="customersTemp" :model="customersTemp" :rules="ruless">' +
            '            <el-row :gutter="20">' +
            '                <el-col :span="24">' +
            '                    <el-form-item label="客户群名称" class="mustWrite" prop="custGroupName">' +
            '                        <yu-input placeholder=\'请填写\' v-model="customersTemp.custGroupName" maxlength="10"></yu-input>' +
            '                    </el-form-item>' +
            '                </el-col>' +
            '            </el-row>' +
            '            <el-row :gutter="20" v-if="!isCreateGroup">' +
            '                <el-col :span="24">' +
            '                    <el-form-item label="客户群类型" class="mustWrite" prop="custGroupType">' +
            '                        <el-select placeholder="请选择" v-model="customersTemp.custGroupType">' +
            '                            <el-option v-for="(item,index) in customersOptions" :key="index" :label="item.value"' +
            '                                       :value="item.key">' +
            '                            </el-option>' +
            '                        </el-select>' +
            '                    </el-form-item>' +
            '                </el-col>' +
            '            </el-row>' +
            '            <el-row :gutter="20" v-if="!isCreateGroup">' +
            '                <el-col :span="24">' +
            '                    <el-form-item label="群成员类型" class="mustWrite" prop="groupMemberType">' +
            '                        <el-select placeholder="请选择" v-model="customersTemp.groupMemberType" disabled="true">' +
            '                            <el-option v-for="(item,index)  in membersOptions" :key="index" :label="item.value"' +
            '                                       :value="item.key">' +
            '                            </el-option>' +
            '                        </el-select>' +
            '                    </el-form-item>' +
            '                </el-col>' +
            '            </el-row>' +
            '            <el-row :gutter="20" v-if="!isCreateGroup">' +
            '                <el-col :span="24">' +
            '                    <el-form-item label="共享范围" class="mustWrite">' +
            '                        <el-select placeholder="请选择" v-model="customersTemp.shareScope">' +
            '                            <el-option v-for="(item,index) in sharerangeOptions" :key="index" :label="item.value"' +
            '                                       :value="item.key">' +
            '                            </el-option>' +
            '                        </el-select>' +
            '                    </el-form-item>' +
            '                </el-col>' +
            '            </el-row>' +
            '            <el-row :gutter="20" v-if="!isCreateGroup">' +
            '                <el-col :span="24">' +
            '                    <el-form-item label="跑批标识" class="mustWrite" prop="batchType">' +
            '                        <el-select placeholder="请选择" v-model="customersTemp.batchType">' +
            '                            <el-option v-for="(item,index) in batchTypeOptions" :key="index" :label="item.value"' +
            '                                       :value="item.key">' +
            '                            </el-option>' +
            '                        </el-select>' +
            '                    </el-form-item>' +
            '                </el-col>' +
            '            </el-row>' +
            '            <el-row :gutter="20">' +
            '                <el-col :span="24">' +
            '                    <el-form-item label="客户群描述" class="mustWrite">' +
            '                        <yu-input type="textarea" v-model="customersTemp.remark" maxlength="100"></yu-input>' +
            '                    </el-form-item>' +
            '                </el-col>' +
            '            </el-row>' +
            '            <el-row :gutter="20" v-if="isCreateGroup">' +
            '                <el-col :span="24">' +
            '                    <el-form-item label="是否关注" class="mustWrite">' +
            '                        <yu-switch on-color="#ff4949" off-color="#C0C4CC" on-value="01" off-value="02" v-model="customersTemp.isFocus"></yu-switch>' +
            '                    </el-form-item>' +
            '                </el-col>' +
            '            </el-row>' +
            '        </el-form>' +
            '        <div slot="footer" class="dialog-footer">' +
            '            <yu-button type="primary" icon="yx-checkmark" :disabled="customersbuttonsDisabled" @click="savecustomers">' +
            '                保存' +
            '            </yu-button>' +
            '            <yu-button type="primary" icon="el-icon-close" :disabled="closecustbuttonsDisabled"' +
            '                       @click="closeaddcustomers">关闭' +
            '            </yu-button>' +
            '        </div>' +
            '    </el-dialog-x>' +
            '    <yu-xdialog title="加入客户群" :visible.sync="customersdialogVisible" width="650px">' +
            '        <yu-xform ref="customersTemp" label-width="150px" v-model="formdata" :hidden-rule="true"' +
            '                  :disabled="formDisabled">' +
            '            <yu-xform-group :column="1">' +
            '                <!-- <yu-xform-item label="加入方式" name="addType" ctype="select" data-code="ADD_GROUP_TYPE"  rules="required"></yu-xform-item> -->' +
            '                <yu-xform-item label="选择客户群" name="groupId" ctype="yufp-group-list" rules="required"' +
            '                               @select-fn="selectGroupFn"></yu-xform-item>' +
            '            </yu-xform-group>' +
            '            <div class="yu-grpButton">' +
            '                <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveaddcustomers">确定</yu-button>' +
            '                <yu-button icon="yx-undo2" type="primary" @click="cancelFn">取消</yu-button>' +
            '            </div>' +
            '        </yu-xform>' +
            '    </yu-xdialog>' +
            '    <!-- 分组-->' +
            '    <el-dialog-x title="分组汇总统计" :visible.sync="dialogFormVisible2" width="1000px" height="800px" class="dialogOne">' +
            '        <el-row>' +
            '            <el-col :span="14">' +
            '                <!-- 点击页面“分组汇总统计”按钮后展示的表格 -->' +
            '                <el-table-x ref="qrygroup" :checkbox="true" :default-load="false" :data="summTableData"' +
            '                            :table-columns="resultTableColumns"' +
            '                            :pageable=false>' +
            '                </el-table-x>' +
            '            </el-col>' +
            '            <el-col :span="10">' +
            '                <!--图表预览 -->' +
            '                <el-form label-width="100px" ref="chartTemp" :model="chartTemp" :rules="chartrule">' +
            '                    <el-row>' +
            '                        <el-col :span="24">' +
            '                            <el-form-item label="图表名称" class="mustWrite" prop="chartName">' +
            '                                <yu-input placeholder=\'图表名称\' v-model="chartTemp.chartName"></yu-input>' +
            '                            </el-form-item>' +
            '                        </el-col>' +
            '                    </el-row>' +
            '                    <el-row>' +
            '                        <el-col :span="12">' +
            '                            <el-form-item label="图表类型" class="mustWrite" prop="chartType">' +
            '                                <el-select placeholder="请选择" v-model="chartTemp.chartType" @change="chartchange">' +
            '                                    <el-option v-for="(item,index) in chartTypeOptions" :key="index" :label="item.value"' +
            '                                               :value="item.key">' +
            '                                    </el-option>' +
            '                                </el-select>' +
            '                            </el-form-item>' +
            '                        </el-col>' +
            '                        <el-col :span="12">' +
            '                            <el-form-item label="图表大小" class="mustWrite" prop="chartSize">' +
            '                                <el-select placeholder="请选择" v-model="chartTemp.chartSize">' +
            '                                    <el-option v-for="(item,index) in chartSizeOptions" :key="index" :label="item.value"' +
            '                                               :value="item.key">' +
            '                                    </el-option>' +
            '                                </el-select>' +
            '                            </el-form-item>' +
            '                        </el-col>' +
            '                    </el-row>' +
            '                </el-form>' +
            '                <el-form label-width="100px" ref="chartTagTemp" v-show="showPrise" :model="chartTagTemp"' +
            '                         :rules="charttagrule">' +
            '                    <el-row>' +
            '                        <el-col :span="12">' +
            '                            <el-form-item label="标签项" class="mustWrite" prop="chartTag">' +
            '                                <el-select placeholder="请选择" v-model="chartTagTemp.chartTag">' +
            '                                    <el-option v-for="(item,index) in chartTagOptions" :key="index" :label="item.name"' +
            '                                               :value="item.ename">' +
            '                                    </el-option>' +
            '                                </el-select>' +
            '                            </el-form-item>' +
            '                        </el-col>' +
            '                        <el-col :span="12">' +
            '                            <el-form-item label="指标项" class="mustWrite" prop="chartTarget">' +
            '                                <el-select placeholder="请选择" v-model="chartTagTemp.chartTarget">' +
            '                                    <el-option v-for="(item,index) in chartTargetOptions" :key="index"' +
            '                                               :label="item.value" :value="item.key">' +
            '                                    </el-option>' +
            '                                </el-select>' +
            '                            </el-form-item>' +
            '                        </el-col>' +
            '                    </el-row>' +
            '                </el-form>' +
            '                <el-form label-width="100px" ref="ychartNameTemp" v-show="showRentPrise" :model="ychartNameTemp"' +
            '                         :rules="ychartrule">' +
            '                    <el-row>' +
            '                        <el-col :span="12">' +
            '                            <el-form-item label="y轴名称" class="mustWrite" prop="ychartName">' +
            '                                <yu-input placeholder=\'y轴名称\' v-model="ychartNameTemp.ychartName"></yu-input>' +
            '                            </el-form-item>' +
            '                        </el-col>' +
            '                        <el-col :span="12">' +
            '                            <el-form-item label="y轴起始值" class="mustWrite" prop="ychartBegin">' +
            '                                <yu-input placeholder=\'y轴名称\' v-model="ychartNameTemp.ychartBegin"></yu-input>' +
            '                            </el-form-item>' +
            '                        </el-col>' +
            '                    </el-row>' +
            '                    <el-row>' +
            '                        <el-col :span="12">' +
            '                            <el-form-item label="x轴标签序列" class="mustWrite" prop="xchartTag">' +
            '                                <el-select placeholder="请选择" v-model="ychartNameTemp.xchartTag">' +
            '                                    <el-option v-for="(item,index) in xchartTagOptions" :key="index" :label="item.name"' +
            '                                               :value="item.ename">' +
            '                                    </el-option>' +
            '                                </el-select>' +
            '                            </el-form-item>' +
            '                        </el-col>' +
            '                        <el-col :span="12">' +
            '                            <el-form-item label="y轴指标序列" class="mustWrite" prop="ychartTarget">' +
            '                                <el-select placeholder="请选择" v-model="ychartNameTemp.ychartTarget">' +
            '                                    <el-option v-for="(item,index) in ychartTargetOptions" :key="index"' +
            '                                               :label="item.value" :value="item.key">' +
            '                                    </el-option>' +
            '                                </el-select>' +
            '                            </el-form-item>' +
            '                        </el-col>' +
            '                    </el-row>' +
            '                </el-form>' +
            '                <div class="yu-toolBar" style="text-align: center">' +
            '                    <yu-button type="primary" @click="drawImage" style="background-color: #2877ff;color: #fff;">预览' +
            '                    </yu-button>' +
            '                    <yu-button type="primary" @click="graphpub" style="background-color: #2877ff;color: #fff;">发布' +
            '                    </yu-button>' +
            '                </div>' +
            '                <yufp-echart :echart-option="echartData" height="300px"></yufp-echart>' +
            '            </el-col>' +
            '        </el-row>' +
            '    </el-dialog-x>' +
            '    <el-dialog :visible.sync="centerDialogVisible" size="tiny" center>' +
            '    <div style="height: 80px;line-height: 60px; text-align: center;">' +
            '      <span style="font-weight: bold;">当前查询条件预计客户数：</span>' +
            '      <span style="color:red;font-weight: bold;"> {{count}}</span>' +
            '    </div>' +
            '  </el-dialog>' +
            '    <!-- 审批流组件 -->' +
            '    <yufp-wf-init ref="approvalRef" @afterclose="onAfterCloseFn"  :common-params="wfCommonParams"></yufp-wf-init>' +
            '   <el-dialog-x  default-loadtitle="下载列表" :visible.sync="dialogDownVisible" height="450px" width="80%">' +
            '            <yu-xtable :border="false" ref="qryresultRef"  :data="wifntableData" ' +
            '                      style="margin-bottom: 20px; width: 100%;">' +
            '                <yu-xtable-column type="selection"></yu-xtable-column>' +
            '                <yu-xtable-column prop="spread" label="查询条件"></yu-xtable-column>' +
            '                <yu-xtable-column prop="columnName" label="显示列"></yu-xtable-column>' +
            '                <yu-xtable-column prop="status" label="状态">' +
            '                   <template slot-scope="scope">' +
            '                     <span v-if="scope.row.status == 02 ">审批中</span>' +
            '                     <span v-if="scope.row.status == 03 ">退回</span>' +
            '                     <span v-if="scope.row.status == 04 || scope.row.status == 07">通过</span>' +
            '                     <span v-if="scope.row.status == 05 ">撤回</span>' +
            '                   </template>' +
            '                </yu-xtable-column>' +
            '                <yu-xtable-column prop="createUser" label="创建人"></yu-xtable-column>' +
            '                <yu-xtable-column prop="createDate" label="创建时间"></yu-xtable-column>' +
            '           <yu-xtable-column label="操作" prop="">' +
            '               <template slot-scope="scope">' +
            '                   <yu-link v-if="scope.row.status == 02"  type="danger" :underline="false" @click="withdrawfn(scope.row)">撤回</yu-link>' +
            '                   <yu-link v-if="scope.row.status == 04" type="danger" :underline="false" @click="downEsListFn(scope.row)">下载</yu-link>' +
            '                   <span v-if="scope.row.status == 07" type="danger" :underline="false" style="color: #F56C6C">{{scope.row.password}}</span>' +
            '                   <yu-link v-if="scope.row.status == 03 || scope.row.status == 05 " type="danger" :underline="false" @click="datasetDeleFn(scope.row)">删除</yu-link>' +
            '               </template>' +
            '            </yu-xtable-colum>' +
            '            </yu-xtable>' +
            '   </el-dialog-x>' +
            '</div>',
        props: {
            custHashcode: {
                type: String,
            },
            btndisabled: {
                type: Boolean,
                default: false
            },
            markOperateFlag: {
                type: Boolean,
                default: false
            },
            custGroupOperateFlag: {
                type: Boolean,
                default: true
            },
            typeFlag: {
                type: Boolean,
                default: true
            },
            schemeId: {
                type: String,
                default: ''
            },
            schemeResult: {
                type: String,
                default: ''
            },
            schemeSort: {
                type: String,
                default: ''
            },
            showBtn: {
                type: Boolean,
                default: true
            },
            pageInput: {
                type: Boolean,
                default: false
            },
            // collapse: {
            //   type: Boolean,
            //   default: true
            // },
            queryBtn: {
                type: Boolean,
                default: true
            },
            saveAsCustBtn: {
                type: Boolean,
                default: true
            },
            saveBtn: {
                type: Boolean,
                default: false
            },
            resetBtn: {
                type: Boolean,
                default: true
            },
            params: {
                type: Object
            },
            mkCustType: {
                type: String,
                default: '0'
            },

            markSolutionShow: {
                type: Boolean,
                default: true
            },
            markSelectDisabled: {
                type: Boolean,
                default: false
            },
            markColShow: {
                type: Boolean,
                default: true
            },
            markFilterShow: {
                type: Boolean,
                default: false
            },
            custGroupQueryList: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            markAct: {
                type: Boolean,
                default: false
            },
            custGroup: {
                type: Boolean,
                default: false
            },
            firstSerch: {
                type: Boolean,
                default: false
            },
            height: {
                type: Number,
                default: yufp.frame.size().height - 20
            },
            newFunc: {
                type: Boolean,
                default: false
            },
            isCreateGroup: {
                type: Boolean,
                default: false
            },
            isOnlyJoin: {
                type: Boolean,
                default: false
            },
            groupId: String
        },
        data: function () {
            return this.createData();
        },

        mounted: function () {
            var me = this;
            me.userCodeNo();
            me.getQuerymgrlist();
            me.getQueryListInfoFn();
            yufp.lookup.bind('RQ_OPTION_COMPARE_ES', function (data) {
                me.compareOptions = data;
            });
            yufp.lookup.bind('RQ_OPTION_MATCH_ES', function (data) {
                me.matchOptions = data;
            });
            yufp.lookup.bind('RQ_OPTION_IN_ES', function (data) {
                me.inOptions = data;
            });
            // zcl 2021年1月5日10:20:46
            yufp.lookup.bind('REPEAT_OR_NOT_ES', function (lookup) {
                me.repeatOrNotlist = lookup;
            });
            me.expandFn(); // 默认展开
            me.$nextTick(function () {
                if (!me.markSolutionShow && !me.firstSerch) {
                    var list = JSON.parse(yufp.localStorage.get('custFlexList'));
                    var dataSqlTemp = JSON.parse(yufp.localStorage.get('custFlexdataSql'));
                    if (list) {
                        // me.list = JSON.parse(yufp.localStorage.get('custFlexList'));
                        for (var key in me.list) {
                            var item = me.list[key];
                            item['disFlag'] = true;
                        }
                    }
                    if (dataSqlTemp) {
                        me.dataSqlTemp = JSON.parse(yufp.localStorage.get('custFlexdataSql'));
                        for (var keySec in me.dataSqlTemp) {
                            var itemSec = me.dataSqlTemp[keySec];
                            itemSec['disFlag'] = true;
                        }
                    }
                }
            });
        },
        methods: {
            yescustomers: function () {
                // 加入客群
                this.customersdialogVisible = true;
            },
            nocustomers: function () {
                // 创建客群methods
                this.addcustomersdialogVisible = true;
            },
            /**
             * 模板下载
             */
            downloadTemplateFn: function () {
                // 向后台发送请求，下载模板
                var a = document.createElement("a"); //创建一个<a></a>标签
                a.href = "/libs/js-xlsx/NDSCustNo模板.xlsx"; // 注意，这里是绝对路径
                document.body.appendChild(a); // 将a标签追加到文档对象中
                a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
                a.remove();
            },
            onChange: function (file, fileList) {
                this.uploadData.busNo = this.uuid(16, 16);
                // 添加文件时，把文件名称单独列出来
                this.uploadData.fileName = encodeURI(file.name);
            },
            uuid: function (len, radix) {
                var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
                var uuid = [],
                    i;
                radix = radix || chars.length;
                if (len) {
                    // Compact form
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
            onSuccess: function (file) {
                var data = file.data;
                var _this = this;
                yufp.service.request({
                    method: 'POST',
                    url: '/api/cmssfcifq/uploadConditions',
                    data: data,
                    callback: function (code, message, response) {
                        if (code == 0) {
                            if (response.data && response.data.custNo && response.data.custNo.length > 0) {
                                _this.custNoArr = response.data.custNo.split(',');
                            }
                            if (response.data && response.data.ndsCustNo && response.data.ndsCustNo.length > 0) {
                                _this.ndsCustNoArr = response.data.ndsCustNo.split(',');
                            }
                            _this.$message({
                                type: 'success',
                                message: response.message
                            });
                            yufp.util.butLogInfo(_this.custHashcode, '模拟PPOP录入', '上传Excel');
                        }
                        if (code == -1) {
                            _this.$message({
                                type: 'error',
                                message: response.message
                            });
                        }
                    }
                });
            },
            beforeAvatarUpload: function (file) {
                var isLt10M = file.size / 1024 / 1024 < 50;
                if (!isLt10M) {
                    this.$message.error('上传文件大小不能超过 50MB!');
                }
                var index = file.name.lastIndexOf('.');
                var ext = file.name.substr(index + 1);
                var fileType = ['image/jpeg', 'image/gif', 'image/png', 'image/bmp', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf', 'application/zip', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/x-rar', 'application/x-zip-compressed', 'application/java-archive', 'image/gif', 'image/bmp', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/x-tar', 'application/octet-stream', 'application/x-rar-compressed'];
                var count = 0;
                var fileCheck = true;
                for (var i in fileType) {
                    if (file.type == fileType[i] || ext == 'rar') {
                        count++;
                    }
                }
                if (count == 0) {
                    fileCheck = false;
                    this.$message.error('上传文件应为图片、文本、表格、压缩包格式！');
                }
                return fileCheck && isLt10M;
            },
            handleClick: function (tab, event) {
            },
            // 审批页面关闭后
            onAfterCloseFn: function (num, row) {
                let _this = this;
                if (num === 4) {
                    for (let i = 0; i < _this.wifntableData.length; i++) {
                        if (_this.wifntableData[i].instanceId === row.instanceId) {
                            _this.$set(_this.wifntableData[i], 'status', '03')
                        }
                    }
                }
            },
            // 导出
            exportListDataFn: function (cust) {
                var _this = this;
                var filterSelecttions = _this.$refs.qryresult.selections;
                let conditionArry = JSON.parse(JSON.stringify(_this.conditionAttrs));
                var paramsCustno = {
                    "ssColType": "1",
                    "ssColItem": "10003",
                    "ssColEname": "custNo",
                    "ssColOp": "1",
                    "loanCustManagerN0": "",
                    "finCustManagerN0": "",
                    "finBelongOrgNo": "",
                    "loanBelongOrgNo": "",
                    "loanCustManagerName": "loanCustManagerN0",
                    "finCustManagerName": "finCustManagerN0",
                    "finBelongOrgName": "finBelongOrgNo",
                    "loanBelongOrgName": "loanBelongOrgNo",
                    "ssColValue": "",
                    "ssColGorder": "",
                    "seqno": _this.isseqno,
                    "ssColOrder": "0",
                    "status": "04",
                    "spread": "",
                    "conditionType": ""
                };
                if (_this.activeName == 'businessModel') {
                    paramsCustno.conditionType = '01'
                } else if (_this.activeName == 'importModel') {
                    paramsCustno.conditionType = '02'
                }
                for (let i = 0; i < conditionArry.length; i++) {
                    if (conditionArry[i].ssColEname != undefined && conditionArry[i].ssColEname == 'custNo') {
                        paramsCustno.ssColType = conditionArry[i].ssColType;
                        paramsCustno.ssColValue = conditionArry[i].ssColValue;
                        paramsCustno.ssColOp = conditionArry[i].ssColOp;
                    }
                }
                var stringCustno = "";
                var stringSpread = "客户号_包含";
                if (filterSelecttions.length > 0) {
                    let arr = [];
                    for (let j = 0; j < filterSelecttions.length; j++) {
                        arr.push(filterSelecttions[j].custNo);
                        if (j == 0) {
                            stringCustno += filterSelecttions[j].custNo
                        } else {
                            stringCustno = stringCustno + ',' + filterSelecttions[j].custNo;
                        }
                        stringSpread = stringSpread + '_' + filterSelecttions[j].custNo;

                    }
                    paramsCustno.spread = stringSpread;
                    paramsCustno.ssColValue = arr;
                    paramsCustno.ssColType = '6';
                }
                custObject = paramsCustno;
                if (cust && cust == 'incustFn') { //cust等于incustFn 表示加入客群
                    _this.savainsertHandle(cust)
                } else { // 表示导出
                    if (filterSelecttions.length == 0 && _this.paginationTotal > 10000) {
                        _this.$message({
                            showClose: true,
                            message: '当前数据条数超过10000, 暂不支持下载',
                            type: 'warning'
                        });
                        return;
                    }
                    _this.$confirm('您确定要导出吗', '提示', {
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    }).then(function () {
                        _this.savainsertHandle(cust)
                    }).catch(function () {
                        return;
                    });
                }
            },
            searchParamSet: function (iputValueList) {
                // 根据获取到的标识符查找数据字典中对应的中文
                let _set = this;
                for (let s = 0; s < iputValueList.length; s++) {
                    for (let k = 0; k < _set.conditionAttrs.length; k++) {
                        if (iputValueList[s].id === _set.conditionAttrs[k].ssColItem) {
                            if (Object.prototype.toString.call(iputValueList[s].signVal) === '[object Array]') {
                                let str = ''
                                let newStr = ''
                                for (let a = 0; a < iputValueList[s].signVal.length; a++) {
                                    str += iputValueList[s].signVal[a] + '_'
                                }
                                newStr = str.substring(0, str.lastIndexOf('_'))
                                _set.conditionAttrs[k].spread = iputValueList[s].proPer + '_' + iputValueList[s].signOp + '_' + newStr
                            } else {
                                _set.conditionAttrs[k].spread = iputValueList[s].proPer + '_' + iputValueList[s].signOp + '_' + iputValueList[s].signVal
                            }
                        }
                    }
                }
            },
            // 查询结果导出
            savainsertHandle: function (cust) {
                let _set = this;
                _set.isseqno = String(new Date().getTime());
                _set.conditionAttrs.forEach(function (item) {
                    item.seqno = _set.isseqno;
                    item.status = '04';
                    if (_set.activeName == 'businessModel') {
                        item.conditionType = '01';
                    } else if (_set.activeName == 'importModel') {
                        item.conditionType = '02';
                    }
                })
                _set.results.forEach(function (item) {
                    item.seqno = _set.isseqno
                })
                let infoList = JSON.parse(JSON.stringify(_set.dataSqlTemp));
                _set.queryOwnData(infoList);
                let iputValueList = _set.queryOwnData(infoList);
                _set.searchParamSet(iputValueList)
                for (let y = 0; y < _set.conlist.length; y++) {
                    for (let z = 0; z < _set.results.length; z++) {
                        if (_set.conlist[y].id === _set.results[z].columnId) {
                            _set.results[z].columnName = _set.conlist[y].name;
                        }
                        if (_set.results[z].columnEName === 'custNo') {
                            _set.results[z].columnName = '客户号'
                        }
                        if (_set.results[z].columnEName === 'custName') {
                            _set.results[z].columnName = '客户名称'
                        }
                    }
                }
                custObject.seqno = _set.isseqno;
                custObject.ssColGorder = _set.conditionAttrs.length;
                var custnoflag = true;
                if (_set.conditionAttrs.length > 0) {
                    for (let i = 0; i < _set.conditionAttrs.length; i++) {
                        if (_set.conditionAttrs[i].ssColEname == 'custNo') {
                            _set.conditionAttrs[i] = custObject;
                            custnoflag = false;
                        }
                    }
                }

                if (custnoflag) {
                    _set.conditionAttrs.push(custObject);
                }
                for (let i = 0; i < _set.conditionAttrs; i++) {
                    _set.conditionAttrs[i].loanCustManagerN0 = _set.loanCustManagerN0;
                    _set.conditionAttrs[i].finCustManagerN0 = _set.finCustManagerN0;
                    _set.conditionAttrs[i].finBelongOrgNo = _set.finBelongOrgNo;
                    _set.conditionAttrs[i].loanBelongOrgNo = _set.loanBelongOrgNo;
                }
                var param = {
                    condition: JSON.stringify({
                        conditionAttrs: _set.conditionAttrs,
                        results: _set.results,
                        topNum: _set.limitNum,
                        isexport: '1',
                        loanCustManagerN0: _set.loanCustManagerN0,
                        finCustManagerN0: _set.finCustManagerN0,
                        finBelongOrgNo: _set.finBelongOrgNo,
                        loanBelongOrgNo: _set.loanBelongOrgNo,
                        loanCustManagerName: 'loanCustManagerN0',
                        finCustManagerName: 'finCustManagerN0',
                        finBelongOrgName: 'finBelongOrgNo',
                        loanBelongOrgName: 'loanBelongOrgNo'
                    })
                };
                yufp.service.request({
                    method: 'POST',
                    url: '/api/cmssfcifq/insertEsExportQuery',
                    data: param,
                    callback: function (code, message, response) {
                        if (code == 0 && response.code === 0) {
                            if (cust && cust == 'incustFn') {
                                _set.selectCusts()
                            } else {
                                let params = {
                                    seqno: _set.isseqno,
                                    password: response.data,
                                    exportDown: '0'
                                };
                                _set.nextDownFn(params);
                            }
                            yufp.util.butLogInfo(_set.custHashcode, '查询结果', '导出');
                        }
                    }
                });
            },
            postData: function () {
                var _this = this;
                // 在确定事件中再执行组件提交方法
                var commitData = {};
                commitData.instanceId = '';
                commitData.bizSeqNo = _this.isseqno; // 关联业务编号
                commitData.applType = 'ESDW'; // 工作报告审批流程
                commitData.custName = yufp.session.userName; // 展示主题名称
                commitData.custId = yufp.session.userId;
                commitData.paramMap = {
                    selectRole: _this.selectRoleCode, // 当前用户角色
                };
                var load = _this.$loading();
                _this.$refs.approvalRef.wfInit(commitData, load);
                _this.$message.success('操作成功');
                _this.optionDialogVisible = false;
            },
            // 下载列表
            exportListFn: function () {
                let _this = this;
                _this.dialogDownVisible = true;
                yufp.util.downTableList('', _this.custHashcode, function (arr) {
                    _this.wifntableData = arr
                })
            },
            queryOwnData: function (infoList) {
                let _set = this;
                let arrList = [];
                let listInfom = _set.list;
                for (var key in infoList) {
                    let obj = { id: '', proPer: '', signOp: '', signVal: '' };
                    obj.id = key;
                    obj.proPer = infoList[key].proPer;
                    obj.signOp = infoList[key].signOp;
                    obj.signVal = infoList[key].signVal;
                    arrList.push(obj);
                }
                arrList.pop();
                for (let i = 0; i < arrList.length; i++) {
                    for (let j = 0; j < listInfom.length; j++) {
                        if (arrList[i].id === listInfom[j].id) {
                            for (let k = 0; k < listInfom[j].section.options.length; k++) {
                                if (Object.prototype.toString.call(arrList[i].signOp) === '[object Array]') {
                                    for (let h = 0; h < arrList[i].signOp.length; h++) {
                                        if (arrList[i].signOp[h] === listInfom[j].section.options[k].key) {
                                            arrList[i].signOp[h] = listInfom[j].section.options[k].value
                                        }
                                    }
                                } else {
                                    if (arrList[i].signOp === listInfom[j].section.options[k].key) {
                                        arrList[i].signOp = listInfom[j].section.options[k].value
                                    }
                                }
                            }
                            for (let t = 0; t < listInfom[j].items.options.length; t++) {
                                if (Object.prototype.toString.call(arrList[i].signVal) === '[object Array]') {
                                    for (let g = 0; g < arrList[i].signVal.length; g++) {
                                        if (arrList[i].signVal[g] === listInfom[j].items.options[t].key) {
                                            arrList[i].signVal[g] = listInfom[j].items.options[t].value
                                        }
                                    }
                                } else {
                                    if (arrList[i].signVal === listInfom[j].items.options[t].key) {
                                        arrList[i].signVal = listInfom[j].items.options[t].value
                                    }
                                }
                            }
                        }
                    }
                }
                return arrList;
            },
            // 下载
            downEsListFn: function (info) {
                let _this = this;
                let now = new Date().valueOf();
                if (_this.lastTime === 0) {
                    _this.nextDownFn(info)
                    _this.lastTime = now
                } else if (now - this.lastTime > 7000) {
                    _this.lastTime = now
                    _this.nextDownFn(info)
                } else {
                    return
                }
            },
            nextDownFn: function (info) {
                let _this = this;
                if (info) {
                    let params = {
                        seqno: info.seqno
                    }
                    var url = '/api/cmssfcifq/exportExportQuery?condition=' + encodeURI(JSON.stringify(params));
                    yufp.util.download(url);
                    yufp.util.butLogInfo(_this.custHashcode, '下载列表', '下载');
                    let timeMer = setTimeout(function () {
                        let pwinfo = yufp.base64.decode(info.password)
                        if (info.exportDown != undefined && info.exportDown == '0') {
                            _this.exportPassword = pwinfo
                        } else {
                            for (let i = 0; i < _this.wifntableData.length; i++) {
                                if (info.seqno === _this.wifntableData[i].seqno) {
                                    _this.wifntableData[i].password = pwinfo
                                    _this.wifntableData[i].status = '07'
                                }
                            }
                        }
                        clearTimeout(timeMer)
                    }, 5000)
                }
            },
            // 删除
            datasetDeleFn: function (info) {
                let _this = this;
                yufp.service.request({
                    url: '/api/cmssfcifq/deleteExportQuery',
                    method: 'post',
                    data: info.seqno,
                    callback: function (code, message, response) {
                        if (code == 0) {
                            yufp.util.butLogInfo(_this.custHashcode, '下载列表', '删除');
                            if (response.code == 0) {
                                for (let i = 0; i < _this.wifntableData.length; i++) {
                                    if (info.seqno === _this.wifntableData[i].seqno) {
                                        _this.wifntableData.splice(i, 1)
                                    }
                                }
                                _this.$message({ message: '删除成功!' });
                            } else if (response.code === -1) {
                                _this.$message({
                                    showClose: true,
                                    message: response.message,
                                    type: 'warning'
                                });
                            } else {
                                _this.$message({
                                    showClose: true,
                                    message: response.message,
                                    type: 'error'
                                });
                            }
                        }
                    }
                });
            },
            // 撤回
            withdrawfn: function (row) {
                var _this = this;
                params = {
                    'instanceId': row.instanceId
                }
                this.$confirm('确定要执行撤回操作吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(function () {
                    _this.$refs.approvalRef.withdraw(params);
                })
            },
            searchBtn: function () {
                this.isSearchBtn = true;
                this.isColBtn = false;
            },
            colBtn: function () {
                this.isSearchBtn = false;
                this.isColBtn = true;
            },
            getQueryListInfoFn: function (type) {
                var _this = this;
                if (type) {
                    _this.saveSeaList = [];
                    _this.saveColList = [];
                }
                yufp.service.request({
                    method: 'GET',
                    data: {
                        userId: yufp.session.userId
                    },
                    url: '/api/cmssfcifq/EsUserQueryList',
                    callback: function (code, message, response) {
                        if (code == 0) {
                            var listArr = response.data;
                            for (var i = 0; i < listArr.length; i++) {
                                listArr[i].notes = listArr[i].items;
                                listArr[i].section = JSON.parse(listArr[i].sections);
                                listArr[i].ename = listArr[i].attributeNo;
                                listArr[i].name = listArr[i].attributeName;
                                if (listArr[i].queryType == '01') {
                                    _this.saveSeaList.push(listArr[i]);
                                } else {
                                    _this.saveColList.push(listArr[i]);
                                }
                            }
                        }
                    }
                })
            },
            chooseDefault: function (type) {
                var _this = this;
                if (type == 'search') {
                    _this.list = [];
                    for (var i = 0; i < _this.saveSeaList.length; i++) {
                        _this.addTabInfoFn(_this.saveSeaList[i], 'isAdd');
                    }
                } else {
                    _this.collist = [];
                    for (var i = 0; i < _this.saveColList.length; i++) {
                        _this.addTabInfoFns(_this.saveColList[i], 'isAdd');
                    }
                }
            },
            delShowColList: function (index, list, item) {
                list.splice(index, 1);
            },
            delShowColList2: function (index, list, item) {
                list.splice(index, 1);
            },
            getQuerymgrlist: function () {
                var _this = this;
                yufp.service.request({
                    method: 'GET',
                    url: '/api/ocrmfcicgbase/querymgrlist',
                    callback: function (code, message, response) {
                        if (!response.data) { // 返回的数据是空
                            //
                        }
                        if (response.data.orgList) {
                            _this.finBelongOrgNo = response.data.orgList;
                            _this.loanBelongOrgNo = response.data.orgList;
                        }
                        if (response.data.mgrType) {
                            if (response.data.mgrType == '1') {
                                if (response.data.onemgrList) {
                                    _this.finCustManagerN0 = response.data.onemgrList;
                                } else if (response.data.twomgrList) {
                                    _this.loanCustManagerN0 = response.data.twomgrList;
                                }
                                if (response.data.mgrList) {
                                    _this.finCustManagerN0 = response.data.mgrList;
                                }
                            } else {
                                if (response.data.onemgrList) {
                                    _this.loanCustManagerN0 = response.data.onemgrList;
                                } else if (response.data.twomgrList) {
                                    _this.finCustManagerN0 = response.data.twomgrList;
                                }
                                if (response.data.mgrList) {
                                    _this.loanCustManagerN0 = response.data.mgrList;
                                }
                            }
                        }
                    }
                });
            },
            searchInfo: function () {
                var _this = this;
                _this.queryInfoFn('showList');
            },
            // 查询当前用户权限
            userCodeNo: function () {
                let _this = this;
                var selectRole = yufp.sessionStorage.get('selectRole');
                var rolesArr = yufp.session.roles;
                for (var i = 0; i < rolesArr.length; i++) {
                    if (selectRole == rolesArr[i].id) {
                        if (_this.userRoleArr.indexOf(rolesArr[i].code) != -1) {
                            _this.userSelectRole = true; // 包含
                        } else {
                            _this.userSelectRole = false;
                        }
                    }
                }
            },
            /**
             * 操作符-针对日期字段-选区间时特殊处理
             */
            signOpChange: function (val, id, index) {
                if (this.list[index].fieldType == '3') { // 只针对-日期类型做处理
                    if (val == '6') { // 操作符=区间
                        this.list[index].items.type = 'daterange';
                    } else {
                        this.list[index].items.type = 'date';
                        if (this.dataSqlTemp[id].signVal instanceof Array) {
                            this.dataSqlTemp[id].signVal = '';
                        }
                    }
                }
                // else if (this.list[index].fieldType == '2') { // 只针对-日期类型做处理
                //     if (val == '6') { // 操作符=区间
                //         this.list[index].items.type = '';
                //         this.checkQjNum = true;
                //     } else {
                //         this.checkQjNum = false;
                //         this.list[index].items.type = 'num';
                //         if (this.dataSqlTemp[id].signVal instanceof String) {
                //             this.dataSqlTemp[id].signVal = '';
                //         }
                //     }
                // }
            },
            // checkTypeObj: function (val) {
            //   var me = this;
            //   if (val) {
            //     me.objOptions.forEach(function (itm) {
            //       if (val == itm.type) {
            //         me.objValue = itm;
            //       }
            //     });
            //   } else {
            //     me.objValue = me.objOptions[0];
            //   }
            // },
            createData: function () {
                var me = this;
                var temp = me.getDefaultData();
                yufp.extend(true, temp, me.params);
                temp.list = me.custGroupQueryList;
                return temp;
            },
            getDefaultData: function () {
                var me = this;
                var checkValid = function (rule, value, callback) {
                    if (!value) {
                        callback(new Error('属性不能为空'));
                    } else {
                        callback();
                    }
                };
                return {
                    selectDialogVisible: false,
                    activeName: 'businessModel',
                    importModelList: [],
                    custNoArr: [],
                    ndsCustNoArr: [],
                    singleList: [],
                    exportPassword: '',
                    lastTime: 0,
                    filterText: '',
                    dialogDownVisible: false,
                    compareOptions: [],
                    matchOptions: [],
                    inOptions: [],
                    signOptions: [],
                    typeOptions: [],
                    comboSelectOptions: [],
                    numDataOptions: [],
                    textOptions: [],
                    radioComboOptions: [],
                    repeatOrNotlist: [],
                    collapse: true,
                    widthsol: '34px',
                    wifntableData: [],
                    // btnDisabled: false,
                    colv: {
                        solcol: 1,
                        spanTree: 4,
                        spanS: 14
                    },
                    pageHeight: yufp.frame.size().height + 'px',
                    rptButton: !yufp.session.checkCtrl('rptPub'), // 发布报表选择按钮控制
                    graphButton: !yufp.session.checkCtrl('graphPub'), // 发布报表选择按钮控制
                    echartData: {}, // 图表预览
                    formdata: {},
                    formDisabled: false,
                    name: 'asdsad',
                    param: { groupNo: '0', levelunit: '1' },
                    treeUrl: '/api/cmssfcifq/queryfqtreedata',
                    uploadData: {
                        busNo: ''
                    },
                    headers: {
                        'Authorization': 'Bearer ' + yufp.service.getToken()
                    },
                    uploadAction: backend.fileService + '/api/file/provider/uploadfile',
                    selectList: [], // 选中的作为查询条件的标签
                    settinglist: [],
                    setselectList: [], // 选中的作为查询条件的标签
                    qryList: [], // 查询条件
                    setlist: [], // 查询条件
                    custtagList: [],
                    tags1: tags1,
                    opRule: [{ required: true, message: '操作符不能为空' }],
                    signvRule: [{ required: true, message: '属性不能为空' }],
                    // signvRule: [{ validator: checkValid, trigger: 'blur' }],
                    tagTemp: { custName: '', definedTag: '' },
                    dialogTagForm: false,
                    buttonsDisabled: false,
                    wfCommonParams: {
                        sessionInstuCde: yufp.session.instu.code,
                        sessionOrgCode: yufp.session.org.code,
                        sessionLoginCode: yufp.session.user.loginCode
                    },
                    queryFields: [
                        { placeholder: '客户群编号', field: 'clientsNO', type: 'input' },
                        { placeholder: '客户群名称', field: 'clientsName', type: 'input' },
                        { placeholder: '群成员类型', field: 'clientsType', type: 'input' }
                    ],
                    optionData: [],
                    // 分组汇总统计表格数据
                    summTableData: [],
                    loadingFlag: false,
                    currentPage: 1,
                    // 分组统计汇总结果页列表列数据
                    resultTableColumns: [{ label: '序号', width: '60', type: 'index' }],
                    tableColumns: [
                        { label: '客户群编号', prop: 'clientsNO', width: '150', resizable: true },
                        { label: '客户群名称', prop: 'clientsName', width: '150', resizable: true },
                        { label: '客户来源', prop: 'clientOrigin', width: '150', resizable: true, dataCode: 'CLIENT_ORIGIN' },
                        { label: '群成员类型', prop: 'clientsType', width: '150', resizable: true, dataCode: 'CLIENT_TYPE' },
                        { label: '共享范围', prop: 'sharedScope', width: '120', resizable: true, dataCode: 'SHARED_SCOPE' },
                        { label: '成员数', prop: 'clientNum', resizable: true },
                        { label: '创建人', prop: 'founder', resizable: true },
                        { label: '创建日期', prop: 'creationDate', resizable: true },
                        { label: '创建机构', prop: 'createInstitutions', resizable: true },
                        { label: '最近更新日期', prop: 'lastUpdateDate', resizable: true }
                    ],
                    ssolutiontableColumns: [
                        { label: '方案名称', prop: 'ssName', resizable: true },
                        { label: '创建时间', prop: 'ssDate', resizable: true } // ,

                        // { label: '创建人', prop: 'userName', resizable: true },
                        // { label: '创建机构', prop: 'orgName', resizable: true }
                    ],
                    queryFieldss: [{
                        placeholder: '客户群名称',
                        field: 'custGroupIds',
                        type: 'custom',
                        is: 'yufp-custGroup'
                    }],
                    queryButtonss: [],
                    clientsView1: [
                        { prop: 'custId', label: '客户号', type: 'input' },
                        { prop: 'custName', label: '客户名称', type: 'input' },
                        { prop: 'certType', label: '证件类型', type: 'input', dataCode: 'IDENT_TYPE' },
                        { prop: 'certNo', label: '证件号码', type: 'input' },
                        { prop: 'custType', label: '客户类型', type: 'input', dataCode: 'CUST_TYPE' }
                    ],
                    joinUrl: '/trade/cust/custNoJoin?clientsNO=0',
                    ssolutionUrl: '/api/cmssfcifq/querysolutionlist',
                    objOptions: [],
                    objValue: {},
                    searchObjType: {},
                    groupparam: {
                        condition: JSON.stringify({
                            // queryTytpe: objvalue.type.toString(),
                            queryId: '1'
                        })
                    },
                    firstOptions: firstOptions,
                    secondOptions: secondOptions,
                    thirdOptions: thirdOptions,
                    fourOptions: fourOptions,
                    fiveOptions: fiveOptions,
                    columnOptions: columnOptions,
                    chartTagOptions: chartTagOptions,
                    xchartTagOptions: xchartTagOptions,
                    chartTargetOptions: chartTargetOptions,
                    ychartTargetOptions: ychartTargetOptions,
                    customersColumnOptions: customersColumnOptions,
                    countSumOptions: countSumOptions,
                    // comboSelectOptions: comboSelectOptions,
                    // numDataOptions: [{ key: '1', value: '等于' }, { key: '2', value: '不等于' }, {
                    //   key: '3',
                    //   value: '大于'
                    // }, { key: '4', value: '大于等于' }, { key: '5', value: '小于' }, { key: '6', value: '小于等于' }],
                    // textOptions: textOptions,
                    // radioComboOptions: radioComboOptions,
                    sumNamesOptions: sumNamesOptions,
                    // typeOptions: typeOptions,

                    value: '1', // 下拉框默认值
                    orderOptions: [{ key: '1', value: '不排序' }, { key: '2', value: '正序' }, { key: '3', value: '逆序' }],
                    chartTypeOptions: [{ key: 'pie', value: '饼图' }, { key: 'line', value: '趋势图' }, {
                        key: 'bar',
                        value: '柱状图'
                    }],
                    chartSizeOptions: [{ key: '1', value: '[2*2]' }, { key: '2', value: '[2*3]' }, {
                        key: '3',
                        value: '[3*2]'
                    }, { key: '3', value: '[3*3]' }],
                    customersOptions: [{ key: '1', value: '普通客户群' }, { key: '2', value: '商圈客户群' }, {
                        key: '3',
                        value: '链式客户群'
                    }, { key: '3', value: '族群' }, { key: '3', value: '集团' }],
                    membersOptions: [{ key: '1', value: '对公客户群' }, { key: '2', value: '对私客户群' }, {
                        key: '3',
                        value: '公私联动客户群'
                    }],
                    sharerangeOptions: [{ key: '1', value: '私有' }, { key: '2', value: '全行共享' }, {
                        key: '3',
                        value: '本机构共享'
                    }, { key: '4', value: '辖内机构共享' }],
                    batchTypeOptions: [{ key: '1', value: '跑批一次' }, { key: '2', value: '每天跑批' }],
                    dataSqlTemp: {
                        ID: {
                            signOp: ''
                        }
                    },
                    incustomersTemp: {
                        incustomers: ''
                    },
                    dataTemp: {},
                    groupform: {
                        firstgroup: '',
                        secondgroup: '',
                        thirdgroup: '',
                        fourgroup: '',
                        fivegroup: ''
                    },
                    chartTemp: {
                        chartName: '',
                        chartSize: '',
                        chartType: ''
                    },
                    chartTagTemp: {
                        chartTag: '',
                        chartTarget: ''
                    },
                    ychartNameTemp: {
                        ychartName: '',
                        ychartBegin: '',
                        xchartTag: '',
                        ychartTarget: '',
                        chartType: ''
                    },
                    itemssTemp: {
                        ssName: ''
                    },
                    reportTemp: {
                        reportName: ''
                    },

                    groupTemp: {},
                    customersTemp: {
                        custGroupName: '',
                        custGroupType: '',
                        customersColumn: '',
                        groupMemberType: '',
                        batchType: '',
                        shareScope: '',
                        remark: ''
                    },
                    ruless: {
                        custGroupName: [{ required: true, message: '必填项', trigger: 'blur' }],
                        custGroupType: [{ required: true, message: '必填项', trigger: 'blur' }],
                        // customersColumn:[{required: true, message: '必填项', trigger: 'blur'}],
                        groupMemberType: [{ required: true, message: '必填项', trigger: 'blur' }],
                        batchType: [{ required: true, message: '必填项', trigger: 'blur' }]
                    },
                    chartrule: {
                        chartName: [{ required: true, message: '必填项', trigger: 'blur' }],
                        chartType: [{ required: true, message: '必填项', trigger: 'blur' }]
                    },
                    charttagrule: {
                        chartTag: [{ required: true, message: '必填项', trigger: 'blur' }],
                        chartTarget: [{ required: true, message: '必填项', trigger: 'blur' }]
                    },
                    ychartrule: {
                        ychartName: [{ required: true, message: '必填项', trigger: 'blur' }],
                        ychartBegin: [{ required: true, message: '必填项', trigger: 'blur' }],
                        xchartTag: [{ required: true, message: '必填项', trigger: 'blur' }],
                        ychartTarget: [{ required: true, message: '必填项', trigger: 'blur' }]
                    },
                    list: [],
                    data: [],
                    conditionAttrs: [],
                    rulesList: [],
                    busiTypeFlag: [],
                    qryarr: [],
                    results: [],
                    tableColumnList: [],
                    grouplist: [],
                    groupnamelist: [],
                    conlist: [],
                    colunmNamelist: [],
                    fieldDatas: [],
                    qrylist: [],
                    treedata: [],
                    solutionlist: [],
                    limitNum: '', // 查询条数
                    height: yufp.frame.size().height - 20,
                    groupHeight: yufp.frame.size().height - 360,
                    dialogVisible: false,
                    dialogFormVisible1: false,
                    dialogFormVisible2: false,
                    showPrise: false,
                    addcustomersdialogVisible: false,
                    showRentPrise: false,
                    pubbuttonsDisabled: false,
                    closebuttonsDisabled: false,
                    reportdialogVisible: false,
                    casedialogVisible: false,
                    savebuttonsDisabled: false,
                    closecasebuttonsDisabled: false,
                    customersdialogVisible: false,
                    customersbuttonsDisabled: false,
                    closecustbuttonsDisabled: false,
                    incustomersdialogVisible: false,
                    customersqrydialogVisible: false,
                    solutionformVisible: false,
                    viewType: 'DETAIL',
                    yesNoPreview: false,
                    async: false,
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    radioshow: true,
                    dragnode: '',
                    radio2: '',
                    saveBtnShow: true,
                    saveBtn: false, // 是否保存方案
                    qryresultSelections: [],
                    filterGrid: {
                        // 系统参数当前行
                        currentRow: null,
                        // 系统参数多选ID
                        multipleSelection: '',
                        data: null,
                        subdata: null,
                        total: null,
                        loading: true,
                        subloading: true
                    },
                    tableData: [{
                        summColumnId: '',
                        summTypeId: '',
                        summNameId: '',
                        summColumn: '',
                        summType: '',
                        summName: ''
                    }, {
                        summColumn: '',
                        summType: '',
                        summName: ''
                    }, {
                        summColumn: '',
                        summType: '',
                        summName: ''
                    }, {
                        summColumn: '',
                        summType: '',
                        summName: ''
                    }, {
                        summColumn: '',
                        summType: '',
                        summName: ''
                    }],
                    orRepeat: '1',
                    repeatOrNotlist: [],
                    centerDialogVisible: false,
                    count: '',
                    sql: '',
                    selInpValList: [],
                    paginationTotal: '',
                    queryLoading: false,
                    imPortentLoading: false,
                    userSelectRole: false,
                    userRoleArr: ['R001', 'R006', 'R007', 'R008', 'R009', 'R010', 'R011', 'R012'],
                    NoApprovalProcess: ['R001', 'R005', 'R006', 'R007', 'R008', 'R009', 'R010', 'R013', 'R020', 'R021', 'R022'],
                    showCustId: true,
                    showEname: true,
                    finCustManagerN0: '',
                    loanCustManagerN0: '',
                    finBelongOrgNo: '',
                    loanBelongOrgNo: '',
                    showColList: [],
                    checkQjNum: false,
                    isSearchBtn: true,
                    isColBtn: false,
                    saveSeaList: [],
                    saveColList: []
                };
            },
            // 变换对象选项加载分组
            objchange: function (objvalue) {
                if (!objvalue) {
                    return;
                }
                this.resetconditionFn();
                this.flag = false;
                this.groupval = '';
                this.searchObjType = objvalue;
                // 存储当前选择的值
                this.objType = objvalue.key;
                if (typeof objvalue.key === 'number') {
                    this.groupparam = {
                        condition: JSON.stringify({
                            queryTytpe: objvalue.type.toString(),
                            queryId: objvalue.key.toString()
                        })
                    };
                    this.$refs.flexytree.remoteData();
                    if (!this.collapse) {
                        var baseparamsin = { condition: JSON.stringify({ objType: this.searchObjType.key.toString() }) };
                        this.$refs.filterTable.remoteData(baseparamsin);
                    }
                }
            },
            /**
             * 展开方案列表
             */
            expandFn: function () {
                this.collapse = false;
                this.widthsol = '220px';
                this.colv.solcol = 4;
                this.colv.spanTree = 3;
                this.colv.spanS = 16;
                var baseparamsin = { condition: JSON.stringify({ ssType: '1' }) }; // 默认查询零售业务方案
                this.$refs.filterTable.remoteData(baseparamsin);
            },
            /**
             * 收缩方案列表
             */
            shrinkFn: function () {
                this.collapse = true;
                this.widthsol = '34px';
                this.colv.solcol = 1;
                this.colv.spanTree = 4;
                this.colv.spanS = 19;
            },
            getdata: function (value) {
                this.treedata = value;
            },
            // 双击方案列表回显示方案
            dblclick: function (row, event) {
                var _this = this;
                _this.itemssTemp.ssName = row.ssName;
                _this.resetconditionFn();
                var fieldId = row.id;
                var ssResult = '';
                var ssSort = '';
                if (row.ssResult != undefined) {
                    ssResult = row.ssResult.split(','); // 取出显示列3354,3346
                }
                if (row.ssSort != undefined) {
                    ssSort = row.ssSort.split(','); // 取出排序1,1
                }
                // 回显-展示项面板字段
                for (var i = 0; i < ssResult.length; i++) {
                    var sslist = {};
                    sslist.id = ssResult[i] + '';
                    sslist.orderType = ssSort[i];
                    // 根据后台id遍历树对应名称
                    var tempTreeData = _this.treedata;
                    for (var j = 0; j < tempTreeData.length; j++) {
                        if (tempTreeData[j].nodeid == sslist.id) {
                            sslist.name = tempTreeData[j].name;
                            sslist.fieldname = tempTreeData[j].ename;
                            sslist.tabname = tempTreeData[j].value;
                            sslist.notes = tempTreeData[j].notes;
                            // 将字段转为驼峰形式
                            var foos = sslist.fieldname;
                            var ename = foos.toLowerCase().split('_');
                            for (var k = 1; k < ename.length; k++) {
                                ename[k] = ename[k].charAt(0).toUpperCase() + ename[k].substring(1);
                            }
                            sslist.ename = ename.join('');
                        }
                    }
                    // 根据后台id遍历树对应名称
                    sslist.indexs = i;

                    _this.$set(_this.dataTemp, sslist.id, {
                        proPer: sslist.name,
                        orderType: sslist.orderType
                    });
                    if (this.activeName == 'businessModel') {
                        _this.conlist.push(sslist);
                        _this.colunmNamelist.push(sslist);
                        _this.solutionlist.push(sslist);
                    } else if (this.activeName == 'importModel') {
                        _this.importModelList.push(sslist);
                        _this.solutionlist.push(sslist);
                    }
                }
                // 回显-查询查询条件面板字段
                yufp.service.request({
                    method: 'GET',
                    url: '/api/cmssfcifq/queryfqscolbyssid',
                    // async: false,
                    data: {
                        ssId: fieldId
                    },
                    callback: function (code, message, response) {
                        if (response.data != null) {
                            for (var i = 0; i < response.data.length; i++) {
                                var collist = {};
                                collist.id = response.data[i].ssColItem;
                                var tempObj = {};
                                // 根据后台id遍历树对应名称
                                var tempTreeData = _this.treedata;
                                for (var j = 0; j < tempTreeData.length; j++) {
                                    if (tempTreeData[j].nodeid == collist.id) {
                                        collist.name = tempTreeData[j].name;
                                        collist.tabname = tempTreeData[j].value;
                                        collist.fieldname = tempTreeData[j].ename;
                                        collist.colType = tempTreeData[j].ctype;
                                        // 将字段转为驼峰形式
                                        var foos = tempTreeData[j].ename;
                                        var ename = foos.toLowerCase().split('_');
                                        for (var k = 1; k < ename.length; k++) {
                                            ename[k] = ename[k].charAt(0).toUpperCase() + ename[k].substring(1);
                                        }
                                        collist.ename = ename.join('');
                                        collist.fieldType = tempTreeData[j].fieldType;
                                        tempObj.fieldType = tempTreeData[j].fieldType;
                                        tempObj.notes = tempTreeData[j].notes;
                                        tempObj.fName = tempTreeData[j].fName;
                                        break;
                                    }
                                }
                                var tempArr = [];
                                _this.getConditionField(tempArr, tempObj);
                                collist.items = tempArr[0].item;
                                collist.section = tempArr[0].section;
                                collist.signOp = response.data[i].ssColOp;

                                if (collist.signOp == '6') { // 处理 '区间'操作符
                                    var tempVal = response.data[i].ssColValue;
                                    if (tempObj.fieldType == '2') { // 处理 数值类型字段
                                        collist.signVal = tempVal.replace('$', '~');
                                    } else if (tempObj.fieldType == '3') { // 处理日期类型字段
                                        var tempValArr = tempVal.split('$');
                                        var tempValStrStart = new Date(tempValArr[0]);
                                        var tempValStrEnd = new Date(tempValArr[1]);
                                        collist.signVal = [];
                                        collist.signVal.push(tempValStrStart);
                                        collist.signVal.push(tempValStrEnd);
                                    }
                                } else { // 其余默认
                                    if (tempObj.fieldType == '6') { // 多选下拉框-单独处理属性值
                                        collist.signVal = response.data[i].ssColValue.split(',');
                                    } else {
                                        collist.signVal = response.data[i].ssColValue;
                                    }
                                }
                                collist.and = '并';
                                collist.or = '或';
                                if (collist.radio2 == 'and') {
                                    collist.radio2 = '并';
                                } else if (collist.radio2 == 'or') {
                                    collist.radio2 = '或';
                                } else {
                                    collist.radio2 = '';
                                }
                                var len = Object.keys(_this.dataSqlTemp);
                                collist.index = len.length;
                                // collist.index = i;
                                _this.$set(_this.dataSqlTemp, collist.id, {
                                    radio2: collist.radio2,
                                    proPer: collist.name,
                                    signOp: collist.signOp,
                                    signVal: collist.signVal
                                });
                                _this.list.push(collist);
                            }
                            _this.firstOptions = _this.conlist;
                            _this.secondOptions = _this.conlist;
                            _this.thirdOptions = _this.conlist;
                            _this.fourOptions = _this.conlist;
                            _this.fiveOptions = _this.conlist;
                            _this.columnOptions = _this.conlist;
                            _this.chartTagOptions = _this.conlist;
                            _this.xchartTagOptions = _this.conlist;
                        }
                    }
                });
            },
            // 新增方案按钮 清空查询条件和显示列数据
            datasetaddFn: function () {
                this.list = [];
                this.conlist = [];
            },
            allowDroprow: function () {
                return false;
            },
            handleDragStart: function (node, ev) {
                this.dragnode = node;
            },
            // 查询条件公共方法
            commonInfoFn: function () {
                if (this.dragnode.childNodes.length == 0) {
                    this.addTabInfoFn(this.dragnode.data);
                }
            },
            // 展示数据公共方法
            commonInfoFns: function () {
                if (this.dragnode.childNodes.length == 0) {
                    this.addTabInfoFns(this.dragnode.data);
                }
            },
            nodeClickHandle: function (data, node, com) {
                // 点击节点时不展示数据
                if (data.children && data.children.length) {
                    return;
                } else {
                    this.dragnode = node;
                    if (this.activeName == 'businessModel') {
                        if (this.isSearchBtn) {
                            this.commonInfoFn()
                        } else {
                            if (this.dragnode.childNodes.length == 0) {
                                this.addTabInfoFns(this.dragnode.data);
                            }
                        }
                    } else {
                        if (this.dragnode.childNodes.length == 0) {
                            this.addTabInfoFns(this.dragnode.data);
                        }
                    }
                }
            },
            // 业务模式-查询条件拖拽
            bnsAllowDropSear: function () {
                this.commonInfoFn()
            },
            //  业务模式-展示数据拖拽
            bnsAllowDropShow: function () {
                this.commonInfoFns()
            },
            // Excel导入模式-展示数据拖拽
            excelAllowDrop: function () {
                this.commonInfoFns()
            },
            // 业务模式拖拽阻止默认行为
            allowDropover: function (event) {
                event.preventDefault();
            },
            // Excel模式拖拽阻止默认行为
            excelAllowDropover: function (event) {
                event.preventDefault();
            },
            /**
             * 查询条件插入子节点
             */
            childrenallowDrop: function (event, index) {
                event.stopPropagation();
                this.commonInfoFns()
            },
            Dragover: function (event) {
                event.preventDefault();
            },
            /**
             * 添加节点数据
             */
            addTabInfoFn: function (node, isAdd) {
                var _set = this;
                if (node) {
                    var dataList = {};
                    var len = Object.keys(_set.dataSqlTemp);
                    dataList.index = len.length;
                    dataList.indexs = _set.conlist.length;
                    dataList.name = node.name;
                    dataList.id = node.nodeid || node.id;
                    dataList.notes = node.notes;
                    if (isAdd) {
                        dataList.ename = node.ename;
                    } else {
                        // 将字段转为驼峰形式
                        var foo = node.ename;
                        var ename = foo.toLowerCase().split('_');
                        for (var i = 1; i < ename.length; i++) {
                            ename[i] = ename[i].charAt(0).toUpperCase() + ename[i].substring(1);
                        }
                        dataList.ename = ename.join('');
                    }
                    dataList.children = [];

                    if (_set.list.length == 0) {
                        dataList.and = '';
                        dataList.or = '';
                        _set.radio2 = '0';
                    } else {
                        dataList.and = '并';
                        dataList.or = '或';
                        _set.radio2 = '2';
                    }
                    var flag1 = false; // 判断 查询条件面板-数组 中是否已存在
                    for (var i = 0; i < _set.list.length; i++) {
                        if (_set.list[i].id == dataList.id) {
                            flag1 = true;
                            break;
                        }
                    }
                    var flag = false; // 判断 显示列面板-数组 中是否已存在
                    for (var j = 0; j < _set.conlist.length; j++) {
                        if (_set.conlist[j].id == dataList.id) {
                            flag = true;
                            break;
                        }
                    }
                    _set.showColList.push(dataList.name);
                    var newList = new Set(_set.showColList);
                    _set.showColList = [...newList];
                    if (flag1) { // 如果 查询条件存在，则不需要执行如下步骤
                        return;
                    }
                    // 查询拖拽的字段类型
                    var param = {
                        condition: JSON.stringify({
                            id: dataList.id
                        })
                    };
                    _set.conditionField = [];
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/cmssfcifq/querydbcolinfo',
                        data: param,
                        callback: function (code, message, response) {
                            if (code == 0) {
                                if (response.code == 0) {
                                    _set.conditionField = [];
                                    var data = response.data;
                                    // 数据类型
                                    dataList.colType = data.colType;
                                    dataList.fieldType = data.fieldType;
                                    _set.getConditionField(_set.conditionField, data);
                                    dataList.section = _set.conditionField[0].section;
                                    dataList.items = _set.conditionField[0].item;
                                    // 往 查询条件面板/显示列面板 追加字段
                                    if (!flag1) {
                                        _set.singleList.push(dataList)
                                        for (let x = 0; x < _set.singleList.length; x++) {
                                            for (let y = x + 1; y < _set.singleList.length; y++) {
                                                if (_set.singleList[x].id == _set.singleList[y].id) {
                                                    _set.singleList.splice(y, 1);
                                                    y--;
                                                }
                                            }
                                        }
                                        _set.list = _set.singleList
                                    }
                                    if (isAdd && node.notes) {
                                        node.attributeValue = node.attributeValue.split(',');
                                    }
                                    _set.$set(_set.dataSqlTemp, dataList.id, {
                                        radio2: '',
                                        proPer: dataList.name,
                                        signOp: isAdd ? node.operatorName : dataList.section.value,
                                        signVal: isAdd ? node.attributeValue : ''
                                    });
                                    _set.$set(_set.dataTemp, dataList.id, {
                                        proPer: dataList.name,
                                        orderType: '1'
                                    });
                                    _set.dataSqlTemp[dataList.id]['signVal'] = isAdd ? node.attributeValue : response.data.fName;
                                    var optionsTmp = [];
                                    for (var i = 0, len = _set.conlist.length; i < len; i++) {
                                        optionsTmp.push(_set.conlist[i]);
                                    }
                                    _set.columnOptions = optionsTmp;
                                    _set.chartTagOptions = optionsTmp;
                                    _set.xchartTagOptions = optionsTmp;
                                    _set.colunmNamelist.push(dataList);
                                    _set.customersColumnOptions = optionsTmp;
                                    _set.firstOptions = optionsTmp;
                                    _set.secondOptions = optionsTmp;
                                    _set.thirdOptions = optionsTmp;
                                    _set.fourOptions = optionsTmp;
                                    _set.fiveOptions = optionsTmp;
                                } else if (response.code === -1) {
                                    _set.$message({
                                        showClose: true,
                                        message: response.message,
                                        type: 'warning'
                                    });
                                } else {
                                    _set.$message({
                                        showClose: true,
                                        message: response.message,
                                        type: 'error'
                                    });
                                }
                            }
                        }
                    });
                }
            },
            // 显示列拖拽与点击
            addTabInfoFns: function (node, isAdd) {
                var _set = this;
                if (node) {
                    var dataList = {};
                    var len = Object.keys(_set.dataSqlTemp);
                    dataList.index = len.length;
                    dataList.indexs = _set.conlist.length;
                    dataList.name = node.name;
                    dataList.id = node.nodeid || node.id;
                    dataList.notes = node.notes;
                    if (isAdd) {
                        dataList.ename = node.ename;
                    } else {
                        // 将字段转为驼峰形式
                        var foo = node.ename;
                        var ename = foo.toLowerCase().split('_');
                        for (var i = 1; i < ename.length; i++) {
                            ename[i] = ename[i].charAt(0).toUpperCase() + ename[i].substring(1);
                        }
                        dataList.ename = ename.join('');
                    }

                    dataList.children = [];
                    if (_set.conlist.length == 0) {
                        dataList.and = '';
                        dataList.or = '';
                        _set.radio2 = '0';
                    } else {
                        dataList.and = '并';
                        dataList.or = '或';
                        _set.radio2 = '2';
                    }
                    _set.addTabNext(isAdd, dataList)
                }
            },
            addTabNext: function (isAdd, dataList) {
                let _set = this;
                var flag = false; // 是否已经添加
                if (_set.activeName == 'businessModel') { // 业务模式
                    for (var i = 0; i < _set.conlist.length; i++) {
                        if (_set.conlist[i].id == dataList.id) {
                            flag = true;
                            break;
                        }
                    }
                } else if (_set.activeName == 'importModel') { // Excel导入模式
                    for (var i = 0; i < _set.importModelList.length; i++) {
                        if (_set.importModelList[i].id == dataList.id) {
                            flag = true;
                            break;
                        }
                    }
                }
                if (isAdd && dataList.id == null) {
                    flag = true;
                }
                if (!flag) {
                    if (this.activeName == 'businessModel') {// 业务模式
                        _set.conlist.push(dataList);
                        _set.solutionlist.push(dataList);
                        _set.firstOptions = _set.conlist;
                        _set.secondOptions = _set.conlist;
                        _set.thirdOptions = _set.conlist;
                        _set.fourOptions = _set.conlist;
                        _set.fiveOptions = _set.conlist;
                    } else if (this.activeName == 'importModel') {// Excel导入模式
                        _set.importModelList.push(dataList);
                        _set.solutionlist.push(dataList);
                        _set.firstOptions = _set.importModelList;
                        _set.secondOptions = _set.importModelList;
                        _set.thirdOptions = _set.importModelList;
                        _set.fourOptions = _set.importModelList;
                        _set.fiveOptions = _set.importModelList;
                    }
                    _set.$set(_set.dataTemp, dataList.id, {
                        proPer: dataList.name,
                        orderType: ''
                    });
                    _set.dataTemp[dataList.id].orderType = '1';
                    _set.columnOptions = _set.list;
                    _set.chartTagOptions = _set.list;
                    _set.xchartTagOptions = _set.list;
                    _set.colunmNamelist.push(dataList);
                    _set.customersColumnOptions = _set.list;
                }
            },
            // 获取字段并设置属性
            getConditionField: function (arr, field) {
                var obj = {}; // 构造的目标对象
                var selection = {}; // 操作符对象
                var item = {}; // 属性值对象
                selection.ctype = 'select'; // 所有操作符都是下拉框组件
                item.type = '';
                item.options = '';
                item.unit = '';
                if (field.fieldType == '1') { // 文本框
                    selection.options = this.matchOptions;
                    selection.value = '1';
                    item.ctype = 'input';
                } else if (field.fieldType == '2') { // 数字框
                    selection.options = this.compareOptions;
                    selection.value = '1';
                    item.ctype = 'input';
                    item.type = '';
                } else if (field.fieldType == '3') { // 日期框
                    selection.options = this.compareOptions;
                    selection.value = '1';
                    item.ctype = 'datepicker';
                    item.type = 'date';
                } else if (field.fieldType == '4') { // 单选下拉框
                    selection.options = this.matchOptions;
                    selection.value = '1';
                    item.ctype = 'select';
                    yufp.lookup.bind(field.notes, function (data) {
                        item.options = data;
                    });
                } else if (field.fieldType == '5') { // 单选组件
                    selection.options = this.matchOptions;
                    selection.value = '1';
                    item.ctype = 'radio';
                    yufp.lookup.bind(field.notes, function (data) {
                        item.options = data;
                    });
                } else if (field.fieldType == '6') { // 多选下拉框
                    selection.options = this.inOptions;
                    selection.value = '1';
                    selection.disFlag = true; // 由于多选下拉框字段的操作类型只能选-包含，所以此处disabled，默认为false
                    item.ctype = 'select';
                    yufp.lookup.bind(field.notes, function (data) {
                        item.options = data;
                    });
                    item.multiple = true;
                } else if (field.fieldType == '7') { // 放大镜
                    selection.options = this.matchOptions;
                    selection.value = '1';
                    item.ctype = field.fName;
                } else if (field.fieldType == '8') { // 日期框，年月
                    selection.options = this.compareOptions;
                    selection.value = '1';
                    item.ctype = 'datepicker';
                    item.type = 'Month';
                }
                obj.section = selection;
                obj.item = item;
                arr.push(obj);
            },
            /**
             * 汇总表格中汇总类型改变时触发
             */
            summTypeChgFn: function (index, row) {
                var tableDatalist = this.$refs.grouptable.data;
                tableDatalist[index].summName = '';
                tableDatalist[index].summNameId = '';
            },
            /**
             * 点击汇总表格中分组汇总字段时执行
             */
            handleRow: function (index, rows) {
                if (rows[index].summColumn == '' || rows[index].summType == '') {
                    return;
                }
                // 根据key值找到数据字典中对应的value
                var typeOption = yufp.lookup.find('TYPE_OPTION', false);
                var summTypeName = typeOption[rows[index].summType];
                for (var i = 0, len = this.columnOptions.length; i < len; i++) {
                    if (this.columnOptions[i].id == rows[index].summColumn) {
                        var summColumnName = this.columnOptions[i].name;
                        if (this.columnOptions[i].colType == 'VARCHAR2') {
                            if (rows[index].summType != '1' && rows[index].summType != '2') {
                                this.$message({ type: 'warning', message: '汇总类型只能选择"汇总数量"或"汇总数值"' });
                                return;
                            }
                        } else if (this.columnOptions[i].colType == 'NUMBER') {
                            if (rows[index].summType == '1' || rows[index].summType == '2') {
                                this.$message({ type: 'warning', message: '汇总类型不能选择"汇总数量"或"汇总数值"' });
                                return;
                            }
                        } else {
                            this.$message({ type: 'warning', message: '不能查询汇总信息' });
                            return;
                        }
                        break;
                    }
                }
                rows[index].summName = summColumnName + summTypeName;
                var tableDatalist = this.$refs.grouptable.data;
                tableDatalist[index].summName = rows[index].summName;
            },

            // 图表预览
            drawImage: function () {
                var _this = this;
                var validate = false;
                var avalidate = false;
                var bvalidate = false;
                _this.$refs.chartTemp.validate(function (valid) {
                    validate = valid;
                });
                if (!validate) {
                    return;
                }
                var labelColumnValue = '';
                var valueColumnValue = '';
                if (_this.chartTemp.chartType == 'pie') { // 如果图表类型是饼图
                    // 遍历标签项，处理得到 labelColumnValue
                    _this.$refs.chartTagTemp.validate(function (valid) {
                        avalidate = valid;
                    });
                    if (!avalidate) {
                        return;
                    }
                    for (var i = 0, len = this.chartTagOptions.length; i < len; i++) {
                        if (this.chartTagOptions[i].id == _this.chartTagTemp.chartTag) {
                            labelColumnValue = this.chartTagOptions[i].name;
                            break;
                        }
                    }
                    // 遍历指标项，处理得到 valueColumnValue
                    for (var j = 0, len = this.chartTargetOptions.length; j < len; j++) {
                        if (this.chartTargetOptions[j].key == _this.chartTagTemp.chartTarget) {
                            valueColumnValue = this.chartTargetOptions[j].name;
                            break;
                        }
                    }
                    graphInfo = {
                        'labelColumnKey': _this.chartTagTemp.chartTag,
                        'labelColumnValue': labelColumnValue,
                        'valueColumnKey': _this.chartTagTemp.chartTarget,
                        'valueColumnValue': valueColumnValue
                    };
                } else if (_this.chartTemp.chartType == 'line' || _this.chartTemp.chartType == 'bar') { // 如果图表类型是其他
                    _this.$refs.ychartNameTemp.validate(function (valid) {
                        bvalidate = valid;
                    });

                    if (!bvalidate) {
                        return;
                    }
                    for (var i = 0, len = this.xchartTagOptions.length; i < len; i++) {
                        if (this.xchartTagOptions[i].id == _this.ychartNameTemp.xchartTag) {
                            labelColumnValue = this.xchartTagOptions[i].name;
                            break;
                        }
                    }
                    for (var j = 0, len = this.ychartTargetOptions.length; j < len; j++) {
                        if (this.ychartTargetOptions[j].key == _this.ychartNameTemp.ychartTarget) {
                            valueColumnValue = this.ychartTargetOptions[j].value;
                            break;
                        }
                    }
                    graphInfo = {
                        'yName': _this.ychartNameTemp.ychartName,
                        'yMinValue': _this.ychartNameTemp.ychartBegin,
                        'labelColumnKey': _this.ychartNameTemp.xchartTag,
                        'labelColumnValue': labelColumnValue,
                        'valueColumnKey': _this.ychartNameTemp.ychartTarget,
                        'valueColumnValue': valueColumnValue
                    };
                }
                if (!graphSql) {
                    _this.$message({
                        type: 'warning',
                        message: '确少查询项数据信息'
                    });
                    return;
                }
                yufp.service.request({
                    method: 'POST',
                    url: '/api/cimpfsysusertile/sql',
                    data: { condition: JSON.stringify({ sql: graphSql }) },
                    callback: function (code, message, response) {
                        var graphType = _this.chartTemp.chartType;
                        var response = response.data;
                        var graphInfos = graphInfo;
                        _this.creatGraph(graphType, graphInfos, response);
                    }
                });
                _this.yesNoPreview = true;
            },
            // 拼接图表
            creatGraph: function (type, infor, response) {
                var option = {};
                var series = {};
                var xAxis = {};
                var xAxisData = [];
                series.type = type;
                // var isstring = infor instanceof String;
                var nameId = infor.labelColumnKey.replace(/_(\w)/g, function (all, letter) {
                    return letter.toUpperCase();
                });
                var data = [];
                for (var i = 0, l = response.length; i < l; i++) {
                    var dataItem = {};
                    Object.keys(response[i]).forEach(function (item, index) {
                        if (item === nameId || (item.indexOf('Sum') === -1 && item.indexOf(nameId) > -1)) {
                            if (type === 'pie') {
                                dataItem.name = response[i][item];
                            } else {
                                xAxisData.push(response[i][item]);
                            }
                        } else {
                            if (type === 'pie') {
                                dataItem.value = response[i][item];
                            } else {
                                data.push(response[i][item]);
                            }
                        }
                    });
                    if (type === 'pie') {
                        data.push(dataItem);
                    } else {
                        xAxis.data = data;
                    }
                }
                series.data = data;
                option.series = series;
                if (type === 'line' || type === 'bar') {
                    var yAxis = {};
                    yAxis.min = infor.yMinValue;
                    yAxis.name = infor.yName;
                    option.xAxis = xAxis;
                    option.yAxis = yAxis;
                }
                this.echartData = option;
            },
            // 图表发布
            graphpub: function () {
                var _set = this;
                if (!_set.yesNoPreview) {
                    _set.$message.error('请先预览图表');
                    return;
                }
                var model = {};
                model.graphSql = graphSql;
                model.graphInfo = JSON.stringify(graphInfo);
                model.graphName = _set.chartTemp.chartName;
                model.graphType = _set.chartTemp.chartType;
                model.graphSize = _set.chartTemp.chartSize;
                yufp.service.request({
                    method: 'POST',
                    url: '/api/cimpfcifqdbcol/addgraph',
                    data: model,
                    callback: function (code, message, response) {
                        if (code == 0 && response.code === 0) {
                            _set.$message({ message: '发布成功！' });
                        } else {
                            _set.$message.error('发布失败');
                        }
                    }
                });
            },
            rowClickFn: function (selection, row) {
                this.selections = selection;
                // 用于单个修改
                this.filterGrid.currentRow = row;
            },
            // 批量删除方案
            datasetDeleteFn: function () {
                var _this = this;
                var ids = '';
                var filterSelecttions = this.$refs.filterTable.selections;
                if (filterSelecttions.length > 0) {
                    for (var i = 0; i < filterSelecttions.length; i++) {
                        // 记录多选用于多删
                        if (filterSelecttions.length === 1) {
                            ids = filterSelecttions[i].id;
                        } else {
                            ids = ids + ',' + filterSelecttions[i].id;
                        }
                    }
                } else {
                    _this.$message({ message: '请选择需要删除的方案!' });
                    return false;
                }
                _this.$confirm('确认批量删除所选的方案?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    yufp.service.request({
                        url: '/api/cmssfcifq/deletefqsolutioninfo',
                        method: 'post',
                        data: ids,
                        callback: function (code, message, response) {
                            if (code == 0) {
                                if (response.code == 0) {
                                    _this.$message({ message: '删除成功!' });
                                    _this.$refs.filterTable.remoteData();
                                } else if (response.code === -1) {
                                    _this.$message({
                                        showClose: true,
                                        message: response.message,
                                        type: 'warning'
                                    });
                                } else {
                                    _this.$message({
                                        showClose: true,
                                        message: response.message,
                                        type: 'error'
                                    });
                                }
                            }
                        }
                    });
                });
            },
            // 选择图表类型
            chartchange: function (value) {
                var vue = this;
                if (value == 'pie') {
                    vue.showPrise = true;
                    vue.showRentPrise = false;
                } else {
                    vue.showPrise = false;
                    vue.showRentPrise = true;
                }
            },
            /**
             * 选择查询结果的表格数据
             */
            selectionChange: function (selection) {
                this.qryresultSelections = selection;
            },
            rowClick: function (row, event, column) {
                this.qryresultSelections = row;
            },
            // 打开客户视图
            opencustViewFn: function () {
                var _this = this;
                var selections = _this.qryresultSelections;
                if (selections.length != 1) {
                    _this.$message({ message: '请先选择一条记录', type: 'warning' });
                    return;
                }
                var custId = selections[0].custId;
                yufp.util.valid2jump(custId, function (val) {
                    if (val) {
                        var customKey = 'custom_view' + custId; // 请以custom_view前缀开头，并且全局唯一
                        // var custType = row.custType;
                        yufp.frame.addTab({
                            // id: custType == '1' ? 'personalCustView' : 'publicStanCustView', // 菜单功能ID（路由ID）
                            id: 'customer360View', // 菜单功能ID（路由ID）
                            key: customKey, // 自定义唯一页签key,请统一使用custom_前缀开头
                            title: '客户360视图:' + selections[0].custName, // 页签名称
                            data: {
                                cust: selections[0],
                                custId: custId,
                                custName: selections[0].custName
                            } // 传递的业务数据，可选配置
                        });
                        _this.dialogFormVisible1 = false;
                    } else {
                        _this.$message.warning('该客户不能查看客户360视图');
                    }
                });
            },
            resetcustomersFn: function () {

            },
            // 报表发布提交按钮
            reportPublish: function () {
                var _this = this;
                if (this.reportTemp.reportName == '') {
                    this.$message({ message: '请填写报表名称！' });
                    return;
                }

                var _set = this;
                if (_set.list.length == 0) {
                    _this.$message({ message: '请先选择查询条件', type: 'warning' });
                    return;
                }
                _set.conditionAttrs = [];
                _set.results = [];
                _set.solution = [];
                _set.busiTypeFlag = [];
                _set.qryarr = [];
                // 拼接参数
                for (var i = 0; i < _set.list.length; i++) {
                    _set.qryarr = [];
                    var info = {};
                    info.SS_COL_ITEM = _set.list[i].id;
                    info.SS_COL_OP = _this.dataSqlTemp[_set.list[i].index].signOp;
                    info.SS_COL_VALUE = _this.dataSqlTemp[_set.list[i].index].signVal;
                    info.SS_COL_GJOIN = _this.dataSqlTemp[_set.list[i].index].radio2;
                    info.SS_COL_JOIN = '';
                    info.SS_COL_GORDER = i;
                    info.SS_COL_ORDER = '0';
                    if (info.SS_COL_GJOIN == '并') {
                        info.SS_COL_GJOIN = 'and';
                    } else if (info.SS_COL_GJOIN == '或') {
                        info.SS_COL_GJOIN = 'or';
                    }
                    _set.qryarr.push(info);
                    var childinfo = {};
                    if (_set.list[i].children && _set.list[i].children.length > 0) {
                        for (var j = 0; j < _set.list[i].children.length; j++) {
                            childinfo.SS_COL_ITEM = _set.list[i].children[j].id;
                            childinfo.SS_COL_OP = _this.dataSqlTemp[_set.list[i].children[j].index].signOp;
                            childinfo.SS_COL_VALUE = _this.dataSqlTemp[_set.list[i].children[j].index].signVal;
                            childinfo.SS_COL_GJOIN = '';
                            childinfo.SS_COL_GORDER = i;
                            childinfo.SS_COL_ORDER = j + 1;
                            childinfo.SS_COL_JOIN = _this.dataSqlTemp[_set.list[i].children[j].index].radio2;
                            if (childinfo.SS_COL_JOIN == '并') {
                                childinfo.SS_COL_JOIN = 'and';
                            } else if (childinfo.SS_COL_JOIN == '或') {
                                childinfo.SS_COL_JOIN = 'or';
                            }
                        }
                        _set.qryarr.push(childinfo);
                    }
                    _set.conditionAttrs.push(_set.qryarr);
                }
                for (var i = 0; i < _set.conlist.length; i++) {
                    var resultinfo = {};
                    var solutionAttr = {};
                    resultinfo.columnId = _set.conlist[i].id;
                    resultinfo.sortType = _this.dataTemp[_set.conlist[i].indexs].orderType;
                    resultinfo.columnTotle = '0';
                    _set.results.push(resultinfo);
                    solutionAttr.SS_RESULT = _set.conlist[i].id;
                    solutionAttr.OBJ_TYPE = _set.objValue.key;
                    solutionAttr.SS_SORT = _this.dataTemp[_set.conlist[i].indexs].orderType;
                    solutionAttr.TOP_NUM = _set.limitNum;
                    _set.solution.push(solutionAttr);
                }
                var obj = {};
                obj.busiTypeFlag = '1';
                _set.busiTypeFlag.push(obj);
                var param = {
                    conditionAttrs: JSON.stringify(_set.conditionAttrs),
                    results: JSON.stringify(_set.results),
                    solutionAttr: JSON.stringify(_set.solution)
                };
                yufp.service.request({
                    method: 'GET',
                    url: backend.appYscrmCustMgtService + '/api/cimpfcifqscol/getUuid',
                    data: { orgCode: yufp.session.org.code },
                    callback: function (code, message, response) {
                        if (code == 0 && response.code === 0) {
                            if (response.data.orgLevel == 1) {
                                // 表示总行级用户
                                param = {
                                    conditionAttrs: JSON.stringify(_set.conditionAttrs),
                                    results: JSON.stringify(_set.results),
                                    solutionAttr: JSON.stringify(_set.solution),
                                    busiTypeFlag: JSON.stringify(_set.busiTypeFlag)
                                };
                            }
                            yufp.service.request({
                                method: 'post',
                                data: param,
                                url: backend.appYscrmCustMgtService + '/api/cimpfcifqdbcol/createreport/' + _this.reportTemp.reportName,
                                callback: function (code, message, response) {
                                    if (code == 0 && response.code === 0) {
                                        _set.$message({ message: '报表发布成功！' });
                                        _set.reportdialogVisible = false;
                                    } else {
                                        _set.$message.error('发布失败');
                                    }
                                }
                            });
                        }
                    }
                });
            },
            closedialog: function () {
                this.reportdialogVisible = false;
            },
            /**
             * 设置灵活查询-查询条件面板信息
             *   只有客户群引用时使用
             */
            setFlexQueryRuleInfo: function (ruleInfoList) {
                var _this = this;
                if (ruleInfoList != null) {
                    for (var i = 0; i < ruleInfoList.length; i++) {
                        var collist = {};
                        collist.id = ruleInfoList[i].ssColItem;
                        var tempObj = {};
                        // 根据后台id遍历树对应名称
                        var tempTreeData = _this.treedata;
                        for (var j = 0; j < tempTreeData.length; j++) {
                            if (tempTreeData[j].nodeid == collist.id) {
                                collist.name = tempTreeData[j].name;
                                collist.tabname = tempTreeData[j].value;
                                collist.fieldname = tempTreeData[j].ename;
                                collist.colType = tempTreeData[j].ctype;
                                // 将字段转为驼峰形式
                                var foos = tempTreeData[j].ename;
                                var ename = foos.toLowerCase().split('_');
                                for (var k = 1; k < ename.length; k++) {
                                    ename[k] = ename[k].charAt(0).toUpperCase() + ename[k].substring(1);
                                }
                                collist.ename = ename.join('');
                                collist.fieldType = tempTreeData[j].fieldType;
                                tempObj.fieldType = tempTreeData[j].fieldType;
                                tempObj.notes = tempTreeData[j].notes;
                                tempObj.fName = tempTreeData[j].fName;
                                break;
                            }
                        }
                        var tempArr = [];
                        _this.getConditionField(tempArr, tempObj);
                        collist.items = tempArr[0].item;
                        collist.section = tempArr[0].section;
                        collist.signOp = ruleInfoList[i].ssColOp;
                        if (collist.signOp == '6') { // 处理 '区间'操作符
                            var tempVal = ruleInfoList[i].ssColValue;
                            if (tempObj.fieldType == '2') { // 处理 数值类型字段
                                collist.signVal = tempVal.replace('$', '~');
                            } else if (tempObj.fieldType == '3') { // 处理日期类型字段
                                var tempValArr = tempVal.split('$');
                                var tempValStrStart = new Date(tempValArr[0]);
                                var tempValStrEnd = new Date(tempValArr[1]);
                                collist.signVal = [];
                                collist.signVal.push(tempValStrStart);
                                collist.signVal.push(tempValStrEnd);
                            }
                        } else { // 其余默认
                            if (tempObj.fieldType == '6') { // 多选下拉框-单独处理属性值
                                collist.signVal = ruleInfoList[i].ssColValue.split(',');
                            } else {
                                collist.signVal = ruleInfoList[i].ssColValue;
                            }
                        }
                        collist.and = '并';
                        collist.or = '或';
                        collist.radio2 = '';
                        var len = Object.keys(_this.dataSqlTemp);
                        collist.index = len.length;
                        _this.$set(_this.dataSqlTemp, collist.id, {
                            radio2: collist.radio2,
                            proPer: collist.name,
                            signOp: collist.signOp,
                            signVal: collist.signVal
                        });
                        _this.list.push(collist);
                    }
                }
            },
            /**
             * 获取灵活查询-查询符合规则的客户数量
             *   只在营销活动引用时使用
             */
            getFlexQueryCount: function () {
                var _set = this;
                var count = 0;
                if (_set.list.length == 0) {
                    _set.$message({ message: '请先选择查询条件', type: 'warning' });
                    return null;
                }
                if (this.markOperateFlag) { // 营销活动引用
                    var conditionAttrs = [];
                    var results = [
                        { columnEName: 'custId', sortType: '2' },
                        { columnEName: 'custName', sortType: '1' },
                        { columnEName: 'bl202011180065', sortType: '1' },
                        { columnEName: 'bl202011180024', sortType: '1' }
                    ];
                    for (var i = 0; i < _set.list.length; i++) {
                        if (_set.dataSqlTemp[_set.list[i].id].signOp == '' ||
                            _set.dataSqlTemp[_set.list[i].id].signVal == '' ||
                            _set.dataSqlTemp[_set.list[i].id].signVal == undefined ||
                            _set.dataSqlTemp[_set.list[i].id].signVal == undefined) {
                            _set.$message({ message: '查询条件参数不允许为空', type: 'warning' });
                            return;
                        }
                        var info = {};
                        info.ssColType = _set.list[i].fieldType; // 查询条件-字段类型
                        info.ssColItem = _set.list[i].id; // 查询条件-字段属性ID
                        info.ssColEname = _set.list[i].ename; // 查询条件-字段名称
                        info.ssColOp = _set.dataSqlTemp[_set.list[i].id].signOp; // 查询条件-操作符值
                        if (info.ssColOp == '6') { // 处理 '区间'操作符
                            var tempVal = _set.dataSqlTemp[_set.list[i].id].signVal;
                            if (info.ssColType == '2') { // 处理 数值类型字段
                                var tempValArr = tempVal.split('~');
                                tempValArr[0] = Number(tempValArr[0]);
                                tempValArr[1] = Number(tempValArr[1]);
                                if (tempValArr.length == 2 && !isNaN(tempValArr[0]) && !isNaN(tempValArr[1])) {
                                    info.ssColValue = tempValArr.join('$');
                                } else {
                                    _set.$message({ message: '数值字段区间值格式为:数字~数字', type: 'warning' });
                                    return;
                                }
                            } else if (info.ssColType == '3') { // 处理日期类型字段
                                var tempValStrStart = yufp.util.dateFormat(tempVal[0], '{y}-{m}-{d}');
                                var tempValStrEnd = yufp.util.dateFormat(tempVal[1], '{y}-{m}-{d}');
                                info.ssColValue = tempValStrStart + '$' + tempValStrEnd;
                            }
                        } else { // 其余默认
                            info.ssColValue = _set.dataSqlTemp[_set.list[i].id].signVal; // 查询条件-属性值
                        }
                        info.ssColGorder = i;
                        info.ssColOrder = '0';
                        conditionAttrs.push(info);
                    }
                    var param = {
                        condition: JSON.stringify({
                            conditionAttrs: conditionAttrs,
                            results: results,
                            queryType: 'mkt'
                        })
                    };
                    yufp.service.request({
                        method: 'GET',
                        data: param,
                        async: false,
                        url: '/api/cmssfcifq/queryresult',
                        callback: function (code, message, response) {
                            if (code == 0) {
                                if (response.code == 0) {
                                    count = response.total;
                                } else {
                                    _set.$message({ message: response.message + '，请修改查询条件后再查询！', type: 'warning' });
                                }
                            }
                        }
                    });
                    return count;
                }
            },
            /**
             * 获取灵活查询-查询规则信息
             *   只在客户群/营销活动引用时使用
             */
            getFlexQueryRuleInfo: function () {
                var _set = this;
                if (_set.list.length == 0) {
                    _set.$message({ message: '请先选择查询条件', type: 'warning' });
                    return null;
                }
                var conditionAttrs = [];
                if (this.custGroupOperateFlag) { // 客户群引用
                    for (var i = 0; i < _set.list.length; i++) {
                        if (_set.dataSqlTemp[_set.list[i].id].signOp == '' ||
                            _set.dataSqlTemp[_set.list[i].id].signVal == '' ||
                            _set.dataSqlTemp[_set.list[i].id].signVal == undefined ||
                            _set.dataSqlTemp[_set.list[i].id].signVal == undefined) {
                            _set.$message({ message: '查询条件参数不允许为空', type: 'warning' });
                            return;
                        }
                        var info = {};
                        info.ssColItem = _set.list[i].id;
                        info.ssColType = _set.list[i].fieldType;
                        info.ssColOp = _set.dataSqlTemp[_set.list[i].id].signOp;
                        if (info.ssColOp == '6') { // 处理 '区间'操作符
                            var tempVal = _set.dataSqlTemp[_set.list[i].id].signVal;
                            if (info.ssColType == '2') { // 处理 数值类型字段
                                var tempValArr = tempVal.split('~');
                                tempValArr[0] = Number(tempValArr[0]);
                                tempValArr[1] = Number(tempValArr[1]);
                                if (tempValArr.length == 2 && !isNaN(tempValArr[0]) && !isNaN(tempValArr[1])) {
                                    info.ssColValue = tempValArr.join('$');
                                } else {
                                    _set.$message({ message: '数值字段区间值格式为:数字~数字', type: 'warning' });
                                    return;
                                }
                            } else if (info.ssColType == '3') { // 处理日期类型字段
                                var tempValStrStart = yufp.util.dateFormat(tempVal[0], '{y}-{m}-{d}');
                                var tempValStrEnd = yufp.util.dateFormat(tempVal[1], '{y}-{m}-{d}');
                                info.ssColValue = tempValStrStart + '$' + tempValStrEnd;
                            }
                        } else { // 其余默认
                            if (_set.dataSqlTemp[_set.list[i].id].signVal instanceof Array) { // 处理多选框
                                info.ssColValue = _set.dataSqlTemp[_set.list[i].id].signVal.join(',');
                            } else {
                                info.ssColValue = _set.dataSqlTemp[_set.list[i].id].signVal;
                            }
                        }
                        info.ssColGjoin = _set.dataSqlTemp[_set.list[i].id].radio2;
                        info.ssColJoin = '';
                        info.ssColGorder = i;
                        info.ssColOrder = '0';
                        info.ssId = '1';
                        if (info.ssColGjoin == '并') {
                            info.ssColGjoin = 'and';
                        } else if (info.ssColGjoin == '或') {
                            info.ssColGjoin = 'or';
                        }
                        conditionAttrs.push(info);
                    }
                    return conditionAttrs;
                } else if (this.markOperateFlag) { // 营销活动引用
                    var obj = {};
                    var conditionAttrs = [];
                    for (var i = 0; i < _set.list.length; i++) {
                        if (_set.dataSqlTemp[_set.list[i].id].signOp == '' ||
                            _set.dataSqlTemp[_set.list[i].id].signVal == '' ||
                            _set.dataSqlTemp[_set.list[i].id].signVal == undefined ||
                            _set.dataSqlTemp[_set.list[i].id].signVal == undefined) {
                            _set.$message({ message: '查询条件参数不允许为空', type: 'warning' });
                            return;
                        }
                        var info = {};
                        info.ssColType = _set.list[i].fieldType; // 查询条件-字段类型
                        info.ssColItem = _set.list[i].id; // 查询条件-字段属性ID
                        info.ssColEname = _set.list[i].ename; // 查询条件-字段名称
                        info.ssColCname = _set.list[i].name; // 查询条件-字段中文名称
                        info.ssColValueNotes = _set.list[i].notes; // 查询条件-数据字典Code
                        info.ssColOp = _set.dataSqlTemp[_set.list[i].id].signOp; // 查询条件-操作符值
                        if (info.ssColOp == '6') { // 处理 '区间'操作符
                            var tempVal = _set.dataSqlTemp[_set.list[i].id].signVal;
                            if (info.ssColType == '2') { // 处理 数值类型字段
                                var tempValArr = tempVal.split('~');
                                tempValArr[0] = Number(tempValArr[0]);
                                tempValArr[1] = Number(tempValArr[1]);
                                if (tempValArr.length == 2 && !isNaN(tempValArr[0]) && !isNaN(tempValArr[1])) {
                                    info.ssColValue = tempValArr.join('$');
                                } else {
                                    _set.$message({ message: '数值字段区间值格式为:数字~数字', type: 'warning' });
                                    return;
                                }
                            } else if (info.ssColType == '3') { // 处理日期类型字段
                                var tempValStrStart = yufp.util.dateFormat(tempVal[0], '{y}-{m}-{d}');
                                var tempValStrEnd = yufp.util.dateFormat(tempVal[1], '{y}-{m}-{d}');
                                info.ssColValue = tempValStrStart + '$' + tempValStrEnd;
                            }
                        } else { // 其余默认
                            info.ssColValue = _set.dataSqlTemp[_set.list[i].id].signVal; // 查询条件-属性值
                        }
                        info.ssColGorder = i;
                        info.ssColOrder = '0';
                        conditionAttrs.push(info);
                    }
                    var param = {
                        condition: JSON.stringify({ conditionAttrs: conditionAttrs })
                    };
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/cmssfcifq/getfqmarkparam',
                        data: param,
                        async: false,
                        callback: function (code, message, response) {
                            if (code == 0) {
                                if (response.code == 0) {
                                    obj.ruleParam = response.data.ruleParam;
                                    obj.ruleContent = response.data.ruleContentCh;
                                } else {
                                    _set.$message({
                                        showClose: true,
                                        message: response.message,
                                        type: 'error'
                                    });
                                }
                            }
                        }
                    });
                    obj.ruleType = '01';
                    obj.orRepeat = _set.orRepeat;
                    return obj;
                }
            },
            /**
             * 获取灵活查询接口-condition请求参数
             *   只在客户群引用时使用
             */
            getFlexQueryConditionParam: function () {
                var _set = this;
                if (_set.list.length == 0) {
                    _set.$message({ message: '请先选择查询条件', type: 'warning' });
                    return null;
                }
                var obj = {};
                if (this.custGroupOperateFlag) { // 客户群引用
                    var conditionAttrs = [];
                    var results = [
                        { columnEName: 'custId', sortType: '2' },
                        { columnEName: 'custName', sortType: '1' },
                        { columnEName: 'bl202011180065', sortType: '1' },
                        { columnEName: 'bl202011180024', sortType: '1' }
                    ];
                    for (var i = 0; i < _set.list.length; i++) {
                        if (_set.dataSqlTemp[_set.list[i].id].signOp == '' ||
                            _set.dataSqlTemp[_set.list[i].id].signVal == '' ||
                            _set.dataSqlTemp[_set.list[i].id].signVal == undefined ||
                            _set.dataSqlTemp[_set.list[i].id].signVal == undefined) {
                            _set.$message({ message: '查询条件参数不允许为空', type: 'warning' });
                            return;
                        }
                        var info = {};
                        info.ssColType = _set.list[i].fieldType; // 查询条件-字段类型
                        info.ssColItem = _set.list[i].id; // 查询条件-字段属性ID
                        info.ssColEname = _set.list[i].ename; // 查询条件-字段名称
                        info.ssColOp = _set.dataSqlTemp[_set.list[i].id].signOp; // 查询条件-操作符值
                        if (info.ssColOp == '6') { // 处理 '区间'操作符
                            var tempVal = _set.dataSqlTemp[_set.list[i].id].signVal;
                            if (info.ssColType == '2') { // 处理 数值类型字段
                                var tempValArr = tempVal.split('~');
                                tempValArr[0] = Number(tempValArr[0]);
                                tempValArr[1] = Number(tempValArr[1]);
                                if (tempValArr.length == 2 && !isNaN(tempValArr[0]) && !isNaN(tempValArr[1])) {
                                    info.ssColValue = tempValArr.join('$');
                                } else {
                                    _set.$message({ message: '数值字段区间值格式为:数字~数字', type: 'warning' });
                                    return;
                                }
                            } else if (info.ssColType == '3') { // 处理日期类型字段
                                var tempValStrStart = yufp.util.dateFormat(tempVal[0], '{y}-{m}-{d}');
                                var tempValStrEnd = yufp.util.dateFormat(tempVal[1], '{y}-{m}-{d}');
                                info.ssColValue = tempValStrStart + '$' + tempValStrEnd;
                            }
                        } else { // 其余默认
                            info.ssColValue = _set.dataSqlTemp[_set.list[i].id].signVal; // 查询条件-属性值
                        }
                        info.ssColGorder = i;
                        info.ssColOrder = '0';
                        conditionAttrs.push(info);
                    }
                    obj.conditionAttrs = conditionAttrs;
                    obj.results = results;
                } else { // 其他
                    obj.conditionAttrs = {};
                    obj.results = {};
                }
                return obj;
            },
            /** 查询结果 */
            queryInfoFn: function (val) {
                var _set = this;
                if (val == 'businessModel') {
                    _set.queryLoading = true;
                } else if (val == 'importModel') {
                    _set.imPortentLoading = true;
                }
                _set.exportPassword = '';
                _set.isseqno = String(new Date().getTime());
                var aSpan = document.querySelectorAll('.selInpVal div span');
                aSpan = Array.from(aSpan);
                var selInpList = [];
                let importSearchData = []; // 导入Excel查询条件数据
                aSpan.forEach(
                    function (item, index) {
                        var text = item.innerText;
                        if (text && text != selInpList[selInpList.length - 1]) {
                            selInpList.push(text);
                        }
                    }
                );
                _set.$set(_set, 'selInpValList', selInpList);
                var nowDateY = new Date().getFullYear();
                var nowDateM = (new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1);
                var dataDateS = {
                    ssColEname: 'dataDate',
                    ssColOp: '1',
                    ssColValue: nowDateY + nowDateM,
                    ssColGorder: 0,
                    ssColOrder: '0',
                    ssColType: '1',
                    ssColItem: '10001',
                    loanCustManagerN0: '',
                    finCustManagerN0: '',
                    finBelongOrgNo: '',
                    loanBelongOrgNo: '',
                    loanCustManagerName: 'loanCustManagerN0',
                    finCustManagerName: 'finCustManagerN0',
                    finBelongOrgName: 'finBelongOrgNo',
                    loanBelongOrgName: 'loanBelongOrgNo',
                    conditionType: ''
                };
                var dataDateR = {
                    columnEName: 'dataDate',
                    sortType: '1'
                };
                var pushFlag = false;
                var flagList = [];
                _set.results = [
                    { columnEName: 'custNo', sortType: '1' },
                    { columnEName: 'custName', sortType: '1' }
                ];
                _set.conditionAttrs = [];
                _set.qryarr = [];
                if (val == 'businessModel') {
                    // 拼接参数
                    for (var i = 0; i < _set.list.length; i++) {
                        if (_set.dataSqlTemp[_set.list[i].id].signOp == '' ||
                            _set.dataSqlTemp[_set.list[i].id].signVal == '' ||
                            _set.dataSqlTemp[_set.list[i].id].signVal == undefined ||
                            _set.dataSqlTemp[_set.list[i].id].signVal == undefined) {
                            _set.$message({ message: '查询条件参数不允许为空', type: 'warning' });
                            _set.queryLoading = false;
                            return;
                        }
                        flagList.push(_set.list[i].ename);
                        var info = {};
                        info.ssColType = _set.list[i].fieldType; // 查询条件-字段类型
                        info.ssColItem = _set.list[i].id; // 查询条件-字段属性ID
                        info.ssColEname = _set.list[i].ename; // 查询条件-字段名称
                        info.ssColOp = _set.dataSqlTemp[_set.list[i].id].signOp; // 查询条件-操作符值
                        info.loanCustManagerN0 = _set.loanCustManagerN0;
                        info.finCustManagerN0 = _set.finCustManagerN0;
                        info.finBelongOrgNo = _set.finBelongOrgNo;
                        info.loanBelongOrgNo = _set.loanBelongOrgNo;
                        info.loanCustManagerName = 'loanCustManagerN0';
                        info.finCustManagerName = 'finCustManagerN0';
                        info.finBelongOrgName = 'finBelongOrgNo';
                        info.loanBelongOrgName = 'loanBelongOrgNo';
                        if (info.ssColOp == '6') { // 处理 '区间'操作符
                            var tempVal = _set.dataSqlTemp[_set.list[i].id].signVal;
                            if (info.ssColType == '2') { // 处理 数值类型字段
                                var tempValArr = tempVal.split('~');
                                tempValArr[0] = Number(tempValArr[0]);
                                tempValArr[1] = Number(tempValArr[1]);
                                if (tempValArr.length == 2 && !isNaN(tempValArr[0]) && !isNaN(tempValArr[1])) {
                                    info.ssColValue = tempValArr.join('$');
                                } else {
                                    _set.$message({ message: '数值字段区间值格式为:数字~数字', type: 'warning' });
                                    return;
                                }
                            } else if (info.ssColType == '3') { // 处理日期类型字段
                                var tempValStrStart = yufp.util.dateFormat(tempVal[0], '{y}-{m}-{d}');
                                var tempValStrEnd = yufp.util.dateFormat(tempVal[1], '{y}-{m}-{d}');
                                info.ssColValue = tempValStrStart + '$' + tempValStrEnd;
                            }
                        } else { // 其余默认
                            info.ssColValue = _set.dataSqlTemp[_set.list[i].id].signVal; // 查询条件-属性值
                        }
                        // 保存为默认
                        if (val && val == 'search') {
                            info.id = _set.list[i].id;
                            info.attributeNo = _set.list[i].ename; // 属性
                            info.attributeName = _set.list[i].name; // 属性名称
                            info.operatorNo = _set.dataSqlTemp[_set.list[i].id].proPer; // 操作符
                            info.operatorName = _set.dataSqlTemp[_set.list[i].id].signOp; // 操作符名称
                            info.attributeValue = typeof _set.dataSqlTemp[_set.list[i].id].signVal == 'string' ? _set.dataSqlTemp[_set.list[i].id].signVal : _set.dataSqlTemp[_set.list[i].id].signVal.toString(); // 属性值
                            info.fieldType = _set.list[i].fieldType;
                            info.items = _set.list[i].notes;
                            info.sections = JSON.stringify(_set.list[i].sections);
                        }
                        info.ssColGorder = i;
                        info.ssColOrder = '0';
                        info.conditionType = '01';  // 01表示业务模式 02表示Excel导入模式
                        _set.conditionAttrs.push(info);
                        var tempInfo = {};
                        yufp.extend(tempInfo, info);
                        tempInfo.name = _set.list[i].name;
                        _set.rulesList.push(tempInfo); // 保存客户规则
                    }
                    for (let i = 0; i < flagList.length; i++) {
                        if (flagList[i] == 'dataDate') {
                            pushFlag = true;
                            break;
                        }
                    };
                    if (!pushFlag) { // 如果没有日期就添加日期
                        dataDateS.conditionType = '01';
                        let objDate = {}
                        yufp.extend(objDate, dataDateS)
                        _set.conditionAttrs.push(objDate);
                        _set.results.push(dataDateR);
                    }
                } else if (val == 'importModel') {
                    dataDateS.conditionType = '02';
                    let objDate0 = {};
                    yufp.extend(objDate0, dataDateS)
                    importSearchData.push(objDate0);
                }
                _set.tableColumnList = [
                    { 'name': '客户号', 'ename': 'custNo' },
                    { 'name': '客户名称', 'ename': 'custName' }
                ];
                var showConlist = [
                    { 'name': 'ECIF号', 'ename': 'custNo', 'columnEName': 'custNo', 'sortType': '1' }, // 确认一下ECIF号是否和客户号属于同个字段
                    { 'name': 'NDS号', 'ename': 'ndsCustNo', 'columnEName': 'ndsCustNo', 'sortType': '1' },
                    { 'name': '理财客户经理', 'ename': 'finCustManagerName', 'columnEName': 'finCustManagerName', 'sortType': '1' },
                    { 'name': '个贷客户经理', 'ename': 'LoanCustManagerName', 'columnEName': 'LoanCustManagerName', 'sortType': '1' },
                    { 'name': 'AUM余额月日均', 'ename': 'aumBalanceAvgRmb', 'columnEName': 'aumBalanceAvgRmb', 'sortType': '1' },
                    { 'name': 'AUM余额', 'ename': 'aumBalance', 'columnEName': 'aumBalance', 'sortType': '1' },
                    { 'name': '汇率', 'ename': 'exchangeFinBalance', 'columnEName': 'exchangeFinBalance', 'sortType': '1' },
                    { 'name': '非汇', 'ename': 'nonExchangeFinBalance', 'columnEName': 'nonExchangeFinBalance', 'sortType': '1' },
                    { 'name': '信托', 'ename': 'trustBalanceRmb', 'columnEName': 'trustBalanceRmb', 'sortType': '1' },
                    { 'name': '基金', 'ename': 'rmbFundBalance', 'columnEName': 'rmbFundBalance', 'sortType': '1' },
                    { 'name': '资管', 'ename': 'assestManageBalance', 'columnEName': 'assestManageBalance', 'sortType': '1' },
                    { 'name': 'QDII净值余额', 'ename': 'qdiiBalanceRmb', 'columnEName': 'qdiiBalanceRmb', 'sortType': '1' },
                    { 'name': '保险', 'ename': 'insurranceBalanceRmb', 'columnEName': 'insurranceBalanceRmb', 'sortType': '1' },
                    { 'name': '存款', 'ename': 'depositBalanceRmb', 'columnEName': 'depositBalanceRmb', 'sortType': '1' },
                    // { 'name': '主办分行', 'ename': 'finBelongOgrName', 'columnEName': 'finBelongOgrName', 'sortType': '1' },
                    // { 'name': '主办机构', 'ename': 'finBelongOgrName', 'columnEName': 'finBelongOgrName', 'sortType': '1' },
                    { 'name': '地区', 'ename': 'nationality', 'columnEName': 'nationality', 'sortType': '1', 'notes': 'CD0069' },
                    // { 'name': 'ECIF号', 'ename': 'custId' },
                ];
                // 显示列
                if (this.activeName == 'businessModel') {
                    _set.setShowListData(_set.conlist, val, showConlist)
                } else if (_set.activeName == 'importModel') {
                    _set.setShowListData(_set.importModelList, val, showConlist)
                }
                var param = {
                    pageId: '27578cc9f40d456a86c7e6a1d8ffe209',
                    page: '1',
                    size: '10',
                    condition: JSON.stringify({
                        conditionAttrs: _set.conditionAttrs,
                        results: _set.results,
                        topNum: _set.limitNum,
                        isexport: '1',
                        loanCustManagerN0: _set.loanCustManagerN0,
                        finCustManagerN0: _set.finCustManagerN0,
                        finBelongOrgNo: _set.finBelongOrgNo,
                        loanBelongOrgNo: _set.loanBelongOrgNo,
                        loanCustManagerName: 'loanCustManagerN0',
                        finCustManagerName: 'finCustManagerN0',
                        finBelongOrgName: 'finBelongOrgNo',
                        loanBelongOrgName: 'loanBelongOrgNo'
                    })
                };
                _set.data = [];
                _set.currentPage = 1;
                if (_set.activeName == 'businessModel') { // businessModel 业务模式; importModel Excel导入模式
                    let b = JSON.parse(param.condition)
                    if (_set.list.length == 0) {
                        _set.$message({ message: '请先选择查询条件', type: 'warning' });
                        _set.queryLoading = false;
                        return;
                    } else {
                        _set.querySearchResult(param);
                    }
                } else if (_set.activeName == 'importModel') {
                    var paramsCustno = {
                        ssColType: '6',
                        ssColItem: '',
                        ssColEname: '',
                        ssColOp: "1",
                        loanCustManagerN0: _set.loanCustManagerN0,
                        finCustManagerN0: _set.finCustManagerN0,
                        finBelongOrgNo: _set.finBelongOrgNo,
                        loanBelongOrgNo: _set.loanBelongOrgNo,
                        loanCustManagerName: 'loanCustManagerN0',
                        finCustManagerName: 'finCustManagerN0',
                        finBelongOrgName: 'finBelongOrgNo',
                        loanBelongOrgName: 'loanBelongOrgNo',
                        ssColValue: '',
                        ssColGorder: '',
                        seqno: _set.isseqno,
                        ssColOrder: '0',
                        status: '04',
                        spread: '',
                        conditionType: ''
                    };
                    if (_set.custNoArr && _set.custNoArr.length > 0) {
                        let custArr = _set.custNoArr
                        var custSpread = "客户号_包含";
                        paramsCustno.ssColItem = "10003";
                        paramsCustno.ssColEname = "custNo";
                        paramsCustno.ssColValue = custArr;
                        paramsCustno.ssColGorder = "";
                        paramsCustno.conditionType = '02';
                        for (let t = 0; t < custArr.length; t++) {
                            custSpread += '_' + custArr[i];
                        }
                        paramsCustno.spread = custSpread;
                        let objCust = {};
                        yufp.extend(objCust, paramsCustno)
                        importSearchData.push(objCust)
                    }
                    if (_set.ndsCustNoArr && _set.ndsCustNoArr.length > 0) {
                        let ndsArr = _set.ndsCustNoArr;
                        let ndsStr = "NDS客户编号_包含"
                        paramsCustno.ssColItem = "10136";
                        paramsCustno.ssColEname = "ndsCustNo";
                        paramsCustno.ssColValue = ndsArr;
                        paramsCustno.ssColGorder = 0;
                        paramsCustno.conditionType = '02';
                        for (let t = 0; t < ndsArr.length; t++) {
                            ndsStr += '_' + ndsArr[i];
                        }
                        paramsCustno.spread = ndsStr;
                        let objNds = {}
                        yufp.extend(objNds, paramsCustno)
                        importSearchData.push(objNds)
                    }

                    if (importSearchData && importSearchData.length == 1) {
                        _set.$message({ message: '请导入查询条件', type: 'warning' });
                        _set.imPortentLoading = false;
                    } else {
                        let objInfo = JSON.parse(param.condition)
                        let importObj = []
                        yufp.extend(importObj, importSearchData)
                        objInfo.conditionAttrs = importObj
                        objInfo.results.push(dataDateR)
                        param.condition = JSON.stringify(objInfo)
                        _set.querySearchResult(param);
                    }
                }
                // 查询列表 与 展示列表 - 保存为默认
                _set.searchOrExhibit(val)
            },
            // 查询列表 与 展示列表 - 保存为默认
            searchOrExhibit: function (val) {
                let _set = this;
                var param1 = {
                    userId: yufp.session.userId,
                    userName: yufp.session.userName,
                    queryType: '01', // 查询数据是1，展示数据是2
                    crmFEsUserQueryDTOList: _set.conditionAttrs
                };
                var param2 = {
                    userId: yufp.session.userId,
                    userName: yufp.session.userName,
                    queryType: '02', // 查询数据是1，展示数据是2
                    crmFEsUserQueryDTOList: _set.results
                };
                // 点击查询列表的保存为默认
                if (val && val == 'search') {
                    if (_set.list.length == 0) {
                        _set.$message({ message: '请先选择查询条件', type: 'warning' });
                        _set.queryLoading = false;
                        return;
                    } else {
                        _set.getUpdateEsUserQuery(param1);
                    }
                }
                // 点击展示列表的保存为默认
                if (val && val == 'col') {
                    if (_set.conlist.length == 0) {
                        _set.$message({ message: '请先选择展示条件', type: 'warning' });
                        _set.queryLoading = false;
                        return;
                    } else {
                        _set.getUpdateEsUserQuery(param2);
                    }
                }
            },
            // 展示数据
            setShowListData: function (coInfo, val, showConlist) {
                let _set = this;
                if (coInfo.length == 0) {
                    _set.tableColumnList.push(...showConlist);
                    _set.results.push(...showConlist);
                }
                for (var i = 0; i < coInfo.length; i++) {
                    var resultinfo = {};
                    resultinfo.columnId = coInfo[i].id; // 展示字段ID·
                    resultinfo.sortType = _set.dataTemp[coInfo[i].id].orderType; // 展示字段排序属性
                    resultinfo.columnEName = coInfo[i].ename; // 展示字段名称
                    resultinfo.fieldType = coInfo[i].fieldType; // 展示字段类型
                    resultinfo.columnTotle = '0';
                    if (val && val == 'col') {
                        resultinfo.id = coInfo[i].id;
                        resultinfo.fieldType = coInfo[i].fieldType;
                        resultinfo.attributeNo = coInfo[i].ename; // 属性
                        resultinfo.attributeName = coInfo[i].name; // 属性名称
                        resultinfo.operatorNo = coInfo[i].id; // 操作符
                        resultinfo.operatorName = coInfo[i].ename; // 操作符名称
                        resultinfo.attributeValue = coInfo[i].fieldType; // 属性值
                        resultinfo.items = coInfo[i].notes;
                    }
                    _set.results.push(resultinfo);
                    if (coInfo[i].ename != 'custNo' && coInfo[i].ename != 'custName') {
                        var colunmName = {};
                        colunmName.name = coInfo[i].name;
                        colunmName.ename = coInfo[i].ename;
                        _set.tableColumnList.push(colunmName);
                    }
                }
            },
            // 调用查询结果接口
            querySearchResult: function (param) {
                var _set = this;
                _set.loadingFlag = true;
                _set.btndisabled = true;
                yufp.service.request({
                    method: 'GET',
                    data: param,
                    url: '/api/cmssfcifq/queryresult',
                    callback: function (code, message, response) {
                        if (code == 0) {
                            _set.loadingFlag = false;
                            _set.queryLoading = false;
                            _set.imPortentLoading = false;
                            if (response.code == 0) {
                                _set.paginationTotal = response.total;
                                var responsedata = response.data;
                                _set.conlist.forEach(function (it, idxs) {
                                    if (it.notes != '' && it.notes != undefined) {
                                        responsedata.forEach(function (itm, idx) {
                                            for (var key in itm) {
                                                if (key == it.ename) {
                                                    if (it.notes == 'ORG_SELECT') {
                                                        _set.getOrgCodeName(itm, key, itm[key]);
                                                    } else {
                                                        _set.getcodeitem(itm, it, key);
                                                    }
                                                    break;
                                                }
                                            }
                                        });
                                    }
                                });
                                _set.tableColumnList.forEach(function (it, idxs) {
                                    if (it.notes != '' && it.notes != undefined) {
                                        responsedata.forEach(function (itm, idx) {
                                            for (var key in itm) {
                                                if (key == it.ename) {
                                                    if (it.notes == 'ORG_SELECT') {
                                                        _set.getOrgCodeName(itm, key, itm[key]);
                                                    } else {
                                                        _set.getcodeitem(itm, it, key);
                                                    }
                                                    break;
                                                }
                                            }
                                        });
                                    }
                                });
                                _set.btndisabled = false;
                                var resSql = responsedata && responsedata[0] && responsedata[0].sql ? responsedata[0].sql : '';
                                _set.sql = resSql;
                                _set.$emit('flexy-cust-query-fn', { param: param, ssSql: resSql });
                                var showdata = []; // 展示数据
                                for (var i = 0; i < responsedata.length; i++) {
                                    var resultInfos = {};
                                    for (var k in responsedata[i]) {
                                        // 转换时间格式
                                        if (k.indexOf('Date') != -1) {
                                        }
                                        for (var a = 0; a < _set.conlist.length; a++) {
                                            if (k == _set.conlist[a].ename) {
                                                resultInfos[_set.conlist[a].ename] = responsedata[i][k];
                                            }
                                        }
                                        resultInfos['custNo'] = responsedata[i].custNo;
                                        resultInfos['custName'] = responsedata[i].custName;
                                        resultInfos['ndsCustNo'] = responsedata[i].ndsCustNo;
                                        resultInfos['finCustManagerName'] = responsedata[i].finCustManagerName;
                                        resultInfos['LoanCustManagerName'] = responsedata[i].LoanCustManagerName;
                                        resultInfos['aumBalanceAvgRmb'] = responsedata[i].aumBalanceAvgRmb;
                                        resultInfos['aumBalance'] = responsedata[i].aumBalance;
                                        resultInfos['exchangeFinBalance'] = responsedata[i].exchangeFinBalance;
                                        resultInfos['nonExchangeFinBalance'] = responsedata[i].nonExchangeFinBalance;
                                        resultInfos['trustBalanceRmb'] = responsedata[i].trustBalanceRmb;
                                        resultInfos['rmbFundBalance'] = responsedata[i].rmbFundBalance;
                                        resultInfos['assestManageBalance'] = responsedata[i].assestManageBalance;
                                        resultInfos['qdiiBalanceRmb'] = responsedata[i].qdiiBalanceRmb;
                                        resultInfos['insurranceBalanceRmb'] = responsedata[i].insurranceBalanceRmb;
                                        resultInfos['depositBalanceRmb'] = responsedata[i].depositBalanceRmb;
                                        resultInfos['finBelongOgrName'] = responsedata[i].finBelongOgrName;
                                        resultInfos['nationality'] = responsedata[i].nationality;
                                    }
                                    showdata.push(resultInfos);
                                    if (_set.custGroup) {
                                        _set.$emit('add-custer', showdata);
                                    }
                                }
                                _set.data = showdata;
                                _set.$nextTick(function () {
                                    if (_set.markAct) {
                                        // 分页组件取值总条数
                                        _set.count = response.total;
                                        _set.centerDialogVisible = true;
                                    } else if (_set.custGroup) {
                                    } else {
                                        _set.dialogFormVisible1 = true;
                                    }
                                    if (responsedata.length > 0) {
                                        querysql = responsedata[0].sql;
                                    }
                                    _set.colunmNamelist.push(responsedata);
                                });
                            } else {
                                _set.queryLoading = false;
                                _set.$message({ message: response.message, type: 'warning' });
                                _set.dialogFormVisible1 = false;
                                // 查询结果的按钮 zcl 2021年1月5日10:19:08 当查询没有数的时候，也放开限制
                                _set.btndisabled = false;
                            }
                        } else {
                            _set.queryLoading = false;
                            _set.imPortentLoading = false;
                            _set.$message({ message: response.message, type: 'warning' });
                        }
                    }
                });
            },
            // 调用保存的接口
            getUpdateEsUserQuery: function (param) {
                var _set = this;
                _set.queryLoading = false;
                yufp.service.request({
                    method: 'POST',
                    data: param,
                    url: '/api/cmssfcifq/updateEsUserQuery',
                    callback: function (code, message, response) {
                        _set.$message({ message: response.message, type: 'info' });
                        if (code == 0) {
                            _set.getQueryListInfoFn(param.queryType);
                        }
                    }
                })
            },
            handleCurrentChange: function (val) {
                if (val > 1000) {
                    this.$message({ message: '不能查询超过1000页的数据', type: 'warning' });
                    return;
                }
                var _set = this;
                var param = {
                    pageId: '27578cc9f40d456a86c7e6a1d8ffe209',
                    page: val,
                    size: 10,
                    condition: JSON.stringify({
                        conditionAttrs: _set.conditionAttrs,
                        results: _set.results,
                        topNum: _set.limitNum,
                        isexport: '1',
                        busiTypeFlag: '1'
                    })
                };
                _set.querySearchResult(param);
            },
            /**
             * 关闭查询结果弹窗
             */
            handleCustListClose: function () {
                this.$refs.qryresult.clearSelection();
                this.dialogFormVisible1 = false;
            },
            getOrgCodeName: function (itm, key, orgCode) {
                yufp.service.request({
                    method: 'GET',
                    data: {
                        orgCode: orgCode
                    },
                    async: false,
                    url: backend.appYscrmCustMgtService + '/api/cimpfcifqdbcol/getOrgCodeName',
                    callback: function (code, message, response) {
                        if (code == 0) {
                            itm[key] = response.data;
                        }
                    }
                });
            },
            // 查询结果-数据字典映射
            // getcodeitem: function(itm, it, key) {
            //     yufp.service.request({
            //         method: 'GET',
            //         url: '/api/adminsmlookupitem/weblist',
            //         data: {
            //             lookupCodes: it.notes.toString()
            //         },
            //         async: false, // 此处使用同步方式映射数据字典值
            //         callback: function(code, message, response) {
            //             if (code == 0) {
            //                 var arr = response.data[it.notes.toString()];
            //                 for (var i = 0; i < arr.length; i++) {
            //                     if (arr[i].key == itm[key]) {
            //                         itm[key] = arr[i].value;
            //                         break;
            //                     }
            //                 }
            //             }
            //         }
            //     });
            // },
            getcodeitem: function (itm, it, key) {
                var arr = yufp.lookup.find(it.notes.toString()) || [];
                if (itm[key]) {
                    for (var i = 0; i < arr.length; i++) {
                        itm[key] = typeof itm[key] == 'string' ? itm[key] : String(itm[key]);
                        if (arr[i].key == itm[key].trim()) {
                            itm[key] = arr[i].value;
                            break;
                        }
                    }
                } else {
                    itm[key] = '';
                }
            },
            utc2beijing: function (UTCDateString) {
                if (!UTCDateString) {
                    return '-';
                }

                function formatFunc(str) { // 格式化显示
                    return str > 9 ? str : '0' + str;
                }

                var date2 = new Date(UTCDateString); // 这步是关键
                var year = date2.getFullYear();
                var mon = formatFunc(date2.getMonth() + 1);
                var day = formatFunc(date2.getDate());
                var hour = date2.getHours();
                var noon = hour >= 12 ? 'PM' : 'AM';
                hour = hour >= 12 ? hour - 12 : hour;
                hour = formatFunc(hour);
                var min = formatFunc(date2.getMinutes());
                var secon = formatFunc(date2.getSeconds());
                var dateStr = year + '-' + mon + '-' + day + ' ' + noon + ' ' + hour + ':' + min + ':' + secon;
                return dateStr;
            },

            /** 报表发布 */
            reportPubFn: function () {
                this.reportdialogVisible = true;
                this.reportTemp.reportName = '';
            },
            /** 保存为客户群 */
            saveAsCustGroupFn: function () {
                var _this = this;
                if (_this.searchObjType.key != '464') {
                    _this.$message({ message: '请先选择客户查询', type: 'warning' });
                    return;
                }
                if (_this.list.length == 0) {
                    _this.$message({ message: '请先选择查询条件', type: 'warning' });
                    return;
                }
                // 拼接参数
                for (var i = 0; i < _this.list.length; i++) {
                    if (_this.dataSqlTemp[_this.list[i].index].signOp == null || _this.dataSqlTemp[_this.list[i].index].signOp === '' || _this.dataSqlTemp[_this.list[i].index].signOp == undefined) {
                        _this.$message('操作符不能为空');
                        return;
                    }
                    if (_this.dataSqlTemp[_this.list[i].index].signVal == null || _this.dataSqlTemp[_this.list[i].index].signVal === '' || _this.dataSqlTemp[_this.list[i].index].signVal == undefined) {
                        _this.$message('属性值不能为空');
                        return;
                    }
                }
                this.addcustomersdialogVisible = true;
                this.$nextTick(function () {
                    this.resetForm();
                    _this.customersTemp.groupMemberType = '3';
                });
            },
            resetForm: function () {
                var _this = this;
                _this.customersTemp.custGroupName = '';
                _this.customersTemp.custGroupType = '';
                _this.customersTemp.customersColumn = '';
                _this.customersTemp.groupMemberType = '';
                _this.customersTemp.batchType = '';
                _this.customersTemp.remark = '';
            },
            // 保存客户群方案
            saveGroupFun: function (custGroup) {
                var _set = this;
                if (_set.list.length == 0) {
                    _set.$message({ message: '请先选择查询条件', type: 'warning' });
                    return;
                }
                _set.conditionAttrs = [];
                _set.groupAttrs = [];
                _set.results = [];
                _set.qryarr = [];
                // 拼接参数
                for (var i = 0; i < _set.list.length; i++) {
                    _set.qryarr = [];
                    var info = {};
                    var groupAttr = {};
                    if (_set.dataSqlTemp[_set.list[i].index].signOp == null || _set.dataSqlTemp[_set.list[i].index].signOp === '' || _set.dataSqlTemp[_set.list[i].index].signOp == undefined) {
                        _set.$message('操作符不能为空');
                        return;
                    }
                    if (_set.dataSqlTemp[_set.list[i].index].signVal == null || _set.dataSqlTemp[_set.list[i].index].signVal === '' || _set.dataSqlTemp[_set.list[i].index].signVal == undefined) {
                        _set.$message('属性值不能为空');
                        return;
                    }
                    info.SS_COL_ITEM = _set.list[i].id;
                    info.SS_COL_OP = _set.dataSqlTemp[_set.list[i].index].signOp;
                    info.SS_COL_VALUE = _set.dataSqlTemp[_set.list[i].index].signVal;
                    info.SS_COL_GJOIN = _set.dataSqlTemp[_set.list[i].index].radio2;
                    info.SS_COL_JOIN = '';
                    info.SS_COL_GORDER = i;
                    info.SS_COL_ORDER = '0';
                    if (info.SS_COL_GJOIN == '并') {
                        info.SS_COL_GJOIN = 'and';
                    } else if (info.SS_COL_GJOIN == '或') {
                        info.SS_COL_GJOIN = 'or';
                    }
                    _set.qryarr.push(info);
                    groupAttr.ssColItem = _set.list[i].id;
                    groupAttr.ssColOp = _set.dataSqlTemp[_set.list[i].index].signOp;
                    groupAttr.ssColValue = _set.dataSqlTemp[_set.list[i].index].signVal;
                    groupAttr.ssColGjoin = _set.dataSqlTemp[_set.list[i].index].radio2;
                    groupAttr.ssColJoin = '';
                    groupAttr.ssColGorder = i;
                    groupAttr.ssColOrder = '0';
                    groupAttr.ssId = custGroup.custGroupId;
                    if (groupAttr.ssColGjoin == '并') {
                        groupAttr.ssColGjoin = 'and';
                    } else if (groupAttr.ssColGjoin == '或') {
                        groupAttr.ssColGjoin = 'or';
                    }
                    _set.groupAttrs.push(groupAttr);
                    var childinfo = {};
                    if (_set.list[i].children && _set.list[i].children.length > 0) {
                        for (var j = 0; j < _set.list[i].children.length; j++) {
                            if (_set.dataSqlTemp[_set.list[i].children[j].index].signVal == null || _set.dataSqlTemp[_set.list[i].children[j].index].signVal === '' || _set.dataSqlTemp[_set.list[i].children[j].index].signVal == undefined) {
                                _set.$message('属性值不能为空');
                                return;
                            }
                            if (_set.dataSqlTemp[_set.list[i].children[j].index].signOp == null || _set.dataSqlTemp[_set.list[i].children[j].index].signOp === '' || _set.dataSqlTemp[_set.list[i].children[j].index].signOp == undefined) {
                                _set.$message('操作符不能为空');
                                return;
                            }
                            childinfo.SS_COL_ITEM = _set.list[i].children[j].id;
                            childinfo.SS_COL_OP = _set.dataSqlTemp[_set.list[i].children[j].index].signOp;
                            childinfo.SS_COL_VALUE = _set.dataSqlTemp[_set.list[i].children[j].index].signVal;
                            childinfo.SS_COL_GJOIN = '';
                            childinfo.SS_COL_GORDER = i;
                            childinfo.SS_COL_ORDER = j + 1;
                            childinfo.SS_COL_JOIN = _set.dataSqlTemp[_set.list[i].children[j].index].radio2;
                            if (childinfo.SS_COL_JOIN == '并') {
                                childinfo.SS_COL_JOIN = 'and';
                            } else if (childinfo.SS_COL_JOIN == '或') {
                                childinfo.SS_COL_JOIN = 'or';
                            }
                        }
                        _set.qryarr.push(childinfo);
                    }
                    _set.conditionAttrs.push(_set.qryarr);
                }
                for (var i = 0; i < _set.list.length; i++) {
                    var resultinfo = {};
                    resultinfo.columnId = _set.list[i].id;
                    resultinfo.sortType = '1';
                    resultinfo.columnTotle = '0';
                    _set.results.push(resultinfo);
                }
                var param = {
                    condition: JSON.stringify({
                        conditionAttrs: _set.conditionAttrs,
                        results: _set.results,
                        topNum: _set.limitNum,
                        isexport: '1'
                    })
                };
                _set.data = [];
                // 查询当前机构级别
                yufp.service.request({
                    method: 'GET',
                    url: backend.appYscrmCustMgtService + '/api/cimpfcifqscol/getUuid',
                    data: { orgCode: yufp.session.org.code },
                    callback: function (code, message, response) {
                        if (code == 0 && response.code === 0) {
                            if (response.data.orgLevel == 1) {
                                // 表示总行级用户
                                param = {
                                    condition: JSON.stringify({
                                        conditionAttrs: _set.conditionAttrs,
                                        results: _set.results,
                                        topNum: _set.limitNum,
                                        isexport: '1',
                                        busiTypeFlag: '1'
                                    })
                                };
                            }
                            // 调用查询结果接口
                            yufp.service.request({
                                method: 'GET',
                                data: param,
                                url: backend.appYscrmCustMgtService + '/api/cimpfcifqdbcol/querysql',
                                callback: function (code, message, response) {
                                    if (code == 0) {
                                        var groupAuto = {};
                                        groupAuto.custGroupId = custGroup.custGroupId;
                                        groupAuto.sql = response.data.sql;
                                        yufp.service.request({
                                            method: 'POST',
                                            data: groupAuto,
                                            url: backend.appYscrmCustMgtService + '/api/cimpccgbaseinfo/updateAuto',
                                            callback: function (code, message, response) {
                                                if (code == 0) {

                                                }
                                            }
                                        });
                                        yufp.service.request({
                                            method: 'POST',
                                            data: { groupData: _set.groupAttrs },
                                            url: backend.appYscrmCustMgtService + '/api/cimpfcifqssolution/savegroupscol',
                                            callback: function (code, message, response) {
                                                if (code == 0) {
                                                    _set.$message('操作成功');
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            },
            // 组合规则
            composeRule: function () {
                var list = [];
                this.rulesList.forEach(function (rule) {
                    list.push(rule.name + ' 等于 ' + rule.ssColValue);
                });
                return list.join('并且');
            },
            getCustIdList: function () {
                var list = this.$refs.qryresult.selections;
                var ids = [];
                for (var i = 0; i < list.length; i++) {
                    ids.push(list[i].custNo);
                }
                return ids;
            },
            // 保存为客户群 保存
            savecustomers: function () {
                var model = {};
                var _set = this;
                yufp.extend(model, _set.$refs.customersTemp.model);
                model.custGroupDescribe = model.remark;
                model.custGroupRule = _set.composeRule();
            },
            originRequest: function (model) {
                var _set = this;
                model.custOrigin = '2';
                yufp.service.request({
                    method: 'POST',
                    url: backend.appYscrmCustMgtService + '/api/cimpccgbaseinfo/add',
                    data: model,
                    callback: function (code, message, response) {
                        if (code == '0') {
                            _set.$message({ message: '保存成功!', type: 'info' });
                            _set.saveGroupFun(response.data);
                            _set.addcustomersdialogVisible = false;
                            _set.$emit('updateFn');
                            _set.handleCustGroupClose();
                        } else {
                            _set.$message({ message: '保存失败!', type: 'warning' });
                            _set.addcustomersdialogVisible = false;
                        }
                    }
                });
            },
            modifyRequest: function (model) {
                var _set = this;
                let selectInfo = _set.getCustIdList();
                let seqno = _set.isseqno;
                yufp.service.request({
                    method: 'POST',
                    url: '/api/ocrmfcicgbase/insertlinBase',
                    data: {
                        conditionType: '01',
                        conditionNo: selectInfo.length == 0 ? seqno : '',
                        fCissCgBase: model,
                        custId: selectInfo
                    },
                    callback: function (code, message, response) {
                        if (code == '0') {
                            _set.$message({ message: '保存成功!', type: 'info' });
                            // _set.addcustomersdialogVisible = false;
                            _set.$emit('createcloseflexy');
                            _set.$emit('updateFn');
                            _set.handleCustGroupClose();
                        } else {
                            _set.$message({ message: '保存失败!', type: 'warning' });
                            // _set.addcustomersdialogVisible = false;
                        }
                    }
                });
            },
            handleCustGroupClose: function () {
                this.$refs.customersTemp.resetFields();
                this.addcustomersdialogVisible = false;
                this.dislogFormVisible1 = false;
                this.customersdialogVisible = false;
            },
            // 导出
            exportInfoFn: function () {
                var _this = this;
                // 应先判断当前用户的层级关系
                // 1表示不脱敏导出
                _this.$confirm('是否不脱敏导出?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'warning',
                    callback: function (action) {
                        if (action === 'confirm') {
                            var param = {
                                colunmNamelist: _this.colunmNamelist,
                                datalist: _this.data
                            };
                            var data = {
                                orgCode: yufp.session.org.code
                            };
                            yufp.service.request({
                                method: 'GET',
                                url: backend.appYscrmCustMgtService + '/api/cimpfcifqscol/getUuid',
                                data: data,
                                callback: function (code, message, response) {
                                    var datas = {
                                        params: JSON.stringify(param),
                                        bizseqno: response.data.uuid
                                    };
                                    var commintData = {};
                                    commintData.applType = 'BTMDCYWLC';
                                    if (response.data.orgLevel == 1 || response.data.orgLevel == 3) {
                                        // 表示总行级用户和一级支行用户,那么下一审批人为总行综合管理员
                                        commintData.paramMap = {
                                            orgLevel: '2'
                                        };
                                    } else if (response.data.orgLevel == 4) {
                                        // 表示二级支行用户，下一审批人为一级支行综合管理员
                                        commintData.paramMap = {
                                            orgLevel: '1'
                                        };
                                    }
                                    _this.bizSeqNo = response.data.uuid;
                                    // 流程主键
                                    commintData.bizSeqNo = response.data.uuid;
                                    commintData.custId = yufp.session.userId;
                                    commintData.custName = yufp.session.userName;
                                    yufp.service.request({
                                        method: 'GET',
                                        url: backend.appYscrmCustMgtService + '/api/ocrmAciReportApply/add',
                                        data: datas,
                                        callback: function (code, message, response) {
                                            if (code == 0) { } else {
                                                return;
                                            }
                                        }
                                    });
                                    _this.$refs.approvalRef.wfInit(commintData);
                                }
                            });
                        } else {
                            // 直接导出
                            var paramQuery = {
                                condition: JSON.stringify({
                                    conditionAttrs: _this.conditionAttrs,
                                    results: _this.results,
                                    topNum: _this.limitNum
                                })
                            };
                            yufp.service.request({
                                method: 'GET',
                                data: paramQuery,
                                url: backend.appYscrmCustMgtService + '/api/cimpfcifqdbcol/queryresult',
                                callback: function (code, message, response) {
                                    if (code == 0) {
                                        if (response.code == 0) {
                                            var showdata = []; // 展示数据
                                            var resultInfos = {};
                                            for (var i = 0; i < response.data.length; i++) {
                                                for (var k in response.data[i]) {
                                                    // 转换时间格式
                                                    if (k.indexOf('Date') != -1) {
                                                        response.data[i][k] = _this.utc2beijing(response.data[i][k]);
                                                    }
                                                    for (var a = 0; a < _this.conlist.length; a++) {
                                                        if (k.indexOf(_this.conlist[a].ename) != -1) {
                                                            resultInfos[_this.conlist[a].ename] = response.data[i][k];
                                                        }
                                                        resultInfos['custId'] = response.data[i].custId;
                                                        resultInfos['custName'] = response.data[i].custName;
                                                    }
                                                }
                                                showdata.push(resultInfos);
                                            }
                                            var paramExport = {
                                                colunmNamelist: _this.colunmNamelist,
                                                datalist: showdata
                                            };
                                            var params = {};
                                            params.url = backend.appYscrmCustMgtService + '/api/cimpfcifqdbcol/export';
                                            params.url = yufp.service.getUrl(params);
                                            params.url += '?access_token=' + yufp.service.getToken();
                                            params.url += '&condition=' + encodeURI(JSON.stringify(paramExport));
                                            yufp.util.download(params.url);
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
            },
            /**
             * 选择客户群后执行
             */
            selectGroupFn: function (data) {
                // this.formdata.groupMemberType = data.groupMemberType;
            },
            cancelFn: function () {
                var _this = this;
                _this.customersdialogVisible = false;
            },
            saveaddcustomers: function () {
                var _this = this;
                var model = {};
                yufp.clone(_this.formdata, model);
                var validate = false;
                _this.$refs.customersTemp.validate(function (valid) {
                    validate = valid;
                });
                if (!validate) {
                    return;
                }

                if (_this.newFunc) {
                    var params = {
                        custGroupId: model.groupId
                    };
                    _this.modifyRequest(params);
                } else {
                    _this.originSaveaddcustomers(model);
                }
            },
            originSaveaddcustomers: function (model) {
                var selections = _this.$refs.qryresult.selections;
                var custIds = [];
                for (var i = 0; i < selections.length; i++) {
                    if (!selections[i].custId) {
                        return;
                    }
                    var info = {
                        custId: selections[i].custId,
                        custName: selections[i].custName
                    };

                    custIds.push(info);
                }
                _this.stepOneData.custQueryType = '02';
                var param = {
                    crmCustomerDTO: _this.stepOneData,
                    fCgPreparationList: custIds,
                    fCissCgBase: {
                        custGroupId: model.groupId
                    }
                };
                yufp.service.request({
                    method: 'POST',
                    url: '/api/ocrmfcicgbase/insertBase',
                    data: param,
                    callback: function (code, message, response) {
                        if (code == 0) {
                            if (response.code == 0) {
                                _this.customersdialogVisible = false;
                                _this.$message(response.message);
                            } else if (response.code === -1 || response.code === -2 || response.code === -3) {
                                _this.$message({
                                    showClose: true,
                                    message: response.message,
                                    type: 'warning'
                                });
                            } else {
                                _this.$message({
                                    showClose: true,
                                    message: response.message,
                                    type: 'error'
                                });
                            }
                        }
                    }
                });
            },
            closecustomers: function () {
                this.customersdialogVisible = false;
            },
            closesave: function () {
                this.solutionformVisible = false;
            },
            closeaddcustomers: function () {
                this.handleCustGroupClose();
            },
            /** 保存方案*/
            saveSetFn: function () {
                var _this = this;
                if (!_this.markSolutionShow && _this.firstSerch) {
                    yufp.localStorage.put('custFlexList', JSON.stringify(_this.list));
                    yufp.localStorage.put('custFlexdataSql', JSON.stringify(_this.dataSqlTemp));
                }
                if (_this.list.length == 0) {
                    _this.$message({ message: '请先选择查询条件', type: 'warning' });
                    return;
                }
                if (!_this.markAct) {
                    _this.solutionformVisible = true;
                } else {
                    // 拼接参数begin
                    var conditionAttrs = [],
                        solution = [];
                    for (var i = 0; i < _this.list.length; i++) {
                        _this.qryarr = [];
                        var info = {};
                        info.ssColItem = _this.list[i].id;
                        info.ssColOp = _this.dataSqlTemp[_this.list[i].id].signOp;
                        info.ssColValue = _this.dataSqlTemp[_this.list[i].id].signVal;
                        info.ssColGjoin = _this.dataSqlTemp[_this.list[i].id].radio2;
                        info.ssColJoin = '';
                        info.ssColGorder = i;
                        info.ssColOrder = '0';
                        info.ssId = '1';
                        if (info.ssColGjoin == '并') {
                            info.ssColGjoin = 'and';
                        } else if (info.ssColGjoin == '或') {
                            info.ssColGjoin = 'or';
                        }
                        conditionAttrs.push(info);
                        var childinfo = {};
                        if (_this.list[i].children && _this.list[i].children.length > 0) {
                            for (var j = 0; j < _this.list[i].children.length; j++) {
                                childinfo.ssColItem = _this.list[i].children[j].id;
                                childinfo.ssColOp = _this.dataSqlTemp[_this.list[i].children[j].id].signOp;
                                childinfo.ssColValue = _this.dataSqlTemp[_this.list[i].children[j].id].signVal;
                                childinfo.ssColGjoin = '';
                                childinfo.ssColOrder = j + 1;
                                childinfo.ssColGorder = i;
                                childinfo.ssColJoin = _this.dataSqlTemp[_this.list[i].children[j].id].radio2;
                                if (childinfo.ssColJoin == '并') {
                                    childinfo.ssColJoin = 'and';
                                } else if (childinfo.ssColJoin == '或') {
                                    childinfo.ssColJoin = 'or';
                                }
                            }
                            conditionAttrs.push(childinfo);
                        }
                    }
                    var resultinfo = {};
                    var ssResult = '';
                    var ssSort = '';
                    for (var i = 0; i < _this.solutionlist.length; i++) {
                        ssResult += _this.solutionlist[i].id;
                        ssSort += _this.dataTemp[_this.solutionlist[i].id].orderType;
                        if (i != _this.solutionlist.length - 1) {
                            ssResult += ',';
                            ssSort += ',';
                        }
                    }
                    resultinfo.ssResult = ssResult;

                    resultinfo.ssSort = ssSort;
                    resultinfo.ssType = '1'; // 默认1零售业务
                    // resultinfo.ssType = _this.searchObjType.key.toString();
                    resultinfo.ssName = _this.itemssTemp.ssName;
                    resultinfo.id = '1';
                    resultinfo.topNum = _this.limitNum;
                    solution.push(resultinfo);
                    // 拼接参数end


                    // 营销活动的保存
                    if (!_this.orRepeat) {
                        _this.$message({
                            message: '是否排重为必输项',
                            type: 'warning'
                        });
                        return;
                    }
                    if (_this.queryBtn) {
                        if (_this.count === '') {
                            _this.$message({
                                message: '请点击查询结果后点击保存',
                                type: 'warning'
                            });
                            return;
                        };
                        if (_this.count == 0) {
                            _this.$message({
                                message: '查询结果为空，请重新选择查询条件',
                                type: 'warning'
                            });
                            return;
                        }
                    }
                    delete _this.dataSqlTemp.ID;
                    var queryStr = '';
                    _this.list.forEach(function (item, index) {
                        var id = item.id;
                        var parseNum = _this.dataSqlTemp[id].signOp;
                        queryStr += item.name + (parseNum == '0000' ? '包含' : parseNum == '0001' ? '大于' : parseNum == '0002' ? '等于' : parseNum == '0003' ? '小于' : parseNum == '0004' ? '大于等于' : parseNum == '0005' ? '小于等于' : parseNum == '0006' ? '不等于' : '') + _this.selInpValList[index] + ';';
                    });
                    var flexQuery = {
                        ruleType: '01',
                        ruleParam: _this.sql,
                        custCount: _this.count,
                        ruleContent: queryStr,
                        orRepeat: _this.orRepeat,
                        list: _this.list,
                        conditionAttrs: conditionAttrs,
                        solution: solution
                    };
                    _this.$emit('save-rule-fn', flexQuery);
                }
                _this.$nextTick(function () {
                    // _this.itemssTemp.ssName = '';
                });
            },
            saveSolutionsub: function () {
                var _set = this;
                if (!_set.itemssTemp.ssName) {
                    _set.$message({ message: '请填写方案名称！', type: 'warning' });
                    return;
                }
                // 拼接参数begin
                _set.conditionAttrs = [];
                _set.solution = [];
                for (var i = 0; i < _set.list.length; i++) {
                    _set.qryarr = [];
                    var info = {};
                    info.ssColItem = _set.list[i].id;
                    info.ssColType = _set.list[i].fieldType;
                    info.ssColOp = _set.dataSqlTemp[_set.list[i].id].signOp;

                    if (info.ssColOp == '6') { // 处理 '区间'操作符
                        var tempVal = _set.dataSqlTemp[_set.list[i].id].signVal;
                        if (info.ssColType == '2') { // 处理 数值类型字段
                            var tempValArr = tempVal.split('~');
                            tempValArr[0] = Number(tempValArr[0]);
                            tempValArr[1] = Number(tempValArr[1]);
                            if (tempValArr.length == 2 && !isNaN(tempValArr[0]) && !isNaN(tempValArr[1])) {
                                info.ssColValue = tempValArr.join('$');
                            } else {
                                _set.$message({ message: '数值字段区间值格式为:数字~数字', type: 'warning' });
                                return;
                            }
                        } else if (info.ssColType == '3') { // 处理日期类型字段
                            var tempValStrStart = yufp.util.dateFormat(tempVal[0], '{y}-{m}-{d}');
                            var tempValStrEnd = yufp.util.dateFormat(tempVal[1], '{y}-{m}-{d}');
                            info.ssColValue = tempValStrStart + '$' + tempValStrEnd;
                        }
                    } else { // 其余默认
                        if (_set.dataSqlTemp[_set.list[i].id].signVal instanceof Array) { //   处理多选框
                            info.ssColValue = _set.dataSqlTemp[_set.list[i].id].signVal.join(',');
                        } else {
                            info.ssColValue = _set.dataSqlTemp[_set.list[i].id].signVal;
                        }
                    }
                    info.ssColGjoin = _set.dataSqlTemp[_set.list[i].id].radio2;
                    info.ssColJoin = '';
                    info.ssColGorder = i;
                    info.ssColOrder = '0';
                    info.ssId = '1';
                    if (info.ssColGjoin == '并') {
                        info.ssColGjoin = 'and';
                    } else if (info.ssColGjoin == '或') {
                        info.ssColGjoin = 'or';
                    }
                    _set.conditionAttrs.push(info);
                    var childinfo = {};
                    if (_set.list[i].children && _set.list[i].children.length > 0) {
                        for (var j = 0; j < _set.list[i].children.length; j++) {
                            childinfo.ssColItem = _set.list[i].children[j].id;
                            childinfo.ssColOp = _set.dataSqlTemp[_set.list[i].children[j].id].signOp;
                            if (_set.dataSqlTemp[_set.list[i].children[j].id].signVal instanceof Array) {
                                childinfo.ssColValue = _set.dataSqlTemp[_set.list[i].children[j].id].signVal.join(',');
                            } else {
                                childinfo.ssColValue = _set.dataSqlTemp[_set.list[i].children[j].id].signVal;
                            }
                            childinfo.ssColGjoin = '';
                            childinfo.ssColOrder = j + 1;
                            childinfo.ssColGorder = i;
                            childinfo.ssColJoin = _set.dataSqlTemp[_set.list[i].children[j].id].radio2;
                            if (childinfo.ssColJoin == '并') {
                                childinfo.ssColJoin = 'and';
                            } else if (childinfo.ssColJoin == '或') {
                                childinfo.ssColJoin = 'or';
                            }
                        }
                        _set.conditionAttrs.push(childinfo);
                    }
                }
                var resultinfo = {};
                var ssResult = '';
                var ssSort = '';
                for (var i = 0; i < _set.solutionlist.length; i++) {
                    ssResult += _set.solutionlist[i].id;
                    ssSort += _set.dataTemp[_set.solutionlist[i].id].orderType;
                    if (i != _set.solutionlist.length - 1) {
                        ssResult += ',';
                        ssSort += ',';
                    }
                }
                resultinfo.ssResult = ssResult;

                resultinfo.ssSort = ssSort;
                resultinfo.ssType = '1'; // 默认1零售业务
                // resultinfo.ssType = this.searchObjType.key.toString();
                resultinfo.ssName = _set.itemssTemp.ssName;
                // resultinfo.id = '1';
                resultinfo.topNum = _set.limitNum;
                resultinfo.ssSql = _set.sql;
                // _set.solution.push(resultinfo);
                // 拼接参数end
                // 校验方案名称是否存在
                yufp.service.request({
                    url: '/api/cmssfcifq/checkssnameisrepeat',
                    method: 'get',
                    data: {
                        ssName: _set.itemssTemp.ssName
                    },
                    callback: function (code, message, response) {
                        if (code == 0) {
                            if (response.code == 0) {
                                if (response.data != '0') {
                                    resultinfo.id = response.data;
                                    _set.$confirm('该方案已经存在，是否更新当前方案?', '提示', {
                                        confirmButtonText: '是',
                                        cancelButtonText: '否',
                                        type: 'warning'
                                    }).then(function () { // 是的情况 更新当前方案
                                        yufp.service.request({
                                            url: '/api/cmssfcifq/upsertfqsolutioninfo',
                                            method: 'POST',
                                            data: {
                                                solutionInfo: resultinfo,
                                                solutionScolInfoList: _set.conditionAttrs
                                            },
                                            // async: false,
                                            callback: function (code, message, response) {
                                                if (code == 0) {
                                                    if (response.code == 0) {
                                                        _set.$refs.filterTable.remoteData();
                                                        _set.$message({ message: '更新方案成功!', type: 'info' });
                                                        _set.solutionformVisible = false;
                                                    } else {
                                                        _set.$message({
                                                            showClose: true,
                                                            message: response.message,
                                                            type: 'error'
                                                        });
                                                    }
                                                }
                                            }
                                        });
                                    }).catch(function () { // 否的情况 新增
                                        _set.$message({ message: '该方案已经存在，请修改方案名称!', type: 'warning' });
                                    });
                                } else {
                                    _set.savescol(resultinfo, _set.conditionAttrs);
                                }
                            } else {
                                _set.$message({
                                    showClose: true,
                                    message: response.message,
                                    type: 'error'
                                });
                            }
                        }
                    }
                });
            },
            savescol: function (resultinfo, conditionAttrs) {
                var _this = this;
                yufp.service.request({
                    url: '/api/cmssfcifq/upsertfqsolutioninfo',
                    method: 'POST',
                    data: {
                        solutionInfo: resultinfo,
                        solutionScolInfoList: conditionAttrs
                    },
                    callback: function (code, message, response) {
                        if (code == 0) {
                            if (response.code == 0) {
                                _this.$refs.filterTable.remoteData();
                                _this.$message({ message: '新增方案成功!', type: 'info' });
                                _this.solutionformVisible = false;
                            } else {
                                _this.$message({
                                    showClose: true,
                                    message: response.message,
                                    type: 'error'
                                });
                            }
                        }
                    }
                });
            },
            closecase: function () {
                this.casedialogVisible = false;
            },
            choosecustomers: function () { },
            closechoose: function () { },
            resetSearchFn: function () {
                this.list = [];
            },
            resetColFn: function () {
                this.conlist = [];
            },
            /** 重置 */
            resetconditionFn: function () {
                this.list = [];
                this.colunmNamelist = [
                    // { 'name': '主表客户编号', 'id': '', 'ename': 'custId' }, {
                    // 'name': '主表客户名称', 'id': '', 'ename': 'custName'}
                ];
                this.solutionlist = [];
                this.conlist = [];
                this.columnOptions = [];
                this.firstOptions = [];
                this.secondOptions = [];
                this.thirdOptions = [];
                this.fourOptions = [];
                this.fiveOptions = [];
                this.chartTagOptions = [];
                this.chartTargetOptions = [];
                this.xchartTagOptions = [];
                this.ychartTargetOptions = [];
                // this.resetGroupFn();
            },
            // Excel导入模式 重置
            importResetFn: function () {
                let _this = this;
                _this.imPortentLoading = false;
                _this.importModelList = []; // 展示数据
                _this.custNoArr = []; // 客户号
                _this.ndsCustNoArr = []; // NDS客户编号
            },
            filterNode: function (value, data, node) {
                if (!value) {
                    return true;
                }
                if (data.name.indexOf(value) !== -1) {
                    return true;
                }
                return yufp.util.checkBelongToChooseNode(
                    value,
                    node,
                    'name'
                );
            },
            /** 分组汇总统计 */
            /**
             * 分组汇总的第一组下拉框选中值发生变化时执行
             */
            selectFirstGroup: function (key) {
                var _this = this;
                // TODO

                for (var i = 0, len = _this.firstOptions.length; i < len; i++) {
                    // 找到select的option中选择的项的数据
                    if (_this.firstOptions[i].id == key) {
                        // 新增
                        _this.optionData[0] = _this.firstOptions[i];
                        break;
                    }
                }
            },
            /**
             * 点击分组汇总下拉框“清除”，
             * @param index 分组的序号，从1开始
             */
            clearGroupFn: function (index) {
                this.optionData.splice(index - 1, 1);
            },
            /**
             * 分组汇总的第二组下拉框选中值发生变化时执行
             */
            selectSecondGroup: function (key) {
                var _this = this;
                for (var i = 0, len = _this.secondOptions.length; i < len; i++) {
                    // 找到select的option中选择的项的数据
                    if (_this.secondOptions[i].id == key) {
                        // 新增
                        _this.optionData[1] = _this.secondOptions[i];
                        break;
                    }
                }
            },
            /**
             * 分组汇总的第三组下拉框选中值发生变化时执行
             */
            selectThirdGroup: function (key) {
                var _this = this;
                for (var i = 0, len = _this.thirdOptions.length; i < len; i++) {
                    // 找到select的option中选择的项的数据
                    if (_this.thirdOptions[i].id == key) {
                        // 新增
                        _this.optionData[2] = _this.thirdOptions[i];
                        break;
                    }
                }
            },
            /**
             * 分组汇总的第四组下拉框选中值发生变化时执行
             */
            selectFourGroup: function (key) {
                var _this = this;
                for (var i = 0, len = _this.fourOptions.length; i < len; i++) {
                    // 找到select的option中选择的项的数据
                    if (_this.fourOptions[i].id == key) {
                        // 新增
                        _this.optionData[3] = _this.fourOptions[i];
                        break;
                    }
                }
            },
            /**
             * 分组汇总的第五组下拉框选中值发生变化时执行
             */
            selectFiveGroup: function (key) {
                var _this = this;
                for (var i = 0, len = _this.fiveOptions.length; i < len; i++) {
                    // 找到select的option中选择的项的数据
                    if (_this.fiveOptions[i].id == key) {
                        // 新增
                        _this.optionData[4] = _this.fiveOptions[i];
                        break;
                    }
                }
            },
            /**
             * 分组汇总表，查询结果
             */
            resLoadedFn: function () {

            },
            /**
             * 点击 “分组汇总统计” 按钮后执行
             */
            groupSummFn: function () {
                // 将所选分组和和汇总后的字段作为表格的表头展示
                var _this = this;
                // 校验查询条件列
                var refname = 'item.index';
                var refObj = this.$refs[refname];
                var refChd = this.$refs.refQueryChd;
                if (refObj instanceof Array) {
                    for (var v = 0, len = refObj.length; v < len; v++) {
                        var validate = false;
                        refObj[v].validate(function (valid) {
                            validate = valid;
                        });
                        if (!validate) {
                            this.$message({
                                type: 'warning',
                                message: '请填写查询条件'
                            });
                            return;
                        }
                    }
                } else {
                    var validate = false;
                    refObj.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        this.$message({
                            type: 'warning',
                            message: '请填写查询条件'
                        });
                        return;
                    }
                }

                // 分组汇总选择的字段信息
                if (_this.optionData.length == 0) {
                    _this.$message({
                        type: 'warning',
                        message: '请至少添加一个分组字段'
                    });
                    return;
                }
                // 检查分组字段是否重复
                for (var i = 0, len = _this.optionData.length; i < len; i++) {
                    var index = _this.optionData.indexOf(_this.optionData[i]);
                    var lastindex = _this.optionData.lastIndexOf(_this.optionData[i]);
                    if (index != lastindex) {
                        // 说明该值在数组中有两个
                        _this.$message({
                            type: 'warning',
                            message: '请检查分组字段是否重复'
                        });
                        return;
                    }
                }
                // 检查汇总字段是否重复
                var tableDatalist = this.$refs.grouptable.data;
                var flagtd = tableDatalist.every(function (item) {
                    return item.summColumn == '' || item.summType == '' || item.summName == '';
                });
                if (flagtd) {
                    _this.$message({
                        type: 'warning',
                        message: '请至少添加一个汇总字段'
                    });
                    return;
                }
                for (var j = 0, lent = tableDatalist.length; j < lent; j++) {
                    for (var k = 0, len = tableDatalist.length; k < len; k++) {
                        if (k != j && tableDatalist[k].summName != '' && tableDatalist[k].summName == tableDatalist[j].summName) {
                            _this.$message({
                                type: 'warning',
                                message: '请检查汇总结果是否重复'
                            });
                            return;
                        }
                    }
                }
                _this.conditionAttrs = [];
                _this.results = [];
                _this.chartTargetOptions = [];
                _this.ychartTargetOptions = [];
                _this.qryarr = [];
                // 拼接参数
                for (var i = 0; i < _this.list.length; i++) {
                    _this.qryarr = [];
                    var info = {};
                    info.SS_COL_ITEM = _this.list[i].id;
                    info.SS_COL_OP = _this.dataSqlTemp[_this.list[i].index].signOp;
                    info.SS_COL_VALUE = _this.dataSqlTemp[_this.list[i].index].signVal;
                    info.SS_COL_GJOIN = _this.dataSqlTemp[_this.list[i].index].radio2;
                    info.SS_COL_JOIN = '';
                    info.SS_COL_GORDER = i;
                    info.SS_COL_ORDER = '0';
                    if (info.SS_COL_GJOIN == '并') {
                        info.SS_COL_GJOIN = 'and';
                    } else if (info.SS_COL_GJOIN == '或') {
                        info.SS_COL_GJOIN = 'or';
                    }
                    _this.qryarr.push(info);
                    var childinfo = {};
                    if (_this.list[i].children && _this.list[i].children.length > 0) {
                        for (var j = 0; j < _this.list[i].children.length; j++) {
                            childinfo.SS_COL_ITEM = _this.list[i].children[j].id;
                            childinfo.SS_COL_OP = _this.dataSqlTemp[_this.list[i].children[j].index].signOp;
                            childinfo.SS_COL_VALUE = _this.dataSqlTemp[_this.list[i].children[j].index].signVal;
                            childinfo.SS_COL_GJOIN = '';
                            childinfo.SS_COL_JOIN = _this.dataSqlTemp[_this.list[i].children[j].index].radio2;
                            childinfo.SS_COL_GORDER = i;
                            childinfo.SS_COL_ORDER = j + 1;
                            if (childinfo.SS_COL_JOIN == '并') {
                                childinfo.SS_COL_JOIN = 'and';
                            } else if (childinfo.SS_COL_JOIN == '或') {
                                childinfo.SS_COL_JOIN = 'or';
                            }
                        }
                        _this.qryarr.push(childinfo);
                    }
                    _this.conditionAttrs.push(_this.qryarr);
                }
                for (var i = 0; i < _this.conlist.length; i++) {
                    var resultinfo = {};
                    resultinfo.columnId = _this.conlist[i].id;
                    resultinfo.sortType = _this.dataTemp[_this.conlist[i].indexs].orderType;
                    resultinfo.columnTotle = '0';
                    _this.results.push(resultinfo);
                }
                // 请求参数
                var model = {};
                var groupParamsAry = [];
                var sumColumnsAry = [];
                var sumTypesAry = [];
                var sumNamesAry = [];
                _this.resultTableColumns = [];
                model.conditionAttrs = _this.conditionAttrs;
                model.results = _this.results;
                model.isexport = '1';
                _this.optionData.forEach(function (item) {
                    groupParamsAry.push(item.id);
                    // 生成表格表头信息
                    var obj = {};
                    obj.label = item.name;
                    obj.prop = item.ename;
                    _this.resultTableColumns.push(obj);
                });
                tableDatalist.forEach(function (item) {
                    sumColumnsAry.push(item.summColumn);
                    sumTypesAry.push(item.summType);
                    sumNamesAry.push(item.summName);
                });

                model.groupParams = groupParamsAry.join(',');
                var aryTmp = [];
                aryTmp.push({
                    sumColumns: sumColumnsAry.join(','),
                    sumTypes: sumTypesAry.join(','),
                    sumNames: sumNamesAry.join(',')
                });
                model.sumParams = aryTmp;
                // _this.$nextTick(function () {
                //   var params = { condition: JSON.stringify(model) };
                //   _this.$refs.qrygroup.remoteData(params);
                // });
                // 分组汇总查询
                yufp.service.request({
                    method: 'GET',
                    url: '/api/cimpfcifqdbcol/queryresult',
                    data: {
                        condition: JSON.stringify(model)
                    },
                    callback: function (code, message, response) {
                        if (code == 0 && response.code === 0) {
                            var columnName = {};
                            // 处理得到分组的列
                            for (var i = 0, len = _this.optionData.length; i < len; i++) {
                                for (var j = 0, lenR = _this.results.length; j < lenR; j++) {
                                    if (_this.optionData[i].id == _this.results[j].columnId) {
                                        columnName[_this.optionData[i].ename] = _this.optionData[i].ename + '_' + _this.results[j].columnTotle;
                                        break;
                                    }
                                }
                            }
                            // 处理得到汇总后的列
                            for (var i = 0, len = sumColumnsAry.length; i < len; i++) {
                                if (sumColumnsAry[i]) {
                                    // _this.columnOptions-> 列信息，即分组汇总字段可选的下拉选项
                                    for (var k = 0, lenop = _this.columnOptions.length; k < lenop; k++) {
                                        // 因sumColumnsAry中只存了id值，所以与所有列信息匹配，得到汇总表中的汇总字段中文信息
                                        if (sumColumnsAry[i] == _this.columnOptions[k].id) {
                                            for (var j = 0, lenR = _this.results.length; j < lenR; j++) {
                                                if (_this.columnOptions[k].id == _this.results[j].columnId) {
                                                    var cln = _this.columnOptions[k].ename + 'Sum' + sumTypesAry[i];
                                                    var obj = {};
                                                    columnName[cln] = _this.columnOptions[k].ename + '_' + _this.results[j].columnTotle + 'Sum' + sumTypesAry[i];
                                                    obj.label = sumNamesAry[i];
                                                    obj.prop = cln;
                                                    _this.resultTableColumns.push(obj);
                                                    // 给图表预览赋值
                                                    _this.chartTargetOptions.push({
                                                        key: columnName[cln],
                                                        value: sumNamesAry[i]
                                                    });
                                                    _this.ychartTargetOptions.push({
                                                        key: columnName[cln],
                                                        value: sumNamesAry[i]
                                                    });
                                                    break;
                                                }
                                            }
                                            break;
                                        }
                                    }
                                }
                            }
                            if (response.data && response.data.length > 0) {
                                var data = response.data;
                                var queryGroupData = [];
                                // 遍历分组汇总统计表格列信息
                                graphSql = data[0].sql;
                                for (var k = 0, lend = data.length; k < lend; k++) {
                                    var objquery = {};
                                    for (var j = 0, len = _this.resultTableColumns.length; j < len; j++) {
                                        var propn = _this.resultTableColumns[j].prop;
                                        if (propn) {
                                            objquery[propn] = data[k][columnName[propn]];
                                        }
                                    }
                                    queryGroupData.push(objquery);
                                }
                            }
                            _this.dialogFormVisible2 = true;
                            // 获得el-table-x中的表格数据
                            _this.$nextTick(function () {
                                _this.$refs.qrygroup.$refs.table.data = queryGroupData;
                                _this.$refs.chartTemp.resetFields(); // 重置form
                                _this.$refs.chartTagTemp.resetFields(); // 重置form
                                _this.$refs.ychartNameTemp.resetFields(); // 重置form
                                _this.showPrise = false;
                                _this.showRentPrise = false;
                            });
                        } else {
                            _this.$message.error('查询失败');
                        }
                    }
                });
            },
            /** 分组汇总重置 */
            resetGroupFn: function () {
                this.groupform.firstgroup = '';
                this.groupform.secondgroup = '';
                this.groupform.thirdgroup = '';
                this.groupform.fourgroup = '';
                this.groupform.fivegroup = '';
                var tableDatalist = this.$refs.grouptable.data;
                if (tableDatalist.length > 0) {
                    for (var i = 0; i < tableDatalist.length; i++) {
                        tableDatalist[i].summName = '';
                        tableDatalist[i].summColumn = '';
                        tableDatalist[i].summType = '';
                    }
                }
            },
            incustFn: function () {
                var _this = this;
                // 方式一: 直接点击“加入客户群”， 调保存接口insertEsExportQuery
                // 方式一: 选择客户之后，点击“加入客户群” 调保存接口insertEsExportQuery
                if (_this.$refs.qryresult.selections.length < 1) {
                    _this.exportListDataFn('incustFn')
                } else {
                    _this.selectCusts()
                }
            },
            selectCusts: function () {
                let _this = this;
                // 客群详情
                if (_this.isOnlyJoin) {
                    var params = {
                        custGroupId: _this.groupId,
                    };
                    _this.modifyRequest(params);
                    return;
                }
                // // 添加客群
                if (_this.isCreateGroup) {
                    // 创建客群
                    _this.addcustomersdialogVisible = true;
                } else if (_this.saveAsCustBtn) { // 灵活查询和客户查询
                    _this.selectDialogVisible = true
                }
                _this.$nextTick(function () {
                    if (_this.$refs.customersTemp) {
                        _this.$refs.customersTemp.resetFields();
                    }
                });
            },
            closeincustomers: function () {
                this.incustomersdialogVisible = false;
            },
            /**
             * 点击查询条件行的删除按钮执行
             */
            queryCondelTableRow: function (indexs, rows, item) {
                var _this = this;
                var deleteId = item.id;
                _this.list.splice(indexs, 1);
                delete _this.dataSqlTemp[deleteId];
                if (!(this.custGroupOperateFlag || this.markOperateFlag)) {
                    _this.$confirm('是否同步删除显示列字段?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                // 删除显示列（循环）
                                for (var i = 0, len = _this.conlist.length; i < len; i++) {
                                    var thisCon = _this.conlist[i];
                                    if (thisCon.id == deleteId) {
                                        _this.conlist.splice(i, 1);
                                        break;
                                    }
                                }
                                for (var key1 in _this.solutionlist) {
                                    if (_this.solutionlist[key1].id == deleteId) {
                                        _this.solutionlist.splice(key1, 1);
                                    }
                                }
                            } else {

                            }
                        }
                    });
                }
                // 删除显示列（input）
                for (var key in _this.dataTemp) {
                    if (_this.dataTemp[key].id == deleteId) {
                        delete _this.dataTemp[key];
                    }
                }
            },
            delTableRow: function (index, item) {
                var _this = this;
                var deleteId = _this.conlist[index].id;
                _this.conlist.splice(index, 1);
                // 删除显示列（input）
                for (var key in _this.dataTemp) {
                    if (key == deleteId) {
                        delete _this.dataTemp[key];
                    }
                }
                for (var key1 in _this.solutionlist) {
                    if (_this.solutionlist[key1].id == deleteId) {
                        _this.solutionlist.splice(key1, 1);
                    }
                }
            },
            saveincustomers: function () {
                this.$message({ message: '保存成功！' });
                this.incustomersdialogVisible = false;
            },
            // 设置为我的关注客户
            setatten: function () {
                var _this = this;
                if (_this.$refs.qryresult.selections.length < 1) {
                    _this.$message({ message: '请至少先选择一条记录', type: 'warning' });
                    return;
                }
                var selection = _this.$refs.qryresult.selections;
                var model = [];
                for (var i = 0; i < selection.length; i++) {
                    model.push(selection[i].custId);
                }
                yufp.service.request({
                    method: 'POST',
                    url: '/api/crmcustfoucsinfo/batchsetfoucscusts',
                    data: model.join(','),
                    callback: function (code, message, response) {
                        if (code == 0) {
                            if (response.code == 0) {
                                _this.$message('操作成功');
                            } else if (response.code === -1) {
                                _this.$message({
                                    showClose: true,
                                    message: response.message,
                                    type: 'warning'
                                });
                            } else {
                                _this.$message({
                                    showClose: true,
                                    message: response.message,
                                    type: 'error'
                                });
                            }
                        }
                    }
                });
            },
            // 设置标签取消按钮
            detailResetRule: function () {
                this.dialogTagForm = false;
                this.setselectList = [];
                this.settinglist = [];
                this.setlist = [];
                this.custtagList = [];
                this.tagTemp.definedTag = '';
            },
            // 关闭按钮
            dialogClose: function () {
                this.setselectList = [];
                this.settinglist = [];
                this.setlist = [];
                this.custtagList = [];
                this.tagTemp.definedTag = '';
            },
            /** 设置标签中添加查询标签 */
            addTabInfoFnofset: function (node) {
                var _set = this;
                if (node) {
                    var dataList = {};
                    dataList.name = node.groupName;
                    dataList.id = node.groupNo;
                    var flag = false; // 判断是否已经添加
                    for (var i = 0; i < _set.settinglist.length; i++) {
                        if (_set.settinglist[i].id == node.groupNo) {
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        var param = { condition: JSON.stringify({ groupNo: node.groupNo }) };
                        // 获取分组下的标签
                        yufp.service.request({
                            method: 'GET',
                            data: param,
                            url: backend.appYscrmCustMgtService + '/api/cimpfmmtagtagsinfo/getTagByGroupNo',
                            callback: function (code, message, response) {
                                if (code === 0) {
                                    var instu = response.data;
                                    var tags = [];
                                    for (var i = 0; i < instu.length; i++) {
                                        var info = {};
                                        info.name = instu[i].tagName;
                                        info.id = instu[i].tagNo;
                                        info.processMode = instu[i].processMode;
                                        info.tagLifecycle = instu[i].tagLifecycle;
                                        info.groupNo = instu[i].groupNo;
                                        info.state = true;
                                        tags.push(info);
                                    }
                                    dataList.stu = tags;
                                    if (tags.length > 0) { // 当有分组有标签的时候才添加到右侧
                                        _set.settinglist.push(dataList);
                                    }
                                }
                            }
                        });
                    }
                }
            },
            // 设置标签 点击标签增加到您已经选择区域
            addsetTabQuryFn: function (info, infoindex, index) {
                var me = this;
                // 判断如果加工方式是统计或者挖掘 那么属于自动标签 就不允许操作添加
                if (info.processMode == 'MINING' || info.processMode == 'STATISTICS') {
                    me.$message({ message: '不允许操作统计或者挖掘方式的标签！', type: 'warning' });
                    return false;
                }
                // 判断非执行中状态的标签不允许操作添加
                if (info.tagLifecycle != 'RUNNING') {
                    me.$message({ message: '不允许操作非执行中状态的标签！', type: 'warning' });
                    return false;
                }
                if (info.groupNo != '1705') {
                    // 判断是否为总行 总行不限制权限问题
                    var orgparam = {
                        condition: JSON.stringify({
                            id: yufp.session.org.id
                        })
                    };
                    yufp.service.request({
                        method: 'POST',
                        url: backend.appYscrmCustMgtService + '/api/cimpfmmtagtagsinfo/getorglevel',
                        data: orgparam,
                        callback: function (code, message, response) {
                            if (code == 0) {
                                var json = response.data;
                                me.orgLevel = json.orgLevel;
                                if (me.orgLevel > '2') { // 不是总行
                                    // 判断非自定义标签权限问题
                                    var model = new Object();
                                    model.instu = me.instuCode;
                                    model.org = me.orgId;
                                    model.user = me.userId;
                                    model.roles = new Array();
                                    for (var i = 0; i < me.roles.length; i++) {
                                        model.roles[i] = me.roles[i].code;
                                    }
                                    model.tagNo = info.id;
                                    var param = {
                                        condition: JSON.stringify(model)
                                    };
                                    yufp.service.request({
                                        method: 'GET',
                                        data: param,
                                        url: backend.appYscrmCustMgtService + '/api/cimpftagcusttags/getAuthData',
                                        callback: function (code, message, response) {
                                            if (code === 0) {
                                                if (response.data.length == 0) {
                                                    me.$message({ message: '没有权限不允许操作！', type: 'warning' });
                                                    return false;
                                                } else {
                                                    var flag = false; // 条件中是否已经存在
                                                    // 添加到已选择标签
                                                    for (var j = 0; j < me.setselectList.length; j++) {
                                                        if (me.setselectList[j].id == info.id) {
                                                            info.state = true;
                                                            me.setselectList.splice(j, 1);
                                                            me.setlist.splice(j, 1);
                                                            flag = true;
                                                            break;
                                                        }
                                                    }
                                                    if (!flag) {
                                                        info.state = false;
                                                        info.prototypeindex = index;
                                                        info.index = infoindex;
                                                        me.setselectList.push(info);
                                                        // 拼接标签tagno给此客户新增标签
                                                        me.setlist.push(info.id);
                                                    }
                                                }
                                            }
                                        }
                                    });
                                    // 判断权限问题
                                } else {
                                    var flag = false; // 条件中是否已经存在
                                    // 添加到已选择标签
                                    for (var j = 0; j < me.setselectList.length; j++) {
                                        if (me.setselectList[j].id == info.id) {
                                            info.state = true;
                                            me.setselectList.splice(j, 1);
                                            me.setlist.splice(j, 1);
                                            flag = true;
                                            break;
                                        }
                                    }
                                    if (!flag) {
                                        info.state = false;
                                        info.prototypeindex = index;
                                        info.index = infoindex;
                                        me.setselectList.push(info);
                                        // 拼接标签tagno给此客户新增标签
                                        me.setlist.push(info.id);
                                    }
                                }
                            }
                        }
                    });
                } else {
                    var flag = false; // 条件中是否已经存在
                    // 添加到已选择标签
                    for (var j = 0; j < me.setselectList.length; j++) {
                        if (me.setselectList[j].id == info.id) {
                            info.state = true;
                            me.setselectList.splice(j, 1);
                            me.setlist.splice(j, 1);
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        info.state = false;
                        info.prototypeindex = index;
                        info.index = infoindex;
                        me.setselectList.push(info);
                        // 拼接标签tagno给此客户新增标签
                        me.setlist.push(info.id);
                    }
                }
            },
            /** 设置标签删除选中的标签 */
            deleteSeTagFnofset: function (tag) {
                var me = this;
                // 判断如果加工方式是统计或者挖掘 那么属于自动标签 就不允许操作添加
                if (tag.processMode == 'MINING' || tag.processMode == 'STATISTICS') {
                    me.$message({ message: '不允许操作统计或者挖掘方式的标签！', type: 'warning' });
                    return false;
                }
                if (tag.groupNo != '1705') {
                    // 判断是否为总行
                    var orgparam = {
                        condition: JSON.stringify({
                            id: yufp.session.org.id
                        })
                    };
                    yufp.service.request({
                        method: 'POST',
                        url: backend.appYscrmCustMgtService + '/api/cimpfmmtagtagsinfo/getorglevel',
                        data: orgparam,
                        callback: function (code, message, response) {
                            if (code == 0) {
                                var json = response.data;

                                me.orgLevel = json.orgLevel;
                                if (me.orgLevel > '2') { // 不是总行
                                    // 判断非自定义标签权限问题
                                    var model = new Object();
                                    model.instu = me.instuCode;
                                    model.org = me.orgId;
                                    model.user = me.userId;
                                    model.roles = new Array();
                                    for (var i = 0; i < me.roles.length; i++) {
                                        model.roles[i] = me.roles[i].code;
                                    }
                                    model.tagNo = tag.id;
                                    var param = {
                                        condition: JSON.stringify(model)
                                    };
                                    yufp.service.request({
                                        method: 'GET',
                                        data: param,
                                        url: backend.appYscrmCustMgtService + '/api/cimpftagcusttags/getAuthData',
                                        callback: function (code, message, response) {
                                            if (code === 0) {
                                                if (response.data.length == 0) {
                                                    me.$message({ message: '没有权限不允许操作！', type: 'warning' });
                                                    return false;
                                                } else {
                                                    var f = 0;
                                                    for (var i = 0; i < me.setselectList.length; i++) {
                                                        if (me.setselectList[i].id == tag.id) {
                                                            f = i;
                                                            break;
                                                        }
                                                    }
                                                    for (var i = 0; i < me.setlist.length; i++) {
                                                        if (me.setlist[i].id == tag.id) {
                                                            f = i;
                                                            break;
                                                        }
                                                    }
                                                    me.setlist.splice(f, 1);
                                                    me.setselectList.splice(f, 1);
                                                    me.settinglist[tag.prototypeindex].stu[tag.index].state = true;
                                                }
                                            }
                                        }
                                    });
                                } else { // 是总行
                                    var f = 0;
                                    for (var i = 0; i < me.setselectList.length; i++) {
                                        if (me.setselectList[i].id == tag.id) {
                                            f = i;
                                            break;
                                        }
                                    }
                                    for (var i = 0; i < me.setlist.length; i++) {
                                        if (me.setlist[i].id == tag.id) {
                                            f = i;
                                            break;
                                        }
                                    }
                                    me.setlist.splice(f, 1);
                                    me.setselectList.splice(f, 1);
                                    me.settinglist[tag.prototypeindex].stu[tag.index].state = true;
                                }
                            }
                        }
                    });
                } else {
                    var f = 0;
                    for (var i = 0; i < me.setselectList.length; i++) {
                        if (me.setselectList[i].id == tag.id) {
                            f = i;
                            break;
                        }
                    }
                    for (var i = 0; i < me.setlist.length; i++) {
                        if (me.setlist[i].id == tag.id) {
                            f = i;
                            break;
                        }
                    }
                    me.setlist.splice(f, 1);
                    me.setselectList.splice(f, 1);
                    me.settinglist[tag.prototypeindex].stu[tag.index].state = true;
                }
            }
        },
        watch: {
            filterText: function (val) {
                this.$refs.flexytree.filter(val);
            }
        },
        computed: {
            actionUrl: function () {
                var me = this;
                return yufp.service.getUrl({ url: me.uploadAction });
            }
        },
    });
}(Vue, yufp.$, 'yufp-cust-flexy-query'));