
//构造函数
function Index(){
    var that = this;
    this.nowObject = $(".contentObjectBox[tag=main]");
    this.Sconfirm = function(option){
        swal(
            {
                title: "提示",
                text: option.text,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: option.confirmColor,
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnConfirm: false
            },
            function(){
                option.callback();
                swal.close();
                return true
            }
        );
    }
    this.themeColor = "#519ab4";  //默认主题颜色
    //子页面需要用的属性与方法
    that.nowObject[0].contentWindow.document.themeColor = that.themeColor;
    that.nowObject[0].contentWindow.document.Sconfirm = that.Sconfirm;
    this.init();
}
//原型方法
Index.prototype = {
    //初始化
    init : function(){
        // 绑定事件
        this.bind();
        // 宽度自适应适配
        this.respWidth();
        
    },
    bind : function(){
        //左侧导航栏宽度切换
        this.sideChange();
        //左侧栏事件绑定
        this.bindSideBar();  //事件委托
        //刷新功能
        this.bindRefresh();    
        //主题功能
        this.bindTheme();

        holmes({
            input: '#searchInput', // default: input[type=search]
            find: 'body *', // querySelectorAll that matches each of the results individually
            class: {
                visible: 'visible',
                hidden: 'hidden'
            },
            mark:true,
            onHidden(el) {  
                console.log('hidden', el);
            },
            onFound(el) { //Callback for when items are found after being empty.
                console.log('found', el);
            },
            onInput(el) {
                console.log('input', el);
            },
            onVisible(el) {   
                console.log('visible', el);
            },
            onEmpty(el) {
                console.log('empty', el);
            }
        })


    },
    sideChange : function(){
        var that = this;
        
        //左侧栏宽度的切换
        var sideBar = $("#side-bar");
        $(".SN-btn").on("click",function(){
            var index = $(this).attr("data-index");
            $(this).addClass("now").siblings().removeClass("now");
            if(index === "1"){ //small
                change("small");
            }else if(index === "2"){ //middle
                change("middle");
            }else if(index === "3"){ //large
                change("large");
            }
        });
        function change(type){
            $("#SN-btn-group").css("display","none");
            $(".side-item-text").css("display","none");
            sideBar.attr("class",type +" side-bar");
            if(type == "small"){
                $("#top-nav").css("left","50px");
                $("#content-wrapper").css("left","50px");
                setTimeout(function() {
                    $("#SN-btn-group").css("display","block");
                }, 300);
            }else if(type == "middle"){
                $("#top-nav").css("left","113px");
                $("#content-wrapper").css("left","113px");
                setTimeout(function() {
                    $(".side-item-text").css("display","inline");
                    $("#SN-btn-group").css("display","block");
                }, 300);
            }else if(type == "large"){
                $("#top-nav").css("left","165px");
                $("#content-wrapper").css("left","165px");
                setTimeout(function() {
                    $(".side-item-text").css("display","inline");
                    $("#SN-btn-group").css("display","block");
                }, 300);
            }
        }
    },
    bindSideBar : function(){
        var that = this;
        // middle左侧栏hover效果
        // 事件委托在document上，dom变化也不会丢失事件,类似于拦截所有冒泡上来的事件
        $(document).on("mouseenter",".middle.side-bar .side-item",function(){
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
        // 左侧栏点击绑定
        $(document).on("click",".side-item",function(){
            var repeatFlag = 0;
            var url = $(this).attr("data-url");
            var title = $(this).attr("data-title");
            $(".top-nav-item").each(function(){
                var dUrl = $(this).attr("data-url");
                if( dUrl === url){
                    repeatFlag = 1; //重复点击了
                }
            });
            //防止tag重复点击
            if(repeatFlag == 1){
                return false
            }
            that.appendObject(url,title);
        });

    },
    // 加入页面
    appendObject : function(url,title){
        var that = this;
        var topItemLength = $(".top-nav-item").length ;
        if(topItemLength > 7){
            // var r = confirm("打开窗口个数已经达到6个，新开窗口将会关闭第一个窗口，是否继续?");
            // if( r === true){
            //     var Fitem = $(".top-nav-item").eq(1);
            //     that.removeObject(Fitem);
            //     append();
            //     return true
            // }else{
            //     return false
            // }
            //用插件的话流程控制麻烦点，但样式好看
            that.Sconfirm({
                text: "打开窗口个数已经达到6个，新开窗口将会关闭第一个窗口，是否继续?",
                confirmColor : that.themeColor,
                callback : function(){
                    var Fitem = $(".top-nav-item").eq(1);
                    that.removeObject(Fitem);
                    append();
                }
            });
            return false
        }
        append()
        function append(){
            //append顶部item，并设置now
            var tpl =   '<li class="top-nav-item" data-url="' + url + '">' +
                                title +
                            '<i class="close"></i>' +
                        '</li>' ;
            $(tpl).insertBefore("#close-all");        
            $(".top-nav-item").eq(-2).addClass("now").siblings().removeClass("now");
            //append页面，并设置zindex
            var objTpl = '<object class="contentObjectBox" data="'+ url +'" type=""></object>';
            $(".content-wrapper").append(objTpl);
            $('.contentObjectBox[data="'+ url +'"]').css("zIndex","100").siblings().css("zIndex","-10");
            that.nowObject = $('.contentObjectBox[data="'+ url +'"]');
            //绑定tag页事件
            that.bindTag();
        }
    },
    // 绑定tag页事件
    bindTag : function(){
        var that = this;
        //顶部导航选中切换
        $(document).on("click",".top-nav-item",function(){
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
        $(document).on("click",".top-nav-item .close",function(e){
            e.stopPropagation();   //防止冒泡
            var fa = $(this).parent();
            that.removeObject(fa);
        });
        //关闭所有标签
        $(document).on("click","#close-all",function(){
            $(this).siblings().each(function(){
                var tag = $(this).attr("tag");
                if(tag != "main"){
                    $(this).remove();
                }else{
                    $(this).addClass("now");
                }
            });
            $("#content-wrapper").find(".contentObjectBox").each(function(){
                var tag = $(this).attr("tag");
                if(tag != "main"){
                    $(this).remove();
                }else{
                    $(this).css("z-index","100");
                    that.nowObject = $(".contentObjectBox[tag=main]");
                }
            });
        });
    },

    removeObject : function(item){
        var that = this;
        var itemName = item.attr("class");
        var url = item.attr("data-url");
        var objectLen = $(".contentObjectBox").length;

        if( item.attr("class") == "top-nav-item now" ){
            removeItemAndObject("now");
        }else{
            removeItemAndObject("notNow");
        }
        function removeItemAndObject(flag){
            if(flag == "now"){
                $(".contentObjectBox").each(function() {
                    var dataUrl = $(this).attr("data");
                    if( dataUrl === url ){
                        that.nowObject = $(this).prev();
                        $(this).prev().css("z-index","100").siblings().css("z-index","-10");
                        $(this).remove();
                    }
                });
                var prevItem = item.prev();
                item.remove();
                prevItem.addClass("now");
            }else if(flag == "notNow"){
                $(".contentObjectBox").each(function() {
                    var dataUrl = $(this).attr("data");
                    if( dataUrl === url ){
                        $(this).remove();
                    }
                });
                item.remove();
            }
        }
    },
    // 切换标签
    changeTag : function(cur){
        var that = this;
        var url = cur.attr("data-url");
        // var repeatFlag = 0;
        //检查是否重复append
        // $(".contentObjectBox").each(function(){
        //     var data = $(this).attr("data");
        //     if(data == url){
        //         repeatFlag = 1;//重复append了
        //     }
        // });
        // if(repeatFlag == 1){
            //只显示当前tag
            $(".contentObjectBox").each(function(){
                var data = $(this).attr("data");
                if(data == url){
                    $(this).css("zIndex","100").siblings().css("zIndex","-10");
                    that.nowObject = $(this);
                }
            });
            // return false
        // }else{
        //     console.log(3);
        //     var objTpl = '<object class="contentObjectBox" data="'+ url +'" type=""></object>';
        //     $(".content-wrapper").append(objTpl);
        //     //只显示当前tag
        //     $(".contentObjectBox").each(function(){
        //         var data = $(this).attr("data");
        //         if(data == url){
        //             $(this).css("zIndex","100").siblings().css("zIndex","-10");
        //             that.nowObject = $(this);
        //         }
        //     });
        // }
        
    },
    respWidth :　function(){
        $(window).on("resize",function(){
            var w = $(this).width();
            var topNavLeft = parseInt($("#top-nav").css("left"));
            var conWrapLeft = parseInt($("#content-wrapper").css("left"));
            if( w < 768 && conWrapLeft > 0 && topNavLeft > 0){
                $("#top-nav").css("left",0);
                $("#content-wrapper").css("left",0);
            }else if(w > 768 ){
                var sideWidth = $("#side-bar").width();
                $("#top-nav").css("left",sideWidth);
                $("#content-wrapper").css("left",sideWidth);
            }

        });

        //窄屏幕模式下左侧导航缩放
        $("#menuIcon").on("click",function(){
            var status = $(this).attr("status");
            var topNav = $("#top-nav");
            var content = $("#content-wrapper");
            var sideBar = $("#side-bar");
            if(status == "off"){
                var sideWidth = parseInt(sideBar.css("width")); 
                topNav.css("left",sideWidth);
                content.css("left",sideWidth);
                $(this).attr("class","menuIcon on");
                $(this).attr("status","on");
            }else if(status == "on"){
                topNav.css("left",0);
                content.css("left",0);
                $(this).attr("class","menuIcon off");
                $(this).attr("status","off");
            }
        });
    },
    //消息提醒alert
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
    
    bindRefresh : function(){
        var that = this;
        $("#refresh").on("click",function(){
            var doc = that.nowObject[0].contentWindow.document;
            doc.location.reload();
        });
    },
    bindTheme : function(){
        var that = this;

        // $("#theme-icon").on("click",function(){
        //     var display = $(".themeBox").css("display");
        //     if( display === "none" ){
        //         $(".themeBox").css("display","block");
        //     }else if( display === "block" ){
        //         $(".themeBox").css("display","none");
        //     }
        // })
        
        //改为hover体验更好
        $("#theme-icon,.themeBox").hover(function(){
            $(".themeBox").css("display","block");
        },function(){
            $(".themeBox").css("display","none");
        })

        $(".skinTheme").on("click",function(){
            var theme = $(this).attr("theme");
            var changeColor = that.nowObject[0].contentWindow.document.changeColor;
            if(theme == "blue"){
                $("body").attr("class","blue");
                that.themeColor = "#519ab4";  
                that.nowObject[0].contentWindow.document.themeColor = "#519ab4";
            }else if(theme == "green"){
                $("body").attr("class","green");
                that.themeColor = "#38a547";  
                that.nowObject[0].contentWindow.document.themeColor = "#38a547";
            }else if(theme == "pink"){
                $("body").attr("class","pink");
                that.themeColor = "#e662a5";  
                that.nowObject[0].contentWindow.document.themeColor = "#e662a5";
            }else if(theme == "orange"){
                $("body").attr("class","orange");
                that.themeColor = "#f2a45b";  
                that.nowObject[0].contentWindow.document.themeColor = "#f2a45b";
            }else if(theme == "red"){
                $("body").attr("class","red");
                that.themeColor = "#c83939";  
                that.nowObject[0].contentWindow.document.themeColor = "#c83939";
            }
            if( changeColor ){
                changeColor(theme,that.themeColor);
            }
        });
    }

}

$(function(){
    var index = new Index();
})



