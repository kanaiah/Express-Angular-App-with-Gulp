angular.module('app.client.reminders').service('RemindersService', [function() {
    var reminders = [];

    this.getReminders = function() {
        for (var i = 0; i < 23; i++) {
            var reminder = {};
            reminder.title = "Title " + i;
            reminder.reminder = "Reminder " + i;
            var d = new Date();
            reminder.time = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            reminder.status = "ACTIVE";
            reminders.push(reminder);
        }
        return reminders;
    }


    this.addReminder = function(reminder) {
        reminders.push(reminder);
    }
}]);
