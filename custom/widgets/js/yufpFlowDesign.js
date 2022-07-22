/**
 * yufp-flow-design 流程设计器组件
 * 注：自定义组件规范：
 * 对外提供editable(是否可编辑)、flowId(流程id)、panelType(视图类型)属性
 * Created by chenlin on 2018/07/10.
 */
 (function (vue, $, name) {
  vue.component(name, {
    template: '<div class="path_view">\
      <yufp-node-cmp ref="ncmpRef" :instanceObj="instanceObj" :title="flowNode.title" :design-body="flowNode.designBody"></yufp-node-cmp>\
            <el-row :gutter="20">\
              <el-col :span="4" v-bind:class="{activeclose:activeClose}" >\
                <div class="path_viewleft" v-if="editable">\
                    <div class="pathitem" @click="closeFun">组件/节点 <i class="iconfont icon-jiandefuben"></i></div>\
                    <el-collapse v-model="activeNames" accordion @change="handleChange">\
                        <div v-for="(obj,index) in classList" >\
                            <el-collapse-item :name="obj.classId">\
                                <template slot="title">\
                                    <i :class="obj.classIcon"></i>{{obj.className}}\
                                </template>\
                                <div v-for="assembly in assemblyList">\
                                <div :class="[obj.classColor,obj.classStyle]" :iconcolor="obj.classColor" :id="assembly.assemblyId" draggable="true" \
                                    @dragstart="drag($event,assembly)"><i :class="assembly.assemblyStyle"></i>\
                                    <p>{{assembly.assemblyName}}</p>\
                                </div>\
                                </div>\
                            </el-collapse-item>\
                        </div>\
                    </el-collapse>\
                    <div >\
                </div>\
                </div>\
            </el-col>\
            <el-col :span="20">\
                <div class="path_viewright">\
                    <div style="font-size:0">\
                    <el-button-group v-if="editable">\
                        <el-button type="text">工具</el-button>\
                        <el-tooltip class="item" effect="dark" content="保存" placement="bottom">\
                        <el-button type="text" icon="yx-floppy-disk" @click="saveFlow"></el-button>\
                        </el-tooltip>\
                        <el-tooltip class="item" effect="dark" content="删除" placement="bottom">\
                        <el-button type="text" icon="yx-bin" @click="deleteFlow"></el-button>\
                        </el-tooltip>\
                    </el-button-group>\
                    </div>\
                    <div class="jtk-demo-canvas canvas-wide statemachine-demo jtk-surface jtk-surface-nopan" :id="\'canvas\'+ tempKey" @drop="drop($event)" \
                                   @dragover="allowDrop($event)">\
                    </div>\
                </div>\
              </el-col>\
            </el-row>\
            <el-dialog-x title="修改连接" :visible.sync="connectVisible" width="400px">\
                <el-input v-model="connectVal" placeholder="请输入内容"></el-input>\
                <div slot="footer" class="dialog-footer">\
                    <el-button type="primary" icon="yx-checkmark" @click="saveConnect">保存</el-button>\
                    <el-button type="primary" icon="yx-spinner11" @click="cancelConnect">取消</el-button>\
                </div>\
            </el-dialog-x>\
            <el-dialog-x title="修改节点" :visible.sync="nodeVisible" width="400px">\
                <el-input v-model="nodeVal" placeholder="请输入内容"></el-input>\
                <div slot="footer" class="dialog-footer">\
                    <el-button type="primary" icon="yx-checkmark" @click="saveNode">保存</el-button>\
                    <el-button type="primary" icon="yx-spinner11" @click="cancelNode">取消</el-button>\
                </div>\
            </el-dialog-x>\
    </div>',
    props: {
      // 是否可编辑
      editable: {
        type: Boolean,
        default: false
      },
      // 流程id
      flowId: {
        type: String,
        default: ''
      },
      // 标识
      tempKey: {
        type: String,
        default: ''
      },
      // 面板类型
      panelType: {
        type: String,
        default: ''
      },
    },
    data: function () {
      return {
        iscur: 1, // 波段
        activeNames: '', // 折叠面板
        thisvue: '',
        instanceObj: {}, // 节点双击出入表单的实例化对象
        flowNode: {
          // 报文体
          designBody: '',
          // 组件标题
          title: ''
        },
        activeClose: false,
        isActive: false,
        connectVal: '', // 连线label
        nodeVal: '', // 节点label
        instance: '', // jsPlumb的独立实例
        containerId: 'canvas' + this.tempKey, // 画布面板
        paintStyle: 'basic', // 连线类型
        labelClickFlag: false,
        connectVisible: false,
        nodeVisible: false,
        labelOverlay: '',
        nodeDocument: '',
        conndata: [], // 连线信息
        nodedata: [], // 节点信息
        dragName: '',
        assemblyId: '',
        dragClass: '',
        targetClass: '',
        classList: [],
        assemblyList: [], // 组件
        allAssemblyList: [], // 全部组件信息
        iconcolor: '', // 节点连线
        deleteable: false // 连线删除
      };
    },
    methods: {
      // 组件关闭
      closeFun: function () {
        var _this = this;
        if (!_this.activeClose) {
          _this.activeClose = true;
        } else {
          _this.activeClose = false;
        }
      },
      // 查询全部组件信息
      queryAllItemsInfo: function () {
        var me = this;
        yufp.service.request({
          method: 'GET',
          url: '/api/asseibly/getalliteminfoscene?flowId=' + me.flowId,
          callback: function (code, message, response) {
            if (code === 0 && response.code === 0) {
              me.allAssemblyList = response.data;
            }
          }
        });
      },
      // 查询分类信息
      queryClassifyInfo: function () {
        var me = this;
        yufp.service.request({
          method: 'GET',
          url: '/api/asseibly/getclassifyinfo',
          callback: function (code, message, response) {
            if (code === 0 && response.code === 0) {
              var instu = response.data;
              // me.classList=[];
              var classInfo = [];
              for (var i = 0; i < instu.length; i++) {
                var option = {};
                option.classId = instu[i].classId;
                option.classStyle = instu[i].classStyle;
                option.classIcon = instu[i].classIcon;
                option.className = instu[i].className;
                option.classColor = instu[i].classColor;
                classInfo.push(option);
              }
              me.classList = classInfo;
            }
          }
        });
      },
      // 加载分类下的组件
      handleChange: function (activeNames) {
        var me = this;
        var instu = me.allAssemblyList;
        var assminfo = [];
        for (var i = 0; i < instu.length; i++) {
          if (instu[i].classId == activeNames) {
            var option = {};
            option.classId = instu[i].classId;
            option.assemblyName = instu[i].assemblyName;
            option.assemblyAnaMethod = instu[i].assemblyAnaMethod;
            option.showForm = instu[i].showForm;
            option.assemblyId = instu[i].assemblyId;
            option.assemblyType = instu[i].assemblyType;
            option.assemblyStyle = instu[i].assemblyStyle;
            option.dataType = instu[i].dataType;
            assminfo.push(option);
          }
        }
        me.assemblyList = assminfo;
      },
      // 允许落下
      allowDrop: function (ev) {
        ev.preventDefault();
      },
      // 开始拖拽
      drag: function (ev, assembly) {
        ev.dataTransfer.setData('Text', ev.target.id);
        this.dragName = ev.target.innerText;
        this.targetClass = ev.target.className;
        this.iconcolor = ev.target.getAttribute('iconcolor');
        this.dragClass = ev.target.childNodes[0].className;
        this.showForm = assembly.showForm;
        this.assemblyId = assembly.assemblyId;
      },
      // 拖拽结束
      drop: function (ev) {
        this.newNode(ev.offsetX, ev.offsetY, this.dragName, this.targetClass, this.dragClass, this.iconcolor, this.showForm);
        /* ev.preventDefault();*/
      },
      // 保存连线
      saveConnect: function () {
        this.labelOverlay.setLabel(this.connectVal);
        this.connectVisible = false;
      },
      // 取消连线
      cancelConnect: function () {
        this.connectVisible = false;
      },
      // 保存节点
      saveNode: function () {
        var thisvue = this;
        thisvue.nodeDocument.innerHTML = '<div class=\'newitemstyle\'><i class=\'' + thisvue.nodeDocument.children[0].children[0].className + '\'></i>' + '<p class=\'dragnodename\'>' + this.nodeVal + '</p>' + '<div class=\'labelclass\'><&nbsp' + '标注：' + this.nodeVal + '&nbsp></div></div><span class=\'' + thisvue.nodeDocument.children[1].className + '\'></span>';
        var deleteitem = document.createElement('i');
        var changeitem = document.createElement('b');
        var jiedian = document.createElement('c');
        deleteitem.className = 'el-icon-yx-bin deleteitem';
        changeitem.className = 'el-icon-yx-pencil changeitem';
        jiedian.className = 'iconfont icon-tuozhuai jiedian';
        deleteitem.onclick = function () {
          thisvue.removeNodeFn(thisvue.nodeDocument.id);
        };
        changeitem.onclick = function () {
          thisvue.nodeVisible = true;
          thisvue.nodeVal = this.parentElement.children[0].children[1].innerText;// this.parentElement.innerText;
          thisvue.nodeDocument = this.parentElement;
        };
        thisvue.nodeDocument.appendChild(changeitem);
        thisvue.nodeDocument.appendChild(deleteitem);
        thisvue.nodeDocument.appendChild(jiedian);
        this.nodeVisible = false;
      },
      // 取消节点
      cancelNode: function () {
        this.nodeVisible = false;
      },
      // 初始化流程
      initFlow: function () {
        var thisvue = this;
        if (thisvue.flowId != '' && thisvue.panelType != 'ADD') {
          var flowUrl = backend.adminService + '/api/cimpcmnode/getflow';
          yufp.service.request({
            method: 'GET',
            url: flowUrl,
            data: {
              tempId: thisvue.flowId
            },
            callback: function (code, message, response) {
              if(response.nodes && response.nodes.length > 0){
                thisvue.nodedata = response.nodes;
                thisvue.conndata = response.conns;
                thisvue.paintingFlowFn(thisvue);
              }else{
              thisvue.assemblyId = '1';
              thisvue.newNode('100', '100', '开始', 'iconcolor1 lc_item', 'iconfont icon-kaishi', 'iconcolor1', undefined);
              
              thisvue.assemblyId = '2';
              thisvue.newNode('100', '200', '结束', 'iconcolor1 lc_item', 'iconfont icon-shenpi', 'iconcolor1', undefined);
              thisvue.saveFlow();
              }
              
            }
          });
        } else {
          // 清空画布
          thisvue.instance.empty(thisvue.containerId);
        }
      },
      // 绘制流程
      paintingFlowFn: function (thisvue) {
        // 清空画布
        thisvue.instance.empty(thisvue.containerId);
        // 新增节点及连线
        thisvue.instance.batch(function () {
          for (var i = 0, len = thisvue.nodedata.length; i < len; i++) {
            var node = thisvue.nodedata[i];
            thisvue.newNodeFn(node);
          }
          for (var i = 0, len = thisvue.conndata.length; i < len; i++) {
            var opconn = thisvue.conndata[i];
            thisvue.instance.connect({
              source: opconn.sourceId,
              target: opconn.targetId,
              type: thisvue.paintStyle
            });
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
        var id = node.nodeId ? node.nodeId : jsPlumbUtil.uuid().replace(/-/g, '');
        d.className = node.classColor + ' ' + node.classStyle + '1 w ';// node.tagetClass + ' w ' + node.iconcolor;
        d.id = id;
        d.assemblyId = node.assemblyId;
        d.showForm = node.show;
        d.innerHTML = this.editable ? '<div class=\'newitemstyle\'><i class=\'' + node.assemblyStyle + '\'></i>' + '<p class=\'dragnodename\'>' + node.nodeName + '</p>' + '<div class=\'labelclass\'><&nbsp' + '标注：' + node.nodeOverview + '&nbsp></div></div><span class=\'' + node.nodeState + '\'></span>' : '<div class=\'newitemstyle\'><i class=\'' + node.assemblyStyle + '\'></i>' + '<p class=\'dragnodename\'>' + node.nodeName + '</p>' + '<div class=\'labelclass\'><&nbsp' + '标注：' + node.nodeOverview + '&nbsp></div></div><span class=\'' + node.nodeState + '\'></span>';

        d.style.left = node.offsetX + 'px';
        d.style.top = node.offsetY + 'px';
        var deleteitem = document.createElement('i');
        var changeitem = document.createElement('b');
        var jiedian = document.createElement('c');
        deleteitem.className = 'el-icon-yx-bin deleteitem';
        changeitem.className = 'el-icon-yx-pencil changeitem';
        jiedian.className = 'iconfont icon-tuozhuai jiedian';
        deleteitem.onclick = function () {
          thisvue.removeNodeFn(id);
        };
        changeitem.onclick = function () {
          thisvue.nodeVisible = true;
          thisvue.nodeVal = this.parentElement.children[0].children[1].innerText;// this.parentElement.innerText;
          thisvue.nodeDocument = this.parentElement;
        };
        d.appendChild(changeitem);
        d.appendChild(deleteitem);
        d.appendChild(jiedian);
        this.instance.getContainer().appendChild(d);
        this.initNode(d);
        var node = document.getElementById(id);
        node.ondblclick = function () {
          if (thisvue.editable) {
            if (this.showForm) {
              var instanceObj = {};
              instanceObj.nodeId = id;
              instanceObj.nodeName = node.nodeName;
              instanceObj.assemblyId = node.assemblyId;
              instanceObj.flowId = thisvue.flowId;
              thisvue.instanceObj = instanceObj;
              thisvue.flowNode.designBody = this.showForm;
              thisvue.flowNode.title = this.children[0].children[1].innerText;// this.innerText;
              thisvue.$refs.ncmpRef.show();
            }
          }
        };
        node.onmouseover = function () {
          // 显示删除叉
          if (thisvue.editable) {
            
            if(this.children[0].parentNode.assemblyId == '1' || this.children[0].parentNode.assemblyId == '2'){
            }else{
              this.children[2].style.display = 'block';
              this.children[3].style.display = 'block';
            }
            
            this.children[4].style.display = 'block';
          }
        };
        node.onmouseout = function () {
          // 隐藏删除叉
          if (thisvue.editable) {
            this.children[2].style.display = 'none';
            this.children[3].style.display = 'none';
            this.children[4].style.display = 'none';
          }
        };
        return d;
      },
      // 初始化节点
      initNode: function (el) {
        if (this.editable) {
          this.instance.draggable(el, { grid: [10, 10] });// 设置可拖拽及拖拽像素
        }
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
            alert('Maximum connections (' + info.maxConnections + ') reached');
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
      newNode: function (x, y, nodeName, tagetClass, dragClass, iconcolor, showForm) {
        var thisvue = this;
        x = this.endChange2Zero(x);
        y = this.endChange2Zero(y);
        var d = document.createElement('div');
        var id = jsPlumbUtil.uuid().replace(/-/g, ''); // 去掉uuid中的-
        d.className = tagetClass + '1 w ' + iconcolor;
        d.id = id;
        d.assemblyId = this.assemblyId;
        d.innerHTML = '<div class=\'newitemstyle\'><i class=\'' + dragClass + '\'></i>' + '<p class=\'dragnodename\'>' + nodeName + '</p >' + '<div class=\'labelclass\'><&nbsp' + '标注：' + nodeName + '&nbsp></div></div><span class=\'iconfont\'></span>';
        d.style.left = (x - 22) + 'px';
        d.style.top = (y - 50) + 'px';
        var deleteitem = document.createElement('i');
        var changeitem = document.createElement('b');
        var jiedian = document.createElement('c');
        deleteitem.className = 'el-icon-yx-bin deleteitem';
        changeitem.className = 'el-icon-yx-pencil changeitem';
        jiedian.className = 'iconfont icon-tuozhuai jiedian';
        deleteitem.onclick = function () {
          thisvue.removeNodeFn(id);
        };
        changeitem.onclick = function () {
          thisvue.nodeVisible = true;
          thisvue.nodeVal = this.parentElement.children[0].children[1].innerText;// this.parentElement.innerText;
          thisvue.nodeDocument = this.parentElement;
        };
        d.appendChild(changeitem);
        d.appendChild(deleteitem);
        d.appendChild(jiedian);
        this.instance.getContainer().appendChild(d);
        this.initNode(d);
        console.log(id)
        var node = document.getElementById(id);
        console.log(node)
        node.ondblclick = function () {
          if (showForm) {
            var instanceObj = {};
            instanceObj.nodeId = id;
            instanceObj.nodeName = nodeName;
            instanceObj.assemblyId = thisvue.assemblyId;
            instanceObj.flowId = thisvue.flowId;
            thisvue.instanceObj = instanceObj;
            thisvue.flowNode.designBody = showForm;
            thisvue.flowNode.title = nodeName;
            thisvue.$refs.ncmpRef.show();
          }
        };
        node.onmouseover = function () {
          // 显示删除叉
          if(this.children[0].parentNode.assemblyId == '1' || this.children[0].parentNode.assemblyId == '2'){
          }else{
            this.children[2].style.display = 'block';
            this.children[3].style.display = 'block';
          }
          this.children[4].style.display = 'block';
        };
        node.onmouseout = function () {
          // 隐藏删除叉
          this.children[2].style.display = 'none';
          this.children[3].style.display = 'none';
          this.children[4].style.display = 'none';
        };
        return d;
      },
      // 保存流程
      saveFlow: function () {
        var thisvue = this;
        var len, c, connObj, n, nodeObj;
        this.nodedata = [];
        this.conndata = [];
        var allConns = this.instance.getAllConnections();
        for (i = 0, len = allConns.length; i < len; i++) {
          c = allConns[i];
          connObj = {
            tempId: thisvue.flowId,
            sourceId: c.sourceId,
            targetId: c.targetId,
            overlayLabel: c.getOverlay('label').getLabel()
          };
          this.conndata.push(connObj);
        }
        var allNodes = jsPlumb.getSelector('.jtk-demo-canvas .w');
        for (var i = 0, len = allNodes.length; i < len; i++) {
          n = allNodes[i];
          nodeObj = {
            tempId: thisvue.flowId,
            assemblyId: n.assemblyId,
            nodeId: n.id,
            nodeName: n.children[0].children[1].innerText, // 节点名n.innerText,
            offsetX: n.offsetLeft,
            offsetY: n.offsetTop,
            isSource: '1',
            isTarget: '1',
            maxConnections: -1,
            allowLoopBack: '0',
            nodeOverview: n.children[0].children[1].innerText, // 标注默认为节点名
            nodeState: n.children[1].className // 节点状态
          };
          this.nodedata.push(nodeObj);
        }
        yufp.service.request({
          method: 'POST',
          url: backend.adminService + '/api/cimpcmnode/saveflow/',
          data: {
            nodeData: JSON.stringify(this.nodedata),
            connData: JSON.stringify(this.conndata)
          },
          callback: function (code, message, response) {
            thisvue.$message({ message: '操作保存成功', type: 'success' });
          }
        });
      },
      // 删除流程
      deleteFlow: function () {
        var thisvue = this;
        thisvue.$confirm('此操作将删除该流程信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(function () {
          yufp.service.request({
            method: 'POST',
            url: backend.adminService + '/api/cimpcmnode/delflow/',
            data: thisvue.flowId,
            callback: function (code, message, response) {
              thisvue.instance.empty(thisvue.containerId);
              thisvue.$message({ message: '删除流程成功', type: 'success' });
            }
          });
        }).catch(function () {
          return;
        });
      },
      // 删除节点
      removeNodeFn: function (nodeId) {
        var thisvue = this;
        if (this.editable) {
          if (confirm('确定要删除吗?')) {
            yufp.service.request({
              method: 'POST',
              url: backend.adminService + '/api/cimpcmnode/delnode/',
              data: nodeId,
              callback: function (code, message, response) {
                thisvue.instance.remove(nodeId);
              }
            });
            // 通过事件方式，子组件向父组件传递参数
            this.$emit('delete-node-fn', nodeId);
          }
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
        Connector: 'Flowchart', // Bezier（贝塞尔曲线），Straight（直线），Flowchart（流程图），StateMachine（状态机）
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
                  thisvue.connectVal = lText;
                  thisvue.labelOverlay = labelOverlay;
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
        Container: 'canvas' + this.tempKey
      });
      // 注册连接类型
      thisvue.instance.registerConnectionType('basic', {
        anchor: ['Top', 'Left', 'Right', 'Bottom'],
        connector: ['Flowchart', {
          stub: [5, 5],
          gap: 10,
          cornerRadius: 5,
          alwaysRespectStubs: true
        }]
      });
      // 画布
      document.getElementById('canvas' + this.tempKey);
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
            if (confirm('确定要删除吗?')) {
              thisvue.instance.deleteConnection(c);
            }
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
      // 查询分类信息
      this.queryClassifyInfo();
      // 初始化组件信息
      this.queryAllItemsInfo();
      this.initFlow();
    },
    watch: {
      // 流程id变化时触发
      flowId: function (val) {
        this.initFlow();
      },
      // 面板类型变化时触发
      panelType: function (val) {
        this.initFlow();
      }
    }
  });
}(Vue, yufp.$, 'yufp-flow-design'));
