import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

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
    }
  }
});
