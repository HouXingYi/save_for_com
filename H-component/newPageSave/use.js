






// 使用实践参考





// 表格数据为二重数组  用underscore模板引擎渲染
var rows = 1;
var path;
$(function(){
	path = $("#path").val();
});
//(function($,_,window){

    function InqueryInfo(){
        this.dataList = "";
        this.init();
    }
    InqueryInfo.prototype = {
        init : function(){
            this.getData(0,1);
        },
        /**
         * 
         * @param isFirst 是否为第一次初始化,0:初始
         * @param cuPage 当前页
         */
        getData : function(isFirst,cuPage){
            var that = this;
            var isinclude = $("#query_isinclude").val();
            var start_offerTime = $("#start_offerTime").val();
            var end_offerTime = $("#end_offerTime").val();
            console.log(rows);
            $.ajax({
                url : path+"/offer/queryMyHistoryOffer",
                // type : "POST",
                data : "rows="+rows+"&page="+cuPage+"&isinclude="+isinclude+"&start_offerTime="+start_offerTime+"&end_offerTime="+end_offerTime, //参数
                beforeSend:function(XHR){ 
                    //loading
                }, 
                success:function(data,textStatus){
                	console.log(data);
                    if(data.rows.length > 0){
                        that.dataList = data;
                        var total = parseInt(data.total);
                    	var num = total%rows;
                    	var allPage = parseInt(total/rows);
                    	if(num>0){
                    		allPage += 1;
                    	}
                    	that.allPage = allPage;
                        if(isFirst == 0){
                        	that.initPage(that.allPage,0);	
                        }
        				that.hpage.refresh({
    						numForEachPage : rows,
    						allNum : that.allPage,
    						initPage : cuPage
    					});
                        that.handleDataList();
                    }
                }, 
                complete:function(XHR,textStatus){ 
                }, 
                error:function(XHR,textStatus,errorThrown){ 
                } 
            })
        },
        handleDataList :function(){
        	var that = this;
            var total = that.dataList.total;
            var list = that.dataList.rows;
            //渲染
            var listTemplete = template("listTpl",{list: list});
            $(".hTable tbody").html(listTemplete);
        },
        initPage : function(allPage,isFirst){
        	
        	var that = this;
        	this.hpage = $(".paginationBox").hpage({
        		numForEachPage : rows,
        		initPage : 1,
        		allNum : allPage,
        		render : render
        	});
        	
        	function render(cuPage,modifiedRows,totalPage){
    			if( isFirst != 0 ){ //不是第一次才运行
    				rows = modifiedRows;
    				that.getData(1,cuPage);
    			}else{
    				isFirst = 1;
    			}
    		}
        	
        }
    }

    $(function(){
        var inqueryInfo = new InqueryInfo();
        window.inqueryInfo = inqueryInfo;
    })

//})(jQuery,_,window);


