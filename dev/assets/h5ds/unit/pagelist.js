import g from '../conf/global';

//设置html，如果mark = true，不重置 mt-active
function setHtml(page, showpage, maxpage, mark) {
    page = page ? page : 1;
    var shtml = `<div class="mt-pagelist">
        <ul class="clearfix">
            <li><a class="iconfont icon-a3left mt-pageprev"></a></li>
            {{pageli}}
            <li><a class="iconfont icon-a3right mt-pagenext"></a></li>
        </ul>
    </div>`;
    var pageli = '';
    var addCls = function (num) {
        var className = '';
        if (!mark && num == page) {
            className = 'mt-active'
        }
        return className;
    }
    if (maxpage == 0) {
        shtml = '';
    } else if (maxpage <= showpage + 1) {
        for (var i = 0; i < maxpage; i++) {
            pageli += '<li><a class="' + addCls(i + 1) + '">' + (i + 1) + '</a></li>'
        }
    } else {
        //如果是大于maxpage
        var size = showpage - 2; //中间显示size个
        // 分三种情况： 1234...9   1...345...9  1...6789
        if (page < size + 1) { //1234...9
            for (let i = 0; i < size + 1; i++) {
                pageli += '<li><a class="' + addCls(i + 1) + '">' + (i + 1) + '</a></li>'
            }
            pageli += '<li><a class="mt-pagelist-next">...</a></li>';
            pageli += '<li><a>' + maxpage + '</a></li>';
        } else if (page >= size + 1 && page <= maxpage - size) { //1...567...9    			
            pageli += '<li><a>1</a></li>';
            pageli += '<li><a class="mt-pagelist-prev">...</a></li>';
            for (let i = page - 1; i < size + page - 1; i++) {
                pageli += '<li><a class="' + addCls(i) + '">' + i + '</a></li>'
            }
            pageli += '<li><a class="mt-pagelist-next">...</a></li>';
            pageli += '<li><a>' + maxpage + '</a></li>';
        } else { //1...6789
            pageli += '<li><a>1</a></li>';
            pageli += '<li><a class="mt-pagelist-prev">...</a></li>';
            for (let i = 0; i < size + 1; i++) {
                var nowp = maxpage - (size + 1 - i) + 1;
                pageli += '<li><a class="' + addCls(nowp) + '">' + nowp + '</a></li>'
            }
        }
    }
    addCls = null;
    shtml = shtml.replace('{{pageli}}', pageli);
    return shtml;
}

/**
 * 分页插件
 */
$.fn.pagelist = function (setting) {

    var defaults = {
        refresh: false,
        page: 9, //当前第几页
        pagesize: 20, //20条每页
        count: 0, //总共多少条数据
        showpage: 5 //最大显示多少页 .. >= 4
    }
    var _this = this;
    var set = $.extend(defaults, setting);
    var maxpage = Math.ceil(set.count / set.pagesize);

    // 避免重复渲染
    if($(this).find('.mt-pagelist')[0]) {
        $(this).html(setHtml(set.page, set.showpage, maxpage));
        return;
    }

    if (set.showpage < 4) {
        console.error('showpage最小为4')
        return
    }

    //页面跳转
    var toPage = function (page, mark) {
        $(_this).html(setHtml(page, set.showpage, maxpage, mark))
    }

    //自定义page事件
    var pageEvent = function (nowpage) {
        $(_this).trigger('page', {
            page: nowpage,
            count: set.count,
            pagesize: set.pagesize
        })
    }

    //上一页
    var nextPage = function () {
        var nowpage = $(_this).find('.mt-active').html();
        nowpage++;
        if (nowpage > maxpage) {
            nowpage = maxpage;
        }
        pageEvent(nowpage)
        toPage(nowpage)
    }

    //下一页
    var prevPage = function () {
        var nowpage = $(_this).find('.mt-active').html();
        nowpage--;
        if (nowpage <= 0) {
            nowpage = 1;
        }
        pageEvent(nowpage)
        toPage(nowpage)
    }

    //上一段
    var prevSize = function () {
        var nowpage = $(_this).find('.mt-pagelist-prev').parent().next().text();
        var size = set.showpage - Math.ceil(set.showpage / 2);
        nowpage = parseInt(nowpage, 10);
        nowpage -= size;
        if (nowpage < 1) {
            nowpage = 1;
        }
        toPage(nowpage, true)
    }

    //下一段
    var nextSize = function () {
        var nowpage = $(_this).find('.mt-pagelist-next').parent().prev().text();
        nowpage = parseInt(nowpage, 10);
        nowpage += 2;
        if (nowpage > maxpage) {
            nowpage = maxpage;
        }
        toPage(nowpage, true)
    }

    //init
    var init = function () {
        $(_this).html(setHtml(set.page, set.showpage, maxpage));
    }

    //事件驱动
    $(_this).off('click.pagelist').on('click.pagelist', '.mt-pagelist', function (e) {
        var cls = e.target.className ? e.target.className : '';
        if (cls.indexOf('mt-pagenext') != -1) {
            //下一页
            nextPage()
        } else if (cls.indexOf('mt-pageprev') != -1) {
            //上一页
            prevPage()
        } else if (cls.indexOf('mt-pagelist-next') != -1) {
            //下一段
            nextSize()
        } else if (cls.indexOf('mt-pagelist-prev') != -1) {
            //上一段
            prevSize()
        } else {
            //页码
            var nowpage = parseInt(e.target.text, 10);
            pageEvent(nowpage)
            toPage(nowpage)
        }
    });

    init();

    // 刷新当前页面
    _this.refresh = function() {
        $(_this).html(setHtml(set.page, set.showpage, maxpage));
    }.bind(_this);

    return _this;

} //END fn