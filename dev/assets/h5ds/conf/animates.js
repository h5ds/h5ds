/**
 * 进入动画
*/
export const animatesIn = [
	{ name: '弹入', type: 'in', animate: 'bounceIn', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '上弹入', type: 'in', animate: 'bounceInDown', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '左弹入', type: 'in', animate: 'bounceInLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '右弹入', type: 'in', animate: 'bounceInRight', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '下弹入', type: 'in', animate: 'bounceInUp', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '渐显', type: 'in', animate: 'fadeIn', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '上渐显', type: 'in', animate: 'fadeInDown', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '上远渐显', type: 'in', animate: 'fadeInDownBig', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '左渐显', type: 'in', animate: 'fadeInLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '左远渐显', type: 'in', animate: 'fadeInLeftBig', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '右渐入', type: 'in', animate: 'fadeInRight', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '右远渐入', type: 'in', animate: 'fadeInRightBig', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '下渐入', type: 'in', animate: 'fadeInUp', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '下远渐入', type: 'in', animate: 'fadeInUpBig', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: 'X翻牌', type: 'in', animate: 'flipInX', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: 'Y翻牌', type: 'in', animate: 'flipInY', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '光速入', type: 'in', animate: 'lightSpeedIn', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '滚入', type: 'in', animate: 'rotateIn', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '左上滚入', type: 'in', animate: 'rotateInDownLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '右上滚入', type: 'in', animate: 'rotateInDownRight', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '左下滚入', type: 'in', animate: 'rotateInUpLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '右下滚入', type: 'in', animate: 'rotateInUpRight', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '下滑入', type: 'in', animate: 'slideInUp', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '上滑入', type: 'in', animate: 'slideInDown', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '左滑入', type: 'in', animate: 'slideInLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '右滑入', type: 'in', animate: 'slideInRight', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '放大', type: 'in', animate: 'zoomIn', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '从上放大', type: 'in', animate: 'zoomInDown', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '从左放大', type: 'in', animate: 'zoomInLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '从右放大', type: 'in', animate: 'zoomInRight', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '从下放大', type: 'in', animate: 'zoomInUp', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '左滚入', type: 'in', animate: 'rollIn', time: '1s', delay: '0s', count: 1, fun: 'ease' }
]

/**
 * 离开动画
*/
export const animatesOut = [
	{ name: '弹走', type: 'out', animate: 'bounceOut', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '下弹走', type: 'out', animate: 'bounceOutDown', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '左弹走', type: 'out', animate: 'bounceOutLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '右弹走', type: 'out', animate: 'bounceOutRight', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '上弹走', type: 'out', animate: 'bounceOutUp', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '渐隐', type: 'out', animate: 'fadeOut', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '下渐隐', type: 'out', animate: 'fadeOutDown', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '下渐隐快', type: 'out', animate: 'fadeOutDownBig', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '左渐隐', type: 'out', animate: 'fadeOutLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '左渐隐快', type: 'out', animate: 'fadeOutLeftBig', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '右渐隐', type: 'out', animate: 'fadeOutRight', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '右渐隐快', type: 'out', animate: 'fadeOutRightBig', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '上渐隐', type: 'out', animate: 'fadeOutUp', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '上渐隐快', type: 'out', animate: 'fadeOutUpBig', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: 'X翻牌隐', type: 'out', animate: 'flipOutX', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: 'Y翻牌隐', type: 'out', animate: 'flipOutY', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '光速离开', type: 'out', animate: 'lightSpeedOut', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '滚隐', type: 'out', animate: 'rotateOut', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '左下滚出', type: 'out', animate: 'rotateOutDownLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '右下滚出', type: 'out', animate: 'rotateOutDownRight', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '左上滚出', type: 'out', animate: 'rotateOutUpLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '右上滚出', type: 'out', animate: 'rotateOutUpRight', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '上滑出', type: 'out', animate: 'slideOutUp', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '下滑出', type: 'out', animate: 'slideOutDown', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '左滑出', type: 'out', animate: 'slideOutLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '右滑出', type: 'out', animate: 'slideOutRight', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '缩小', type: 'out', animate: 'zoomOut', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '下缩小', type: 'out', animate: 'zoomOutDown', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '左缩小', type: 'out', animate: 'zoomOutLeft', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '右缩小', type: 'out', animate: 'zoomOutRight', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '上缩小', type: 'out', animate: 'zoomOutUp', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '掉链子', type: 'out', animate: 'hinge', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '右滚走', type: 'out', animate: 'rollOut', time: '1s', delay: '0s', count: 1, fun: 'ease' }
]

/**
 * 强调动画
*/
export const animatesEm = [
	{ name: '跳动', type: 'em', animate: 'bounce', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '闪动', type: 'em', animate: 'flash', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '呼吸', type: 'em', animate: 'pulse', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '弹性', type: 'em', animate: 'rubberBand', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '震动', type: 'em', animate: 'shake', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '摇摆', type: 'em', animate: 'swing', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '嘚瑟', type: 'em', animate: 'tada', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '晃动', type: 'em', animate: 'wobble', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '拉扯', type: 'em', animate: 'jello', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '翻转', type: 'em', animate: 'flip', time: '1s', delay: '0s', count: 1, fun: 'ease' },
	{ name: '旋转', type: 'em', animate: 'rollOneCount', time: '1s', delay: '0s', count: 1, fun: 'linear' }
]