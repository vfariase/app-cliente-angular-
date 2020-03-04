import { ClienteService } from './clientes/cliente.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { from } from 'rxjs';
import { ClientesComponent } from './clientes/clientes.component';
import { DirectivaComponent } from './directiva/directiva.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientesComponent,
    FooterComponent,
    DirectivaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
