import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import GraphQLDate from 'graphql-date';
import UserType from './user';
import User from '../../models/user.model';
import EventInformationType from './event-information';

export default new GraphQLObjectType({
  name: 'EventType',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'ID of event',
    },
    eventName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Name of event',
    },
    eventDate: {
      type: new GraphQLNonNull(GraphQLDate),
      description: 'Date of the event',
    },
    eventInformation: {
      type: EventInformationType,
      resolve: obj => obj.eventInformation,
    },
    eventUrl: {
      type: GraphQLString,
      description: 'Url of the event',
    },
    isOnline: {
      type: GraphQLBoolean,
      description: 'Boolean indicating whether the event is online or not',
    },
    attendees: {
      type: new GraphQLList(UserType),
      description: 'Array of user\'s attending the event',
      resolve(obj) {
        return new Promise((resolve, reject) => {
          User.find({
            _id: {
              $in: obj.attendees,
            },
          }, (error, foundUsers) => {
            if (error) reject(error);
            else resolve(foundUsers);
          });
        });
      },
    },
    eventOwner: {
      type: UserType,
      description: 'Owner of the event',
      resolve(obj) {
        return new Promise((resolve, reject) => {
          User.findById(obj.eventOwner, (error, foundUser) => {
            if (error) reject(error);
            else resolve(foundUser);
          });
        });
      },
    },
    isPrivate: {
      type: GraphQLBoolean,
      description: 'Boolean indicating whether the event is private or not',
    },
    createdAt: {
      type: GraphQLDate,
      description: 'Date event was created in the database',
    },
    updatedAt: {
      type: GraphQLDate,
      description: 'Date event was last updated',
    },
  }),
});
