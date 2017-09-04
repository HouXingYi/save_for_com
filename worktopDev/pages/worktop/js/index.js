
;(function($){

    function WorkTop(){


        var h = $(window).height();

        this.addItems ={
            list : [
                {
                    smallW:1 , smallH:1 ,
                    largeW: 2 , largeH: 2 ,
                    status: "large" , index:0
                },
                {
                    smallW:1 , smallH:1 ,
                    largeW:3 , largeH:3 ,
                    status: "large" , index:1
                },
                {
                    smallW:1 , smallH:1 ,
                    largeW:2 , largeH:2 ,
                    status: "large" , index:2
                },
                {
                    smallW:1 , smallH:1 ,
                    largeW:3 , largeH:3 ,
                    status: "large" , index:3
                },
                {
                    smallW:1 , smallH:1 ,
                    largeW:2 , largeH:2 ,
                    status: "large" , index:4
                },
                {
                    smallW:1 , smallH:1 ,
                    largeW:3 , largeH:3 ,
                    status: "large" , index:4
                }
            ]
        }

        // $(".box").height( h*0.8 );
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
        //插件container的jq对象
        this.gsJq = {} 
        //插件的封装对象
        this.grid = {}
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
            this.initBox();

            this.gsJq = $('#grid-stack1').gridstack(this.opt);
            this.grid = this.gsJq.data('gridstack'); // 插件实例

            //第二模块
            var opt2 = {
                acceptWidgets : false  
                ,float : false, //东西都会往上顶
                cellHeight : 'auto', //高由宽来算
                disableResize :true,
                width: 3
            }

            this.gsJq2 = $('#grid-stack2').gridstack(opt2);
            this.grid2 = this.gsJq2.data('gridstack');
            
            //当box1被加入的时候
            $('#grid-stack1').on('added', function(event, item) {

                var tpl = $("#newItemCon").html();
                var template = _.template(tpl);
                var html = template();
                item[0].el.html(html);

            });

            this.bind();
            //编辑模块事件
            this.bindPanelEdit();

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
            //添加模块
            $(".add.control-item").on("click",function(){

                var marginl = parseInt($(".box").css("margin-left"));
                if(marginl < 50){
                    $(".box").css({
                        "margin-left" : marginl + "px",
                        "width" : "630px"
                    })
                    $(".box2").css({
                        "right" : "0" 
                    })
                    setTimeout(function(){
                        that.grid.cellHeight(that.grid.cellWidth(), false);  //调整高度
                    },600);
                }else{
                    $(".box2").css({
                        "right" : "0" 
                    })
                }
                return false
                that.addNewItem();
            });
            //取消
            $(".cancel.control-item").on("click",function(){
                that.grid.disable();
                $(".grid-stack-item .drag-handle-box").css("display","none");
                $(".grid-stack-item .edit-handle-box").css("display","none");
                that.resetBox();
                that.switchControl("off");
            });
            //保存
            $(".save.control-item").on("click",function(){
                alert("保存成功");
                that.grid.disable();
                $(".grid-stack-item .drag-handle-box").css("display","none");
                $(".grid-stack-item .edit-handle-box").css("display","none");
                that.getNewSet();
                that.switchControl("off");
                window.location.reload();  //刷新下
            });
            //可以监听disable和able事件
            $('.grid-stack').on('disable', function(event) {
                var grid = event.target;
            });
            $('.grid-stack').on('enable', function(event) {
                var grid = event.target;
            });
        },
        forDropOnDragCallBack: function(el,self){
            if(el){
                var index = el.attr("x-index");
                var list = self.opts.forDropOnDragList;
                var h = list[index].largeH;
                var w = list[index].largeW;
                self.resize(el,w,h);
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
            var addHtml = addTemplate();
            $("#grid-stack2").html(addHtml);
        },
        //取消改变
        resetBox : function(){
            var that = this;
            var pos = this.oldItems.list;
            $("#grid-stack1 .grid-stack-item").each(function(i,item){
                if(pos[i]){
                    that.grid.move($(item),pos[i].x,pos[i].y);
                    that.grid.resize($(item),pos[i].width,pos[i].height);
                }else{
                    that.grid.removeWidget($(item));
                }
            })
        },
        getNewSet : function(){
            var that = this;
            $(".grid-stack .grid-stack-item").each(function(i,item){
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
        addNewItem : function(){
            var that = this;
            var tpl = $("#newItem").html();
            var template = _.template(tpl);
            var html = template();
            if (that.grid.willItFit(0, 0, 1, 1, true)) {
                that.grid.addWidget($(html), 0, 0, 1, 1, true);
            }else {
                alert('没有多余的空间加入控件');
            }
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
            }
        }
    }
    $(function(){
        var worktop = new WorkTop();
    })

})(jQuery)



