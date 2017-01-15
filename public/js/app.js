var app = angular.module('appModule', ['ngMaterial', 'ngCookies', 'ui.router',
    'app.common', 'app.client', 'app.login', 'md.data.table', 'nsPopover'
]);

app.config(['$stateProvider', '$locationProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider', 'States',
    function($stateProvider, $locationProvider, $urlMatcherFactoryProvider, $urlRouterProvider, States) {
				// Ignores trialing slashes, for example treats both /cli and /cli/ as same
        $urlMatcherFactoryProvider.strictMode(false);

        $stateProvider.state(States.ROOT, {
            url: '/',
            controller: 'AppController'
        });

        $locationProvider.html5Mode(true);
    }
]);

//Google chart settings
app.value('googleChartApiConfig', {
    version: '1.1',
});

app.constant('_',
    window._
);

//angular.module('myApp', ['ngMaterial'])
app.config(['$mdThemingProvider', function($mdThemingProvider) {
    $mdThemingProvider.theme('appDark')
        .primaryPalette('blue', {
            'default': '500',
            'hue-1': '300',
            'hue-2': '700',
            'hue-3': 'A100'
        }).accentPalette('deep-orange', {
            'default': '500',
            'hue-1': '300',
            'hue-2': '700',
            'hue-3': 'A100'
        }).warnPalette('red', {
            'default': '500',
            'hue-1': '300',
            'hue-2': '700',
            'hue-3': 'A100'
        });

    $mdThemingProvider.theme('appLight')
        .primaryPalette('green', {
            'default': '600',
            'hue-1': '300',
            'hue-2': '700',
            'hue-3': 'A100'
        }).accentPalette('light-blue', {
            'default': '600',
            'hue-1': '300',
            'hue-2': '700',
            'hue-3': 'A100'
        }).warnPalette('red', {
            'default': '500',
            'hue-1': '300',
            'hue-2': '700',
            'hue-3': 'A100'
        });

    $mdThemingProvider.setDefaultTheme('appDark');
}]);

//app.config(['$httpProvider', function ($httpProvider) {
//    $httpProvider.interceptors.push('errorInterceptorService');
//}]);
