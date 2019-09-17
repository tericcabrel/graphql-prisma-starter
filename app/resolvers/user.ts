import { GraphContext } from '../types/common';

const user = {
  email: {
    fragment: 'fragment userId on User { id }',
    resolve(parent: any, args: any, { request, userId }: GraphContext, info: any) {
      if (userId && userId === parent.id) {
        return parent.email;
      }
      return null;
    },
  },
  password: {
    resolve(parent: any, args: any, context: GraphContext, info: any) {
      return null;
    },
  },
};

export { user as default };
