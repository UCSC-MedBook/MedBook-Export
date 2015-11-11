Template.exportNew.helpers({
  collaborations: function () {
    return Meteor.user().profile.collaborations;
  },
});

Template.exportNew.events({
  "click #export-copy-number": function (event, instance) {
    var exported_file_id = ExportedFiles.insert({
      user_id: Meteor.userId(),
      date_created: new Date(),
    });

    Jobs.insert({
      "name": "ExportFile",
      "user_id": Meteor.userId(),
      "date_created": new Date(),
      "args": {
        "exported_file_id": exported_file_id,
      },
    });
  },
});
