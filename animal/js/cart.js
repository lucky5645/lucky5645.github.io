$(function(){
	cart = {
		data: null,
		cartCon: $('.cartCon'),
		init: function(){
			var that = this;
			this.getMes();
			this.delete();
			//this.input();
			//this.remove();
		},
		//获取信息
		getMes: function(){
			this.data = JSON.parse( $.cookie('tb_cart') );
			var that = this;
			for(var key in this.data){
				(function(k){
					var tr = $('<tr class="cart-order" data-gid = "'+ k + '"></tr>');
					tr.load('goodsInfo.html',function(){
						var gid = that.data[k];
						
						tr.find('.img').attr('src',gid.pic);
						tr.find('.por-intro').find('a').text(gid["goods-name"]+gid["weight-id"]);
						tr.find('#num').val(gid.amount);
						var total = gid.amount * gid['goods-sale'];
						tr.find('.price').html(total.toFixed(2));
						$('.cartCon').append(tr);
				    });
				})(key);
			}
			
	  },
	  remove: function(){
			var that = this;
		    console.log($('.cartCon').find('.delete'));
			$('.cartCon').on('click','.delete',function(){
				if( confirm('确定删除宝贝吗？') ){
					//当前商品从页面消失
					$(this).parents('.cart-goods-item').remove();
					//从cookie中删除
					var sizeId = $(this).parents('.cart-goods-item').data('sizeid');
					//删除  (复习delete)
					delete that.cart[sizeId];
					that.setCookie();
				}
			});
		},
	  
	 //直接修改数量
		input: function(){
			var that = this;
			
			console.log($('.cartCon').find('#num'));
			this.cartCon.on("input",'#num',function(){
				//input是自己的前一个兄弟
				var amount = $(this).val();
				console.log(amount);
				amount = parseInt(amount);
				//获取商品id和库存
				console.log(that.data);
				var gid = $(this).parents('.cart-goods-item').data('gid');
				var stock = that.data[gid].stock;
				//调用会写cookie功能
				that.handleCookie( $(this) );
			});
		},
		//删除商品
		delete: function(){
			var that = this;
			this.cartCon.on('click','.delete',function(){
				if(confirm('确定删除宝贝？')){
					//从页面上删除
					$(this).parents('.cart-order').remove();
					//从cookie里面删除
					var weightId = $(this).parents('.cart-order').data('gid');
					var cart = JSON.parse($.cookie('tb_cart'));
					for(var k in cart){
						if(weightId == k){
							delete cart;
							that.setcookie();
						}
					}
					//删除 delete
					console.log(cart);
				}
				
			});
		},
		//设置cookie
		setCookie: function(){ 
			$.cookie('tb_cart',JSON.stringify(this.cart),{expires:365,path:'/'});
		}
			
	};
	cart.init();
});
