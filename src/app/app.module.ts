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
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { SalidasComponent } from './components/salidas/salidas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    IngresosComponent,
    ProveedoresComponent,
    SalidasComponent,
    ProductosComponent,
    ReportesComponent
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
    MatTableModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
