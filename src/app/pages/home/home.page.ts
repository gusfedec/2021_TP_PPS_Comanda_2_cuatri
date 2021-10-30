import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  @Output() redirectTo = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  redirect(event){
    this.redirectTo.emit(event);
  }

}
