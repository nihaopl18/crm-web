/**
 * [cron表达式demo]
 * @param  {[type]} require  [description]
 * @param  {[type]} exports) {}          [description]
 * @return {[type]}          [description]
 */
define([
    './custom/widgets/js/yufpCronEditor.js'
], function(require, exports) {
    exports.ready = function(hashCode, data, cite) {
        var vm = yufp.custom.vue({
            el: "#cronEditorDemo",
            data: function() {
                return {
                    fields: [{
                        columnCount: 1,
                        fields: [{
                            label: "cron表达式",
                            field: "cron",
                            type: 'custom',
                            is: "yufp-cron-editor",
                        }]
                    }],
                    buttons: [],
                    groupFields: [{
                        columnCount: 8,
                        labelWidth: "40px",
                        fields: [{
                            label: "秒",
                            field: "second",
                            type: "input",
                            size: "mini"
                        }, {
                            label: "分钟",
                            field: "minute",
                            type: "input",
                            size: "mini"
                        }, {
                            label: "小时",
                            field: "hour",
                            type: "input",
                            size: "mini"
                        }, {
                            label: "日",
                            field: "day",
                            type: "input",
                            size: "mini"
                        }, {
                            label: "月",
                            field: "month",
                            type: "input",
                            size: "mini"
                        }, {
                            label: "星期",
                            field: "week",
                            type: "input",
                            size: "mini"
                        }, {
                            label: "年",
                            field: "year",
                            type: "input",
                            size: "mini"
                        }]
                    }, {
                        columnCount: 1,
                        labelWidth: "80px",
                        fields: [{
                            label: "Cron表达式",
                            field: "crons",
                            type: "input",
                            size: "mini"
                        }, {
                            label: "最近五次",
                            field: "counts",
                            type: "textarea",
                            rows: "5"
                        }]
                    }],
                    form: {
                        second: "",
                        minute: "",
                        hour: "",
                        day: "",
                        month: "",
                        week: "",
                        year: "",
                        crons: "",
                        counts: ""
                    }
                };
            }
        });
    };
});