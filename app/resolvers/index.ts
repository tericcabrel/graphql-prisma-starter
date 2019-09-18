/* import { extractFragmentReplacements } from 'prisma-binding';
import { combineResolvers } from 'apollo-resolvers';

import UserResolver from './user';

const resolvers: any = () => combineResolvers([
  UserResolver(),
]);

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };*/

import { extractFragmentReplacements } from 'prisma-binding';
import { combineResolvers } from 'apollo-resolvers';

// import path from 'path';
// import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';
// const resolversArray = fileLoader(path.join(__dirname, './**/index.*'), { extensions: ['.ts'] });
// const resolvers = mergeResolvers(resolversArray);*/

import { mergeResolvers } from 'merge-graphql-schemas';
import userResolver from './user';

const schemaResolvers: any = [
  userResolver,
];

const resolvers: any = mergeResolvers(schemaResolvers);

const fragmentReplacements = extractFragmentReplacements(resolvers);

export {
  resolvers,
  fragmentReplacements,
};
