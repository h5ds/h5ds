import { animtesToHtml } from '../templete/animateTpl'; //动画模版
import { animatesIn, animatesOut, animatesEm } from '../conf/animates.js'; // 动画配置

// animation: name duration timing-function delay iteration-count direction fill-mode play-state;
class Animate{
    constructor(){
        // .....
    }

    render(){
        $('#animationIn').html(animtesToHtml(animatesIn));
        $('#animationOut').html(animtesToHtml(animatesOut));
        $('#animationEm').html(animtesToHtml(animatesEm));
    }

    //初始化方法
    init(){
        this.render();
    }
}
export default Animate;