let tpl = `
	<div class="set-default">
		<span>X <input class="mt-input" type="" placeholder="x坐标" name=""></span>
		<span>Y <input class="mt-input" type="" placeholder="y坐标" name=""></span>
		<span>底色 <input class="mt-input" type="color"></span>
		<span>宽 <input class="mt-input" type="" placeholder="宽" name=""></span>
		<span>高 <input class="mt-input" type="" placeholder="高" name=""></span>
	</div>
	<div class="set-img">
		<img id="cropimg" src="/assets/images/pic.jpg" data-src="/assets/images/pic.jpg" alt="">
	</div>
	<div class="set-more">
		<ul>
			<li>
				<span>旋转角度</span>
				<div class="mt-slider-bar" data-val="0.5"></div>
				<input class="mt-input" type="" placeholder="度" name="">
			</li>
			<li>
				<span>圆角</span>
				<div class="mt-slider-bar" data-val="0.5"></div>
				<input class="mt-input" type="" placeholder="度" name="">
			</li>
			<li>
				<span>透明度</span>
				<div class="mt-slider-bar" data-val="0.5"></div>
				<input class="mt-input" type="" placeholder="度" name="">
			</li>
			<li>
				<span>阴影设置</span>
				<div class="mt-slider-bar" data-val="0.5"></div>
				<input class="mt-input" type="" placeholder="度" name="">
			</li>
			<li>
				<span>开启边框</span>
				<div class="mt-switch" data-val="off">
					<a class="mt-switch-btn"></a>
				</div>
			</li>
			<li>
				<span>边框类型</span>
				<input class="mt-input" type="" placeholder="度" name="">
				<span>边框大小</span>
				<input class="mt-input" type="" placeholder="度" name="">
				<input class="mt-input" type="color" name="">
			</li>
		</ul>
	</div>
`

export default tpl;