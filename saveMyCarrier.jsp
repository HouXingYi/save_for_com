<%@ page language="java"  pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<title>我的承运</title>

<link rel="stylesheet" href="${pageContext.request.contextPath}/modules/offer/reset.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/modules/offer/hTable.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/modules/offer/inqueryInfo.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/jslib/Modaal/modaal.css">
<script src="${pageContext.request.contextPath}/jslib/jquery-3.2.1.min.js"></script>
<script src="${pageContext.request.contextPath}/jslib/underscore.js"></script>
<script src="${pageContext.request.contextPath}/jslib/template-web.js"></script>
<script src="${pageContext.request.contextPath}/jslib/Modaal/modaal.js"></script>
<script src="${pageContext.request.contextPath}/modules/carrier/myCarrier.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/jslib/jquery-easyui-1.5.2/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/jslib/jquery-easyui-1.5.2/locale/easyui-lang-zh_CN.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/jslib/jquery-easyui-1.5.2/themes/default/easyui.css" type="text/css"></link>
<link rel="stylesheet" href="${pageContext.request.contextPath}/jslib/jquery-easyui-1.5.2/themes/icon.css"type="text/css"></link>
<script type="text/javascript">

function queryData(){
	inqueryInfo.getData();
}
//查看
function getCarrierInfo(nlid,conid){
	//根据cmid获取运单信息
	$.ajax({
		url:$("#path").val()+"/carrier/getCarrierInfo",
		data:"nlid="+nlid+"&conid="+conid,
		type:"post",
		dataType:"json",
		success:function(data){
			if(data.error){
				alert("获取运单信息异常："+data.error);
			}else{
				$("#linename").html(data.LINENAME);
				$("#cartypes").html(data.CARTYPES);
				$("#weight").html(data.WEIGHT);
				$("#volume").html(data.VOLUME);
				$("#isinvoice").html(data.ISINVOICE);
				
				var attachments = data.attachment;
				if(attachments != null && attachments.length>0){
					var picHtml = "";
					for(var i=0;i<attachments.length;i++){
						var obj = attachments[i];
						var url = encodeURI($("#path").val()+"/carrier/getPic?filePath="+obj.FILEPATH);
						picHtml += "<img  src=\""+url+"\"><br/>";
					}
					$("#picDiv").html(picHtml);
				}
				
				$("#carrierDetailDialog").dialog({
					    width: 600,    
					    height: 200,    
					    closed: false,    
					    cache: false,   
					    resizable:true, 
					    modal: true ,
					    buttons:[{
					    	text:"取消",
					    	handler:function(){
					    		$("#carrierDetailDialog").dialog("close");
					    	}
					    }]
				});
				
			}
		}
	});
}
//安排车辆
function arrangeCar(ntuid,cmid){
	$.ajax({
		url:path+"/carrier/getUsersNumplate",
		data:"ntuid="+ntuid,
		type:"post",
		dataType:"json",
		success:function(data){
			console.info(data);
			if(data.error){
				alert("获取用户车牌号异常："+data.error);
			}else{
				var optionsHtml = "<option value=''>-</option>";
				var arry = data.list;
				for(var i=0;i<arry.length;i++){
					var obj = arry[i];
					optionsHtml += "<option value='"+obj.NUMPLATE+","+obj.CARID+"'>"+obj.NUMPLATE+"</option>";
				}
				$("#numplate").html(optionsHtml);
				
				$("#arrangeCarDialog").dialog({
						width: 400,    
					    height: 200,    
					    closed: false,    
					    cache: false, 
					    resizable:true,   
					    modal: true ,
					    buttons:[{
					    	text:"取消",
					    	handler:function(){
					    		$("#arrangeCarDialog").dialog("close");
					    	}
					    },{
					    	text:"确认",
					    	handler:function(){
					    		var numplate = $("#numplate").val();
					    		if(numplate == ""){
					    			alert("请选择车牌号！");
					    			return;
					    		}
					    		numplate = numplate.split(",")[0];
					    		$.ajax({
					    			url:path+"/carrier/setNumplateToManage",
					    			data:"numplate="+numplate+"&cmid="+cmid,
					    			type:"post",
					    			dataType:"json",
					    			success:function(data){
					    				if(data.success){
					    					alert("设置成功！");
					    					$("#arrangeCarDialog").dialog("close");
					    					inqueryInfo.getData();
					    				}else{
					    					alert("设置失败，异常信息如下："+data.error);
					    				}
					    			}
					    		});
					    	}
					    }]
				});
			}
		}
	});
}

