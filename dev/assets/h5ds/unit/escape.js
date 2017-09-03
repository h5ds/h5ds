$.escape = function(obj) {
    let str = '';
    try {
        str = escape(JSON.stringify(obj));
    } catch(e) {
        str = false;
    }
    return str;
}