import fs from 'fs';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { getIndex } from '../utils/getIndex';
import { cam } from '../routes/camera/camera.route';
import { connection } from '../index';
dotenv.config();

const TEMP_PATH = path.join(__dirname, '../temp');
const IMAGE_NAME = 'temp.jpg';
const IMAGE_PATH = path.join(TEMP_PATH, IMAGE_NAME);
const ROOT = process.env.DIRECTORY_ROOT;

const capture = async (_req, res) => {
  try {
    // Take picture with camera object obtained from list
    cam.takePicture({ download: true }, async (er, data) => {
      if (data) {
        fs.writeFile(
          path.join(TEMP_PATH, IMAGE_NAME),
          data,
          (er, data) => {
            if (er) return console.error(er);
            console.log('file saved.', IMAGE_PATH);
            res.download(IMAGE_PATH);
          },
        );
      } else {
        return;
      }
    });
  } catch (error) {
    return res.send(error);
  }
};

const save_to_path = async (_req, res) => {
  try {
    const id = _req.query.id;
    const filename = _req.query.filename;
    if (!id || !filename)
      return res.status(400).send('no id or filename provided');
    connection.query(
      `SELECT * FROM arkivserie WHERE id=${id}`,
      async (err, results, _fields) => {
        if (err) return res.status(400).send(err);
        const PATH_FROM_DB = results[0].path;
        if (!PATH_FROM_DB && !filename)
          return res.status(400).send('no path or filename found');

        const index = await getIndex(
          path.join(ROOT, `${PATH_FROM_DB}`),
        );
        let newIndex = 0;
        if (index === 0) {
          newIndex = 1;
        } else {
          newIndex = index + 1;
        }

        fs.rename(
          path.join(TEMP_PATH, IMAGE_NAME),
          path.join(
            ROOT,
            `${PATH_FROM_DB}/${filename}_${newIndex}.jpg`,
          ),
          (er) => {
            if (er) return console.error(er);
            console.log(
              'file saved.',
              path.join(ROOT, `${PATH_FROM_DB}/${filename}.jpg`),
            );
            res.send('File cloned to server successfully.');
          },
        );
      },
    );
  } catch (error) {
    return res.send(error);
  }
};

export default {
  capture,
  save_to_path,
};
