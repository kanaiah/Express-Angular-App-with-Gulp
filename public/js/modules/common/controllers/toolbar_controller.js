common.controller('ToolbarController', ['$rootScope', '$scope', '$state', 'States',
    function ($rootScope, $scope, $state, States) {
    	console.log("header controller");
    	var self = this;
		self.hideAccountPopOver = true;

		self.init = function() {
			self.changeIconsOnStateChange();
		};

		self.changeIconsOnStateChange = function() {
			console.log($state.current.name);
			var state = $state.current.name;
			if (state === States.LOGIN) {
				self.hideAccountPopOver = true;
			} else {
				self.hideAccountPopOver = false;
			}
		};

		$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
			self.changeIconsOnStateChange();
		});

		self.init();
    }]);
