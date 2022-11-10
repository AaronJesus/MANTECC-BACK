import { Router } from 'express';
import {
	deleteSol,
	getOrden,
	getSolicitud,
	getSolicitudes,
	getSolicitudesProceso,
	getSolicitudesTerminadas,
	newSolicitud,
	updateOrdenAdmin,
	updateOrdenCliente,
} from '../controllers/solicitudes.controllers';

const router = Router();

router.get('/solicitudes', getSolicitudesProceso);
router.get('/solicitudes/terminadas', getSolicitudesTerminadas);
router.post('/solicitudes', newSolicitud);
router.get('/solicitud/:Folio_Solicitud', getSolicitud);
router.delete('/solicitud/:Folio_Solicitud', deleteSol);

router.put('/orden/:Folio_Solicitud', updateOrdenAdmin);
router.post('/orden/:Folio_Solicitud', updateOrdenCliente);
router.get('/orden/:Folio_Solicitud', getOrden);

export default router;
