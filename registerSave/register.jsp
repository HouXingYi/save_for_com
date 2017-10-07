<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
  <head>
    <base href="<%=basePath%>">
    
    <title>用户注册</title>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9" />
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<script type="text/javascript"  src="<%=request.getContextPath()%>/jslib/es5-shim.js"></script>
	<script type="text/javascript"  src="<%=request.getContextPath()%>/jslib/es5-sham.js"></script>
	<script type="text/javascript"  src="<%=request.getContextPath()%>/jslib/jquery-easyui-1.5.2/jquery.min.js"></script>
	<script type="text/javascript"  src="<%=request.getContextPath()%>/jslib/alert/ui.js"></script>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/jslib/alert/css/style.css" />
	<script type="text/javascript" src="<%=request.getContextPath()%>/common/js/common.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/common/js/json2.js"></script>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/common/css/cityLayout.css" />
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/modules/register/register.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/jslib/Modaal/modaal.css">
	
    <link rel="stylesheet" href="<%=request.getContextPath()%>/modules/register/lib/webuploader.css">
<%--     <link rel="stylesheet" href="<%=request.getContextPath()%>/modules/register/css/reset.css"> --%>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/modules/register/lib/Hgallery/Hgallery.css">
    <link rel="stylesheet" href="<%=request.getContextPath()%>/modules/register/css/index.css">
    
	<script type="text/javascript" src="${pageContext.request.contextPath}/jslib/My97DatePicker/WdatePicker.js"></script>
	
<%-- 	<link rel="stylesheet" href="<%=request.getContextPath()%>/modules/register/lib/kuCity.css"> --%>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/modules/register/lib/jquery.step.css" />
	<script src="${pageContext.request.contextPath}/jslib/Modaal/modaal.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/modules/register/lib/jquery.step.min.js"></script>
	<script src="${pageContext.request.contextPath}/jslib/template-web.js"></script>
	 
	<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=YVpsLwbdqubaRZvSP6Ocl3zTVwZbcQ4c"></script>
	<!-- 加载鼠标绘制工具 -->
	<script type="text/javascript" src="http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js"></script>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<style type="text/css">
			.alert {
				width: 250px;
				text-align: center;
				color: #fff;
				margin: 10px auto;
				border-radius: 5px;
				line-height: 30px;
				cursor: pointer;
				background: #4ab819;
			}
	</style>
	<script type="text/javascript">
		var contextPath = "${pageContext.request.contextPath}";
		window.onload=function(){
			document.getElementsByTagName("body")[0].onkeydown =function(){
				//获取事件对象
				if(event.keyCode==8){//判断按键为backSpace键
						//获取按键按下时光标做指向的element
						var elem = event.srcElement || event.currentTarget; 
						//判断是否需要阻止按下键盘的事件默认传递
						var name = elem.nodeName;
						if(name!='INPUT' && name!='TEXTAREA'){
							return _stopIt(event);
						}
						var type_e = elem.type.toUpperCase();
						if(name=='INPUT' && (type_e!='TEXT' && type_e!='TEXTAREA' && type_e!='PASSWORD' && type_e!='FILE')){
								return _stopIt(event);
						}
						if(name=='INPUT' && (elem.readOnly==true || elem.disabled ==true)){
								return _stopIt(event);
						}
					}
				};
			};
		function _stopIt(e){
			if(e.returnValue){
				e.returnValue = false ;
			}
			if(e.preventDefault ){
				e.preventDefault();
			}				
			return false;
		}
	</script>
  </head>
	<body>
		<div class="header clearfix">
			<div class="logo"></div>
			<div class="login"><span>已有账号？</span>
				<a href="">去登录</a>
			</div>
		</div>
		<div class="main">
			<!--流程条-->
			<div id="step"></div>
			<div class="register-info" id="regCtn">
				<!--注册第一步  账号注册  开始-->
				<div class="ctn0 stepctn infobox">
					<div class="username">
						<label>账号</label><input type="text" name="ntuname" maxlength="12" id="ntuname" placeholder="输入手机号" />
					</div>
					<div class="verifi-code">
						<label>验证码</label><input id="verifiedCode" maxlength="4" name="verifiedCode" type="text" /><span><img id="secimg" src="" alt="点击刷新" /></span>
					</div>
