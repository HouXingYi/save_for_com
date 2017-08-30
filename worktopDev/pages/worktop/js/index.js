


function WorkTop(){
    //drag配置
    this.opt = {
        float : true
        // ,disableResize : true
        // ,disableDrag : true  
        ,draggable : {
            handle: '.drag-handle-box'  //drag控件的名称
        }
        ,resizable : {
            handles: 'none-resize'  //resize控件的名称
        }
    }
    //插件container的jq对象
    this.gsJq = {} 
    //插件的封装对象
    this.grid = {}
    //默认控件的坐标信息   
    this.oldItems ={
        list : [
            {
                x: 0, y: 0, width: 5, height: 3 , 
                smallW:3 , smallH:2 ,
                largeW: 5 , largeH: 3 ,
                status: "large" , index:0
            },
            {
                x: 5, y: 0, width: 2, height: 3 , 
                smallW:2 , smallH:2 ,
                largeW:2 , largeH:3 ,
                status: "large" , index:1
            },
            {
                x: 7, y: 0, width: 2, height: 3 , 
                smallW:2 , smallH:2 ,
                largeW:2 , largeH:3 ,
                status: "large" , index:2
            },
            {
                x: 0, y: 3, width: 5, height: 4 , 
                smallW:3 , smallH:3 ,
                largeW:5 , largeH:4 ,
                status: "large" , index:3
            },
            {
                x: 5, y: 3, width: 4, height: 4 , 
                smallW:3 , smallH:3 ,
                largeW:4 , largeH:4 ,
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
        this.initBox();
        this.gsJq = $('.grid-stack').gridstack(this.opt);
        this.grid = this.gsJq.data('gridstack');

        // console.log(this.gsJq);
        // console.log(this.grid);

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
    initBox : function(){
        var that = this;
        //模板引擎渲染并插入
        var tpl = $("#gridStackTpl").html();
        var template = _.template(tpl);
        var html = template({list: that.oldItems.list});
        $(".grid-stack").html(html);
    },
    //取消改变
    resetBox : function(){
        var pos = this.oldItems.list;
        $(".grid-stack .grid-stack-item").each(function(i,item){
            $(item).attr("data-gs-x",pos[i].x);
            $(item).attr("data-gs-y",pos[i].y);
            $(item).attr("data-gs-width",pos[i].width);
            $(item).attr("data-gs-height",pos[i].height);
            $(item).css("display","block");
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
        var storage=window.localStorage;
        storage.items = stringItems;
    },

    addNewItem : function(){
        var that = this;
        var tpl = $("#newItem").html();
        var template = _.template(tpl);
        var html = template();
        that.grid.addWidget($(html));   //加入
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

        //无效？
        // $(".edit-handle-box,.edit-panel").on("hover",function(){
        //     $(".edit-panel").css("display","block");
        // },function(){
        //     $(".edit-panel").css("display","none");
        // })

    },

    editItem : function(item,act){
        var that = this;
        console.log(item);
        var index = item.attr("data-index");
        var smallW = item.attr("data-smallw");
        var smallH = item.attr("data-smallh");
        var largeW = item.attr("data-largew");
        var largeH = item.attr("data-largeh");
        if( act == "simplify" ){//变小
            // that.grid.resize(item, smallW, smallH);  //不起作用？
            item.attr("data-gs-width",smallW);
            item.attr("data-gs-height",smallH);
            item.attr("data-status","small");
        }else if( act == "detail" ){//变大
            item.attr("data-gs-width",largeW);
            item.attr("data-gs-height",largeH);
            item.attr("data-status","large");
        }else if( act == "delete" ){ //删除
            item.css("display","none");
        }
    }
}

$(function(){
    var worktop = new WorkTop();
})

 