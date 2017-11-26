/**
 * page 列表的模板
*/

export function pageListTpl(obj, type) {
    return ` 
	<li class="page-item" data-name="${obj.name}">
		<div class="page-content">
            <span class="page-name">${obj.name}</span>
            ${!obj.id ? '' : `<span class="page-id">ID: ${obj.id}</span>`}
		</div>
		<div class="page-info">
             <a class="important edit-page" data-title="编辑页面信息"><i class="iconfont icon-bianji1"></i></a>
             ${type !== 'fixed' ? 
             `<a class="copy-page" data-title="复制页面"><i class="iconfont icon-fuzhi"></i></a>
             <a class="del-page" data-title="删除页面"><i class="iconfont icon-icodel"></i></a>` : ''}
		</div>
	</li>`
}

// 销毁 layer 控制器
export function destoryControl() {
    //取消layer的选中状态
    var $control = $('#phoneApp').find('.mt-control');
    if ($control[0]) {
        $control.remove();
        $control = null;
    }
    AppData.edit.layerDom = null;
    AppData.edit.layerIndex = null;
    $('#layerlist').find('.active').removeClass('active');
}

// page 列表的事件
export function initPageListEvent(self) {
    //选择page    , canRender 强行渲染
    $('#pagesList, #popupsList, #fixedsList').off('click').on('click', '.page-item', function (e, canRender) {
        e.stopPropagation();
        $(this).addClass('active').siblings('.page-item').not('.mt-uniq-clone').removeClass('active');
        let index = $(this).index();

        // 选择页面的时候，清除 AppData.edit.layerIndex 
        AppData.edit.layerIndex = null;

        // 销毁控制器
        destoryControl();
        let pageType = 'pages';
        if(e.delegateTarget.id === 'popupsList') {
            pageType = 'popups';
        }else if(e.delegateTarget.id === 'fixedsList') {
            pageType = 'fixeds';
        }
        AppData.edit.pageType = pageType;

        //new page
        self.newPage(index, canRender);
    });

    //排序回调
    $('#pagesList, #popupsList, #fixedsList').off('uniqend').on('uniqend', function (e, data) {
        //交换pages。需要重新排序 from 变成了 to， 但是 from - to 中间这段，都加了1
        let pages = self.app[AppData.edit.pageType];
        let fromData = pages[data.from];

        // 从下往上
        if (data.from > data.to) {
            for (let i = 0; i < (data.from - data.to); i++) {
                let index = data.from - i;
                pages[index] = pages[index - 1];
                console.log('排序次数', index, index - 1)
            }
        } else { // 从上往下
            for (let i = 0; i < (data.to - data.from); i++) {
                let index = data.from + i;
                pages[index] = pages[index + 1];
                console.log('排序次数', index, index + 1)
            }
        }
        console.log('排序次数', data.from, data.to)
        pages[data.to] = fromData;

        //重新设置当前选中的下标
        let $this = $(this).find('.active');
    });
}