var demoApp = angular.module('demoApp', ['ngRoute', 'ui.bootstrap', 'ngGridster']);
 
 //basic customer default information and factory to return customers added.
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

//Routeprovider allows including other .html's
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
    }).when('/viewChart',
        {
        controller: 'SimpleController',
        templateUrl: 'partials/viewChart.html'
    })
    .when('/navmenu',
    {
      controller: 'SimpleController',
      templateUrl: 'NavTest.html'
    })
		.otherwise({ redirectTo: '/' });
        });

//main controller Adds Customer.name function

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
            $scope.newCustomer.name = '';
            $scope.newCustomer.city = '';
        };

  
    });

//Toggle Popup.
    demoApp.controller('MyCtrl', function($scope) {
            $scope.modalShown = false;
            $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
            };
    });
    demoApp.controller('gridster', function($scope){
            $scope.options = {
                widget_margins: [10, 10],
                widget_base_dimensions: [140, 140],
                helper: 'clone',
                resize: {
                  enabled: true,
                  axes: ['x', 'y', 'both'],
                  max_size: [3, 1]
                }
            };
    
            $scope.items = [
              1,2,3,5,6,7,8,9,10,11,12
              ];
          });
    
    demoApp.controller('MainCtrl', function($scope) {
            $scope.name = 'World';
            $scope.clickData = "tbd";
            $scope.mouseData = "tbd";
            $scope.msg = "help";
            
            $scope.config = {
            title : 'Plunker Charts',
            tooltips: true,
            labels : false,
            mouseover: function(d) {
              $scope.msg = arguments.length;
               $scope.mouseData = JSON.stringify(d);
            },
            mouseout: function(d) {
              $scope.msg = arguments.length;
                $scope.mouseData = "";
                $scope.clickData = "";
               
            },
            click: function(d ) {
                $scope.msg = arguments.length;
                $scope.datax = JSON.stringify(d);
           
            },
            legend: {
              display: true,
              //could be 'left, right'
              position: 'left'
            }
          };

          $scope.data = {
            "series": [
              "Sales"
            ],
            "data": [
              {
                "x": "aaa",
                "y": [
                  54 
                ],
                "tooltip": "This is a tooltip"
              },
              
                  {
                "x": "bbb",
                "y": [
                   100 
                ],
                "tooltip": "This is a tooltip"
              },
                  {
                "x": "ccc",
                "y": [
                   112 
                ],
                "tooltip": "This is a tooltip"
              }
              
              
            ]
          };
          });
//testing D3 Directive
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

  demoApp.controller('CollapseDemoCtrl', function($scope) {
  $scope.isCollapsed = false;
  $scope.active = true;
});