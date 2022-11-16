import { getConnection, sql } from '../database/connection';
import { queries } from '../database/query';

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

export const newUser = async (req, res) => {
	const { RFC, Contraseña, Nombres, id_Usuario } = req.body;
	try {
		const pool = await getConnection();
		await pool
			.request()
			.input('RFC', sql.VarChar, RFC)
			.input('Contraseña', sql.Char, Contraseña)
			.input('Nombres', sql.VarChar, Nombres)
			.input('id_Usuario', sql.Int, id_Usuario)
			.query(queries.newUser);
		res.json('Nuevo Usuario con exito');
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
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
	//cant update rfc porque se usa para identificar el campo a cambiar
	const { RFC } = req.params;
	const { Contraseña, Nombres, id_Usuario } = req.body;
	try {
		const pool = await getConnection();
		await pool
			.request()
			.input('RFC', sql.VarChar, RFC)
			.input('Nombres', sql.VarChar, Nombres)
			.input('id_Usuario', sql.Int, id_Usuario)
			.query(queries.updateUser);
		!!Contraseña &&
			(await pool
				.request()
				.input('RFC', sql.VarChar, RFC)
				.input('Contraseña', sql.Char, Contraseña)
				.query(
					'UPDATE Usuarios SET Contraseña = @Contraseña WHERE RFC = @RFC'
				));
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
