import express from 'express';
import { CameraList, closeQuietly } from '@tsed/gphoto2-driver';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { projectExists } from '../../functions/check_project.js';
import { get_identifier } from '../../functions/get_identifier.js';

const router = express.Router();
dotenv.config();

const cameraList = new CameraList().load();
console.log('Nb camera', cameraList.size);

if (cameraList.size) {
  const camera = cameraList.getCamera(0);
  console.log('Camera =>', camera);

  //   cameraFile.save(path.join(__dirname, 'capture.jpeg'));

  //   closeQuietly(cameraFile);
  //   closeQuietly(camera);
}

// //capture image
// router.get('/capture/:creator/:project/:prefix', async (req, res) => {
//   if (projectExists(req.params.creator, req.params.project)) {
//     var date = new Date();
//     var prefix = req.params.prefix;
//     var creator = req.params.creator;
//     var project = req.params.project;
//     const identifier = await get_identifier(creator, project);

//     var date: string =
//       date.getDate().toString() +
//       '-' +
//       (date.getMonth() + 1).toString() +
//       '-' +
//       date.getFullYear().toString();
//     var extension = 'jpg';

//     var imageName =
//       creator +
//       '-' +
//       project +
//       '-' +
//       prefix +
//       '-' +
//       date +
//       '_' +
//       identifier +
//       '.' +
//       extension;
//     // Take picture with camera object obtained from list
//     camera.takePicture({ download: true }, (er, data) => {
//       if (data) {
//         const IMAGE_PATH = path.join(
//           process.env.CREATOR_PATH +
//             creator +
//             '/' +
//             project +
//             '/' +
//             imageName,
//         );
//         process.env.LAST_IMAGE_PATH = IMAGE_PATH;
//         fs.writeFileSync(IMAGE_PATH, data, (err) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log('Image captured and saved successfully');
//           }
//         });
//         res.send({
//           img: `<img id="image" src="/arkivskaper/${creator}/${project}/${imageName}" hidden/>`,
//         });
//       } else {
//         res.sendStatus(500);
//       }
//     });
//   } else {
//     res
//       .status(404)
//       .send({ error_message: `Project ${project} does not exist.` });
//   }
// });

// //Handle last captured image
// router.get('/save/:yes_no/:creator/:project', (req, res) => {
//   const project = req.params.project;
//   const creator = req.params.creator;
//   const yes_no = req.params.yes_no;
//   if (projectExists(creator, project)) {
//     if (yes_no === 'yes') {
//       res.status(200).send({
//         message: `Picture saved in project ${req.params.project} successfully.`,
//       });
//       process.env.LAST_IMAGE_PATH = 'none';
//     } else if (yes_no === 'no') {
//       fs.unlink(process.env.LAST_IMAGE_PATH, (err) => {
//         if (err) {
//           return res.status(404).send({
//             error_message:
//               'Image was not found, perhaps already deleted?',
//           });
//         }
//         process.env.LAST_IMAGE_PATH = 'none';
//         res
//           .status(200)
//           .send({ message: `Picture discarded successfully.` });
//       });
//     }
//   } else {
//     return res.status(404).send({
//       error_message: `Project ${req.params.project} was not found.`,
//     });
//   }
// });

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
