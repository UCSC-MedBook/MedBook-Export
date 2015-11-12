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
  var instance = this;
  // instance.autorun(function () {
  //   // console.log("instance.data.status:", instance.data.status);
  //   // console.log("rerunning autorun");
  //   // console.log("instance.data.blob_id:", instance.data.blob_id);
  //   console.log("rerunning");
  //   instance.subscribe("blob", instance.data.status);
  // });

  // TODO: I tried using instance.data, but apparently it's not reactive?
  var _id = instance.data._id;
  instance.autorun(function () {
    var exportedFile = ExportedFiles.findOne(_id);
    instance.subscribe("blob", exportedFile.blob_id);
  });
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
