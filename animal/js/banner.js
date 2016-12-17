$(function(){
	var banner = {
		//大轮播
		banner: $('.banner'),
		imgWrapper: $('.img-wrapper'),
		imgItem: $('.img-item'),
		imgs: $('.img'),
		circles: null,
		index: 0,
		now: null,
		timer: null,
		init: function(){
			this.autoPlay();
			this.creat();
			this.click();
			this.enter();
			this.leave();
			
		},
		//小圆圈初始化
		creat: function(){
			 for(var i=1;i<=this.imgs.length;i++){
	        	$('.circle-content').append($('<div class="circle-item">'+ i +'</div>'));
	        }
			$('.circle-content :first-child').addClass('active');
			this.circles = $('.circle-content').find('.circle-item');
		},
		//小圆圈点击
		click: function(){
		 	var _this = this;
			 this.circles.click(function(){
 				_this.index = _this.circles.index( $(this) );
 				_this.imgSwitch();
 		 });
		},
		autoPlay: function(){
			var _this = this;
			this.timer = setInterval(function(){
			_this.index++;
            _this.imgSwitch();
		},1400);
		},
		imgSwitch: function(){
			//淡入淡出大轮播
			if(this.index< 0){
				this.index=this.imgs.length-1;
			}
			if(this.index >= this.imgs.length){
				this.index = 0;
			}
			
			this.imgWrapper.eq(this.now).fadeOut();
			this.imgWrapper.eq(this.index).fadeIn();
			this.imgs.eq(this.now).fadeOut();
			this.imgs.eq(this.index).fadeIn();
			this.circles.eq(this.now).removeClass('active');
			this.circles.eq(this.index).addClass('active');
			this.now = this.index;
		},
		enter: function(){
			var that = this;
			$('.banner').mouseenter(function(){
				clearInterval(that.timer);
			});
		},
		leave: function(){
			var _this = this;
			$('.banner').mouseleave (function(){
				_this.autoPlay();
			});
		}
	};
	banner.init();
	var brands = {
		//品牌街的滚动小轮播
		scroll: $('.brands-improtant'),
		scrollWrapper: $('.brands-scroll'),
		scrollItem: $('.brands-scrollBox'),
		scrollImg: $('.brands-scrollBox img'),
		scrolls: null,
		next: 0,
		now: null,
		init: function(){
			this.autoPlay();
			this.creat();
			this.click();
			this.enter();
			this.leave();
		},
		//创建小圆圈
		creat: function(){
			 for(var i=1;i<=this.scrollImg.length-1;i++){
	        	$('.scrolls-content').append($('<div class="conItem"></div>'));
	        }
			$('.scrolls-content :first-child').addClass('current');
			this.scrolls = $('.scrolls-content').find('.conItem');
		},
		//小圆圈点击
		click: function(){
		 	var _this = this;
			 this.scrolls.click(function(){
 				_this.next = _this.scrolls.index( $(this) );
 				_this.imgSwitch();
 		 });
		},
		autoPlay: function(){
			var _this = this;
			timer = setInterval(function(){
				_this.next++;
			    _this.imgSwitch();
            
		},1400);
		},
		imgSwitch: function(){
			//判断左边界
 			if(this.next>=this.scrollImg.length){
 				this.scrollItem.css({
 					marginLeft: 0
 				});
 				this.next = 1;
 			}
 			//判断右边界
 			if(this.next<=-1){
 				this.scrollItem.css({
 					marginLeft: 0
 				});
 				this.next = 4;
 			}
 			this.scrollItem.stop(true).animate({
            	marginLeft: -286*this.next
            },800);
            this.scrolls.eq(this.now).removeClass('current');
			this.scrolls.eq(this.next).addClass('current');
			this.now = this.next;
 			
		},
		enter: function(){
			this.scroll.mouseenter(function(){
				clearInterval(timer);
			});
		},
		leave: function(){
			var _this = this;
			this.scroll.mouseleave (function(){
				_this.autoPlay();
			});
		}
	};
	brands.init();
});
		   
