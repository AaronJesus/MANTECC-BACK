import { getConnection, sql } from '../database/connection';
import { queries } from '../database/query';

export const getProbelmas = async (req, res) => {
	try {
		const pool = await getConnection();
		const resPool = await pool.request().query(queries.getProbelmas);
		res.json(resPool && resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error);
	}
};

export const getProbelma = async (req, res) => {
	const { id } = req.params;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('idProblema', sql.Int, id)
			.query(queries.getProbelma);
		res.json(resPool && resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error);
	}
};

export const newProb = async (req, res) => {
	const { Tipo, Descripcion } = req.body;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('Tipo', sql.VarChar, Tipo)
			.input('Descripcion', sql.VarChar, Descripcion)
			.query(queries.newProbelma);
		res.json('Nuevo problema');
	} catch (error) {
		res.status(500);
		res.send(error);
	}
};

export const updateProblema = async (req, res) => {
	const { id } = req.params;
	const { Tipo, Descripcion } = req.body;

	try {
		const pool = await getConnection();
		await pool
			.request()
			.input('idProblema', sql.Int, id)
			.input('Tipo', sql.VarChar, Tipo)
			.input('Descripcion', sql.VarChar, Descripcion)
			.query(queries.updateProblema);
		res.json('Problema modificado');
	} catch (error) {
		res.status(500);
		res.send(error);
	}
};

export const delProblema = async (req, res) => {
	const { id } = req.params;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('idProblema', sql.Int, id)
			.query(queries.delProblema);
		res.json('Problema eliminado');
	} catch (error) {
		res.status(500);
		res.send(error);
	}
};
