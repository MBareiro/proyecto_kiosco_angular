import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getProveedores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/proveedores`);
  }
}
