var $step;
$(function() {
	
	window.imgUploadGallery = new ImgUploadGallery();
	
	//      	省市区三级联动调用
	var Gid = document.getElementById;
	var showArea = function() {
		Gid('show').innerHTML = "<h3>省" + Gid('s_province').value + " - 市" + Gid('s_city').value + " - 县/区" + Gid('s_county').value + "</h3>";
		Gid('s_county').setAttribute('onchange', 'showArea()');
	};

	// 线路城市选择调用 
	$('.search').kuCity();
	$('.search3').kuCity();

	// 分步插件
	$step = $("#step");
	$step.step({
		index: 0,
		time: 500,
		title: ["账号注册", "基本信息", "业务信息", "单位资质"]
	});

	$("#prevBtn").on("click", function() {
		$step.prevStep();
//		$index.text($step.getIndex());
		toTshiStep();
	});

	$("#nextBtn").on("click", function() {
		//校验
 		var checkMsg = checkData($step.getIndex());
 		if(checkMsg != "") {
 			mizhu.toast(checkMsg, 3000);
 //			alert(checkMsg);
 			return false;
 		}
		$step.nextStep();
//		$index.text($step.getIndex());
		toTshiStep();
	});
	
	//验证码
	$("#secimg").bind("click", function() {
		$(this).attr("src", contextPath + "/sysntuser/verified?" + new Date().getTime());
	});
	$("#secimg").click();
	
	$("#isPersonal").change(function() { 
		if($(this).is(':checked')) {
			$("#ntufullname").val("个人");
			$("#ntufullname").attr("readonly", true);
		}else{
			$("#ntufullname").val("");
			$("#ntufullname").attr("readonly", false);
		}
	});
	//登录名
	$("#ntuname").on("blur", function() {
		var msg = checkUsername();
		if(!isNull(msg)) {
			mizhu.toast(msg, 3000);
			$(this).focus();
		}
	});
});

//定位
function toTshiStep() {
	var i = $step.getIndex();
	$(".ctn" + i).removeClass("disnone").siblings().addClass("disnone");
	if(i == 3){
		var offset = $(".ctn3 .explain").offset();
		$("#uploadImgBox").css({
			"top" : "344px",
			"left" : offset.left + "px"
		});
	}else{
		$("#uploadImgBox").css({
			"top" : "-1000px"
		});
	}
	if($(".ctn0").hasClass("disnone")) {
		$("#prevBtn").removeClass("disabled");
	}
	if(!$(".ctn3").hasClass("disnone")) {
		if($("#nextBtn .txt").html() == "完成") {
			seaveData();
		}
		$("#nextBtn").addClass("finish");
		$("#nextBtn .txt").html("完成");
	} else {
		$("#nextBtn").removeClass("finish");
		$("#nextBtn .txt").html("下一步");
	}
}

//注册第三步   业务信息

$(".addlineLink").modaal({
	width : 480,
	height : 240,
	before_open : function(e){
		var lineBoxHtml = template("lineBoxTpl",{});
		$(".addlineCon").html(lineBoxHtml);
	},
	after_open : function(wrapper){
		$(wrapper).find(".cancel").off().on("click",function(){
			$('.addlineLink').modaal('close');
		});
		$(wrapper).find(".next").off().on("click",function(){
			var type = $(wrapper).find("#line").attr("data-linetype");
			if(type == "-1"){
				var lineBoxHtml = template("addLineTpl1",{type : type});
				$(".server-info .addlineBox").append(lineBoxHtml);
				$(".proProvinceSelAll").click(Initialization);  //初始化省市选择
				$('.addlineLink').modaal('close');
			}else if(type == "1" || type == "0"){
				var lineBoxHtml = template("addLineTpl2",{type : type});
				$(".server-info .addlineBox").append(lineBoxHtml);
				$(".proProvinceSelAll").click(Initialization);  //初始化省市选择
				$('.addlineLink').modaal('close');
			}
		});
	}
});
function deleteLine(_this){
	$(_this).parents(".line").remove();
}
function checkedCar1(_this,lineType) {

		var _thisInput = $(_this).prev();
		var selectable = _thisInput.attr("selectable");
		if(selectable == "disable"){
			return false
		}else if(selectable == "able"){
			$(_this).attr("class","checked").siblings("label").attr("class","");
			_thisInput.attr("checked",true).siblings("input").attr("checked",false);
		}

		$(_this).parents("#line").attr("data-lineType",lineType);

	// $('.bill label').click(function() {
		// var radioId = $(this).attr('name');
		// $('.bill label').removeAttr('class');
		// $(this).attr('class', 'checked');
		// $('.bill input[type="radio"]').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');
//		console.log($('input[type="radio"]:checked').attr('value'));
	// });

}

