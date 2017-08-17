

// 首页
console.log($);
//构造函数
function Index(){
    this.init();
}
//方法
Index.prototype = {
    //初始化
    init : function(){

        // 绑定事件
        this.bind();

        // 宽度自适应适配
        this.respWidth();

    },
    bind : function(){
        var that = this;
        that.bindSideBar();
        //左侧导航栏宽度切换
        $(".SN-btn").on("click",function(){
            var index = $(this).attr("data-index");
            var sideBar = $("#side-bar");
            $(this).addClass("now").siblings().removeClass("now");
            if(index === "1"){ //small
                $("#SN-btn-group").css("display","none");
                $(".side-item-text").css("display","none");
                sideBar.attr("class","small side-bar");
                $("#top-nav").css("left","50px");
                $("#content-wrapper").css("left","50px");
                setTimeout(function() {
                    $("#SN-btn-group").css("display","block");
                }, 300);
                that.bindSideBar();
            }else if(index === "2"){ //middle
                $("#SN-btn-group").css("display","none");
                $(".side-item-text").css("display","none");
                sideBar.attr("class","middle side-bar");
                $("#top-nav").css("left","113px");
                $("#content-wrapper").css("left","113px");
                setTimeout(function() {
                    $(".side-item-text").css("display","inline");
                    $("#SN-btn-group").css("display","block");
                }, 300);
                that.bindSideBar();
            }else if(index === "3"){ //large
                $("#SN-btn-group").css("display","none");
                $(".side-item-text").css("display","none");
                sideBar.attr("class","large side-bar");
                $("#top-nav").css("left","165px");
                $("#content-wrapper").css("left","165px");
                setTimeout(function() {
                    $(".side-item-text").css("display","inline");
                    $("#SN-btn-group").css("display","block");
                }, 300);
                that.bindSideBar();
            }
        });

        //弹出消息
        $("#alertBtn").on("click",function(){
            that.tranAlert("这是一条消息提醒");
        });

    },

    bindSideBar : function(){
        var that = this;
        // middle左侧栏hover效果
        // 事件委托在document上，以免下面off掉
        $(document).off().on("mouseenter",".middle.side-bar .side-item",function(){
            var offset = $(this).offset();
            $(".choseBox").css({
                "left" : offset.left,
                "top" : offset.top,
                "display" : "block",
                "zIndex" : "-1"
            })
        }).on("mouseleave",".middle.side-bar .side-item",function(){
            $(".choseBox").css({
                "display" : "none"
            })
        });

        //左侧栏点击效果
        $(".side-item").off().on("click",function(){
            var repeatFlag = 0;
            var url = $(this).attr("data-url");
            var title = $(this).attr("data-title");
            $(".top-nav-item").each(function(){
                var dUrl = $(this).attr("data-url");
                if( dUrl === url){
                    repeatFlag = 1;
                }
            });
            //防止tag重复点击
            if(repeatFlag == 1){
                return false
            }
            var tpl = '<li class="top-nav-item" data-url="' + url + '">' +
                          title +
                          '<i class="close"></i>' +
                      '</li>' ;
            $(tpl).insertBefore("#close-all");        
            $(".top-nav-item").eq(-2).addClass("now").siblings().removeClass("now");
            //append页面
            var objTpl = '<object class="contentObjectBox" data="'+ url +'" type=""></object>';
            $(".content-wrapper").append(objTpl);
            $('.contentObjectBox[data="'+ url +'"]').css("zIndex","100").siblings().css("zIndex","-10");
            //绑定tag页事件
            that.bindTag();
        });

    },
    // 绑定tag页事件
    bindTag : function(){
        var that = this;
        //顶部导航选中切换
        $(".top-nav-item").off().on("click",function(){
            var cur = $(this);
            //当是"关闭所有窗口"或者是"当前"的时候return
            var flag = cur.attr("data-flag");
            if( !flag && cur.attr("class") != "top-nav-item now"){
                $(this).addClass("now").siblings().removeClass("now");
                that.changeTag(cur);
            }else{
                return false
            }
        });
        //顶部导航删除标签
        $(".top-nav-item .close").off().on("click",function(){
            var fa = $(this).parent();
            var url = fa.attr("data-url");
            $(".contentObjectBox").each(function() {
                var dataUrl = $(this).attr("data");
                if( dataUrl === url ){
                    $(this).remove();
                }
            }).eq(1).css("zIndex","100");
            fa.remove();
            var restF = $(".top-nav-item").eq(0) ;
            var flag = restF.attr("data-flag");
            if(!flag){
                restF.addClass("now");
            }
        });
        //关闭所有标签
        $("#close-all").off().on("click",function(){
            $(this).siblings().remove();
            $("#content-wrapper").empty();
        });

    },

    // 切换标签
    changeTag : function(cur){
        var url = cur.attr("data-url");
        var repeatFlag = 0;
        //检查是否重复append
        $(".contentObjectBox").each(function(){
            var data = $(this).attr("data");
            if(data == url){
                repeatFlag = 1;//重复append了
            }
        });
        if(repeatFlag == 1){
            //只显示当前tag
            $(".contentObjectBox").each(function(){
                var data = $(this).attr("data");
                if(data == url){
                    $(this).css("zIndex","100").siblings().css("zIndex","-10");
                }
            });
            return false
        }else{
            var objTpl = '<object class="contentObjectBox" data="'+ url +'" type=""></object>';
            $(".content-wrapper").append(objTpl);
        }
        //只显示当前tag
        $(".contentObjectBox").each(function(){
            var data = $(this).attr("data");
            if(data == url){
                $(this).css("zIndex","100").siblings().css("zIndex","-10");
            }
        });
    },

    //消息提醒
    tranAlert : function(mes){
        $("#alertBox .alertContent").text(mes);
        $("#alertBox").animate({
            "top" : "12px"
        });

        setTimeout(function(){
            $("#alertBox").animate({
                "top" : "-100px"
            });
        },5000);
        //关闭按钮
        $("#alertBox .alert-close-icon").on("click",function(){
            $("#alertBox").animate({
                "top" : "-100px"
            });
        });
    },

    respWidth :　function(){
        
        $(window).on("resize",function(){

            console.log(111);

        });

    }

}

$(function(){
    var index = new Index();
})

























