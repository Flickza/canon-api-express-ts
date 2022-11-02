import express from 'express';
import dotenv from 'dotenv';
import camera from '../../controllers/camera.controller';
import gphoto2 from 'gphoto2';

const router = express.Router();
dotenv.config();
var gphoto = new gphoto2.GPhoto2();
export var cam = undefined;
gphoto.list((cameras) => {
  cam = cameras[0];
  if (cam !== undefined) {
    return cam.getConfig((er, settings) => {
      if (er) {
        console.error({ camera_error: er });
      }
      return console.log('Camera connected successfully', settings);
    });
  }
});

router.get('/capture', camera.capture);
router.post('/save-to-path', camera.save_to_path);
export default router;
