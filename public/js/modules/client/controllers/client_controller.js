client.controller('ClientController', ['$scope', '$state', 'States', '$log', 'UserDetailsService',
    function($scope, $state, States, $log, UserDetailsService) {
        $log.info(UserDetailsService.isUserLoggedIn());
        if (!UserDetailsService.isUserLoggedIn()) {
            $state.go(States.LOGIN);
        }
    }
]);
