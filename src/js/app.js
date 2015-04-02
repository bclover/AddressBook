/**
 * Created by bryanclover on 4/2/15.
 */

var myApp = angular.module('myApp',[]);

myApp.controller('PeopleController', ['$scope', function($scope) {
    $scope.people = [
        {name: 'John Doe', phone: '425-218-1123', city: 'New York'},
        {name: 'Jane Doe', phone: '213-734-1903', city: 'Chicago'},
        {name: 'Sam Smith', phone: '919-861-1227', city: 'Raleigh'},
        {name: 'Paul Jones', phone: '412-954-4106', city: 'Pittsburgh'}
    ];
}]);