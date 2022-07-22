/**
 * @Created by 马妍 mayan2@yusys.com.cn on 2019-1-22 09:34:22.
 * @updated by
 * @description 家庭信息
 */
define(function (require, exports) {
  /**
    * 页面加载完成时触发
    * @param hashCode 路由ID
    * @param data 传递数据对象
    * @param cite 页面站点信息
    */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;

    yufp.lookup.reg('CD0011,CD0238,CD0256');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          saveBtn: !yufp.session.checkViewCtrl('save', data.id),
          expandCollapseName: ['base'],
          elecform: {
            chnCd: [],
            chnOth: ''

          },
          investform: {
            invCd: [],
            invOth: ''
          },
          brandform: {
            consBrandCd: [],
            consOth: ''
          },
          finaserform: {
            finAdviCd: [],
            finOth: ''
          },
          finaconform: {
            contCd: [],
            contOth: ''
          },
          activityform: {
            saloCd: [],
            saloOth: ''
          },
          preferform: {
            hobbCd: [],
            hobbOth: ''
          },

          contimeform: {
            contTimeCd: []

          },

          investperform: {
            invTermCd: []

          },

          otherinfoform: {
            faithCd: '',
            taboo: '',
            specNeed: '',
            remarks: ''
          },

          banktypeform: {
            finBusiCd: [],
            finBusiOth: ''
          },

          ardertypeform: {
            arderCd: [],
            arderOth: ''
          },

          mediaform: {
            mediaCd: [],
            mediaOth: ''
          },

          actitypeform: {
            sportCd: [],
            sportOth: ''
          },

          magatypeform: {
            magazCd: [],
            magazOth: ''
          },

          tvtyepform: {
            tvshowCd: [],
            tvshowOth: ''
          },

          petsform: {
            petCd: [],
            petOth: ''
          },

          colltypeform: {
            collCd: [],
            collOth: ''
          },

          conhabitform: {
            consCd: []

          },

          conchanform: {
            consChnCd: []

          },
          rule: {
            chnOth: [
              {max: 1, message: '最大长度不超过1个字符', trigger: 'blur' }

            ]


          }


        };
      },
      mounted: function () {
        // 反显页面数据
        this.initPageData();
      },
      methods: {
        /**
         * 表单初始化数据
         */
        initPageData: function () {
          var _this = this;
          yufp.service.request({ // 查询业务数据
            method: 'GET',
            url: backend.custpersonService + '/api/acrmfciperpreferinfo/queryperprelist/' + custId,
            callback: function (code, message, response) {
              if (code == 0) { // code等于0 说明成功
                _this.elecform.chnOth = response.data[0].chnOth;
                if (!(response.data[0].chnCd == undefined)) {
                  _this.elecform.chnCd = response.data[0].chnCd.split(',');
                }
                _this.investform.invOth = response.data[0].invOth;
                if (!(response.data[0].invCd == undefined)) {
                  _this.investform.invCd = response.data[0].invCd.split(',');
                }

                _this.brandform.consOth = response.data[0].consOth;
                if (!(response.data[0].consBrandCd == undefined)) {
                  _this.brandform.consBrandCd = response.data[0].consBrandCd.split(',');
                }

                _this.finaserform.finOth = response.data[0].finOth;
                if (!(response.data[0].finAdviCd == undefined)) {
                  _this.finaserform.finAdviCd = response.data[0].finAdviCd.split(',');
                }

                _this.finaconform.contOth = response.data[0].contOth;
                if (!(response.data[0].contCd == undefined)) {
                  _this.finaconform.contCd = response.data[0].contCd.split(',');
                }

                _this.activityform.saloOth = response.data[0].saloOth;
                if (!(response.data[0].saloCd == undefined)) {
                  _this.activityform.saloCd = response.data[0].saloCd.split(',');
                }

                _this.preferform.hobbOth = response.data[0].hobbOth;
                if (!(response.data[0].hobbCd == undefined)) {
                  _this.preferform.hobbCd = response.data[0].hobbCd.split(',');
                }
                if (!(response.data[0].contTimeCd == undefined)) {
                  _this.contimeform.contTimeCd = response.data[0].contTimeCd.split(',');
                }
                if (!(response.data[0].invTermCd == undefined)) {
                  _this.investperform.invTermCd = response.data[0].invTermCd.split(',');
                }


                _this.otherinfoform.faithCd = response.data[0].faithCd;
                _this.otherinfoform.taboo = response.data[0].taboo;
                _this.otherinfoform.specNeed = response.data[0].specNeed;
                _this.otherinfoform.remarks = response.data[0].remarks;
                _this.banktypeform.finBusiOth = response.data[0].finBusiOth;
                if (!(response.data[0].finBusiCd == undefined)) {
                  _this.banktypeform.finBusiCd = response.data[0].finBusiCd.split(',');
                }

                _this.ardertypeform.arderOth = response.data[0].arderOth;
                if (!(response.data[0].arderCd == undefined)) {
                  _this.ardertypeform.arderCd = response.data[0].arderCd.split(',');
                }

                _this.mediaform.mediaOth = response.data[0].mediaOth;
                if (!(response.data[0].mediaCd == undefined)) {
                  _this.mediaform.mediaCd = response.data[0].mediaCd.split(',');
                }

                _this.actitypeform.sportOth = response.data[0].sportOth;
                if (!(response.data[0].sportCd == undefined)) {
                  _this.actitypeform.sportCd = response.data[0].sportCd.split(',');
                }

                _this.magatypeform.magazOth = response.data[0].magazOth;
                if (!(response.data[0].magazCd == undefined)) {
                  _this.magatypeform.magazCd = response.data[0].magazCd.split(',');
                }

                _this.tvtyepform.tvshowOth = response.data[0].tvshowOth;
                if (!(response.data[0].tvshowCd == undefined)) {
                  _this.tvtyepform.tvshowCd = response.data[0].tvshowCd.split(',');
                }

                _this.petsform.petOth = response.data[0].petOth;
                if (!(response.data[0].petCd == undefined)) {
                  _this.petsform.petCd = response.data[0].petCd.split(',');
                }

                _this.colltypeform.collOth = response.data[0].collOth;
                if (!(response.data[0].collCd == undefined)) {
                  _this.colltypeform.collCd = response.data[0].collCd.split(',');
                }
                if (!(response.data[0].consCd == undefined)) {
                  _this.conhabitform.consCd = response.data[0].consCd.split(',');
                }
                if (!(response.data[0].consChnCd == undefined)) {
                  _this.conchanform.consChnCd = response.data[0].consChnCd.split(',');
                }
              }
            } });
        },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          var validate = false;
          _this.$refs.elecform.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custpersonService + '/api/acrmfciperpreferinfo/updateperpre',
            data: {'chnCd': _this.elecform.chnCd,
              'chnOth': _this.elecform.chnOth,
              'invCd': _this.investform.invCd,
              'invOth': _this.investform.invOth,
              'consBrandCd': _this.brandform.consBrandCd,
              'consOth': _this.brandform.consOth,
              'finAdviCd': _this.finaserform.finAdviCd,
              'finOth': _this.finaserform.finOth,
              'contCd': _this.finaconform.contCd,
              'contOth': _this.finaconform.contOth,
              'saloCd': _this.activityform.saloCd,
              'saloOth': _this.activityform.saloOth,
              'hobbCd': _this.preferform.hobbCd,
              'hobbOth': _this.preferform.hobbOth,
              'contTimeCd': _this.contimeform.contTimeCd,
              'invTermCd': _this.investperform.invTermCd,
              'faithCd': _this.otherinfoform.faithCd,
              'taboo': _this.otherinfoform.taboo,
              'specNeed': _this.otherinfoform.specNeed,
              'remarks': _this.otherinfoform.remarks,
              'finBusiCd': _this.banktypeform.finBusiCd,
              'finBusiOth': _this.banktypeform.finBusiOth,
              'arderCd': _this.ardertypeform.arderCd,
              'arderOth': _this.ardertypeform.arderOth,
              'mediaCd': _this.mediaform.mediaCd,
              'mediaOth': _this.mediaform.mediaOth,
              'sportCd': _this.actitypeform.sportCd,
              'sportOth': _this.actitypeform.sportOth,
              'magazCd': _this.magatypeform.magazCd,
              'magazOth': _this.magatypeform.magazOth,
              'tvshowCd': _this.tvtyepform.tvshowCd,
              'tvshowOth': _this.tvtyepform.tvshowOth,
              'petCd': _this.petsform.petCd,
              'petOth': _this.petsform.petOth,
              'collCd': _this.colltypeform.collCd,
              'collOth': _this.colltypeform.collOth,
              'consCd': _this.conhabitform.consCd,
              'consChnCd': _this.conchanform.consChnCd,
              'custId': custId


            },
            callback: function (code, message, response) {
              _this.$message('操作成功');
            }
          });
        }

      }
    });
  };
});