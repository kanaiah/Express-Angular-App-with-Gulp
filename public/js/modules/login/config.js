var login = angular.module('app.login', []);
login.config(['$stateProvider', '$locationProvider', 'States', '$urlRouterProvider',
    function($stateProvider, $locationProvider, States, $urlRouterProvider) {

        $stateProvider
            .state(States.LOGIN, {
                url: '/login',
                templateUrl: '/js/modules/login/views/index.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl'
            })
            .state(States.LOGOUT, {
                url: '/logout',
                controller: 'LogoutController',
                controllerAs: 'logoutCtrl'
            });
    }
]);
