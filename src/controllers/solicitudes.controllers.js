import { getConnection, sql } from '../database/connection';
import { queries } from '../database/query';
export const getSolicitudesProceso = async (req, res) => {
	try {
		const pool = await getConnection();
		const resPool = await pool.request().query(queries.getSolicitudesProceso);
		res.json(resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const getSolicitudesTerminadas = async (req, res) => {
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.query(queries.getSolicitudesTerminadas);
		res.json(resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const newSolicitud = async (req, res) => {
	const Asignado_a = 'Raymur Nuztas';
	const {
		Fecha_Elaboracion,
		Clave_Area,
		Nombre_Solicitante,
		Descripcion_Servicio_Falla,
		Lugar_Especifico,
		Horario_Atencion,
	} = req.body;

	try {
		const pool = await getConnection();
		const Tipo_Servicio = 'Correctivo';
		const Aprobado_Por = 'Ana Alicia Valenzuela Huerta';
		const Liberado_Por = Nombre_Solicitante;

		await pool
			.request()
			.input('Clave_Area', sql.VarChar, Clave_Area)
			.input('Nombre_Solicitante', sql.VarChar, Nombre_Solicitante)
			.input('Fecha_Elaboracion', sql.Date, Fecha_Elaboracion)
			.input(
				'Descripcion_Servicio_Falla',
				sql.VarChar,
				Descripcion_Servicio_Falla
			)
			.input('Lugar_Especifico', sql.VarChar, Lugar_Especifico)
			.input('Horario_Atencion', sql.VarChar, Horario_Atencion)
			.input('Asignado_a', sql.VarChar, Asignado_a)
			.query(queries.newSolicitud);

		const ordenPool = await pool.request().query(queries.getNuevaSolicitud);
		const idEstatus = ordenPool.recordset[0].Folio_Solicitud;

		await pool
			.request()
			.input('Folio_Solicitud', sql.Int, idEstatus)
			.input('idEstatus', sql.Int, idEstatus)
			.query(queries.newEstado);

		const Folio_Solicitud = ordenPool.recordset[0].Folio_Solicitud;

		await pool
			.request()
			.input('Folio_Solicitud', sql.Int, Folio_Solicitud)
			.input('Mantenimiento_Interno', sql.Bit, 1)
			.input('Tipo_Servicio', sql.VarChar, Tipo_Servicio)
			.input('Asignado_a', sql.VarChar, Asignado_a)
			.input('Liberado_Por', sql.VarChar, Liberado_Por)
			.input('Aprobado_Por', sql.VarChar, Aprobado_Por)
			.query(queries.newOrden);

		res.json('Nueva Solicitud con exito');
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const deleteSol = async (req, res) => {
	const { Folio_Solicitud } = req.params;
	const idEstatus = Folio_Solicitud;
	try {
		const pool = await getConnection();
		await pool
			.request()
			.input('Folio_Solicitud', sql.Int, Folio_Solicitud)
			.input('idEstatus', sql.Int, idEstatus)
			.query(queries.delSolicitud);
		res.json('Solicitud Eliminada con exito');
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const getSolicitud = async (req, res) => {
	const { Folio_Solicitud } = req.params;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('Folio_Solicitud', sql.Int, Folio_Solicitud)
			.query(queries.getSolicitud);
		res.json(resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const getOrden = async (req, res) => {
	const { Folio_Solicitud } = req.params;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('Folio_Solicitud', sql.Int, Folio_Solicitud)
			.query(queries.getOrden);
		res.json(resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const updateOrdenAdmin = async (req, res) => {
	const { Folio_Solicitud } = req.params;
	const {
		Trabajo_Realizado,
		Mantenimiento_Interno,
		Tipo_Servicio,
		Asignado_a,
		Fecha_Realizacion,
		No_Control,
	} = req.body;
	try {
		const pool = await getConnection();
		await pool
			.request()
			.input('Folio_Solicitud', sql.Int, Folio_Solicitud)
			.input('Mantenimiento_Interno', sql.Bit, Mantenimiento_Interno)
			.input('Tipo_Servicio', sql.VarChar, Tipo_Servicio)
			.input('Asignado_a', sql.VarChar, Asignado_a)
			.query(queries.updateOrdenAdmin);

		if (!!Fecha_Realizacion && !!No_Control && !!Trabajo_Realizado) {
			await pool
				.request()
				.input('Folio_Solicitud', sql.Int, Folio_Solicitud)
				.input('Fecha_Realizacion', sql.Date, Fecha_Realizacion)
				.input('Fecha_Aprobacion', sql.Date, Fecha_Realizacion)
				.input('Fecha_Liberacion', sql.Date, Fecha_Realizacion)
				.input('Trabajo_Realizado', sql.VarChar, Trabajo_Realizado)
				.input('No_Control', sql.Int, No_Control)
				.query(queries.updateOrdenFecha);
		}

		res.json('Orden actualizada');
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const updateOrdenCliente = async (req, res) => {
	const { Folio_Solicitud } = req.params;
	const { Calificacion_Servicio, Comentario_Servicio } = req.body;
	try {
		const pool = await getConnection();
		await pool
			.request()
			.input('Folio_Solicitud', sql.Int, Folio_Solicitud)
			.input('Calificacion_Servicio', sql.Int, Calificacion_Servicio)
			.input('Comentario_Servicio', sql.VarChar, Comentario_Servicio)
			.query(queries.updateCalifOrden);
		res.json('Orden Cliente actualizada');
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};
