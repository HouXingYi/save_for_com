$(function() {

})
//注册第三步  车辆信息  
function selecton(){ 
	$("#select_on").toggleClass("on")
}
function addcar(){
    var car_num = $("#car").find(".car-item").length+1;
	var html= `<div class="car-item"><div class="title"><div class="name"><i></i>
					<span>车辆`+chinese+`</span></div><div class="delete">删除</div></div>
					<div class="car-info"><div class="left"><input type="text" placeholder="车牌号"/>
					<input type="text" placeholder="联系方式"/><div class="select">
					<div class="on" id="select_on" onclick="selecton()"></div><span>投保</span>
					</div></div><div class="middle">
					<select name="" id=""><option value="">车型</option><option value="">b</option><option value="">c</option>
					</select><input type="text" placeholder="关联微信"/>
					<input type="text" placeholder="投保内容"/></div>
					<div class="right"><input type="text" placeholder="司机"/><input type="text" placeholder="身份证号码"/>
					<input type="text" placeholder="金额"/></div></div></div>`;
	
    $("#car-item").after(html);	
}
function deletecar(){
	alert($(this).index())
}
