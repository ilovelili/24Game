(function() {
    'use strict';

    angular.module('game', ['ngMaterial'])
        .service('RandomNumberService', function() {
            this.getRandomNumbers = function() {
                return [1, 2, 3, 4].map(function() {
                    return Math.floor(Math.random() * 8 + 1);
                });
            };
        })
        .constant('Result', {
            emptyInput: 0,
            inValidInput: 1,
            wrongNumber: 2,
            inValidExpression: 3,
            wrongAnswer: 4,
            correntAnswer: 5
        })
        .service('CalculateService', ['Result', '$parse', function(Result, $parse) {
            var innerCalc = function(numbers, input, results) {
                var invalidChars = /[^\d\+\*\/\s-\(\)]/;

                var validNums = function(str) {
                    // Create a duplicate of our input numbers, so that
                    // both lists will be sorted.
                    var mnums = numbers.slice();
                    mnums.sort();

                    // Sort after mapping to numbers, to make comparisons valid.
                    return str.replace(/[^\d\s]/g, " ")
                        .trim()
                        .split(/\s+/)
                        .map(function(n) {
                            return parseInt(n, 10);
                        })
                        .sort()
                        .every(function(v, i) {
                            return v === mnums[i];
                        });
                };

                var validEval = function(input) {
                    try {
                        return $parse(input)();
                    }
                    catch (e) {
                        return {
                            error: e.toString()
                        };
                    }
                };

                if (input.trim() === "") return Result.emptyInput;
                if (input.match(invalidChars)) return Result.inValidInput;
                if (!validNums(input)) return Result.wrongNumber;
                var calc = validEval(input);
                if (typeof calc !== 'number') return Result.inValidExpression;
                if (calc !== 24) return Result.wrongAnswer;

                // corrent
                if (results != undefined)
                    results.push(input);
                return Result.correntAnswer;
            };

            this.calc = function(numbers, input) {
                var result = innerCalc(numbers, input);

                if (result == Result.emptyInput) return "You must enter a value.";
                if (result == Result.inValidInput) return "Invalid chars used, try again. Use only:\n + - * / ( )";
                if (result == Result.wrongNumber) return "Wrong numbers used, try again.";
                if (result == Result.inValidExpression) return "That is not a valid input; please try again.";
                if (result == Result.wrongAnswer) return "Wrong answer. please try again.";
                return input + " == 24.  Congratulations!";
            };

            // order-independent calculation
            this.autocalc = function(numbers, results) {
                innerCalc(numbers, numbers[0] + "+" + numbers[1] + "+" + numbers[2] + "+" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "+" + numbers[1] + "+" + numbers[2] + "-" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "+" + numbers[1] + "+" + numbers[2] + "*" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "+" + numbers[1] + "+" + numbers[2] + "/" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "+" + numbers[1] + "-" + numbers[2] + "+" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "+" + numbers[1] + "-" + numbers[2] + "-" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "+" + numbers[1] + "-" + numbers[2] + "*" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "+" + numbers[1] + "-" + numbers[2] + "/" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "+" + numbers[1] + "*" + numbers[2] + "+" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "+" + numbers[1] + "*" + numbers[2] + "-" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "+" + numbers[1] + "*" + numbers[2] + "*" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "+" + numbers[1] + "*" + numbers[2] + "/" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "+" + numbers[1] + "/" + numbers[2] + "+" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "+" + numbers[1] + "/" + numbers[2] + "-" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "+" + numbers[1] + "/" + numbers[2] + "*" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "+" + numbers[1] + "/" + numbers[2] + "/" + numbers[3], results);

                innerCalc(numbers, numbers[0] + "-" + numbers[1] + "+" + numbers[2] + "+" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "-" + numbers[1] + "+" + numbers[2] + "-" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "-" + numbers[1] + "+" + numbers[2] + "*" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "-" + numbers[1] + "+" + numbers[2] + "/" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "-" + numbers[1] + "-" + numbers[2] + "+" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "-" + numbers[1] + "-" + numbers[2] + "-" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "-" + numbers[1] + "-" + numbers[2] + "*" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "-" + numbers[1] + "-" + numbers[2] + "/" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "-" + numbers[1] + "*" + numbers[2] + "+" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "-" + numbers[1] + "*" + numbers[2] + "-" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "-" + numbers[1] + "*" + numbers[2] + "*" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "-" + numbers[1] + "*" + numbers[2] + "/" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "-" + numbers[1] + "/" + numbers[2] + "+" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "-" + numbers[1] + "/" + numbers[2] + "-" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "-" + numbers[1] + "/" + numbers[2] + "*" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "-" + numbers[1] + "/" + numbers[2] + "/" + numbers[3], results);

                innerCalc(numbers, numbers[0] + "*" + numbers[1] + "+" + numbers[2] + "+" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "*" + numbers[1] + "+" + numbers[2] + "-" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "*" + numbers[1] + "+" + numbers[2] + "*" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "*" + numbers[1] + "+" + numbers[2] + "/" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "*" + numbers[1] + "-" + numbers[2] + "+" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "*" + numbers[1] + "-" + numbers[2] + "-" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "*" + numbers[1] + "-" + numbers[2] + "*" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "*" + numbers[1] + "-" + numbers[2] + "/" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "*" + numbers[1] + "*" + numbers[2] + "+" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "*" + numbers[1] + "*" + numbers[2] + "-" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "*" + numbers[1] + "*" + numbers[2] + "*" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "*" + numbers[1] + "*" + numbers[2] + "/" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "*" + numbers[1] + "/" + numbers[2] + "+" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "*" + numbers[1] + "/" + numbers[2] + "-" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "*" + numbers[1] + "/" + numbers[2] + "*" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "*" + numbers[1] + "/" + numbers[2] + "/" + numbers[3], results);

                innerCalc(numbers, numbers[0] + "/" + numbers[1] + "+" + numbers[2] + "+" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "/" + numbers[1] + "+" + numbers[2] + "-" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "/" + numbers[1] + "+" + numbers[2] + "*" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "/" + numbers[1] + "+" + numbers[2] + "/" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "/" + numbers[1] + "-" + numbers[2] + "+" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "/" + numbers[1] + "-" + numbers[2] + "-" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "/" + numbers[1] + "-" + numbers[2] + "*" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "/" + numbers[1] + "-" + numbers[2] + "/" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "/" + numbers[1] + "*" + numbers[2] + "+" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "/" + numbers[1] + "*" + numbers[2] + "-" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "/" + numbers[1] + "*" + numbers[2] + "*" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "/" + numbers[1] + "*" + numbers[2] + "/" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "/" + numbers[1] + "/" + numbers[2] + "+" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "/" + numbers[1] + "/" + numbers[2] + "-" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "/" + numbers[1] + "/" + numbers[2] + "*" + numbers[3], results);
                innerCalc(numbers, numbers[0] + "/" + numbers[1] + "/" + numbers[2] + "/" + numbers[3], results);
            };
        }])
        .controller('GameController', ['$scope', 'RandomNumberService', 'CalculateService', function($scope, RandomNumberService, CalculateService) {
            var getValidNumbers = function() {
                var results = [];
                do {
                    var numbers = RandomNumberService.getRandomNumbers();
                    CalculateService.autocalc(numbers, results);
                } while (results.length === 0)
                return numbers;
            };


            $scope.numbers = getValidNumbers();
            $scope.info = '';
            $scope.answer = '';
            $scope.answers = [];
            $scope.autoCalcClicked = false;

            $scope.calculate = function() {
                $scope.info = CalculateService.calc($scope.numbers, $scope.answer);
            };

            $scope.autocalc = function() {
                $scope.autoCalcClicked = true;
                $scope.answers = [];
                CalculateService.autocalc($scope.numbers, $scope.answers);
            };

            $scope.refresh = function() {
                $scope.numbers = getValidNumbers();
            };
        }]);
})();