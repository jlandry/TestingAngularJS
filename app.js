var demoApp = angular.module('demoApp', ['ngRoute', 'ui.bootstrap']);
 
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
});
//Cannot get the d3 to show up.
//attemted to get a basic directive to show up and cannot. 
/*angular.module('d3AngularApp', ['d3'])
.directive('d3Bars', ['$window', '$timeout', 'd3Service', 
  function($window, $timeout, d3Service) {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        label: '@',
        onClick: '&'
      },
      link: function(scope, ele, attrs) {
        d3Service.d3().then(function(d3) {
 
          var renderTimeout;
          var margin = parseInt(attrs.margin) || 20,
              barHeight = parseInt(attrs.barHeight) || 20,
              barPadding = parseInt(attrs.barPadding) || 5;
 
          var svg = d3.select(ele[0])
            .append('svg')
            .style('width', '100%');
 
          $window.onresize = function() {
            scope.$apply();
          };
 
          scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });
 
          scope.$watch('data', function(newData) {
            scope.render(newData);
          }, true);
 
          scope.render = function(data) {
            svg.selectAll('*').remove();
 
            if (!data) return;
            if (renderTimeout) clearTimeout(renderTimeout);
 
            renderTimeout = $timeout(function() {
              var width = d3.select(ele[0])[0][0].offsetWidth - margin,
                  height = scope.data.length * (barHeight + barPadding),
                  color = d3.scale.category20(),
                  xScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) {
                      return d.score;
                    })])
                    .range([0, width]);
 
              svg.attr('height', height);
 
              svg.selectAll('rect')
                .data(data)
                .enter()
                  .append('rect')
                  .on('click', function(d,i) {
                    return scope.onClick({item: d});
                  })
                  .attr('height', barHeight)
                  .attr('width', 140)
                  .attr('x', Math.round(margin/2))
                  .attr('y', function(d,i) {
                    return i * (barHeight + barPadding);
                  })
                  .attr('fill', function(d) {
                    return color(d.score);
                  })
                  .transition()
                    .duration(1000)
                    .attr('width', function(d) {
                      return xScale(d.score);
                    });
              svg.selectAll('text')
                .data(data)
                .enter()
                  .append('text')
                  .attr('fill', '#fff')
                  .attr('y', function(d,i) {
                    return i * (barHeight + barPadding) + 15;
                  })
                  .attr('x', 15)
                  .text(function(d) {
                    return d.name + " (scored: " + d.score + ")";
                  });
            }, 200);
          };
        });
      }}
})*/