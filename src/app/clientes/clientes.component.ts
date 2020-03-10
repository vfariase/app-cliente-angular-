import { ClienteService } from './cliente.service';
import { CLIENTES } from './clientes.json';
import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
import swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{
 
   clientes : Cliente[];
  
  constructor(private clienteService:ClienteService) { }
 
  ngOnInit(){
    this.clienteService.getClientes().subscribe(
      (clientes)=>{
         this.clientes=clientes
         
      }
    );
  }

}
