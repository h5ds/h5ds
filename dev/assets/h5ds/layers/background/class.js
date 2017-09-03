import Layer from '../../core/layer';

class Img extends Layer{
	constructor(color) {
	    super(); // 调用父类的constructor(x, y)
	    this.color = color;
	}

	echoThis(){
		console.log(this)
	}
}

export default Img;