import {
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'EventInformationType',
  fields: {
    address: { type: GraphQLString },
    state: { type: GraphQLString },
    city: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
  },
  description: 'Information about the event',
});
