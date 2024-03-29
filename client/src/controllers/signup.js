'use strict';

angular.module('schoolstore')
  .controller('SignupController', ['$scope', '$location', 'Auth',
    function ($scope, $location, Auth) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;
  
      if(form.$valid) {
        Auth.createUser({
          name:     $scope.user.name,
          email:    $scope.user.email,
          password: $scope.user.password,
          username: $scope.user.username
        })
        .then( function() {
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
  }]);