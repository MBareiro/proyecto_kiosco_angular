import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Proveedor } from '../components/proveedores/proveedores.component';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getProveedores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/proveedores`);
  }

  deleteProveedor(proveedorId: number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/proveedores/${proveedorId}`);
  }

  getProveedorById(id: string): Observable<Proveedor> {
    const url = `${this.apiUrl}/proveedores/${id}`; // Ajusta la URL según tu estructura
    return this.http.get<Proveedor>(url);
  }
  actualizarProveedor(proveedor: Proveedor): Observable<any> {
    const url = `${this.apiUrl}/proveedores/${proveedor.id}`; // Ajusta la URL según tu estructura
    // Utiliza el método HTTP PUT para actualizar el proveedor
    return this.http.put(url, proveedor);
  }

  crearProveedor(proveedor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/proveedores`, proveedor);
  }
}
