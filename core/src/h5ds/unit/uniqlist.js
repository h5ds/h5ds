import g from '../conf/global';

g.$doc.on('mousedown.uniqlist', '.mt-uniqlist', function(e){

    var xd = e.pageX,
        yd = e.pageY,
        _this = this,
        $this = $(this);

    $this.trigger('uniqstart')

    //点击其他区域，不拖动
    if(e.target.className == 'mt-uniqlist'){
        return
    }

    //处理 二次拖动clone的BUG
    if($(e.target).closest('.mt-uniq-clone')[0]){
        return
    }

    var $li = $(e.target).closest('li');

    if(!$li[0]){
        return;
    }

    var	left = parseInt($li.position().left, 10),
        top = parseInt($li.position().top, 10),
        liHei = $li.height();
    var startIndex = $li.index();

    var $clone = null;

    //使用clone 方法
    var cloneDom = function(){
        $li.addClass('mt-uniq-start').siblings('li').removeClass('mt-uniq-start');
        //使用clone
        $clone = $($li.clone());
        $clone.addClass('mt-uniq-clone').css({
            left: left,
            top: top,
            width: $li.width(),
            height: $li.height(),
            position: 'absolute'
        });
        $this.append($clone.prop('outerHTML'));
        $clone = $('.mt-uniq-clone')
    }

    //这里只能上下拖动
    var outHei = parseInt($li.css('margin-top'), 10) + parseInt($li.css('margin-bottom'), 10);
    var maxHei = liHei + outHei;

    var litop = $li.css('top');
    litop = (litop != 'auto' ? parseInt(litop, 10) : 0);
    
    //处理click事件
    var clickMark = true;
    var initCloneMark = false;

    g.$doc.on('mousemove.uniqlist', function(em){
        var move = litop + (em.pageY - yd);

        //允许2px的误差
        if(Math.abs(move) > 3){
            clickMark = false;
            //只执行一次
            if(!initCloneMark){
                initCloneMark = true;
                cloneDom();
                cloneDom = null;
            }
            $clone.css({
                left: left + (em.pageX - xd),
                top: top + (em.pageY - yd)
            });

            if(move > 0 && move > maxHei){
                if($li.next()[0]){
                    litop -= maxHei;
                    $li.before($li.next());
                }
            }else if(move < 0 && -move > maxHei){
                if($li.prev()[0]){
                    litop += maxHei;
                    $li.after($li.prev());
                }
            }
        }

    }).on('mouseup.uniqlist', function(e){
        var endleft = parseInt($li.position().left, 10),
            endtop = parseInt($li.position().top, 10);

        //click事件
        if(clickMark){
            $li.removeClass('mt-uniq-start');
            $this = null;
            $li = null;
        }else{
            $clone.animate({
                left: endleft,
                top: endtop
            }, 500, function(){
                $clone.remove();
                $li.removeClass('mt-uniq-start');
                let endIndx = $li.index();
                if(endIndx >= 0 && startIndex != endIndx){
                    $this.trigger('uniqend', {
                        from: startIndex,
                        to: endIndx
                    })
                }
                $clone = null;
                $this = null;
                $li = null;
            });
        }
        g.$doc.off('mousemove.uniqlist')
        g.$doc.off('mouseup.uniqlist')

    })
});