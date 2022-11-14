import express from 'express';
import dotenv from 'dotenv';
import camera from '../../controllers/camera.controller';
import gphoto2 from 'gphoto2';

const router = express.Router();
dotenv.config();
let gphoto = new gphoto2.GPhoto2();
// Negative value or undefined will disable logging, levels 0-4 enable it.
gphoto.setLogLevel(1);
gphoto.on('log', function (level, domain, message) {
  console.log(level, domain, message);
});
export let cam = undefined;
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
