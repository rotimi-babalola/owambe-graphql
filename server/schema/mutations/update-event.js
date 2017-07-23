import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';

/* eslint max-len: 0*/

import GraphQLDate from 'graphql-date';

import EventType from '../types/event';
import Event from '../../models/event.model';
import EventInformationInputType from '../types/event-information-input';

const UpdateEventType = new GraphQLInputObjectType({
  name: 'UpdateEvent',
  fields: {
    eventName: { type: GraphQLString },
    eventDate: { type: GraphQLDate },
    eventInformation: { type: EventInformationInputType },
    eventUrl: { type: GraphQLString },
    eventOwner: { type: GraphQLString },
    isPrivate: { type: GraphQLBoolean },
  },
});

export default {
  type: EventType,
  args: {
    eventId: { type: new GraphQLNonNull(GraphQLString) },
    fieldsToUpdate: { type: new GraphQLNonNull(UpdateEventType) },
  },
  resolve(obj, { eventId, fieldsToUpdate }) {
    return new Promise((resolve, reject) => {
      if (fieldsToUpdate.eventInformation) {
        Event.findById(eventId, (error, updatedEvent) => {
          const updatedFields = fieldsToUpdate.eventInformation;
          updatedEvent.eventInformation.address = updatedFields.address || updatedEvent.eventInformation.address;
          updatedEvent.eventInformation.state = updatedFields.state || updatedEvent.eventInformation.state;
          updatedEvent.eventInformation.city = updatedFields.city || updatedEvent.eventInformation.city;
          updatedEvent.eventInformation.imageUrl = updatedFields.imageUrl || updatedEvent.eventInformation.imageUrl;

          updatedEvent.eventName = fieldsToUpdate.eventName || updatedEvent.eventName;
          updatedEvent.eventDate = fieldsToUpdate.eventDate || updatedEvent.eventDate;
          updatedEvent.eventUrl = fieldsToUpdate.eventUrl || updatedEvent.eventUrl;
          updatedEvent.eventOwner = fieldsToUpdate.eventOwner || updatedEvent.eventOwner;
          updatedEvent.isPrivate = fieldsToUpdate.isPrivate || updatedEvent.isPrivate;

          // save
          updatedEvent.save((error, updated) => {
            if (error) reject(error);
            else resolve(updated);
          });
        });
      } else {
        Event.findByIdAndUpdate(eventId, fieldsToUpdate, { new: true }, (error, updatedEvent) => {
          if (error) reject(error);
          else resolve(updatedEvent);
        });
      }
    });
  },
};
