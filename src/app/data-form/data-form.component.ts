import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';


@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
  flagActive = false;

  formulario: FormGroup;
  constructor( private formBuilder: FormBuilder,
               private http: Http
    ) { }

  ngOnInit() {

    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null)
    // });

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, Validators.email]],
        numero: [null, [Validators.required, Validators.email]],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    });

    // console.log(this.formulario);
  }
  onSubmit() {

    if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .subscribe(dados => {
          console.log(dados);
          // limpa o fomulario
          this.resetar();
        },
          (error: any) => alert('ops deu erro')
        );
    } else {
     this.verificaValidacoesForm(this.formulario);
    }

  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsTouched();
      if (controle instanceof FormGroup ) {
        this.verificaValidacoesForm(controle);
      }
    });
  }
  resetar() {
    this.formulario.reset();
  }
  getvalidTouched(campo: string) {
   return (!this.formulario.get(campo).valid  && this.formulario.get(campo).touched );
  }

  getCep() {

    let cep = this.formulario.get('endereco.cep').value;

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {

      this.clearForm();
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {

        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .subscribe(dados => this.setDadosForm(dados.json()));
      }
    }
  }
  clearForm() {
    this.formulario.patchValue({
      endereco: {
        bairro: null,
        cidade: null,
        complemento: null,
        estado: null,
        rua: null
      }
    });
  }
  setDadosForm(dados: any) {
    // ativa classe label
     this.flagActive = true;

    this.formulario.patchValue({
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
}
