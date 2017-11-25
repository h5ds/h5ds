import { setStorage, getStorage } from '../localSave/localStorage.js';

// 添加新的页面
// obj.index 插入位置， obj.page 插入页面， obj.pageName 页面名字
export function addNewPageData(obj) {
    if(typeof obj !== 'object') {
        return;
    }
    let index = obj['index'] || (AppData.data[AppData.edit.pageType].length + 1);

    // slider 继承上一次
    let page = obj.page;
    AppData.data[AppData.edit.pageType].splice(index, 0, page);
    AppDataChange();
}

// 获取view 对象
// 获取当前的 view 区域对象
export function getViewDom() {
    let $view = null;
    if(AppData.edit.pageType === 'pages') {
        $view = $('#pageView');
    }else if(AppData.edit.pageType === 'popups') {
        $view = $('#pageViewPopup');
    }else if(AppData.edit.pageType === 'fixeds') {
        let index = $('#fixedsList').find('.active').index();
        $view = $('.pageViewFixed').eq(index);
    }else {
        // ... 其他
    }
    return $view;
}

// 获取当前的 getPageListDom
export function getPageListDom() {
    let $list = null;
    if(AppData.edit.pageType === 'pages') {
        $list = $('#pagesList');
    }else if(AppData.edit.pageType === 'popups') {
        $list = $('#popupsList');
    }else if(AppData.edit.pageType === 'fixeds') {
        $list = $('#fixedsList');
    }else {
        // ... 其他
    }
    return $list;
}

// 复制页面
export function copyPageData(index) {
    let page = JSON.parse(JSON.stringify(AppData.data[AppData.edit.pageType][index - 1]));
    AppData.data[AppData.edit.pageType].splice(index, 0, page);
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
    Page[Page.className].layers = layers;
    AppDataChange();
}

// 设置 page 类
export function setPageClass(self) {    
    console.log('setPageClass', self.className)
    AppData.edit.pageClass = self;
    AppData.edit.pageType = self.className + 's'; // 设置类型
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
    let page = AppData.data[AppData.edit.pageType][AppData.edit.pageIndex] || [];
    return page.layers
}

//获取 当前页面的 layer
export function getDataLayer() {
    return AppData.data[AppData.edit.pageType][AppData.edit.pageIndex].layers[AppData.edit.layerIndex];
}

//获取 index  页面
export function getDataPage(index) {
    return AppData.data[AppData.edit.pageType][index];
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
    AppData.data[AppData.edit.pageType].remove(index);
    AppDataChange();
}

// 删除 对应 page 下面的 index
export function removeDataLayer(index) {
    let cName = AppData.edit.pageType;
    AppData.data[cName][AppData.edit.pageIndex].layers.remove(index);
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

// 存个历史记录，自动监听了输入框，表单的历史记录，其他历史记录需要手动加入
export function saveHistory() {
    let cName = AppData.edit.pageType;
    let index = AppData.edit.pageIndex;
    let page = AppData.data[cName][index];
    // 删除之前先存个历史记录
    AppData.edit.history.push(JSON.stringify({
        page: page,
        index: index
    }));
}

// // 
// window.AppData = new Proxy(AppData, {
//   set: function (target, key, value, receiver) {
//     console.log(`setting ${key}!`);
//     return Reflect.set(target, key, value, receiver);
//   }
// });