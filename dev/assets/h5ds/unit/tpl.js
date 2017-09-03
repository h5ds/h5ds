//自定义模版引擎
$.tpl = function (tpl, data, fixed) {
    var tpl2 = tpl;
    for (var key in data) {
        var reg = new RegExp("{{" + key + "}}", "gm");
        tpl2 = tpl2.replace(reg, data[key]);
    }

    return tpl2;
}