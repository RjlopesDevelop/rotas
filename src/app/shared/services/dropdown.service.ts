import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { StateBr } from '../models/state-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getStateBr() {
    return this.http.get<StateBr[]>('assets/dados/stateBr.json');
  }

  getOffice() {
    return[
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr' },
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' },
      {nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr' }
    ];
  }
}
