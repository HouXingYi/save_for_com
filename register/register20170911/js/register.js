$(function() {
	//      	省市区三级联动调用
	var Gid = document.getElementById;
	var showArea = function() {
		Gid('show').innerHTML = "<h3>省" + Gid('s_province').value + " - 市" + Gid('s_city').value + " - 县/区" + Gid('s_county').value + "</h3>";
		Gid('s_county').setAttribute('onchange', 'showArea()')
	};
	// 线路城市选择调用 
	$('.search').kuCity();
	$('.search3').kuCity();
	//			分步插件
	var $step = $("#step");
	var $index = $("#index");

	$step.step({
		index: 0,
		time: 500,
		title: ["账号注册", "基本信息", "业务信息", "资质信息"]
	});

	$index.text($step.getIndex());

	$("#prevBtn").on("click", function() {
		$step.prevStep();
		$index.text($step.getIndex());
		var i = $step.getIndex();
		$(".ctn" + i).removeClass("disnone").siblings().addClass("disnone");
		if($(".ctn0").hasClass("disnone")) {
			$("#prevBtn").removeClass("disabled")
		}
					  if(!$(".ctn3").hasClass("disnone")){
		               	$("#nextBtn").addClass("finish");
		               	$("#nextBtn .txt").html("完成");
		              }else{
		              	$("#nextBtn").removeClass("finish");
		               	$("#nextBtn .txt").html("下一步");
		              }
	});

	$("#nextBtn").on("click", function() {
		$step.nextStep();
		$index.text($step.getIndex());
		var i = $step.getIndex();
		$(".ctn" + i).removeClass("disnone").siblings().addClass("disnone");
		if($(".ctn0").hasClass("disnone")) {
			$("#prevBtn").removeClass("disabled")
		}
		               if(!$(".ctn3").hasClass("disnone")){
		               	$("#nextBtn").addClass("finish");
		               	$("#nextBtn .txt").html("完成");
		              }else{
		              	$("#nextBtn").removeClass("finish");
		               	$("#nextBtn .txt").html("下一步");
		              }
	});
})
//注册第三步  车辆信息  
function selecton() {
	$("#select_on").toggleClass("on")
}

function addcar() {
	var arr = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
	var Num = arr[$("#car").find(".car-item").length + 1];
	var html = '<div class="car-item"><div class="title"><div class="name"><i></i>' +
		'<span>车辆' + Num + '</span></div><div class="delete">删除</div></div>' +
		'<div class="car-info"><div class="left"><input type="text" placeholder="车牌号"/>' +
		'<input type="text" placeholder="联系方式"/><div class="select">' +
		'<div class="on" id="select_on" onclick="selecton()"></div><span>投保</span>' +
		'</div></div><div class="middle"><select name="" id=""><option value="">车型</option><option value="">b</option><option value="">c</option>' +
		'</select><input type="text" placeholder="关联微信"/><input type="text" placeholder="投保内容"/></div>' +
		'<div class="right"><input type="text" placeholder="司机"/><input type="text" placeholder="身份证号码"/><input type="text" placeholder="金额"/></div></div></div>';

	$("#car-item").append(html);
}

function deletecar() {
	alert($(this).index())
}
//注册第四步
function checkedCar1() {
	$('.bill label').click(function() {
		var radioId = $(this).attr('name');
		$('.bill label').removeAttr('class') && $(this).attr('class', 'checked');
		$('.bill input[type="radio"]').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');
		console.log($('input[type="radio"]:checked').attr('value'))
	})
}
function checkedCar2() {
	$('.good-line label').click(function() {
		$('.good-line label').toggleClass('checked')
	})
}
function checkedCar3() {
	$('.two-way label').click(function() {
		var radioId = $(this).attr('name');
		$('.two-way label').removeAttr('class') && $(this).attr('class', 'checked');
		$('.two-way input[type="radio"]').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');
		console.log($('input[type="radio"]:checked').attr('value'))
	})
}
// 注册第四步  业务信息
function addline() {
	var arr = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
	var Num = arr[$(".line").length + 1];
			var html = 			`<div class="line">
									<span>线路`+Num+`</span>
									<div class="line-cell">
										<label for="">出发地</label><input type="text" class="search">
										<label class="line-over" for="">途径</label><input type="text" class="search search2 ">
										<label class="line-end" for="">目的地</label><input type="text" class="search3">
										</div><div class="delete" onclick="del(this);">
										<span>删除</span>
										</div></div>`;
	$("#line").append(html);
}

//注册第五步    资质信息
function addData() {
	var html = `<div class="data-item">
							<div class="img">
								<div class="wrap">
									<div class="picture"></div>
									<p class="msg">上传证件</p>
									<input id="File1" type="file" />
								</div>
							</div>
							<div class="data-one">
								<div class="wrap">
									<div class="one">
										<label for="">证件号</label><input type="text" />
									</div>
								</div>
							</div>
							<div class="delete" onclick="del(e);">
								<span>删除</span>
							</div>
						</div>`;
	$("#data-items").append(html);
}
//删除
function del(event){

	$(event).parents(".line")[0].remove();

//	var line = $(this).parent(".line");
//	line.each(function(index,elem){
//		console.log(index);
//		console.log(elem);
//	})

}