<!-- 					<div class="verifi-num"> -->
<!-- 						<label>短信验证码</label><input type="text" /><span>获取验证码</span> -->
<!-- 					</div> -->
					<div class="password">
						<label>密码</label><input type="password" name="ntupwd" id="ntupwd" />
					</div>
					<div class="password-again">
						<label>再次确认密码</label><input type="password" name="edntupwd" id="edntupwd" />
					</div>
				</div>
				<!--注册第一步结束-->
				<!--注册第二步  基本信息  开始-->
				<div class="ctn1 disnone stepctn basic-info">
					<div class="company-name">
						<label>单位名称</label><input type="text" maxlength="35" name="ntufullname" id="ntufullname" />
<!-- 						<input type="hidden" id="isPersonal" name="isPersonal" value="0"> -->
						<input type="checkbox" id="isPersonal" name="isPersonal" style="width:20px;height:20px;margin-top:4px;" value="1" />个人
<!-- 						<input type="radio" id="isPersonal" name=isPersonal value="0"> -->
<!-- 						<label name="isPersonalLable" for="isPersonal" onclick="checkedIsPersonal();">个人</label> -->
					</div>
					<div class="linkman">
						<label>联系人</label><input type="text" maxlength="20" name="linker" id="linker" />
					</div>
					<div class="linkway">
						<label>联系方式</label><input type="text" maxlength="25" name="linkphone" id="linkphone" />
					</div>
					<div class="address">
						<label>所在地区</label>
						<div class="info">
							<div>
								<input name="addressArea" id="addressArea" readonly="readonly" autocomplete="off" type="text" class="pointinput inputFocus proCityQueryAll proProvinceSelAll" placeholder="请选择" ov="请点击选择省、市、区名称">
<!-- 								<input name="address_1" id="address_1" autocomplete="off" type="text" onFocus="if (this.value=='请点击选择省、市、区') {this.value='';this.style.color='#000';}" class="pointinput inputFocus proCityQueryAll proProvinceSelAll" value="请点击选择省、市、区"  ov="请点击选择省、市、区名称" /> -->
<!-- 								<select id="s_province" name="s_province"></select> -->
<!-- 								<select id="s_city" name="s_city"></select> -->
<!-- 								<select id="s_county" name="s_county"></select> -->
<%-- 								<script class="resources library" src="<%=request.getContextPath()%>/modules/register/lib/area.js" type="text/javascript"></script> --%>
								<script type="text/javascript">
// 									_init_area();
								</script>
							</div>
							<div id="show"></div>
						</div>
					</div>
					<div class="position-address">
						<label>详细地址</label>
						<input type="text" id="naddress" name="naddress" maxlength="80" placeholder="建议您填写详细收货地址，例如街道名称"/>
<!-- 						<textarea id="naddress" name="naddress"  rows="6" cols="60" placeholder="建议您如实填写详细收货地址，例如街道名称，门牌号码，楼层和房间号等信息"></textarea> -->
<!-- 						<input type="text" id="naddress" name="naddress" class="cell" /> -->
<!-- 						<span class="map"></span> -->
						<!--<div class="cell">自动定位当前位置</div>-->
					</div>
				</div>

				<!--注册第二步结束-->

				<!--注册第三步  业务信息  开始-->
				<div class="ctn2 disnone stepctn server-info">
					<div class="wrap">
						<div class="car-type bill">
							<span>是否提供发票</span>
							<input type="radio" id="a" checked="checked" name="isinvoice" value="0">
							<label name="a" class="checked" for="a" onclick="checkedCar3(this);">是</label>
							<input type="radio" id="b" name="isinvoice" value="1">
							<label name="b" for="b" onclick="checkedCar3(this);">否</label>
							<input type="radio" id="c" name="isinvoice" value="2">
							<label name="c" for="c" onclick="checkedCar3(this);">均可</label>
						</div>
						<div class="addline-btn">
							<a href='#addlineDialog' class="addlineLink">新增路线</a>
						</div>
						<div class="addlineBox">

							<!-- <div class="line">
								<span>覆盖区域</span>
								<div class="line-cell">
									<input readonly="readonly" name="rearea" autocomplete="off" type="text" class="reareainput pointinput inputFocus proCityQueryAll proProvinceSelAll" ov="请点击选择省、市、区名称"/>
									<span class="btn delete">删除</span>
								</div>
							</div>
							<div class="line">
								<span>出发地</span>
								<div class="line-cell">
									<input readonly="readonly" name="startarea" autocomplete="off" type="text" class="line-start-input pointinput inputFocus proCityQueryAll proProvinceSelAll" ov="请点击选择省、市、区名称"/>
									<label class="line-end" for="">目的地</label>
									<input readonly="readonly" name="endarea" autocomplete="off" type="text" class="line-end-input pointinput inputFocus proCityQueryAll proProvinceSelAll" ov="请点击选择省、市、区名称"/>
									<span class="btn delete">删除</span>
								</div>	
							</div> -->

						</div>
					</div>
				</div>
				<!--注册第三步结束-->
				<!--注册第四步  资质信息  开始-->
				<div class="ctn3 disnone stepctn data-info">
					<div class="explain">
						<div class="wrap">
							<div class="title">上传说明：</div>
							<div class="content">
