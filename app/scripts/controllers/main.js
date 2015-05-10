'use strict';

/**
 * @ngdoc function
 * @name greenhouseinnovationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the greenhouseinnovationApp
 */
angular.module('greenhouseinnovationApp')
  .controller('MainCtrl', function ($scope, $http, toasty) {

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  	// Answers
  	$scope.answers = {};
	$scope.showResult = false;
	$scope.score = 0;
	$scope.current = 0;

  	// 
  	// Parse JSON data and store it
	// 
	$http.get('assets/test.json').then(function(res){
		$scope.title = res.data.title;
		$scope.questions = res.data.questions;
		$scope.solutions = res.data.solution;

		// Load instructions
		toasty.pop.info({
			title: 'INSTRUCTIONS',
			msg: 'The questionnaire consists of 4 questions. You have to give 4 answers and after it you will get a score. Thanks for participating!',
			timeout: 0,
			sound: false,
			showClose: true,
		});
	});

	// 
  	// Count number of questions
	// 
    $scope.countQuestions = function(object) {
        return Object.keys(object).length;
    };

	// 
  	// Save answer
	// 
	$scope.select = function(key, value) {
		$scope.answers[key] = value;
		$('.next').removeAttr('disabled');
	};

	// 
  	// Trigger next question
	// 
	$scope.next = function() {
		$scope.current++;
		$('.next').attr('disabled','disabled');
		if (Object.keys($scope.answers).length === this.countQuestions($scope.questions)) {
			$('.next').hide();
  			this.submit();
		}
	};

	// 
  	// Submit questionnaire
	// 
	$scope.submit = function() {
		this.showResults();
	};

	// 
  	// Manage partial/total percentages and show them
	// 
	$scope.showResults = function() {
		if (Object.keys($scope.answers).length !== this.countQuestions($scope.questions)) {
			// The customer has not answered all the questions
			return;
		}

		// Store partial/total values of the answers
		$scope.partial = {};
		$scope.total = {};

		angular.forEach($scope.solutions, function(solution, key) {
			var answer = $scope.answers[key];
			$scope.partial[key] = solution.answers[answer];
			$scope.total[key] = (solution.answers[answer]*solution.value)/100;
		});

		// Calculate total result
		$scope.score = this.calculateTotal();
		// Show total result
		this.showTotal($scope.score);
	};

	// 
  	// Calculate total result
	// 
	$scope.calculateTotal = function() {
		var total = 0;
		angular.forEach($scope.total, function(value) {
			total += value;
		});
		return parseInt(total);
	};

	// 
  	// Show total result in a progress bar
	// 
	$scope.showTotal = function(score) {
		$('.progress').empty();
		$('.progress').html('<div class="progress-bar" role="progressbar" aria-valuenow="'+score+'" aria-valuemin="0" aria-valuemax="100" style="width: '+score+'%;">'+score+'%</div>');
		$scope.showResult = true;
	};

  });
