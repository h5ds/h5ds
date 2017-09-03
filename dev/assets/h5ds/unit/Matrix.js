(function (window) {
    
    function Matrix(data) {
        
        if (data == null) {
            data = [];
        }
        
        var context = [
            data[0] || 1,
            data[1] || 0,
            data[2] || 0,
            data[3] || 1,
            data[4] || 0,
            data[5] || 0
        ];
        
        context.getAngle = function () {
            return Math.atan2(this[1], this[0]);
        };
        
        context.concat = function (data) {
            return Matrix([
                    this[0] * data[0] + this[2] * data[1],
                    this[1] * data[0] + this[3] * data[1],
                    this[0] * data[2] + this[2] * data[3],
                    this[1] * data[2] + this[3] * data[3],
                    this[0] * data[4] + this[2] * data[5] + this[4],
                    this[1] * data[4] + this[3] * data[5] + this[5]
            ]);
        }
        
        context.rotate = function (theta, aboutPoint) {
            return this.concat(Matrix.rotate(theta, aboutPoint));
        }
        
        context.setRotation = function (angle, aboutPoint) {
            return this.rotate(angle - this.getAngle(), aboutPoint);
        }
        
        context.scale = function (scaleX, scaleY, aboutPoint) {
            return this.concat(Matrix.scale(scaleX, scaleY, aboutPoint));
        }
        
        context.translate = function (translateX, translateY) {
            return this.concat(Matrix.translate(translateX, translateY));
        }
        
        context.toCSSTransform = function () {
            return 'matrix(' + this.join(', ') + ')';
        }
        
        return context;
    }

    Matrix.rotate = function (theta, aboutPoint) {
        
        var rotateMatrix = Matrix([
            Math.cos(theta), Math.sin(theta), -Math.sin(theta),
            Math.cos(theta), 0,               0
        ]);

        if (aboutPoint) {
            rotateMatrix = Matrix.translate(aboutPoint[0], aboutPoint[1]).concat(rotateMatrix)
                                    .concat(Matrix.translate(-aboutPoint[0], -aboutPoint[1]));
        }

        return rotateMatrix;
    };

    Matrix.scale = function (scaleX, scaleY, aboutPoint) {
        scaleY = scaleY || scaleX;

        var scaleMatrix = Matrix([
            scaleX, 0, 0, 
            scaleY, 0, 0
        ]);

        if (aboutPoint) {
            scaleMatrix = Matrix.translate(aboutPoint[0], aboutPoint[1]).concat(scaleMatrix)
                                    .concat(Matrix.translate(-aboutPoint[0], -aboutPoint[1]));
        }

        return scaleMatrix;
    };

    Matrix.translate = function (translateX, translateY) {
        return Matrix([1, 0, 0, 1, translateX, translateY]);
    };

    window.Matrix = Matrix;
})(this);