import { asyncBasic } from '../templete/basicTpl'; //基础模版
import { asyncRotate } from '../templete/basicMoreTpl'; // 拓展模版
import { setAppDataEdit, AppDataChange } from './AppDataFun.js';

//初始化控制器
// 通过 AppData里面的 参数 自动实例化
export function initControl(self) {

    var $pageView = $('#pageView');
    var $nowlayer = $pageView.find('.layer').eq(AppData.edit.layerIndex);

    var $control = $pageView.find('.mt-control');
    let style = self[self.className].style;

    //先注销之前的控制器
    if ($control[0]) {
        $control.remove();
        $control = null;
    }

    //初始化当前的控制器
    $nowlayer.control({
        movex: true,
        movey: true,
        rotate: true,
        autosize: true,
        fixedsize: true
    });

    //控制器事件绑定
    $nowlayer.off('change').on('change', function(e, data) {
        // 如果data没值，说明是点击事件，直接跳过
        if (!data) {
            return
        }
        
        // 设置 style 对象
        for (let key in data) {
            if (key === 'rotate') {
                // 迭代中可能出现BUG，如果 transform 用了其他的值，比如 scale , translate 等 这里就不能这样处理
                style['transform'] = `rotate(${data[key]})`;
            } else {
                style[key] = parseInt(data[key], 10) + 'px';
            }
        }

        // 如果是旋转
        if (data['rotate']) {
            // 同步 transform
            asyncRotate(style);
        } else {
            // 同步基本设置
            asyncBasic(style);
        }

        // 监听变化
        AppDataChange();

    });
}

/**
 * 控制layer 设置区域的隐藏，显示
 */
export function layerShow(dom) {
    //显示layer or 隐藏app设区域
    $('.setlayer').hide();
    // if(dom === '#setAppBox') {
    //     // 清空AppData.edit
    //     AppData.edit = Object.assign(AppData.edit, {
    //         pageIndex: null, // 默认编辑页面 index
    //         pageClass: null, //当前编辑的 page 类
    //         layerIndex: null, // 默认选中的layer index
    //         layerDom: null, // 当前编辑的layer Dom对象
    //         layerClass: null // 当前编辑的layer 类
    //     });
    // }
    $(dom).show();
}

/**
 * @desc layer 排序
 * @param self 当前的page 类
 * @param data {from: 0, to: 2}
*/
export function uniqendLayer(self, data) {
    console.log('排序', data);
    //交换layers。需要重新排序 from 变成了 to， 但是 from - to 中间这段，都加了1
    let arr = self.page.layers;
    let fromData = arr[data.from];

    // 从下往上
    if(data.from > data.to) {
        for(let i = 0; i < (data.from - data.to); i++) {
            let index = data.from - i;
            arr[index] = arr[index - 1];
            console.log('排序次数', index, index - 1)
        }
    }else { // 从上往下
        for(let i = 0; i < (data.to - data.from); i++) {
            let index = data.from + i;
            arr[index] = arr[index + 1];
            console.log('排序次数', index, index + 1)
        }
    }
    console.log('排序次数', data.from, data.to)
    arr[data.to] = fromData;
    
    //设置z-index 属性 . 备注：这里 z-index 最大为9999
    for (var i = 0; i < arr.length; i++) {
        arr[i].style['z-index'] = 9999 - i;
    }

    //重新渲染viewPage， 重新渲染必须在 self.newLayer 之前，因为 newLayer 里面会设置 AppData.edit.layerDom 
    self.initPageDom();

    //渲染控制器
    var $active = $('#layerlist').find('.active');
    if ($active[0]) {
        let index = $active.index();
        //new layer
        self.newLayer(index);
    }

    // 重新渲染列表
    // self.initLayerList();

    AppDataChange();
}