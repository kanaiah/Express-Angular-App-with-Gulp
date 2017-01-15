login.controller('LogoutController', ['$scope', '$state', 'States',
    function ($scope, $state, States) {
    	console.log("logout controller");

    	$state.go(States.LOGIN);

    }]);
