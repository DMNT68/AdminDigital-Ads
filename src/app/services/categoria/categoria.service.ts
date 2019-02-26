import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Categoria } from '../../models/categoria.model';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  totalCategorias: number = 0;

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarCategorias() {

    let url = URL_SERVICIOS + '/categoria'; 

    return this.http.get(url)
    .pipe(map((resp: any) => {
      this.totalCategorias = resp.total;
      return resp.categorias;
    }));

  }

  obtenerCategoria(id: string) {

    let url = URL_SERVICIOS + '/categoria/' + id;
    return this.http.get(url)
    .pipe(map((resp: any) => resp.categoria));

  } 

  borrarCategoria(id: string) {
    
    let url = URL_SERVICIOS + '/categoria/' + id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this._usuarioService.token
    });

    return this.http.delete(url, { headers: headers } )
    .pipe(map(resp => Swal.fire('Categoria Borrada', 'Eliminado correctamente', 'success')));

  }

  crearCategoria(descripcion: string) {

    let url = URL_SERVICIOS + '/categoria';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this._usuarioService.token
    });

    return this.http.post(url, {descripcion}, { headers: headers })
    .pipe(map((resp: any) => resp.categoria));

  }

  buscarCategoria(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/categorias/' + termino;

    return this.http.get(url).pipe(map((resp: any) => resp.categorias));

  }

  actualizarCategoria(categoria: Categoria) {

    let url = URL_SERVICIOS + '/categoria/' + categoria._id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this._usuarioService.token
    });

    return this.http.put(url, categoria, { headers: headers })
    .pipe(map((resp: any) => {
      Swal.fire('Categoria actualizado', categoria.descripcion, 'success');
      return resp.categoria;
    }));

  }


}
