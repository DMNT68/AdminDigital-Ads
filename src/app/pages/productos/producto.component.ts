import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { ProductoService, CategoriaService } from '../../services/service.index';

import { Producto } from '../../models/producto.model';
import {  Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {

  categorias: Categoria[] = [];
  producto: Producto = new Producto('', '');
  categoria: Categoria = new Categoria('');

  constructor(
    public _productoService: ProductoService, 
    public _categoriaService: CategoriaService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService) {

    activatedRoute.params.subscribe( params => {

      let id = params['id'];

      if (id !== 'nuevo') {
        this.cargarProducto(id);
      }
      
    });

  }

  ngOnInit() {

    this._categoriaService.cargarCategorias()
    .subscribe(categorias => {
       this.categorias = categorias;
      });

    this._modalUploadService.notificacion
    .subscribe((resp: any) => this.producto.img = resp.producto.img);

  }


  guardarProducto(f: NgForm) {

    if (f.invalid) {
      return;
    }

    this._productoService.guardarProducto( this.producto )
    .subscribe((resp: Producto) => {
      this.router.navigate(['/producto', resp._id]);
    });

  }

  cambioCategoria(id: string) {
    this._categoriaService.obtenerCategoria(id)
    .subscribe(categoria => this.categoria = categoria);
  }

  cargarProducto(id: string) {

     this._productoService.cargarProducto(id)
     .subscribe(producto => {
       this.producto = producto;
       this.producto.categoria = producto.categoria._id;
       this.cambioCategoria(this.producto.categoria);
      });

  }

  cambiarFoto() {

    this._modalUploadService.mostarMoldal('productos', this.producto._id);

  }


}
