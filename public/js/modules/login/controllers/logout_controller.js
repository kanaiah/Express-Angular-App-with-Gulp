login.controller('LogoutController', ['$scope', '$state', 'States', 'UserDetailsService',
    function($scope, $state, States, UserDetailsService) {
        console.log("logout controller");
        UserDetailsService.removeUser();
        $state.go(States.LOGIN);

    }
]);
