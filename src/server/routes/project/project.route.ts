import * as express from 'express';

import project from '../../controllers/project.controller';

const router = express.Router();

console.log('Project routes');

router.post('/:creator_id/:project_name', project.new_project);
router.get('/get/:creator_id', project.get_projects);

export default router;
