import { Component, OnInit } from '@angular/core';
import { FirebaseAuth } from '../../services/firebase-auth';

@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.page.html',
  styleUrls: ['./alta-cliente.page.scss'],
})
export class AltaClientePage implements OnInit {

  constructor(public fireAuth: FirebaseAuth) { }

  Mensajes;


  usuario = {
    nombre:"",
    apellido: "",
    dni: "",
    foto: "https://static8.depositphotos.com/1003938/910/v/600/depositphotos_9108382-stock-illustration-funny-cartoon-office-worker.jpg"
  };
  
  asignarFoto(url){
    this.usuario.foto = url;
  }

  ngOnInit() {
  }

  datosDeScanner(user){
    this.usuario = user;
  }
  
  spinner;
  registrar(tipo){
    var isDataGood = true;
    if(tipo == 'anonimo'){
      isDataGood = this.validarAnon();
    }
    else{
      isDataGood = this.validarCompleto()
    }

    if(!isDataGood){
      return;
    }

    this.spinner = true;
    this.fireAuth.saveNewEntity(FirebaseAuth.clientes, this.usuario).then(response => {
      this.spinner = false;
    });

  }

  validarCompleto(){
    if(this.usuario.apellido == ''){
      this.MostarMensaje("Completar Apellido");
      return false;
    }
    if(this.usuario.dni == ''){
      this.MostarMensaje("Completar DNI");
      return false;
    }
    return this.validarAnon();
  }

  validarAnon(){
    if(this.usuario.nombre == ''){
      this.MostarMensaje("Completar Nombre");
      return false;
    }
   
    if(this.usuario.foto == ''){
      this.MostarMensaje("Subir foto");
      return false;
    }

    return true;
  }

  MostarMensaje(mensaje: string = "este es el mensaje", ganador: boolean = false) {
		this.Mensajes = mensaje;
		var x = document.getElementById("snackbar");
		if (ganador) {
			x.className = "show Ganador";
		} else {
			x.className = "show Perdedor";
		}
		var modelo = this;
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 3000);
		console.info("objeto", x);
	}

}
