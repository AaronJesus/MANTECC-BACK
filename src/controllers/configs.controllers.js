import { getConnection, sql } from '../database/connection';
import { queries } from '../database/query';

export const getConfigs = async (req, res) => {
	try {
		const pool = await getConnection();
		const resPool = await pool.request().query(queries.getConfigs);
		res.json(resPool && resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error);
	}
};

export const getConfig = async (req, res) => {
	const { id } = req.params;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('idConfig', sql.Int, id)
			.query(queries.getConfig);
		res.json(resPool && resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error);
	}
};

export const updateConfig = async (req, res) => {
	const { id } = req.params;
	const { Valor } = req.body;

	try {
		const pool = await getConnection();
		await pool
			.request()
			.input('idConfig', sql.Int, id)
			.input('Valor', sql.VarChar, Valor)
			.query(queries.upConfig);
		res.json('Configuracion modificado');
	} catch (error) {
		res.status(500);
		res.send(error);
	}
};

export const getPeriodos = async (req, res) => {
	try {
		const pool = await getConnection();
		const resPool = await pool.request().query(queries.getPeriodos);
		res.json(!!resPool && resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error);
	}
};

export const delPeriodo = async (req, res) => {
	const { id } = req.params;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('idPeriodo', sql.Int, id)
			.query(queries.delPeriodo);

		res.json('Periodo eliminado');
	} catch (error) {
		res.status(500);
		res.send(error);
	}
};

export const newPeriodo = async (req, res) => {
	const { Periodo } = req.body;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('Periodo', sql.VarChar, Periodo)
			.query(queries.newPeriodo);
		res.json('Nuevo periodo!');
	} catch (error) {
		res.status(500);
		res.send(error);
	}
};

export const getPeriodo = async (req, res) => {
	const { id } = req.params;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('idPeriodo', sql.Int, id)
			.query(queries.getPeriodo);
		res.json(!!resPool && resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error);
	}
};
