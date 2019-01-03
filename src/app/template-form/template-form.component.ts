import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Form } from '@angular/forms';



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
  constructor(private http: Http) { }

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

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {

      this.clearForm(form);
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {

        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .subscribe(dados => this.setDadosForm(dados.json(), form));
      }
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
