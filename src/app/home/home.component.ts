import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  unitValor: Number = 7.00 ;

  constructor() { }

  ngOnInit() {

    // console.log('asdfsadfsadfasdfasdf');
  }

}
