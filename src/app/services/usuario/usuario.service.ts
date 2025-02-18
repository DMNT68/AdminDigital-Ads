import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

// Modelo
import { Usuario } from '../../models/usuario.model';

import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import Swal from 'sweetalert2';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(public http: HttpClient, public router: Router, public _subirArchivoServices: SubirArchivoService) { 
    this.cargaStorage();
  }

  renuevaToken() {

    let url = URL_SERVICIOS + '/login/renuevaToken';
    // url += '?token=' + this.token;

    let header = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'token': this.token
    });

    return this.http.get(url, {headers: header})
    .pipe(map((resp: any) => {

      this.token = resp.token;
      localStorage.setItem('token', this.token);

      return true;
    }),
    catchError(err => {
      this.router.navigate(['/login']);
      Swal.fire('No se pudo renovar token', 'No fue posible renovar token', 'error');
      return throwError(err);
    }));

  }

  estaLogueado() {
    return(this.token.length > 5 ) ? true : false; 
  }

  cargaStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }

  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }
  
  logout() {

    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);

  }

  // loginGoogle(token: string) {

  //   let url = URL_SERVICIOS + '/login/google';
  //   return this.http.post(url, { token })
  //   .pipe(map((resp: any) => {
  //     this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
  //     return true;
  //   }));

  // }

  
  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
    .pipe(map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
      return true;
    }),
    catchError(err => {
      Swal.fire('Error en el Login', err.error.mensaje, 'error');
      return throwError(err);
    }));
  }



  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
    .pipe(map((resp: any) => {
      Swal.fire('Usuario Creado!', usuario.email, 'success');
      return resp.usuario;
    }),
    catchError(err => {
      Swal.fire(err.error.mensaje, err.error.err.message, 'error');
      return throwError(err);
    }));

  }

  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuarioAdmin/' + usuario._id;
    
    let header = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'token': this.token
    });
    
    return this.http.put(url, usuario, {headers: header})
    .pipe(map((resp: any) => {
      
      if (usuario._id === this.usuario._id) {
        let usuarioDB: Usuario = resp.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
      }
      
      Swal.fire('Usuario actualizado', usuario.nombre, 'success');
      return true;

    }),
    catchError(err => {
      Swal.fire(err.error.mensaje, err.error.err.message, 'error');
      return throwError(err);
    }));

  }


  cambiarImagen(archivo: File , id: string) {

    this._subirArchivoServices.subirArhivo(archivo, 'usuarios', id)
    .then((resp: any) => {
      this.usuario.img = resp.usuario.img;
      Swal.fire('Imagen Actualizada', this.usuario.nombre, 'success');
      this.guardarStorage(id, this.token, this.usuario, this.menu);
    })
    .catch(resp => {
      console.log(resp);
    });
    
  }


  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {

    let url = URL_SERVICIOS + '/usuario/buscar/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.usuarios));

  }

  borrarUsuario(id: string) {

    let url = URL_SERVICIOS + `/usuario/${id}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token
    });
    
    return this.http.delete(url, {headers: headers})
    .pipe(map(() => {
      Swal.fire('Usuario Borrado!', 'El usuario ha sido borrado.', 'success');
      return true;
    }));

  }

  imagenExistente(img: string) {
    
    let url = `${URL_SERVICIOS}/imagen-existe/usuarios/${img}`;
    
    return this.http.get(url);
    
  }

  crearAvatar(nombre: string) {
    let arregloNombre = nombre.split(' ');
    let avatar = arregloNombre.map(letra => letra.charAt(0)).slice(0, 2).join('');
    avatar.toUpperCase();
    return avatar;
  }

}
