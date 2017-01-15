var add_devices = angular.module('app.client.devices.add_device', ['app.common']);

add_devices.config(['$stateProvider', '$locationProvider', 'States', '$urlRouterProvider',
    function($stateProvider, $locationProvider, States, $urlRouterProvider) {
        $urlRouterProvider.when("/cli/devices/add", "/cli/devices/add/step-1");

        $stateProvider
            .state(States.CLIENT.DEVICES.ADD.ROOT, {
                url: '/add',
                templateUrl: '/js/modules/client/devices/add/views/index.html'
            })
            .state(States.CLIENT.DEVICES.ADD.STEP_1, {
                url: '/step-1',
                templateUrl: '/js/modules/client/devices/add/views/step_1.html',
                controller: 'Step1Controller',
                controllerAs: 'step1Ctrl'
            })
            .state(States.CLIENT.DEVICES.ADD.STEP_2, {
                url: '/step-2',
                templateUrl: '/js/modules/client/devices/add/views/step_2.html'
            })
            .state(States.CLIENT.DEVICES.ADD.STEP_3, {
                url: '/step-3',
                templateUrl: '/js/modules/client/devices/add/views/step_3.html'
            });
    }
]);
