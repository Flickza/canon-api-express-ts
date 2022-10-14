import * as express from 'express';

import creator from '../../controllers/creator.controller';

const router = express.Router();

console.log('creator routes');

router.post('/:creator_name', creator.new_creators);
router.get('/get', creator.get_creators);

export default router;
