import * as path from 'path';

import { combineSchema } from '../utils/helpers';

const dirSchemas: string = path.join(__dirname, './');

const typeDefs = combineSchema(dirSchemas);

/* Write the merged schema in a file. Note avoid using nodemon to start the application
   It sill continuously restart because of the change on joined.graphql */
// fs.writeFileSync(`${dirSchemas}/joined.graphql`, typeDefs);

export { typeDefs as default };
