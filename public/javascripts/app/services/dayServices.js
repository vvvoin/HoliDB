app.factory('DayService', function ($http) {
	var publicDays;

	function get(q, publicDays) {
		if (typeof q !== 'undefined') {

			// if query contain date type search by date
			if (q instanceof Date) {
				var yy = q.getFullYear();
				var mm = q.getMonth();
				var dd = q.getDay();
				$http({
					method: 'GET',
					url: '/day/' + yy + '/' + mm + '/' + dd
				}).success(function(data, status, headers, config) {
					return data
				});	

			// if query contain dif type data search by id		
			} else {
				$http({
					method: 'GET',
					url: '/day/' + q
				}).success(function(data, status, headers, config) {
					return data
				});		
			}

		// is func have no params get all days
		} else {
			return $http({
				method: 'GET',
				url: '/findAll'
			});
		}
	};

	function search(q) {
		$http({
			method: 'POST',
			url: '/search',
			data: q
		}).success(function(data, status, headers, config) {
			return data
		})
	};

	function deleteD(q) {
		return $http({
			method: 'POST',
			url: '/delete',
			data: q
		})
	};

	function add(q) {
		return $http({
			method: 'POST',
			url: '/add',
			data: q
		});
	}

	return {
		get: get,
		add: add,
		search: search,
		deleteD: deleteD
	}
});