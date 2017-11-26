import PageClass from './pageClass';
import { getViewDom } from '../common/AppDataFun.js';

/**
 * 页面
 */
export default class Fixed extends PageClass{
    constructor(props) {
        super(props);
    }

    //初始化方法
    init() {

        // 切换目标
        $('.pageViewFixed').removeClass('page-viewup-full');
        getViewDom().addClass('page-viewup-full');

        console.log('Fixed 类');
        // ...
        this._init();
    }
}