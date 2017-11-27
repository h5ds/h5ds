/**
* 设置 
*/
window.setStorage = function(key, obj) {
    if (typeof obj === 'string') {
        localStorage.setItem(key, obj);
    } else {
        localStorage.setItem(key, JSON.stringify(obj));
    }
}

/**
* 获取
*/
window.getStorage = function(key) {
    let val = localStorage.getItem(key);
    try {
        return JSON.parse(val);
    } catch (e) {
        return val;
    }
}

/**
* 删除， 如果不传值，删除所有
*/
window.clearStorage = function(key) {
    if (key) {
        localStorage.removeItem(key);
    } else {
        localStorage.clear();
    }
}