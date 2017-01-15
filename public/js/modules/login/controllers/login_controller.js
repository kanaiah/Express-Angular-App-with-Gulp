login.controller('LoginController', ['$scope', '$state', 'States',
    function($scope, $state, States) {

        this.onClick = function() {
            var data = {
                "user": {
                    "id": "586651f6d318a60008db1d45",
                    "email": "support",
                    "firstName": "Super",
                    "lastName": "Admin",
                    "role": "ADMIN",
                    "scopeId": "586651f6d318a60008db1d43",
                    "owner": true,
                    "status": "ACTIVE"
                },
                "permissions": ["IOT_DEVICE_READ", "IOT_DEVICE_WRITE", "IOT_DEVICE_BULK_WRITE", "IOT_USER_READ", "IOT_USER_WRITE", "GATEWAY_READ", "GATEWAY_WRITE", "GATEWAY_INSTRUCTIONS_READ", "GATEWAY_INSTRUCTIONS_WRITE", "GATEWAY_DATABASE_RESET", "IOT_SERVICE_DATABASE_RESET", "GATEWAY_SERVICE_DATABASE_RESET", "APP_DETAILS", "ALERTS_READ", "ALERTS_WRITE"],
                "isRootUser": true
            };
            // UserDetailsService.setUserDetails(data);
            $state.go(States.ROOT);
        };
        //app.value('UserDetails', data);
        //console.log(UserDetails);

    }
]);
