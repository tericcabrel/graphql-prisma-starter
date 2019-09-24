import { extractFragmentReplacements } from 'prisma-binding';
import { mergeResolvers } from 'merge-graphql-schemas';

import userResolver from './user';
import taskResolver from './task';

const schemaResolvers: any = [
  userResolver,
  taskResolver,
];

const resolvers: any = mergeResolvers(schemaResolvers);

const fragmentReplacements = extractFragmentReplacements(resolvers);

export {
  resolvers,
  fragmentReplacements,
};
