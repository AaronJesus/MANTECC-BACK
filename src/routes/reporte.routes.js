import { Router } from 'express';
import {
	añoDone,
	añoProc,
	añoTot,
	reporteProceso,
	reporteRech,
	reporteTerm,
} from '../controllers/reporte.controller';

const router = Router();

router.get('/eneProceso/:year/:month', reporteProceso);
router.get('/eneTerminadas/:year/:month', reporteTerm);
router.get('/eneRechazadas/:year/:month', reporteRech);
router.get('/yearTotal/:year', añoTot);
router.get('/yearProc/:year', añoProc);
router.get('/yearDone/:year', añoDone);

export default router;
