import express from 'express';
import { connection } from '../index';

const get_projects = (_req: express.Request, res: express.Response) => {
  const creator_id = _req.params.creator_id;
  console.log(`SELECT * FROM prosjekt WHERE arkivskaper_id=${creator_id}`);
  connection.query(
    `SELECT * FROM prosjekt WHERE arkivskaper_id=${creator_id}`,
    (err, results) => {
      if (err) return res.status(400).send(err);
      console.log(results);
      return res.status(200).json(results);
    },
  );
};
const new_project = (
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) => {
  const project_name = req.params.project_name.toUpperCase();
  const creator_id = parseInt(req.params.creator_id);
  connection.query(
    `INSERT INTO prosjekt SET ?`,
    {
      navn: project_name,
      arkivskaper_id: creator_id,
    },
    (err, results, _fields) => {
      if (err) return res.status(400).send(err);
      console.log(results);
      return res.status(200).json(results);
    },
  );
};

export default { get_projects, new_project };
