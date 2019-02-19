import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  unitValor = 7.00 ;
  values: any[] = [];


  constructor(private http: Http ) { }

  ngOnInit() {

  }

  public getValues(): void {
    try {
      this.http.get(`http://localhost:5000/api/values`).subscribe( response => this.values = response.json());
    } catch (error) {
      console.error(error);
    }
  }

}
