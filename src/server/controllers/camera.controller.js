import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { getIndex } from '../utils/getIndex';
import { cam } from '../routes/camera/camera.route';
import { connection } from '../index';
import { createDir } from '../utils/createDir';
dotenv.config();

const TEMP_PATH = path.join(__dirname, '../temp');
const IMAGE_NAME = 'temp.jpg';
const TEMP_IMAGE_PATH = path.join(TEMP_PATH, IMAGE_NAME);
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
            console.log('file saved.', TEMP_IMAGE_PATH);
            res.download(TEMP_IMAGE_PATH);
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
    /* Getting the id and filename from the query string. */
    const id = _req.query.id;
    const filename = _req.query.filename;

    /* Checking if the id or filename is empty. */
    if (!id || !filename)
      return res.status(400).send('no id or filename provided');

    connection.query(
      `SELECT * FROM arkivserie WHERE id=${id}`,
      async (err, results, _fields) => {
        /* Returning an error if there is one. */
        if (err) return res.status(400).send(err);

        /* Getting the path from the database. */
        const PATH_FROM_DB = results[0].path;

        /* Checking if the path and filename are not empty. */
        if (!PATH_FROM_DB && !filename)
          return res.status(400).send('no path or filename found');

        /* Checking if the directory exists, if it does not exist, it creates it. */
        if (!fs.existsSync(PATH_FROM_DB)) {
          console.log(PATH_FROM_DB + 'does not exist');
          createDir(PATH_FROM_DB);
        }

        /* Getting the index of the last file in the directory. */
        const index = await getIndex(
          path.join(ROOT, `${PATH_FROM_DB}`),
        );

        let newIndex = 0;
        if (index === 0) {
          newIndex = 1;
        } else {
          newIndex = index + 1;
        }

        /* Creating a new filename with the index appended to the end of the filename. */
        const FILENAME_WITH_INDEX = `${filename}_${newIndex}.jpg`;

        /* Creating a path to the file that will be saved. */
        const imagePATH = path.join(
          ROOT,
          `${PATH_FROM_DB}/${FILENAME_WITH_INDEX}`,
        );

        fs.rename(TEMP_IMAGE_PATH, imagePATH, (err) => {
          if (err) return console.error(er);

          console.log('file saved. ', imagePATH);

          /* Inserting the data into the database. */
          connection.query(
            `INSERT INTO filer SET ?`,
            {
              arkivserie_id: id,
              fil_navn: FILENAME_WITH_INDEX,
              path: imagePATH,
            },
            (err, results, _fields) => {
              if (err) return res.status(400).send(err);

              /* Sending a response to the client. */
              res.send('File cloned to server successfully.');
            },
          );
        });
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
