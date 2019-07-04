import {RouterModule, Routes } from '@angular/router';

// login y register
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// shared
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuard } from './services/guards/login.guard';



const appRoutes: Routes = [
    {path: 'login', component: LoginComponent,  data: {titulo: 'Iniciar Sesión'}},
    {path: 'register', component: RegisterComponent,  data: {titulo: 'Registar Cuenta'}},
    {path: '', component: PagesComponent, canActivate: [LoginGuard], loadChildren: './pages/pages.module#PagesModule'},
    {path: '**', component: NopagefoundComponent,  data: {titulo: 'No encontrado'}},
];

export const APP_ROUTES =  RouterModule.forRoot(appRoutes, {useHash: true});
