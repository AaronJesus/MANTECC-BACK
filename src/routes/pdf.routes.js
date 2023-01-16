import { Router } from 'express';
import { buildPDFOrd, buildPDFSol } from '../controllers/pdf.controller';
import { getConnection, sql } from '../database/connection';
import { queries } from '../database/query';

const router = Router();

router.get('/pdfSol/:folio', async (req, res, next) => {
	const { folio } = req.params;
	try {
		//Datos de la solicitud
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('Folio_Completo', sql.VarChar, folio)
			.query(queries.getSolicitud);
		var solicitud = resPool.recordset[0];
		const { Clave_Area } = solicitud;
		//Nombre del area
		const resPoolA = await pool
			.request()
			.input('Clave_Area', sql.Int, Clave_Area)
			.query(queries.getArea);
		const { Nombre } = resPoolA.recordset[0];
		//Revision doc
		const resPoolR = await pool
			.request()
			.input('idConfig', sql.Int, 3)
			.query(queries.getConfig);
		var { Valor } = resPoolR.recordset[0];

		solicitud = { ...solicitud, Nombre, Valor };

		const stream = res.writeHead(200, {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'attachment;filename=sol.pdf',
		});

		buildPDFSol(
			solicitud,
			(chunk) => stream.write(chunk),
			() => stream.end()
		);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
});
router.get('/pdfOrden/:folio', async (req, res, next) => {
	const { folio } = req.params;
	try {
		//Datos de la orden
		const pool = await getConnection();
		const resPool = await pool
			.request()
			.input('Folio_Completo', sql.VarChar, folio)
			.query(queries.getOrden);
		var solicitud = resPool.recordset[0];

		//Revision doc
		const resPoolR = await pool
			.request()
			.input('idConfig', sql.Int, 3)
			.query(queries.getConfig);
		var { Valor } = resPoolR.recordset[0];

		solicitud = { ...solicitud, Valor };

		const stream = res.writeHead(200, {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'attachment;filename=sol.pdf',
		});

		buildPDFOrd(
			solicitud,
			(chunk) => stream.write(chunk),
			() => stream.end()
		);
	} catch (error) {
		res.status(500);
		res.send(error.message);
	}
});

export default router;
