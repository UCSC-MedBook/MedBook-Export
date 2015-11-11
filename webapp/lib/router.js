Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // the appNotFound template is used for unknown routes and missing lists
  // notFoundTemplate: 'pageNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'spinner',
});

Router.map(function() {
  this.route('download', {
    path: '/Download/',
    // subscriptions: function () {
    //   return Meteor.subscribe("listSubmissions");
    // },
  });
});
