app.controller('adminController', function ($scope, $filter, $modal, $route, ngTableParams, DayService) {
	DayService.get().success(function(data) {
		var selected = []; 
		$scope.selected = [];
	    $scope.edit = false;
	    $scope.delete = false;
	    $scope.showMsg = false;

	    $scope.tableParams = new ngTableParams({
	        page: 1,            // show first page
	        count: 15,          // count per page
	        filter: {
	            name: '',
	            date: '',
	            description: ''       // initial filter
	        },
	        sorting: {
	            name: ''    // initial sorting
	        }
	    }, {
	        total: data.length, // length of data
	        getData: function ($defer, params) {
	            // use build-in angular filter
	            var filteredData = params.filter() ?
	                    $filter('filter')(data, params.filter()) :
	                    data;
	            var orderedData = params.sorting() ?
	                    $filter('orderBy')(filteredData, params.orderBy()) :
	                    data;

	            params.total(orderedData.length); // set total for recalc pagination
	            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	        }
	    });

	    var checkSelected = function  (selected, data) {
	        	for(var i=0; i<selected.length; i++) {
	        		if (typeof selected[i]._id !== 'undefined') {
	        			if (selected[i]._id == data._id) {
	        				return i;
	        				break;
	        			}
	        		}
	        	}
	        	return -1
	    }

	    var buildMass = function (data) {

	    	// if no exist
	    	if (checkSelected(selected, data) === -1) {
				selected.push(data); 
				return selected   			
	    	// exist
			} else {
	        	var i = checkSelected(selected, data);
	        	selected.splice(i, 1);
	        	return selected        		
	        	}

	        // console.log(selected);


	    }

	    $scope.changeSelection = function(data) {
	    	console.log(data);
	    	var selected = buildMass(data);
	    	if (selected.length == 1) {
	        	$scope.edit = true;
	        	$scope.delete = true;
	        	return selected
	   		} else {
	   			if (selected.length > 1) {
		        	$scope.edit = false;
		        	$scope.delete = true;	   				
	   			} else {
	   				$scope.edit = false;
	   				$scope.delete = false;
	   			}
	   		}
	   		return selected
	    }

	    $scope.openModal = function () {
	    	$modal.open({
		    	templateUrl: '/javascripts/app/views/modals/add-item.html',
		    	controller: 'modalAddController',
		    	size: 'lg'
	    	});
	    };

	    $scope.alerts = [
		    { type: 'success', msg: 'Записи успешно удалены. Нажмите обновить чтобы увидеть изменения.' }
		];

		$scope.closeAlert = function(index) {
			$scope.showMsg = true;
			$scope.alerts.splice(index, 1);
		};

		$scope.showAlert = function($scope) {
			
		}

	   	$scope.deleteDays = function () {
	    	DayService.deleteD(selected).success(function () {
	    		$scope.showMsg = true;
	    	});
	    }

	    $scope.refresh = function () {
	    	$route.reload();
	    }

    });
	
});