$(function(){
	_leftNav();
	_navDel();
});
//公共变量

//左栏导航事件
function _leftNav(){
	$("#leftnav li h1").on("click",function(){
		$(this).eq($(this).index()).parent().addClass("active").siblings().removeClass("active").children("dl").slideUp();
		$(this).next("dl").slideDown();
	});
}
//内容框标签导航事件
function _navDel(){
	//删除
	$("#topnav").on("click","span",function(e){
		e.stopPropagation();
		var showId = "";
		if($(this).parent().hasClass("active")){
			$("#topnav li:first-child").addClass("active");
			showId = $("#topnav li:first-child").attr("id");
			console.log(showId);
			showId = parseInt(showId.replace(/[^0-9]/ig,""));
			$("#frm"+showId).show();
		}
		var thisId = $(this).parent().attr("id");
		var numId = parseInt(thisId.replace(/[^0-9]/ig,""));//去除追加的id前缀
		$(this).parent().remove();
		$("#frm"+numId).remove();//当前iframe移除
	});
	//当前
	$("#topnav").on("click","li",function(){
		$(this).addClass("active").siblings().removeClass("active");
		var thisId = $(this).attr("id");
		var numId = parseInt(thisId.replace(/[^0-9]/ig,""));//去除追加的id前缀
		$("#rightbox iframe").hide();
		$("#frm"+numId).show();//当前iframe内容显示
	});
}
//打开左栏导航事件
function _openUrl(idNo,name,url){
	//判断标签导航等于第九个的时候
	var tabNum = $("#rightbox li").length+1;
	//console.log(tabNum);
	if(tabNum == 9){
        if($("#nav" + idNo).length > 0){
            $("#nav" + idNo).click();
        }else{
        	var dlgbody = '<div class="DialogHtml" id="DialogHtml"><div class="m-tipbox"><div class="tiptitle">操作提示</div>'
				+'<div class="tipcon">打开窗口个数已经达到' + (tabNum - 1) + '个,新开窗口将会关闭第一个窗口,是否继续？</div><div class="tipbtn">'
				+'<span id="dsurebtn" style="margin-right:20px;">确定</span><span id="dbackbtn">取消</span></div></div>';
			$("body").append(dlgbody);
			$("#DialogHtml").show();
			//
			$("#dsurebtn").on("click",function(){
				$("#DialogHtml").hide().remove();
				$("#topnav li:first-child").remove();
                $("#rightbox iframe:eq(0)").remove();
                navOpen(idNo,name,url);
				return false;
			});
			$("#dbackbtn").on("click",function(){
				$("#DialogHtml").hide().remove();
		        return true;
			});
        }
	}else{
		navOpen(idNo,name,url);
	}
}
//左栏导航调用事件
function navOpen(idNo,name,url){
	$("#topnav").find("li").removeClass("active");
	$("#rightbox iframe").hide();
	//标签导航
	var $html = '<li class="active" id="nav'+idNo+'"><label>'+name+'</label><span>×</span></li>';
	//内容iframe
	var $iframe = '<iframe src="'+url+'" id="frm'+idNo+'" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>';
	//判断标签容器中是否存在导航
	if($("#nav" + idNo).length > 0){
        $("#nav" + idNo).click();
    }else{
    	$("#topnav").append($html);
    	$("#rightbox").append($iframe);
    }
}
