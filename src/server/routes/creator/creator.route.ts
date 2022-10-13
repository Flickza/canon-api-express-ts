import * as express from 'express';

import creator from '../../controllers/creator.controller';

const router = express.Router();

console.log('creator routes');

router.post('/new_creator', creator.new_creators);
router.get('/creators', creator.get_creators);

export default router;
