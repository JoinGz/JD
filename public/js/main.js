var app = angular.module("app",[]);
//屏幕宽度
var screenWidth = window.innerWidth;
app.controller("ec",["$http","$scope",function($http,$scope){
	$http({
		url:"./API/main.php",
	}).success(function(info){
		$scope.banner = info.banner;
		$scope.nav = info.nav;
//		var width = screenWidth*info.banner.length;
//		$(".banner ul").eq(0).css({"width":width});
	})
}])

$(document).ready(function(){
	
	var screenScroll;
	$(window).on("scroll",function(){
		screenScroll = $(window).scrollTop();
		changBg("#search",screenScroll,"#nav");
	})
})

//滚动改变背景
function changBg(ele,sS,ele2){
	//ele 需要改变的元素  sS 屏幕卷的高度 ele2 目标元素距离
	var top = $(ele2).offset().top;
	var num = sS/top;
	if(num>1){
		num=1
	}
	$(ele).css("background","rgba(201, 21, 35,"+ num +")")
}
