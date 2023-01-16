import { pool } from 'mssql';
import { getConnection, sql } from '../database/connection';
import { queries } from '../database/query';

export const getAreas = async (req, res) => {
	try {
		const pool = await getConnection();
		const resPool = await pool.request().query(queries.getAreas);
		res.json(resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const getArea = async (req, res) => {
	const { clave } = req.params;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('Clave_Area', sql.Int, clave)
			.query(queries.getArea);
		res.json(resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const newArea = async (req, res) => {
	const { Clave_Area, Nombre } = req.body;
	try {
		const pool = await getConnection();
		await pool
			.request()
			.input('Clave_Area', sql.Int, Clave_Area)
			.input('Nombre', sql.VarChar, Nombre)
			.query(queries.newArea);
		res.json('Nueva Area ingresada');
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const delArea = async (req, res) => {
	const { clave } = req.params;

	try {
		const pool = await getConnection();
		await pool
			.request()
			.input('Clave_Area', sql.Int, clave)
			.query(queries.delArea);
		res.json('Area eliminada');
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const updateArea = async (req, res) => {
	const { clave } = req.params;
	const { Nombre } = req.body;
	try {
		const pool = await getConnection();
		await pool
			.request()
			.input('Clave_Area', sql.Int, clave)
			.input('Nombre', sql.VarChar, Nombre)
			.query(queries.updateArea);
		res.json('Area modificada');
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const getCarreras = async (req, res) => {
	try {
		const pool = await getConnection();
		const resPool = await pool.request().query(queries.getCarreras);
		res.json(resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};
