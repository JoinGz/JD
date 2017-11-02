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