col = new Mongo.Collection('col');

if (Meteor.isServer) {
  console.log('load');
  Meteor.startup(function() {
    console.log('startup');
    col.remove({});

    col.insert({ _id: 'insert1' });
    col.insert({ _id: 'insert2' });

    col.upsert('upsert1', {});
    col.upsert('upsert2', {});

    col.upsert('upsert2', { wasUpdated: 1 });
    col.upsert('insert2', { wasUpdated: 1 });
  });
}

if (Meteor.isClient) {
  Template.body.helpers({
    results: function() {
      return _.map(col.find().fetch(), function(doc) {
        return JSON.stringify(doc);
      }).join('\n');
    }
  });
}
