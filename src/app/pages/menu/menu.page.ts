import { OrderStatus } from './../../componentes/OrderStatus/OrderStatus';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseAuth } from "../../services/firebase-auth";
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
	selector: "app-menu",
	templateUrl: "./menu.page.html",
	styleUrls: ["./menu.page.scss"],
})
export class MenuPage implements OnInit {
	constructor(public fireAuth: FirebaseAuth) { }


	
	@Output() showError = new EventEmitter();

	productos = [];
	mesas = [];
	ngOnInit() {
		this.fireAuth.bringEntity(FirebaseAuth.productos, this.productos);
		this.fireAuth.bringEntity(FirebaseAuth.mesas, this.mesas);
	}

	moreQuantity(product) {
		if (product.quantity == null || product.quantity == undefined)
			product.quantity = 0;
		
		this.totalPrice += Number(product.price);

		if(product.tiempo != undefined)
			this.totalTime += Number(product.tiempo);

		product.quantity += 1;
	}

	lessQuantity(product) {
		if (product.quantity == null || product.quantity == undefined)
			product.quantity = 0;

		if (product.quantity > 0){
			product.quantity -= 1;
			this.totalPrice -= Number(product.price);
			this.totalTime -= Number(product.tiempo);
		}
	}

	user = AuthServiceService.usuario;
	totalPrice : number = 0;
	totalTime = 0;


	crearOrder() {
		var productsInOrder = [];
		console.log("user", this.user);

		this.productos.forEach((prod) => {
			console.log(prod);
			if (prod.quantity > 0) {
				productsInOrder.push(prod);
			}
		});

		if(productsInOrder.length > 0){

			var order = {
				products: productsInOrder,
				table: '',
				price: this.totalPrice,
				status: OrderStatus.Nuevo
			};
			
			this.mesas.forEach(mesa =>{
				if(mesa.assignedTo != null && mesa.assignedTo != undefined && mesa.assignedTo != ''){
					if(mesa.assignedTo.mail == this.user[0].mail){
						order.table = mesa;
						return;
					}
				}
			});

			console.log(order);
			this.fireAuth.saveNewEntity(FirebaseAuth.orders, order);

			
		}
		else{
			this.showError.emit("Debe elegir algún producto para crear la orden.");
		}


		
	}
}
