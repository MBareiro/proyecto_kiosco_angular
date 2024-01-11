import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { SalidasComponent } from './components/salidas/salidas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
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
      // Otras rutas secundarias según sea necesario
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
