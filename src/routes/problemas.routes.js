import { Router } from 'express';
import {
	delProblema,
	getProbelma,
	getProbelmas,
	newProb,
	updateProblema,
} from '../controllers/problemas.controllers';

const router = Router();

router.get('/problemas', getProbelmas);
router.get('/problema/:id', getProbelma);
router.post('/problemas', newProb);
router.put('/problema/:id', updateProblema);
router.delete('/problema/:id', delProblema);

export default router;
