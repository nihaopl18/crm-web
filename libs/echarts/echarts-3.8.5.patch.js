(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('echarts')) :
    typeof define === 'function' && define.amd ? define(['exports', 'echarts'], factory) :
    (factory(global.echarts));
}(this, (function(exports) {
  'use strict';

  function circularMoreLayout$1(seriesModel) {
    var clone$1 = exports.vector.clone;
    var coordSys = seriesModel.coordinateSystem;
    if(coordSys && coordSys.type !== 'view') {
      return;
    }
    var unitAngle_1 = 0;
    var unitAngle_2 = 0;
    var angle_1 = 0; //修改此可以改变位置默认起始位置
    var angle_2 = 0;
    var level_1 = 0; //第二圈圆个数
    var level_2 = 0; //第三圈圆个数
    var visualData_1 = new Array; //内圈虚拟数据;
    var visualData_2 = new Array;
    var remain = new Array; //余下没有被暂用的点
    var rect = coordSys.getBoundingRect();

    var nodeData = seriesModel.getData();
    var orginData = nodeData._rawData._array;

    var graph = nodeData.graph;

    var cx = rect.width / 2 + rect.x;
    var cy = rect.height / 2 + rect.y;

    var r = Math.min(rect.width, rect.height) / 2;
    var _indices = nodeData.indices;
    //获取圆的层级关系；
    for(var i = 0; i < orginData.length; i++) {
      var id = orginData[i].id;
      var _f = _indices.contains(id); //是否包含在当前选择元素中
      if(orginData[i].r == 1 && _f) {
        level_1++;
        visualData_1.push(orginData[i]);
      } else if(orginData[i].r == 2 && _f) {
        level_2++;
        visualData_2.push(orginData[i]);
      }
    }
    //获取没有子节点的一级节点
    graph.eachNode(function(node) {
      var id = node.id;
      var t_level = node.hostGraph.data._rawData.getItem(id).r; //获取层级
      if(t_level == 1) {
        if(node.outEdges <= 0) {
          level_2++;
        }
      }
    })
    unitAngle_1 = Math.PI * 2 / level_1;
    unitAngle_2 = Math.PI * 2 / level_2;
    var thatCategory = -1;
    graph.eachNode(function(node) {
      var changed = false;
      var id = node.id;
      var t_level = node.hostGraph.data._rawData.getItem(id).r; //获取层级
      var thisCategory = node.hostGraph.data._rawData.getItem(id).category;
      if(thisCategory != thatCategory) {
        changed = true;
        thatCategory = thisCategory;
      }
      if(t_level == 0) {
        node.setLayout([
          cx,
          cy
        ]);
      } else if(t_level == 1 && node.outEdges > 0) {
        //内圈
        angle_1 += unitAngle_1;
        node.setLayout([
          r * Math.cos(angle_1) / 3 + cx,
          r * Math.sin(angle_1) / 3 + cy
        ]);
      } else if(t_level == 2 || node.outEdges <= 0) {
        angle_2 += unitAngle_2;
        node.setLayout([
          r * Math.cos(angle_2) + cx,
          r * Math.sin(angle_2) + cy
        ]);
      }

    });
    nodeData.setLayout({
      cx: cx,
      cy: cy
    });
    for(var i = 0; i < visualData_1.length; i++) {
      var cal = new Array; //当前点外圈点的个数
      var category = visualData_1[i].category;
      for(var j = 0; j < visualData_2.length; j++) {
        var mapCategory = visualData_2[j].category;
        if(category == mapCategory) {
          cal.push(visualData_2[j].id);
        }
      }

      if(cal.length > 0) {
        var outIndex = Math.max.apply(null, cal) + Math.min.apply(null, cal);
        outIndex /= 2;
        outIndex = Math.floor(outIndex); //外圈的位置
        var insideIndex = visualData_1[i].id; //要设置点的索引
        var outPoint = graph.nodes[outIndex].getLayout();
        if(cal.length % 2 == 1) {
          graph.nodes[insideIndex].setLayout([
            (outPoint[0] - cx) * 0.7 + cx,
            (outPoint[1] - cy) * 0.7 + cy,
          ]);
        } else {
          var thisAngle = (outPoint[0] - cx) / r;
          thisAngle = Math.acos(thisAngle);

          var _x = outPoint[0] - cx;
          var _y = outPoint[1] - cy;
          var zy = 1; //默认是右边
          var sx = -1; //默认是下边
          if(_x < 0) {
            zy = -1;
          }
          if(_y < 0) {
            sx = 1;
            if(thisAngle < Math.PI) {
              thisAngle = 2 * Math.PI - thisAngle;
            }
          } else {
            if(thisAngle > Math.PI) {
              thisAngle = thisAngle - Math.PI;
            }
          }
          thisAngle = thisAngle + unitAngle_2 / 2;
          if(!thisAngle) {
            thisAngle = 1.57;
          }
          graph.nodes[insideIndex].setLayout([
            r * Math.cos(thisAngle) / 3 + cx,
            r * Math.sin(thisAngle) / 3 + cy
          ]);
        }
      }

    }
    graph.eachEdge(function(edge) {
      var curveness = edge.getModel().get('lineStyle.normal.curveness') || 0;
      var p1 = clone$1(edge.node1.getLayout());
      var p2 = clone$1(edge.node2.getLayout());
      var cp1;
      var x12 = (p1[0] + p2[0]) / 2;
      var y12 = (p1[1] + p2[1]) / 2;
      if(+curveness) {
        curveness *= 3;
        cp1 = [
          cx * curveness + x12 * (1 - curveness),
          cy * curveness + y12 * (1 - curveness)
        ];
      }
      edge.setLayout([p1, p2, cp1]);
    });
  }

  function circularMoreLayout(ecModel) {
    ecModel.eachSeriesByType('graph', function(seriesModel) {
      if(seriesModel.get('layout') === 'circularMore') {
        circularMoreLayout$1(seriesModel);
      }
    });
  };
  exports.registerLayout(circularMoreLayout);
})));