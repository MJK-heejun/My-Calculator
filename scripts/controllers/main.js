'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testApp
 */
angular.module('testApp')
  .controller('MainCtrl', function ($scope, snapRemote) {

    $scope.snapOpts = {
      disable: 'right',
      touchToDrag: false
    };

    $scope.gridsterOpts = {
      margins: [10, 10],
      columns: 10,
      outerMargin: false,
      pushing: true,
      floating: true,
      mobileBreakPoint: 330,
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: true,
        handles: ['n', 'e', 's', 'w', 'se', 'sw']
      }
    };


    $scope.default_items = [
      { sizeX: 1, sizeY: 1, row: 0, col: 0, name: "sss" },
      { size: { x: 1, y: 2 }, position: [0, 2], name: "sss2" },
      { size: { x: 1, y: 1 }, position: [0, 2], name: "sss3" },
      { size: { x: 1, y: 1 }, position: [0, 2], name: "sss4"  }
    ];


    //initiate the current items that will be displayed
    $scope.current_items = [];
    if(localStorage.getItem("saved_items") == null){
      $scope.current_items = $scope.default_items;
    }else{
      $scope.current_items = angular.fromJson(localStorage.getItem("saved_items"));
    }





    //adding element
    $scope.default_items.push({ size: { x: 1, y: 1 }, position: [0, 0], name: "new" });

    $scope.dashboards = {
      '1': {
        id: '1',
        name: 'Home',
        widgets: [{
          col: 0,
          row: 0,
          sizeY: 1,
          sizeX: 1,
          name: "Widget 1"
        }, {
          col: 2,
          row: 1,
          sizeY: 1,
          sizeX: 1,
          name: "Widget 2"
        }]
      },
      '2': {
        id: '2',
        name: 'Other',
        widgets: [{
          col: 1,
          row: 1,
          sizeY: 1,
          sizeX: 2,
          name: "Other Widget 1"
        }, {
          col: 1,
          row: 3,
          sizeY: 1,
          sizeX: 1,
          name: "Other Widget 2"
        }]
      }
    };



    $scope.resetAll = function(){
      $scope.current_items = $scope.default_items;
    };
    $scope.saveCurrent = function(){
      localStorage.setItem("saved_items", angular.toJson($scope.current_items));       
    };





  });
