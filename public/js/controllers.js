const module = angular.module('todoApp.controllers', []);

module.controller('GetTodosCtrl', ['$scope', '$http', '$location', 'orderByFilter',
  function($scope, $http, $location, orderBy) {
    $http.get('/api/todos').success(data =>{
      $scope.todos = data.map(todo => {
        return {...todo, completed: JSON.parse(todo.completed)}
      });
      $scope.defineTodos();
    });

    $scope.defineTodos = () => {
      $scope.doneTodos = $scope.todos.filter(todo => todo.completed && compareDate(todo.date));
      $scope.newTodos = $scope.todos.filter(todo => !todo.completed && compareDate(todo.date));
    }

    $scope.toggleTodo = todo => {
      todo.completed = !todo.completed;
      $http.put('/api/todos/' + todo.id, todo).success(data => {
        $scope.todos.forEach(todo => {
          if (todo.id == data.id) todo = data;
        });
        $scope.defineTodos();
      })
    };

    $scope.deleteTodo = (todo) => {
      $http.delete('/api/todos/' + todo.id).success(data => {
        $scope.todos = $scope.todos.filter(todo => todo.id != data.id);
        $scope.defineTodos();
      });
    };

    $scope.editTodo = todo => {
      $location.url(`/editTodo/${todo.id}`);
    }

    function compareDate(date) {
      return $scope.term > 0 && new Date().getDate() - new Date(date).getDate() > $scope.term
        ? false : true;
    }

    $scope.propertyName = 'title';
    $scope.reverse = true;

    $scope.sortDoneBy = propertyName => {
      $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
          ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
      $scope.doneTodos = orderBy($scope.doneTodos, $scope.propertyName, $scope.reverse);
    };

    $scope.sortNewBy = propertyName => {
      $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
          ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
      $scope.newTodos = orderBy($scope.newTodos, $scope.propertyName, $scope.reverse);
    };
  }
])

module.controller('AddTodoCtrl', ['$scope', '$http', '$location',
  ($scope, $http, $location) => {
    $scope.save = addTodo => {
      if (addTodo.$valid) {
        $http.post('/api/todos', {title: $scope.todo.title}).success(() => $location.path('/'));
      }
    };
  }
])

module.controller('EditTodoCtrl', ['$scope', '$http', '$location', '$routeParams',
  function($scope, $http, $location, $routeParams) {
    $http.get('/api/todos/' + $routeParams.id).success(data => $scope.todo = data)

    $scope.save = editTodo => {
      if (editTodo.$valid) {
        $http.put('/api/todos/' + $routeParams.id, $scope.todo).success(() => $location.url('/'));
      }
    };
  }
])

module.directive('minlength', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function checkLength(value) {
        value.length >= 10 ? mCtrl.$setValidity('min', true) : mCtrl.$setValidity('min', false);
        return value;
      }
      mCtrl.$parsers.push(checkLength);
    }
  };
});