import bcrypt from 'bcryptjs';
import * as fs from 'fs';
import * as path from 'path';
import { importSchema } from 'graphql-import';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

import { Timestamp } from '../types/common';

export const hashPassword = async (password: string): Promise<string> => {
  if (password.length < 8) {
    throw new Error('Password must be 8 characters or longer.');
  }

  return await bcrypt.hash(password, 10);
};

export const timestamp = (): Timestamp => {
  const date = new Date();
  return {
    created_at: date,
    updated_at: date,
  };
};

export const removeDir = (path: string): void => {
  const files = fs.readdirSync(path, { encoding: 'utf-8' });

  for (const file of files) {
    const filePath: string = `${path}/${file}`;
    if (fs.statSync(filePath).isDirectory()) {
      removeDir(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  }

  fs.rmdirSync(path);
};

export const combineSchema = (dirPath: string) => {
  const tmpFolder = `${dirPath}temp`;
  if (fs.existsSync(tmpFolder)) {
    removeDir(tmpFolder);
  }
  fs.mkdirSync(tmpFolder);

  const excludedFiles = ['index.ts', 'prisma.graphql', 'joined.graphql'];
  const files = fs.readdirSync(dirPath, { encoding: 'utf-8' });
  for (const file of files) {
    if (!fs.statSync(`${dirPath}${file}`).isDirectory() && excludedFiles.indexOf(file) < 0) {
      // console.log(`${dirPath}${file}`);
      const str = importSchema(`${dirPath}/${file}`);
      fs.writeFileSync(`${tmpFolder}/${file}`, str, { encoding: 'utf8' });
    }
  }

  // Load the files in temp folder with graphql-merge-schemas
  const typesArray = fileLoader(path.join(tmpFolder), { recursive: false });
  const typeDefs = mergeTypes(typesArray, { });

  removeDir(tmpFolder);

  return typeDefs;
};
