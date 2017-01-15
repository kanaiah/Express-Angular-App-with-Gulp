client.controller('ClientController', ['$scope', '$state', 'States',
    function($scope, $state, States) {
        console.log("client controller");
        this.isOpen = false;
        //if (!UserDetailsService.isUserLoggedIn()) {
            // $state.go(States.LOGIN);
        //}
        this.selectedMode = 'md-fling';
    }
]);
