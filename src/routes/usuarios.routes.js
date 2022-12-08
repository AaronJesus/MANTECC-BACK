import { Router } from 'express';
import {
	getUsuarios,
	getUsuario,
	newUser,
	deleteUser,
	updateUser,
	updateUserEstado,
	getAdmins,
	login,
	authToken,
} from '../controllers/usuarios.controllers';

const router = Router();

router.get('/login', authToken, (req, res) => {
	res.json('algo');
});
router.post('/usuarios/login', login);
router.get('/usuarios', getUsuarios);
router.get('/admins', getAdmins);
router.get('/usuario/:RFC', getUsuario);
router.post('/usuarios', newUser);
router.put('/usuario/:RFC', updateUser);
router.put('/usuarioEstado/:RFC', updateUserEstado);
router.delete('/usuario/:RFC', deleteUser);

export default router;
