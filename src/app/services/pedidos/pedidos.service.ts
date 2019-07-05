import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { UsuarioService } from '../usuario/usuario.service';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  totalPedidos: number = 0;
  token: string;

  constructor(private http: HttpClient, private _us: UsuarioService) { 
    
  }

  cargarPedidos() {
    let url = URL_SERVICIOS + '/orden';
    
    return this.http.get(url)
    .pipe(map( (resp: any) => {
      this.totalPedidos = resp.total;
      return resp.ordenes;
    }));

  }

  cargarDetallePedido(id: string) {

    let url = URL_SERVICIOS + `/detalles/${id}`;

    let header = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'token': this._us.token
    });

    return this.http.get(url, {headers: header}).pipe(map((resp: any) => {
      return resp;
    }));

  }

  atenderPedido(id: string) {
    let url = URL_SERVICIOS + `/atenderPedido/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this._us.token
    });

    return this.http.put(url, {headers: headers})
    .pipe(map((resp: any) => {
      Swal.fire(`${resp.message}`, 'Pedido atendido correctamente', 'success');
      return resp.producto;
    }), catchError(err => {
      Swal.fire(err.error.mensaje, err.error.err.message, 'error');
      return throwError(err);
    }));

  }
}
