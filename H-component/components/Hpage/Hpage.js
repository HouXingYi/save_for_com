
;(function($){
    function Hpage(opts,container){
        var that = this;
        this.container = container;
        //默认选项
        this.defaultsOpts = {
            numForEachPage : 10,  // 每页数据条数
            initPage : 1,  //初始化页数
            allNum : 10, //总页数
            render : function(){}  //返回数据以供使用
        } 
        this.opts = $.extend({},that.defaultsOpts,opts);
        this.len = this.opts.allNum; //总共几页
        this.curIndex = this.opts.initPage;//当前页数
        this.numForEachPage = this.opts.numForEachPage;
        this.init();
    }
    Hpage.prototype = {
        init : function(){
            var that = this;
            that.initBoxHtml();
            that.bind();
            that.changeIndex(that.opts.initPage,that.container.find('.sePageItem[index="'+ that.opts.initPage +'"]'));
        },
        refresh : function(opts){
            var that = this;
            this.opts = $.extend({},that.opts,opts);
            this.len = this.opts.allNum; //总共几页
            this.curIndex = this.opts.initPage;//当前页数
            this.numForEachPage = this.opts.numForEachPage;
            that.initBoxHtml();
            that.changeIndex(that.opts.initPage,that.container.find('.sePageItem[index="'+ that.opts.initPage +'"]'));
        },
        bind :function(){
            var that = this;
            //一页几条
            this.container.on("keydown", ".lenInput" ,function(e){
                if(e.keyCode == 13){
                    that.numForEachPage = parseInt($(this).val());
                    that.refresh({
                        numForEachPage : that.numForEachPage
                    });
                }
            });
            //到第几页
            this.container.on("keydown", ".trunInput" ,function(e){
                if(e.keyCode ==13){
                    var index = parseInt($(this).val());
                    if(index > that.len){
                        index = that.len
                    }
                    that.changeIndex(index,that.container.find('.sePageItem[index="'+ index +'"]'))
                }
            });
            //点击页数
            this.container.on("click", ".sePageItem[index]" ,function(e){
                var index = $(this).attr("index");
                var sta = $(this).attr("sta");
                if( index == "sus1" || index == "sus2" || sta == "now"){
                    return false
                }else{
                    that.changeIndex(index,$(this));
                }
            });
            //下一页
            this.container.on("click", ".sePageItem.RightArr" ,function(e){
                var index = that.curIndex + 1;
                if( index > that.len ){
                    index = 1;
                }
                that.changeIndex(index,that.container.find('.sePageItem[index="'+ index +'"]'));
            });
            //上一页
            this.container.on("click", ".sePageItem.leftArr" ,function(e){
                var index = that.curIndex - 1;
                if( index < 1 ){
                    index = that.len;
                }
                that.changeIndex(index,that.container.find('.sePageItem[index="'+ index +'"]'));
            });
        },
        // 跳转到指定页面
        changeIndex : function(index,item){
            var that = this;
            var sta = item.attr("sta");
            index = parseInt(index);
            this.curIndex = index;
            if( index <= 4){
                this.container.find(".sePageItem[index]").each(function(){
                    var i = $(this).attr("index");
                    if( i == 1||i==that.len||i =="sus2"||i<6){
                        $(this).css("display","inline-block");
                    }else{
                        $(this).css("display","none");
                    }
                });
                item.attr("sta","now");
                item.siblings().each(function(){
                    if($(this).attr("sta") == "" || $(this).attr("sta") == "now" ){
                        $(this).attr("sta","");
                    }
                })
                if( that.opts.allNum < 7 ){
                    this.container.find(".sePageItem[index=sus2]").css("display","none");
                }
            }else if( index > 4  && index < that.len - 3){
                this.container.find(".sePageItem[index]").each(function(){
                    var i = $(this).attr("index");
                    if( i == 1||i == "sus1"||i =="sus2"||i==that.len||(i > index-3 &&i < index+3)){
                        $(this).css("display","inline-block");
                    }else{
                        $(this).css("display","none");
                    }
                });
                item.attr("sta","now");
                item.siblings().each(function(){
                    if($(this).attr("sta") == "" || $(this).attr("sta") == "now" ){
                        $(this).attr("sta","");
                    }
                })
            }else{
                this.container.find(".sePageItem[index]").each(function(){
                    var i = $(this).attr("index");
                    if( i == 1||i =="sus1"||i==that.len|| i>that.len - 5){
                        $(this).css("display","inline-block");
                    }else{
                        $(this).css("display","none");
                    }
                });
                item.attr("sta","now");
                item.siblings().each(function(){
                    if($(this).attr("sta") == "" || $(this).attr("sta") == "now" ){
                        $(this).attr("sta","");
                    }
                })
                if( that.opts.allNum < 7 ){
                    this.container.find(".sePageItem[index=sus1]").css("display","none");
                }
            }
            that.opts.render(that.curIndex,that.numForEachPage,that.len);
        },
        initBoxHtml : function(){
            var that = this;
            that.tpl = 
            '<ul class="hpage">' + 
                '<li class="len">' +　
                    '<input type="text" class="lenInput" value="'+ that.numForEachPage +'">条/页' +
                '</li>' +
                '<li class="sePage">' +
                    '<span class="sePageItem leftArr"><</span>' +
                    '<span class="sePageItem RightArr">></span>' +
                '</li>' + 
                '<li class="turnPage">' + 
                    '到第<input type="text" value="1" class="trunInput">页' +
                    // '<span class="turnBtn">跳转</span>' +                    
                '</li>' +
            '</ul>' ;
            that.itemTpl = '';
            for(var i = 0 ;i<that.opts.allNum ; i++){
                if(i == 0){
                    that.itemTpl += '<span class="sePageItem num" index="1" sta="now">1</span>'; 
                    that.itemTpl += '<span class="sePageItem num" index="sus1" sta="" style="display:none;">...</span>'; 
                }else if( i>0 && i < that.opts.allNum - 1 ){   
                    if(i<5){
                        that.itemTpl += '<span class="sePageItem num" index="'+ (i+1) +'" sta="">' + (i+1) + '</span>' ;
                    }else{
                        that.itemTpl += '<span class="sePageItem num" index="'+ (i+1) +'" sta="" style="display:none;">' + (i+1) + '</span>' ;
                    }
                }else if( i== that.opts.allNum - 1){
                    that.itemTpl += '<span class="sePageItem num" index="sus2" sta="">...</span>' ;
                    that.itemTpl += '<span class="sePageItem num" index="'+ (i+1) +'" sta="">' + (i+1) + '</span>' ;
                }
            }
            this.container.html(that.tpl);
            this.container.find(".leftArr").after(this.itemTpl);
        }        
    }
    // 注册
    $.fn.hpage = function(opt){
        return new Hpage(opt,this);
    }

})(jQuery);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    