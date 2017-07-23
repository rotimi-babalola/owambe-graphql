import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';

import GrapQLDate from 'graphql-date';
import ProviderType from '../types/provider';
import EventType from '../types/event';
import Event from '../../models/event.model';

export default new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: {
      type: GraphQLID,
      description: 'ID of user',
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User name',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User\'s email address',
    },
    provider: {
      type: ProviderType,
      description: 'User\'s authentication provider',
    },
    isAdmin: {
      type: GraphQLBoolean,
      description: 'Boolean indicating whether the user is an admin or not',
    },
    createdAt: {
      type: GrapQLDate,
      description: 'Date event was created',
    },
    updatedAt: {
      type: GrapQLDate,
      description: 'Date event was last updated',
    },
    eventsAttended: {
      type: new GraphQLList(EventType),
      description: 'Events user has attended',
      resolve(obj) {
        return new Promise((resolve, reject) => {
          Event.find({ attendees: obj.id }, (error, foundEvents) => {
            if (error) reject(error);
            else resolve(foundEvents);
          });
        });
      },
    },
  },
});
