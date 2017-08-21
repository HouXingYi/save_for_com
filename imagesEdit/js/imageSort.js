
//构造函数
function ImageSort(){
    this.sort = Sortable;
    //初始化
    this.init();
}
//原型
ImageSort.prototype = {
    init : function(){
        //绑定事件
        this.bind();
    },
    bind : function(){
        var that = this;
        //开始扫描
        $("#startScan").on("click",function(){
            //ajax
            setTimeout(function(){
                that.getImg();
            },Math.random()*100);    
        });
        //一键加入
        $("#addAll").on("click",function(){
            var allImg = $("#imgList").html();
            if(allImg){
                $("#imgList").empty();
                $("#leftImgList").append(allImg);
                that.bindchoose();
                that.bindClose();
                that.bindAdd();
            }else{
                alert("图片列表为空");
            }
        });
        //删除
        $("#topDel").on("click",function(){
            var choose = $("#leftImgList .item[status=active]");
            if(choose.length === 0){
                alert("无选中图片");
            }else{
                choose.remove();
                that.bindchoose();
            }
        });
        //清空
        $("#topEmpty").on("click",function(){
            $("#leftImgList").empty();
        });
        //保存上传
        $("#topSave").on("click",function(){
            setTimeout(function(){
                alert("保存成功");
            },100);
        });
        //设置批注
        $("#topNote").on("click",function(){
            var now = $("#leftImgList .item[status=active]");
            if(now.length === 0){
                alert("无选中图片");
            }else{
                alert("设置批注");
            }
        });
    },  
    // 初始化插件
    startSort : function(){
        var that = this;
        // 右边初始化
        var rBoxDom = $("#imgList")[0];
        this.sort.create(rBoxDom,{
            group: {
                name: 'rBox',
                put: 'lBox',
                pull: true
            },
            animation: 100,
            onSort: function () {
                $("#imgList .item").attr("status","");
            }
        });
        //左边初始化
        var lBoxDom = $("#leftImgList")[0];
        this.sort.create(lBoxDom,{
            group: {
                name: 'lBox',
                put: 'rBox',
                pull: true
            },
            animation: 100,
            onSort: function (e) {
                //重新绑定事件
                that.bindchoose();
                that.bindClose();
                that.bindAdd();
                //fancybox重新reload
                $(".fancybox").fancybox();
            }
        });
    },
    getImg : function(){
        //模拟数据
        var arr = [];
        for( var i=1;i<14;i++){
            var url = './images/test'+ i +'.jpg';
            arr.push(url);
        }

        //模板引擎渲染并插入
        var tpl = $("#RmainListTpl").html();
        var html = template(tpl, {list: arr});
        $("#RmainImgBox").html(html);

        //初始化拖拽
        this.startSort();
        //绑定关闭按钮事件
        this.bindClose();
        this.bindAdd();
        //fancybox初始化
        $(".fancybox").fancybox();
        
    },
    bindchoose : function(){
        var flag = 0; //没有active
        $("#leftImgList .item").each(function(){
            var sta = $(this).attr("status");
            if(sta === "active"){
                flag = 1;//有active
            }
        });
        if(flag === 0){
            $("#leftImgList .item").eq(0).attr("status","active");  //第一个给加上
        }
        $(".item").off().on("click",function(){
            var faId = $(this).parent().attr("id");
            if(faId === "leftImgList"){
                $(this).attr("status","active").siblings().attr("status","");
            }else{
                return false
            }
        });
        $(".item").each(function(){
            var faId = $(this).parent().attr("id");
            var sonImg = $(this).find("img");
            var sonLen = $(this).find(".imgText").length;
            if(faId === "leftImgList"){ //左
                if(sonLen === 0){//不存在
                    var text = sonImg.attr("src").match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)[1];
                    var tpl = '<span class="imgText">'+ text +'</span>';   //显示全部路径后面再处理
                    $(this).height("175px").append(tpl);
                }
            }else if(faId === "imgList"){//右
                if(sonLen != 0){//存在
                    $(this).find(".imgText").remove();
                    $(this).height("120px");
                }
            }
        });      
    },
    bindClose :function(){
        var that = this;
        $(".closeItem").off().on("click",function(){
            var fa = $(this).parent().remove();
            that.bindchoose();
        });
    },
    bindAdd :function(){
        var that = this;
        $(".addItem").off().on("click",function(){
            var fa = $(this).parent().remove();
            $("#leftImgList").append(fa);
            that.bindchoose();
            that.bindClose();
        });
    }
}
//实例化
$(function(){
    var imageSort = new ImageSort(); 
})

