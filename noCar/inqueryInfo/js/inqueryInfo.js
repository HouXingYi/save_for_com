

(function($,_,window){

    function InqueryInfo(){
        this.dataList = "";
        this.init();
    }
    InqueryInfo.prototype = {
        init : function(){
            this.getData();
        },
        getData : function(){
            var that = this;
            $.ajax({
                url : "./data.json",
                // type : "POST",
                data : "", //参数
                beforeSend:function(XHR){ 
                    //loading
                }, 
                success:function(data,textStatus){ 
                    if(data.total > 0){
                        that.dataList = data;
                        that.handleDataList();
                        that.initDalog();
                    }
                }, 
                complete:function(XHR,textStatus){ 
                }, 
                error:function(XHR,textStatus,errorThrown){ 
                } 
            })
        },
        handleDataList :　function(){
            var that = this;
            var total = that.dataList.total;
            var list = that.dataList.rows;
            console.log(list);
            //渲染
            var listTemplete = template("listTpl",{list: list});
            $(".hTable tbody").html(listTemplete);
        },        
        initDalog : function(){
            $(".quotationLink").modaal({
                width : 780,
                height :　250,
                before_open : function(){
                }
            });
        }

    }

    $(function(){
        var inqueryInfo = new InqueryInfo();
        window.inqueryInfo = inqueryInfo;
    })
    
})(jQuery,_,window);


















