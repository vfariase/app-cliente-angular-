import { Component } from '@angular/core';


//app.component.css sería nuestro componente principal o por defecto,
//a partit de este componente podemos agregar otros Un componente se puede anidar dentro de otro con un componente fijo o bien un componente padre podría
// estar formado por varios componentes hijos se conoce como el patrón de diseño composites o compositor.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido a angular';

  curso ='Curso Spring 5 con angular 7';
  profesor: string = 'Victor Farías Estay'
}
