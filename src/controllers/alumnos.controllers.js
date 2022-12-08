import { getConnection, sql } from '../database/connection';
import { queries } from '../database/query';
const bcrypt = require('bcrypt');

export const getAlumno = async (req, res) => {
	const { RFC } = req.params;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('RFC', sql.VarChar, RFC)
			.query(queries.getAlumno);
		res.json(resPool.recordsets);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const getAlumnos = async (req, res) => {
	try {
		const pool = await getConnection();
		const resPool = await pool.request().query(queries.getAlumnos);
		res.json(resPool && resPool.recordsets);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const newAlumno = async (req, res) => {
	const { RFC, Contraseña, Nombres, id_Usuario, No_Control, Clave_Carrera } =
		req.body;
	try {
		const hashPassword = await bcrypt.hash(Contraseña, 10);
		const pool = await getConnection();
		await pool
			.request()
			.input('RFC', sql.VarChar, RFC)
			.input('Contraseña', sql.Char, hashPassword)
			.input('Nombres', sql.VarChar, Nombres)
			.input('id_Usuario', sql.Int, id_Usuario)
			.input('No_Control', sql.VarChar, No_Control)
			.input('Clave_Carrera', sql.Int, Clave_Carrera)
			.query(queries.newAlumno);
		res.json('Nuevo Alumno con exito');
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const deleteAlumno = async (req, res) => {
	const { RFC } = req.params;
	try {
		const pool = await getConnection();
		await pool
			.request()
			.input('RFC', sql.VarChar, RFC)
			.query(queries.delAlumno);
		res.json('Alumno Eliminado con exito');
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const updateAlumno = async (req, res) => {
	const { RFC } = req.params;
	const { RFC2, Contraseña, Nombres, id_Usuario, No_Control, Clave_Carrera } =
		req.body;
	try {
		const pool = await getConnection();
		await pool
			.request()
			.input('RFC', sql.VarChar, RFC)
			.input('RFC2', sql.VarChar, RFC2)
			.input('Nombres', sql.VarChar, Nombres)
			.input('id_Usuario', sql.Int, id_Usuario)
			.input('No_Control', sql.VarChar, No_Control)
			.input('Clave_Carrera', sql.Int, Clave_Carrera)
			.query(queries.updateAlumnos);
		if (!!Contraseña) {
			const hashPassword = await bcrypt.hash(Contraseña, 10);
			await pool
				.request()
				.input('RFC', sql.VarChar, RFC)
				.input('Contraseña', sql.Char, hashPassword)
				.query('UPDATE Usuarios SET Contraseña = @Contraseña WHERE RFC = @RFC');
		}
		res.json('Update Alumno con exito');
	} catch (error) {
		console.log(error.message);
		res.status(500);
		res.send(error.message);
	}
};
