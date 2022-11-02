import express from 'express';
import { connection } from '../index';
import { createDir } from '../utils/createDir';

const get_series = (_req: express.Request, res: express.Response) => {
  const creator_id = _req.params.creator_id;
  const project_id = _req.params.project_id;
  console.log(
    `SELECT * FROM arkivserie WHERE arkivskaper_id=${creator_id} AND prosjekt_id=${project_id}`,
  );
  connection.query(
    `SELECT * FROM arkivserie WHERE arkivskaper_id=${creator_id} AND prosjekt_id=${project_id}`,
    (err, results) => {
      if (err) return res.status(400).send(err);
      console.log(results);
      return res.status(200).json(results);
    },
  );
};
const new_series = (
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) => {
  const arkivserie = req.params.arkivserie.toUpperCase();
  const creator_id = parseInt(req.params.creator_id);
  const project_id = parseInt(req.params.project_id);
  console.log(
    `INSERT INTO arkivserie SET ${arkivserie} ${creator_id} ${project_id}`,
  );
  connection.query(
    `SELECT path FROM prosjekt WHERE id=${project_id}`,
    (err, results, _fields) => {
      if (err) return res.status(400).send(err);
      const path = `${results[0].path}/${arkivserie}`;
      if (path) {
        connection.query(
          `INSERT INTO arkivserie SET ?`,
          {
            navn: arkivserie,
            arkivskaper_id: creator_id,
            prosjekt_id: project_id,
            path: `${path}`,
          },
          (err, results, _fields) => {
            if (err) return res.status(400).send(err);
            createDir(path);
            return res.status(200).json(results);
          },
        );
      }
      return;
    },
  );
};

export default { get_series, new_series };
