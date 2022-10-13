import * as express from 'express';

import camera from './camera/camera.route';

const router = express.Router();

router.use('/camera', camera);

export default router;
