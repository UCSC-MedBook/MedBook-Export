Template.exportNew.helpers({
  collaborations: function () {
    return Meteor.user().profile.collaborations;
  },
});

Template.exportNew.events({
  "click #export-copy-number": function (event, instance) {
    var collaborations = [instance.find("#collaboration-select").value];
    Meteor.call("exportNewFile", collaborations);
  },
});

// Template.listExportedFiles

Template.listExportedFiles.onCreated(function () {
  var instance = Template.instance();
  instance.subscribe("exportedFiles");
});

Template.listExportedFiles.helpers({
  exportedFiles: function () {
    return ExportedFiles.find({}, {sort: {date_created: -1}});
  },
});

// Template.showExportedFile

Template.showExportedFile.onCreated(function () {
  var instance = Template.instance();
  instance.subscribe("blob", this.blob_id);
});

Template.showExportedFile.helpers({
  listGroupClass: function () {
    switch (this.status) {
      case "running": return "list-group-item-info";
      case "done":    return "list-group-item-success";
      case "error":   return "list-group-item-danger";
    }
  },
  getBlobUrl: function () {
    if (this.status === "done" && this.blob_id) {
      var blob = Blobs.findOne(this.blob_id);
      if (blob && blob.hasStored('blobs')) {
        return blob.url();
      }
    }
  },
});

Template.showExportedFile.events({
  'click .delete-file': function (event, instance) {
    Meteor.call('removeExportedFile', this._id);
  }
});
