/**
 * Created by bryanclover on 4/2/15.
 */

var myApp = angular.module('myApp', []);

myApp.controller('MainController', ['$scope', function ($scope) {

    $scope.error = {};

    $scope.people = [
        {firstName: 'John', lastName: 'Doe', phone: '425-218-1123', city: 'New York'},
        {firstName: 'Jane', lastName: 'Doe', phone: '213-734-1903', city: 'Chicago'},
        {firstName: 'Sam', lastName: 'Smith', phone: '919-861-1227', city: 'Raleigh'},
        {firstName: 'Paul', lastName: 'Jones', phone: '412-954-4106', city: 'Pittsburgh'}
    ];

    $scope.addContactBtnClicked = function () {
        showContactForm(true);
    };

    $scope.removeContactBtnClicked = function (person) {
        $scope.people = _.without($scope.people, person);
    };

    $scope.saveBtnClicked = function () {
        if ($scope.newPerson && $scope.newPerson.firstName && $scope.newPerson.lastName && $scope.newPerson.phone && $scope.newPerson.city) {
            showContactForm(false);
            $scope.people.push({
                firstName:  $scope.newPerson.firstName,
                lastName:  $scope.newPerson.lastName,
                phone: $scope.newPerson.phone,
                city:  $scope.newPerson.city
            });
            clearForm();
        }else{
            $scope.error.message = 'You must enter values for all fields before you can save.';
            console.log('$scope.error.message:', $scope.error.message);
        }
    };

    $scope.cancelBtnClicked = function() {
        showContactForm(false);
        clearForm();
    };

    function clearForm() {
        $scope.newPerson.firstName = '';
        $scope.newPerson.lastName = '';
        $scope.newPerson.phone = '';
        $scope.newPerson.city = '';
        $scope.error.message = '';
    }

    function showContactForm(newValue){
        $scope.addContactFormIsVisible = newValue;
    }

}]);