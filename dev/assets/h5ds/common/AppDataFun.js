import { setStorage, getStorage } from '../localSave/localStorage.js';

// 添加新的页面
// obj.index 插入位置， obj.page 插入页面， obj.pageName 页面名字
export function addNewPageData(obj) {
    if(typeof obj !== 'object') {
        return;
    }
    let index = obj['index'] || (AppData.data.pages.length + 1);

    // slider 继承上一次
    let page = obj.page || {
        name: '空白页面',
        style: {},
        layers: [],
        slider: {  // AppData.data.pages[index - 1].slider
            animate: 1,
            autoplay: false,
            lock: false,
            time: 5
        }
    };
    AppData.data.pages.splice(index, 0, page);
    AppDataChange();
}

// 复制页面
export function copyPageData(index) {
    let page = JSON.parse(JSON.stringify(AppData.data.pages[index - 1]));
    AppData.data.pages.splice(index, 0, page);
    AppDataChange();
}

// 插入layer
export function pushLayerData(obj, Page) {
    var layers = getDataLayers(); // 数组

    // 如果 layers 没有
    if(!layers) {
        $.tip({
            msg: '请先新建页面', //
            type: 'danger', //success,danger,warning
            time: 3000 //
        });
        return;
    }

    // 在前面插入
    layers.splice(0, 0, obj);
    // console.log(layers, AppData.edit.pageIndex)
    // 重置layers
    Page.page.layers = layers;
    AppDataChange();
}

// 设置 page 类
export function setPageClass(self) {
    AppData.edit.pageClass = self;
}

// 获取当前编辑的页面的 类
export function getPageClass() {
    return AppData.edit.pageClass;
}

// 设置 layer 类
export function setLayerClass(self) {
    AppData.edit.layerClass = self;
}

export function getLayerClass() {
    return AppData.edit.layerClass;
}

//获取 当前页面的 layers
export function getDataLayers() {
    let page = AppData.data.pages[AppData.edit.pageIndex] || [];
    return page.layers
}

//获取 当前页面的 layer
export function getDataLayer() {
    return AppData.data.pages[AppData.edit.pageIndex].layers[AppData.edit.layerIndex];
}

//获取 index  页面
export function getDataPage(index) {
    return AppData.data.pages[index];
}

// 获取当前page
export function getNowPage() {
    let page = null;
    if(AppData.edit.pageIndex !== null) {
        page = getDataPage(AppData.edit.pageIndex);
    }
    return page;
}

// 删除 index 的 页面
export function removeDataPage(index) {
    AppData.data.pages.remove(index);
    AppDataChange();
}

// 删除 对应 page 下面的 index
export function removeDataLayer(index) {
    AppData.data.pages[AppData.edit.pageIndex].layers.remove(index);
    AppDataChange();
}

// 设置 app 其他参数 name, info, img
export function setDataApp(obj) {
    if (obj.name) {
        AppData.data.name = obj.name;
    }
    if (obj.info) {
        AppData.data.info = obj.info;
    }
    if (obj.img) {
        AppData.data.img = obj.img;
    }
    AppDataChange();
}

// 设置 AppData.edit
export function setAppDataEdit(obj, change) {
    for (let key in obj) {
        AppData.edit[key] = obj[key];
    }
    if (change === true) {
        AppDataChange();
    }
}

// 变化监听
export function AppDataChange() {
    setStorage('APP_DATA', AppData.data);
    $(document).trigger('appDataChange', true);
    console.log('app data 改变, 设置缓存');
}

// // 
// window.AppData = new Proxy(AppData, {
//   set: function (target, key, value, receiver) {
//     console.log(`setting ${key}!`);
//     return Reflect.set(target, key, value, receiver);
//   }
// });