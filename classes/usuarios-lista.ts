import {Usuario} from './usuario';

export class UsuariosLista {
	private lista: Usuario[] = [];
	
	constructor() {}

	//agregar un usuario
	public agregar(usuario: Usuario){
		this.lista.push(usuario);
		console.log(this.lista);
		return usuario;
	}

	//actualizar el nombre de un usuario
	public actualizarNombre(id: string, nombre: string) {
		for (let usuario of this.lista) {
			if(usuario.id === id){
				usuario.nombre = nombre;
				break;
			}
		}
		console.log("====== Actualizando usuario ======");
		console.log(this.lista);
	}

	//obtener la listaa de usuarios
	public getLista(){
		return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
	}

	//obtener un usuario
	public getUsuario(id: string){
		return this.lista.find(usuario => usuario.id === id);
	}

	//obtener todos los usuarios en una sala
	public getUsuariosEnSala(sala: string){
		return this.lista.filter(usuario => usuario.sala === sala);
	}

	//borrar un usuario
	public borrarusuario(id:string){
		const tempUsuario = this.getUsuario(id);
		this.lista = this.lista.filter(usuario => usuario.id !== id);
		console.log(this.lista);
		return tempUsuario;
	}
}