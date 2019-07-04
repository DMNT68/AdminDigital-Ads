import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PedidosService, UsuarioService } from '../../../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {

  maestro: any = {};
  detalle: any [] = [];
  nombre: string;
  email: string;
  telefono: string;
  img: string;
  totalItems: number;

  constructor( public activatedRoute: ActivatedRoute, private _ps: PedidosService, public _us: UsuarioService) { }

  ngOnInit() {


    this.activatedRoute.params.subscribe( params => {

      let id = params['id'];

      if (id !== 'nuevo') {
        this.getDetalle(id);
      }
      
    });
  }

  getDetalle(id: string) {

    this._ps.cargarDetallePedido(id).subscribe((resp: any) => {
      
      this.maestro = resp.orden;
      this.nombre = resp.orden.usuario.nombre;
      this.email = resp.orden.usuario.email;
      this.telefono = resp.orden.usuario.telefono;
      this.img = resp.orden.usuario.img;
      this.detalle = resp.detalles;
      this.totalItems = resp.total;

    });

  }

  atenderPedido(id: string) {
    
      Swal.fire({
        title: '¿Quieres atender el pedido?',
        text: 'Pedido del cliente '  + this.nombre,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((resp) => {
        if (resp.value) {
          this._ps.atenderPedido(id).subscribe(() => {
            this.getDetalle(id);
          });
          
        }
      });
  }

}
