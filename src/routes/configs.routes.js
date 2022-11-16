import { Router } from 'express';
import {
	getConfig,
	getConfigs,
	updateConfig,
} from '../controllers/configs.controllers';

const router = Router();

router.get('/configs', getConfigs);
router.get('/config/:id', getConfig);
router.put('/config/:id', updateConfig);

export default router;
