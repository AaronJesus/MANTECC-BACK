import { Router } from 'express';
import {
	getUsuarios,
	getUsuario,
	newUser,
	deleteUser,
	updateUser,
	updateUserEstado,
} from '../controllers/usuarios.controllers';

const router = Router();

router.get('/usuarios', getUsuarios);
router.get('/usuario/:RFC', getUsuario);
router.post('/usuarios', newUser);
router.put('/usuario/:RFC', updateUser);
router.put('/usuarioEstado/:RFC', updateUserEstado);
router.delete('/usuario/:RFC', deleteUser);

export default router;
