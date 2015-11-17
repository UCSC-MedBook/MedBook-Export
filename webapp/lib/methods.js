function makeSureLoggedIn () {
  var user_id = Meteor.user() && Meteor.user()._id;
  if (!user_id) {
    throw new Meteor.Error(403, "not-logged-in", "Log in to proceed");
  }
  return user_id;
}

function ensureAvailable(userId, exportedFileId) {
  var exportedFile = ExportedFiles.findOne(exportedFileId);
  if (userId !== exportedFile.user_id) {
    throw new Meteor.Error(403, "exported-file-not-available");
  }
  return exportedFile;
}

Meteor.methods({
  exportNewFile: function (collaborations) {
    check(collaborations, [String]);
    var user_id = makeSureLoggedIn();

    var validCollaborations = Meteor.user().profile.collaborations;
    _.map(collaborations, function (value) {
      if (validCollaborations.indexOf(value) === -1) {
        throw "invalid collaboration: " + value;
      }
    });

    var exported_file_id = ExportedFiles.insert({
      user_id: user_id,
      date_created: new Date(),
      collaborations: collaborations,
    });

    Jobs.insert({
      "name": "ExportFile",
      "user_id": user_id,
      "date_created": new Date(),
      "args": {
        "exported_file_id": exported_file_id,
      },
    });
  },
  removeExportedFile: function (exportedFileId) {
    check(exportedFileId, String);

    var user_id = makeSureLoggedIn();
    var exportedFile = ensureAvailable(user_id, exportedFileId);

    if (exportedFile.blob_id) {
      Blobs.remove(exportedFile.blob_id);
    }

    Jobs.remove({
      name: 'ExportFile',
      status: 'waiting',
      user_id: user_id,
      'args.exported_file_id': exportedFile._id,
    });

    ExportedFiles.remove(exportedFile._id);
  },
});
