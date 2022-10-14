import express from 'express';
import { connection } from '../index';

const get_creators = (_req: express.Request, res: express.Response) => {
  console.log(_req.hostname)
  connection.query(
    'SELECT * FROM arkivskaper',
    (err, results, _fields) => {
      if (err) return res.status(400).send(err);
      console.log(results);
      return res.status(200).json(results);
    },
  );
};
const new_creators = (req: express.Request, res: express.Response) => {
  const creator_name = req.params.creator_name;
  connection.query(
    `INSERT INTO arkivskaper SET ?`,
    { navn: creator_name },
    (err, results, _fields) => {
      if (err) return res.status(400).send(err);
      console.log(results);
      return res.status(200).json(results);
    },
  );
};

export default { get_creators, new_creators };
