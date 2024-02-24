import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { SalidasComponent } from './components/salidas/salidas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { IngresosHistorialComponent } from './components/ingresos-historial/ingresos-historial.component';
import { SalidasHistorialComponent } from './components/salidas-historial/salidas-historial.component';
import { ProductosTopComponent } from './components/productos-top/productos-top.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserListComponent } from './components/user/user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirigir a login por defecto
  { path: 'login', component: LoginComponent },
  {
    path: 'navigation', component: NavigationComponent,
    children: [
      { path: 'ingresos', component: IngresosComponent },
      { path: 'salidas', component: SalidasComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'proveedores', component: ProveedoresComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'ingresos_historial', component: IngresosHistorialComponent },
      { path: 'salidas_historial', component: SalidasHistorialComponent },
      { path: 'productos_top', component: ProductosTopComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'user-create', component: UserCreateComponent },
      { path: 'user-list', component: UserListComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
