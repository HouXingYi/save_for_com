
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
    
            // console.log(this.opts);
    
            this.tpl = 
            '<ul class="hpage">' + 
                '<li class="len">' +　
                    '<input type="text" value="'+ this.opts.numForEachPage +'">条/页' +
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
    
    
            this.itemTpl = '';
    
            for(var i = 0 ;i<this.opts.allNum ; i++){
    
                if(i == 0){
                    this.itemTpl += '<span class="sePageItem num now">1</span>'; 
                }else if(i>3){
                    this.itemTpl += '<span class="sePageItem num">' +  + '</span>' ;
                }
    
    
            }
    
            // '<span class="sePageItem num">2</span>' +
            // '<span class="sePageItem num">3</span>' +
            // '<span class="sePageItem num">4</span>' +
            // '<span class="sePageItem num sus">...</span>' +
            // '<span class="sePageItem num">20</span>' ;
    
            this.init();
            
        }
    
        Hpage.prototype = {
            init : function(){
                var that = this;
                this.container.append(that.tpl);
            }
        }
    
        $.fn.hpage = function(opt){
            return new Hpage(opt,this);
        }
    
    })(jQuery)
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    