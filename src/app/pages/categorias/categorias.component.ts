import { Categoria } from '../../models/categoria.model';
import { Component, OnInit } from '@angular/core';

import { CategoriaService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: []
})
export class CategoriasComponent implements OnInit {

  categorias: [] = [];
 
  constructor(public _categoriaService: CategoriaService, public _modalUploadService: ModalUploadService) {}

  ngOnInit() {

    this.cargarCategorias();

    this._modalUploadService.notificacion
    .subscribe(() => this.cargarCategorias());
  }

  cargarCategorias() {

    this._categoriaService.cargarCategorias()
    .subscribe(categorias => this.categorias = categorias);
      
  }
  
  buscarCategoria(termino: string) {

    if (termino.length <= 0) {
      this.cargarCategorias();
      return;
    }

    this._categoriaService.buscarCategoria(termino)
    .subscribe(categorias => this.categorias = categorias);

  }

  guardarCategoria(categoria: Categoria) {
    
    this._categoriaService.actualizarCategoria(categoria)
    .subscribe(() => this.cargarCategorias());

  
  }

  borrarCategoria(categoria: Categoria) {

    this._categoriaService.borrarCategoria(categoria._id)
    .subscribe(() => this.cargarCategorias());

  }

  activarCategoria(categoria: Categoria) {

    categoria.estado = true;
    
    this._categoriaService.actualizarCategoria(categoria)
    .subscribe(() => this.cargarCategorias());

  }

  crearCategoria() {

    Swal.fire({
      title: 'Crear Categoría',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Crear Categoría',
      
    }).then((result) => {
      if (!result.value || result.value.length === 0) {
        return;
      }

      this._categoriaService.crearCategoria(result.value)
      .subscribe(() => this.cargarCategorias());
    });
  }

}
