import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Producto } from '../../models/producto.model';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  
  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) {

    activatedRoute.params.subscribe(params => {
      let termino = params['termino'];
      this.buscar(termino);
    });
   }

  ngOnInit() {
  }

  buscar(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url)
    .subscribe( (resp: any) => {
      this.categorias = resp.hospitales;
      this.productos = resp.medicos;
      this.usuarios = resp.usuarios;
    });

  }

}
