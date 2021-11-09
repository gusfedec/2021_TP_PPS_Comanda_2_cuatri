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


  constructor(public fireAuth: FirebaseAuth) { }

  ngOnInit() {
  }

  redirect(event){
    var user = AuthServiceService.usuario[0];

    if(event == 'Lista de Espera'){
      //se pone al cliente en Lista de Espera a mesa.  
      user.waitingForTable = true;
      this.fireAuth.saveExistingEntity(FirebaseAuth.users, user, user.id);
    }

    this.redirectTo.emit(event);
  }



}
