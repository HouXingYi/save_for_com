
// 表格数据为二重数组  用underscore模板引擎渲染
$(function(){
    $(".fancybox").fancybox();
    $(".change").on("click",function(){
        var sta = $("#infoContent").attr("sta");
        if( sta == "display" ){
            $("#infoContent").attr("sta","change");
            $(".lineRight .t").css("display","none");
            $(".lineRight input").css("display","inline-block");
            $(this).text("保存");
        }else if( sta == "change" ){
            $("#infoContent").attr("sta","display");
            var groupObj = {};
            $(".lineRight input").each(function(){
                var type = $(this).parents(".lineRight").attr("type");
                groupObj[type] = $(this).val();
            });
            $(".lineRight input").css("display","none");
            $(".lineRight .t").each(function(){
                var type = $(this).parents(".lineRight").attr("type");
                $(this).text(groupObj[type]);
            });
            $(".lineRight .t").css("display","inline-block");
            $(this).text("修改");
        }
    });
});






