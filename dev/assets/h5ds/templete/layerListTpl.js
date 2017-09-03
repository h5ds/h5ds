// layer 列表
export function layerListTpl(obj) {
    return `<li class="layer-item ${obj.active ? 'active' : ''}">
				<a class="showlayer"><i class="iconfont icon-yanjing"></i></a>
				<span>${obj.type}</span>
				<a class="dellayer" title="删除图层"><i class="iconfont icon-icodel"></i></a>
				<a class="copylayer" title="复制图层"><i class="iconfont icon-fuzhi"></i></a>
			</li>`;
}