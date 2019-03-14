import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { StateBr } from '../shared/models/state-br';
import { DropdownService } from '../shared/services/dropdown.service';
import { CepSearchService } from '../shared/services/cep-search.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
  flagActive = false;

  formulario: FormGroup;
  // states: StateBr[];
  states: Observable<StateBr[]>;
  offices: any[];

  constructor( private formBuilder: FormBuilder,
               private http: HttpClient,
               private dropdownService: DropdownService,
               private cepSearchService: CepSearchService,
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
      }),
      office: [null]
    });

    this.states = this.dropdownService.getStateBr();
    // console.log(this.formulario);
   // this.dropdownService.getStateBr().subscribe(dados => {this.states = dados; console.log(dados); } );
   this.offices = this.dropdownService.getOffice();


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

    const cep = this.formulario.get('endereco.cep').value;

    // Verifica se campo cep possui valor informado.
    if (cep != null && cep !== '') {
       this.clearForm();
       this.cepSearchService.getCep(cep).subscribe(dados => this.setDadosForm(dados));
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
  setDadosForm(dados) {
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

  setoffice() {
   const office =  {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
   this.formulario.get('office').setValue(office);
  }
  compareOffice(obj1, obj2) {
return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 && obj2 ;
  }
}
