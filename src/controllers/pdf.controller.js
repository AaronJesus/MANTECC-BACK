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
	doc.fontSize(10).text(Liberado_Por, 220, 630, { width: 120 }); //Verificado por
	doc.fontSize(12).text(fecha2, 440, 645); //fecha ver
	doc.fontSize(10).text(Aprobado_Por, 155, 660, { width: 200 }); //Aprobado por
	doc.fontSize(12).text(fecha2, 440, 675); //fecha aprob

	doc.end();
};
