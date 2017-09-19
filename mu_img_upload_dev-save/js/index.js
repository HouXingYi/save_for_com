
function ImgUploadGallery(){
    this.uploader = WebUploader.create({
        swf: '../lib/Uploader.swf',
        pick: '#filePicker',
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });
    this.fileGroup = [];
    this.infoList = [];
    this.init();
}
ImgUploadGallery.prototype = {
    init : function(){
        this.bind();
    },
    bind : function(){
        var that = this;
        this.uploader.on('filesQueued',function(files){
            var len = files.length;
            var strHtml = "";
            for(var i=0;i<len;i++){
                if(i==0){
                    strHtml += '<li status="now"><a data-id="Img'+ parseInt(Math.random()*10000) +'" href=""><img src="" alt="" init-index="'+i+'"/></a></li>';
                }else{
                    strHtml += '<li status=""><a data-id="Img'+ parseInt(Math.random()*10000) +'" href=""><img src="" alt="" init-index="'+i+'"/></a></li>';
                }
            }
            if( that.hgallery ){ //不是第一次则刷新
                $("#DB_thumMove li img").attr("init-index","");
                $("#DB_thumMove .DB_thumLine").before(strHtml);
                that.toggleBox(true);
                that.hgallery.refresh();
            }else{  //第一次则初始化
                $("#DB_thumMove").append(strHtml);
                that.toggleBox(true);
                that.initGallery();
            }
            that.handleSrc(files);
        });

        // //初始化添加
        $("#addImgBox").on("click",function(){
            $("#filePicker").find("label").click();
        });
        // //再次添加
        $("#imgAddNew").on("click",function(){
            $("#filePicker").find("label").click();
        });
        //删除

        $("#imgDelete").on("click",function(){
            that.deleteImg();
        });
    },
    toggleBox : function(isShow){
        if( isShow == true ){
            $("#addBox").hide();
            $("#DB_imgSet").show();
            $("#DB_thumSet").show();
            $(".editBox").show();
        }else if( isShow == false ){
            $("#addBox").show();
            $("#DB_imgSet").hide();
            $("#DB_thumSet").hide();
            $(".editBox").hide();
        }
    },
    initGallery : function(){
        var that = this;
        this.hgallery = $('#DB_gallery').hGallery({
            thumWidth:110,            
            thumGap:8,                
            thumMoveStep:7,           
            moveSpeed:300,            
            fadeSpeed:500,
            onChangeImg : that.onChangeImg          
        });
        //订阅
        this.hgallery.wrap.on("changeImg",function(e,curLi){
            if( that.infoList.length != 0 ){
                that.onChangeImg(curLi);
            }
        });
    },
    //填充src
    handleSrc : function(files){
        var that = this;
        for(var i = 0;i<files.length;i++){
            that.fileGroup.push(files[i]);
            (function(i){
                var infoObject = {};
                console.log(0);
                //缩略图src
                that.uploader.makeThumb( files[i], function( error, src ) {

                    $("#DB_thumMove").find("img[init-index="+i+"]").eq(0).attr("src",src);
                    // $("#DB_thumMove img").each(function(){
                    //     var index = $(this).attr("init-index");
                    //     if( index == i){
                    //         $(this).attr("src",src);
                    //     }
                    // });

                }, 110, 73 );
                //完整尺寸src
                that.uploader.makeThumb( files[i], function( error, src ) {

                    var link
                    var link = $("#DB_thumMove").find("img[init-index="+i+"]").parents("a").eq(0).attr("href",src);
                    // $("#DB_thumMove img").each(function(){
                    //     var index = $(this).attr("init-index");
                    //     if( index == i){
                    //         link = $(this).parents("a").eq(0).attr("href",src);
                    //     }
                    // });

                    var id = link.attr("data-id");
                    if(that.infoList.length == 0 ){ //初始化第一个
                        $("#infoGroup").attr("data-id",id);
                    }
                    if(i == 0){
                        $(".imgBox img").attr("src",src).css("height","100%");
                    }
                    infoObject.imgSrc = src;
                    infoObject.id = id;
                    that.infoList.push(infoObject);
                }, "auto" , "auto" );
            })(i);
        }
    },
    onChangeImg : function(currLi,isDelete){
        var that = this;
        var oldId = $("#infoGroup").attr("data-id");
        var currId = $(currLi).find("a").attr("data-id");
        var oldInfoObject;
        var currInfoObject;
        for(var i = 0;i<that.infoList.length;i++){
            if( that.infoList[i].id == currId ){
                currInfoObject = that.infoList[i];
            }
            if( that.infoList[i].id == oldId ){
                oldInfoObject = that.infoList[i];
            }
        }
        if(isDelete != true){
            saveOld(oldInfoObject);
        }
        getNew(currId,currInfoObject);
        $(currLi).attr("status","now").siblings().attr("status","");
        function saveOld(obj){
            var certificationType = $("#infoGroup").find(".paperTypeInput").val();
            var certificationNum = $("#infoGroup").find(".paperNumInput").val();
            var certificationStartTime = $("#infoGroup").find(".paperTimeStartInput").val();
            var certificationEndTime = $("#infoGroup").find(".paperTimeEndInput").val();
            obj.certificationType = certificationType;
            obj.certificationNum = certificationNum;
            obj.certificationStartTime = certificationStartTime;
            obj.certificationEndTime = certificationEndTime;
        }
        function getNew(id,obj){
            $("#infoGroup").attr("data-id",id);
            $("#infoGroup").find(".paperTypeInput").val(obj.certificationType);
            $("#infoGroup").find(".paperNumInput").val(obj.certificationNum);
            $("#infoGroup").find(".paperTimeStartInput").val(obj.certificationStartTime);
            $("#infoGroup").find(".paperTimeEndInput").val(obj.certificationEndTime);
        }
    },
    deleteImg : function(){
        var that = this;
        var deleteLi = $("#DB_thumMove li[status=now]");
        var nowLi = $("#DB_thumMove li[status=now]").next();
        if( nowLi[0].tagName == "DIV"){
            nowLi = deleteLi.prev();
            if(nowLi.length == 0){//最后一个
                that.infoList = [];
                deleteLi.remove();
                that.toggleBox(false);
                that.uploader.reset();
                var files = that.uploader.getFiles();
                return false
            }else{//不是最后一个，红框前移
                that.hgallery.$thumLine.css({'left':nowLi.position().left});
            }
        }
        var oldImgId = deleteLi.find("a").attr("data-id");
        var nowImgId = nowLi.find("a").attr("data-id");
        var nowSrc = nowLi.find("a").attr("href");
        var nowObj ;
        var list = this.infoList;
        for(var i = 0;i<list.length;i++){
            if( list[i].id == nowImgId ){
                nowObj = list[i];
            }
            if( list[i].id == oldImgId ){
                list.splice(i,1);
            }
        }
        that.onChangeImg(nowLi,true);
        $(".imgBox img").hide().attr('src',nowSrc).fadeIn(500);
        deleteLi.remove();
    }

}
$(function(){
    var imgUploadGallery = new ImgUploadGallery();
});


