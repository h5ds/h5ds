
// 从数组中移除 obj 这里的 obj 是同样的引用地址
Array.prototype.remove = function (obj) {
    for (let i = 0; i < this.length; i++) {
        var temp = this[i];
        if (!isNaN(obj)) {
            temp = i;
        }
        if (temp === obj) {
            for (let j = i; j < this.length; j++) {
                this[j] = this[j + 1];
            }
            this.length = this.length - 1;
        }
    }
}

// 判断是否是二进制
String.prototype.isBlob = function () {
    if(!this) {
        return false;
    }
    if (this.indexOf('blob:http') !== -1) {
        return true;
    } else {
        return false;
    }
}

// 获取blob id
String.prototype.blobId = function () {
    if (this.isBlob()) {
        return this.split('#')[1];
    } else {
        return null;
    }
}