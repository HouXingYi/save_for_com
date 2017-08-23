
(function($){
	$.fn.textSearch = function(str,options){
		var defaults = {
			divFlag: true,
			divStr: " ",
			markClass: "",
			markColor: "red",
			nullReport: true,
			callback: function(){
				return false;	
			}
		};
		var sets = $.extend({}, defaults, options || {}), clStr;
		if(sets.markClass){
			clStr = "class='"+sets.markClass+"'";	
		}else{
			clStr = "style='color:"+sets.markColor+";'";
		}
		
		$("span[rel='mark']").each(function() {
			var text = document.createTextNode($(this).text());	
			$(this).replaceWith($(text));
		});
        
		$.regTrim = function(s){
			var imp = /[\^\.\\\|\(\)\*\+\-\$\[\]\?]/g;
			var imp_c = {};
			imp_c["^"] = "\\^";
			imp_c["."] = "\\.";
			imp_c["\\"] = "\\\\";
			imp_c["|"] = "\\|";
			imp_c["("] = "\\(";
			imp_c[")"] = "\\)";
			imp_c["*"] = "\\*";
			imp_c["+"] = "\\+";
			imp_c["-"] = "\\-";
			imp_c["$"] = "\$";
			imp_c["["] = "\\[";
			imp_c["]"] = "\\]";
			imp_c["?"] = "\\?";
			s = s.replace(imp,function(o){
				return imp_c[o];					   
			});	
			return s;
		};
		$(this).each(function(){
			var t = $(this);
			str = $.trim(str);
			if(str === ""){
				// alert("鍏抽敭瀛椾负绌�");	
				return false;
			}else{
				var arr = [];
				if(sets.divFlag){
					arr = str.split(sets.divStr);	
				}else{
					arr.push(str);	
				}
			}
			var v_html = t.html();
			v_html = v_html.replace(/<!--(?:.*)\-->/g,"");
			
			var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;
			var a = v_html.match(tags), test = 0;
			$.each(a, function(i, c){
				if(!/<(?:.|\s)*?>/.test(c)){
					$.each(arr,function(index, con){
						if(con === ""){return;}
						var reg = new RegExp($.regTrim(con), "g");
						if(reg.test(c)){
							c = c.replace(reg,"鈾�"+con+"鈾€");
							test = 1;
						}
					});
					c = c.replace(/鈾�/g,"<mark "+clStr+">").replace(/鈾€/g,"</mark>");
					a[i] = c;
				}
			});
			var new_html = a.join("");
			
			$(this).html(new_html);
			
			if(test === 0 && sets.nullReport){
				// alert("娌℃湁鎼滅储缁撴灉");	
				return false;
			}
			
			sets.callback();
		});
	};
})(jQuery);