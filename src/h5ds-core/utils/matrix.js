/**
 * @desc 获取 transform的参数，只适合2d的矩阵
 */
class MatrixTool {
  /**
   * @desc 通过矩阵获取transform
   * @param {array} matrix 矩阵
   */
  getTransform(matrix = []) {
    const [a, b] = matrix;
    const scale = Math.sqrt(a * a + b * b);
    const rotate = this.getRotate(matrix);
    return {
      x: parseFloat(matrix[4]),
      y: parseFloat(matrix[5]),
      translate: [parseFloat(matrix[4]), parseFloat(matrix[5])],
      scale,
      rotate
    };
  }

  /**
   * @desc 获取旋转
   * @param {dom} elem
   */
  getRotate(matrix = []) {
    let [a, b] = matrix;
    let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    if (angle > 360) {
      angle = angle % 360;
    } else if (angle < 0) {
      angle += 360;
    }
    return angle;
  }

  /**
   * 设置旋转角度
   * @param {*} angle Math.PI
   */
  setRotate(angle, matrix) {
    angle -= this.getAngle(matrix);
    let rotateMatrix = [Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle), 0, 0];
    return this.concat(matrix, rotateMatrix);
  }

  /**
   * 设置缩放
   * @param {*} scaleX
   * @param {*} scaleY
   */
  setScale(scaleX, scaleY, matrix) {
    scaleY = scaleY || scaleX;
    let scaleMatrix = [scaleX, 0, 0, scaleY, 0, 0];
    return this.concat(matrix, scaleMatrix);
  }

  /**
   * 设置位移
   * @param {*} translateX
   * @param {*} translateY
   */
  setTranslate(translateX, translateY, matrix) {
    return this.concat(matrix, [1, 0, 0, 1, translateX, translateY]);
  }

  /**
   * 获取夹角
   */
  getAngle(matrix) {
    return Math.atan2(matrix[1], matrix[0]);
  }

  /**
   * 合并两个矩阵
   * @param {array} matrix1
   * @param {array} matrix2
   */
  concat(matrix1, matrix2) {
    return [
      matrix1[0] * matrix2[0] + matrix1[2] * matrix2[1],
      matrix1[1] * matrix2[0] + matrix1[3] * matrix2[1],
      matrix1[0] * matrix2[2] + matrix1[2] * matrix2[3],
      matrix1[1] * matrix2[2] + matrix1[3] * matrix2[3],
      matrix1[0] * matrix2[4] + matrix1[2] * matrix2[5] + matrix1[4],
      matrix1[1] * matrix2[4] + matrix1[3] * matrix2[5] + matrix1[5]
    ];
  }

  /**
   * @desc 设置参数，
   * @param {dom} elem
   * @param {object} param {'rotate': '10deg'} // translate, scale, rotate
   * @return {object} {x, y, translate, scale, rotate }
   */
  setTransform(elem, param) {
    elem = this.testjQuery(elem);
    let matrix = this.convertMatrixToArray(elem);
    if (param.rotate) {
      matrix = this.setRotate((parseFloat(param.rotate) / 180) * Math.PI, matrix);
    }
    if (param.translate) {
      const [x, y] = param.translate.replace(/\s|px/g, '').split(',');
      matrix = this.translate(parseFloat(x), parseFloat(y), matrix);
    }
    if (param.scale) {
      matrix = this.translate(parseFloat(param.scale), parseFloat(param.scale), matrix);
    }
    return this.getTransform([...matrix]);
  }

  /**
   * @desc 获取位移
   * @param {dom} elem
   * @param {string} dir X, Y 默认是 undefined
   */
  getTranslate(elem, dir) {
    let val;
    elem = this.testjQuery(elem);
    let matrix = this.convertMatrixToArray(elem);

    let yVal = parseFloat(matrix[5]);
    let xVal = parseFloat(matrix[4]);

    if (dir === 'Y') {
      val = yVal;
    }
    if (dir === 'X') {
      val = xVal;
    }
    if (dir === undefined) {
      val = [xVal, yVal];
    }

    return val;
  }

  /**
   * @desc 获取缩放
   * @param {dom} elem
   * @param {string} dir  X, Y 默认是 undefined
   */
  getScale(elem, dir) {
    let val;
    elem = this.testjQuery(elem);
    let matrix = this.convertMatrixToArray(elem);

    let yVal = parseFloat(matrix[3]);
    let xVal = parseFloat(matrix[0]);

    if (dir === 'Y') {
      val = yVal;
    }
    if (dir === 'X') {
      val = xVal;
    }
    if (dir === undefined) {
      val = [xVal, yVal];
    }

    return val;
  }

  /**
   * @desc css转化成matrix
   * @param {dom} target
   */
  convertMatrixToArray(target) {
    target = this.testjQuery(target);
    let computedStyle = window.getComputedStyle(target, null);
    let currentMatrix =
      computedStyle.getPropertyValue('-webkit-transform') ||
      computedStyle.getPropertyValue('-moz-transform') ||
      computedStyle.getPropertyValue('-ms-transform') ||
      computedStyle.getPropertyValue('-o-transform') ||
      computedStyle.getPropertyValue('transform') ||
      null;

    currentMatrix = String(currentMatrix)
      .replace('matrix(', '')
      .replace(')', '')
      .replace(' ', '');

    currentMatrix = currentMatrix.split(',');

    return [
      parseFloat(currentMatrix[0]) || 1,
      parseFloat(currentMatrix[1]) || 0,
      parseFloat(currentMatrix[2]) || 0,
      parseFloat(currentMatrix[3]) || 1,
      parseFloat(currentMatrix[4]) || 0,
      parseFloat(currentMatrix[5]) || 0
    ];
  }

  testjQuery(elem) {
    if (elem instanceof jQuery) {
      elem = elem[0];
    }
    return elem;
  }

  radiansToDeg(radians) {
    let deg = (radians * 180) / Math.PI;
    deg = parseInt(deg.toFixed(0), 10);
    return deg;
  }
}

// 矩阵变化
export const matrixTool = new MatrixTool();
