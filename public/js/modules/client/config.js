var client = angular.module('app.client', ['app.common', 'app.client.notes', 'app.client.reminders']);
client.config(['$stateProvider', '$locationProvider', 'States', '$urlRouterProvider',
    function($stateProvider, $locationProvider, States, $urlRouterProvider) {
        $urlRouterProvider.when("/cli", "/cli/notes");
        $urlRouterProvider.when("/cli/", "/cli/notes");

        $stateProvider.state(States.CLIENT.ROOT, {
            url: '/cli',
            templateUrl: '/js/modules/client/views/client.html',
            controller: 'ClientController',
            controllerAs: 'clientCtrl'
        });
    }
]);