$(function(){

	$("#numplate").change(function(){
		var value = $(this).val();
		var numplate = value.split(",")[0];
		var carid = value.split(",")[1];
		$.ajax({
			url:path+"/carrier/getCarInfo",
			data:"carid="+carid,
			tyep:"post",
			dataType:"json",
			success:function(data){
				
			}
		});
	});
	
})
</script>
</head>
<body>
<input type="hidden" id="path" value="${pageContext.request.contextPath}"/>
    <div class="inqueryBox">
        <form action="">
            <div class="topBar">
                <div class="line topItem">
                 <span class="t">订单号：</span>
                    <input id=""/>
                </div>
                <div class="signDate topItem">
                    <span class="t">状态：</span>
                    <select id="">
	                  <option value="待发车">待发车</option>
	                  <option value="待收货">待收货</option>
	                  <option value="待装车">待装车</option>
	                  <option value="全部" selected>全部</option>
	                  <option value="待安排车辆">待安排车辆</option>
                    </select>
                </div>
                <div class="button" onclick="queryData();">查询</div>
            </div>
            <div class="tableBox">
                <table class="hTable">
                    <thead>
                        <tr>
                            <th>车牌号</th>
                            <th>状态</th>
                            <th>合同签订日期</th>
                            <th>运单内容</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody id="dataTBody">
                    </tbody>
                </table>
            </div>
        </form>
        <div class="paginationBox">
        </div>
    </div>
    
    <div id="arrangeCarDialog" style="display:none">
    	车型：<input id="cartype" readOnly/><br/>
    	车牌号：
	    	<select id="numplate">
	    	</select><br/>
    	关联微信：<input id="" readOnly/><br/>
    	司机：<input id="" readOnly/><br/>
    	联系方式：<input id="" readOnly/><br/>
    	身份证号：<input id="" readOnly/><br/>
    	驾驶证：点击查看
    </div>
    <div id="carrierDetailDialog" style="display:none">   
        <div>
        	<p>运单内容：</p>
        	<div>
        		期望装车时间：<span id=""></span><br/>
        		期望发车时间：<span id=""></span><br/>
        		订单号：<span id=""></span><br/>
				线路名称：<span id="linename"></span><br/>
				用车类型：<span id="cartypes"></span><br/>
				需求车长：<span id=""></span><br/>
				需求车型：<span id=""></span><br/>
				货物名称：<span id=""></span><br/>
				货物重量：<span id="weight"></span><br/>
				货物体积：<span id="volume"></span><br/>
				装卸货：<span id=""></span><br/>
				是否开票：<span id="isinvoice"></span><br/>
        	</div>
        </div>
        <div>
        	<p>合同：</p>
        	<div id="picDiv">
        		
        	</div>
        </div>
	</div>  
    
    <script id="listTpl" type="text/html">
        {{each list value i}}
        <tr>
            <td>{{ value.NUMPLATE }}</td>
            <td>{{ value.STATUS }}</td>
            <td>{{ value.CONTRACT_STARTTIME }}</td>
            <td>
				{{ value.volume }}
				{{ value.weight }}
				{{ value.weight }}
			</td>
            <td class="quotation">
				<a href='javascript:getCarrierInfo({{value.NLID}},{{value.CONID}});'>查看</a>
				<a href='javascript:arrangeCar({{value.NTUID}},{{value.CMID}});'>安排车辆</a>
			</td>
        </tr>
        {{/each}}
    </script>
</body>
</html>