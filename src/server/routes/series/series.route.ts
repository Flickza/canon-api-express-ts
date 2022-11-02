import * as express from 'express';

import series from '../../controllers/series.controller';

const router = express.Router();

console.log('Series routes');

router.post('/:creator_id/:project_id/:arkivserie', series.new_series);
router.get('/get/:creator_id/:project_id', series.get_series);

export default router;
