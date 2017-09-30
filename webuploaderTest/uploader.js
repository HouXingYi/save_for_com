
$(function(){

    var uploader = WebUploader.create({
        swf: 'dist/Uploader.swf',
        pick: '#filePicker',
        runtimeOrder: 'flash'
    });

    uploader.on('fileQueued', function( _file ) {
        console.log(_file);
    });
    

});


            
