import express from 'express';

const get_creators = (req: express.Request, res: express.Response) => {
  console.log(req, res);
};
const new_creators = (req: express.Request, res: express.Response) => {
  console.log(req, res);
};

export default { get_creators, new_creators };
