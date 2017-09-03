
$.getUrlData = function(name) {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    let data = null;
    if(r!=null){
        data = unescape(r[2]);
    }
    return data;
}