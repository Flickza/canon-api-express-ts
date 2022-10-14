import express from 'express';
import dotenv from 'dotenv';
import camera from '../../controllers/camera.controller';

const router = express.Router();
dotenv.config();

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
