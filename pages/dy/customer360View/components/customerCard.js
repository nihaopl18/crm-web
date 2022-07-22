/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-09 09:36:44
 * @update by:
 * @description: 客户信息
 */

(function(vue, name) {
  vue.component(name, {
      template: '  <div class="customer-info">\
  <div class="info-card">\
    <el-avatar v-if="perInfo.sex === \'M\'" :size="126" src="../../../../themes/common/images/man-head.jfif"></el-avatar>\
    <el-avatar v-else-if="perInfo.sex === \'F\'" :size="126" src="../../../../themes/common/images/woman-head.jfif"></el-avatar>\
    <el-avatar v-else :size="126" src="../../../../themes/common/images/avatar-126.png"></el-avatar>\
    <div class="card-left">\
      <div class="card-left-top">\
        <div class="card-left-info">\
          <div class="first">\
            <span class="name">{{ perInfo.custName || \'-\' }}</span>\
            <!--<div class="scord-box">\
              <div>\
                <span>综合价值评分</span>\
                <el-tooltip class="tooltip" :hide-after="0" effect="light" placement="bottom-start">\
                  <div slot="content">\
                    <p class="title">客户已经创造的价值与未来可能创造的价值总分，通过多维评分模型统计客户直接价值、间接价值、潜在价值</p>\
                  </div>\
                  <i class="el-icon-warning-outline"></i>\
                </el-tooltip>\
              </div>\
              <span class="count">{{ perInfo.valueScore || \'-\' }}</span>\
              <p class="compare">\
                <i :class="className"></i>\
                <span>{{ perInfo.valueScore1 || \'-\' }}</span>\
              </p>\
            </div>-->\
            <div class="identity-box" v-if="perInfo.finaningMgrUserName">\
              <img src="../../../../themes/common/images/avatar-126.png" alt="">\
              <span :title="perInfo.finaningMgrUserName">理财客户经理：{{ perInfo.finaningMgrUserName || \'-\' }}</span>\
            </div>\
            <div class="identity-box" v-if="perInfo.loanMgrUserName" style="background-image: linear-gradient(177deg, #ff5d60 0%, #ff5d60 100%);">\
              <img src="../../../../themes/common/images/avatar-126.png" alt="">\
              <span :title="perInfo.loanMgrUserName">个贷客户经理：{{ perInfo.loanMgrUserName || \'-\' }}</span>\
            </div>\
          </div>\
          <div class="second">\
            <span>\
              <i :class="perInfo.sex === \'M\' ? \'el-icon-male\' : \'el-icon-female\'"></i>{{ perInfo.sex ? perInfo.sex === \'M\' ? \'男\' : \'女\' : \'未知\' }}</span>\
            <span>\
              <i class="el-icon-date"></i>年龄：{{ perInfo.age || \'-\' }}</span>\
            <!--<span>\
              <i class="el-icon-data-line"></i>年收入：{{ perInfo.incomeY || \'-\' }}万</span> -->\
            <span>\
              <i class="el-icon-suitcase"></i>行业：{{ perInfo.indOwnUnit || \'-\' }}</span>\
            <span>\
              <i class="el-icon_time"></i>最近登录手机银行时间：{{perInfo.newLoginDate || \'-\'}}</span>\
          </div>\
        </div>\
        <div class="card-left-btns">\
          <!--<yu-button icon="el-icon-s-comment" circle></yu-button>-->\
          <el-popover\
            ref="popover"\
            popper-class="tag-childPrpover"\
            placement="bottom"\
            trigger="click"\
            width="200"\>\
            <div>\
              <p><em>手机号：</em>{{perInfo.phoneNo}}</p>\
              <p><em>座机号：</em>{{perInfo.telPhoneNo}}</p>\
            </div>\
            <yu-button slot="reference" icon="el-icon-phone" circle></yu-button>\
          </el-popover>\
          <!--<yu-button icon="el-icon-message" circle></yu-button>-->\
          <yu-button icon="el-icon-search" type="danger" @click="transSearch">交易查询</yu-button>\
        </div>\
      </div>\
      <div class="card-left-bottom">\
        <div v-if="labelArr.length"><yu-tag :type="getRandomType()" v-for="label in labelArr.slice(0,8)" :key="label.tagName">{{ label.tagName }}</yu-tag>\</div>\
        <yu-button size="mini" class="el-icon-more" @click="seeMoreTag"></yu-button>\
      </div>\
    </div>\
    </div>\
    <yu-xdialog title="客户标签" width="800px" :visible.sync="tagVisible" :before-close="handleClose">\
      <div style="height: 500px">\
        <p class="noData" v-if="!tags.length">暂无数据</p>\
        <div v-else class="tag-container" v-for="tag in tags" :key="tag.groupName">\
          <p class="tag-head">\
            <span>{{ tag.groupName }}</span>\
          </p>\
          <div class="tag-body">\
            <p v-for="tagItem in tag.custSysTagList" :key="tagItem.tagName" >{{ tagItem.tagName }}</p>\
          </div>\
        </div>\
        </div>\
    </yu-xdialog>\
</div>',
      props: {
          perInfo: Object,
          perLabelInfo: Array,
          custId: String
      },
      computed: {
          labelArr: function() {
              let tempLabel = [];
              for (let i = 0; i < this.perLabelInfo.length; i++) {
                  if (this.perLabelInfo[i].systemTag == '1') {
                      tempLabel.push(this.perLabelInfo[i]);
                  }
              }
              return tempLabel;
          },
          className: function() {
              if (this.perInfo.valueScore1) {
                  return yufp.util.returnUpOrDownClass(this.perInfo.valueScore1.replace('%', ''));
              }
          }
      },
      data: function() {
          return {
              circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
              types: ['primary', 'success', 'info', 'warning', 'danger', '', 'gray'],
              tagVisible: false,
              tags: []
          };
      },
      methods: {
          getRandomType: function() {
              let index = Math.floor(Math.random() * (this.types.length - 0)) + 0;
              return this.types[index];
          },
          transSearch: function() {
              var _this = this;
              // 跳转到交易明细
              yufp.frame.addTab({
                  id: 'transInfo', // 菜单功能ID（路由ID）
                  key: 'custom_transInfo' + _this.custId, // 自定义唯一页签key,请统一使用custom_前缀开头
                  title: '交易明细:' + _this.perInfo.custName? _this.perInfo.custName: _this.custId , // 页签名称
                  data: {
                      custId: _this.custId
                  }
              });
          },
          seeMoreTag: function() {
              var _this = this;
              var param = {
                  condition: JSON.stringify({
                      custId: this.custId
                  })
              };
              yufp.service.request({
                  method: 'GET',
                  url: '/api/cimfmmtagcusttag/custsystag',
                  data: param,
                  callback: function(code, message, response) {
                      if (code === 0) {
                          _this.tagVisible = true;
                          _this.tags = response.data;
                      }
                  }
              });
          },
          handleClose: function() {
              this.tagVisible = false;
          }
      }
  });
}(Vue, 'customer-card'));