import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/service.index';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  cargando: boolean = true;
  pedidosNoAtendidos: any [] = []; 
  pedidosAtendidos: any [] = []; 

  constructor(public _ps: PedidosService) { }

  ngOnInit() {
    this.getPedidos();
  }

  getPedidos() {
    this._ps.cargarPedidos().subscribe((resp: any) => {
        for (let i = 0; i < resp.length; i++) {
          if (!resp[i].atendido) {
            this.pedidosNoAtendidos.push(resp[i]);
          } else if (resp[i].atendido) {
            this.pedidosAtendidos.push(resp[i]);
          }
          
        }
        this.cargando = !this.cargando;
    });
  }

}
