
var uploader = WebUploader.create({
    swf: '../lib/Uploader.swf',
    pick: '#filePicker',
    accept: {
        title: 'Images',
        extensions: 'gif,jpg,jpeg,bmp,png',
        mimeTypes: 'image/*'
    }
});

function ImgUploadGallery(){
    this.fileGroup = [];
    this.infoList = [];
    // this.init();
    // var pick = $(".webuploader-pick");
    // console.log(pick);
    // var pickNext = $(".webuploader-pick").next();
    // pickNext.css({
    //     // "left" : pick.css("left"),
    //     // "top" : pick.css("top"),
    //     "left" : "100px",
    //     "top" : "100px",
    //     "width" : "500px",
    //     "height" : "500px",
    //     "background" : "red"
    // })
    
}
ImgUploadGallery.prototype = {
    init : function(){
        this.bind();
        console.log(uploader);
    },
    bind : function(){
        var that = this;
        uploader.on('filesQueued',function(files){
            var len = files.length;
            var strHtml = "";
            for(var i=0;i<len;i++){
                if(i==0 && that.infoList.length == 0){
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
            for(var j = 0;j<files.length;j++){
                that.handleSrc(files[j],j);
            }
            
        });
        // //初始化添加
        // $("#addImgBox").on("click",function(){
        //     $("#filePicker").find("label").click();
        // });
        // //再次添加
        // $("#imgAddNew").on("click",function(){
        //     $("#filePicker").find("object").click();
        // });
        //删除
        $("#imgDelete").on("click",function(){
            that.deleteImg();
        });
    },
    toggleBox : function(isShow){
        if( isShow == true ){
            // $("#addBox").css("z-index","-10");
            $("#DB_imgSet").css("z-index","10");
            $("#DB_thumSet").css("z-index","10");
            $(".editBox").show();
            $(".webuploader-pick").css({
                "left" : "773px",
                "top" : "-60px",
                "height" : "50px",
                "width" : "55px",
                "padding" : "0px"
            })
            $(".webuploader-pick").next().css({
                "left" : "773px",
                "top" : "-60px",
                "height" : "50px",
                "width" : "55px"
            })
        }else if( isShow == false ){
            // $("#addBox").css("z-index","10");
            $("#DB_imgSet").css("z-index","-10");
            $("#DB_thumSet").css("z-index","-10");
            $(".editBox").hide();
            $(".webuploader-pick").css({
                "left" : "284px",
                "top" : "36px",
                "height" : "300px",
                "width" : "300px",
                "padding": "10px 15px"
            })
            $(".webuploader-pick").next().css({
                "left" : "284px",
                "top" : "36px",
                "height" : "300px",
                "width" : "300px"
            })
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
    handleSrc : function(file,i){
        var that = this;
        // for(var i = 0;i<files.length;i++){
            // that.fileGroup.push(files[i]);
            // (function(i){
                var infoObject = {};
                //缩略图src
                uploader.makeThumb( file, function( error, src ) {
                    // $("#tpl1").attr("src",src);
                    // return false
                    // $("#DB_thumMove").find("img[init-index="+i+"]").eq(0).attr("src",src);
                    $("#DB_thumMove img").each(function(){
                        var index = parseInt($(this).attr("init-index"));
                        if( index === i){
                            $(this).attr("src",src);
                        }
                    });
                }, 110, 73 );
                //完整尺寸src
                uploader.makeThumb( file, function( error, src ) {
                    // $("#tpl2").attr("src",src);
                    // return false
                    // var link = $("#DB_thumMove").find("img[init-index="+i+"]").parents("a").eq(0).attr("href",src);
                    var link;
                    $("#DB_thumMove img").each(function(){
                        var index = parseInt($(this).attr("init-index"));
                        if( index === i){
                            link = $(this).parents("a").attr("href",src);

                        }
                    });
                    var id = link.attr("data-id");
                    if(that.infoList.length == 0 ){ //初始化第一个
                        $("#infoGroup").attr("data-id",id);
                    }
                    if(i == 0 && that.infoList.length == 0){
                        $(".imgBox img").attr("src",src).css("height","100%");
                    }
                    infoObject.imgSrc = src;
                    infoObject.id = id;
                    infoObject.imgName = file.name;
                    infoObject.ext = file.ext;
                    infoObject.certificationType = "";
                    infoObject.certificationNum = "";
                    infoObject.certificationStartTime = "";
                    infoObject.certificationEndTime = "";
                    that.infoList.push(infoObject);
                }, "auto" , "auto" );
            // })(i);
        // }
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

        console.log("delete");

        var that = this;
        var deleteLi = $("#DB_thumMove li[status=now]");
        var nowLi = $("#DB_thumMove li[status=now]").next();
        if( nowLi[0].tagName == "DIV"){
            nowLi = deleteLi.prev();
            if(nowLi.length == 0){//最后一个
                that.infoList = [];
                deleteLi.remove();
                that.toggleBox(false);
                uploader.reset();
                var files = uploader.getFiles();
                that.clearInfoGroup();
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
    },
    clearInfoGroup : function(){
        $("#infoGroup").find(".paperTypeInput").val("");
        $("#infoGroup").find(".paperNumInput").val("");
        $("#infoGroup").find(".paperTimeStartInput").val("");
        $("#infoGroup").find(".paperTimeEndInput").val("");
    },
    ImgSave : function(){
        return this.infoList
    }
}
$(function(){
    var imgUploadGallery = new ImgUploadGallery();
    window.imgUploadGallery = imgUploadGallery
});

//保存
$("#save").on("click",function(){
    var list = imgUploadGallery.ImgSave();
    console.log(list);
});

$("#changePos").on("click",function(){
    $(".uploadImgBox").css({
        "top" : "-900px"
    })
});

$("#changePos2").on("click",function(){
    $(".uploadImgBox").css({
        "top" : "0"
    })
});