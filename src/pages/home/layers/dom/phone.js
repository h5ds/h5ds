import './phone.less';

import { H5DSComponent } from '../plusClasses.js';

// 手机端执行
export default class PhoneDom extends H5DSComponent {
    static type = 'dom';

    constructor(props) {
        super(props);
    }

    didMount() {
        console.log('开始执行', this.props.target);
    }

    willUnmount() {
        console.log('被卸载前执行', this.props.target);
    }
}
