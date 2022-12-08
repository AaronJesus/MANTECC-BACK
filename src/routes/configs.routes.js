import { Router } from 'express';
import {
	delPeriodo,
	getConfig,
	getConfigs,
	getPeriodo,
	getPeriodos,
	newPeriodo,
	updateConfig,
} from '../controllers/configs.controllers';

const router = Router();

router.get('/configs', getConfigs);
router.get('/periodos', getPeriodos);
router.post('/periodos', newPeriodo);
router.get('/periodo/:id', getPeriodo);
router.delete('/periodo/:id', delPeriodo);
router.get('/config/:id', getConfig);
router.put('/config/:id', updateConfig);

export default router;
