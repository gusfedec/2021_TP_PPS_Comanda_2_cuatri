import { Roles } from './../../componentes/Roles/Roles';
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
    foto: "https://static8.depositphotos.com/1003938/910/v/600/depositphotos_9108382-stock-illustration-funny-cartoon-office-worker.jpg",
    mail:"",
    rol: Roles.Cliente,
    aprobado: false
  };
  
  pass1;
  pass2;
  tipoDeLogin = '';


  selectTipo(tipoLogin){
    this.tipoDeLogin = tipoLogin;
  }

  asignarFoto(url){
    this.usuario.foto = url;
  }

  ngOnInit() {
  }

  datosDeScanner(user){
    this.usuario = user;
  }
  
  spinner;
  async registrar(){
    var isDataGood = true;
    if(this.tipoDeLogin == 'anon'){
      isDataGood = this.validarAnon();
      this.usuario.aprobado = true;
    }
    else{
      isDataGood = this.validarCompleto()
      this.usuario.aprobado = false;
    }

    if(!isDataGood){
      return;
    }

    this.spinner = true;

    if(this.tipoDeLogin != 'anon'){
      var user = {
        email : this.usuario.mail,
        password : this.pass1
      };

      await this.fireAuth.signIn(user);
    }


    this.fireAuth.saveNewEntity(FirebaseAuth.users, this.usuario).then(response => {
      this.spinner = false;
    });

  }

  validarCompleto(){
    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(this.usuario.apellido == ''){
      this.MostarMensaje("Completar Apellido.");
      return false;
    }
    else if(this.usuario.dni == ''){
      this.MostarMensaje("Completar DNI.");
      return false;
    }
    else if(this.usuario.mail == ''){
      this.MostarMensaje("Completar E-mail.");
      return false;
    }
    else if (!this.usuario.mail.match(EMAIL_REGEX)) {
			this.MostarMensaje("Formato de mail inválido.");
			return false;
		}
    else if(this.pass1 == ''){
      this.MostarMensaje("Completar Contraseña.");
			return false;
    }
    else if(this.pass2 == ''){
      this.MostarMensaje("Repetir Contraseña.");
			return false;
    }
    else if(this.pass2 != this.pass1){
      this.MostarMensaje("Las contraseñas deben coincidir.");
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
