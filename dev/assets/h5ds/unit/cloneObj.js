/**
 * clone 对象
*/
export function cloneObj(obj){
    let newObj = null;
    if(obj && (typeof obj === 'object')) {
        newObj = JSON.parse(JSON.stringify(obj));
    }
    return newObj;
}