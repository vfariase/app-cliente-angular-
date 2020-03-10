import { Cliente } from './cliente';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
  })
export class FormComponent implements OnInit {

  public cliente:Cliente=new Cliente();
  public titulo: string = "Crear Clientes";
  
  constructor(private clienteService: ClienteService, private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  create():void{
    console.log("cliente : nombre"+ this.cliente.nombre);
    this.clienteService.create(this.cliente).
    subscribe(cliente=>{
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo cliente',`Cliente, creado con exito`,'success')
      }
    );
  }

  cargarCliente(){
    this.activatedRoute.params.subscribe(
      params=>{
        let id=params['id'];
        console.log("valor id :"+id)
        if(id)
        {
          this.clienteService.getCliente(id).subscribe(
            cliente=> this.cliente=cliente
          )
        }
        
      }
    );
  }
}
