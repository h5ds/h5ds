
let scale = 1;
let winWidth = $(window).width();
if(winWidth >= 1920) {
    scale = 1.5;
}else if(winWidth >= 1600) {
    scale = 1.2;
}else {
    // ...
}

// 全局方法
let g = {
    $doc: $(document), // 存成变量，方便打包压缩
    scale: scale // 默认phone 的缩放
}

export default g;