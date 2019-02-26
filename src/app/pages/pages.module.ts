import { NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

// ng2-charts

import { PAGES_ROUTES } from './pages.routes';

import { DashboardComponent } from './dashboard/dashboard.component';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

// temporal
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CategoriasComponent } from './categorias/categorias.component';

import { BusquedaComponent } from './busqueda/busqueda.component';
import { ProductoComponent } from './productos/producto.component';
import { ProductosComponent } from './productos/productos.component';



@NgModule({
    declarations: [
        DashboardComponent,
        AccountSettingComponent,
        ProfileComponent,
        UsuariosComponent,
        CategoriasComponent,
        ProductosComponent,
        ProductoComponent,
        BusquedaComponent
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        PipesModule
    ]
})

export class PagesModule {}
