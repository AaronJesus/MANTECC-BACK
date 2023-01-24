import { getConnection, sql } from '../database/connection';
import { queries } from '../database/query';

export const reporteProceso = async (req, res) => {
	const { year, month } = req.params;
	const year1 = new Date();
	const year2 = new Date();
	year1.setFullYear(year, month, 1);
	year2.setFullYear(year, parseInt(month) + 1, 0);
	year1.setHours(0, 0, 0, 0);
	year2.setHours(0, 0, 0, 0);
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('Year1', sql.Date, year1)
			.input('Year2', sql.Date, year2)
			.query(queries.getRepProceso);
		res.json(resPool.recordset);
	} catch (error) {
		console.log(error);
		res.status(500);
		res.send(error.message);
	}
};

export const reporteTerm = async (req, res) => {
	const { year, month } = req.params;
	const year1 = new Date();
	const year2 = new Date();
	year1.setFullYear(year, month, 1);
	year2.setFullYear(year, parseInt(month) + 1, 0);
	year1.setHours(0, 0, 0, 0);
	year2.setHours(0, 0, 0, 0);
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('Year1', sql.Date, year1)
			.input('Year2', sql.Date, year2)
			.query(queries.getRepTerminadas);
		res.json(resPool.recordset);
	} catch (error) {
		console.log(error);
		res.status(500);
		res.send(error.message);
	}
};

export const reporteRech = async (req, res) => {
	const { year, month } = req.params;
	const year1 = new Date();
	const year2 = new Date();
	year1.setFullYear(year, month, 1);
	year2.setFullYear(year, parseInt(month) + 1, 0);
	year1.setHours(0, 0, 0, 0);
	year2.setHours(0, 0, 0, 0);
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('Year1', sql.Date, year1)
			.input('Year2', sql.Date, year2)
			.query(queries.getRepRechazadas);
		res.json(resPool.recordset);
	} catch (error) {
		console.log(error);
		res.status(500);
		res.send(error.message);
	}
};

export const añoTot = async (req, res) => {
	const { year } = req.params;
	const year1 = new Date();
	const year2 = new Date();
	year1.setFullYear(year, 0, 1);
	year2.setFullYear(year, 11, 31);
	year1.setHours(0, 0, 0, 0);
	year2.setHours(0, 0, 0, 0);
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('Year1', sql.Date, year1)
			.input('Year2', sql.Date, year2)
			.query(queries.getTotalAño);
		res.json(resPool.recordset);
	} catch (error) {
		console.log(error);
		res.status(500);
		res.send(error.message);
	}
};

export const añoProc = async (req, res) => {
	const { year } = req.params;
	const year1 = new Date();
	const year2 = new Date();
	year1.setFullYear(year, 0, 1);
	year2.setFullYear(year, 11, 31);
	year1.setHours(0, 0, 0, 0);
	year2.setHours(0, 0, 0, 0);
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('Year1', sql.Date, year1)
			.input('Year2', sql.Date, year2)
			.query(queries.getProcesoAño);
		res.json(resPool.recordset);
	} catch (error) {
		console.log(error);
		res.status(500);
		res.send(error.message);
	}
};

export const añoDone = async (req, res) => {
	const { year } = req.params;
	const year1 = new Date();
	const year2 = new Date();
	year1.setFullYear(year, 0, 1);
	year2.setFullYear(year, 11, 31);
	year1.setHours(0, 0, 0, 0);
	year2.setHours(0, 0, 0, 0);
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('Year1', sql.Date, year1)
			.input('Year2', sql.Date, year2)
			.query(queries.getTerminadoAño);
		res.json(resPool.recordset);
	} catch (error) {
		console.log(error);
		res.status(500);
		res.send(error.message);
	}
};
