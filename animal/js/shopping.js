/*
 	详情页面js

 	1、包装的切换（颜色的切换）
 	2、杂类的切换（颜色的切换）
 	3、增加数量
 	4、减少数量
 	5、直接修改input
 	6、加入购物车
*/
$(function(){
	var shopping = {
		main: $('.goods-detail'),
		weightCon: $('.weightCon'),
		addCart: $('.addCart-buycart'),
		amountInput: $('#cart_buynum'),
		data: null,
		init: function(){
			var that = this;
			$.getJSON('js/data.json',function(result){
				that.data = result[$.cookie('shopping')];
				that.createWeight();
				that.weightClick();
				that.price();
				that.increase();
				that.decrease();
				that.input();
				that.addCart();
			});
			
		},
		//填充重量
		createWeight: function(){
			var weight = this.data.weight;
			var weightStr = '';
			for(var key in weight){
				weightStr += '<a class="norms-a">' + weight[key]
				        +   '</a>'
			}
			this.weightCon.html(weightStr);
			var span = $('<span class="goods-selected"></span>');
			$('.weightCon:first').children().eq(0).append(span);
		},
		//点击重量
		weightClick: function(){
			//利用事件委托给子元素添加事件
			this.weightCon.on('click','a',function(){
				var span = $('<span class="goods-selected"></span>');
				$(this).append(span).siblings().children().remove();
			});
		},
		//获取原价和现价
		price: function(){
			var gid = $.cookie('shopping');
			$('.goods-detail').attr('data-gid',gid);
			$('.gdtitle').append(this.data["goods-name"]);
			$('.oPrice').html(this.data["goods-price"]);
			$('#goods-sale-price').html(this.data["goods-sale"]);
			$('.cloud-zoom-wrap').find('img').attr('src',this.data.color.pic);
			$('.des').html(this.data.color.des);
		},
		//数量增加点击
		increase: function(){
			var that = this;
			$('.add-buynum').click(function(){
				var amount = parseInt( that.amountInput.val() );
				var stock = that.data.stock;
				//判断是否超出库存
				if(amount >= stock){
					return;
				}
				//数量++
				amount++;
				that.amountInput.val(amount);
			});
		},
		//减少
		decrease: function(){
			var that = this;
			$('.lim-buynum').click(function(){
				var amount = parseInt( that.amountInput.val() );
				//判断是否越界
				if(amount <= 1){
					return;
				}
				//数量--
				amount--;
				that.amountInput.val(amount);
			});
		},
		input: function(){
			var that = this;
			this.amountInput.on('input',function(){
				var amount = that.amountInput.val();
				//如果是空，不做处理
				if(amount == ''){
					return;
				}
				amount = parseInt( amount );  // 12 12w=>12  fds=>NaN
				
				var stock = that.data.stock;
				
				//判断是不是NaN或者是不是0
				if( isNaN(amount) || amount == 0 ){
					that.amountInput.val(1);
					return;
				}
				
				//判断是否越界 
				if(amount >= stock){ 
					that.amountInput.val(stock);
					return;
				}
				that.amountInput.val(amount);
			});
			//失去焦点判断是不是空 =》 1
			this.amountInput.blur(function(){
				var amount = that.amountInput.val();
				//如果是空，不做处理
				if(amount == ''){
					that.amountInput.val(1);
				}
			});
		},
		//加入购物车
		addCart: function(){
			var that = this;
			//【加入购物车】按钮点击
			$('.add-buycart').click(function(){
				var gid = $('.goods-detail').data('gid');
				var goodsName = that.data["goods-name"];
				var goodsSale = that.data["goods-sale"];
				var img = that.data.color.pic;
				var amount = parseInt( that.amountInput.val() );
				//cookie在哪？ $.cookie()
				var cart = $.cookie('tb_cart')  || '{}';
				cart = JSON.parse( cart );
				var weightId = $('.goods-selected').parent().text();
				//判断购物车是否已经存在当前商品
				for(var key in that.data.weight){
					if(that.data.weight[key] == $('.goods-selected').parent().text() ){
						if(!cart[key]){
							cart[key] = {
								"goods-id": gid,
								"weight-id": weightId,
								"amount": amount,
								"goods-name": goodsName,
								"goods-sale": goodsSale,
								"pic": img
							};
						}else{
							cart[key].amount += amount;
						}
						
				    }
			    }
				//重新写到cookie中
				$.cookie('tb_cart',JSON.stringify(cart),{expires:365,path: '/'});
				
		        //console.log( JSON.parse( $.cookie('tb_cart') ) );
				alert('添加成功');
			});
		}
	};
	shopping.init();
	var glass = {
		smallWrap: $('.cloud-zoom-wrap'),
		filter: $('.filter'),
		largeWrap: $('.large'),
		largeImg: $('.large-img'),
		//初始化方法
		init: function(){
			this.mousemove();
			this.hover();
		},
		//鼠标移动
		mousemove: function(){
			var that = this;
			this.smallWrap.mousemove(function(e){
				//鼠标离元素的偏移距离
				var left =  e.pageX - 75;
				var top = e.pageY - 60 ;
				
				
				//处理left和top，做边缘处理（防止越界）
				left = left < 75 ? 75 : (left > 225) ? 225 : left;
				top = top < 75 ? 75 : (top > 225) ? 225 : top;
				
				//改变滤镜的位置
				that.filter.css({
					left: left - 75 , //-100是为了让鼠标在滤镜的中心位置
					top: top - 75
				});
				that.largeImg.css({
					left: -2*(left-100),
					top: -2*(top-100)
				});
			});
		},
		hover: function(){
			var that = this;
			this.smallWrap.mouseenter(function(){
				that.filter.show();
				that.largeWrap.fadeIn();
			});
			this.smallWrap.mouseleave(function(){
				that.filter.hide();
				that.largeWrap.fadeOut();
			});
		}
	}
	glass.init();
});
