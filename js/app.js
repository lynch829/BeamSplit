var BeamSplit = angular.module('BeamSplit', []);

BeamSplit.controller('Beam', function ($scope) {
  $scope.name  = '';
  $scope.weight = null;
  $scope.main = {weight:null, percent:null};
  $scope.rest = {weight:null, percent:null};
  $scope.range = null;
  $scope.disable = true;
  
  $scope.beamName = function beamName () {
    if("" === $scope.name || "undefined" == typeof $scope.name) {
      return "Beam";
    }
    return $scope.name;
  };
  
  $scope.onWeightChange = function onWeightChange () {
    if("undefined" == typeof $scope.weight) {
      $scope.weight = null;
      $scope.main.weight = null;
      $scope.rest.weight = null;
      $scope.main.percent = null;
      $scope.rest.percent = null;
      $scope.range = null;
      $scope.disable = true;
    }
    else {
      $scope.weight = Math.round($scope.weight * 10) / 10;
      $scope.main.weight = $scope.weight;
      $scope.rest.weight = 0;
      $scope.main.percent = 100;
      $scope.rest.percent = 0;
      $scope.range = 0;
      $scope.disable = false;
    }
  };
  
  $scope.reCalcByWeight = function reCalcByWeight (slice1, slice2) {
    var m = ($scope.weight - slice1.weight) * 10;
    var p = (slice1.weight / $scope.weight) * 100;
    slice2.weight = Math.round(m) / 10;
    slice1.percent = Math.round(p);
    slice2.percent = 100 - slice1.percent;
    $scope.range = $scope.rest.percent;
  };
  
  $scope.reCalcByPercent = function reCalcByPercent (slice1, slice2) {
    slice2.percent = Math.round((100 - slice1.percent) * 100) / 100;
    slice1.weight = Math.round($scope.weight * slice1.percent) / 100;
    slice2.weight = Math.round($scope.weight * slice2.percent) / 100;
    $scope.range = Math.round($scope.rest.percent);
  };
  
  $scope.onMainWeightChange = function onMainWeightChange () {
    if ("undefined" == typeof $scope.main.weight) {
      $scope.main.weight = $scope.weight;
    }
    
    $scope.reCalcByWeight($scope.main, $scope.rest);
  };
  
  $scope.onRestWeightChange = function onRestWeightChange () {
    if ("undefined" == typeof $scope.rest.weight) {
      $scope.rest.weight = 0;
    }
    
    $scope.reCalcByWeight($scope.rest, $scope.main);
  };
  
  $scope.onMainPercentChange = function onMainPercentChange () {
    if ("undefined" == typeof $scope.main.percent) {
      $scope.main.percent = 100;
    }
    
    $scope.reCalcByPercent($scope.main, $scope.rest);
  };
  
  $scope.onRestPercentChange = function onRestPercentChange () {
    if ("undefined" == typeof $scope.rest.percent) {
      $scope.rest.percent = 0;
    }
    
    $scope.reCalcByPercent($scope.rest, $scope.main);
  };
  
  $scope.onRangeChange = function onRangeChange () {
    $scope.rest.percent = parseInt($scope.range);
    $scope.main.percent = Math.round((100 - $scope.rest.percent) * 100) / 100;
    $scope.main.weight = Math.round($scope.weight * $scope.main.percent) / 100;
    $scope.rest.weight = Math.round($scope.weight * $scope.rest.percent) / 100;
  };
  
  // ng-model-options="{ updateOn: 'blur' }"
  //console.log();
});
