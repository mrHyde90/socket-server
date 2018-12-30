//npm install @types/express --save-dev
//npm install @types/socket.io --save-dev
import express from "express";
import {SERVER_PORT} from "../global/environment";
import socketIO from "socket.io";
//porque express y socketio no trabajan bien juntos
import http from "http";
import * as socket from '../sockets/socket';

export default class Server {
	private static _instance: Server;
	public app: express.Application;
	public port: number;
	//el io tiene el control y el conocimiento de que personas estan conectadas
	public io: socketIO.Server;
	private httpServer: http.Server;

	//private para el singleton
	private constructor(){

		this.app = express();
		this.port = SERVER_PORT	;
		//creamos un nuevo http y mandamos la confi de la app de express
		this.httpServer = new http.Server(this.app);
		this.io = socketIO(this.httpServer);

		this.escucharSockets();
	}

	//para regresar els ingleton
	public static get instance(){
		//regresa la instancia, si no se encuentra entonces el instance agarra la clase
		return this._instance || (this._instance = new this());
	}

	//private porque solo se usara al inicio de la clase
	private escucharSockets(){
		console.log("escuchando sockets");
		//conectando los sockets
		this.io.on("connection", cliente  => {
			//Aqui es donde sucedera toda la magia
			//id del socket, cuando se conecta alguien
			console.log(cliente.id);

			//Conectar cliente
			socket.conectarCliente(cliente);

			//Login
			socket.configurar_usuario(cliente, this.io);

			//Mensajes
			socket.mensaje(cliente, this.io);
			
			//desconectar
			socket.desconectar(cliente);

		});
	}

	start(callback: Function){
		this.httpServer.listen(this.port, callback);
	}
}