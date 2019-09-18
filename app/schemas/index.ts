import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import * as fs from 'fs';

// Set recursive to true to load files in nested folders
const typesArray = fileLoader(path.join(__dirname, './'), { recursive: false });

// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
const typeDefs = mergeTypes(typesArray, { all: true });

// Uncomment to create a file which contains all merged file
fs.writeFileSync('joined.graphql', typeDefs);

export default typeDefs;
