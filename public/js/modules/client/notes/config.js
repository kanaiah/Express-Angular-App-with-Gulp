var notes = angular.module('app.client.notes', ['app.common']);

notes.config(['$stateProvider', '$locationProvider', 'States', '$urlRouterProvider',
    function($stateProvider, $locationProvider, States, $urlRouterProvider) {

        $urlRouterProvider.when("/cli/notes", "/cli/notes/list");
        $urlRouterProvider.when("/cli/notes/", "/cli/notes/list");

        $stateProvider
            .state(States.CLIENT.NOTES.ROOT, {
                url: '/notes',
                templateUrl: '/js/modules/client/notes/views/index.html'
            })
            .state(States.CLIENT.NOTES.LIST_VIEW, {
                url: '/list',
                templateUrl: '/js/modules/client/notes/views/list_view.html',
                controller: 'NotesListViewController',
                controllerAs:'nlvc'
            });
    }]);
