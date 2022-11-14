import * as express from 'express';

import protocol from '../../controllers/protocol.controller';

const router = express.Router();

console.log('Protocol routes');

router.post('/:series_id/:protocol', protocol.new_protocol);
router.get('/get/:series_id', protocol.get_protocol);

export default router;
