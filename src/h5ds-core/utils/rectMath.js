import { csstool } from './cssTool';

/**
 * @desc 对旋转后的图层进行重新计算定位
 */
class RectMath {
  /**
   * @desc 通过旋转后的DIV，获取到外部DIV的坐标和尺寸
   *               w
   *     ------------------------
   *     |                      |
   *     |     倾斜的矩形        |  h
   *     |                      |
   *     ------------------------
   * @param {jquery} $dom jquery dom
   * @return object
   */
  rectParam($dom) {
    if (!$dom[0]) {
      return;
    }
    let rotate = $dom.transform('rotate');
    let width = $dom.width(),
      height = $dom.height(),
      left = parseFloat($dom.css('left')),
      top = parseFloat($dom.css('top')),
      center = {
        left: left + width / 2,
        top: top + height / 2
      };

    // 如果没旋转
    if (rotate === 0) {
      return {
        rotate,
        top,
        left,
        boxWidth: width,
        boxHeight: height,
        width,
        height,
        center
      };
    } else {
      return this._hasRotate(rotate, width, height, center);
    }
  }

  /**
   * @desc 通过对象获取外框
   * @param {object} layer layer 对象
   */
  rectParamObj(layer) {
    let rotate = 0;
    let style = layer.style;
    if (style.transform) {
      rotate = csstool.getTransformVal(style.transform, 'rotate');
    }
    let width = style.width || 0,
      height = style.height || 0,
      left = style.left || 0,
      top = style.top || 0,
      center = {
        left: left + width / 2,
        top: top + height / 2
      };
    // 如果没旋转
    if (rotate == 0) {
      return {
        rotate,
        top,
        left,
        boxWidth: width,
        boxHeight: height,
        width,
        height,
        center
      };
    } else {
      return this._hasRotate(rotate, width, height, center);
    }
  }

  _hasRotate(rotate, width, height, center) {
    // 如果旋转了
    let rotateMin = (rotate % 90) * (Math.PI / 180);
    let rotateTwoLine = Math.atan(height / width); // 对角线相交的小夹角
    let twoRotateLen = Math.sqrt((height / 2) * (height / 2) + (width / 2) * (width / 2)); // 对角线一半的长度
    let boxWidth = twoRotateLen * Math.cos(Math.PI / 2 - (rotateMin + rotateTwoLine)) * 2;
    let boxHeight = twoRotateLen * Math.cos(rotateMin - rotateTwoLine) * 2;
    return {
      rotate,
      top: center.top - boxHeight / 2, // 外壳的 top
      left: center.left - boxWidth / 2, // 外壳 的 left
      boxWidth, // 外壳宽
      boxHeight, // 外壳高
      width, // 真实宽
      height, // 真实高
      center // 中心点坐标
    };
  }
}

export const rectMath = new RectMath();
