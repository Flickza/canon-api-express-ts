import * as express from 'express';

import camera from './camera/camera.route';
import creator from './creator/creator.route';

const router = express.Router();

router.use('/camera', camera);
router.use('/creator', creator);

export default router;
