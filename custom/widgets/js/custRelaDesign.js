/**
 * yufp-flow-design 客户关系图计器组件
 * 注：自定义组件规范：
 * 对外提供editable(是否可编辑)、networkRelaId(流程id)
 * Created by chenlin on 2018/07/10.
 */
(function (vue, $, name) {
  vue.component(name, {
    template: '<div class="path_view">\
            <el-row :gutter="5">\
              <el-col :span="6" v-bind:class="{activeclose:activeClose}" >\
                <div class="path_viewleft" >\
                    <yu-xform  ref="relaForm" v-model="formdata"  :disabled="!editable">\
                      <yu-xform-group :column="1">\
                        <yu-xform-item placeholder="ID" name="networkRelaId" ctype="input"  v-show="false"></yu-xform-item>\
                        <yu-xform-item placeholder="关系图名称" name="networkRelaName" ctype="input"   :rules="rules" style="width:360px;margin-left: 5px;"></yu-xform-item>\
                        <yu-xform-item placeholder="备注" name="remark" ctype="textarea"   :rows="2" style="width:360px;margin-left: 5px;"></yu-xform-item>\
                      </yu-xform-group>\
                    </yu-xform>\
                    <div style="border-top: 1px solid #dddddd;margin: 10px 0;"></div>\
                    <yu-xform  ref="custSearchForm" v-model="queryFormdata" form-type="search" v-show="editable" class="hide-form-search-btn">\
                      <yu-xform-group :column="2">\
                      <yu-xform-item placeholder="客户类型" name="custType" ctype="select" data-code="CD0016" rules="required" @change="custTpChangeFn" style="margin-left: 5px;"></yu-xform-item>\
                        <yu-xform-item placeholder="客户名称" name="custName" ctype="input"></yu-xform-item>\
                      </yu-xform-group>\
                      <div class="button-group" align="center">\
                        <yu-button icon="search" type="primary" @click="searchFn">查询</yu-button>\
                        <yu-button icon="yx-loop2" type="primary" @click="resetMainFn">重置</yu-button>\
                      </div>\
                    </yu-xform>\
                    <yu-xtable ref="refTable" row-number :max-height="height" :data-url="url" :default-load="false"\
                       v-show="editable" class="expedit">\
                         <yu-xtable-column label="客户编号" prop="custId" width="110"></yu-xtable-column>\
                         <yu-xtable-column label="客户名称" prop="custName"></yu-xtable-column>\
                      </yu-xtable>\
                    <div >\
                </div>\
                </div>\
            </el-col>\
            <el-col :span="18">\
                <div class="path_viewright">\
                    <div style="font-size:0">\
                    <el-button-group  v-if="editable">\
                        <el-button :disabled="saveDisabled" type="text">保存</el-button>\
                        <el-tooltip class="item" effect="dark"  content="保存" placement="bottom">\
                        <el-button :disabled="saveDisabled" type="text" icon="yx-floppy-disk" @click="saveFlow"></el-button>\
                        </el-tooltip>\
                    </el-button-group>\
                    </div>\
                    <div class="jtk-demo-canvas canvas-wide statemachine-demo jtk-surface jtk-surface-nopan" id="canvas" @drop="drop($event)" \
                                   @dragover="allowDrop($event)">\
                    </div>\
                </div>\
              </el-col>\
            </el-row>\
            <el-dialog-x title="修改连接" :visible.sync="connectVisible" width="400px">\
                <yu-xform ref="refForm" label-width="120px" v-model="connectVal">\
                  <yu-xform-group :column="1">\
                    <yu-xform-item label="关联类型" name="relaType" ctype="select" data-code="RELA_NAME" rules="required"></yu-xform-item>\
                  </yu-xform-group>\
                  <div class="yu-grpButton">\
                  <yu-button icon="yx-undo2" type="primary" @click="cancelConnect">取消</yu-button>\
                    <yu-button icon="check" type="primary" @click="saveConnect">保存</yu-button>\
                  </div>\
                </yu-xform>\
            </el-dialog-x>\
            </el-dialog-x>\
    </div>',
    props: {
      // 是否可编辑
      editable: {
        type: Boolean,
        default: false
      },
      containerKey: {
        type: String,
        default: ''
      },
      // id
      formdata: {
        type: Object,
        default: {
          networkRelaId: '',
          networkRelaName: '',
          remark: ''
        }
      }
    },
    data: function () {
      return {
        thisvue: '',
        instanceObj: {}, // 节点双击出入表单的实例化对象
        flowNode: {
          // 报文体
          designBody: '',
          // 组件标题
          title: ''
        },
        url: backend.custpubService + '/api/governedcust/listper',
        queryFormdata: {},
        activeClose: false,
        isActive: false,
        saveDisabled: false,
        rules: [{ required: true, message: '字段不能为空' }, { max: 30, message: '长度不能超过30个字符', trigger: 'blur' }],
        connectVal: { relaType: '' }, // 连线label
        nodeVal: '', // 节点label
        instance: '', // jsPlumb的独立实例
        containerId: 'canvas', // 画布面板
        paintStyle: 'basic', // 连线类型
        labelClickFlag: false,
        connectVisible: false,
        nodeVisible: false,
        labelOverlay: '',
        nodeDocument: '',
        custName: '',
        height: '200px',
        conndata: [], // 连线信息
        nodedata: [], // 节点信息
        dragName: '',
        custId: '',
        dragClass: '',
        targetClass: '',
        classList: [],
        allAssemblyList: [],
        iconcolor: '', // 节点连线
        deleteable: false // 连线删除
      };
    },
    methods: {
      /**
        * 查询表单-客户类型切换后重置证件类型、价值等级
        */
      custTpChangeFn: function () {
        this.queryFormdata.custName = '';
      },
      /**
      * 客户查询——搜索按钮
      */
      searchFn: function () {
        var _this = this;
        yufp.service.request({
          method: 'GET',
          url: backend.custpubService + '/api/governedcust/getbusitype',
          async: false,
          data: {
            condition: JSON.stringify({ userId: yufp.session.userId })
          },
          callback: function (code, message, response) {
            if (code == 0 && response.code === 0) {
              if (response.data) {
                var validate = false;
                _this.$refs.custSearchForm.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }

                // 零售
                if (_this.queryFormdata.custType == '1') {
                  _this.url = '/api/governedcust/managecustper';
                } else if (_this.queryFormdata.custType == '2') {
                  _this.url = '/api/governedcust/managecustorg';
                }
                var model = {};
                yufp.clone(_this.queryFormdata, model);
                model.userId = yufp.session.userId;
                model.orgCode = yufp.session.org.code;
                model.orgId = _this.paramOrgId;
                // 条线
                model.busiType = response.data.busiType;
                // 授权机构
                model.orgIdAuth = response.data.orgIdAuth;
                var param = {
                  condition: JSON.stringify(model)
                };
                _this.$refs.refTable.remoteData(param);
              } else {
                _this.$message.error('查询失败');
              }
            }
          }
        });
      },
      /**
       * 客户查询——重置按钮
       */
      resetMainFn: function () {
        this.$refs.custSearchForm.resetFields();
      },
      cancelFn: function () {
        var _this = this;
        _this.custName = '';
      },
      queryFn: function () {
        var _this = this;
        _this.queryAllItemsInfo();
      },
      // 组件关闭
      closeFun: function () {
        var _this = this;
        if (!_this.activeClose) {
          _this.activeClose = true;
        } else {
          _this.activeClose = false;
        }
      },
      // 查询全部客户信息
      queryAllItemsInfo: function () {
        var me = this;
        yufp.service.request({
          method: 'GET',
          url: '/api/ocrmfcinetworkrela/custlist?custName=' + me.custName,
          callback: function (code, message, response) {
            if (code === 0 && response.code === 0) {
              me.allAssemblyList = response.data;
            }
          }
        });
      },
      // 清空客户信息组
      clearAllItemsInfo: function () {
        var me = this;
        // me.allAssemblyList = [];
        var queryFormdata = { custName: '', custType: '' };
        var param = {
          condition: JSON.stringify(queryFormdata)
        };
        me.$nextTick(function () {
          me.$refs.custSearchForm.resetFields();
          me.$refs.refTable.remoteData(param);
        });
      },
      // 允许落下
      allowDrop: function (ev) {
        ev.preventDefault();
      },
      // 开始拖拽
      drag: function (ev, assembly) {
        ev.dataTransfer.setData('Text', ev.target.id);
        // this.dragName = ev.target.innerText;
        this.dragName = assembly.custName;
        // this.targetClass = ev.target.className;
        // this.iconcolor = ev.target.getAttribute('iconcolor');
        // this.dragClass = ev.target.childNodes[0].className;
        // this.showForm = assembly.showForm;
        this.custId = assembly.custId;
      },
      // 拖拽结束
      drop: function (ev) {
        this.newNode(ev.offsetX, ev.offsetY, this.dragName, this.custId);
        /* ev.preventDefault();*/
      },
      // 保存连线
      saveConnect: function () {
        //  yufp.lookup.convertKey('RELA_NAME',this.connectVal.relaType);
        this.labelOverlay.setLabel(yufp.lookup.convertKey('RELA_NAME', this.connectVal.relaType));
        this.connectVisible = false;
      },
      // 取消连线
      cancelConnect: function () {
        this.connectVisible = false;
      },
      // 初始化流程
      initFlow: function () {
        var thisvue = this;
        if (thisvue.formdata.networkRelaId != '') {
          var flowUrl = backend.adminService + '/api/ocrmfcinetworkrela/detail?netId=' + thisvue.formdata.networkRelaId;
          yufp.service.request({
            method: 'GET',
            url: flowUrl,
            callback: function (code, message, response) {
              thisvue.nodedata = response.data.nodes;
              thisvue.conndata = response.data.conns;
              thisvue.paintingFlowFn();
            }
          });
        } else {
          // 清空画布
          thisvue.instance.empty(thisvue.containerId);
        }
      },
      // 绘制流程
      paintingFlowFn: function () {
        let thisvue = this;
        // 清空画布
        thisvue.instance.empty(thisvue.containerId);
        // 新增节点及连线
        thisvue.instance.batch(function () {
          for (var i = 0, lengthInfo = thisvue.nodedata.length; i < lengthInfo; i++) {
            var node = thisvue.nodedata[i];
            thisvue.newNodeFn(node);
          }
          for (var i = 0, lengthInfo = thisvue.conndata.length; i < lengthInfo; i++) {
            var opconn = thisvue.conndata[i];
            var label = '';
            if (opconn.relaName != null) {
              label = yufp.lookup.convertKey('RELA_NAME', opconn.relaName);
            }
            thisvue.instance.connect({
              source: opconn.custIdMain,
              target: opconn.custIdFrom,
              type: thisvue.paintStyle
            }).getOverlay('label').setLabel(label);
          }
        });
      },
      // 获取连线名称
      getOverlayTextFn: function (info) {
        var sid = info.connection.sourceId, tid = info.connection.targetId;
        var olabelText = '';
        for (var i = 0, len = this.conndata.length; i < len; i++) {
          var opConnObj = this.conndata[i];
          if (sid == opConnObj.sourceId && tid == opConnObj.targetId) {
            olabelText = opConnObj.overlayLabel ? null : '';
            break;
          }
        }
        return olabelText;
      },
      // 新增节点（反显查询新增）
      newNodeFn: function (node) {
        var thisvue = this;
        var d = document.createElement('div');
        var id = node.relaMemberId ? node.relaMemberId : jsPlumbUtil.uuid().replace(/-/g, '');
        d.className = 'iconcolor3 kh_item1 w jtk-draggable jtk-droppable';// node.tagetClass + ' w ' + node.iconcolor;
        d.id = id;
        d.custId = node.custId;
        // d.showForm = node.show;
        d.innerHTML = this.editable ? '<div class=\'newitemstyle\'><i class=\'iconfont icon-kehu\'></i>' + '<p class=\'dragnodename\'>' + node.custName + '</p>' + '</div><span class=\'iconfont\'></span>' : '<div class=\'newitemstyle\'><i class=\'iconfont icon-kehu\'></i>' + '<p class=\'dragnodename\'>' + node.custName + '</p>' + '</div><span class=\'iconfont\'></span>';

        d.style.left = node.offsetX + 'px';
        d.style.top = node.offsetY + 'px';
        var deleteitem = document.createElement('i');
        // var changeitem = document.createElement('b');
        var jiedian = document.createElement('c');
        deleteitem.className = 'el-icon-yx-bin deleteitem';
        // changeitem.className = 'el-icon-yx-pencil changeitem';
        jiedian.className = 'iconfont icon-tuozhuai jiedian';
        deleteitem.onclick = function () {
          thisvue.removeNodeFn(id);
        };
        // d.appendChild(changeitem);
        d.appendChild(deleteitem);
        d.appendChild(jiedian);
        this.instance.getContainer().appendChild(d);
        this.initNode(d);
        var nodeIffo = document.getElementById(id);
        nodeIffo.onmouseover = function () {
          // 显示删除叉
          if (thisvue.editable) {
            this.children[2].style.display = 'block';
            this.children[3].style.display = 'block';
            // this.children[4].style.display = 'block';
          }
        };
        nodeIffo.onmouseout = function () {
          // 隐藏删除叉
          if (thisvue.editable) {
            this.children[2].style.display = 'none';
            this.children[3].style.display = 'none';
            // this.children[4].style.display = 'none';
          }
        };
        return d;
      },
      // 初始化节点
      initNode: function (el) {
        if (this.editable) {
          this.instance.draggable(el, { grid: [10, 10] });// 设置可拖拽及拖拽像素
        }
        var _this = this;
        this.instance.makeSource(el, {
          // 设置连接的源实体，就是这一头
          filter: '.jiedian',
          anchor: ['Top', 'Left', 'Right', 'Bottom'],
          connectorStyle: {
            stroke: '#ddd',
            strokeWidth: 3,
            outlineStroke: 'transparent',
            outlineWidth: 4
          },
          connectionType: 'basic',
          extract: {
            'action': 'the-action'
          },
          maxConnections: 5,
          onMaxConnections: function (info, e) {
            _this.$message({ message: 'Maximum connections (' + info.maxConnections + ') reached' });
          }
        });
        this.instance.makeTarget(el, {
          // 设置连接的目标，就是那一头
          dropOptions: {
            hoverClass: 'dragHover'
          },
          anchor: ['Top', 'Left', 'Right', 'Bottom'],
          allowLoopback: true
        });
      },
      endChange2Zero: function (number) { // 数字转整十
        if (number < 10) {
          return 10;
        } else {
          var num = number.toString();
          num = num.substring(0, num.length - 1);
          return parseInt(num + '0');
        }
      },
      // 新增节点
      newNode: function (x, y, nodeName, custId) {
        var thisvue = this;
        var allNodes = jsPlumb.getSelector('.jtk-demo-canvas .w');
        for (var i = 0, len = allNodes.length; i < len; i++) {
          var n = allNodes[i];
          if (custId == n.custId) {
            thisvue.$message({ message: '节点已经存在，不能重复添加', type: 'warning' });
            return;
          }
        }
        x = this.endChange2Zero(x);
        y = this.endChange2Zero(y);
        var d = document.createElement('div');
        var id = jsPlumbUtil.uuid().replace(/-/g, ''); // 去掉uuid中的-
        d.className = 'iconcolor3 kh_item1 w iconcolor3';
        d.id = id;
        d.custId = custId;
        d.innerHTML = '<div class=\'newitemstyle\'><i class=\'iconfont icon-kehu\'></i>' + '<p class=\'dragnodename\'>' + nodeName + '</p >' + '</div><span class=\'iconfont\'></span>';
        d.style.left = (x - 22) + 'px';
        d.style.top = (y - 50) + 'px';
        var deleteitem = document.createElement('i');
        var jiedian = document.createElement('c');
        deleteitem.className = 'el-icon-yx-bin deleteitem';

        jiedian.className = 'iconfont icon-tuozhuai jiedian';
        deleteitem.onclick = function () {
          thisvue.removeNodeFn(id);
        };
        d.appendChild(deleteitem);
        d.appendChild(jiedian);
        this.instance.getContainer().appendChild(d);
        this.initNode(d);
        var node = document.getElementById(id);
        node.onmouseover = function () {
          // 显示删除叉
          this.children[2].style.display = 'block';
          this.children[3].style.display = 'block';
          // this.children[4].style.display = 'block';
        };
        node.onmouseout = function () {
          // 隐藏删除叉
          this.children[2].style.display = 'none';
          this.children[3].style.display = 'none';
          // this.children[4].style.display = 'none';
        };
        return d;
      },
      // 保存流程
      saveFlow: function () {
        var thisvue = this;
        var len, c, connObj, nodeObj;
        thisvue.conndata = [];
        thisvue.nodedata = [];
        let validate = true;
        thisvue.$refs.relaForm.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          thisvue.$message({ message: '关系图名称不能为空', type: 'warning' });
          return;
        }
        var allConns = thisvue.instance.getAllConnections();
        for (var i = 0, len = allConns.length; i < len; i++) {
          c = allConns[i];
          connObj = {
            custIdMain: c.sourceId,
            custIdFrom: c.targetId,
            relaName: yufp.lookup.convertValue('RELA_NAME', c.getOverlay('label').getLabel())
          };
          thisvue.conndata.push(connObj);
        }
        var allNodes = jsPlumb.getSelector('.jtk-demo-canvas .w');
        for (var i = 0, len = allNodes.length; i < len; i++) {
          var n = allNodes[i];
          nodeObj = {
            custId: n.custId,
            relaMemberId: n.id,
            custName: n.children[0].children[1].innerText, // 节点名n.innerText,
            offsetX: n.offsetLeft,
            offsetY: n.offsetTop
          };
          thisvue.nodedata.push(nodeObj);
        }
        var url = '';
        if (this.$refs.relaForm.formdata.networkRelaId == null || this.$refs.relaForm.formdata.networkRelaId == '') {
          url = backend.adminService + '/api/ocrmfcinetworkrela/add';
        } else {
          url = backend.adminService + '/api/ocrmfcinetworkrela/upd';
        }
        // delete thisvue.formdata.containerKey;
        yufp.service.request({
          method: 'POST',
          url: url,
          data: {
            nodeData: JSON.stringify(thisvue.nodedata),
            formdata: JSON.stringify(this.$refs.relaForm.formdata),
            connData: JSON.stringify(thisvue.conndata)
          },
          callback: function (code, message, response) {
            thisvue.$message({ message: '操作保存成功', type: 'success' });
            thisvue.saveDisabled = true;
          }
        });
      },
      // 删除节点
      removeNodeFn: function (nodeId) {
        var _this = this;
        if (this.editable) {
          this.$confirm('确定要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(function () {
            _this.instance.remove(nodeId);
          }).catch(function () {
            return;
          });
        }
      }
    },
    mounted: function () {
      var thisvue = this;
      // 实例化jsPlumb的独立实例
      thisvue.instance = jsPlumb.getInstance({
        Endpoint: ['Dot', {
          radius: 2
        }],
        // 这个是控制连线终端那个小点的半径
        Connector: 'Bezier', // Bezier（贝塞尔曲线），Straight（直线），Flowchart（流程图），StateMachine（状态机）
        HoverPaintStyle: {
          stroke: '#1e8151',
          strokeWidth: 3
        },
        // 这个是鼠标放在连线上显示的效果宽度
        ConnectionOverlays: [['Arrow', {
          location: 1,
          id: 'arrow',
          width: 8,
          length: 8,
          foldback: 0.8// 这些都是控制箭头的形状
        }], ['Label', {
          label: 'FOO',
          id: 'label',
          cssClass: '',
          events: {
            click: function (labelOverlay, originalEvent) { // 修改连线label
              if (originalEvent.target.className == 'el-icon-yx-pencil') {
                thisvue.labelClickFlag = true;
                var lText = labelOverlay.getLabel();
                if (thisvue.editable) {
                  thisvue.connectVisible = true;
                  thisvue.connectVal.relaType = yufp.lookup.convertValue('RELA_NAME', lText);
                  thisvue.labelOverlay = labelOverlay;
                  thisvue.$nextTick(function () {
                    thisvue.$refs.refForm.resetFields();
                    thisvue.$refs.refForm.formdata.relaType = yufp.lookup.convertValue('RELA_NAME', lText);
                  });
                }
              } else if (originalEvent.target.className == 'el-icon-yx-bin') {
                if (thisvue.labelClickFlag) {
                  thisvue.labelClickFlag = false;
                  return;
                }
                if (thisvue.editable) {
                  thisvue.deleteable = true;
                }
              };
            }
          }
        }]// 这个是鼠标拉出来的线的属性
        ],
        Container: 'canvas'
      });
      // 注册连接类型
      thisvue.instance.registerConnectionType('basic', {
        anchor: ['Top', 'Left', 'Right', 'Bottom'],
        connector: ['Bezier', {
          stub: [5, 5],
          gap: 10,
          cornerRadius: 5,
          alwaysRespectStubs: true
        }]
      });
      // 画布
      document.getElementById('canvas');
      // 获取所有的实体
      jsPlumb.getSelector('.statemachine-demo .w');
      // 删除连线
      thisvue.instance.bind('click', function (c) { // c.setLabel
        // console.log(c);
        if (thisvue.labelClickFlag) {
          thisvue.labelClickFlag = false;
          return;
        }
        if (thisvue.editable) {
          if (thisvue.deleteable) {
            thisvue.$confirm('确定要删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(function () {
              thisvue.instance.deleteConnection(c);
            }).catch(function () {
              return;
            });
          }
        }
      });
      // 设置连线名称
      thisvue.instance.bind('connection', function (info) {
        var otext = thisvue.getOverlayTextFn(info);
        if (otext == '') {
          info.connection.getOverlay('label').setLabel('');
        } else {
          info.connection.getOverlay('label').setLabel(otext);
        }
      });
      // 初始化组件信息
      this.clearAllItemsInfo();
      this.initFlow();
      setTimeout(function () {
        var tree = document.querySelectorAll('.expedit table>tbody')[0];
        Sortable.create(tree, {
          group: { name: 'refTable', pull: 'clone' },
          sort: false,
          setData: function (dataTransfer, dragEl) { // 设置拖拽传递的参数
            dataTransfer.setData('Text', dragEl.textContent);
          },
          onStart: function (evt) {
            var trval = evt.item.innerText.split('\n');
            thisvue.dragName = trval[2];
            thisvue.custId = trval[1];
          }
        });
      }, 500);
    },
    watch: {
      // 流程id变化时触发
      formdata: function (val) {
        this.Relaformdata = val;
        this.$refs.relaForm.formdata.networkRelaId = val.networkRelaId;
        this.$refs.relaForm.formdata.networkRelaName = val.networkRelaName;
        this.$refs.relaForm.formdata.remark = val.remark;
        this.clearAllItemsInfo();
        this.initFlow();
        this.saveDisabled = false;
      },
      containerKey: function (val) {
        this.clearAllItemsInfo();
        this.initFlow();
      }
    }
  });
}(Vue, yufp.$, 'yufp-cust-rela'));
