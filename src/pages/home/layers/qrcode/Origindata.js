// 原始数据
export class Origindata {
    constructor() {
        this.id = null;
        this.eid = this.getRandomID();
        this.type = 'qrcode';
        this.animate = [];
        this.data = 'http://www.h5ds.com';
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
        return 'EID_' + Number(
            Math.random()
                .toString()
                .substr(3, randomLength || 8) + Date.now()
        ).toString(36);
    }
}
