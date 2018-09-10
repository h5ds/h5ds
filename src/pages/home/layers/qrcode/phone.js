import './phone.less';

import { H5DSComponent } from '../plusClasses.js';

// 手机端执行
export default class QrcodeDom extends H5DSComponent {
    static type = 'dom';

    constructor(props) {
        super(props);
    }

    oneDidMount() {
        console.log('开始执行', this.props.target);
        const $target = $(this.props.target).find('.qrcode-inner');
        $target.empty().qrcode($target.attr('data-qrcode'));
    }

    willUnmount() {
        console.log('被卸载前执行', this.props.target);
    }
}
