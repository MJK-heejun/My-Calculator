'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testApp
 */
angular.module('testApp')
  .controller('MainCtrl', function ($scope, snapRemote, ngDialog) {

    $scope.locked = true; //flag for lock/unlock
    $scope.form_data_array = []; //array for form_data
    $scope.form_data_array_index = 0; //array for form_data
    $scope.last_ans;

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
      { size: { x: 1, y: 1 }, 
        position: [0, 2], 
        name: "(",
        value: "("  },
      { size: { x: 1, y: 1 }, 
        position: [0, 2], 
        name: ")",
        value: ")"  },          
      { size: { x: 1, y: 1 }, 
        position: [0, 0], 
        name: "sin",
        value: "sin("  },          
      { size: { x: 1, y: 1 }, 
        position: [0, 0], 
        name: "cos",
        value: "cos("  },          
      { size: { x: 1, y: 1 }, 
        position: [0, 0], 
        name: "1",
        value: "1"  },
      { size: { x: 1, y: 1 }, 
        position: [0, 0], 
        name: "2",
        value: "2"  },
      { size: { x: 1, y: 1 }, 
        position: [0, 0], 
        name: "3",
        value: "3"  },                          
      { size: { x: 1, y: 1 }, 
        position: [0, 0], 
        name: "+",
        value: "+"  },
      { size: { x: 1, y: 1 }, 
        position: [0, 0], 
        name: "√",
        value: "sqrt("  },                
      { size: { x: 1, y: 1 }, 
        position: [0, 0], 
        name: "π",
        value: "pi"  },           
      { size: { x: 1, y: 1 }, 
        position: [0, 0], 
        name: "=",
        value: "="  },          
      { size: { x: 1, y: 1 }, 
        position: [0, 0], 
        name: "del",
        value: "del"  },
      { size: { x: 1, y: 1 }, 
        position: [0, 0], 
        name: "ac",
        value: "ac"  },                
      { size: { x: 1, y: 1 }, 
        position: [0, 0], 
        name: "ANS",
        value: "ans"  }        
    ];


    //initiate the current items that will be displayed
    $scope.current_items = [];
    if(localStorage.getItem("saved_items") == null){
      $scope.current_items = $scope.default_items;
    }else{
      //$scope.current_items = $scope.default_items;
      $scope.current_items = angular.fromJson(localStorage.getItem("saved_items"));
    }   

    //get the last angswer from storage
    if(localStorage.getItem("last_ans") != null){
      $scope.last_ans = localStorage.getItem("last_ans");
    }

    //adding element
    //$scope.default_items.push({ size: { x: 1, y: 1 }, position: [0, 0], name: "new" });


    $scope.ttt = function(){
      console.log("yoooink");
      ngDialog.open({ template: 'views/result.html' });
    };

    //disable, able the grid
    $scope.$watch('locked', function(){      
      if($scope.locked){
        $scope.gridsterOpts.draggable.enabled = false;
        $scope.gridsterOpts.resizable.enabled = false;
      }else{
        $scope.gridsterOpts.draggable.enabled = true;
        $scope.gridsterOpts.resizable.enabled = true;
      }
    });

    $scope.insertValue = function(value){

      if(typeof $scope.form_data == 'undefined')
        $scope.form_data = "";        

      if(value == "="){
        try{
          $scope.last_ans = math.eval($scope.form_data);
          localStorage.setItem("last_ans", $scope.last_ans);
          console.log("answer: "+$scope.last_ans);
        }catch(err){
          console.log(err);
        }        
      }else if(value == "ac"){        
        $scope.form_data = ""; 
        $scope.form_data_array = [];
      }else if(value == "ans"){
        pushIntoFormDataArray($scope.last_ans);        
      }else if(value == "del"){
        deleteFromFormDataArray(value);
      }else{
        pushIntoFormDataArray(value);        
      }

    };

    $scope.resetAll = function(){
      $scope.current_items = $scope.default_items;
    };
    $scope.saveCurrent = function(){
      localStorage.setItem("saved_items", angular.toJson($scope.current_items));       
    };



    function deleteFromFormDataArray(value){
      $scope.form_data_array.pop();
      $scope.form_data = $scope.form_data_array.join("");
    }

    function pushIntoFormDataArray(value){
      if($scope.form_data.length >= 0){
        $scope.form_data = $scope.form_data + value;
        $scope.form_data_array.push(value);
      }/*else if($scope.form_data.length > 0){
        $scope.form_data += value;
        $scope.form_data_array.push(value);
      }*/else{
        console.log("??? why < 0?: "+$scope.form_data.length);
      }
    }

  });
