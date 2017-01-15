reminders.controller('RemindersListViewController', ['$scope', 'RemindersService',
    function($scope, RemindersService) {
        var self = this;
        self.reminders = [];

        this.selected = [];
        this.limitOptions = [5, 10, 15];

        // for query in devices table
        this.query = {
            order: 'name',
            limit: 10,
            page: 1
        };

        this.onDoneClick = function(reminder) {
            reminder.status = "DELETED";
        };

        this.init = function() {
            self.reminders = RemindersService.getReminders();
        }

        this.init();
    }
]);
