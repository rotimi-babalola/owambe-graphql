import {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

// barrel imports maybe?
import UserType from './types/user';
import EventType from './types/event';
import User from '../models/user.model';
import Event from '../models/event.model';
import AddUserMutation from './mutations/add-user';
import AddEventMutation from './mutations/add-event';
import AttendEventMutation from './mutations/attend-event';
import UpdateUserMutation from './mutations/update-user';
import DeleteUserMutation from './mutations/delete-user';
import UpdateEventMutation from './mutations/update-event';
import DeleteEventMutation from './mutations/delete-event';

/* eslint no-unused-expressions: 0 */

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root Query for GraphQL api',
  fields: {
    User: {
      type: new GraphQLList(UserType),
      description: 'User',
      args: {
        id: {
          name: 'userId',
          type: GraphQLString,
        },
      },
      resolve: (obj, { id }) => {
        const userData = new Promise((resolve, reject) => {
          if (id) {
            User.findById(id, (error, user) => {
              error ? reject(error) : resolve([user]);
            });
          } else {
            User.find({}, (error, users) => {
              error ? reject(error) : resolve(users);
            });
          }
        });
        return userData;
      },
    },
    Event: {
      type: new GraphQLList(EventType),
      description: 'Event',
      args: {
        id: {
          name: 'eventId',
          type: GraphQLString,
        },
      },
      resolve: (obj, { id }) => {
        const eventData = new Promise((resolve, reject) => {
          if (id) {
            Event.findById(id, (error, event) => {
              error ? reject(error) : resolve([event]);
            });
          } else {
            Event.find({}, (error, events) => {
              error ? reject(error) : resolve(events);
            });
          }
        });
        return eventData;
      },
    },
  },
});

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    AddUser: AddUserMutation,
    AddEvent: AddEventMutation,
    AttendEvent: AttendEventMutation,
    UpdateEvent: UpdateEventMutation,
    UpdateUser: UpdateUserMutation,
    DeleteUser: DeleteUserMutation,
    DeleteEvent: DeleteEventMutation,
  }),
});

const owambeSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

export default owambeSchema;
