import fs from 'fs';

export const getIndex = (path: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) reject(err);
      if (files.length < 1) {
        resolve(0);
      } else {
        // get all files from dir
        const f = files;
        // find temp.jpg and remove
        const index_temp = f.indexOf('temp.jpg');
        // check if found and remove
        if (index_temp !== -1) {
          f.splice(index_temp, 1);
        }
        if (f.length > 0) {
          const lastFile = f[f.length - 1].split('_');
          const number = lastFile[lastFile.length - 1].split('.')[0];
          resolve(parseInt(number));
        } else {
          resolve(0);
        }
      }
    });
  });
};
