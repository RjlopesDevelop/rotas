import { ptbrLocale } from './shared/pt-br-locale';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { SettingsService } from './shared/settings.service';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { TemplateFormModule } from './template-form/template-form.module';
import { DataFormModule } from './data-form/data-form.module';
// import { MaterializeModule } from 'angular2-materialize';

registerLocaleData(localePt);


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    TemplateFormModule,
    DataFormModule
    // MaterializeModule
  ],
  providers: [
    /*{
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }*/
    SettingsService,
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: ptbrLocale
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
