angular.module('todoApp', [
  'ngRoute',
  'todoApp.controllers'
]).
config(function($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/index',
      controller: 'GetTodosCtrl'
    }).
    when('/addTodo', {
      templateUrl: 'partials/addTodo',
      controller: 'AddTodoCtrl'
    }).
    when('/editTodo/:id', {
      templateUrl: 'partials/editTodo',
      controller: 'EditTodoCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
});
