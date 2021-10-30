import { Component } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { Roles } from './componentes/Roles/Roles';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  usuario = AuthServiceService.usuario;

  public appPages = [
    /*     { title: 'logIn', url: '/folder/Log In', icon: 'log-in', rol: '' },
    
     */ 
    {
      title: 'Principal',
      url: '/folder/Home',
      icon: 'home',
      rol: ''
    },
    {
      title: 'Alta Empleado',
      url: '/folder/Alta Empleado',
      icon: 'construct',
      rol: Roles.Administrador,
    },
    {
      title: 'Alta Empleado',
      url: '/folder/Alta Empleado',
      icon: 'construct',
      rol: Roles.Dueño,
    },
    {
      title: 'Alta Mesa',
      url: '/folder/Alta Mesa',
      icon: '',
      rol: Roles.Administrador,
      img: 'https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/1019203.png?alt=media&token=1175dadb-4282-497a-9ae8-9fc65a70a900',
    },
    {
      title: 'Alta Mesa',
      url: '/folder/Alta Mesa',
      icon: '',
      rol: Roles.Dueño,
      img: 'https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/1019203.png?alt=media&token=1175dadb-4282-497a-9ae8-9fc65a70a900',
    },
    {
      title: 'Alta Cliente',
      url: '/folder/Alta Cliente',
      icon: 'person-add',
      rol: '',
    },
    {
      title: 'Listado Cliente',
      url: '/folder/Listado Cliente',
      icon: '',
      rol: Roles.Administrador,
      img: 'https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/listadoClientes.png?alt=media&token=af3333ae-4098-4836-88b5-ecb3d264efc2',
    },
    {
      title: 'Listado Cliente',
      url: '/folder/Listado Cliente',
      icon: '',
      rol: Roles.Dueño,
      img: 'https://firebasestorage.googleapis.com/v0/b/comanda-be3d2.appspot.com/o/listadoClientes.png?alt=media&token=af3333ae-4098-4836-88b5-ecb3d264efc2',
    },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor() {}
}
