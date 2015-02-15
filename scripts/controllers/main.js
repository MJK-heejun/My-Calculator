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
    $scope.last_ans; //last answer value
    $scope.pretty_print = false; //pretty print by MathJax
    $scope.is_answer_displayed = false; //flag used when displaying answer

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
    /*
      { 
        sizeX: 2,
        sizeY: 2, 
        position: [0, 2], 
        name: "(",
        value: "("  },
      { 
    */
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "√",
        value: "sqrt("  },      
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "!",
        value: "!"  },          
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "^",
        value: "^"  },                  
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "(",
        value: "("  },
      { 
        sizeX: 2,
        sizeY: 2,          
        name: ")",
        value: ")"  },          
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "sin",
        value: "sin("  },          
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "cos",
        value: "cos("  },          
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "tan",
        value: "tan("  },          
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "DEL",
        value: "del"  },
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "AC",
        value: "ac"  },      
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "7",
        value: "7"  },              
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "8",
        value: "8"  },
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "9",
        value: "9"  },        
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "X",
        value: "*"  },        
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "÷",
        value: "/"  },       
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "4",
        value: "4"  },         
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "5",
        value: "5"  },        
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "6",
        value: "6"  },     
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "+",
        value: "+"  },
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "-",
        value: "-"  },                   
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "1",
        value: "1"  },        
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "2",
        value: "2"  },        
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "3",
        value: "3"  },                                          
      { 
        sizeX: 2,
        sizeY: 4,         
        name: "ANS",
        value: "ans"  },  
      { 
        sizeX: 2,
        sizeY: 4,          
        name: "=",
        value: "="  },          
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "0",
        value: "0"  },          
      { 
        sizeX: 2,
        sizeY: 2,          
        name: ".",
        value: "."  },                                        
      { 
        sizeX: 2,
        sizeY: 2,          
        name: "π",
        value: "pi"  }
    ];


    //initiate the current items that will be displayed
    $scope.current_items = [];
    if(localStorage.getItem("saved_items") == null){
      $scope.current_items = $scope.default_items;
    }else{
      $scope.current_items = $scope.default_items;
      //$scope.current_items = angular.fromJson(localStorage.getItem("saved_items"));
    }   

    //get the last angswer from storage
    if(localStorage.getItem("last_ans") != null){
      $scope.last_ans = localStorage.getItem("last_ans");
    }

    //adding element
    //$scope.default_items.push({ size: { x: 1, y: 1 }, position: [0, 0], name: "new" });


    $scope.ttt = function(){
      console.log("yoooink");
      //ngDialog.open({ template: 'views/result.html' });
      console.log($scope.caret.set = $scope.form_data.length);
      console.log($scope.caret.get);
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

      //reset the form_data textbox after the answer
      if($scope.is_answer_displayed){
        $scope.form_data = ""; 
        $scope.form_data_array = [];        
        $scope.is_answer_displayed = false;
      }

      if(value == "="){
        try{
          $scope.last_ans = math.eval($scope.form_data);
          localStorage.setItem("last_ans", $scope.last_ans);
          console.log("answer: "+$scope.last_ans);

          $scope.is_answer_displayed = true;
        }catch(err){
          console.log(err);
        }        

        if($scope.pretty_print){
          //print by mathjax
        }else{
          //print in the form data input field
          $scope.form_data = ""+$scope.last_ans;
        }

      }else if(value == "ac"){        
        $scope.form_data = ""; 
        $scope.form_data_array = [];
      }else if(value == "ans"){
        pushIntoFormDataArray($scope.last_ans);        
      }else if(value == "del"){
        deleteFromFormDataArray();
      }else{
        pushIntoFormDataArray(value);        
      }

      //caret setting
      $scope.caret.set = $scope.form_data.length;
    };


    $scope.resetAll = function(){
      $scope.current_items = $scope.default_items;
    };
    $scope.saveCurrent = function(){
      localStorage.setItem("saved_items", angular.toJson($scope.current_items));       
    };



    function deleteFromFormDataArray(){
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
