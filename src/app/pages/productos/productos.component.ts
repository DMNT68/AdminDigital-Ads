import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';

import { ProductoService } from '../../services/service.index';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {

  productos: Producto [] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor(public _productoService: ProductoService) { }
  
  ngOnInit() {
    this.cargarProductos();
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

  cambiarDesde(valor: number) {

    let desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarProductos();

  }

}
