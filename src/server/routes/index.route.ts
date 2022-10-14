import * as express from 'express';

import camera from './camera/camera.route';
import creator from './creator/creator.route';
import project from './project/project.route';

const router = express.Router();

router.use('/camera', camera);
router.use('/creator', creator);
router.use('/project', project)

export default router;
