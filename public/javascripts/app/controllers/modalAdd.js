app.controller('modalAddController', function ($scope, $route, $modalInstance, DayService) {
  $scope.day = {};
  var fd = {};
  $scope.fd = {};
  $scope.showMsg = false;

	$scope.today = function() {
    $scope.date = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.date = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];


  $scope.alerts = [
    { type: 'danger', msg: 'Вы не заполнили все поля! Пожалуйста, заполните все поля и повторите попытку.' }
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({type: 'danger', msg: 'Вы не заполнили все поля! Пожалуйста, заполните все поля и повторите попытку.' });
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.hideAlert = function () {
    $scope.showMsg = false;
  };

  $scope.closeModal = function () {
  	$modalInstance.close();
  };

   $scope.setFiles = function(element) {
    $scope.$apply(function(scope) {
      console.log('files:', element.files);
      // Turn the FileList object into an Array
        $scope.files = []
        for (var i = 0; i < element.files.length; i++) {
          $scope.files.push(element.files[i])
        }
      $scope.progressVisible = false
      });
    };

  $scope.getObj = function () {
      $scope.day.img = $scope.files;
      if (typeof $scope.day.name == 'undefined' || typeof $scope.day.date == 'undefined' || typeof $scope.day.description == 'undefined' || typeof $scope.day.img == 'undefined') {
         $scope.showMsg = true;
      } else {
      console.log($scope.day);
      DayService.add($scope.day).success(function () {
          alert('Запись успешно добавлена в БД.');
          $modalInstance.close();
         $route.reload();
      });
    }

  };

});