import { AltaEmpleadoComponent } from './../componentes/alta-empleado/alta-empleado.component';
import { LoginPage } from './../auth/login/login.page';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule
  ],
  declarations: [FolderPage, LoginPage, AltaEmpleadoComponent]
})
export class FolderPageModule {}
