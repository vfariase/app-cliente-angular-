import { Cliente } from './cliente';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
  })
export class FormComponent implements OnInit {

  public cliente:Cliente=new Cliente();
  titulo: string = "Crear Clientes";
  constructor() { }

  ngOnInit(): void {
  }

  create():void{
    console.log("Crear clientes");
    console.log("test clientes");
  }
}
