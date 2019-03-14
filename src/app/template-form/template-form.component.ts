import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CepSearchService } from '../shared/services/cep-search.service';




@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: '',
    email: ''
  };
  flagActive = false;
  constructor(private http: HttpClient,
              private cepSearchService: CepSearchService) { }

  ngOnInit() {
  }

  onSubmit(formulario: any) {

    console.log(formulario.value);
    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
    .subscribe(dados => console.log( dados ));
  }

  getvalidTouched(campo: any) {
    return (!campo.valid && campo.touched);
  }
  getCep(cep: string, form: any) {

    // Verifica se campo cep possui valor informado.
    if (cep != null && cep !== '') {
      this.clearForm(form);
      this.cepSearchService.getCep(cep).subscribe(dados => this.setDadosForm(dados, form));
   }
  }
  setDadosForm(dados: any, formulario: any) {
    // ativa classe label
    this.flagActive = true;

    formulario.form.patchValue({
      endereco: {
        bairro: dados.bairro,
        cep: dados.cep,
        cidade: dados.localidade,
        complemento: dados.complemento,
        estado: dados.uf,
        rua: dados.logradouro
      }
    });

  }

  clearForm(formulario: any) {
    formulario.form.patchValue({
      endereco: {
        bairro: null,
        cidade: null,
        complemento: null,
        estado: null,
        rua: null
      }
    });
  }

}
