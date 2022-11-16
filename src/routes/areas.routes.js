import { Router } from 'express';
import {
	delArea,
	getArea,
	getAreas,
	getCarreras,
	newArea,
	updateArea,
} from '../controllers/areas.controllers';

const router = Router();

router.get('/areas', getAreas);
router.get('/carreras', getCarreras);
router.get('/area/:clave', getArea);
router.post('/areas', newArea);
router.put('/area/:clave', updateArea);
router.delete('/area/:clave', delArea);

export default router;
