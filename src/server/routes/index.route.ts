import * as express from 'express';

import camera from './camera/camera.route';
import creator from './creator/creator.route';
import project from './project/project.route';
import series from './series/series.route';
import protocol from './protocol/protocol.route';

const router = express.Router();

router.use('/camera', camera);
router.use('/creator', creator);
router.use('/project', project);
router.use('/arkivserie', series);
router.use('/protocol', protocol);

export default router;
