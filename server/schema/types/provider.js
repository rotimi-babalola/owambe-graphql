import {
  GraphQLEnumType,
} from 'graphql';

export default new GraphQLEnumType({
  name: 'ProviderType',
  values: {
    TWITTER: { value: 'twitter' },
    FACEBOOK: { value: 'facebook' },
    GOOGLE: { value: 'google' },
    LOCAL: { value: 'local' },
  },
});
