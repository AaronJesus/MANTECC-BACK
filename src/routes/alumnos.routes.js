import { Router } from 'express';
import {
	alumnoQuery,
	deleteAlumno,
	getAlumno,
	getAlumnos,
	newAlumno,
	updateAlumno,
} from '../controllers/alumnos.controllers';

const router = Router();

router.get('/alumnos', getAlumnos);
router.get('/alumno/:RFC', getAlumno);
router.post('/alumnos', newAlumno);
router.put('/alumno/:RFC', updateAlumno);
router.put('/alumnos/query/', alumnoQuery);
router.delete('/alumno/:RFC', deleteAlumno);

export default router;
