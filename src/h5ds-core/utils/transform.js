import { matrixTool } from './matrix';

/**
 * @desc transform参数转换工具。
 * let rotate = $dom.transform('rotate') // 获取 rotate, x, y, scale, translate
 * $dom.transform({'rotate': '10deg'}) // 设置 rotate, x, y, scale, translate
 */
$.fn.transform = function(param) {
  let matrix = matrixTool.convertMatrixToArray(this);
  if (typeof param === 'string') {
    const data = matrixTool.getTransform(matrix) || {};
    return data[param];
  } else {
    // 原来的矩阵 matrix，在原来的矩阵做变化
    let trans = matrixTool.setTransform(this, param);
    $(this).css({
      transform: `translate(${trans.x}px, ${trans.y}px) scale(${trans.scale}) rotate(${trans.rotate}deg)`
    });
  }
};
