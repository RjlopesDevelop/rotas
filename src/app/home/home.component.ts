import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHero } from './IHero';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  unitValor = 7.00 ;
  avengers: IHero;


  constructor(private http: HttpClient) {
    }

  ngOnInit() {
console.log('lista end oninit', this.avengers);
  }

  public getAvengers(): void {
    try {
      this.http.get(`http://localhost:5000/api/values`).subscribe( (response: IHero) => this.avengers = response);
    } catch (error) {
      console.error(error);
    }
  }

}
