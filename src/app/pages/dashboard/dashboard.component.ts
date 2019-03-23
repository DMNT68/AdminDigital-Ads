import { Component, OnInit } from '@angular/core';
import { ProductoService, UsuarioService, CategoriaService } from 'src/app/services/service.index';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  totalProductos: number = 0;
  totalCategorias: number = 0;
  totalUsuarios: number = 0;

  constructor(
    public _productoService: ProductoService,
    public _usuarioService: UsuarioService,
    public _categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this._productoService.cargarProductos().subscribe();
    this._usuarioService.cargarUsuarios().subscribe((resp: any) => this.totalUsuarios = resp.total);
    this._categoriaService.cargarCategorias().subscribe();
  }

}
