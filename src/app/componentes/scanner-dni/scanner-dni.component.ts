import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-scanner-dni',
  templateUrl: './scanner-dni.component.html',
  styleUrls: ['./scanner-dni.component.scss'],
})
export class ScannerDNIComponent implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner) { }

  @Output() datosUsuario = new EventEmitter();

  ngOnInit() {}

  usuario;

  barScanneroptions : BarcodeScannerOptions = {
		formats: "PDF_417" 
	}; //PDF_417
	escanear() {
		this.barcodeScanner.scan(this.barScanneroptions).then(barcodeData => {
			console.log('Barcode data', barcodeData);
      var auxBarCode = barcodeData.text.split('@');
      
			this.usuario.nombre = auxBarCode[2];
			this.usuario.apellido = auxBarCode[1];
			this.usuario.dni = auxBarCode[4];
			this.usuario.sexo = auxBarCode[3];
      this.usuario.nombre = auxBarCode[2];
      
      this.datosUsuario.emit(this.usuario);

		}).catch(err => {
			console.log('Error', err);
		});
  }
  
}
