// 数组 [{key1: val1}, {key2: val2}] => {key1: val1, key2: val2}
export function arrToObj(arr) {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Object) {
            if (obj[arr[i]['id']] === undefined) {
                obj[arr[i]['id']] = arr[i]['value'];
            }
        }
    }
    return obj;
}

// 判断是否是 null, '', undefined
export function isNull(val) {
    if(val === null || val === '' || val === undefined) {
        return true;
    }else {
        return false;
    }
}