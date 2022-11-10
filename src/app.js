import express from 'express';
import config from './config';
import areas from './routes/areas.routes';
import solicitudes from './routes/solicitudes.routes';
import estados from './routes/estados.routes';
import usuarios from './routes/usuarios.routes';
import alumnos from './routes/alumnos.routes';
import problemas from './routes/problemas.routes';
import cors from 'cors';
const app = express();

//settings
app.set('port', config.port);

//middlewares
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	next();
});

app.use(express.urlencoded({ extended: false }));

app.use(solicitudes);
app.use(estados);
app.use(areas);
app.use(usuarios);
app.use(alumnos);
app.use(problemas);

export default app;
