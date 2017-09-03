import g from '../conf/global';

//提示信息
g.$doc.off("click.toggle").on("click.toggle","[data-toggle]",function(){
    var $this = $(this);
    var data = JSON.parse($this.attr("data-toggle"));
    for(var i=0; i<data.length; i++){
    	$(data[i].dom).toggleClass(data[i].class);
    }
});