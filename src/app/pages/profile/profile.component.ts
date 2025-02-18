import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string;
  imagenActiva: boolean = false;
  avatar: string;
  
  constructor(public _usuarioServices: UsuarioService) { 
  }

  ngOnInit() {
    this.usuario = this._usuarioServices.usuario;
   }

  guardar(usuario: Usuario) {
    
    this.usuario.nombre = usuario.nombre;
    this.usuario.telefono = usuario.telefono;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this._usuarioServices.actualizarUsuario(this.usuario).subscribe();
  }

  seleccionImagen(archivo: File) {

    if ( !archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0 ) {
      Swal.fire('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result.toString();
  }

  cambiarImagen() {
    this._usuarioServices.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
