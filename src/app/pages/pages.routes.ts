import {RouterModule, Routes } from '@angular/router';



import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


// Guards
import { VerificaTokenGuard } from '../services/service.index';
import { AdminGuard } from '../services/guards/admin.guard';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoComponent } from './productos/producto.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { DetallePedidoComponent } from './pedidos/detalle-pedido/detalle-pedido.component';


const pagesRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent, canActivate: [VerificaTokenGuard], data: {titulo: 'Dashboard'} },
    {path: 'account-settings', component: AccountSettingComponent, data: {titulo: 'Ajustes de Tema'}},
    {path: 'perfil', component: ProfileComponent, data: {titulo: 'Perifl de usuario'}},
    // Mantenimientos
    {path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard, VerificaTokenGuard], data: {titulo: 'Mantenimiento de Usuarios'}},
    {path: 'categorias', component: CategoriasComponent, canActivate: [AdminGuard, VerificaTokenGuard], data: {titulo: 'Mantenimiento de Categorías'}},
    {path: 'productos', component: ProductosComponent, canActivate: [AdminGuard, VerificaTokenGuard], data: {titulo: 'Mantenimiento de productos'}},
    {path: 'producto/:id', component: ProductoComponent, canActivate: [AdminGuard, VerificaTokenGuard], data: {titulo: 'Actualizar de producto'}},
    {path: 'pedidos', component: PedidosComponent, canActivate: [AdminGuard, VerificaTokenGuard], data: {titulo: 'Mantenimiento de pedidos'}},
    {path: 'detalle-pedido/:id', component: DetallePedidoComponent, canActivate: [AdminGuard, VerificaTokenGuard], data: {titulo: 'Mantenimientos del detalle'}},
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
