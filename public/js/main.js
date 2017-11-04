var app = angular.module("app", []);
//屏幕宽度
var screenWidth = window.innerWidth;
app.controller("ec", ["$http", "$scope", function($http, $scope) {
	$http({
		url: "./API/main.php",
	}).success(function(info) {
		$scope.banner = info.banner;
		$scope.nav = info.nav;
		//		var width = screenWidth*info.banner.length;
		//		$(".banner ul").eq(0).css({"width":width});
		$(".banner ul").css("transform", "translateX(" + (-window.innerWidth) + "px)");

	})
}])

$(document).ready(function() {
	var screenScroll;
	banner(".banner ul");
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

function banner(ele) {
	//ele 父盒子 
	//触摸开始
	var startX = 0;
	//移动距离 
	var moveX = 0;

	//n=index,从1开始
	//屏幕宽度

	var n = 1;
	var time = setInterval(function() {
		$(ele).css("transition", "all 0.3s");
		n++;
		var move = (-window.innerWidth * n);
		$(ele).css("transform", "translateX(" + move + "px)");

	}, 2000)
	$(ele)[0].addEventListener("webkitTransitionEnd", function() {
		//n>index-2
		if(n > 8) {
			n = 1;
			$(ele).css("transition", "");
			var move = (-window.innerWidth * n);
			$(ele).css("transform", "translateX(" + move + "px)");
		} else if(n < 1) {
			n = 8;
			$(ele).css("transition", "");
			var move = (-window.innerWidth * n);
			$(ele).css("transform", "translateX(" + move + "px)");
		}
	})
	$(ele)[0].addEventListener("touchstart", function(event) {
		clearInterval(time);
		startX = event.touches[0].clientX;
		console.log("kaishi");

	})
	$(ele)[0].addEventListener("touchmove", function(event) {
		clearInterval(time);
		$(ele).css("transition", "");
		moveX = event.touches[0].clientX - startX;
		$(ele).css("transform", "translateX(" + (moveX + screenWidth * -n) + "px)");
		console.log("yidong")

	})
	$(ele)[0].addEventListener("touchend", function(event) {
		var aim = screenWidth / 3;
		console.log("end")
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
			var move = (-window.innerWidth * n);
			$(ele).css("transform", "translateX(" + move + "px)");

		}, 2000)

	})

}