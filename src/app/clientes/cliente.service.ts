import  swal  from 'sweetalert2';
//import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Injectable } from '@angular/core';
import {Observable,of,throwError} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {map,catchError} from 'rxjs/operators';
import {formatDate} from '@angular/common';

//catchError se encarga de interceptar el observable  en busca de fallas.


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint:string='http://localhost:8090/api/clientes';
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'})

  constructor(private httpClient: HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    return this.httpClient.get(this.urlEndpoint).pipe(
      map(response => {
        let clientes=response as Cliente[];
       return clientes.map(cliente =>{
                cliente.nombre = cliente.nombre.toUpperCase();
                cliente.fecha=formatDate(cliente.fecha,'dd-MM-yyyy','En-US');
                return cliente; 
       });
      })
      
      )}

  create(cliente: Cliente): Observable<Cliente[]>{
    return this.httpClient.post(this.urlEndpoint,cliente,{headers:this.httpHeaders}).pipe(
      map(response =>response as Cliente[])  
      ).pipe(catchError( e=>{
                      
        return throwError(e);
      })
      )
  }

  getCliente(id):Observable<Cliente>{
      return this.httpClient.get<Cliente>(`${this.urlEndpoint}/${id}`,{headers:this.httpHeaders}).
      pipe(catchError(e => {
         console.error(e.error.mensaje);
         swal.fire('Error al obtener al cliente',e.error.mensaje,'error');            
         return throwError(e);
      }))
  }


  update(cliente:Cliente):Observable<Cliente>{
    
    return this.httpClient.put<Cliente>(`${this.urlEndpoint}/${cliente.id}`,cliente,{headers:this.httpHeaders})
    .pipe(catchError(e =>{
      console.error(e.error.mensaje);
      swal.fire('Error al modificar',e.error.mensaje,'error');            
      return throwError(e);      
    }));
}

  delete(id:Number):Observable<Cliente>{
    return this.httpClient.delete<Cliente>(`${this.urlEndpoint}/${id}`,{headers:this.httpHeaders})
    .pipe(catchError(e => {
      console.error(e.error.mensaje);
      swal.fire('Error al eliminar',e.error.mensaje,'error');            
      return throwError(e);
      }));
  }

}

