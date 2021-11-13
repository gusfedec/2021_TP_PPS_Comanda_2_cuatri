import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { FirebaseAuth } from '../../services/firebase-auth';
import Swal from 'sweetalert2';

import { Roles } from './../../componentes/Roles/Roles';
import { OrderStatus } from './../../componentes/OrderStatus/OrderStatus';
import { ProductStatus } from './../../componentes/ProductStatus/ProductStatus';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.page.html',
  styleUrls: ['./pagar.page.scss'],
})
export class PagarPage implements OnInit {

  constructor(public fireAuth: FirebaseAuth) { }
  usuario = AuthServiceService.usuario;


  spinner = false;
  orders = [];

  ngOnInit() {
    this.spinner = true;
		this.fireAuth.bringEntityWithFilterKeyValue(FirebaseAuth.orders, "table.assignedTo.mail" , this.usuario[0].mail, this.orders);

    let intervalId = setInterval(() => {
      this.spinner = false;
    }, 2000);

  }

  calcularPropina(order){
    var total = Number(order.total);
    var descuento = Number(order.descuento);
    var propina = Number(order.propina);
    
    return (total - total * (descuento/100)) + (total * (propina/100));
  }

}
