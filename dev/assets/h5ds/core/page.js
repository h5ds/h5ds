import PageClass from './PageClass';
import { layerListTpl } from '../templete/layerListTpl'; //layer list

/**
 * 页面
 */
export default class Page extends PageClass{
    constructor(props) {
        super(props);
        this.page = props.page; // 直接编辑当前page 对象 app里面的page ，不是new Page() 对象
    }

    //初始化方法
    init() {
        // ...
        this._init();
    }
}