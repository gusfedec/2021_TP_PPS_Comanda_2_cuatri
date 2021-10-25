import { Component } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  usuario = AuthServiceService.usuario;

  public appPages = [
    { title: 'logIn', url: 'login', icon: 'log-in', rol: '' },
    {
      title: 'Alta Empleado',
      url: 'alta-empleado',
      icon: 'construct',
      rol: 'Administrador',
    },
    {
      title: 'Alta Empleado',
      url: 'alta-empleado',
      icon: 'construct',
      rol: 'Dueño',
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