<!-- 								<p>1.必须上传车辆资质，一个车辆需提供一套资质，如道路运输证等；并上传司机驾驶证；</p> -->
<!-- 								<p>2.车辆投保的需上传投标凭证；</p> -->
								<p>企业和个体工商户需上传三证等资质</p>
							</div>
						</div>
					</div>
				    <div id="data-items">
				        
				    </div>
<!-- 					<form action="#" id="inputForm"> -->
<!-- 						<div id="data-items"> -->
<!-- 							<div class="data-item"> -->
<!-- 								<div class="img"> -->
<!-- 									<div class="wrap"> -->
<%-- 										<img alt="上传" src="<%=request.getContextPath()%>/modules/register/img/add-picture.png" width="76" height="76"> --%>
<!-- 										<p class="msg">上传证件</p> -->
<!-- 										<input id="File1" name="file" type="file"  onchange="javascript:setImagePreview(this)" /> -->
<!-- 									</div> -->
<!-- 								</div> -->
<!-- 								<div class="data-one"> -->
<!-- 									<div class="wrap"> -->
<!-- 										<div class="one"> -->
<!-- 											<label for="">证件号</label><input type="text" /> -->
<!-- 										</div> -->
<!-- 									</div> -->
<!-- 								</div> -->
<!-- 								<div class="delete" onclick="del2(event);"> -->
<!-- 									<span>删除</span> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</form> -->
<!-- 					<div class="databtn"> -->
<!-- 						<div class="add-data" onclick="addData();">添加证明</div> -->
<!-- 						<div class="clear-data">清空所有资质凭证</div> -->
<!-- 					</div> -->
				</div>
				<!--注册第四步   结束-->
			</div>
			<div class="btnbox">
				<div class="next-step" id="nextBtn"><span class="txt">下一步</span>
					<div class="arrow"></div>
				</div>
				<div class="up-step disabled" id="prevBtn">
					<div class="arrow "></div><span class="txt ">上一步</span>
				</div>
			</div>
		</div>


		<div class="uploadImgBox" id="uploadImgBox">
            <div class="topInfo">
                <div class="infoGroup" id="infoGroup" data-id="">
                    <div class="line" class="paperType">
                        <span class="textLeft">证件类型:</span>
                        <span class="textRight">
