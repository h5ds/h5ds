import g from '../conf/global';

g.$doc.on('click', '.mt-switch', function(e){
    let $this = $(this);
    if($this.attr('data-val') == 'on'){
        $this.attr('data-val', 'off')
        $this.trigger('change', false)
    }else{
        $this.attr('data-val', 'on')
        $this.trigger('change', true)
    }
})

$.fn.switch = function(val){
    if(val){
        return $(this).attr('data-val');
    }else{
        $(this).attr('data-val', val).trigger('change', val);
    }
}