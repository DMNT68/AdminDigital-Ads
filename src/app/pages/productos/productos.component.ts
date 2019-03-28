import { Component, OnInit } from '@angular/core';

import { Producto } from '../../models/producto.model';

import { ProductoService, CategoriaService } from '../../services/service.index';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {

  productos: Producto [] = [];
  desde: number = 0;
  cargando: boolean = true;
  categorias: Categoria[] = [];
  idcategoria: string;


  constructor(public _productoService: ProductoService, public _categoriaService: CategoriaService) { }
  
  ngOnInit() {
    this.cargarProductos();

    this._categoriaService.cargarCategorias()
    .subscribe(categorias =>{
       this.categorias = categorias;
      });
  }

  cargarProductos() {
    this._productoService.cargarProductos()
      .subscribe(productos => {
        this.productos = productos;
        this.cargando = false;
      });
    
  }

  buscarProducto(termino: string) {

    if (termino.length <= 0) {
      this.cargarProductos();
      return;
    }

    this._productoService.buscarProductos(termino)
    .subscribe(productos => this.productos = productos);

  }


  borrarProducto(producto: Producto) {

    this._productoService.borrarProductos(producto._id)
    .subscribe(() => this.cargarProductos());
    
  }

  activarProducto(producto: Producto) {
    producto.disponible = true;
    this._productoService.guardarProducto(producto).subscribe(() => this.cargarProductos());
  }

  cargarProductosPorCategoria() {

    if(this.idcategoria === "") {
      this.cargarProductos();
      return;
    }
    
    this._productoService.cargarProductosByCategoria(this.idcategoria).subscribe(productos => {
      this.productos = productos;
    });
  }


}
