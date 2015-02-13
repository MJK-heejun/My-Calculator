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
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.snapOpts = {
      disable: 'right',
      touchToDrag: false
    };

    $scope.gridsterOpts = {
      margins: [10, 10],
      columns: 5,
      outerMargin: false,
      pushing: true,
      floating: false,
      mobileBreakPoint: 330,
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: true,
        handles: ['n', 'e', 's', 'w', 'se', 'sw']
      }
    };


    $scope.standardItems = [
      { sizeX: 1, sizeY: 1, row: 0, col: 0 },
      { size: { x: 1, y: 2 }, position: [0, 2] },
      { size: { x: 1, y: 1 }, position: [0, 2] },
      { size: { x: 1, y: 1 }, position: [0, 2] }
    ];


    /*
    snapRemote.getSnapper().then(function(snapper) {
      snapper.on('open', function() {
        console.log('Drawer opened!');
      });
      
      snapper.on('close', function() {
        console.log('Drawer closed!');
      });
    });
*/

  });
