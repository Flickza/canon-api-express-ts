import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();
const ROOT = process.env.DIRECTORY_ROOT;

export const createDir = (dir: string) => {
  if (!ROOT) return;
  const dirName = path.join(ROOT, dir);
  console.log(
    fs.existsSync(dirName)
      ? 'The directory already exists'
      : 'The Directory does not exist!',
  );

  if (!fs.existsSync(dirName))
    fs.mkdirSync(dirName, { recursive: true });
  console.log('Created Directory: ' + dirName);
};
