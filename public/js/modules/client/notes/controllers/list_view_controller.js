notes.controller('NotesListViewController', ['$scope', '$timeout', 'NotesService',
    function($scope, $timeout, NotesService) {
        var self = this;
        self.notes = [];

        this.selected = [];
        this.limitOptions = [5, 10, 15];

        // for query in devices table
        this.query = {
            order: 'name',
            limit: 10,
            page: 1
        };

        this.onDoneClick = function(note) {
            note.status = "DELETED";
        };

        this.init = function() {
            self.notes = NotesService.getNotes();
        }

        this.init();
    }
]);
