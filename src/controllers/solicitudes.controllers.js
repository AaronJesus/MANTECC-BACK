import { getConnection, sql } from '../database/connection';
import { queries } from '../database/query';

export const getSolicitudesProceso = async (req, res) => {
	const { idPeriodo } = req.body;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('idPeriodo', sql.Int, idPeriodo)
			.query(queries.getSolicitudesProceso);
		res.json(resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const getSolicitudesTerminadas = async (req, res) => {
	const { idPeriodo } = req.body;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('idPeriodo', sql.Int, idPeriodo)
			.query(queries.getSolicitudesTerminadas);
		res.json(resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const newSolicitud = async (req, res) => {
	const {
		idPeriodo,
		RFC,
		Fecha_Elaboracion,
		Clave_Area,
		Nombre_Solicitante,
		Descripcion_Servicio_Falla,
		Lugar_Especifico,
		Horario_Atencion,
		Aprobado_Por,
		Asignado_a,
	} = req.body;

	const Tipo_Servicio = 'Correctivo';
	try {
		const pool = await getConnection();
		//Get folio
		const Periodo = await pool
			.request()
			.input('idPeriodo', sql.Int, idPeriodo)
			.query(queries.getPeriodo);
		const getFolio = await pool
			.request()
			.input('idPeriodo', sql.Int, idPeriodo)
			.query(queries.getFolioxPeriodo);
		const Folio = getFolio.recordset[0].Folio
			? getFolio.recordset[0].Folio + 1
			: 1;
		const Folio_Completo = Folio + '-' + Periodo.recordset[0].Periodo;
		//Creacion de la solicitud y estado de la solicitud
		await pool
			.request()
			.input('Folio_Completo', sql.VarChar, Folio_Completo)
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
			.input('idEstatus', sql.VarChar, Folio_Completo)
			.input('idPeriodo', sql.Int, idPeriodo)
			.input('Folio', sql.Int, Folio)
			.input('RFC', sql.VarChar, RFC)
			.query(queries.newSolicitud);

		//Creacion de la orden para la solicitud
		await pool
			.request()
			.input('Folio_Completo', sql.VarChar, Folio_Completo)
			.input('Mantenimiento_Interno', sql.Bit, 1)
			.input('Tipo_Servicio', sql.VarChar, Tipo_Servicio)
			.input('Asignado_a', sql.VarChar, Asignado_a)
			.input('idPeriodo', sql.Int, idPeriodo)
			.input('Liberado_Por', sql.VarChar, Nombre_Solicitante)
			.input('Aprobado_Por', sql.VarChar, Aprobado_Por)
			.query(queries.newOrden);

		res.json('Nueva Solicitud con exito');
	} catch (error) {
		console.log(error);
		res.status(500);
		res.send(error.message);
	}
};

export const deleteSol = async (req, res) => {
	const { Folio_Completo } = req.params;
	const idEstatus = Folio_Completo;
	try {
		const pool = await getConnection();
		await pool
			.request()
			.input('Folio_Completo', sql.VarChar, Folio_Completo)
			.input('idEstatus', sql.VarChar, idEstatus)
			.query(queries.delSolicitud);
		res.json('Solicitud Eliminada con exito');
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const getSolicitud = async (req, res) => {
	const { Folio_Completo } = req.params;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('Folio_Completo', sql.VarChar, Folio_Completo)
			.query(queries.getSolicitud);
		res.json(resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const getSolRFC = async (req, res) => {
	const { RFC } = req.params;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('RFC', sql.VarChar, RFC)
			.query(queries.getSolicitudxRFC);
		res.json(resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const getSolPeriod = async (req, res) => {
	const { periodo } = req.params;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('idPeriodo', sql.VarChar, periodo)
			.query(queries.solicitudesXPeriodo);
		res.json(resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const getSolTermRFC = async (req, res) => {
	const { RFC } = req.params;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('RFC', sql.VarChar, RFC)
			.query(queries.getTerminadaxRFC);
		res.json(resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const getOrden = async (req, res) => {
	const { Folio_Completo } = req.params;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('Folio_Completo', sql.VarChar, Folio_Completo)
			.query(queries.getOrden);
		res.json(resPool.recordset);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const updateOrdenAdmin = async (req, res) => {
	const { Folio_Completo } = req.params;
	const {
		Trabajo_Realizado,
		Mantenimiento_Interno,
		Tipo_Servicio,
		Asignado_a,
		Fecha_Realizacion,
		idPeriodo,
	} = req.body;

	try {
		const pool = await getConnection();

		await pool
			.request()
			.input('Folio_Completo', sql.VarChar, Folio_Completo)
			.input('Mantenimiento_Interno', sql.Bit, Mantenimiento_Interno)
			.input('Tipo_Servicio', sql.VarChar, Tipo_Servicio)
			.input('Asignado_a', sql.VarChar, Asignado_a)
			.query(queries.updateOrdenAdmin);

		if (!!Fecha_Realizacion && !!Trabajo_Realizado) {
			const Periodo = await pool
				.request()
				.input('idPeriodo', sql.Int, idPeriodo)
				.query(queries.getPeriodo);
			const getFolio = await pool
				.request()
				.input('idPeriodo', sql.Int, idPeriodo)
				.query(queries.getFolioxPeriodoOrden);
			const Folio = getFolio.recordset[0].Folio
				? getFolio.recordset[0].Folio + 1
				: 1;
			const No_Control = Folio + '-' + Periodo.recordset[0].Periodo;

			await pool
				.request()
				.input('Folio_Completo', sql.VarChar, Folio_Completo)
				.input('Fecha_Realizacion', sql.Date, Fecha_Realizacion)
				.input('Trabajo_Realizado', sql.VarChar, Trabajo_Realizado)
				.input('Folio', sql.Int, Folio)
				.input('No_Control', sql.VarChar, No_Control)
				.query(queries.updateOrdenFecha);
		}

		res.json('Orden actualizada');
	} catch (error) {
		res.status(500);
		console.log(error);
		res.send(error.message);
	}
};

export const updateOrdenCliente = async (req, res) => {
	const { Folio_Completo } = req.params;
	const { Calificacion_Servicio, Comentario_Servicio } = req.body;
	try {
		const pool = await getConnection();
		await pool
			.request()
			.input('Folio_Completo', sql.VarChar, Folio_Completo)
			.input('Calificacion_Servicio', sql.Int, Calificacion_Servicio)
			.input('Comentario_Servicio', sql.VarChar, Comentario_Servicio)
			.query(queries.updateCalifOrden);
		res.json('Orden Cliente actualizada');
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
};

export const getSolProcesoQuery = async (req, res) => {
	const {
		idPeriodo = '',
		RFC = '',
		Nombre_Solicitante = '',
		Clave_Area = '',
		Folio = '',
		Asignado_a = '',
		Fecha1 = '',
		Fecha2 = '',
	} = req.body;

	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('idPeriodo', idPeriodo + '%')
			.input('RFC', sql.VarChar, RFC + '%')
			.input('Nombre_Solicitante', sql.VarChar, Nombre_Solicitante + '%')
			.input('Clave_Area', Clave_Area + '%')
			.input('Folio', Folio + '%')
			.input('Asignado_a', sql.VarChar, Asignado_a + '%')
			.input('Fecha1', !!Fecha1 ? Fecha1 : '1000-01-01')
			.input('Fecha2', !!Fecha2 ? Fecha2 : '5000-01-01')
			.query(queries.SolicitudesProcesoQuery);
		!!resPool && res.json(resPool.recordset);
	} catch (error) {
		res.status(500);
		console.log(error);
		res.send(error.message);
	}
};

export const getSolTermQuery = async (req, res) => {
	const {
		idPeriodo = '',
		RFC = '',
		Nombre_Solicitante = '',
		Clave_Area = '',
		Folio = '',
		Asignado_a = '',
		Fecha1 = '',
		Fecha2 = '',
	} = req.body;
	try {
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('idPeriodo', idPeriodo + '%')
			.input('RFC', sql.VarChar, RFC + '%')
			.input('Nombre_Solicitante', sql.VarChar, Nombre_Solicitante + '%')
			.input('Clave_Area', Clave_Area + '%')
			.input('Folio', Folio + '%')
			.input('Asignado_a', sql.VarChar, Asignado_a + '%')
			.input('Fecha1', !!Fecha1 ? Fecha1 : '1000-01-01')
			.input('Fecha2', !!Fecha2 ? Fecha2 : '5000-01-01')
			.query(queries.SolicitudesTerminadaQuery);
		!!resPool && res.json(resPool.recordset);
	} catch (error) {
		res.status(500);
		console.log(error);
		res.send(error.message);
	}
};
