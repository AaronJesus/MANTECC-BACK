import { Router } from 'express';
import {
	deleteAlumno,
	getAlumno,
	getAlumnos,
	newAlumno,
	updateAlumno,
} from '../controllers/alumnos.controllers';
import { updateUserEstado } from '../controllers/usuarios.controllers';

const router = Router();

router.get('/alumnos', getAlumnos);
router.get('/alumno/:RFC', getAlumno);
router.post('/alumnos', newAlumno);
router.put('/alumno/:RFC', updateAlumno);
router.put('/alumno/:RFC', updateUserEstado);
router.delete('/alumno/:RFC', deleteAlumno);

export default router;
