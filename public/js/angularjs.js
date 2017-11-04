var app = angular.module("app", []);
app.controller("ec", ["$http", "$scope", function($http, $scope) {
	$http({
		url: "./API/main.php",
	}).success(function(info) {
		$scope.banner = info.banner;
		$scope.nav = info.nav;
		$scope.shopimg = info.shopimg;
		//		var width = screenWidth*info.banner.length;
		//		$(".banner ul").eq(0).css({"width":width});
//		$(".banner ul").css("transform", "translateX(" + (-screenWidth) + "px)");

	})
}])