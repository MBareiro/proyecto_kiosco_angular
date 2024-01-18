import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { SalidasComponent } from './components/salidas/salidas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { EditarProveedorDialogComponent } from './components/editar-proveedor-dialog/editar-proveedor-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NuevoProveedorDialogComponent } from './components/nuevo-proveedor-dialog/nuevo-proveedor-dialog.component';
import { NuevoProductoDialogComponent } from './components/nuevo-producto-dialog/nuevo-producto-dialog.component';
import { EditarProductoDialogComponent } from './components/editar-producto-dialog/editar-producto-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SalidasHistorialComponent } from './components/salidas-historial/salidas-historial.component';
import { ProductosTopComponent } from './components/productos-top/productos-top.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SalidasDetalleDialogComponent } from './components/salidas-detalle-dialog/salidas-detalle-dialog.component';
import { EntradaDetalleDialogComponent } from './components/entrada-detalle-dialog/entrada-detalle-dialog.component';
import { IngresosHistorialComponent } from './components/ingresos-historial/ingresos-historial.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    IngresosComponent,
    ProveedoresComponent,
    SalidasComponent,
    ProductosComponent,
    ReportesComponent,
    EditarProveedorDialogComponent,
    NuevoProveedorDialogComponent,
    NuevoProductoDialogComponent,
    EditarProductoDialogComponent,
    SalidasHistorialComponent,
    ProductosTopComponent,
    SalidasDetalleDialogComponent,
    EntradaDetalleDialogComponent,
    IngresosHistorialComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatGridListModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule
  ],
  providers: [DatePipe, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
