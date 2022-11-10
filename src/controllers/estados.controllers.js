import { getConnection, sql } from '../database/connection';
import { queries } from '../database/query';

export const getEstado = async (req, res) => {
	const { idEstatus } = req.params;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('idEstatus', idEstatus)
			.query('SELECT * FROM Estado WHERE idEstatus= @idEstatus');
		res.json(resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const getEstados = async (req, res) => {
	try {
		const pool = await getConnection();
		const resPool = await pool.request().query('SELECT * FROM Estado');
		res.json(resPool && resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const updateEstado = async (req, res) => {
	const { idEstatus } = req.params;
	const {
		Aceptado,
		Rechazado,
		En_proceso,
		Terminado_tecnico,
		Aprobado_admin,
		Aprobado_cliente = false,
	} = req.body;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('Aceptado', sql.Bit, Aceptado)
			.input('Rechazado', sql.Bit, Rechazado)
			.input('En_proceso', sql.Bit, En_proceso)
			.input('Terminado_tecnico', sql.Bit, Terminado_tecnico)
			.input('Aprobado_admin', sql.Bit, Aprobado_admin)
			.input('Aprobado_cliente', sql.Bit, Aprobado_cliente)
			.input('idEstatus', sql.Int, idEstatus)
			.query(queries.updateEstado);
		res.json({
			Aceptado: Aceptado,
			Rechazado: Rechazado,
			En_proceso: En_proceso,
			Terminado_tecnico: Terminado_tecnico,
			Aprobado_admin: Aprobado_admin,
			Aprobado_cliente: Aprobado_cliente,
		});
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};
