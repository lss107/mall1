

 // var host="http://192.168.2.219/";
 // var host="http://192.168.0.102/";
 // var host="http://192.168.1.101/";
 // var host="http://192.168.56.1:8000/";

// 顶部nav导航栏
$(function(){
	var city_list=$(".nav .city-list");
	$(".nav .city").on("mouseenter",function(){
		city_list.show();
		$(this).css("background-color","#fff");
	}).on("mouseleave",function(){
		city_list.hide();
		$(this).css("background-color","#eee");
	})
	city_list.on("click",'li',function(){
		var txt=$(this).html();
		$('.nav .city .txt').html(txt);
		city_list.hide();
	})
	var right_lis=$('.nav .right-lis');
	right_lis.on("mouseenter",'.hide',function(){
		$(this).children('.navyc').show();
		$(this).css("background-color","#fff");
	}).on('mouseleave','.hide',function(){
		$(this).children('.navyc').hide();
		$(this).css("background-color","#eee");
	})
})
// 搜索栏
$(function(){
	$.getJSON("http://p08biad54.bkt.clouddn.com/seach_content.txt", function(json) {
			$('.search-box-conter input').attr({
				placeholder: json.result.show
			});
	});
	var url="http://p08biad54.bkt.clouddn.com/search-sp.txt";
	var tag="";
	$.getJSON(url,function(json){
		// var json=JSON.parse(data);
		$.each(json.data,function(index, el) {
			if (el.highlight) {
				tag+='<li><a href="'+el.link+'" class="hot">'+el.query+'</a></li>';
			}else{
				tag+='<li><a href="'+el.link+'">'+el.query+'</a></li>';
			}
		});
		$('.search-box-bottom ul').append(tag);
	})
	$(".mobile-Taobao i").on("click",function(){
		$(this).parent().parent().css("display","none");
	})
})
// 筛选商品模块
$(function(){
	var url="http://p08biad54.bkt.clouddn.com/theme_market.txt";
	var tag="";
	$.getJSON(url, function(json) {
		$('.service-class .itme li').each(function(index, el) {
			tag+='<div class="service-hide hide clearfix">';
			tag+='<div class="left fl">';
			$(el).find('a').each(function(index, el) {
				var pid=$(el).data('pid');
				var value=json[pid].value;
				tag+='<div>';
				tag+='<div class="Dress clearfix">';
				tag+='<h2 class="fl"><a href="'+value.head[0].link+'">'+value.head[0].name+'</a></h2>';
				tag+='<a href="'+value.head[0].more+'" class="fr">更多<i class="iconfont icon-jiantou-copy1"></i></a>';
				tag+='</div>';
				tag+='<ul class="clearfix">';
				for(var i in value.list){
					if (value.list[i].name) {

						if (value.list[i].h =='true') {
							tag+='<li><a class="hot" href="'+value.list[i].link+'">'+value.list[i].name+'</a></li>';
						}else{
							tag+='<li><a href="'+value.list[i].link+'">'+value.list[i].name+'</a></li>';
						}
					};
				}
				tag+='</ul>';
				tag+='</div>';
			});
				tag+='</div>';
				tag+='</div>';
		});
		$('.outskirts-box .service-box').html(tag);
		var box=$('.service-class .service-box');
		$('.service-class').hover(function() {
			box.show();
		}, function() {
			box.hide();
			$('.outskirts-box .service-class .itme li').removeClass('hot');
		});
		$('.outskirts-box .service-class .itme li').on("mouseenter",function(){
			$('.outskirts-box .service-class .itme li').removeClass('hot');
			$(this).addClass('hot');
			box.find('.service-hide').hide();
			var index=$(this).index();
			box.find('.service-hide').eq(index).show();
		})

		var url1="http://p08biad54.bkt.clouddn.com/theme_market_item_img.txt";
		$.getJSON(url1, function(json){
			box.find('.service-hide').each(function(index, el) {
				var tag='';
				tag+='<div class="right fr">';
				tag+='<h2>猜你喜欢</h2>';
				tag+='<ul class="clearfix">';
				var recItemList=json.result[index].recItemList;
				$.each(recItemList,function(index, el) {
					tag+='<li>';
					tag+='<a href="'+el.url+'">';
					tag+='<img src="'+el.pic+'" alt="" />';
					tag+='<i></i>';
					tag+='<span>'+el.itemName+'</span>';
					tag+='</a>';
					tag+='</li>';
				});
					tag+='</ul>';
					tag+='</div>';
					$(this).append(tag);

			}); 
		})
	});
})					
// banner模块
$(function(){
	var url="http://p08biad54.bkt.clouddn.com/banner_one.txt";
	$.getJSON(url, function(json) {
		var tag='';
			$.each(json,function(index, el) {
				if (index==0) {
					tag+='<li class="current"><a href="'+el.clickurl+'"><img  src="'+el.data+'" alt="" /></a></li>';
				}else{
					tag+='<li><a href="'+el.clickurl+'"><img src="'+el.data+'" alt="" /></a></li>'
				}
			});
			$('.banner-top .list').html(tag);
			bindEvent()
	});

	// banner的事件绑定
	function bindEvent(){
			var index=0;
			var lis=$('.banner-top .list li');
			var tag='';
				tag+='<li class="hot"></li>';
			for (var i = 0; i < lis.length-1; i++) {
				tag+='<li></li>';
			};
			var indexlis=$('.banner-top .indexlis');
			indexlis.html(tag);
			var w=indexlis.outerWidth();
			indexlis.css('margin-left',-w/2);
			var indexlist=indexlis.find('li');
			$(".banner-box .banner-top span").eq(0).click(function(event) {
				toLeft();
			});
			$(".banner-box .banner-top span").eq(1).click(function(event) {
				toRight();
			});
			function toLeft(){
				lis.eq(index).stop().animate({"left":520},300);
				index--;
				if (index<0) {
					index=lis.length-1;
				};
				lis.eq(index).css('left',-520).stop().animate({"left":0},300);
				indexlist.eq(index).addClass('hot').siblings().removeClass('hot')
			}
			function toRight(){
				lis.eq(index).stop().animate({"left":-520}, 300,function(){
					$(this).css("left",520);
				});
				index++;
				if (index>lis.length-1) {
					index=0;
				};
				lis.eq(index).stop().animate({"left":0}, 300);
				indexlist.eq(index).addClass('hot').siblings().removeClass('hot')
			}
			indexlist.click(function(event) {
				var $index=$(this).index();
				if (index>$index) {
					lis.eq(index).stop().animate({'left':520}, 300);
					lis.eq($index).css('left',-520).stop().animate({'left':0}, 300);
					index=$index;
					$(this).addClass('hot').siblings().removeClass('hot');
				}else if (index<$index) {
						lis.eq(index).stop().animate({'left':-520},300,function(){
						$(this).css('left',520);
					})
						lis.eq($index).stop().animate({'left':0}, 300);
						index=$index;
						$(this).addClass('hot').siblings().removeClass('hot');
				};
			});
			var timer=setInterval(toRight, 1000);
			$('.banner-box .banner-top').hover(function() {
				clearInterval(timer);
				$(".banner-box .banner-top span").show();
			}, function() {
				timer=setInterval(toRight, 1000);
				$(".banner-box .banner-top span").hide();
			});
	}
})
// 第二个banner
$(function(){
	var url="http://p08biad54.bkt.clouddn.com/banner_two.txt";

	$.getJSON(url, function(json) {
			var tag='';
			$.each(json,function(index,el) {
				
				if (el.type=="0") {
					tag+='<li class="list4">';
					$.each(el.data,function(index, el) {
						// console.log(el);
						tag+='<a class="fl" href="'+el.url+'"><img src="'+el.img+'" alt=""/></a>';
					});
					tag+='</li>';
				}else if (el.type=="1"){
					tag+='<li class="current list1">';
					$.each(el.data,function(index, el) {
						tag+='<a class="fl" href="'+el.link+'"><img src="'+el.content+'" alt="" /></a>';
					});
					tag+='</li>';
				}else if (el.type=="2") {
					tag+='<li class="list2">';
					$.each(el.data,function(index, el) {
						tag+='<a class="fl" href="'+el.clickurl+'"><img src="'+el.data+'" alt="" /></a>';
					});
					tag+='</li>';
				}else if (el.type=="3") {
					tag+='<li class="list3">';
					$.each(el.data,function(index, el) {
						tag+='<a class="fl" href="'+el.action+'"><img src="'+el.imgUrl+'" alt="" /></a>';
					});
					tag+='</li>';
				};
			});
			$('.banner-bottom .itmelist').html(tag);
			bindEvent();
	});
	// banner事件帮定
	function bindEvent(){
			var index=0;
			var lis=$('.banner-bottom .itmelist li');
			var tag='';
				tag+='<li class="cur"></li>';
			for (var i = 0; i < lis.length-1; i++) {
				tag+='<li></li>';
			};
			$('.banner-bottom .tmall .ul-line').html(tag);
			var indexlis=$('.banner-bottom .tmall .ul-line li');
			var value=100/lis.length;
			indexlis.css("width",value+"%");
			$('.banner-bottom .tmall #sum').html("/"+lis.length);
			$('.banner-bottom .btnL').on("click",function(){
				toLeft();
			})
			$('.banner-bottom .btnR').on("click",function(){
				toRight();
			})
			function toLeft(){
				lis.eq(index).stop().animate({'left':520},300);
				index--;
				if (index<0) {
					index=lis.length-1;
				};
				lis.eq(index).css('left',-520).stop().animate({'left':0},300);
				indexlis.eq(index).addClass('cur').siblings().removeClass('cur');
				$('.banner-bottom .tmall .title .red').text(index+1);
			}
			function toRight(){
				lis.eq(index).stop().animate({'left':-520},300,function(){
					$(this).css('left',520);
				});
				index++;
				if (index>lis.length-1) {
					index=0;
				};
				lis.eq(index).stop().animate({'left':0}, 300);
				indexlis.eq(index).addClass('cur').siblings().removeClass('cur');
				$('.banner-bottom .tmall .title .red').text(index+1);
			}
			$('.banner-bottom .tmall .ul-line').on("click",'li',function(){
				var $index=$(this).index();
				if (index>$index) {
					lis.eq(index).stop().animate({'left':520},300);
					lis.eq($index).css('left',-520).stop().animate({'left':0},300);
					index=$index;
					$(this).addClass('cur').siblings().removeClass('cur');
				}else if (index<$index) {
					lis.eq(index).stop().animate({'left':-520},300,function(){
						$(this).css('left',520);
					});
					lis.eq($index).stop().animate({'left':0}, 300);
						index=$index;
					$(this).addClass('cur').siblings().removeClass('cur');
				};
				$('.banner-bottom .tmall .title .red').text(index+1);
			})

			var timer=setInterval(toRight, 1000);
			$('.banner-bottom').hover(function() {
				clearInterval(timer);
				$('.banner-bottom>span').show();
			}, function() {
				timer=setInterval(toRight, 1000);
				$('.banner-bottom>span').hide();
			});
			// var arr=['#7F4FFF','#FFB025','#FF6F51','#47ACFF','#7F4FFF','#FFB025','#FF6F51','#47ACFF'];
			// $('.itmelist .list3 a').each(function(index, el) {
			// $(el).css({"background-color":arr[index]});
			// });
	}	
})									
// 公告
$(function(){
	var items=$('.notice .items ul ');
	$('.notice .list').on('mouseenter','li',function(){
		var index=$(this).index();
		$(this).addClass('hot').siblings().removeClass('hot');
		items.eq(index).show().siblings().hide();
	})
})										
// 淘宝头条
$(function(){
		var url="http://p08biad54.bkt.clouddn.com/adv.txt";
		$.getJSON(url, function(json) {
				var tag='';
			$.each(json.data,function(index, el) {
				if (index==0) {
					tag+='<li style="top:0" class="clearfix">';
				}else{
					tag+='<li class="clearfix">';
				}
				tag+='<a class="clearfix" href="'+el.url+'">';
				tag+='<img class="fl" src="'+el.pic+'" alt="" />';
				tag+='<h4 class="fl">'+el.name+'</h4>';
				tag+='</a>';
				tag+='<p>'+el.dec+'</p>';
				tag+='</li>';
			});
			$('.Taobao-headlines .content ul').append(tag);
		var lis=$('.Taobao-headlines .content ul li');
		var index=0;
		setInterval(toTop, 3000);
		function toTop(){
			var sum=parseInt(Math.random()*2);
			// console.log(sum);
			if (sum==0) {
				lis.eq(index).stop().animate({"top":-73}, 300,function(){
					$(this).css("top",73);
				});
				index++;
				if (index>lis.length-1) {
					index=0;
				};
				lis.eq(index).stop().animate({"top":0}, 300);
			}else if (sum==1){
				lis.eq(index).stop().animate({'top':73},300);
				index--;
				if (index<0) {
					index=lis.length-1;
				};
				lis.eq(index).css("top",-73).stop().animate({'top':0}, 300);
			}
			
		}
		});
	
})									
// 日常服务类
$(function(){
	var lis=$('.main-right .conve ul li .content i');
	// console.log(lis);
	$.each(lis,function(index, el) {
		lis.eq(index).css("background-position","-24px "+(-index*44)+'px');
	});
	// var ols=$('.main-right .conve ol li');
	$('.main-right .conve>ul>li').each(function(index, el) {
		if (index<=2) {
			$(el).on('mouseenter',function(){
				$('.main-right .conve ul li div').removeClass('on');
				$(this).find('.content').addClass('on');
				$('.main-right .conve ul li .mask').hide();
				$(this).find('.mask').show();
		})
		};
		$(el).find('.mask i').click(function(event) {
			$(this).parent().css('display','none');
			$('.main-right .conve ul li div').removeClass('on');
		});
	});
})										
// 阿里APP
$(function(){
	var url="http://p08biad54.bkt.clouddn.com/app.txt"
	$.getJSON(url,function(json) {
		var tag='<h3>'+json.result['1947680'].result[0].name+'<a class="fr" href="'+json.result['1947680'].result[0].more+'">更多<i class="iconfont icon-jiantou-copy1"></i></a></h3>';
		var result=json.result['1947683'].result;
		tag+='<ul class="items clearfix">';
		$.each(result,function(index, el) {
			if (index<"10") {
				tag+='<li class="fl">';
				tag+='<a href="'+el.link+'"><img width="32px" height="32px" src="'+el.img+'" alt="" /></a>';
				tag+='<div>';
				tag+='<img width="66px" height="66px" src="'+el.qr+'" alt="" />';
				tag+='<p>扫一扫'+el.name+'</p>';
				tag+='</div>';
				tag+='</li>';
			};
		});
			tag+='</ul>';
			$('.main-right .app').html(tag);
		$('.app .items li').hover(function() {
			var index=$(this).index();
			$(this).find('div').show();
		}, function() {
			$(this).find('div').hide()
		});
	})
});
								
