import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Producto } from '../components/productos/productos.component';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos`);
  }

  crearProducto(producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos`, producto);
  }

  deleteProducto(productoId: number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/productos/${productoId}`);
  }

  getProductoById(id: string): Observable<Producto> {
    const url = `${this.apiUrl}/productos/${id}`; // Ajusta la URL según tu estructura
    return this.http.get<Producto>(url);
  }
  actualizarProducto(producto: Producto): Observable<any> {
    const url = `${this.apiUrl}/productos/${producto.id}`; // Ajusta la URL según tu estructura
    // Utiliza el método HTTP PUT para actualizar el producto
    return this.http.put(url, producto);
  }

  obtenerTopProductosMasVendidos(): Observable<any[]> {
    const url = `${this.apiUrl}/productos_mas_vendidos`;
    return this.http.get<any[]>(url);
  }
}
