Meteor.publish("exportedFiles", function () {
  return ExportedFiles.find({
    user_id: this.userId,
  });
});

Meteor.publish("blob", function (blob_id) {
  var blob = Blobs.findOne(blob_id);

  if (blob && blob.metadata && this.userId === blob.metadata.user_id) {
    return Blobs.find(blob_id);
  }
  this.ready();
});
