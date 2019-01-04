import { Promise } from 'meteor/promise';

export const callWithPromise = (method) => {
  return new Promise((resolve, reject) => {
    Meteor.call(method, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
} 