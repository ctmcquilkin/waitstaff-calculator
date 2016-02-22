var waitstaffCalculator = angular.module("root", []);

waitstaffCalculator.controller("index", ["$scope", function ($scope){
  
  $scope.taxRate;
  $scope.tipPercentage;
  $scope.mealPrice;
  
  var success = document.getElementById('successMessage');
  var error = document.getElementById('errorMessage');
  
  $scope.selection = [];
  
  $scope.transactions = [];
  // $scope.transactions = [
  //   {name: '3', shop:12.65, quantity: 12, price: 15, checked: true},
  //   {name: '2', shop:12.65, quantity: 12, price: 2.15, checked: true},
  //   {name: '1', shop:12.65, quantity: 12, price: 15, checked: false}
  // ];
  
  
  $scope.getSubTotal = function(){
    var subTotal = 0;
      subTotal += $scope.mealPrice + ( $scope.mealPrice * $scope.taxRate );
    return subTotal;
  };
  
  $scope.getTotal = function(){
    var grandTotal = 0;
      grandTotal += $scope.mealPrice + ( $scope.mealPrice * $scope.taxRate ) + ( $scope.mealPrice * $scope.tipPercentage );
    // for(var i = 0; i < $scope.transactions.length; i++){
    //     grandTotal += $scope.transactions[i].total;
    // }
    return grandTotal;
  };

  $scope.getTip = function(){
    var Tip = 0;
    Tip += $scope.mealPrice * $scope.tipPercentage;
    // for(var i = 0; i < $scope.transactions.length; i++){
    //     Tip += $scope.transactions[i].total;
    // }
    return Tip;
  };

  // $scope.remove = function(item) { 
  //   var index = $scope.list.indexOf(item)
  //   $scope.list.splice(index, 1);     
  // }
  
  // $scope.removeInventory = function(item) { 
  //   var index = $scope.inventory.indexOf(item)
  //   $scope.inventory.splice(index, 1);     
  // }
    
  // $scope.clearAll = function(list){
  //   var length = list.length;
  //    list.splice(0, length);
  // };
    
    $scope.addTicket = function() {
       if($scope.mealPrice && $scope.taxRate && $scope.tipPercentage){
          $scope.transactions.push({base: $scope.mealPrice, tax: $scope.taxRate, tip: $scope.tipPercentage, total: $scope.mealPrice * $scope.taxRate + $scope.mealPrice * $scope.tipPercentage, checked: false});
  
          $scope.mealPrice = '';
          $scope.tipPercentage = '';
          $scope.taxRate = '';
  
          success.style.display = 'block';
          var timer = setTimeout(function(){
            success.style.display = 'none';
          }, 2000);
      }
    }
    
  //   $scope.add = function(item){
  //     var item = $scope.list.indexOf(item);
  //     $scope.inventory.push($scope.list[item]);
  //     $scope.list[item].checked = true;
  //   }
}]);