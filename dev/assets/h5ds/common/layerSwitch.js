// 设置 layer
import Img, { ImgLayer, imgDom } from '../layers/img/index'; 
import Text, { TextLayer, textDom } from '../layers/text/index'; 

import { pushLayerData, getPageClass } from './AppDataFun';

/**
 * @desc 根据 layer 设置 对于的 phone 里面的 layer DOM
 * @param layer new Layer() 的对象
*/
export function getLayerDom(layer) {
    // console.log('获取图层', layer);
    var dom = '';
    switch(layer.type) {
        case 'img': dom = imgDom(layer); break;
        case 'text': dom = textDom(layer); break;
        default: break;
    }
    return dom;
}

// 添加 layer ，添加新的layer
export function addLayer(type) {
    console.log('添加图层', type);
    switch (type) {
        case 'img': addLayerBack(new ImgLayer()); break;
        case 'text': addLayerBack(new TextLayer()); break;
        default: break;
    }
}

/**
 * @author Mantou
 * @desc 判断不同的图层类型，去 new 不同的图层类， 选择图层后
 * @param {object} layer - 页面对象
 */
export function layerTypeSelect(layer) {
    console.log('选择图层->', layer);
    if(!layer) {
        return;
    }
    switch (layer.type) {
        case 'img': new Img(layer).init(); break;
        case 'text': new Text(layer).init(); break;
        default: break;
    }
}

//////////////////////////////////////////////////////////////////////////////
// 添加 layer 后，需要重新实例化一些 page方法
function addLayerBack(obj) {
    // 获取当前编辑的页面类
    let Page = getPageClass();
    if(!Page) {
        $.tip({
            msg: '请先新建页面', //
            type: 'danger', //success,danger,warning
            time: 3000 //
        });
        return;
    }
    pushLayerData(obj, Page);
    // 更新 list
    Page.initLayerList();
    // 更新 layer 的 dom
    Page.initPageDom();
    // 选择第一个layer
    // AppData.edit.layerIndex = null;
    Page.selectFirstLayer();

    // svg 预加载
    Page.lazySvg();
}