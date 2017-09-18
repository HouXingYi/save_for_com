

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
                strHtml += '<li><a href=""><img src="" alt="" init-index="'+i+'"/></a></li>';
            }
            if(this.hgallery){ //是否为第一次,不是第一次则刷新
                // $("#DB_thumMove li img").attr("init-index","");
                // $("#DB_thumMove .DB_thumLine").before(strHtml);
                // this.hgallery.refresh();
            }else{  //第一次则初始化
                $("#DB_thumMove").append(strHtml);
                $("#addBox").hide();
                $("#DB_imgSet").show();
                $("#DB_thumSet").show();
                that.initGallery();
            }
            that.handleSrc(files);
        });
        $("#addImgBox").on("click",function(){
            $("#filePicker").find("label").click();
        });
    },
    initGallery : function(){
        this.hgallery = $('#DB_gallery').hGallery({
            thumWidth:110,            
            thumGap:8,                
            thumMoveStep:4,           
            moveSpeed:300,            
            fadeSpeed:500            
        });
    },
    //填充src
    handleSrc : function(files){
        var that = this;
        for(var i = 0;i<files.length;i++){
            that.fileGroup.push(files[i]);
            (function(i){
                that.uploader.makeThumb( files[i], function( error, src ) {
                    $("#DB_thumMove").find("img[init-index="+i+"]").eq(0).attr("src",src);
                }, 110, 73 );
                that.uploader.makeThumb( files[i], function( error, src ) {
                    $("#DB_thumMove").find("img[init-index="+i+"]").parents("a").eq(0).attr("href",src);
                    if(i == 0){
                        $(".imgBox img").attr("src",src).css("height","100%");
                    }
                }, "auto" , "auto" );
            })(i);
        }
    }
}

$(function(){
    var imgUploadGallery = new ImgUploadGallery();
});


