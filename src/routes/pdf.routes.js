import { Router } from 'express';
import { buildPDF } from '../controllers/pdf.controller';

const router = Router();

router.get('/pdfSol', (req, res, next) => {
	const stream = res.writeHead(200, {
		'Content-Type': 'application/pdf',
		'Content-Disposition': 'attachment;filename=sol.pdf',
	});

	buildPDF(
		(chunk) => stream.write(chunk),
		() => stream.end()
	);
});
router.get('/pdfOrden');

export default router;
