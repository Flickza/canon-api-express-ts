import { CameraList, closeQuietly } from '@tsed/gphoto2-driver';
import fs from 'fs';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const TEMP_PATH: string = path.join(__dirname, '../temp');
const IMAGE_NAME: string = '/temp.jpg';
const IMAGE_PATH: string = TEMP_PATH + IMAGE_NAME;

const capture = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const cameraList = new CameraList().load();

    console.log('Nb camera', cameraList.size);

    if (cameraList.size) {
      const camera = cameraList.getCamera(0)!;
      console.log('Camera =>', camera);
      console.log(TEMP_PATH);
      const cameraFile = await camera
        .captureImageAsync()
        .then((File) => {
          File!
            .saveAsync(IMAGE_PATH)
            .then(() => {
              res.sendFile(IMAGE_PATH);
              closeQuietly(cameraFile!);
              closeQuietly(camera);
            })
            .catch((err) => {
              next(err);
            });
        });
    }
    cameraList.close();
  } catch (error) {
    next(error);
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
