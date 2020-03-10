import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Injectable } from '@angular/core';
import {Observable,of} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint:string='http://localhost:8090/api/clientes';
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'})

  constructor(private httpClient: HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    return this.httpClient.get(this.urlEndpoint).pipe(
      map(response =>response as Cliente[])
      
    )

  }

  create(cliente: Cliente): Observable<Cliente[]>{
    return this.httpClient.post(this.urlEndpoint,cliente,{headers:this.httpHeaders}).pipe(
      map(response =>response as Cliente[])
    )

  }

  getCliente(id):Observable<Cliente>{
      return this.httpClient.put<Cliente>(`this.urlEndpoint+${id}`,{headers:this.httpHeaders})
  }
}