// 生活研究所
$(function(){
	var url="http://p08biad54.bkt.clouddn.com/sub_rosa_title.txt";
	$.getJSON(url, function(json) {
		var tag='';
		tag+='<div class="title">';
		tag+='<a href="'+json.result['1949463'].result[0].link+'"><img src="images/TB1o60degoQMeJjy1XaXXcSsFXa-180-48.png" alt="" /></a>';
		tag+='<span>'+json.result['1949463'].result[0].subtitle+'</span>';
		tag+='</div>';
		$('.sub-rosa').prepend(tag);
	});
	var url1="http://p08biad54.bkt.clouddn.com/sub_rosa.txt";
	$.getJSON(url1, function(json) {
		var tag='';
		var item=json.result["1949464"].result[0].item;
		$.each(item,function(index, el) {
			tag+='<li>';
			tag+='<a href="#">';
			tag+='<img width="82px" height="82px" src="'+el.picUrl+'" alt="" />';
			tag+='<div class="txt">';
			tag+='<h3>'+el.title+'</h3>';
			tag+='<p>'+el.desc+'</p>';
			tag+='<span>';
			tag+='<i>❤</i>人气'+el.pop+'';
			tag+='</span>';
			tag+='</div>';
			tag+='</a>';
			tag+='</li>';
		});
		$('.sub-rosa .content').append(tag);
	});
})	
// 有好货
$(function(){
	var url="http://p08biad54.bkt.clouddn.com/buyers_picks.txt";
	$.getJSON(url,function(json) {
		var tag='';
		$.each(json.result["1947676"].result,function(index, el) {
			tag+='<li>';
			tag+='<a href="'+el.url+'">';
			tag+='<img src="'+el.pic+'" alt="" />';
			tag+='<h3>'+el.title+'</h3>';
			tag+='<p>'+el.content+'</p>';
			tag+='<span>';
			tag+='<i>☺</i>'+el.zanTotal+' 人说好';
			tag+='</span>';
			tag+='<b></b>';
			tag+='</a>';
			tag+='</li>';
		});
		$(".live .left ul").append(tag);
	});
})
// 爱逛街
$(function(){
	var url="http://p08biad54.bkt.clouddn.com/shopping.txt";
	$.getJSON(url, function(json) {
			var tag='';
		var item=json.result["1952191"].result[0].item;	
		$.each(item,function(index, el) {
			tag+='<li>';
			tag+='<a href="'+el.data.goods[0].taokeUrl+'">';
			tag+='<img src="'+el.data.goods[0].picUrl+'" alt="" />';
			tag+='<p>';
			tag+='<i class="iconfont icon-yinhao2"></i>';
			tag+='<span>'+el.data.goods[0].title+'</span>';
			tag+='<i class="iconfont icon-baojiaquotation"></i>';
			tag+='</p>';
			tag+='<div>';
			tag+='<img src="'+el.data.forwardUserAvatar+'" alt="" />';
			tag+='<span>'+el.data.forwardUserName+'</span>';
			tag+='</div>';
			tag+='<b></b>';
			tag+='</a>';
			tag+='</li>';
		});
		$(".live .right ul").append(tag);
	});
})
// 淘抢购
$(function(){
	var url="http://p08biad54.bkt.clouddn.com/tao_to_snap_up.txt";
	$.getJSON(url, function(json) {
		var tag='';
		var itemList=json.result['1966462'].result[0].item[1].itemList;
		$.each(itemList,function(index, el) {
			if (index<3) {
				tag+='<li>';
				tag+='<a class="clearfix" href="'+el.extend.tqgDetailUrl+'">';
				tag+='<img class="fl" width="181.8px" height="180px" src="'+el.baseinfo.picUrl+'" alt="" />';
				tag+='<div class="right fl">';
				tag+='<h4 >'+el.name.shortName+'</h4>';
				tag+='<p >'+el.extend.benefit+'</p>';
				tag+='<div class="progress">';
				tag+='<div class="value"></div>';
				tag+='</div>';
				tag+='<p class="number clearfix">';
				tag+='<span >52%</span>';
				tag+='<span class="fr">已抢'+el.remind.soldCount+'件</span>';
				tag+='</p>';
				tag+='<div class="price">';
				tag+='<span>￥</span>';
				tag+='<i>'+el.price.actPriceRaw+'</i>';
				tag+='<em class="original-price">￥'+el.price.origPrice+'</em>';
				tag+='</div>';
				tag+='</div>';
				tag+='<b></b>';
				tag+='</a>';
				tag+='</li>';
			};
		});
		$('.snap-up ul').html(tag);
		var cur=new Date();
		var endtime=1517229600000;
		var curTime=cur.getTime();
		var curSec=parseInt((endtime-curTime)/1000);
		var hour=$('.snap-up .title #hour');
		console.log(hour)
		var min=$('.snap-up .title #min');
		var sec=$('.snap-up .title #sec');
		getsec();
		var time=setInterval(getsec,1000);
		function getsec(){
			curSec--;
			if (curSec<=0) {
				clearInterval(time);
			};
			var s=curSec%60;
			s=s<10?"0"+s:s;
			sec.html(s);
			var m=parseInt(curSec/60%60);
			m=m<10?"0"+m:m;
			min.html(m);
			var h=parseInt(curSec/60/60);
			h=h<10?"0"+h:h;
			hour.html(h);
		}
	});
})
// 广告

