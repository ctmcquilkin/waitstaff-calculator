var waitstaffCalculator = angular.module("root", []);

waitstaffCalculator.controller("index", ["$scope", function ($scope){
  
  $scope.mealPrice;
  $scope.taxRate;
  $scope.tipPercentage;
  
  var success = document.getElementById('successMessage');
  var error = document.getElementById('errorMessage');
  
  $scope.selection = [];
  
  $scope.transactions = [];
  
  $scope.getTip = function(){
    var Tip = 0;
    Tip += $scope.transactions[0].base * ($scope.transactions[0].tip/100);
    console.log('tip: ' + Tip);
    return Tip;
  };

  $scope.getSubTotal = function(){
    var subTotal = $scope.transactions[0].base;
    subTotal += parseInt($scope.transactions[0].tip);
    console.log('subtotal: ' + subTotal);
    return subTotal;
  };

  $scope.getTotal = function(){
    var Tax = 0;
    var Total = 0;
    var subTotal = $scope.transactions[0].base;
    subTotal += parseInt($scope.transactions[0].tip);
    Tax += $scope.transactions[0].base * ($scope.transactions[0].tax/100);
    Total += subTotal + Tax;
    console.log('tip: ' + Total);
    return Total;
  };

  $scope.getTipTotal = function(){
    var tipTotal = 0;
    for(var i = 0; i < $scope.transactions.length; i++){
        tipTotal += $scope.transactions[i].tip;
    }
    console.log('grand total: ' + tipTotal);
    return tipTotal;
  };

  $scope.getTipAverage = function(){
    var tipTotal = 0;
    var tipAverage = 0;
    for(var i = 0; i < $scope.transactions.length; i++){
        tipTotal += $scope.transactions[i].tip;
    }
    tipAverage += tipTotal / $scope.transactions.length;
    console.log('Tip Average: ' + tipAverage);
    return tipAverage;
  };

  $scope.clearAll = function(transactions){
    var length = transactions.length;
     transactions.splice(0, length);
  };
    
  $scope.cancel = function() {
    $scope.mealPrice = 0;
    $scope.taxRate = 0;
    $scope.tipPercentage = 0;
  }

    $scope.addTicket = function() {
       if($scope.mealPrice && $scope.taxRate && $scope.tipPercentage){
          $scope.transactions.push({base: $scope.mealPrice, tax: $scope.taxRate, tip: $scope.tipPercentage, total: $scope.mealPrice + ($scope.mealPrice * ($scope.taxRate/100)) + ($scope.mealPrice * ($scope.tipPercentage/100)), checked: false});
  
          console.log($scope.transactions)

          $scope.mealPrice = '';
          $scope.tipPercentage = '';
          $scope.taxRate = '';
  
          success.style.display = 'block';
          var timer = setTimeout(function(){
            success.style.display = 'none';
          }, 1000);
      }
    }
    
}]);