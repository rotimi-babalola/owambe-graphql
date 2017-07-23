import {
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import UserType from '../types/user';
import User from '../../models/user.model';
import ProviderType from '../types/provider';

const UpdateUserType = new GraphQLInputObjectType({
  name: 'UpdateUser',
  fields: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    provider: { type: ProviderType },
    isAdmin: { type: GraphQLBoolean },
  },
});

export default {
  type: UserType,
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    fieldsToUpdate: { type: new GraphQLNonNull(UpdateUserType) },
  },
  resolve(obj, { userId, fieldsToUpdate }) {
    return new Promise((resolve, reject) => {
      User.findByIdAndUpdate(userId, fieldsToUpdate, { new: true }, (error, updatedUser) => {
        if (error) reject(error);
        else resolve(updatedUser);
      });
    });
  },
};
