import g from '../conf/global';

g.$doc.on('mousedown.drag', '.mt-drag', function(e) {
    var xd = e.pageX,
        yd = e.pageY,
        _this = this,
        $this = $(this),
        left = $this.offset().left,
        top = $this.offset().top;

    var set = {
        limit: true, //边界限制
        undrag: []
    }
    var dragset = $this.attr('data-dragset');
    dragset = (dragset ? JSON.parse(dragset) : {});
    set = $.extend(set, dragset);

    //undrag 区域设置,不拖动
    if (set.undrag.length != 0) {
        for (let i = 0; i < set.undrag.length; i++) {
            if ($(e.target).closest(set.undrag[i])[0]) {
                return
            }
        }
    }

    //限制边界
    if (set.limit) {
        var wid = $this.width(),
            hei = $this.height(),
            outLeft = $this.parent().offset().left,
            outTop = $this.parent().offset().top,
            outWid = $this.parent().width(),
            outHei = $this.parent().height();
    }

    g.$doc.on('mousemove.drag', function(em) {

        let x = left + (em.pageX - xd),
            y = top + (em.pageY - yd);

        //区域限制
        if (set.limit) {
            if (x < outLeft) {
                x = outLeft
            } else if (x > outWid - wid) {
                x = outWid - wid;
            }

            if (y < outTop) {
                y = outTop
            } else if (y > outHei - hei) {
                y = outHei - hei
            }
        }

        $this.css({
            left: x,
            top: y
        });

    }).on('mouseup.drag', function(e) {
        g.$doc.off('mousemove.drag mouseup.drag')
    })
});