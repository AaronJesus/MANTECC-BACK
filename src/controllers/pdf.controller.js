const PDFDocument = require('pdfkit');
import moment from 'moment';
import 'moment/locale/es';

export const buildPDFSol = (valores, dataCallback, endCallback) => {
	const doc = new PDFDocument();
	const {
		Nombre,
		Folio_Completo,
		Descripcion_Servicio_Falla,
		Fecha_Elaboracion,
		Lugar_Especifico,
		Horario_Atencion,
		Asignado_a,
		Nombre_Solicitante,
		Valor,
	} = valores;

	var fecha = moment();
	fecha.locale('es');
	var fecha = moment.utc(Fecha_Elaboracion).format('LL');
	doc.on('data', dataCallback);
	doc.on('end', endCallback);
	doc.image('src/documents/Solicitud2.png', 0, 15, { width: 600 });
	doc.font('Helvetica-Bold').text(Valor, 437, 97); //Revision
	doc.text('x', 240, 198);
	doc.font('Courier').text(Folio_Completo, 520, 237, { lineBreak: false }); //Folio //Courier, Helvetica o Times-Roman
	doc.text(Nombre, 150, 280); //Area Solicitante
	doc.text(Nombre_Solicitante, 240, 330); //Nombre sol
	doc.text(fecha, 200, 380); //Fecha de elaboracion
	doc.text(Descripcion_Servicio_Falla, 70, 420); //Descripcion del servicio a solicitar
	doc.text(Lugar_Especifico, 70, 500); //lugar especifico donde acudir
	doc.text(Horario_Atencion, 70, 568); //Horario
	doc.text(Asignado_a, 70, 610); //Asignado a

	doc.end();
};

export const buildPDFOrd = (valores, dataCallback, endCallback) => {
	const doc = new PDFDocument();
	const {
		No_Control,
		Mantenimiento_Interno,
		Tipo_Servicio,
		Asignado_a,
		Fecha_Realizacion,
		Trabajo_Realizado,
		Calificacion_Servicio,
		Comentario_Servicio,
		Liberado_Por,
		Aprobado_Por,
		Valor,
	} = valores;

	let tamaño1 = Liberado_Por.length;
	let tamaño2 = Aprobado_Por.length;

	if (!!Fecha_Realizacion) {
		var fecha = moment();
		fecha.locale('es');
		var fecha = moment.utc(Fecha_Realizacion).format('LL');
		var fecha2 = moment.utc(Fecha_Realizacion).format('DD/MM/YYYY');
	}

	doc.on('data', dataCallback);
	doc.on('end', endCallback);
	doc.image('src/documents/Orden2.png', 0, 15, { width: 600 });
	doc.font('Helvetica-Bold').text(Valor, 445, 97); //Revision
	doc.font('Courier').text(No_Control, 520, 185, { lineBreak: false }); //# Control //Courier, Helvetica o Times-Roman
	if (!!Mantenimiento_Interno) {
		doc.text('X', 300, 220); //Mantenimiento
	} else {
		doc.text('X', 500, 220); //Mantenimiento
	}
	doc.text(Tipo_Servicio, 180, 245); //Tipo de Servicio
	doc.text(Asignado_a, 150, 275); //Asignado a
	doc.text(fecha, 190, 325); //Fecha
	doc.text(Trabajo_Realizado, 70, 370); //Trabajo Realizado
	if (Calificacion_Servicio == 10) {
		doc.text('X', 100, 560); //Calificacion
	} else if (Calificacion_Servicio == 9) {
		doc.text('X', 210, 560); //Calificacion
	} else if (Calificacion_Servicio == 8) {
		doc.text('X', 300, 560); //Calificacion
	} else if (Calificacion_Servicio == 7) {
		doc.text('X', 385, 560); //Calificacion
	} else if (Calificacion_Servicio == 6) {
		doc.text('X', 470, 560); //Calificacion
	}
	doc.fontSize(10).text(Comentario_Servicio, 70, 600); //Comentario
	//Liberado_Por
	if (tamaño1 <= 18) {
		doc.fontSize(12).text(Liberado_Por, 216, 645, { width: 130 });
	} else if (tamaño1 <= 32) {
		doc.fontSize(11).text(Liberado_Por, 216, 635, { width: 130 });
	} else if (tamaño1 <= 48) {
		doc.fontSize(10).text(Liberado_Por, 216, 630, { width: 130 });
	} else if (tamaño1 <= 64) {
		doc.fontSize(9).text(Liberado_Por, 216, 630, { width: 130 });
	} else if (tamaño1 <= 80) {
		doc.fontSize(8).text(Liberado_Por, 216, 630, { width: 130 });
	} else if (tamaño1 <= 100) {
		doc.fontSize(5).text(Liberado_Por, 216, 630, { width: 130 });
	}
	doc.fontSize(12).text(fecha2, 440, 645); //fecha ver
	//Aprobado_Por
	if (tamaño2 <= 28) {
		doc.fontSize(11).text(Aprobado_Por, 150, 675, { width: 200 });
	} else if (tamaño2 <= 56) {
		doc.fontSize(11).text(Aprobado_Por, 150, 665, { width: 200 });
	} else if (tamaño2 <= 84) {
		doc.fontSize(10).text(Aprobado_Por, 150, 660, { width: 200 });
	} else if (tamaño2 <= 100) {
		doc.fontSize(8).text(Aprobado_Por, 150, 660, { width: 200 });
	}
	doc.fontSize(12).text(fecha2, 440, 675); //fecha aprob

	doc.end();
};
