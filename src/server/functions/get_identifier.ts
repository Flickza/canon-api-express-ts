import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export const get_identifier = (creator: string, project: string) => {
  return new Promise((resolve, reject) => {
    fs.readdir(
      process.env.CREATOR_PATH + creator + '/' + project,
      (err, result) => {
        if (err) reject(err);
        if (result.length > 0) {
          let numbers: any = result.map(
            (item) => item.split('_')[1].split('.')[0],
          );
          let highest_ID = Math.max(...numbers);
          return resolve(highest_ID + 1);
        } else {
          return resolve(1);
        }
      },
    );
  });
};
