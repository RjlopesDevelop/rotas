import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHero } from './hero.interface';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  unitValor = 7.00;
  avengers: IHero;


  constructor(private homeService: HomeService) {
  }

  ngOnInit() {
    // console.log('lista end oninit', this.avengers);
  }

  public getAvengers(): void {
    try {
      // this.http.get(`http://localhost:5000/api/values`).subscribe((response: IHero) => this.avengers = response);
      this.homeService.getAvengers().subscribe(
        (response: IHero) => this.avengers = response,
        error => console.error(error));
    } catch (error) {
      console.error(error);
    }
  }
  public setHero(model: IHero): void {
    console.log('setHero', model);
    try {
      this.homeService.postHero(model).subscribe((response: any) => console.log('resposta: ', response));
    } catch (error) {
      console.error(error);
    }


  }

}
