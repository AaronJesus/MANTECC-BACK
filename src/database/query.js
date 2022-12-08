export const queries = {
	//Queries de Solicitud
	getSolicitudesProceso:
		'SELECT * FROM Solicitud_Mantenimiento WHERE Folio_Completo IN (SELECT idEstatus FROM Estado WHERE Aprobado_cliente = 0) ' +
		'AND idPeriodo = @idPeriodo',
	getSolicitudesTerminadas:
		'SELECT * FROM Solicitud_Mantenimiento WHERE Folio_Completo IN ( SELECT idEstatus FROM Estado WHERE Aprobado_cliente = 1) ' +
		'AND idPeriodo = @idPeriodo',
	getSolicitud:
		'SELECT * FROM Solicitud_Mantenimiento WHERE Folio_Completo = @Folio_Completo',
	//solicitud en proceso x rfc
	getSolicitudxRFC:
		'SELECT * FROM Solicitud_Mantenimiento WHERE RFC = @RFC AND Folio_Completo IN ' +
		'(SELECT idEstatus FROM Estado WHERE Aprobado_cliente = 0)',
	getTerminadaxRFC:
		'SELECT * FROM Solicitud_Mantenimiento WHERE RFC = @RFC AND Folio_Completo IN ' +
		'(SELECT idEstatus FROM Estado WHERE Aprobado_cliente = 1)',
	getOrden:
		'SELECT * FROM Orden_Trabajo WHERE Folio_Completo = @Folio_Completo',
	//Eliminar la solicitud, el estado de la solicitud y la orden de la soliciutd
	delSolicitud:
		'DELETE FROM Solicitud_Mantenimiento WHERE Folio_Completo = @Folio_Completo ' +
		'DELETE FROM Orden_Trabajo WHERE Folio_Completo = @Folio_Completo ' +
		'DELETE FROM Estado WHERE idEstatus = @idEstatus ',
	//Nueva solicitud = nueva solicitud sin id Estado, ponerle el id Estado de la solicitud recien creada(new solicitud y new Estado),
	// y para terminar crar la orden correspondiente a la solicitud
	getNuevaSolicitud:
		'SELECT TOP 1 Folio_Completo from Solicitud_Mantenimiento ORDER BY Folio_Completo DESC',
	getFolioxPeriodo:
		'SELECT MAX(Folio) AS Folio from Solicitud_Mantenimiento WHERE idPeriodo = @idPeriodo',
	newSolicitud:
		'INSERT INTO Solicitud_Mantenimiento (Folio_Completo, Clave_Area, Nombre_Solicitante ,Fecha_Elaboracion,Descripcion_Servicio_Falla,Lugar_Especifico, ' +
		'Horario_Atencion, Asignado_a, idEstatus, idPeriodo, Folio, RFC) ' +
		'VALUES (@Folio_Completo, @Clave_Area, @Nombre_Solicitante , @Fecha_Elaboracion, @Descripcion_Servicio_Falla, @Lugar_Especifico, ' +
		' @Horario_Atencion, @Asignado_a, @idEstatus, @idPeriodo, @Folio, @RFC) ' +
		'INSERT INTO Estado (idEstatus, Aceptado, Rechazado, En_proceso, Terminado_tecnico, Aprobado_admin, Aprobado_cliente) ' +
		'VALUES (@idEstatus, 0,0,0,0,0,0)',
	updateEstado:
		'UPDATE Estado SET Aceptado = @Aceptado, Rechazado = @Rechazado, En_proceso = @En_proceso, Terminado_tecnico = @Terminado_tecnico, ' +
		'Aprobado_admin = @Aprobado_admin, Aprobado_cliente = @Aprobado_cliente WHERE idEstatus = @idEstatus',
	newOrden:
		'INSERT INTO Orden_Trabajo (Folio_Completo, Mantenimiento_Interno, Tipo_Servicio, Asignado_a, Liberado_Por, Aprobado_Por) ' +
		'VALUES (@Folio_Completo, 1 , @Tipo_Servicio , @Asignado_a, @Liberado_Por, @Aprobado_Por)',
	updateOrdenAdmin:
		'UPDATE Orden_Trabajo SET Mantenimiento_Interno = @Mantenimiento_Interno, Tipo_Servicio = @Tipo_Servicio, ' +
		'Asignado_a = @Asignado_a WHERE Folio_Completo = @Folio_Completo',
	updateOrdenFecha:
		'UPDATE Orden_Trabajo SET Fecha_Realizacion = @Fecha_Realizacion, Fecha_Aprobacion = @Fecha_Realizacion, Fecha_Liberacion = @Fecha_Realizacion, ' +
		'No_Control = @No_Control, Trabajo_Realizado = @Trabajo_Realizado WHERE Folio_Completo = @Folio_Completo',
	updateCalifOrden:
		'UPDATE Orden_Trabajo SET Calificacion_Servicio = @Calificacion_Servicio, Comentario_Servicio = @Comentario_Servicio ' +
		'WHERE Folio_Completo = @Folio_Completo ' +
		'UPDATE Estado SET Aprobado_Cliente = 1 WHERE idEstatus = @Folio_Completo',

	//Queries de Areas
	getAreas: 'SELECT * FROM Areas',
	newArea:
		'INSERT INTO Areas (Clave_Area, Nombre) VALUES (@Clave_Area, @Nombre)',
	getArea: 'SELECT * FROM Areas WHERE Clave_Area = @Clave_Area',
	updateArea:
		'UPDATE Areas SET Nombre = @Nombre WHERE Clave_Area = @Clave_Area',
	delArea: 'DELETE FROM Areas WHERE Clave_Area = @Clave_Area',

	//Queries de Carreras

	//Queries de Problemas Frecuentes los unicos tipo de problemas que se deben de admitir son Admin o Cliente
	getProbelmas: 'SELECT * FROM Problemas_Frecuentes',
	getProbelmasByTipo: 'SELECT * FROM Problemas_Frecuentes WHERE Tipo = @Tipo',
	getProbelma:
		'SELECT * FROM Problemas_Frecuentes WHERE idProblema = @idProblema',
	newProbelma:
		'INSERT INTO Problemas_Frecuentes (Tipo, Descripcion) VALUES (@Tipo, @Descripcion)',
	updateProblema:
		'UPDATE Problemas_Frecuentes SET Tipo = @Tipo, Descripcion = @Descripcion WHERE idProblema = @idProblema',
	delProblema:
		'DELETE FROM Problemas_Frecuentes WHERE idProblema = @idProblema ',

	//Queries de Usuarios
	getAllUsers: 'SELECT * FROM Usuarios',
	getUsers: 'SELECT * FROM Usuarios WHERE id_Usuario = 1 OR id_Usuario = 2',
	getAdmins: 'SELECT * FROM Usuarios WHERE id_Usuario = 1',
	getUser:
		'SELECT DISTINCT * FROM Usuarios WHERE (id_Usuario = 1 OR id_Usuario = 2) AND RFC = @RFC',
	newUser:
		'INSERT INTO Usuarios (RFC, Contraseña, Nombres, id_Usuario, Estatus) VALUES (@RFC, @Contraseña,' +
		' @Nombres, @id_Usuario, 1 )',
	updateUser:
		'UPDATE Usuarios SET RFC = @RFC2 Nombres = @Nombres, id_Usuario = @id_Usuario WHERE RFC = @RFC',
	updateEstadoUser: 'UPDATE Usuarios SET Estatus = @Estatus WHERE RFC = @RFC',
	delUser: 'DELETE FROM Usuarios WHERE RFC = @RFC ',

	//Queries de Alumnos
	getAlumnos:
		'SELECT * FROM Usuarios WHERE id_Usuario = 3 ' +
		'SELECT * FROM Alumnos_Servicio',
	getAlumno:
		'SELECT * FROM Usuarios WHERE id_Usuario = 3 AND RFC = @RFC ' +
		'SELECT * FROM Alumnos_Servicio WHERE RFC = @RFC',
	newAlumno:
		'INSERT INTO Usuarios (RFC, Contraseña, Nombres, id_Usuario, Estatus) VALUES (@RFC, @Contraseña,' +
		' @Nombres, 3, 1  ) ' +
		'INSERT INTO Alumnos_Servicio (No_Control, Clave_Carrera, RFC) VALUES (@No_Control,' +
		' @Clave_Carrera, @RFC)',
	updateAlumnos:
		'UPDATE Usuarios SET RFC = @RFC2 Nombres = @Nombres WHERE RFC = @RFC ' +
		'UPDATE Alumnos_Servicio SET No_Control = @No_Control, Clave_Carrera = @Clave_Carrera WHERE RFC = @RFC ',
	delAlumno:
		'DELETE FROM Alumnos_Servicio WHERE RFC = @RFC ' +
		'DELETE FROM Usuarios WHERE RFC = @RFC ',

	getCarreras: 'SELECT * FROM Carreras',

	//configuraciones
	getConfigs: 'SELECT * FROM Configuraciones',
	getConfig: 'SELECT * FROM Configuraciones WHERE idConfig = @idConfig',
	upConfig:
		'UPDATE Configuraciones SET Valor = @Valor WHERE idConfig = @idConfig',
	getPeriodos: 'SELECT * FROM Periodos',
	getPeriodo: 'SELECT Periodo FROM Periodos WHERE idPeriodo = @idPeriodo',
	newPeriodo: 'INSERT INTO Periodos (Periodo) VALUES (@Periodo) ',
	delPeriodo: 'DELETE FROM Periodos WHERE idPeriodo = @idPeriodo',
	//idCOnfiguraciones 1=#Control 2=Periodo 3=Revision 4=Asignado a 5=Aprobado por

	//No hay opciones mas que Get para los tipos de Usuarios, tipo 1 = admin, tipo 2 = cliente, tipo 3 = alumno
	getTipoUser: 'SELECT * FROM Tipo_Usuarios',

	//Buscadores
	SolicitudesProcesoQuery:
		`SELECT * FROM Solicitud_Mantenimiento WHERE idPeriodo LIKE @idPeriodo  AND RFC LIKE @RFC AND  ` +
		`Nombre_Solicitante LIKE @Nombre_Solicitante AND Clave_Area LIKE @Clave_Area AND  Folio_Completo ` +
		` LIKE @Folio_Completo AND Asignado_a LIKE @Asignado_a AND Folio_Completo IN (SELECT idEstatus FROM Estado WHERE Aprobado_cliente = 0)`,
	SolicitudesTerminadaQuery:
		`SELECT * FROM Solicitud_Mantenimiento WHERE idPeriodo LIKE @idPeriodo  AND RFC LIKE @RFC AND  ` +
		`Nombre_Solicitante LIKE @Nombre_Solicitante AND Clave_Area LIKE @Clave_Area AND  Folio_Completo ` +
		` LIKE @Folio_Completo AND Asignado_a LIKE @Asignado_a AND Folio_Completo IN (SELECT idEstatus FROM Estado WHERE Aprobado_cliente = 1)`,
};
