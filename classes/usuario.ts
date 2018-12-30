export class Usuario{
	//id del cliente o suaruio que se concecte dentro del socket
	public id: string;
	//un usuario al momento de conectarse no va tener nombre
	public nombre: string;
	//sala en el que se encuentra el usaurio conectado
	public sala: string;
	constructor(id: string) {
		this.id = id;
		this.nombre = "sin-nombre";
		this.sala = "sin-sala";
	}
}