import { ListadoClientesPage } from './../pages/listado-clientes/listado-clientes.page';
import { AltaMesaPage } from './../pages/alta-mesa/alta-mesa.page';
import { SpinnerComponent } from './../componentes/spinner/spinner.component';
import { ScannerDNIComponent } from './../componentes/scanner-dni/scanner-dni.component';
import { CamaraDeFotosComponent } from './../componentes/camara-de-fotos/camara-de-fotos.component';
import { AltaEmpleadoComponent } from './../componentes/alta-empleado/alta-empleado.component';
import { LoginPage } from '../pages/login/login.page';

import { AltaClientePage  } from '../pages/alta-cliente/alta-cliente.page';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [FolderPage, LoginPage, AltaEmpleadoComponent, AltaClientePage, CamaraDeFotosComponent, ScannerDNIComponent, SpinnerComponent, AltaMesaPage, ListadoClientesPage]
})
export class FolderPageModule {}
