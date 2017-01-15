add_devices.controller('Step1Controller', ['$scope', 'DeviceType',
    function ($scope, DeviceType) {
    	console.log("step 1 controller");
    	this.device_type = DeviceType;
		this.selected_device_type = "";

		this.selectDevice = function(device) {
		};

    }]);
