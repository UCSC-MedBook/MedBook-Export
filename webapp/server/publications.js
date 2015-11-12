Meteor.publish("exportedFiles", function () {
  return ExportedFiles.find({
    user_id: this.userId,
  });
});

Meteor.publish("blob", function (blob_id) {
  var blob = Blobs.findOne(blob_id);

  console.log("blob_id:", blob_id);
  if (blob && this.userId === blob.user_id) {
    return Blobs.findOne(blob_id);
  }
  this.ready();
});
