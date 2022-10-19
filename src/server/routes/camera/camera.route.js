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
            return console.log("Camera connected successfully", settings);
        });
    }
});

router.get('/capture', camera.capture);
// router.get('/settings', camera.settings);

// router.put('/settings/:name', function (req, res) {
//   if (!camera) {
//     return res.status(404).send('Camera not connected');
//   } else {
//     return camera.setConfigValue(
//       req.params.name,
//       req.body.newValue,
//       function (er) {
//         if (er) {
//           return res.status(423).send(JSON.stringify(er));
//         } else {
//           return res.sendStatus(200);
//         }
//       },
//     );
//   }
// });

// router.get('/settings', function (req, res) {
//   if (!camera) {
//     return res.status(404).send('Camera not connected');
//   } else {
//     return camera.getConfig(function (er, settings) {
//       return res.send(JSON.stringify(settings));
//     });
//   }
// });

export default router;
