import sql from 'mssql';

const dbsetttings = {
	user: 'manteccDev',
	password: 'Residencias',
	server: 'localhost',
	database: 'MANTECC',
	options: {
		encrypt: true, // for azure
		trustServerCertificate: true, // change to true for local dev / self-signed certs
	},
};

const getConnection = async () => {
	try {
		const pool = await sql.connect(dbsetttings);
		return pool;
	} catch (error) {
		console.error(error);
	}
};

export { sql, getConnection };
