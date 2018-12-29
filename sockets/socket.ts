//Aqui va toda la logica de los sockets
import {Socket} from 'socket.io';
import socketIO from "socket.io";

export const desconectar = (cliente: Socket) => {
	cliente.on("disconnect", () => {
				console.log("Cliente desconectado");
			});

}

//escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
	//Aqui un cliente escucha un mensaje
	//Quieres emitir todos los mensajes a los clientes que estan conectados
	cliente.on("mensaje", (payload: {de: string, cuerpo: string}) => {
		console.log("Mensaje recibido ", payload);
		io.emit("mensaje-nuevo", payload);
	});
}