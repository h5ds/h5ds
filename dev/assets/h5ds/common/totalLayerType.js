/**
 * @desc 统计app 的layer 种类
*/
export function totalLayerType(app) {
    let { pages } = app;
    let keys = {};
    pages.forEach((page) => {
        page.layers.forEach( (layer) => {
            if(!keys[layer.type]) {
                keys[layer.type] = 1;
            }else {
                keys[layer.type]++;
            }
        }); 
    });
    console.log(keys);
    return keys;
}