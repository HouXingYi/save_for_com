        

        WebUploader.create({
            pick: '#filePicker2',
            swf: './Uploader.swf',
            runtimeOrder: 'flash'
        }).on('fileQueued', function( file ) {

            console.log(file);    

        });


