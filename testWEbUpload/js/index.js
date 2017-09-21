


var a = WebUploader.create({
    pick: '#filePicker'
})
a.on('fileQueued', function( file ) {
    console.log(file);
});


var b = WebUploader.create({
    pick: '#filePicker2',
    swf: '../lib/Uploader.swf',
    runtimeOrder: 'flash'
})

b.on('fileQueued', function( file ) {
    console.log(file);
});
