import {
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

import Event from '../../models/event.model';

export default {
  type: GraphQLString,
  args: {
    eventId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(obj, { eventId }) {
    return new Promise((resolve, reject) => {
      Event.findByIdAndRemove(eventId, (error) => {
        if (error) reject(error);
        else resolve('Event successfully deleted');
      });
    });
  },
};
