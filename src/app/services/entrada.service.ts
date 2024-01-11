import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // Method to save the main entry
  saveEntrada(entradaData: any): Observable<any> {
    const url = `${this.apiUrl}/entradas`; // Adjust the URL based on your API endpoint
    return this.http.post(url, entradaData);
  }

  // Method to save details for an entry
  saveEntradaDetalle(entradaId: number, detallesData: any[]): Observable<any> {
    const url = `${this.apiUrl}/entradas_detalle/${entradaId}`; // Adjust the URL based on your API endpoint
    return this.http.post(url, detallesData);
  }
}



