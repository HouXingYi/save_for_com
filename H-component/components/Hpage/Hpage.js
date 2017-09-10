
;(function($){

    function Hpage(opts,container){
        var that = this;
        this.container = container;
        //默认选项
        this.defaultsOpts = {
            numForEachPage : 10,  // 每页数据条数
            allNum : 10 //总页数
        } 
        this.opts = $.extend({},that.defaultsOpts,opts);
        this.init();
    }
    Hpage.prototype = {
        init : function(){
            var that = this;
            that.initBoxHtml();
            that.bind();
        },
        bind :function(){

            console.log(11);

            






        },
        initBoxHtml : function(){
            var that = this;
            that.tpl = 
            '<ul class="hpage">' + 
                '<li class="len">' +　
                    '<input type="text" value="'+ that.opts.numForEachPage +'">条/页' +
                '</li>' +
                '<li class="sePage">' +
                    '<span class="sePageItem leftArr"><</span>' +
                    '<span class="sePageItem RightArr">></span>' +
                '</li>' + 
                '<li class="turnPage">' + 
                    '到第<input type="text" value="1">页' +
                    '<span class="turnBtn">跳转</span>' +                    
                '</li>' +
            '</ul>' ;
            that.itemTpl = '';
            for(var i = 0 ;i<that.opts.allNum ; i++){
                if(i == 0){
                    that.itemTpl += '<span class="sePageItem num now">1</span>'; 
                }else if( i==3 ){   
                    that.itemTpl += '<span class="sePageItem num sus">...</span>' ;
                }else if( i < 3||i== that.opts.allNum - 1){
                    that.itemTpl += '<span class="sePageItem num">' + (i+1) + '</span>' ;
                }
            }
            this.container.append(that.tpl);
            this.container.find(".leftArr").after(this.itemTpl);
        }        

    }
    // 注册
    $.fn.hpage = function(opt){
        return new Hpage(opt,this);
    }
})(jQuery);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    