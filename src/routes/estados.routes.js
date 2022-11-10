import { Router } from 'express';
import {
	getEstado,
	getEstados,
	updateEstado,
} from '../controllers/estados.controllers';

const router = Router();

router.get('/estado/:idEstatus', getEstado);
router.put('/estado/:idEstatus', updateEstado);
router.get('/estados', getEstados);

export default router;
