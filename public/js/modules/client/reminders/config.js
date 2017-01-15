var reminders = angular.module('app.client.reminders', ['app.common']);

reminders.config(['$stateProvider', '$locationProvider', 'States', '$urlRouterProvider',
    function ($stateProvider, $locationProvider, States, $urlRouterProvider) {

        $urlRouterProvider.when("/cli/reminders", "/cli/reminders/list");
        $urlRouterProvider.when("/cli/reminders/", "/cli/reminders/list");

        $stateProvider
            .state(States.CLIENT.REMINDERS.ROOT, {
                url: '/reminders',
                templateUrl: '/js/modules/client/reminders/views/index.html'
            })
            .state(States.CLIENT.REMINDERS.LIST_VIEW, {
                url: '/list',
                templateUrl: '/js/modules/client/reminders/views/list_view.html',
                controller: 'RemindersListViewController',
                controllerAs: 'rlvc'
            });
    }]);
