import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';

import ProviderType from '../types/provider';
import UserType from '../types/user';
import User from '../../models/user.model';

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    provider: { type: ProviderType },
    isAdmin: { type: GraphQLBoolean },
  },
});

export default {
  type: UserType,
  args: {
    input: { type: new GraphQLNonNull(UserInputType) },
  },
  resolve(obj, { input }) {
    const newUser = new User(input);
    newUser.provider = 'local';
    return new Promise((resolve, reject) => {
      newUser.save((error) => {
        if (error) reject(error);
        else resolve(newUser);
      });
    });
  },
};
