import {
  getMp3
} from '../server/ajax.js'; // ajax
import {
  newPage,
  PAGE_SIZE
} from './imgSource.js';

// 我的图片
export function Mp3List(p) {
  getMp3({
    pageSize: p.pagesize,
    pageNum: p.page
  }).done((res) => {
    if (res.success) {
      console.log('mp3=>', res);
      let str = '';
      for (let i = 0; i < res.data.length; i++) {
        str += `<li class="item" data-url="${res.data[i].url}">
                            <span class="name"><span class="mp3-play-icon"><i></i><i></i><i></i><i></i></span> ${res.data[i].name}</span>
                            <span class="try">试听</span>
                            <span class="use">使用</span>
                        </li>`;
      }
      $('#mp3list').empty().html(str);

      // 分页
      let $imgPagelist = $('#mp3pagelist');
      if (!$imgPagelist.find('.mt-pagelist')[0]) {
        // 初始化分页
        newPage(res.count, $imgPagelist, Mp3List);
      }

    } else {
      console.error('获取用户图片失败！');
    }
  })
}

// 我的图片
export function sysMp3() {
  Mp3List({
    pagesize: PAGE_SIZE,
    page: 1
  });
}
