/**
 * 获取外框的大小，其实就是canvas区域的大小
 */
export function getBoxSize(canvasWidth, canvasHeight) {
  const maxSize = 180; // 最大值
  let width, height, scale;
  if (canvasWidth > canvasHeight) {
    scale = canvasWidth / maxSize;
    width = maxSize;
    height = canvasHeight / scale;
  } else {
    scale = canvasHeight / maxSize;
    height = maxSize;
    width = canvasWidth / scale;
  }

  return { width, height };
}

/**
 * 获取缩小的page的大小
 * @param {object} page page的 size
 * @param {number} scale box, 缩放比例
 */
export function getPageSize(page, box) {
  let { width, height, top, left } = page;

  // 判断宽,高 的比例大小，设置铺满的参数 box
  let size = null;
  if (box.width / box.height > width / height) {
    let maxSize = box.height;
    let scale = height / maxSize;
    size = {
      height: maxSize,
      width: width / scale,
      top: 0,
      left: (box.width - width / scale) / 2
    };
  } else {
    // size = getSize(box.width);
    let maxSize = box.width;
    let scale = width / maxSize;
    size = {
      width: maxSize,
      height: height / scale,
      top: (box.height - height / scale) / 2,
      left: 0
    };
  }

  return size;
}

/**
 * 获取control的size，control是canvas尺寸的缩图
 */
export function getControlSize(props, pageStyle) {
  const { canvasWidth, canvasHeight, page } = props;
  const left = (canvasWidth - page.width) / 2;
  const top = (canvasHeight - page.height) / 2;

  let scale = page.width / pageStyle.width;

  /**
   * 通过canvasWidth, canvasHeight, top, left 计算control的相对位置。
   * 缩图的 page 位置参数是固定的，由此可以计算出 control的相对位置
   */
  const control = {
    width: canvasWidth / scale,
    height: canvasHeight / scale,
    top: pageStyle.top - top / scale,
    left: pageStyle.left - left / scale
  };
  return control;
}
