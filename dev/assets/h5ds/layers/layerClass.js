var setBoxBasic = `basic`
var setBoxMore = `more`

class LayerClass{
	constructor(x,y,hei,wid,bg,rotate,scale,radius,opacity,boxshadow,border){
		this.x = x;
		this.y = y;
		this.hei = hei;
		this.wid = wid;
		this.bg = bg;
		this.rotate = rotate;
		this.scale = scale;
		this.radius = radius;
		this.opacity = opacity;
		this.boxshadow = boxshadow;
		this.border = border;
	}

	getValue(){
		return this;
	}

	//初始化设置区域
	initSetBox(){
		
	}

}

export default LayerClass;