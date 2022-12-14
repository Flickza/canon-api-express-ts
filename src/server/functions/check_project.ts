import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

export const projectExists = (creator: string, project: string) => {
  const path = process.env.CREATOR_PATH + creator + '/' + project;
  return fs.existsSync(path);
};
