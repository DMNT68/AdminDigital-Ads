import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Producto } from '../../models/producto.model';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  totalProductos: number = 0;

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarProductos() {

    let url = URL_SERVICIOS + '/producto';

    return this.http.get(url)
    .pipe(map( (resp: any) => {
      this.totalProductos = resp.total;
        return resp.productos;
    }));

  }

  cargarProducto(id: string) {

    let url = URL_SERVICIOS + '/producto/' + id;
    return this.http.get(url)
    .pipe(map((resp: any) => resp.producto));

  }

  buscarProductos(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/productos/' + termino;
    return this.http.get(url).
    pipe(map((resp: any) => resp.productos));

  }

  borrarProductos(id: string) {

    let url = URL_SERVICIOS + '/medico/' + id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this._usuarioService.token
    });

    return this.http.delete(url, {headers: headers})
    .pipe(map((resp: any) => {
      Swal.fire('Producto Borrado', 'Producto borrado correctamente', 'success');
      return resp.producto;
    }));

  }


  guardarProducto(producto: Producto) {

    let url = URL_SERVICIOS + '/producto';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this._usuarioService.token
    });

    if (producto._id) {
      // Actualizando
      url += '/' + producto._id;

      return this.http.put(url, producto, {headers: headers})
      .pipe(map((resp: any) => {
        Swal.fire('Producto Actualizado', producto.nombre, 'success');
        return resp.producto;
      }));

    } else {
      // creando
  
      return this.http.post(url, producto, {headers: headers})
      .pipe(map((resp: any) => {
        Swal.fire('Médico creado', producto.nombre, 'success');
        return resp.producto;
      }));
    }

  }

}
