import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} from 'graphql';

import GraphQLDate from 'graphql-date';
import Event from '../../models/event.model';
import EventType from '../types/event';
import EventInformationInputType from '../types/event-information-input';

const EventInputType = new GraphQLInputObjectType({
  name: 'EventInput',
  fields: {
    eventName: { type: new GraphQLNonNull(GraphQLString) },
    eventDate: { type: new GraphQLNonNull(GraphQLDate) },
    eventInformation: { type: EventInformationInputType },
    eventUrl: { type: GraphQLString },
    isOnline: { type: GraphQLBoolean },
    eventOwner: { type: new GraphQLNonNull(GraphQLID) },
    isPrivate: { type: GraphQLBoolean },
  },
});

export default {
  type: EventType,
  args: {
    input: { type: new GraphQLNonNull(EventInputType) },
  },
  resolve(obj, { input }) {
    const newEvent = new Event(input);
    return new Promise((resolve, reject) => {
      newEvent.save((error) => {
        if (error) reject(error);
        else resolve(newEvent);
      });
    });
  },
};
