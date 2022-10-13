import { CameraList, closeQuietly } from '@tsed/gphoto2-driver';

import express from 'express';
const capture = async (req: express.Request, res: express.Response) => {
  try {
    const camera = req.camera!;
    const cameraFile = camera.captureImage();
    res.send(cameraFile);
    closeQuietly(cameraFile!);
  } catch (error) {
    res.send(error);
  }
};

const settings = (req: express.Request, res: express.Response) => {
  console.log(req, res);
};

export default { capture, settings };
