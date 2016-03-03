var waitstaffCalculator = angular.module("root", ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            template : '<p>Welcome to waitstaffCalculator</p>',
            controller : 'indexCtrl'
        }).when('/newMeal', {
          templateUrl : 'newMeal.html',
          controller: 'newMealCtrl'
        }).when('/myEarnings', {
          templateUrl : 'myEarnings.html',
          controller: 'myEarningsCtrl'
        });
    }])
    .service('totalService', function() {
      var totals = [
        {tipTotal: 0},
        {mealCount: 0},
        {tipAverage: 0}
      ];
      this.setTotalTip = function(tip) {
        this.totals.tipTotal = tip;
      };
      this.returnTotalTip = function() {
        return this.totals.tipTotal;
      };
      this.setMealCount = function(meals) {
        this.totals.mealCount = meals;
      };
      this.returnMealCount = function() {
        return this.totals.mealCount;
      };
      this.setTipAverage = function(tip) {
        this.totals.setTipAverage = tip;
      };
      this.returnTipAverage = function() {
        return this.totals.returnTipAverage;
      };
      // var totals = [
      //   {tipTotal: 0},
      //   {mealCount: 0},
      //   {tipAverage: 0}
      // ];

      // return {
      //   setTotalTip: function(tip) {
      //     return totals.tipTotal += tip;
      //   },
      //   returnTotalTip: function() {
      //     return totals.tipTotal;
      //   },
      //   setMealCount: function(meals) {
      //     return totals.mealCount += meals;
      //   },
      //   returnMealCount: function() {
      //     return totals.mealCount;
      //   },
      //   setTipAverage: function(tipAverage) {
      //     return totals.tipAverage += tipAverage;
      //   },
      //   returnTipAverage: function() {
      //     return tipAverage;
      //   }
      // };
    })
    .controller("newMealCtrl", ["$scope", function ($scope, totalService){
  
      $scope.mealPrice;
      $scope.taxRate;
      $scope.tipPercentage;
      
      $scope.selection = [];
      
      $scope.transactions = [];
      
      $scope.getTip = function(){
        var Tip = 0;
        if ($scope.transactions.length === 0) {
          return;
        } else {
            Tip += $scope.transactions[0].base * ($scope.transactions[0].tip/100);
            // console.log('tip: ' + Tip);
            return Tip;
        }
      };

      $scope.getSubTotal = function(){
        if ($scope.transactions.length === 0) {
          return;
        } else {
            var subTotal = $scope.transactions[0].base;
            subTotal += parseInt($scope.transactions[0].tip);
            // console.log('subtotal: ' + subTotal);
            return subTotal;
          }
      };

      $scope.getTotal = function(){
        var Tax = 0;
        var Total = 0;
        if ($scope.transactions.length === 0) {
          return;
        } else {
            var subTotal = $scope.transactions[0].base;
            subTotal += parseInt($scope.transactions[0].tip);
            Tax += $scope.transactions[0].base * ($scope.transactions[0].tax/100);
            Total += subTotal + Tax;
            // console.log('tip: ' + Total);
            return Total;
          }
      };

      $scope.getTipTotal = function(){
        var tipTotal = 0;
        for(var i = 0; i < $scope.transactions.length; i++){
            tipTotal += $scope.transactions[i].tip;
        }
        // console.log('grand total: ' + tipTotal);
        totalService.setTotalTip(tipTotal);
        return tipTotal;
      };

      $scope.getTipAverage = function(){
        var tipTotal = 0;
        var tipAverage = 0;
        for(var i = 0; i < $scope.transactions.length; i++){
            tipTotal += $scope.transactions[i].tip;
        }
        tipAverage += tipTotal / $scope.transactions.length;
        // console.log('Tip Average: ' + tipAverage);
        totalService.setMealCount($scope.transactions.length);
        totalService.setTipAverage(tipAverage);
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
      
              // console.log($scope.transactions)

              $scope.mealPrice = 0;
              $scope.tipPercentage = 0;
              $scope.taxRate = 0;
          }
        }
    
    }])
    .controller("myEarningsCtrl", ["$scope", function ($scope, totalService) {
      $scope.getTipTotal = function() {
        return totalService.returnTotalTip();
      };
      $scope.getTicketCount = function() {
        return totalService.returnMealCount();
      };
      $scope.getTipAverage = function() {
        return totalService.returnTipAverage();
      };
    }])
    .controller('indexCtrl', function($scope) {
        //empty for now
    });