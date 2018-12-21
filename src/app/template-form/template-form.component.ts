import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: 'Rodrigo',
    email: 'rodrigo@email.com'
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(formulario: any) {

    console.log(formulario.value);
  }

}
