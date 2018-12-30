//Aqui va toda la logica de los sockets
//Si la persona recarga la aplicacion esto genera una nueva comunicacion  NUESTRO SERVIDOR DE SOCKETS
//por consecuencia genera un nuevo id del socket
import {Socket} from 'socket.io';
import socketIO from "socket.io";
import {UsuariosLista} from '../classes/usuarios-lista';
import {Usuario} from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {
	const usuario = new Usuario(cliente.id);
	usuariosConectados.agregar(usuario);
	
}

export const desconectar = (cliente: Socket, io: socketIO.Server) => {
	cliente.on("disconnect", () => {
			usuariosConectados.borrarusuario(cliente.id);
			io.emit('usuarios-activos', usuariosConectados.getLista());

				console.log("Cliente desconectado");
			});

}
//Fijate que el cliente continee todo lo que se le manda al momento de emitir algo
//osea el payload y el callback

//escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
	//Aqui un cliente escucha un mensaje
	//Quieres emitir todos los mensajes a los clientes que estan conectados
	cliente.on("mensaje", (payload: {de: string, cuerpo: string}) => {
		console.log("Mensaje recibido ", payload);
		io.emit("mensaje-nuevo", payload);
	});
}

export const configurar_usuario = (cliente: Socket, io: socketIO.Server) => {

	cliente.on("configurar-usuario", (payload: {nombre: string}, callback: Function) => {
		usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
		io.emit('usuarios-activos', usuariosConectados.getLista());
		callback(payload);
	})
}

//Obtener usuarios, emitir unicamente al usuario que la esta soliccitando
//basicamente va a emitir eso

export const obtener_usuario = (cliente: Socket, io: socketIO.Server) => {
	cliente.on("obtener-usuario", () => {
		//Se lo emite a todos
		//io.emit('usuarios-activos', usuariosConectados.getLista());
		//Se lo emite solo al cleinte, unicamente a la persona que se esta conectando
		io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
	})
}