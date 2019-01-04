// Import modules used by both client and server through a single index entry point
// e.g. useraccounts configuration file.
import SimpleSchema from 'simpl-schema';

Counter = new Mongo.Collection('counter');

const schema = new SimpleSchema({
    views: Number
  });

Counter.attachSchema(schema);