/**
 * @desc 过滤 txt 文本
 * @param $this 文本box jquery对象
 * @return shtml 新的文本
*/
export function filterTxt($this) {
    // 设置 sHtml ，给每个文字加个 class txt, 给每行加 txt-line
    let shtml = '';
    $this.find('div').each(function(index, elem){
        let str = $(this).html();
        let arr = []; // 存放拆分的字符串
        let code = '<div class="txt-line">';
        // console.log(str);
        // 如果是换行
        if( str.indexOf('<br>') !== -1) {
            arr = [str];
        }else {
            // 先去掉 <span class="txt"></span> 标签
            str = str.replace(/<span class="txt"( style=".+")?>/g, '');
            str = str.replace(/<\/span>/g, '');
            // 去掉空格
            str = str.replace(/&nbsp;/g, ' ');
            // 拆分数组
            arr = str.split('');
        }

        arr.forEach(function(elem, index) {
            // console.log(elem);
            if(elem === ' '){
                code += '&nbsp;';
            }else if(elem === '<br>') {
                code += '<br>';
            }else {
                code += `<span class="txt">${elem}</span>`;
            }
        });

        code += '</div>';
        shtml += code;
    });

    return shtml;
}