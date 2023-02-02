import { Router } from 'express';
import {
	deleteSol,
	getOrden,
	getSolicitud,
	//getSolicitudes,
	getSolicitudesProceso,
	getSolicitudesTerminadas,
	getSolPeriod,
	getSolProcesoQuery,
	getSolRFC,
	getSolTermQuery,
	getSolTermRFC,
	newSolicitud,
	//rechazarOrden,
	updateOrdenAdmin,
	updateOrdenCliente,
} from '../controllers/solicitudes.controllers';

const router = Router();

router.put('/solicitudes', getSolicitudesProceso);
router.put('/solicitudes/query', getSolProcesoQuery);
router.put('/solicitudes/terminadas', getSolicitudesTerminadas);
router.put('/solicitudes/terminadas/query', getSolTermQuery);
router.post('/solicitudes', newSolicitud);
router.get('/solicitud/:Folio_Completo', getSolicitud);
router.get('/solicitudRFC/:RFC', getSolRFC);
router.get('/solicitudRFC/term/:RFC', getSolTermRFC);
router.get('/solicitudes/periodo/:periodo', getSolPeriod);
router.delete('/solicitud/:Folio_Completo', deleteSol);

router.put('/orden/:Folio_Completo', updateOrdenAdmin);
router.post('/orden/:Folio_Completo', updateOrdenCliente);
router.get('/orden/:Folio_Completo', getOrden);

export default router;
