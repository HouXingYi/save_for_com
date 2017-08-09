
// 首页

console.log($);

function Index(){
    this.init();
}

Index.prototype = {
    init : function(){
        this.bind();
    },
    bind : function(){
        $(".SN-btn").on("click",function(){
            var index = $(this).attr("data-index") - 1;
            var dis = - (index * 100) ;
            $(".side-nav-move").css("left", dis);
            $(this).addClass("now").siblings().removeClass("now");
        });
    }
}


$(function(){
    var index = new Index();
})

























