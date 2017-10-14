/**
 * @desc 翻页动画集合, 翻页动画CSS3 ： build/assets/plugins/animations.css
*/
export const sliderAnimate = {
    1: {
        name: '上下平滑',
        inNext: 'pt-page-moveFromBottom', // 进入动画
        outNext: 'pt-page-moveToTop', // 出去动画
        inPrev: 'pt-page-moveFromTop', // 进入动画
        outPrev: 'pt-page-moveToBottom' // 出去动画
    },
    2: {
        name: '上下隐藏',
        inNext: 'pt-page-moveFromBottomFade', // 进入动画
        outNext: 'pt-page-moveToTopFade', // 出去动画
        inPrev: 'pt-page-moveFromTopFade', // 进入动画
        outPrev: 'pt-page-moveToBottomFade' // 出去动画
    },
    3: {
        name: '上下移动缓动',
        inNext: 'pt-page-moveFromBottom', // 进入动画
        outNext: 'pt-page-moveToTopEasing', // 出去动画
        inPrev: 'pt-page-moveFromTop', // 进入动画
        outPrev: 'pt-page-moveToBottomEasing' // 出去动画
    },
    4: {
        name: '上下3D盒子切换',
        inNext: 'pt-page-rotateCubeTopIn3', // 进入动画
        outNext: 'pt-page-rotateCubeTopOut3', // 出去动画
        inPrev: 'pt-page-rotateCubeDownIn3', // 进入动画
        outPrev: 'pt-page-rotateCubeDownOut3' // 出去动画
    },
    5: {
        name: '上下放大',
        outNext: 'pt-page-scaleDownUp', // 出去动画
        inNext: 'pt-page-scaleUpCenter', // 进入动画
        outPrev: 'pt-page-scaleDownUp', // 出去动画
        inPrev: 'pt-page-scaleUpCenter' // 进入动画
    },
    6: {
        name: '旋转风车',
        outNext: 'pt-page-rotateOutNewspaper', // 出去动画
        inNext: 'pt-page-rotateInNewspaper', // 进入动画
        outPrev: 'pt-page-rotateOutNewspaper', // 出去动画
        inPrev: 'pt-page-rotateInNewspaper' // 进入动画
    },
    7: {
        name: '上下弹出效果',
        outNext: 'pt-page-rotateCarouselTopOut', // 出去动画
        inNext: 'pt-page-rotateCarouselTopIn', // 进入动画
        outPrev: 'pt-page-rotateCarouselBottomOut', // 出去动画
        inPrev: 'pt-page-rotateCarouselBottomIn' // 进入动画
    },
    8: {
        name: '上下翻牌效果',
        outNext: 'pt-page-flipOutTop', // 出去动画
        inNext: 'pt-page-flipInTop', // 进入动画
        outPrev: 'pt-page-flipOutBottom', // 出去动画
        inPrev: 'pt-page-flipInBottom' // 进入动画
    },
    9: {
        name: '上下股罗密效果',
        outNext: 'pt-page-rotatePushTop', // 出去动画
        inNext: 'pt-page-rotatePullTop', // 进入动画
        outPrev: 'pt-page-rotatePushBottom', // 出去动画
        inPrev: 'pt-page-rotatePullBottom' // 进入动画
    },
    10: {
        name: '3D盒子效果',
        outNext: 'pt-page-rotateCubeTopOut', // 出去动画
        inNext: 'pt-page-rotateCubeTopIn', // 进入动画
        outPrev: 'pt-page-rotateCubeBottomOut', // 出去动画
        inPrev: 'pt-page-rotateCubeBottomIn' // 进入动画
    }
}