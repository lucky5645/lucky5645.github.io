$(function(){
	var register = {
		phone: $('#phone'),
		userName: $('#nickname'),
		psw: $('#passwordr'),
		pswCheck: $('#passwordag'),
		varifycode: $('#regvairfy'),
		btn: $('#registerbtn'),
		val: null,
		init: function(){
			this.call();
			this.username();
			this.password();
			this.pswcheck();
			this.varifyCode();
			this.varify();
			this.enroll();
		},
		//电话号码
		call: function(){
			var regPhone = /^1[358]\d{9}$/;
			var that = this;
			//失焦事件
			this.phone.blur(function(){
				$(this).css({
					borderColor: '#f56'
				});
				var error = $(this).siblings('.Registererror');
				that.val = that.phone.val();
				if(that.val.length != 11){
					error.show();
					error.children().html('请输入11位电话号码');
					return;
				}
				if(!regPhone.test(that.val)){
					error.show();
					error.children().html('请输入手机号');
					return;
				}
				//验证正确
				that.correct(error,$(this));
			});
			//获焦事件
			this.phone.focus(function(){
				$(this).siblings('.Registererror').hide();
				$(this).siblings('.Registerok').hide();
			});
		},
		//用户名
		username: function(){
			var regUName = /^[a-zA-Z_]\w{5,15}$/;
			var regUnameLength = /^.{4,20}$/;
			var that = this;
			//失焦事件
			this.userName.blur(function(){
				$(this).css({
					borderColor: '#f56'
				});
				var error = $(this).siblings('.Registererror');
				that.val = that.userName.val();
				if( !regUnameLength.test(that.val) ){
					error.show();
					error.children().html('请输入4-20位用户名');
					return;
				} 
				for(var key in $.cookie()){
					if(that.val == key){
						error.show();
					    error.children().html('用户名已注册');
					    return;
					}
				}
				
				//验证正确
				that.correct(error,$(this));
			});
			//获焦事件
				this.userName.focus(function(){
				$(this).siblings('.Registererror').hide();
				$(this).siblings('.Registerok').hide();
			});
		},
		//换取验证码
		varifyCode: function(){
			var that = this;
			$('.Registeryanzheng').find('a').click(function(){
				$(this).children('img').css({
					transform: 'rotate(90deg)',
				});
				that.createCode();
				
			});
		},
		//创建随机验证码
		createCode: function(){
			var str = '';
			var v = '';
			for(var i=0; i<26; i++){
				str += String.fromCharCode(97+i);
			}
			var strUpper = str.toUpperCase();
			var verify = str + strUpper + '0123456789';
			//生成随机验证码
			for(var i=0;i<4;i++){
				var index = parseInt( Math.random()*62 );
				v = verify[index];
				$('.codevar').eq(i).html(v);
			}
			//生成随机颜色
			for(var i=0;i<4;i++){
				var color = '#'+(parseInt(Math.random()*4097).toString(16));
				$('.codevar').eq(i).css({
					color: color
				});
			}
		},
		//验证码
		varify: function(){
			var that = this;
			//失焦
			this.varifycode.blur(function(){
				$(this).css({
					borderColor: '#f56'
				});
				var error = $(this).siblings('.Registererror');
				if($(this).val().length != 4){
					error.show();
					error.children().html('请输入4位验证码');
					return;
				}
				if($(this).val() != $('.codevar').text()){
					error.show();
					error.children().html('验证输入错误');
					return;
				}
				that.correct(error,$(this));
			});
			
			
		},
		//密码
		password: function(){
			var regPswLength = /^.{8,20}$/;
			var regPswLow = /^\d+$/;
			var regPswMid = /[a-zA-Z]/;
			var regPswHigh = /[!@#\$%\^&\*\+\-]/;
			var that = this;
			//获焦
			this.psw.focus(function(){
				$('#qiangdu').show();
				$(this).siblings('.Registererror').hide();
				$(this).siblings('.Registerok').hide();
			});
			//实时监控
			this.psw.on('input',function(){
				that.val = that.psw.val();
				for(var i=0; i<that.psw.length; i++){
					$('#qiangdu>span').removeClass('leval');
				}
				if(regPswLow.test(that.val)){
					$('#qiangdu>span').eq(0).addClass('leval');
					return;
				}
				if(regPswHigh.test(that.val)){
					$('#qiangdu span:lt(3)').addClass('leval');
					return;
				}
				
				if(regPswMid.test(that.val)){
					$('#qiangdu span:lt(2)').addClass('leval');
				}
					
				
			});
			//失焦
			this.psw.blur(function(){
				that.val = that.psw.val();
				var error = $(this).siblings('.Registererror');
				$('#qiangdu').hide();
				$(this).css({
					borderColor: '#f56'
				});
				if(!regPswLength.test(that.val)){
					error.show();
					error.children().html('请输入8-20位密码');
					return;
				}
				that.correct(error,$(this));
			});
			
		},
		//确认密码
		pswcheck: function(){
			var that = this;
			var error = $(this).siblings('.Registererror');
			//获焦
			this.pswCheck.focus(function(){
				$(this).siblings('.Registererror').hide();
				$(this).siblings('.Registerok').hide();
			});
			//失焦
			this.pswCheck.blur(function(){
				that.val = that.pswCheck.val();
				$(this).css({
					borderColor: '#f56'
				});
				var error = $(this).siblings('.Registererror');
				if(that.val.length == ''){
					error.show();
			        error.children().html('请输入确认密码');
			        return;
				}
			    if( that.val != that.psw.val()){
					error.show();
					error.children().html('2次密码不一致');
					return;
				}
			    that.correct(error,$(this));
			});
		},
		//验证正确时
		correct: function(error,input){
			input.css({
					borderColor: '#ddd'
				});
			error.show();
	        error.children().html('正在验证...');
			setTimeout(function(){
				   input.siblings('.Registererror').hide();
			},500);
			input.siblings('.Registerok').show();
		},
		
		//获焦事件
		focus: function(eSource,input){
			eSource.focus(function(){
				input.siblings('.Registererror').hide();
				input.next('.Registerok').hide();
			});
		},
		//点击登录
		enroll: function(){
			var that = this;
			this.btn.click(function(){
				for(var i=0;i<5;i++){
					if($('.Registerok')[i].style.display != 'block'){
						return;
					}
				}
				$(this).css({
					backgroundColor: '#33cb98'
			    });
			    
			    var nickV = that.userName.val();
			    var pswV = that.psw.val();
			   
				//重新写到cookie中
				$.cookie(nickV,pswV,{expires:365,path: '/'});
				alert('添加成功');
				
			});
			
		},
	};
	register.init();
});