function checkedCar2(_this) {
		_this = $(_this);
		var prevInput = _this.prev();
		var thisClass = _this.attr("class");
		if( thisClass == "" ){
			var lineBox = _this.parents(".lineBox");
			_this.attr("class","checked");
			prevInput.attr("checked",true);			

			var selectInput = lineBox.find(".a2").attr("selectable","able").attr("checked",true);
			selectInput.siblings("input").attr("selectable","disable").attr("checked",false);
			console.log(selectInput.next());
			var selectLabel = selectInput.next().attr("class","checked").siblings("label").attr("class","");

			// lineBox.find(".line-start").text("覆盖区域");
//			lineBox.find(".line-start-input").text("");
			// lineBox.find(".line-end").css("display","none");
			// lineBox.find(".line-end-input").css("display","none");
			// lineBox.find(".two-way").hide();
		}else if( thisClass == "checked" ){
			var lineBox = _this.parents(".lineBox");
			_this.attr("class","");
			prevInput.attr("checked",false);			

			var selectInput = lineBox.find(".a2").attr("selectable","disable").attr("checked",false);
			selectInput.next().attr("class","");
			selectInput.siblings("input").attr("selectable","able");

			lineBox.find(".c2").attr("checked",true).next().attr("class","checked");

			// lineBox.find(".line-start").text("出发地");
//			lineBox.find(".line-start-input").text("");
			// lineBox.find(".line-end").css("display","block");
			// lineBox.find(".line-end-input").css("display","block");
			// lineBox.find(".two-way").show();
		}
		
		// $('.good-line label').toggleClass('checked');
		//	$('.good-line label').click(function() {
	//	});
//		if($(".good-line label")[0].className != "checked") { 
//			$(".lines").show();
//		}else{
//			$(".lines").hide();
//		}
}

function checkedCar3(_this) {
	var _this = $(_this);
	var prevInput = _this.prev();
	$(_this).attr("class","checked").siblings("label").attr("class","");
	prevInput.attr("checked",true).siblings("input").attr("checked",false);
// 	$('.two-way label').click(function() {
// 		var radioId = $(this).attr('name');
// 		$('.two-way label').removeAttr('class');
// 		$(this).attr('class', 'checked');
// 		$('.two-way input[type="radio"]').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');
// //		console.log($('input[type="radio"]:checked').attr('value'));
// 	});
}

function addline() {
	var arr = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
	var Num = arr[$(".lineBox").length + 1];
	
// 	var html = '<div class="line"><span>线路' + Num + '</span><div class="line-cell">' +
// 		'<label for="">出发地</label>'
// //		+'<input type="text" name="startarea" class="search">' +
// 		+'<input readonly="readonly" name="startarea" autocomplete="off" type="text" class="pointinput inputFocus proCityQueryAll proProvinceSelAll" ov="请点击选择省、市、区名称"/>' +
// //		'<label class="line-over" for="">途径</label><input type="text" class="search search2 ">' +
// 		'<label class="line-end" for="">目的地</label>'
// //		+'<input type="text" name="endarea" class="search3">' +
// 		+'<input readonly="readonly" name="endarea" autocomplete="off" type="text" class="pointinput inputFocus proCityQueryAll proProvinceSelAll"  ov="请点击选择省、市、区名称"/>' +
// 		'</div><div class="delete" onclick="del(event);"><span>删除</span></div></div>';
	
	// var lineBoxHtml = template("lineBoxTpl",{
	// 	opt : {
	// 		num : Num
	// 	}
	// });
	
	// $(".addline-btn").before(lineBoxHtml);
	$(".proProvinceSelAll").click(Initialization);  //初始化省市选择

//	$('.search').last().kuCity();
//	$('.search3').last().kuCity();
}

var addDataNum = 2;
//注册第四步    资质信息
function addData() {
	var html = '<div class="data-item"><div class="img"><div class="wrap"><img alt="上传" src="' + contextPath + '/modules/register/img/add-picture.png" width="76" height="76">' +
		'<p class="msg">上传证件</p><input name="file" type="file" onchange="javascript:setImagePreview(this)" /></div></div>' +
		'<div class="data-one"><div class="wrap"><div class="one">' +
		'<label for="">证件号</label><input type="text" /></div></div></div>' +
		'<div class="delete" onclick="del2(event);"><span>删除</span></div></div>';
	$("#data-items").append(html);
	addDataNum ++;
}

