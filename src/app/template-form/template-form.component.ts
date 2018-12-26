import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  onSubmit(formulario: any) {

    console.log(formulario.value);
  }

  getvalidTouched(campo: any) {
    return (!campo.valid && campo.touched);
  }

}
