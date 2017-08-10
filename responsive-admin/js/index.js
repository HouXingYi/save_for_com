


// 首页

console.log($);

function Index(){
    this.init();
}
Index.prototype = {

    init : function(){
        this.bind();

        //左侧导航栏背景框初始化
        var Foffset = $(".side-item").eq(0).offset();
        $(".choseBox").css({
            "left" : Foffset.left,
            "top" : Foffset.top,
            "display" : "block"
        });

    },
    bind : function(){

        var that = this;

        //左侧导航栏左右切换
        $(".SN-btn").on("click",function(){
            var index = $(this).attr("data-index") - 1;
            var dis = - (index * 100) ;
            $(".side-nav-move").css("left", dis);
            $(this).addClass("now").siblings().removeClass("now");
        });

        //左侧导航栏选中效果
        $(".side-item").on("click",function(){
            var offset = $(this).offset();
            $(".choseBox").css({
                "left" : offset.left,
                "top" : offset.top
            })
        });

        //顶部导航选中切换
        $(".top-nav-item").on("click",function(){
            var cur = $(this);
            var flag = cur.attr("data-flag");
            if( !flag ){
                $(this).addClass("now").siblings().removeClass("now");
            }else{
                return false
            }
        });

        //顶部导航删除标签
        $(".top-nav-item .close").on("click",function(){
            var fa = $(this).parent();
            fa.remove();
            var restF = $(".top-nav-item").eq(0) ;
            var flag = restF.attr("data-flag");
            if(!flag){
                restF.addClass("now");
            }
        });


        //关闭所有
        $("#close-all").on("click",function(){
            $(this).siblings().remove();
        });
        //弹出消息
        $("#alertBtn").on("click",function(){
            that.tranAlert("这是一条消息提醒");
        });


    },

    //消息提醒
    tranAlert : function(mes){

        $("#alertBox .alertContent").text(mes);
        $("#alertBox").animate({
            "top" : "12px"
        });
        //关闭按钮
        $("#alertBox .alert-close-icon").on("click",function(){
            $("#alertBox").animate({
                "top" : "-100px"
            });
        });

    }

}

$(function(){
    var index = new Index();
})

























