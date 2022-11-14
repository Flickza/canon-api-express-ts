import express from 'express';
import { connection } from '../index';

const get_protocol = (req: express.Request, res: express.Response) => {
  const series_id = req.params.series_id;
  console.log(
    `SELECT * FROM arkivserie WHERE arkivskaper_id=${series_id}`,
  );
  connection.query(
    `SELECT * FROM protokoll WHERE series_id=${series_id}`,
    (err, results) => {
      if (err) return res.status(400).send(err);
      console.log(results);
      return res.status(200).json(results);
    },
  );
};
const new_protocol = (
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) => {
  const protocol = req.params.protocol.toUpperCase();
  const series_id = parseInt(req.params.series_id);
  connection.query(
    `SELECT path FROM arkivserie WHERE id=${series_id}`,
    (err, results, _fields) => {
      if (err) return res.status(400).send(err);
      const path = `${results[0].path}/${protocol}`;
      if (path) {
        connection.query(
          `INSERT INTO protokoll SET ?`,
          {
            navn: protocol,
            series_id: series_id,
            path: `${path}`,
          },
          (err, results, _fields) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json(results);
          },
        );
      }
      return;
    },
  );
};

export default { get_protocol, new_protocol };
