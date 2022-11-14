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
          const highestIndex = f
            .map((x) => {
              const jpgnumber: Array<string> = x.match(/(_\d+.jpg)/g)!;
              if (jpgnumber.length > 0) {
                return jpgnumber[0]
                  .replace(/_/g, '')
                  .replace(/.jpg/g, '');
              } else {
                return undefined;
              }
            })
            .filter((x) => x !== undefined)
            .reduce((a, b) =>
              Math.max(Number(a), Number(b)).toString(),
            );
          resolve(Number(highestIndex) + 1);
        } else {
          resolve(0);
        }
      }
    });
  });
};
