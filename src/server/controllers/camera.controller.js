import fs from 'fs';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { cam } from '../routes/camera/camera.route';

dotenv.config();

const TEMP_PATH = path.join(__dirname, '../temp');
const IMAGE_NAME = 'temp.jpg';
const IMAGE_PATH = path.join(TEMP_PATH, IMAGE_NAME);

const capture = async (_req, res) => {
  try {
    // Take picture with camera object obtained from list
    cam.takePicture({ download: true }, async (er, data) => {
      if (data) {
        fs.writeFile(path.join(TEMP_PATH, IMAGE_NAME), data, (er, data) => { 
          if (er) return console.error(er);
          console.log("file saved.", IMAGE_PATH);
          res.download(IMAGE_PATH);
        });
      } else {
        return;
      }
    });
  } catch (error) {
    return res.send(error);
  }
};

// const settings = (
//   _req: express.Request,
//   res: express.Response,
//   next: express.NextFunction,
// ) => {
//   try {
//     const cameraList = new CameraList().load();
//     if (cameraList.size) {
//       const camera = cameraList.getCamera(0)!;
//       console.log('Camera =>', camera);
//       const settings = camera.getAbilities;
//       res.status(200).json({ camera: { settings } });
//       closeQuietly(camera);
//     }
//     cameraList.close();
//   } catch (error) {
//     next(error);
//   }
// };

export default {
  capture,
  // settings
};
