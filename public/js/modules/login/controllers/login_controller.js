login.controller('LoginController', ['$scope', '$state', 'States', '$log', '$mdToast', 'UserDetailsService',
    function($scope, $state, States, $log, $mdToast, UserDetailsService) {
        var self = this;
        self.username = "";
        self.password = "";

        this.onClick = function() {
            if (self.username === "admin@test.com" && self.password === "mypassword") {
                var details = {};
                details.name = "Admin";
                details.id = 1;
                UserDetailsService.setUserDetails(details);
                $state.go(States.ROOT);
            } else {
                var toast = $mdToast.simple()
                    .textContent('Incorrect Username or Password')
                    .position('top right')
                    .hideDelay(2000);
                $mdToast.show(toast);
            }
        };
    }
]);
