$(function(){
	_topTool();
	_gridstack();
});

//topTool按钮
function _topTool(){
	$("#topTool .btn_zdy").click(function(){
		var $this = $(this);
		$("#topTool span").show();
		$("#ulbody .opt-move,#ulbody .opt-edit").show();
		$this.hide();
		$("#boxright").stop().animate({"width":"280px"});
		//取消、保存
		$("#topTool .btn_qx,#topTool .btn_bc").click(function(){
			$("#topTool span").hide();
			$this.show();
			$("#boxright").stop().animate({"width":"0px"});
			$("#ulbody .opt-move,#ulbody .opt-edit").hide();
		});
		//保存事件
		$("#topTool .btn_bc").click(function(){
			getNewSet();
            window.location.reload();
		});
	});
}
//gridstack拖拽
function _gridstack(){
    //默认控件的坐标信息   
    this.oldItems ={
        list : [{
            x: 0, y: 0, width: 3, height: 1, smallW:1 , smallH:1 , largeW: 3 , largeH: 1 , status: "large" , index:0
    	},{
            x: 3, y: 0, width: 1, height: 1, smallW:1 , smallH:1 , largeW: 3 , largeH: 1 , status: "large" , index:1
    	},{
            x: 4, y: 0, width: 1, height: 1, smallW:1 , smallH:1 , largeW: 3 , largeH: 1 , status: "large" , index:2
    	},{
            x: 0, y: 1, width: 3, height: 2, smallW:1 , smallH:1 , largeW: 3 , largeH: 2 , status: "large" , index:3
    	},{
            x: 3, y: 1, width: 2, height: 2, smallW:1 , smallH:1 , largeW: 3 , largeH: 2 , status: "large" , index:4
        }
    ]};
    //新的控件的坐标信息
    this.newItems ={
        list : []
    };
    //右侧的添加项数组
    this.rightItems ={
        list : [{
        	x: 0, y: 0, width: 1, height: 1, smallW:1 , smallH:1 , largeW: 3 , largeH: 1 , status: "large" , index:0
    	},{
            x: 1, y: 0, width: 1, height: 1, smallW:1 , smallH:1 , largeW: 3 , largeH: 1 , status: "large" , index:1
    	},{
            x: 2, y: 0, width: 1, height: 1, smallW:1 , smallH:1 , largeW: 3 , largeH: 1 , status: "large" , index:2
    	},{
            x: 0, y: 0, width: 1, height: 1, smallW:1 , smallH:1 , largeW: 3 , largeH: 1 , status: "large" , index:3
    	}
    ]};
    //右边图标的坐标
    var rLen = $("#modelList > li").length;
    console.log(rLen);
    for(var i = 0;i<rLen;i++){
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
        this.rightItems.list.push(item);
    }
	//初始化控件
	var options = {
        acceptWidgets : true  //允许别的页面拖控件过来
        ,float : false  //东西都会往上顶
        ,draggable : {
            handle: '.opt-move'  //drag控件的名称
        }
        ,resizable : {
            handles: 'none-resize'  //resize控件的名称-禁止缩放
        }
        ,cell_height : 'auto'
        ,verticalMargin : "16"//垂直间距
    };
    var optiRight = {
    	acceptWidgets : false 
        ,float : false //东西都会往上顶
        ,cellHeight : 'auto' //高由宽来算
        ,disableResize :true
    }
    $("#ulbody").gridstack(options);
    $("#modelList").gridstack(optiRight);
    //取坐标信息填入html中
    function introHtml(){
	    for(var i in oldItems.list){
	    	$("#ulbody > li").each(function(u,item){
	    		$(item).attr({"data-gs-x":oldItems.list[u]["x"],
	    		"data-gs-y":oldItems.list[u]["y"],
	    		"data-gs-width":oldItems.list[u]["width"],
	    		"data-gs-height":oldItems.list[u]["height"],
	    		"data-smallw":oldItems.list[u]["smallw"],
	    		"data-smallh":oldItems.list[u]["smallh"],
	    		"data-largew":oldItems.list[u]["largew"],
	    		"data-largeh":oldItems.list[u]["largeh"],
	    		"data-status":oldItems.list[u]["status"],
	    		"data-index":oldItems.list[u]["index"]});
	    	});
	    }
	    for(var i in rightItems.list){
	    	$("#modelList > li").each(function(u,item){
	    		$(item).attr({"data-gs-x":rightItems.list[u]["x"],
	    		"data-gs-y":rightItems.list[u]["y"],
	    		"data-gs-width":rightItems.list[u]["width"],
	    		"data-gs-height":rightItems.list[u]["height"],
	    		"data-smallw":rightItems.list[u]["smallw"],
	    		"data-smallh":rightItems.list[u]["smallh"],
	    		"data-largew":rightItems.list[u]["largew"],
	    		"data-largeh":rightItems.list[u]["largeh"],
	    		"data-status":rightItems.list[u]["status"],
	    		"data-index":rightItems.list[u]["index"]});
	    	});
	    }
    }
    introHtml();
    //如果有localStorage存储的话，覆盖旧的坐标信息
    if(window.localStorage){
        var storage = window.localStorage;
        if(storage.items){
            this.oldItems = JSON.parse(storage.items);
            introHtml();
        }
    }
}
//存储页面上标签窗口的位置
function getNewSet(){
    var $this = this;
    $("#ulbody > li").each(function(i,item){
        var pos = {}
        if( $(item).css("display") == "none" ){
            return true;
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
        $this.newItems.list.push(pos);
    });
    $("#modelList > li").each(function(i,item){
        var rpos = {}
        if( $(item).css("display") == "none" ){
            return true;
        }
        rpos.x = $(item).attr("data-gs-x"); 
        rpos.y = $(item).attr("data-gs-y"); 
        rpos.width = $(item).attr("data-gs-width"); 
        rpos.height = $(item).attr("data-gs-height"); 
        rpos.smallW = $(item).attr("data-smallw"); 
        rpos.smallH = $(item).attr("data-smallh"); 
        rpos.largeW = $(item).attr("data-largew"); 
        rpos.largeH = $(item).attr("data-largeh"); 
        rpos.status = $(item).attr("data-status"); 
        rpos.index = $(item).attr("data-index"); 
        $this.newItemsR.list.push(rpos);
    });
    var stringItems = JSON.stringify($this.newItems);
//  var stringItemsR = JSON.stringify($this.newItemsR);
    var storage= window.localStorage;
//  var storageR= window.localStorage;
    storage.items = stringItems;
//  storageR.items = stringItemsR;
}