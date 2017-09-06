
;(function($){

    function WorkTop(){
        //默认控件的坐标信息   
        this.oldItems ={
            list : [
                {
                    x: 0, y: 0, width: 3, height: 1 , 
                    smallW:1 , smallH:1 ,
                    largeW: 3 , largeH: 1 ,
                    status: "large" , index:0
                },
                {
                    x: 3, y: 0, width: 1, height: 1 , 
                    smallW:1 , smallH:1 ,
                    largeW:1 , largeH:1 ,
                    status: "large" , index:1
                },
                {
                    x: 4, y: 0, width: 1, height: 1 , 
                    smallW:1 , smallH:1 ,
                    largeW:1 , largeH:1 ,
                    status: "large" , index:2
                },
                {
                    x: 0, y: 1, width: 3, height: 2 , 
                    smallW:1 , smallH:1 ,
                    largeW:3 , largeH:2 ,
                    status: "large" , index:3
                },
                {
                    x: 4, y: 1, width: 2, height: 2 , 
                    smallW:1 , smallH:1 ,
                    largeW:2 , largeH:2 ,
                    status: "large" , index:4
                }
            ]
        } 
        //新的控件的坐标信息
        this.newItems ={
            list : []
        } 
        //右侧的添加项数组
        this.addItems ={
            list : [
            ]
        }
        for(var i = 0;i<20;i++){
            var item = {};
            if(i%2 == 0){
                item.largeW = 2;
                item.largeH = 2;
                item.smallH = 1;
                item.smallW = 1;
                item.index = i;
            }else{
                item.largeW = 3;
                item.largeH = 3;
                item.smallH = 1;
                item.smallW = 1;
                item.status = "large";
                item.index = i;
            }
            this.addItems.list.push(item);
        }
        //drag配置
        this.opt = {
            acceptWidgets : true  //允许别的页面拖控件过来
            ,float : false  // 东西都会往上顶
            ,draggable : {
                handle: '.drag-handle-box'  //drag控件的名称
            }
            ,resizable : {
                handles: 'none-resize'  //resize控件的名称
            },
            // cellHeight : $(window).height()/4 - 10 + "px",
            cellHeight : 'auto' //高由宽来算
            ,verticalMargin : 0
            ,forDropOnDragCallBack : this.forDropOnDragCallBack
            ,forDropOnDragList : this.addItems.list
        }
        this.opt2 = {
            acceptWidgets : false  
            ,float : false, //东西都会往上顶
            cellHeight : 'auto', //高由宽来算
            disableResize :true,
            width: 3
        }
        //如果有localStorage存储的话，覆盖旧的坐标信息
        if(window.localStorage){
            var storage = window.localStorage;
            if(storage.items){
                this.oldItems = JSON.parse(storage.items);
            }
        }
        this.init();
    }
    WorkTop.prototype = {
        init : function(){
            var that = this;
            //渲染左右box
            this.initBox();
            //初始化插件
            this.gsJq = $('#grid-stack1').gridstack(this.opt);
            this.grid = this.gsJq.data('gridstack'); 
            this.gsJq2 = $('#grid-stack2').gridstack(this.opt2);
            this.grid2 = this.gsJq2.data('gridstack');
            //绑定各种事件
            this.bind();
            //绑定编辑模块事件
            this.bindPanelEdit();

            //绑定懒加载
            that.lazyLoad();

        },
        bind : function(){
            var that = this;
            //自定义
            $(".custom.control-item").on("click",function(){
                that.switchControl("on");
                //enable
                that.grid.enable();  
                $(".grid-stack-item .drag-handle-box").css("display","block");
                $(".grid-stack-item .edit-handle-box").css("display","block");
            });
            //添加模块添加模块
            $(".add.control-item").on("click",function(){
                var marginl = parseInt($(".box").css("margin-left"));
                if(marginl < 100){
                    $(".box").css({
                        "margin-left" : marginl + "px",
                        "width" : "630px"
                    })
                    $(".box2").css({
                        "right" : "5px" 
                    })
                    setTimeout(function(){
                        that.grid.cellHeight(that.grid.cellWidth(), false);  //调整高度
                    },600);
                }else{
                    $(".box2").css({
                        "right" : "5px" 
                    })
                }
            });
            //取消
            $(".cancel.control-item").on("click",function(){
                that.grid.disable();
                $(".grid-stack-item .drag-handle-box").css("display","none");
                $(".grid-stack-item .edit-handle-box").css("display","none");
                that.resetBox();
                that.switchControl("off");
                var marginl = parseInt($(".box").css("margin-left"));
                if(marginl < 100){
                    $(".box").css({
                        "margin-left" : "",
                        "margin" : "auto",
                        "width" : "900px"
                    })
                    $(".box2").css({
                        "right" : "-205px" 
                    })
                    setTimeout(function(){
                        that.grid.cellHeight(that.grid.cellWidth(), false);  //调整高度
                    },600);
                }else{
                    $(".box2").css({
                        "right" : "-205px" 
                    })
                }
            });
            //保存
            $(".save.control-item").on("click",function(){
                that.grid.disable();
                $(".grid-stack-item .drag-handle-box").css("display","none");
                $(".grid-stack-item .edit-handle-box").css("display","none");
                that.getNewSet();
                that.switchControl("off");
                alert("保存成功");
                window.location.reload();  
            });
            //当box1被加入的时候
            $('#grid-stack1').on('added', function(event, item) {
                var tpl = $("#newItemCon").html();
                var template = _.template(tpl);
                var html = template();
                item[0].el.html(html);
                var itemObj = item[0].el.find("object");
                itemObj.attr("data",itemObj.attr("data-src"));
            });
        },
        forDropOnDragCallBack: function(el,self){
            if(el){
                var index = el.attr("data-index");
                var list = self.opts.forDropOnDragList;
                var h = list[index].largeH;
                var w = list[index].largeW;
                self.resize(el,w,h);
                el.width(self.placeholder.width() + "px");
                el.height(self.placeholder.height() + "px");
            }
        },
        initBox : function(){
            var that = this;
            //模板引擎渲染并插入
            var tpl = $("#gridStackTpl").html();
            var template = _.template(tpl);
            var html = template({list: that.oldItems.list});
            $("#grid-stack1").html(html);
            //渲染右页面
            var addTpl = $("#addItemBox").html();
            var addTemplate = _.template(addTpl);
            var addHtml = addTemplate({list:that.addItems.list});
            $("#grid-stack2").html(addHtml);
        },
        //取消改变
        resetBox : function(){
            var that = this;
            var pos = that.oldItems.list;
            $("#grid-stack1 .grid-stack-item").each(function(i,item){
                if(pos[i]){
                    that.grid.move($(item),parseInt(pos[i].x),parseInt(pos[i].y));
                    that.grid.resize($(item),parseInt(pos[i].width),parseInt(pos[i].height));
                }else{
                    that.grid.removeWidget($(item));
                }
            })
        },
        getNewSet : function(){
            var that = this;
            $(".grid-stack#grid-stack1 .grid-stack-item").each(function(i,item){
                var pos = {}
                if( $(item).css("display") == "none" ){
                    return true
                }
                pos.x = $(item).attr("data-gs-x"); 
                pos.y = $(item).attr("data-gs-y"); 
                pos.width = $(item).attr("data-gs-width"); 
                pos.height = $(item).attr("data-gs-height"); 
                pos.smallW = $(item).attr("data-smallw"); 
                pos.smallH = $(item).attr("data-smallh"); 
                pos.largeW = $(item).attr("data-largew"); 
                pos.largeH = $(item).attr("data-largeh"); 
                pos.status = $(item).attr("data-status"); 
                pos.index = $(item).attr("data-index"); 
                that.newItems.list.push(pos);
            })
            var stringItems = JSON.stringify(that.newItems);
            var storage= window.localStorage;
            storage.items = stringItems;
        },
        switchControl : function(btn){
            if(btn == "on"){
                $(".custom.control-item").css("display","none");
                $(".add.control-item").css("display","block");
                $(".cancel.control-item").css("display","block");
                $(".save.control-item").css("display","block");
            }else if(btn == "off"){
                $(".custom.control-item").css("display","block");
                $(".add.control-item").css("display","none");
                $(".cancel.control-item").css("display","none");
                $(".save.control-item").css("display","none");
            }
        },
        bindPanelEdit : function(){
            var that = this;
            $(document).on("click",".edit-handle-box",function(){
                var panel = $(this).find(".edit-panel");
                var panDis = panel.css("display");
                if( panDis == "none" ){
                    panel.css("display","block");
                }else if( panDis == "block" ){
                    panel.css("display","none");
                }
            })
            $(document).on("click",".edit-item",function(){
                var act = $(this).attr("act");
                var item = $(this).parents(".grid-stack-item");
                if( act == "simplify" ){//变小
                    that.editItem(item,"simplify");
                }else if( act == "detail" ){//变大
                    that.editItem(item,"detail");
                }else if( act == "delete" ){ //删除
                    that.editItem(item,"delete");
                }
            });
        },
        editItem : function(item,act){
            var that = this;
            var index = item.attr("data-index");
            var smallW = parseInt(item.attr("data-smallw"));
            var smallH = parseInt(item.attr("data-smallh"));
            var largeW = parseInt(item.attr("data-largew"));
            var largeH = parseInt(item.attr("data-largeh"));
            if( act == "simplify" ){//变小
                that.grid.resize(item, smallW, smallH);  
                item.attr("data-status","small");
            }else if( act == "detail" ){//变大
                that.grid.resize(item, largeW, largeH);  
                item.attr("data-status","large");
            }else if( act == "delete" ){ //删除
                that.grid.removeWidget(item);
                that.checkShow();
            }
        },
        //懒加载
        lazyLoad : function(){
            var that = this;
            var clock;
            $(window).on("scroll", function(){
                if (clock) {
                    clearTimeout(clock);
                }
                clock = setTimeout(function(){
                    that.checkShow();
                }, 100);
            })
            that.checkShow();
        },
        checkShow : function(){

            $("#grid-stack1 .grid-stack-item").each(function(){
                var $cur =$(this);
                if($cur.attr('isLoaded')){
                    return;
                }
                if(shouldShow($cur)){
                    showImg($cur);
                }
            })
            function shouldShow($node){
                var scrollH = $(window).scrollTop(),
                    winH = $(window).height(),
                    top = $node.offset().top;
                    top = top - 500; //提前500像素就加载
                if(top < winH + scrollH){
                    return true;
                }else{
                    return false;
                }
            }
            function showImg($node){
                $nodeObject = $node.find("object")
                $nodeObject.attr('data', $nodeObject.attr('data-src'));
                $node.attr('isLoaded', true);
            }
        }

    }
    $(function(){
        var worktop = new WorkTop();
    })

})(jQuery)



