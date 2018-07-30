/**
 * @desc 保留n位小数
*/
export function toFixed(val, num) {
    val = parseFloat(val);
    if (val) {
        val = parseFloat(val.toFixed(num || 1));
    } else {
        val = 0;
    }
    return val;
}

/**
 * @desc 交换数组位置
*/
export function exChangeArr(arr, obj) {
    if (obj instanceof Object) {
        let i = obj.to, j = obj.from;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    } else {
        console.error('exChangeArr 参数错误！');
    }
}