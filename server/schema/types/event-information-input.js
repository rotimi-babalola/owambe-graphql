import {
  GraphQLString,
  GraphQLInputObjectType,
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'EventInformationInputType',
  fields: {
    address: { type: GraphQLString },
    state: { type: GraphQLString },
    city: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
  },
  description: 'Information about the event',
});
