import { ClienteService } from './clientes/cliente.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms'; 

import { AppComponent } from './app.component';

import { from } from 'rxjs';
import { ClientesComponent } from './clientes/clientes.component';
import { DirectivaComponent } from './directiva/directiva.component';
import {RouterModule,Routes} from '@angular/router';
import { FormComponent } from './clientes/form.component'

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeES, 'es');

const routes:Routes=[
  {path:'',redirectTo:'/clientes',pathMatch:'full'},
  {path:'directivas',component:DirectivaComponent},
  {path:'clientes',component:ClientesComponent},
  {path:'clientes/form',component:FormComponent},
  {path:'clientes/form/:id',component:FormComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientesComponent,
    FooterComponent,
    DirectivaComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    
  ],
  providers: [ClienteService,{provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
