;(function($){
	
	function HGallery(options){
		var that = this;
		var opt={
			thumWidth:110,            
			thumGap:8,                
			thumMoveStep:5,             
			moveSpeed:300,           
			fadeSpeed:300,             
			end:''
		}
		this.opt = $.extend(opt,options);
		this.$this=$(this);
		this.wrap = $("#DB_gallery");
		this.$imgSet=this.wrap.find('.DB_imgSet');
		this.$imgWin=this.$imgSet.find('.DB_imgWin');
		this.$page=this.wrap.find('.DB_page');
		this.$pageCurrent=this.$page.find('.DB_current');
		this.$pageTotal=this.$page.find('.DB_total');
		this.$thumSet=this.wrap.find('.DB_thumSet');
		this.$thumMove=this.$thumSet.find('.DB_thumMove');
		this.$thumList=this.$thumMove.find('li');
		this.$thumLine=this.wrap.find('.DB_thumLine');
		this.$nextBtn=this.wrap.find('.DB_nextBtn');
		this.$prevBtn=this.wrap.find('.DB_prevBtn');
		this.$nextPageBtn=this.wrap.find('.DB_nextPageBtn');
		this.$prevPageBtn=this.wrap.find('.DB_prevPageBtn');
		this.objNum=this.$thumList.length;
		this.currentObj=0;
		this.fixObj=0;
		this.currentPage=0;
		this.totalPage=Math.floor(that.objNum/that.opt.thumMoveStep);
		this.oldImg;
		this.init();
	}
	HGallery.prototype = {
		init : function(){
			this.setInit();
			this.setMouseEvent();
			this.changeImg();
		},
		refresh : function(){
			var that = this;
			this.setMouseEvent();
			this.objNum=this.$thumMove.find('li').length;
			this.totalPage=Math.floor(that.objNum/that.opt.thumMoveStep);
			this.changeImg();
		},
		setInit : function(){
			this.$thumMove.append(this.$thumLine.get());
		},
		setMouseEvent : function(){
			var that = this;
			this.$thumMove.on("click","li",function(e){
				e.preventDefault();
				that.currentObj=$(this).index();
				that.changeImg();
			});

			this.$nextBtn.off().on('click',function(){
				that.currentObj++;
				that.changeImg();
				that.currentPage=Math.floor(that.currentObj/that.opt.thumMoveStep);
				that.moveThum();
			});
			this.$prevBtn.off().on('click',function(){
				that.currentObj--;
				that.changeImg();
				currentPage=Math.floor(that.currentObj/that.opt.thumMoveStep);
				that.moveThum();
			});

			this.$nextPageBtn.off().on('click',function(){
				that.currentPage++;
				that.moveThum();
			});
			this.$prevPageBtn.off().on('click',function(){
				that.currentPage--;
				that.moveThum();
			});

		},
		moveThum : function(){
			var that = this;
			var pos=((that.opt.thumWidth+that.opt.thumGap)*that.opt.thumMoveStep)*that.currentPage
			that.$thumMove.animate({'left':-pos},that.opt.moveSpeed);
			that.setVisibleBtn();
		},
		setVisibleBtn : function(){
			this.$prevPageBtn.show();
			this.$nextPageBtn.show();
			this.$prevBtn.show();
			this.$nextBtn.show();
			if(this.currentPage==0)this.$prevPageBtn.hide();
			if(this.currentPage==this.totalPage-1)this.$nextPageBtn.hide();
			if(this.currentObj==0)this.$prevBtn.hide();
			if(this.currentObj==this.objNum-1)this.$nextBtn.hide();
		},
		changeImg : function(){
			var that = this;
			// if(this.oldImg!=null){
			// 	this.$imgWin.css('background','url('+that.oldImg+') no-repeat');
			// }
			var $thum=this.$thumMove.find('li').eq(that.currentObj);
			var _src=this.oldImg=$thum.find('a').attr('href');
			this.$imgWin.find('img').hide().attr('src',_src).fadeIn(that.opt.fadeSpeed);
			that.calImgPos(_src);
			this.oldImg=_src;
			this.$thumLine.css({'left':$thum.position().left});
			this.$pageCurrent.text(that.currentObj+1);
			this.$pageTotal.text(that.objNum);
			this.setVisibleBtn();
		},
		calImgPos : function(src){
			var box = this.$imgWin.find(".imgBox");
			var BH = box.height();
			var BW = box.width();
			var R = BW/BH;
			var imgW;
			var imgH;
			var img = box.find("img");
			img[0].onload = function(){
				imgW = $(this).css("width");
				imgH = $(this).height();
			}
			var ALimg = new Image();
			ALimg.src = src;
			ALimg.onload = function(){
				var ALwidth = ALimg.width;
				var ALheight = ALimg.height;
				var imgR = ALwidth/ALheight;
				if(R >= imgR){
					img.css({
						"height" : "100%",
						"width" : "auto",
						"margin-top" : "auto"
					});					
				}else if(R < imgR){
					img.css({
						"width" : "100%",
						"height" : "auto"
					})
					var h = parseInt(img.css("height"));
					var MT = (BH - h)/2;
					img.css({
						"margin-top" : MT + 'px'
					})
				}
			}
		}
	}
	$.fn.hGallery = function(options){
		return new HGallery(options);
	}
})(jQuery)