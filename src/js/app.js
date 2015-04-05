/**
 * Created by bryanclover on 4/2/15.
 */

var myApp = angular.module('myApp', []);

myApp.controller('MainController', ['$scope', function ($scope) {

    $scope.error = {message: "* Required fields."};

    $scope.people = [
        {
            firstName: 'John',
            lastName:  'Doe',
            address1:  '123 High Way',
            address2:  '',
            city:      'New York',
            state:     'NY',
            zip:       '32567'
        },
        {
            firstName: 'Jane',
            lastName:  'Doe',
            address1:  '1502 Pine St',
            address2:  'Suite A',
            city:      'Chicago',
            state:     'IL',
            zip:       '42212'
        },
        {
            firstName: 'Sam',
            lastName:  'Smith',
            address1:  '337 Doemont Drive',
            address2:  '',
            city:      'Raleigh',
            state:     'NC',
            zip:       '34135'
        },
        {
            firstName: 'Paul',
            lastName:  'Jones',
            address1:  '435 McClellan Dr.',
            address2:  'Suite 213',
            city:      'Pittsburgh',
            state:     'PA',
            zip:       '42678'
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
            if ($scope.newPerson.firstName && $scope.newPerson.lastName && $scope.newPerson.address1 && $scope.newPerson.city && $scope.newPerson.state && $scope.newPerson.zip) {
                displayError = false;
                showContactForm(false);
                $scope.people.push({
                    firstName: $scope.newPerson.firstName,
                    lastName:  $scope.newPerson.lastName,
                    address1:  $scope.newPerson.address1,
                    address2:  $scope.newPerson.address2,
                    city:      $scope.newPerson.city,
                    state:     $scope.newPerson.state,
                    zip:       $scope.newPerson.zip
                });
                clearForm();
            } else {
                displayError = true;
            }
        }
        else {
            displayError = true;
        }

        if (displayError) {
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
        $scope.newPerson.city = '';
        $scope.newPerson.state = '';
        $scope.newPerson.zip = '';
        $scope.error.message = '* Required fields.';
    }

    function showContactForm(newValue) {
        $scope.addContactFormIsVisible = newValue;
    }

}])
;