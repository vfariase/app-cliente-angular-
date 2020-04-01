import { ActivatedRoute } from '@angular/router';
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
   paginador : any;
  constructor(private clienteService:ClienteService, private activatedRoute:ActivatedRoute) { }
 
  ngOnInit(){

   
    this.activatedRoute.paramMap.subscribe(params =>{
      let page:number = +params.get('page');
      console.log('inicio de metodo page :'+page);
      if(!page){
        page =0;
      }
    
    this.clienteService.getClientes(page).pipe(
      tap(response =>{
        console.log("clientesComponent tap:3");
        console.log("page :"+page);
           (response.content as Cliente[]).forEach(cliente => {
           console.log("Clientes : "+cliente.nombre);
         });
      })
    ).subscribe(
         response=>{
           console.log("En el susbcribe");
           this.clientes=response.content as Cliente[];
           this.paginador=response;
      }
    );
  })}


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
