$(document).ready(function() {
	screenWidth = window.innerWidth;
	var screenScroll;
	banner(".banner ul");
	touchMove(".touchMove");
	$(window).on("scroll", function() {
		screenScroll = $(window).scrollTop();
		changBg("#search", screenScroll, "#nav");
	})
})

//滚动改变背景
function changBg(ele, sS, ele2) {
	//ele 需要改变的元素  sS 屏幕卷的高度 ele2 目标元素距离
	var top = $(ele2).offset().top;
	var num = sS / top;
	if(num > 1) {
		num = 1
	}
	$(ele).css("background", "rgba(201, 21, 35," + num + ")");
}
//banner图
function banner(ele) {
	//ele 父盒子 
	//触摸开始
	var startX = 0;
	//移动距离 
	var moveX = 0;

	//n=index,从1开始
	var n = 1;
	var time = setInterval(function() {
		$(ele).css("transition", "all 0.3s");
		n++;
		var move = (-screenWidth * n);
		$(ele).css("transform", "translateX(" + move + "px)");

	}, 2000)
	$(ele)[0].addEventListener("webkitTransitionEnd", function() {
		//n>index-2
		if(n > 8) {
			n = 1;
			$(ele).css("transition", "");
			var move = (-screenWidth * n);
			$(ele).css("transform", "translateX(" + move + "px)");
		} else if(n < 1) {
			n = 8;
			$(ele).css("transition", "");
			var move = (-screenWidth * n);
			$(ele).css("transform", "translateX(" + move + "px)");
		}
	})
	$(ele)[0].addEventListener("touchstart", function(event) {
		clearInterval(time);
		startX = event.touches[0].clientX;
		

	})
	$(ele)[0].addEventListener("touchmove", function(event) {
		event.preventDefault();
		clearInterval(time);
		$(ele).css("transition", "");
		moveX = event.touches[0].clientX - startX;
		$(ele).css("transform", "translateX(" + (moveX + screenWidth * -n) + "px)");
		

	})
	$(ele)[0].addEventListener("touchend", function(event) {
		var aim = screenWidth / 3;
		if(Math.abs(moveX) < aim) {
			$(ele).css("transition", "all 0.3s");
			$(ele).css("transform", "translateX(" + (screenWidth * -n) + "px)");
		} else {
			if(moveX > 0) {
				n--;
				$(ele).css("transition", "all 0.3s");
				$(ele).css("transform", "translateX(" + (screenWidth * -n) + "px)");
			} else if(moveX < 0) {
				n++;
				$(ele).css("transition", "all 0.3s");
				$(ele).css("transform", "translateX(" + (screenWidth * -n) + "px)");
			}
		}
		time = setInterval(function() {
			$(ele).css("transition", "all 0.3s");
			n++;
			var move = (-screenWidth * n);
			$(ele).css("transform", "translateX(" + move + "px)");

		}, 2000)

	})

}
//touchMove
var smallboxwidth = $(".touchMove").children("li").outerWidth();
function touchMove(ele) {
	//ele 父盒子 
	//触摸开始
	var startX = 0;
	//移动距离 
	var moveX = 0;
	//结束位置
	var endX = 0;
	//盒子宽度
	var boxwidth = $(ele).outerWidth()-smallboxwidth *4;
	console.log(boxwidth)
	$(ele)[0].addEventListener("touchstart", function(event) {
		$(ele).css("transition", "");
		startX = event.touches[0].clientX;
		

	})
	$(ele)[0].addEventListener("touchmove", function(event) {
		event.preventDefault();
		moveX = event.touches[0].clientX - startX;
		if(moveX>screenWidth/3){
			moveX=screenWidth/3
		}
		$(ele).css("transform", "translateX(" + (moveX + endX )+ "px)");
		

	})
	$(ele)[0].addEventListener("touchend", function(event) {
		endX += moveX ;
		if(endX>0){
			$(ele).css("transition", "all 0.3s");
			$(ele).css("transform", "translateX(0px)");
			endX=0;
		}else if(endX<-boxwidth){
			$(ele).css("transition", "all 0.3s");
			$(ele).css("transform", "translateX(" + -boxwidth + "px)");
			endX=-boxwidth;
		}
	})

}

	