<!-- 				                            <input type="text" class="paperTypeInput"> -->
							<select class="paperTypeInput">
		                    	<c:forEach items="${listCart}" var="obj">
		                    		<option value="${obj.TSP_VALUE }">${obj.TSP_NAME }</option>
		                    	</c:forEach>
	                    	</select>
                        </span>
                    </div>
                    <div class="line" class="paperNum">
                        <span class="textLeft">证件号:</span>
                        <span class="textRight">
                            <input type="text" class="paperNumInput">
                        </span>
                    </div>
                    <div class="line" class="paperStartTime">
                        <span class="textLeft">生效日期:</span>
                        <span class="textRight">
                            <input type="text" class="paperTimeStartInput Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'});"/>
                        </span>
					</div>
					<div class="line" class="paperEndTime">
						<span class="textLeft">失效日期:</span>
						<span class="textRight">
							<input type="text" class="paperTimeEndInput Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'});"/>
						</span>
					</div>
					<div class="addBtn" style="display:none">
						添加证明照片
					</div>
                </div>
                <!-- <div class="editBox">
                    <div class="imgAddNew editItem" id="imgAddNew"></div>
                    <div class="imgDelete editItem" id="imgDelete"></div>
                </div> -->
            </div>
            <div id="DB_gallery">
                <div class="addBox" id="addBox" style="z-index:10;">
                    <div class="addImgBox" id="addImgBox" >
                        <img src="<%=request.getContextPath()%>/modules/register/img/add.png" alt="">
                    </div>
                    <div class="hidden" id="filePicker" >
                    </div>
                </div>
                <div class="DB_imgSet" id="DB_imgSet" style="z-index:-10">
                    <div class="DB_imgWin">
                        <div class="imgBox" >
                            <img src="" alt=""/>
                        </div>
                    </div>
                    <div class="DB_page"><span class="DB_current">0</span>-<span class="DB_total">0</span></div>
                    <div class="DB_prevBtn"><img src="<%=request.getContextPath()%>/modules/register/img/prev_off.png" alt="向前"/></div>
					<div class="DB_nextBtn"><img src="<%=request.getContextPath()%>/modules/register/img/next_off.png" alt="向后"/></div>
                    <div class="imgDelete" id="imgDelete">
						<i class="imgDeleteIcon"></i>
						<span class="imgDeletetext">删除</span>
					</div>
                </div>
                <div class="DB_thumSet" id="DB_thumSet" style="z-index:-10">
                    <ul class="DB_thumMove" id="DB_thumMove">
                    </ul>
                    <div class="DB_thumLine"></div>
                    <div class="DB_prevPageBtn"><img src="<%=request.getContextPath()%>/modules/register/img/prev_page.png" alt="上一页"/></div>
                    <div class="DB_nextPageBtn"><img src="<%=request.getContextPath()%>/modules/register/img/next_page.png" alt="下一页"/></div>
                </div>
            </div>
        </div>

		<div id="addlineDialog" style="display:none">
			<div class="addlineDialogBox">
				<div class="addlineTitle">新增路线</div>
				<div class="addlineCon">
				</div>
				<div class="addlineBtngroup">
					<div class="btn cancel">取消</div>
					<div class="btn next">下一步</div>
				</div>
			</div>
		</div>

		<script id="lineBoxTpl" type="text/html">
			<div class="lineBox">
				<!-- <div class="car-type good-line">
					<span>优势路线</span>
					<input type="radio" id="m" checked="" name="raremark" value="0">
					<label name="m" for="m" class="" onclick="checkedCar2(this);">均可&nbsp;(勾选后表示全部线路均可，不用填写路线)</label>
				</div> -->
				<div id="line" data-lineType="1">
					<div>
						<div class="car-type two-way" >
							<span>线路选择</span>
							<input type="radio" id="a2" class="a2" selectable="able" name="isdouble" value="-1">
							<label name="a2" for="a2" onclick="checkedCar1(this,-1);">区域覆盖</label>
							<input type="radio" id="b2" class="b2" selectable="able"  name="isdouble" value="0">     
							<label name="b2"  for="b2" onclick="checkedCar1(this,0);">单向</label>
							<input type="radio" id="c2" class="c2" selectable="able" checked="checked" name="isdouble" value="1">
							<label name="c2" class="checked" for="c2" onclick="checkedCar1(this,1);">双向</label>
						</div>
					</div>
				</div>
			</div>
		</script>

		<script id="addLineTpl1" type="text/html">
			<div class="line" >
				<span>覆盖区域</span>
				<div class="line-cell">
					<input type="hidden" value="{{type}}">
					<input readonly="readonly" name="rearea" autocomplete="off" type="text" class="reareainput pointinput inputFocus proCityQueryAll proProvinceSelAll" ov="请点击选择省、市、区名称"/>
					<span class="btn delete" onclick="deleteLine(this);">删除</span>
				</div>
			</div>
		</script>
		<script id="addLineTpl2" type="text/html">
		<div class="line">
			<span>出发地</span>
			<div class="line-cell">
				<input type="hidden" value="{{type}}">
				<!-- <label class="line-start" for="">出发地</label> -->
				<input readonly="readonly" name="startarea" autocomplete="off" type="text" class="line-start-input pointinput inputFocus proCityQueryAll proProvinceSelAll" ov="请点击选择省、市、区名称"/>
				<label class="line-end" for="">目的地</label>
				<input readonly="readonly" name="endarea" autocomplete="off" type="text" class="line-end-input pointinput inputFocus proCityQueryAll proProvinceSelAll" ov="请点击选择省、市、区名称"/>
				<span class="btn delete" onclick="deleteLine(this);">删除</span>
			</div>	
		</div>
		</script>
	
		<%@ include file="/WEB-INF/include/city.jsp"%>
		<script type="text/javascript" src="<%=request.getContextPath()%>/modules/register/lib/kuCity.js "></script>
        <script type="text/javascript" src="<%=request.getContextPath()%>/common/js/publicArea.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/modules/register/register.js "></script>
        <script type="text/javascript" src="<%=request.getContextPath()%>/modules/register/saveData.js"></script>
	    <script type="text/javascript" src="<%=request.getContextPath()%>/modules/register/lib/webuploader.js"></script>
	    <script type="text/javascript" src="<%=request.getContextPath()%>/modules/register/lib/Hgallery/Hgallery.js"></script>
	    <script type="text/javascript" src="<%=request.getContextPath()%>/modules/register/index.js"></script>
	</body>
</html>
