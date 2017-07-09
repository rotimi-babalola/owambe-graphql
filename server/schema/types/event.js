import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} from 'graphql';

import GraphQLDate from 'graphql-date';
import UserType from './user';
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
      description: 'Name of event'
    },
    eventDate: {
      type: new GraphQLNonNull(GraphQLDate),
      description: 'Date of the event'
    },
    eventInformation: {
      type: EventInformationType,
      resolve: obj => obj.eventInformation
    },
    eventUrl: {
      type: GraphQLString,
      description: 'Url of the event'
    },
    isOnline: {
      type: GraphQLBoolean,
      description: 'Boolean indicating whether the event is online or not'
    },
    // attendees: {
    //   type: GraphQLList(UserType),
    //   description: 'Array of user\'s attending the event',
    // }, // this should have it's own resolve function
    // eventOwner: {
    //   type: UserType,
    //   description: 'Owner of the event'
    // }, // this should have it's own resolve function
    isPrivate: {
      type: GraphQLBoolean,
      description: 'Boolean indicating whether the event is private or not'
    },
    createdAt: {
      type: GraphQLDate,
      description: 'Date event was created in the database'
    },
    updatedAt: {
      type: GraphQLDate,
      description: 'Date event was last updated'
    }
  })
});
