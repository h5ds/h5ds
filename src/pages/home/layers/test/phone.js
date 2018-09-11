import './phone.less';

import { H5DSComponent } from '../plusClasses.js';

// 手机端执行
export default class PhoneDom extends H5DSComponent {
    static type = 'test';

    constructor(props) {
        super(props);
    }

    didMount() {
        console.log('开始执行', this.props.target);
    }

    oneDidMount() {
        console.log('插件渲染后执行，且只执行一次，下次进入不会再执行', this.props.target);
    }


    willUnmount() {
        console.log('被卸载前执行', this.props.target);
    }
}
