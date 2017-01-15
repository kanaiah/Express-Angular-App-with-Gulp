angular.module('app.client.notes').service('NotesService', [function() {
    var notes = [];

    this.getNotes = function() {
        for (var i = 0; i < 23; i++) {
            var note = {};
            note.title = "Title " + i;
            note.note = "Note " + i;
            var d = new Date();
            note.time = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            console.log(note.time);
            note.status = "ACTIVE";
            notes.push(note);
        }
        return notes;
    }
    

    this.addNotes = function(note) {
        notes.push(note);
    }
}]);
