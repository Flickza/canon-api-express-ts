import { connection } from '../index';

const getArkivseriePath = async (id: string) => {
  console.log(id);
  return new Promise((resolve, reject) => {
    if (!id) reject(new Error('No table provided'));
    connection.query(
      `SELECT * FROM arkivserie WHERE id=${id}`,
      (err, results, _fields) => {
        if (err) reject(err);
        console.log(results[0].path);
        if (results[0].path) resolve(results[0].path);
      },
    );
  });
};

export default { getArkivseriePath };