//下面用于图片上传预览功能
function setImagePreview(docObj) {
//	var docObj = document.getElementById("file" + id);// 文件id
	var imgObjPreview = $(docObj).siblings('img').get(0);//document.getElementById("preview" + id);// 显示位置id
	if (docObj.files && docObj.files[0]) {
		// 火狐下，直接设img属性
		imgObjPreview.style.display = 'block';
		imgObjPreview.style.width = '80px';
		imgObjPreview.style.height = '60px';
		// imgObjPreview.src = docObj.files[0].getAsDataURL();

		// 火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
		imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
	} else {
		// IE下，使用滤镜
		docObj.select();
		var imgSrc = document.selection.createRange().text;
		var localImagId = document.getElementById("localImag" + id);
		// 必须设置初始大小
		localImagId.style.width = "80px";
		localImagId.style.height = "60px";
		// 图片异常的捕捉，防止用户修改后缀来伪造图片
		try {
			localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
			localImagId.filters
					.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
		} catch (e) {
			alert("您上传的图片格式不正确，请重新选择!");
			return false;
		}
		imgObjPreview.style.display = 'none';
		document.selection.empty();
	}
	return true;
}

//验证登陆名是否重复
function checkUsername() {
	var msg = "";
	if(isNull($("#ntuname").val())) {
		return "请输入账号";
	}
	var reg = /^1[34578][0-9]{9}/;
//    var reg1 = /[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/;
    if(!reg.test($("#ntuname").val())){
    	return "账号必须为手机号码！";
    }
    //校验登陆名是否重复
	$.ajax({
		url : contextPath + '/sysntuser/checkusername',
		type : 'GET',
		data : {userName:$("#ntuname").val()},
		async : false,
		success : function(data) {
			if(data.msg != "OK") {
				msg = data.msg;
			}
		}
	});
	return msg;
}

//验证
function checkData(index) {
	var msg = "";
	index = 3;
	switch (index) {
	case 0:
	    //登录名重复判断
		msg = checkUsername();
		if(!isNull(msg)) {
			break;
		}
		if(isNull($("#verifiedCode").val())) {
			msg = "请输入验证码";
			break;
		}
		if($.trim($("#ntupwd").val()).length < 6) {
			msg = "密码不能小于6位!";
			break;
		}
		if(isNull($("#ntupwd").val())) {
			msg = "请输入密码";
			break;
		}
		if(isNull($("#edntupwd").val())) {
			msg = "请输入再次确认密码";
			break;
		}
		if($("#ntupwd").val() != $("#edntupwd").val()) {
			msg = "密码不一致!";
			break;
		}
		break;
	case 1:
		if(isNull($("#ntufullname").val())) {
			msg = "请输入单位名称";
			break;
		}
		if(isNull($("#linker").val())) {
			msg = "请输入联系人";
			break;
		}
//		var reg = /^1[34578][0-9]{9}/;
		if(isNull($("#linkphone").val())) {
			msg = "请输入联系方式";
			break;
		}
	    if($("#linkphone").val().length < 6){
	    	msg = "联系方式不能少于六位数";
			break;
	    }
		if(isNull($("#addressArea").val())) {
			msg = "请选择所在地区";
			break;
		}
		if(isNull($("#naddress").val())) {
			msg = "请输入详细地址";
			break;
		}
		break;
	case 2:
		debugger;
		if($(".lineBox").length <= 0){
			msg = "请填写线路";
			break;
		}
		var checks = true;
		$.each($(".lineBox"), function(index, item){
			var tmpModel = {};
//			tmpModel.ISDOUBLE = $($(item).find("input[name='isdouble']:checked")[0]).val();
			$.each($(item).find("input[name='isdouble']"), function(i, v) {
				if($(this).attr("checked")) {
					tmpModel.ISDOUBLE = $(this).val();
				}
			});
			tmpModel.STARTAREA = $($(item).find("input[name=startarea]")[0]).val();
			tmpModel.ENDAREA = $($(item).find("input[name=endarea]")[0]).val();
			if(checkIsNull(tmpModel.STARTAREA)) {
				msg = "请填写完整线路！";
				checks = false;
				return false;
			}
			if(tmpModel.ISDOUBLE != "-1" && checkIsNull(tmpModel.ENDAREA)) {
				msg = "请填写完整线路！";
				checks = false;
				return false;
			}
		});
		if(!checks) {
			msg = "请填写完整线路";
			break;
		}
		break;
	case 3:
		var listImgSave = window.imgUploadGallery.ImgSave();
		if(listImgSave.length <= 0) {
			msg = "请上传证件！";
			break;
		}
		$.each(listImgSave, function(i, v) {
			if(isNull(v.imgSrc)) {
				msg = "附件不能为空";
				return false;
			}
			if(isNull(v.certificationType)) {
				console.log(i);
				msg = "证件类型不能为空，请检查";
				return false;
			}
			if(isNull(v.certificationNum)) {
				msg = "证件号码不能为空，请检查";
				return false;
			}
		});
		break;
	}
	
	return msg;
}

//删除
function del(e) { // 删除路线
	var len = $(".lineBox").length;
	if(len > 1){
		$(e.target).parents(".lineBox").remove();
	}
}
function del2(e) {
	$(e.target).parents(".data-item").remove();
}
