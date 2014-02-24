var demoApp = angular.module('demoApp', ['ngRoute']);
 
    demoApp.factory('simpleFactory', function() {       
        var customers = [
            {name: 'spo', city: 'whyn65ot' },
            {name: 'dar', city: 'whyn2ot' },
            {name: 'hae', city: 'patunia' }
            ];

        var factory = {};

        factory.getCustomers = function () 
        {
            return customers;
        };

        factory.postCustomer = function (customer) {
		};

        return factory;
    });


    demoApp.config(function($routeProvider) {
		$routeProvider
		.when('/',
		{
        controller: 'SimpleController',
        templateUrl: 'partials/view1.html'
        })
        .when('/view2',
        {
        controller: 'SimpleController',
        templateUrl: 'partials/view2.html'
        })
		.otherwise({ redirectTo: '/' });
        });

    demoApp.controller('SimpleController', function ($scope, simpleFactory) {
        $scope.customers = [];
 										
 		init();

 		function init() 
 		{
 			$scope.customers = simpleFactory.getCustomers();
 		}

        $scope.addCustomer = function () {
            $scope.customers.push(
            {
                name: $scope.newCustomer.name,
                city: $scope.newCustomer.city
            });
        };
        
    });

    demoApp.controller('MyCtrl', function($scope) {
            $scope.modalShown = false;
            $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
            };
    });

    demoApp.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
 // See below
  };
});
    