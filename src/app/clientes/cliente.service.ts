import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Injectable } from '@angular/core';
import {Observable,of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint:string='http://localhost:8090/api/clientes';
  

  constructor(private httpClient: HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    /*Es una forma de retorna el valor de tipo any 
    return this.httpClient.get<Cliente[]>(this.urlEndpoint);*/
    return this.httpClient.get(this.urlEndpoint).pipe(
      map(response=> response as Cliente[])
    );

  }
}

