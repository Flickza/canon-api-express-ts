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
    /* Taking a picture from the camera and downloading it to the server. */
    cam.takePicture({ download: true }, async (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ err, message: 'Capture failed.' });
      }
      if (data) {
        /* Checking if the directory exists, if it does not exist, it creates it. */
        if (!fs.existsSync(path.join(TEMP_PATH))) {
          fs.mkdirSync(TEMP_PATH, { recursive: true });
        }
        /* Checking if the file exists, if it does, it deletes it. */
        if (fs.existsSync(path.join(TEMP_PATH, IMAGE_NAME))) {
          fs.unlink(path.join(TEMP_PATH, IMAGE_NAME), (err) => {
            if (err) console.error(err);
            console.log('temp file deleted.');
          });
        }
        /* Saving the image to the temp folder. */
        fs.writeFile(
          path.join(TEMP_PATH, IMAGE_NAME),
          data,
          (er, data) => {
            if (er) return res.status(500).json(er);

            console.log('file saved.', TEMP_IMAGE_PATH);

            /* Sending the image to the client. */
            res.status(200).download(TEMP_IMAGE_PATH);
          },
        );
      } else {
        res.status(500).json('Capture failed.');
      }
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const save_to_path = async (_req, res) => {
  try {
    /* Getting the id and filename from the query string. */
    const id = _req.query.id;
    const filename = _req.query.filename;

    /* Checking if the id or filename is empty. */
    if (!id || !filename)
      return res.status(500).json('no id or filename provided');

    connection.query(
      `SELECT * FROM protokoll WHERE id=${id}`,
      async (err, results, _fields) => {
        /* Returning an error if there is one. */
        if (err) return res.status(500).json(err);

        /* Getting the path from the database. */
        const PATH_FROM_DB = results[0].path;

        /* Checking if the path and filename are not empty. */
        if (!PATH_FROM_DB && !filename)
          return res.status(500).json('no path or filename found');

        /* Checking if the directory exists, if it does not exist, it creates it. */
        createDir(PATH_FROM_DB);

        /* Getting the index of the last file in the directory. */
        const newIndex = await getIndex(
          path.join(ROOT, `${PATH_FROM_DB}`),
        );

        /* Creating a new filename with the index appended to the end of the filename. */
        const FILENAME_WITH_INDEX = `${filename}_${newIndex}.jpg`;

        /* Creating a path to the file that will be saved. */
        const imagePATH = path.join(
          ROOT,
          `${PATH_FROM_DB}/${FILENAME_WITH_INDEX}`,
        );

        fs.rename(TEMP_IMAGE_PATH, imagePATH, (err) => {
          if (err) return console.error(err);

          console.log('file saved. ', imagePATH);

          /* Inserting the data into the database. */
          connection.query(
            `INSERT INTO filer SET ?`,
            {
              protokoll_id: id,
              fil_navn: FILENAME_WITH_INDEX,
              path: imagePATH,
            },
            (err, results, _fields) => {
              if (err) return res.status(500).json(err);

              /* Sending a response to the client. */
              res
                .status(200)
                .json('File cloned to server successfully.');
            },
          );
        });
      },
    );
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default {
  capture,
  save_to_path,
};
