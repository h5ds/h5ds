// tpls 模板
import center from './tpls/center.html';
import fastbtns from './tpls/fastbtns.html';
import header from './tpls/header.html';
import layerlist from './tpls/layerlist.html';
import left from './tpls/left.html';
import right from './tpls/right.html';
import source from './tpls/source.html';
import exSource from './tpls/exSource.html';
import view from './tpls/view.html';

$(function() {
    $('body').html(header + left + source + exSource + center + right + layerlist + fastbtns + view);
});