import { getSysTpls, getSysTplsTypes, getUserTpls, delUserTpls } from '../server/ajax.js'; // ajax
import { newPage, PAGE_SIZE } from './imgSource';
import { addNewPageData } from '../common/AppDataFun';
import nullImg from '../../images/null.png';

// 获取系统模板分类
function getSysTplsTypesFun() {
    $('#imgSysList').loading();
    getSysTplsTypes().done((res) => {
        if (res.success) {
            // console.log(res.data);
            let tpl = '<h5>HOT:</h5> <a data-id="">All</a>';
            for (let i = 0; i < res.data.length; i++) {
                let d = res.data[i];
                tpl += `<a data-id="${d.id}">${d.name}</a>`
            }
            // 设置 素材列表
            $('#sysTplsTypesList').html(tpl);
        }
    });
}

// 获取系统模板 
function getSysTplsFun(p) {
    $('#sysTplsList').loading();
    getSysTpls({ name: p.name || '', type: p.type, pageSize: p.pagesize, pageNum: p.page }).done((res) => {
        if (res.success) {
            // console.log(res.data);
            let arr = res.data;
            arr.unshift({
                data: '{"name": "空白页面", "style": {}, "layers": [], "slider": {"animate": 1, "autoplay": false, "lock": false, "time": 5}}',
                name: '空白页面',
                pic: nullImg
            });
            let tpl = '';
            for (let i = 0; i < arr.length; i++) {
                let d = arr[i];
                tpl += `<li>
                    <div class="name">${d.name}</div>
                    <div class="imgbox"><img src="${d.pic}" alt=""></div>
                </li>`;
            }
            // 设置 素材列表
            $('#sysTplsList').html(tpl);
            $('#sysTplsList').find('li').each((index, elem) => {
                $(elem).data('val', arr[index].data);
            });

            // 分页
            let $pagelist = $('#sysTplsPagelist');
            if (!$pagelist.find('.mt-pagelist')[0]) {
                // 初始化分页
                newPage(res.count, $pagelist, getSysTplsFun);
            }
        }
    });
}

// 获取用户模板
export function getUserTplsFun(p) {
    $('#myTplsList').loading();
    getUserTpls({
        name: '',
        pageSize: p.pagesize,
        pageNum: p.page
    }).done(res => {
        if (res.success) {
            let tpl = '';
            for (let i = 0; i < res.data.length; i++) {
                let d = res.data[i];
                tpl += `<li data-id="${d.id}">
                    <div class="name">${d.name}</div>
                    <a data-id="${d.id}" class="del"><i class="iconfont icon-close"></i></a>
                    <div class="imgbox"><img src="${d.pic}" alt=""></div>
                </li>`
            }
            // 设置 素材列表
            $('#myTplsList').html(tpl);
            $('#myTplsList').find('li').each((index, elem) => {
                $(elem).data('val', res.data[index].data);
            });

            // 分页
            let $pagelist = $('#myTplsPageList');
            if (!$pagelist.find('.mt-pagelist')[0]) {
                // 初始化分页
                newPage(res.count, $pagelist, getUserTplsFun);
            }
        }
    });
}

// 选择系统模板分类事件
function eventSysTpls() {
    // 选择模板分类
    $('#sysTplsTypesList').on('click', 'a', function (e) {
        $(this).addClass('active').siblings('a').removeClass('active');
        let id = $(this).attr('data-id');
        getSysTplsFun({
            type: id,
            pagesize: PAGE_SIZE,
            page: 1
        });
    });

    // 选择系统模板
    $('#sysTplsList, #myTplsList').on('click', 'li', function (e) {
        let val = $(this).data('val');
        let $item = $('#pagesList').find('.active');
        let index = $item.index();
        AppData.edit.appClass.addPage(index, JSON.parse(val));
    });

    // 删除用户模板
    $('#myTplsList').on('click', '.del', function (e) {
        e.stopPropagation();
        let id = $(this).attr('data-id');
        delUserTpls({
            id: id
        }).done(res => {
            if (res.success) {
                $.tip();
                getUserTplsFun({
                    type: '',
                    pagesize: PAGE_SIZE,
                    page: 1
                });
            }
        });
    });

    // 搜索
    $('#searchSysTpl').on('click', '.mt-search-btn', function () {
        let name = $('#searchSysTplInput').val();
        let $active = $('#sysTplsTypesList').find('.active');
        let id = $active[0] ? $active.attr('data-id') : '';
        getSysTplsFun({
            name: name,
            type: id,
            pagesize: PAGE_SIZE,
            page: 1
        });
    });
}

// 系统图片
export function sysTpls() {

    // 获取系统图片
    getSysTplsFun({
        type: '',
        pagesize: PAGE_SIZE,
        page: 1
    });

    // 获取用户图片
    getUserTplsFun({
        type: '',
        pagesize: PAGE_SIZE,
        page: 1
    });

    // 获取模板分类
    getSysTplsTypesFun();

    // 系统模板事件
    eventSysTpls();

}