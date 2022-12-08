const PDFDocument = require('pdfkit');

export const buildPDF = (dataCallback, endCallback) => {
	const pdf = new PDFDocument();
	pdf.on('data', dataCallback);
	pdf.on('end', endCallback);
	pdf.image('src/documents/Solicitud.png', 0, 15, { width: 600 });

	pdf.end();
};
