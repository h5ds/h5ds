// 原始数据
export class Origindata {
  constructor() {
    this.id = null;
    this.eid = this.getRandomID();
    this.type = 'test';
    this.animate = [];
    this.data = 'SSSSS';
    this.estyle = {};
    this.style = {
      width: 200,
      height: 200,
      top: 0,
      left: 0
    };
    this.color = '';
    this.ue = {};
  }

  getRandomID(randomLength = 8) {
    return (
      'EID_' +
      Number(
        Math.random()
          .toString()
          .substr(3, randomLength || 8) + Date.now()
      ).toString(36)
    );
  }
}
