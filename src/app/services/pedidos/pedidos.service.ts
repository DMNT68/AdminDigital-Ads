import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  totalPedidos: number = 0;

  constructor(private http: HttpClient) { }

  cargarPedidos() {
    let url = URL_SERVICIOS + '/orden';
    
    return this.http.get(url)
    .pipe(map( (resp: any) => {
      this.totalPedidos = resp.total;
      return resp.ordenes;
    }));

  }
}
