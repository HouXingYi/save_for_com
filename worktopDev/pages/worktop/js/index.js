


function WorkTop(){

    //配置
    this.opt = {
        float : true
        ,disableResize : true
        ,disableDrag : true  
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
    //控件的坐标信息   
    this.items = [
        {x: 0, y: 0, width: 5, height: 3},
        {x: 5, y: 0, width: 2, height: 3},
        {x: 7, y: 0, width: 2, height: 3},
        {x: 0, y: 3, width: 5, height: 4},
        {x: 5, y: 3, width: 4, height: 4}
    ];

    this.init();

}

WorkTop.prototype = {

    init : function(){
        this.initBox();
        this.gsJq = $('.grid-stack').gridstack(this.opt);
        this.grid = this.gsJq.data('gridstack');
        this.bind();
    },
    bind : function(){
        var that = this;
        //自定义
        $(".custom.control-item").on("click",function(){
            that.switchControl("on");
            //enable
            that.grid.enable();  
            $(".grid-stack-item .drag-handle-box").css("display","block");
        });
        //添加模块
        $(".add.control-item").on("click",function(){
            console.log("添加模块");
        });
        //取消
        $(".cancel.control-item").on("click",function(){
            that.grid.disable();
            $(".grid-stack-item .drag-handle-box").css("display","none");
            that.switchControl("off");
        });
        //保存
        $(".save.control-item").on("click",function(){
            alert("保存成功");
            that.grid.disable();
            $(".grid-stack-item .drag-handle-box").css("display","none");
            that.switchControl("off");
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
        var html = template({list: that.items});
        $(".grid-stack").html(html);

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
    }

}

$(function(){
    var worktop = new WorkTop();
})

    
// window.onload = function(){
//     //用于父元素调用
//     function change(theme){
//         console.log(theme);
//     }
//     document.changeColor = change;  

//     //调用父元素的
//     document.getElementById("Btn").onclick = function(){
//         document.Sconfirm({
//             text : "子元素调用",
//             confirmColor : document.themeColor,
//             callback : function(){
//                 console.log("callback");
//             }
//         })
//     }
// }