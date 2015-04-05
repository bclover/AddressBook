/**
 * Created by bryanclover on 4/2/15.
 */

var myApp = angular.module('myApp', []);

myApp.controller('MainController', ['$scope', function ($scope) {

    $scope.error = {};

    $scope.people = [
        {
            firstName: 'John',
            lastName:  'Doe',
            address1:  '123 High Way',
            address2:  '',
            phone:     '425-218-1123',
            city:      'New York',
            state:     'NY'
        },
        {
            firstName: 'Jane',
            lastName:  'Doe',
            address1:  '1502 Pine St',
            address2:  'Suite A',
            phone:     '213-734-1903',
            city:      'Chicago',
            state:     'IL'
        },
        {
            firstName: 'Sam',
            lastName:  'Smith',
            address1:  '337 Doemont Drive',
            address2:  '',
            phone:     '919-861-1227',
            city:      'Raleigh',
            state:     'NC'
        },
        {
            firstName: 'Paul',
            lastName:  'Jones',
            address1:  '435 McClellan Dr.',
            address2:  'Suite 213',
            phone:     '412-954-4106',
            city:      'Pittsburgh',
            state:     'PA'
        }
    ];

    $scope.addContactBtnClicked = function () {
        showContactForm(true);
    };

    $scope.removeContactBtnClicked = function (person) {
        $scope.people = _.without($scope.people, person);
    };

    $scope.saveBtnClicked = function () {
        var displayError;
        if ($scope.newPerson) {
            if ($scope.newPerson.firstName && $scope.newPerson.lastName && $scope.newPerson.address1, $scope.newPerson.phone && $scope.newPerson.city, $scope.newPerson.state) {
                displayError = false;
                showContactForm(false);
                $scope.people.push({
                    firstName: $scope.newPerson.firstName,
                    lastName:  $scope.newPerson.lastName,
                    address1:  $scope.newPerson.address1,
                    address2:  $scope.newPerson.address2,
                    phone:     $scope.newPerson.phone,
                    city:      $scope.newPerson.city,
                    state:     $scope.newPerson.state
                });
                clearForm();
            }else{
                displayError = true;
            }
        }
        else {
            displayError = true;
        }

        if(displayError){
            $scope.error.message = 'Everything but the Address 2 field is required.';
        }
    };

    $scope.cancelBtnClicked = function () {
        showContactForm(false);
        clearForm();
    };

    function clearForm() {
        $scope.newPerson = {};
        $scope.newPerson.firstName = '';
        $scope.newPerson.lastName = '';
        $scope.newPerson.address1 = '';
        $scope.newPerson.address2 = '';
        $scope.newPerson.phone = '';
        $scope.newPerson.city = '';
        $scope.newPerson.state = '';
        $scope.error.message = '';
    }

    function showContactForm(newValue) {
        $scope.addContactFormIsVisible = newValue;
    }

}])
;