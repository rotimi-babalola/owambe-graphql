import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import GrapQLDate from 'graphql-date';

/* eslint global-require:0 */

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
      type: GraphQLString,
      description: 'User\'s authentication provider'
    },
    isAdmin: {
      type: GraphQLBoolean,
      description: 'Boolean indicating whether the user is an admin or not'
    },
    createdAt: {
      type: GrapQLDate,
      description: 'Date event was created'
    },
    updatedAt: {
      type: GrapQLDate,
      description: 'Date event was last updated'
    }
    // we can add an events field of type events that will be list containing the events
    // attended by a user. This field will have its own resolve function
  }
});
