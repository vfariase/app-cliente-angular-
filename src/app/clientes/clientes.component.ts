import { ClienteService } from './cliente.service';
import { CLIENTES } from './clientes.json';
import { Component, OnInit} from '@angular/core';
import {Cliente} from './cliente';
import swal from 'sweetalert2';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{
 
   clientes : Cliente[];
  
  constructor(private clienteService:ClienteService) { }
 
  ngOnInit(){
    this.clienteService.getClientes().pipe(
      tap(clientes =>{
        console.log("clientesComponent tap:3");
         clientes.forEach(cliente => {
           console.log("Clientes : "+cliente);
         });
      })
    ).subscribe(
          (clientes)=>{
         this.clientes=clientes
         
      }
    );
  }


  delete(cliente:Cliente){
     
      console.log("metodo  eliminar : "+cliente.id)
     swal.fire({
      title: 'Estás seguro de eliminar?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(cliente.id).subscribe(
          ()=>{
            this.clientes =this.clientes.filter(cli => cli != cliente)
            swal.fire(
              'Eliminado!',
              'Tu Archivo ha sido eliminado.',
              'success'
            )
          }
        )

      }
    })
  }

}
