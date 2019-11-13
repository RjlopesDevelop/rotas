import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IHero } from './hero.interface';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) { }

  public getAvengers(): Observable<IHero> {
    return this.http.get(`http://localhost:5000/api/values`).pipe(
      map((result: IHero) => result),
      catchError((err: HttpErrorResponse) => throwError(console.error()))
    );
  }
  /**
   * post
   */
  public postHero(model: IHero): Observable<string> {
    return this.http.put<string>(`http://localhost:5000/api/values/id`, model, this.httpOptions).pipe(
      map((response: any) => response)
    );
  }
}
