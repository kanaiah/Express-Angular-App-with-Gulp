common.constant("States", {
    ROOT: 'root',
    LOGIN: 'login',
    LOGOUT: 'logout',
    CLIENT: {
        ROOT: 'client',
        REMINDERS: {
            ROOT: 'client.reminders',
            LIST_VIEW: 'client.reminders.list_view'
        },
        NOTES: {
            ROOT: 'client.notes',
            LIST_VIEW: 'client.notes.list_view',
            GRID_VIEW: 'client.notes.grid_view',
            ADD: {
                ROOT: 'client.notes.add',
                STEP_1: 'client.notes.add.step_1'
            }
        }
    },
    ADMIN: {
        ROOT: 'admin'
    }
});
