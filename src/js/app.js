var myApp = angular.module('myApp', []);

myApp.controller('MainController', ['$scope', '$filter', function ($scope, $filter) {

    var ADD_CONTACT_STATE = 'Add Contact';
    var EDIT_CONTACT_STATE = 'Edit Contact';
    $scope.currentState = '';

    $scope.error = {message: "* Required fields."};

    $scope.sortOptions = [
        {name: 'First Name', data: 'firstName'},
        {name: 'Last Name', data: 'lastName'},
        {name: 'Address 1', data: 'address1'},
        {name: 'Address 2', data: 'address2'},
        {name: 'City', data: 'city'},
        {name: 'State', data: 'state'},
        {name: 'Zip', data: 'zip'}
    ];

    $scope.currentSort = $scope.sortOptions[1];

    $scope.people = [
        {
            id:        1,
            firstName: 'Zack',
            lastName:  'Adams',
            address1:  '123 High Way',
            address2:  '',
            city:      'New York',
            state:     'NY',
            zip:       '32567'
        },
        {
            id:        2,
            firstName: 'Yvette',
            lastName:  'Baker',
            address1:  '1502 Pine St',
            address2:  'Suite A',
            city:      'Chicago',
            state:     'IL',
            zip:       '42212'
        },
        {
            id:        3,
            firstName: 'Xavier',
            lastName:  'Cooke',
            address1:  '337 Doemont Drive',
            address2:  '',
            city:      'Raleigh',
            state:     'NC',
            zip:       '34135'
        },
        {
            id:        4,
            firstName: 'Willie',
            lastName:  'Dixon',
            address1:  '435 McClellan Dr.',
            address2:  'Suite 213',
            city:      'Pittsburgh',
            state:     'PA',
            zip:       '42678'
        }
    ];

    //********************* VIEW METHODS ********************//

    $scope.addContactBtnClicked = function () {
        setFormState(ADD_CONTACT_STATE);
        showContactForm(true);
    };

    $scope.cancelBtnClicked = function () {
        showContactForm(false);
        clearForm();
    };

    $scope.changeSort = function (newSortOption) {
        console.log('scope.currentSort:', $scope.currentSort);
    };

    $scope.editContactBtnClicked = function (person) {
        setFormState(EDIT_CONTACT_STATE);
        loadExistingPersonData(person);
        showContactForm(true);
    };

    $scope.removeContactBtnClicked = function (person) {
        $scope.people = _.without($scope.people, person);
    };

    $scope.saveBtnClicked = function () {
        var displayError;
        ($scope.currentState === ADD_CONTACT_STATE) ? addNewContact() : saveChangesToContact();
    };

    //********************* HELPER METHODS ********************//

    function addNewContact() {
        if ($scope.newPerson) {
            if ($scope.newPerson.firstName && $scope.newPerson.lastName && $scope.newPerson.address1 && $scope.newPerson.city && $scope.newPerson.state && $scope.newPerson.zip) {
                displayError = false;
                showContactForm(false);
                $scope.people.push({
                    id:        $scope.people.length + 1,
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
    }

    function clearForm() {
        $scope.newPerson = {};
        $scope.newPerson.id = '';
        $scope.newPerson.firstName = '';
        $scope.newPerson.lastName = '';
        $scope.newPerson.address1 = '';
        $scope.newPerson.address2 = '';
        $scope.newPerson.city = '';
        $scope.newPerson.state = '';
        $scope.newPerson.zip = '';
        $scope.error.message = '* Required fields.';
        $scope.currentState = '';
    }

    function saveChangesToContact() {
        var existingContactIndex = _.findIndex($scope.people, 'id', $scope.newPerson.id);
        $scope.people[existingContactIndex] = $scope.newPerson;
        clearForm();
        showContactForm(false);
    }

    function setFormState(newValue) {
        $scope.currentState = newValue;
    }

    function showContactForm(newValue) {
        $scope.addContactFormIsVisible = newValue;
    }

    function loadExistingPersonData(person) {
        $scope.newPerson = {};
        $scope.newPerson.id = person.id;
        $scope.newPerson.firstName = person.firstName;
        $scope.newPerson.lastName = person.lastName;
        $scope.newPerson.address1 = person.address1;
        $scope.newPerson.address2 = person.address2;
        $scope.newPerson.city = person.city;
        $scope.newPerson.state = person.state;
        $scope.newPerson.zip = person.zip;
    }

}]);
