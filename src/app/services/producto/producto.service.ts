import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Producto } from '../../models/producto.model';
import { Categoria } from '../../models/categoria.model';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  totalProductos: number = 0;
  totalProductosPorCategoria: number = 0;


  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarProductos(desde: number = 0) {

    let url = URL_SERVICIOS + '/productoAdmin?desde=' + desde;

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

    let url = URL_SERVICIOS + '/producto/buscar/' + termino;
    return this.http.get(url).
    pipe(map((resp: any) => resp.productos));

  }

  borrarProductos(id: string) {

    let url = URL_SERVICIOS + '/producto/' + id;

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
        Swal.fire('Producto creado', producto.nombre, 'success');
        return resp.producto;
      }));
    }

  }

  cargarProductosByCategoria(id: string) {

    let url = URL_SERVICIOS + '/producto/categoria/' + id;

    return this.http.get(url)
    .pipe(map( (resp: any) => {
      this.totalProductosPorCategoria = resp.total;
      return resp.productos;
    }));

  }

}
