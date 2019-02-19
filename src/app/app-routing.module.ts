import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { DataFormComponent } from './data-form/data-form.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dataForm' },
  { path: 'home', component: HomeComponent },
  { path: 'templateForm', component: TemplateFormComponent },
  { path: 'dataForm', component: DataFormComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes)] ,
  exports: [ RouterModule ]

})
export class AppRoutingModule { }

