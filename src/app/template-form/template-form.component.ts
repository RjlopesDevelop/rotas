import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';



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

  constructor(private http: Http) { }

  ngOnInit() {
  }

  onSubmit(formulario: any) {

    console.log(formulario.value);
  }

  getvalidTouched(campo: any) {
    return (!campo.valid && campo.touched);
  }
  getCep(cep: any) {

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {

      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {

        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .subscribe(dados => console.log('retorno', dados.json()));
      }
    }
  }

}
