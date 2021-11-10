import { AuthServiceService } from './../../services/auth-service.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { FirebaseAuth } from '../../services/firebase-auth';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  @Output() redirectTo = new EventEmitter();
  @Output() showError = new EventEmitter();


  constructor(public fireAuth: FirebaseAuth) { }

  ngOnInit() {
  }

  mesas = [];

  async redirect(event){
    var user = AuthServiceService.usuario[0];

    if(event == 'Lista de Espera'){
      //se pone al cliente en Lista de Espera a mesa.  
      user.waitingForTable = true;
      

      this.fireAuth.saveExistingEntity(FirebaseAuth.users, user, user.id).then(resp=>{
        AuthServiceService.usuario[0] = user;
      });
    }
    
    if(event.search('Mesa ') > -1){
      console.log('Inside');
      //se pone al cliente en Lista de Espera a mesa. 
      try{
        await this.asignarClienteAMesa(user, event); 
      }
      catch(error){
        this.MostarMensaje(error.message);
        return;
      }
    }


    this.redirectTo.emit(event);
  }



  async asignarClienteAMesa(user, qrValue){
    console.log("user", user);
    if(user == null || user == undefined)
      throw new Error("Primero debe loggearse.");
    if(user.waitingForTable == null || user.waitingForTable == undefined || user.waitingForTable == "false"){
      throw new Error("El usuario no esta en Lista de Espera, escanear el QR para estarlo.");
    }

      var table = await this.fireAuth.getEntityOneTime(FirebaseAuth.mesas, "qrValue", qrValue);

    if(table.assignedTo == null || table.assignedTo == undefined || table.assignedTo == ""){
      table.assignedTo = user;
    }
    else{
      throw new Error("Esta mesa ya esta siendo usada por el cliente " + table.assignedTo.nombre  );
    }

      this.fireAuth.saveExistingEntity(FirebaseAuth.mesas, table, table.id);
      console.log("table", table);
  }



  Mensajes;
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