$(function(){
	var url="http://p08biad54.bkt.clouddn.com/adv02.txt";
	$.getJSON(url, function(json) {
		var tag='';
		tag+='<a href="'+json.clickurl+'"><img src="'+json.data+'" alt="" /></a>';
		$('.advertising').html(tag);
	});
})					
// 每日好店					
$(function(){
	var url="http://p08biad54.bkt.clouddn.com/daily_good_shops_title.txt";
	$.getJSON(url,function(json) {
			var tag='';
			tag+='<a href="'+json.result["1952109"].result[0].link+'"><img src="images/TB1_EXwb3oQMeJjy0FpXXcTxpXa-162-48.png" alt="'+json.result["1952109"].result[0].name+'" /></a>';
			tag+='<span>发现深藏的好店</span>';
			tag+='<a class="fr" href="#">更多&gt;<a>';
			$('.good-shop .left p').html(tag);
	});
	var url1="http://p08biad54.bkt.clouddn.com/daily_good_shops.txt";
	$.getJSON(url1,  function(json) {
			var tag='';
			var result=json.result["1947675"].result;
			$.each(result,function(index, el) {
				if (index<4) {
				tag+='<li class="fl">';
				tag+='<a href="'+el.url+'">';
				tag+='<h3>'+el.categoryName+'</h3>';
				tag+='<span>暂无店铺评价</span>';
				tag+='<div class="content clearfix">';
				tag+='<div>';
				tag+='<img width="180px" height="180px" class="fl" src="'+el.pic1+'" alt="" />';
				tag+='<b class="img-mask"></b>';
				tag+='</div>';
				tag+='<div>';
				tag+='<img class="fr" width="89px" height="89px" src="'+el.pic2+'" alt="" />';
				tag+='<i class="img-mask"></i>';
				tag+='</div>';
				tag+='<div>';
				tag+='<img class="fr" width="89px" height="89px"  src="'+el.picThumb+'" alt="" />';
				tag+='<span class="img-mask"></span>';
				tag+='</div>';
				tag+='</div>';
				tag+='</a>';
				tag+='</li>';
				};
			});
			$('.good-shop .left ul').append(tag);
			$('.good-shop .left ul li .content div').hover(function() {
			var index=$(this).index();
			$(this).find('.img-mask').show();
		}, function() {
			$(this).find('.img-mask').hide();
		});
	});
});
// 淘宝直播
$(function(){
	var url="http://p08biad54.bkt.clouddn.com/taobao_live.txt";
	$.getJSON(url,function(json) {
			var tag='';
		var result=json.result["1947674"].result[0].data;
		$.each(result,function(index, el) {
			tag+='<li>';
			tag+='<a href="'+el.data.itemList[0].itemUrl+'">';
			tag+='<h3>'+el.data.broadCaster.accountName+'</h3>';
			tag+='<span>'+el.data.totalJoinCount+'观看</span>';
			tag+='<div class="content clearfix">';
			tag+='<div>';
			tag+='<img width="180px" height="180px" class="fl" src="'+el.data.broadCaster.headImg+'" alt="" />';
			tag+='<b class="img-mask"></b>';
			tag+='<h4><i></i>'+el.data.title+'</h4>';
			tag+='</div>';
			tag+='<div>';
			tag+='<img class="fr" width="89px" height="89px" src="'+el.data.itemList[0].itemImg+'" alt="" />';
			tag+='<em class="img-mask"></em>';
			tag+='</div>';
			tag+='<div>';
			tag+='<img class="fr" width="89px" height="89px"  src="'+el.data.itemList[1].itemImg+'" alt="" />';
			tag+='<span class="img-mask"></span>';
			tag+='</div>';
			tag+='</div>';
			tag+='</a>';
			tag+='</li>';
		});
		$('.good-shop .right ul').append(tag);
		$('.good-shop .right ul li .content div').hover(function() {
			var index=$(this).index();
			$(this).find('.img-mask').show();
		}, function() {
			$(this).find('.img-mask').hide();
		});
	});
})								
// 时尚爆料王			
$(function(){
	var url="http://p08biad54.bkt.clouddn.com/adv03.txt";
	$.getJSON(url,function(json) {
		var tag='<a href="'+json.clickurl+'"><img src="'+json.data+'" alt="" /></a> ';
		$('.Fashion-fact .right').html(tag);
	});
		var url1="http://p08biad54.bkt.clouddn.com/fashion_revelations.txt";
	$.getJSON(url1,function(json) {
			var tag='';
			var item=json.result["1952103"].result[0].item;
			$.each(item,function(index, el) {
				tag+='<li>';
				tag+='<h3><a href="'+el.targetUrl+'">'+el.title+'</a></h3>'; 
				tag+='<p>'+el.subTitle+'</p>';
				tag+='<div class="clearfix">';
				tag+='<a href="'+el.targetUrl+'"><img width="120px" height="120px" src="'+el.img1+'" alt="" /></a>';
				tag+='<a href="'+el.targetUrl+'"><img width="120px" height="120px" src="'+el.img2+'" alt="" /></a>';
				tag+='</div>';
				tag+='</li>';
			});
			$('.Fashion-fact .left ul').html(tag);
	});
})							
// 品质生活家				
$(function(){
	var url="http://p08biad54.bkt.clouddn.com/high_quality_life.txt";
	$.getJSON(url,function(json) {
			var tag='';
			var tag1='';
			var item=json.result["1952108"].result[0].item;
			$.each(item,function(index, el) {
				if (index==0) { 
					tag+='<li><a href="'+el.targetUrl+'"><img width="254px" height="317px" src="'+el.img1+'" alt="" /></a></li>'
				}else if (index>=1&&index<=3) {
					tag+='<li>';
					tag+='<a href="'+el.targetUrl+'" class="clearfix">';
					tag+='<h3 class="fl">';
					tag+='<span>'+el.title+'</span>';
					tag+='<p>'+el.subTitle+'</p>';
					tag+='</h3>';
					tag+='<img width="100px" height="100px" src="'+el.img1+'" alt="" />';
					tag+='</a>';
					tag+='</li>';
				}else if(index>=4&&index<=6){
					tag1+='<li>';
					tag1+='<a class="clearfix" href="'+el.targetUrl+'">';
					tag1+='<h3 class="">'+el.title+'</h3>';
					tag1+='<span>'+el.subTitle+'</span>';
					tag1+='<span class="content clearfix">';
					tag1+='<img width="120px" height="120px" class="fl" src="'+el.img1+'" alt="" />';
					tag1+='<img width="120px" height="120px" class="fl" src="'+el.img2+'" alt="" />';
					tag1+='</span>';
					tag1+='</a>';
					tag1+='</li>';
				}
			});
			$('.Elegant-Living .left .left-l ul').html(tag);
			$('.Elegant-Living .left .left-r ul').html(tag1);

	});
})							
// 特色玩味控			
$(function(){
	var url="http://p08biad54.bkt.clouddn.com/featured_toy_control.txt";
	$.getJSON(url,function(json) {
			var tag='';
			var tag1='';
			var item=json.result["1952107"].result[0].item;
			$.each(item,function(index, el) {
				if (index==0) { 
					tag+='<li><a href="'+el.targetUrl+'"><img width="254px" height="317px" src="'+el.img1+'" alt="" /></a></li>'
				}else if (index>=1&&index<=3) {
					tag+='<li>';
					tag+='<a href="'+el.targetUrl+'" class="clearfix">';
					tag+='<h3 class="fl">';
					tag+='<span>'+el.title+'</span>';
					tag+='<p>'+el.subTitle+'</p>';
					tag+='</h3>';
					tag+='<img width="100px" height="100px" src="'+el.img1+'" alt="" />';
					tag+='</a>';
					tag+='</li>';
				}else if (index>=4&&index<=6){
					tag1+='<li>';
					tag1+='<a class="clearfix" href="'+el.targetUrl+'">';
					tag1+='<h3 class="">'+el.title+'</h3>';
					tag1+='<span>'+el.subTitle+'</span>';
					tag1+='<span class="content clearfix">';
					tag1+='<img width="120px" height="120px" class="fl" src="'+el.img1+'" alt="" />';
					tag1+='<img width="120px" height="120px" class="fl" src="'+el.img2+'" alt="" />';
					tag1+='</span>';
					tag1+='</a>';
					tag1+='</li>';
				}
			});
			$('.Elegant-Living .right .left-l ul').html(tag);
			$('.Elegant-Living .right .left-r ul').html(tag1);
	});
})							
// 实惠专业户							
$(function(){
	var url="http://p08biad54.bkt.clouddn.com/affordable_professional_households.txt";
	$.getJSON(url,function(json) {
			var tag='';
			var item=json.result["1952106"].result[0].item;
			$.each(item,function(index, el) {
				tag+='<li class="fl">';
				tag+='<h3><a href="'+el.targetUrl+'">'+el.bizName+'</a></h3>';
				tag+='<div class="content ">';
				tag+='<a class="fl" href="'+el.targetUrl+'"><img width="120px" height="120px" src="'+el.img2+'" alt="" /></a>';
				tag+='<div class="fl">';
				tag+='<h4 class="">'+el.title+'</h4>';
				tag+='<p class="">'+el.subTitle+'</p>';
				tag+='<a class="txt" href="'+el.targetUrl+'">'+el.point+'</a>';
				tag+='</div>';
				tag+='</div>';
				tag+='</li>';
			});
			$('.Pricerite ul').html(tag);
	});
})							
// 热卖单品				
$(function(){
	var url="http://p08biad54.bkt.clouddn.com/hot_item_list.txt";
	$.getJSON(url,function(json) {
			var tag='';
			$.each(json.data,function(index, el) {
				tag+='<a href="'+el[1]+'">'+el[0]+'</a>'
			});
			$('.hot-sale>p').html(tag);

	});
	var url1="http://p08biad54.bkt.clouddn.com/hot.txt";
	$.getJSON(url1,function(json) {
			var tag='';
			var adList=json.data[0].adList;
			$.each(adList,function(index, el) {
				tag+='<li>';
				tag+='<a href="'+el.EURL+'">';
				tag+='<img width="197px" right="197px" src="'+el.TBGOODSLINK+'" alt="" />';
				tag+='<h3><img width="28px" right="16px" src="images/TB1APkObOIRMeJjy0FbXXbnqXXa-56-32.png" alt="" />'+el.TITLE+'</h3>';
				tag+='<p class="evaluate">评价<em>12</em>收藏<em>178</em></p>';
				tag+='<p class="price clearfix">';
				tag+='<i>￥</i><span>'+el.STATICSCORE+'</span><b>¥'+el.PROMOTEPRICE+'</b>';
				tag+='<a class="fr" href="#">月销<em>'+el.SELL+'</em>笔</a>';
				tag+='</p>';
				tag+='</a>';
				tag+='</li>';
			});
			$('.hot-sale ul').html(tag);
	});
	var url2="http://p08biad54.bkt.clouddn.com/imgs01..txt";
	$.getJSON(url2,function(json) {
			var tag='';
		$.each(json.adList,function(index, el) {
			tag+='<a href="'+el.clickurl+'"><img src="'+el.imgurl+'" alt="" /></a>';
		});	
		$('.hot-sale>div').html(tag);
	});
})						
// 猜你喜欢
$(function(){
	var url="http://p08biad54.bkt.clouddn.com/GuessYouLike.txt";
	$.getJSON(url,function(json) {
			var tag='';
				tag+='<ul class="clearfix">';
			$.each(json.result,function(index, el) {
				tag+='<li>';
				tag+='<div>'
				tag+='<a href="'+el.url+'">';
				tag+='<img width="198.97px" height="197px" src="'+el.pic+'" alt="" />';
				tag+='<p class="txt">';
				tag+='<img  src="images/TB1kiYuhqagSKJjy0FcXXcZeVXa-68-16.png" alt="" />';
				tag+=''+el.itemName+'';
				tag+='</p>';
				tag+='<div class="clearfix content">';
				if (el.extMap.isAd) {
					tag+='<img src="images/TB1xWZUKVXXXXXbXXXXdpC3GXXX-33-15.png" alt="" />';
				};
				tag+='<i>￥</i><span class="price">'+el.promotionPrice+'</span>';
				tag+='<span class="fr">销量:<em>'+el.position+'</em></span>';
				tag+='</div>';
				tag+='</a>';
				tag+='<a class="like-hide" href="#">';
				tag+='<p class="p1">';
				tag+='<i>❤</i>';
				tag+='找相似';
				tag+='</p>';
				tag+='<p>';
				tag+='<span>发现更多相似的宝贝&gt;</span>';
				tag+='</p>';
				tag+='</a>';
				tag+='</div>'
				tag+='</li>';
			});
				tag+='</ul>';
				$('.like').append(tag);
		$('.like ul li').hover(function() {
			$(this).find('.like-hide').show();
			$(this).find('div').eq(0).css("border-color","#ff5500");
		}, function() {
			$(this).find('.like-hide').hide();
			$(this).find('div').eq(0).css("border-color","#fff");
		});
	});
})							
// 帮助指引
$(function(){
	var url="http://p08biad54.bkt.clouddn.com/serve.txt";
	$.getJSON(url,function(json) {
			var tag='';
			var result=json.result["1948817"].result;
			$.each(result,function(index, el) {
				tag+='<li>';
				tag+='<h4>';
				tag+='<i class="iconfont icon-xiaofeizhebaozhang"></i>';
				tag+='<span>'+el.name+'</span>';
				tag+='</h4>';
					tag+='<p class="clearfix">';
				$.each(el.items,function(index, el) {
					tag+='<a  href="'+el.link+'">'+el.text+'</a>';
				});
					tag+='</p>';
					tag+='</li>';
			});
				$('.helper>ul').html(tag);	
	});
})		
// 版权合作伙伴	
$(function(){
	var url="http://p08biad54.bkt.clouddn.com/blogroll.txt";
	$.getJSON(url,function(json) {
			var tag='';
			var value=json["146992"].value;
			$.each(value.bu,function(index, el) {
				tag+='<p>';
				$.each(el.list,function(index, value) {
					if (index<el.list.length-1) {
						tag+='<a href="'+value.link+'">'+value.name+'</a>';
						tag+='<b>|</b>';
				}else{
						tag+='<a href="'+value.link+'">'+value.name+'</a>';
				}
				});
				tag+='</p>';
			});
			$('.copyright .top').html(tag);
			var tag1='';
			$.each(value.about,function(index, el) {
				tag1+='<a href="'+el.link+'">'+el.name+'</a>';
			});
			tag1+='<b>|</b>';
			tag1+='<i>© 2003-2017 Taobao.com 版权所有</i>';
			$('.copyright .p1').html(tag1);
				var tag2='';
			
					tag2+='<p>';
					$.each(value.permissions[0].list,function(index, el) {
						if (index<2) {
						tag2+='<a href="'+el.link+'">'+el.name+'</a>';
						tag2+='<b>|</b>';
					}else{
						tag2+='<em class="txt">'+el.name+'</em>';
						// tag2+='<b>|</b>';
					}
					});
					tag2+='</p>';
					$.each(value.permissions[1].list,function(index, el){
						tag2+='<p>';
						tag2+='<a href="'+el.link+'"><span class="jlt1"></span>'+el.name+'</a>';
						tag2+='';
						tag2+='</p>';

					})
				$('.copyright .text').html(tag2);
				var tag3='';
				$.each(value.issue,function(index, el){
					if (index==0) {
						tag3+='<a class="a1" href="'+el.link+'"></a>';
					}else{
						tag3+='	<a class="a'+(index+1)+' jlt1" href="'+el.link+'"></a>'
					}
				})
				$('.copyright .lj').html(tag3);
	});
})	
// 侧边导航栏
$(function(){
	var url="http://p08biad54.bkt.clouddn.com/express_lift.txt";
	$.getJSON(url,function(json) {
			var tag='';
			var tools=json["1017579"].value.tools;
			$.each(tools,function(index, el) {
				if (index!="5") {
					tag+='<li>'+el.name+'</li>';
				}else{
					tag+='<li><i class="iconfont icon-dingbu  "></i>顶部</li>';
				}
			});
			$('.sidebar ul').html(tag);
			var hs=[];
			var oh=$(" .search-hide").outerHeight();
			var h=$(".sidebar").offset().top;
			var sidebar=$('.sidebar');
			hs.push(parseInt($(".live").offset().top-oh));
			hs.push(parseInt($(".good-shop").offset().top-oh));
			hs.push(parseInt($(".Elegant-Living").offset().top-oh));
			hs.push(parseInt($(".Pricerite").offset().top-oh));
			hs.push(parseInt($(".hot-sale").offset().top-oh));
			hs.push(parseInt($(".like").offset().top-oh));
			hs.push(0);
			var index=0;
			var lis=$(".sidebar ul li");
			lis.on("click",function(){
				index=$(this).index();
				 if (index<=3) {
					$("html,body").animate({scrollTop:hs[index]}, 200)
				}else if (index==4) {
					
					$("html,body").animate({scrollTop:hs[index+1]}, 200)
				}else if (index==5) {
					index=6;
					$("html,body").animate({scrollTop:hs[index]}, 200)
				}
				// $(this).css({
				// 		'background-color':'#ff5000',
				// 		'color':"#fff",
				// 		'font-weight':'bold'
				// 	}).siblings().css({
				// 		'background-color':'#fff',
				// 		'color':"#ff5000",
				// 		'font-weight':'normal'
				// 	});
			})
			scrolltop();
			$(window).scroll(scrolltop) ;
			function scrolltop(){
				var sh=$(this).scrollTop();
				if (sh>=h-oh) {
					sidebar.css({
						position: 'fixed',
						top: oh+'px',
						right:"10px"
					});
				}else{
					sidebar.css({
						position: 'absolute',
						top: '440px',
						right:"10px"
					});
				};
				if (sh>=0&&sh<hs[1]) {
					index=0;
				}else if (sh>=hs[1]&&sh<hs[2]) {
					index=1;
				}else if (sh>=hs[2]&&sh<hs[3]) {
					index=2;
				}else if (sh>=hs[3]&&sh<hs[5]){
					index=3;
				}else if(sh>=hs[5]) {
					index=4;
				}
				// lis.eq(index).css({
				// 		'background-color':'#ff5000',
				// 		'color':"#fff",
				// 		'font-weight':'bold'
				// 	}).siblings().css({
				// 		'background-color':'#fff',
				// 		'color':"#ff5000",
				// 		'font-weight':'normal'
				// 	});
					lis.eq(index).addClass('on').siblings().removeClass('on');
			}
	});
});	
// 浮动搜索框
$(function(){
	var ot=$('.search-box .search-box-conter').offset().top;
	var oh=$('.search-box .search-box-conter input').outerHeight();
	console.log(ot+oh)
	$(window).scroll(function(){
		var sh=$(document).scrollTop();
			console.log(sh)
		if (sh>=ot+oh) {

			console.log("显示")
			$(".search-hide").show()
		}else{
			$(".search-hide").hide();
			console.log("消失")
		}
	})
})					
					
					
						
						
				
					
						
						
							
						
						
							
						
					
				
					
						
						
						
						
							
							
						
					
						
						
						
							
							
							
							
						
						
								
								
							
						
							
			
							
							
								
							
							
								
								
							
							
								
								
								
							
						
						
					
				

















					
						
						
							
							
							
								
							
						
					
				
				
				
			