import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import Event from '../../models/event.model';
import EventType from '../types/event';

export default {
  type: EventType,
  args: {
    eventId: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(obj, { eventId, userId }) {
    return new Promise((resolve, reject) => {
      Event.findById(eventId, (error, event) => {
        if (error) {
          reject(error);
        } else if (event.attendees.indexOf(userId) >= 0) {
          reject('User is alreay an attendee');
        } else {
          event.attendees.push(userId);
          event.save((err, attendedEvent) => {
            if (error) reject(error);
            else resolve(attendedEvent);
          });
        }
      });
    });
  },
};
