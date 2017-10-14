/**
 * 案例
*/
import '../sass/ui/ui.scss';
import '../sass/pages/pages.scss';

import '../h5ds/unit/toStyle.js'; // object 变成 style top:10px; left: 20px; // ... 
import '../h5ds/unit/confirm.js'; // object 变成 style top:10px; left: 20px; // ... 
import '../h5ds/unit/pagelist.js'; //分页
import '../h5ds/unit/tip.js'; //

import { appToHtmlFile } from '../h5ds/common/saveApp';

function initPage(num) {
    $.ajax({
        type: 'post',
        url: '/api/getUserApps',
        data: { name: '', pageSize: 19, pageNum: num}
    }).done( res => {
        let str = `<li class="item" id="addNew"><i class="iconfont icon-jia1"></i></li>`;
        if(res.success) {
            for(let i = 0;  i < res.data.length; i++) {
                let d = res.data[i];
                str += `<li class="item${ (num === 1 && i === 0) ? ' active' : ''}">
                    <a href="${d.url ? d.url : 'javascript:;'}" target="_blank"><img src="${d.pic}"/></a>
                    <div class="date">${d.date}</div>
                    <div class="info">
                        <div class="name">${d.name}</div>
                        <div class="desc">${d.des}</div>
                        <a href="/edit?id=${d.id}&owner=${d.owner}">编辑</a>
                        <a class="to-del" data-name="${d.name}" data-id="${d.id}">删除</a>
                    </div>
                </li>`;
            }
            $('#applist').html(str);
            // 设置分页
            $('.pagelist').pagelist({
                page: num,
                count: res.count,
                pagesize: 19,
                showpage: 10
            });
        }
    });
}

// 删除
function delPage() {
    $(document).on('click', '.to-del', function(){
        let id = $(this).attr('data-id');
        $.confirms({
            title: '系统提示',
            content: `是否要删除 ${$(this).attr('data-name')}，删除后不可恢复！`,
            width: 300, // 宽度
            callback: (mark) => {// 回调函数
                if(mark) {
                    $.ajax({
                        type: 'post',
                        url: '/api/delApp',
                        data: {
                            id: id
                        },
                        dataType: 'json'
                    }).done(res => {
                        if(res.success) {
                            initPage(1);
                        }
                    });
                }
            } 
        }).show();

    });
}

// 添加页面
function addNewPage() {
    $(document).on('click', '#addNew', function(){

        let data = {
            img: '/assets/images/app.png',
            info: '点石H5，官方网站h5ds.com',
            loading: '1',
            mp3: {
                name: '',
                url: ''
            },
            name: '点石H5',
            fixeds: [{
                id: '',
                name: '浮动层上',
                style: {},
                layers: []
            },
            {
                id: '',
                name: '浮动层下',
                style: {},
                layers: []
            }],
            popups: [],
            pages: [],
            pagesize: 0,
            slider: {
                animate: 1,
                lock: false,
                autoplay: false,
                time: 5
            },
            style: {
                'background-image': '',
                'background-color': '',
                'background-repeat': '',
                'background-size': ''
            }
        };
        $.ajax({
            type: 'post',
            url: '/api/addData',
            data: {
                name: data.name,
                pic: data.img,
                des: data.info,
                data: JSON.stringify(data),
                shtml: appToHtmlFile(data)
            },
            dataType: 'json'
        }).done(res => {
            if(res.success) {
                initPage(1);
            }else {
                $.tip({
                    msg: res.msg,
                    type: 'danger',
                    time: 3000
                });
            }
        });
    });
}

$(function(){
    
    $('[data-name="logout"]').css('display', 'inline-block');

    initPage(1, 19);
    addNewPage();
    delPage();

    $('.pagelist').on('page', function(e, obj){
        console.log(obj);
        initPage(obj.page);
    });

});