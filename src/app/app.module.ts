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

const routes:Routes=[
  {path:'',redirectTo:'/clientes',pathMatch:'full'},
  {path:'directivas',component:DirectivaComponent},
  {path:'clientes',component:ClientesComponent},
  {path:'clientes/form',component:FormComponent}
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
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
