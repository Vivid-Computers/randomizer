//modules
var app = angular.module("app", []);

app.controller("appController", [function(){
	var vm = this;
	vm.names = [];
	
	vm.loopCount = 1000;
	
	vm.newName = {};
	vm.luckyOnes = [];
	
	vm.addName = function(){
		if(vm.newName.name && !vm.containsObject(vm.newName, vm.names)){
			vm.names.push(angular.copy(vm.newName));
			vm.newName = {};
		}
	};
	vm.removeName = function(index){
		vm.names.splice(index,1);
	};
	
	vm.reset = function(){
		vm.luckyOnes = [];
		angular.forEach(vm.names, function(value, key) {		  
		  value.count = 0;
		});
	}
	
	vm.randomName = function(){	
		vm.reset();
		for(var index =0;index <vm.loopCount;index++){
			vm.randomOneName();
		}
		vm.processing = false;
	}
	
	vm.randomOneName = function(){	
		if(vm.names && vm.names.length > 0){
			var lucky = vm.names[Math.floor(Math.random() * vm.names.length)];
			lucky.count++;
			var copyLucky = angular.copy(lucky);
			
			var unix_timestamp = Date.now();
			var date = new Date(unix_timestamp);
			// hours part from the timestamp
			var hours = date.getHours();
			// minutes part from the timestamp
			var minutes = "0" + date.getMinutes();
			// seconds part from the timestamp
			var seconds = "0" + date.getSeconds();
			//milliseconds
			var milliSeconds = date.getMilliseconds();

			// will display time in 10:30:23 format
			var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)+':'+milliSeconds;
			
			copyLucky.timestamp = formattedTime;
			vm.luckyOnes.push(copyLucky);
		}		
	};
			
	vm.containsObject = function(obj, list) {
		var i;
		for (i = 0; i < list.length; i++) {
			if (angular.equals(list[i].name, obj.name)) {
				return true;
			}
		}
		return false;
	};	
}]);

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);