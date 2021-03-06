import { Router } from '@angular/router';
import  swal  from 'sweetalert2';
//import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Injectable } from '@angular/core';
import {Observable,of,throwError} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {map,catchError,tap} from 'rxjs/operators';
import { formatDate,DatePipe  } from '@angular/common';


//catchError se encarga de interceptar el observable  en busca de fallas.



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint:string='http://localhost:8090/api/clientes';
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'})

  constructor(private httpClient: HttpClient, private router:Router) { }

  getClientes(page: number): Observable<any>{
    return this.httpClient.get(this.urlEndpoint+'/page/'+page).pipe(
      tap((response:any) =>{
       console.log('ClienteService: tap 1');
       //let clientes = response as Cliente[];
       (response.content as Cliente[]).forEach(cliente => {
           console.log(cliente.nombre);
           console.log(response);
           let total = +response.totalPages;
           console.log(total)
       });
      }),
      map((response:any) => {
        //let clientes=response as Cliente[];
        
       (response.content as Cliente[]).map(cliente =>{
                cliente.nombre = cliente.nombre.toUpperCase();
                //cliente.fecha=formatDate(cliente.fecha,'dd-MM-yyyy','En-US');
                //let datePipe = new DatePipe('es');
                //cliente.fecha=datePipe.transform(cliente.fecha,'EEEE dd,MMMM yyyy');
                return cliente; 
       });
       return response;
      }),
      tap(response =>{
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach( cliente => {
          console.log(cliente.nombre);
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

