import {
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

import User from '../../models/user.model';

export default {
  type: GraphQLString,
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(obj, { userId }) {
    return new Promise((resolve, reject) => {
      User.findByIdAndRemove(userId, (error) => {
        if (error) reject(error);
        else resolve('User successfully deleted');
      });
    });
  },
};
