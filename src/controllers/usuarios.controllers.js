import { getConnection, sql } from '../database/connection';
import { queries } from '../database/query';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export const getUsuario = async (req, res) => {
	const { RFC } = req.params;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('RFC', sql.VarChar, RFC)
			.query(queries.getUser);
		res.json(resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const getUsuarios = async (req, res) => {
	try {
		const pool = await getConnection();
		const resPool = await pool.request().query(queries.getUsers);
		res.json(resPool && resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const getAdmins = async (req, res) => {
	try {
		const pool = await getConnection();
		const resPool = await pool.request().query(queries.getAdmins);
		res.json(resPool && resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const newUser = async (req, res) => {
	const { RFC, Contraseña, Nombres, id_Usuario } = req.body;
	try {
		//el 10 del hashpassword es ruido para encryptar la contra
		//y que sea mas dificil de crackear
		const hashPassword = await bcrypt.hash(Contraseña, 10);
		const pool = await getConnection();
		await pool
			.request()
			.input('RFC', sql.VarChar, RFC)
			.input('Contraseña', sql.Char, hashPassword)
			.input('Nombres', sql.VarChar, Nombres)
			.input('id_Usuario', sql.Int, id_Usuario)
			.query(queries.newUser);
		res.json('Nuevo Usuario con exito');
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const login = async (req, res) => {
	try {
		const { RFC, Contraseña } = req.body;
		const pool = await getConnection();
		const resPool = await pool.request().query(queries.getAllUsers);
		const users = resPool.recordset;
		const user = users.find((user) => user.RFC === RFC);
		if (user === null) {
			return res.status(400).send('No se encontro usuario');
		}
		if (await bcrypt.compare(Contraseña, user.Contraseña)) {
			const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
			res.json({ accessToken, user });
		} else {
			res.json({ msg: 'El RFC o Contraseña no coinciden' });
		}
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const authToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token === null) {
		return res.status(401);
	}

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.status(403);
		}
		req.user = user;
		next();
	});
};

export const deleteUser = async (req, res) => {
	const { RFC } = req.params;
	try {
		const pool = await getConnection();
		await pool.request().input('RFC', sql.VarChar, RFC).query(queries.delUser);
		res.json('Usuario Eliminado con exito');
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const updateUser = async (req, res) => {
	const { RFC } = req.params;
	const { RFC2, Contraseña, Nombres, id_Usuario } = req.body;
	try {
		const pool = await getConnection();
		await pool
			.request()
			.input('RFC', sql.VarChar, RFC)
			.input('RFC2', sql.VarChar, RFC2)
			.input('Nombres', sql.VarChar, Nombres)
			.input('id_Usuario', sql.Int, id_Usuario)
			.query(queries.updateUser);
		if (!!Contraseña) {
			const hashPassword = await bcrypt.hash(Contraseña, 10);
			await pool
				.request()
				.input('RFC', sql.VarChar, RFC)
				.input('Contraseña', sql.Char, hashPassword)
				.query('UPDATE Usuarios SET Contraseña = @Contraseña WHERE RFC = @RFC');
		}
		res.json('Update Usuario con exito');
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const updateUserEstado = async (req, res) => {
	const { RFC } = req.params;
	const { Estatus } = req.body;
	try {
		const pool = await getConnection();
		await pool
			.request()
			.input('RFC', sql.VarChar, RFC)
			.input('Estatus', sql.Bit, Estatus)
			.query(queries.updateEstadoUser);
		res.json('Update Estado Usuario con exito');
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};
