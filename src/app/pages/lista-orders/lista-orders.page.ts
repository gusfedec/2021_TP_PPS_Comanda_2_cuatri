import { OrderStatus } from './../../componentes/OrderStatus/OrderStatus';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseAuth } from '../../services/firebase-auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-orders',
  templateUrl: './lista-orders.page.html',
  styleUrls: ['./lista-orders.page.scss'],
})
export class ListaOrdersPage implements OnInit {

  constructor(public fireAuth: FirebaseAuth) {}

  orders = [];
  spinner = true;

  ngOnInit(): void {
    this.fireAuth.bringEntityWithFilterKeyValue(FirebaseAuth.orders, "status",  OrderStatus.Nuevo, this.orders);
    var counter = 0;
    let intervalId = setInterval(() => {
      this.spinner = false;
    }, 2000);

  }

  ngAfterViewInit()	{
  }


  @Input() sourceType;
	@Output() linkFoto = new EventEmitter();

  aceptar(cliente){
    cliente.aprobado = true;
    cliente.status = OrderStatus.EnPreparacion;
    this.fireAuth.saveExistingEntity(FirebaseAuth.orders, cliente, cliente.id).then(result => {
      this.presentSwal('Enviado a cocina.');
    });

  }

  denegar(cliente){
    cliente.aprobado = false;
    cliente.status = OrderStatus.Rechazado;
    this.fireAuth.saveExistingEntity(FirebaseAuth.orders, cliente, cliente.id).then(result => {
      this.presentSwal('Rechazado.');
    });  
  }

  
  presentSwal(stringWord){
		Swal.fire(
			{
			title: 'Pedido Actualizado!',
			text: 'El Pedido fue' + stringWord,
			icon: 'success',
			}
		  );

		//this.router.navigate(['/tabs/tab2']);
	}


}
