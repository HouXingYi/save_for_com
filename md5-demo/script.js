(function($) {
    $(function() {
     

        // WebUploader.create({
        //     pick: '#filePicker'
        // }).on('fileQueued', function( file ) {
            
        //     console.log(1);
        //     $(".webuploader-pick").css({
        //         "width" : "100px",
        //         "height" : "100px",
        //         "position" : "absolute",
        //         "left" : "300px",
        //         "top" : "300px"
        //     });
        //     $(".webuploader-pick").next().css({
        //         "width" : "100px",
        //         "height" : "100px",
        //         "position" : "absolute",
        //         "left" : "300px",
        //         "top" : "300px"
        //     });

        // });




        WebUploader.create({
            pick: '#filePicker2',
            swf: './Uploader.swf'
            // ,runtimeOrder: 'flash'
        }).on('fileQueued', function( file ) {

            console.log(file);

            setTimeout(function(){

                $(".webuploader-pick").css({
                    "position" : "absolute",
                    "left" : "300px",
                    "top" : "300px",
                    "width" : "100px",
                    "height" : "100px"
                })
                $(".webuploader-pick").next().css({
                    "position" : "absolute",
                    "width" : "100px",
                    "height" : "100px",
                    "left" : "300px",
                    "top" : "300px"
                });
                
            },500);

        });
    });
})(jQuery);