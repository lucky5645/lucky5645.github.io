$(function(){
	var login = {
		userName: $('.username'),
		psw: $('.password'),
		phone: $('.phcall'),
		bodyCon: $('.bodyCon'),
		varify: $('.varify'),
		loginBtn:  $('.Loginbtn'),
		dynamicCode: $('.dycode'),
	    val: null,
		init: function(){
			this.change();
			this.click();
			console.log($(document).height());
		},
		//点击切换普通登录还是动态登录
		change: function(){
			$('.loginTab').find('span').click(function(){
				var index = $('.loginTab').children().index($(this));
				$(this).addClass('Logindefalut').siblings().removeClass('Logindefalut');
			    $('.Logoincontent').children().eq(index).show().siblings().hide();
			});
		},
		click: function(){
			var that = this;
		    //点击登录  显示modal
			this.loginBtn.click(function(){
				var left = screen.availWidth;
				var top = screen.availHeight;
				var usernameV = that.userName.val();
			    var pswV = that.psw.val();
			    $('.window-mask').show().css({
				     height: $(document).height()
				});
			    $('.messager-window').show();
				if( usernameV.length == 0){
					that.bodyCon.html('请输入用户名');
					return;
				}
				if(pswV.length == 0){
					console.log(pswV.length);
					that.bodyCon.html('请输入密码');
					return;
				}
				for(var key in $.cookie()){
					if(pswV == $.cookie()[key] && usernameV == key){
						that.bodyCon.html('登录成功');
					    return;
					}
			     }
				that.bodyCon.html('登录失败，密码错误或用户名不存在');
			});
			//点击取消
			$('.close').click(function(){
				$('.messager-window').hide();
				$('.window-mask').hide();
			});
			//点击确定
		    $('.l-btn').click(function(){
				$('.messager-window').hide();
				$('.window-mask').hide();
			});
			/*标题拖拽*/
			$('.window-header').mousedown(function(e){
				e = e || window.event;
				var titleTop = e.offsetY;
				var titleLeft = e.offsetX;
				console.log(titleLeft,titleTop);
				//添加鼠标移动
				$(document).mousemove(function(e){
					e = e || window.event;
					var l = e.pageX;
				    var t = e.pageY;
				    console.log(l,t);
					$('.messager-window').css({
						top: t - titleTop ,
						left: l - titleLeft,
						margin: 0
					});
				});	
			});
			//鼠标抬起
			$(document).mouseup(function(){
				$(document).unbind(' mousemove');
			});
		}
	};
	login.init();
});