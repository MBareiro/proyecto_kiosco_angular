import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SalidaService } from 'src/app/services/salida.service';
import { SalidasDetalleDialogComponent } from '../salidas-detalle-dialog/salidas-detalle-dialog.component';

export interface Salida {
  id: number;
  nombre: string;
  cantidad: string;
  precio_venta: string;
  medida: string;
  categoria: string;
}

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
const day = today.getDate();
const ELEMENT_DATA: Salida[] = [];

@Component({
  selector: 'app-salidas-historial',
  templateUrl: './salidas-historial.component.html',
  styleUrls: ['./salidas-historial.component.css']
})
export class SalidasHistorialComponent {
  salidas: any[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, day)),
    end: new FormControl(new Date(year, month, day)),
  });
  salidasOriginal: any[]= [];

  constructor(private salidaService: SalidaService,
    private dialog: MatDialog){}

  ngOnInit(): void {
    // Inicializa la tabla con 10 filas vacías
    this.dataSource = [];
    this.cargarSalidas();
  }

  cargarSalidas() {
    // Carga la lista de productos
    this.salidaService.getSalidas().subscribe(
      (salidas) => {
        this.salidas = salidas;
        this.salidasOriginal = [...salidas];
        this.filtrarPorFecha();
  
        // Ordena las salidas por fecha y hora de manera ascendente
        this.salidas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      },
      (error) => {
        console.error('Error al obtener la lista de productos', error);
      }
    );
  }
  

  filtrarPorFecha() {
    const startDate = this.campaignTwo.get('start')?.value;
    const endDate = this.campaignTwo.get('end')?.value;
  
    if (startDate !== null && startDate !== undefined && endDate !== null && endDate !== undefined) {
      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);
  
      // Establece la hora y el minuto a las 00:00:00 para ignorar la hora y el minuto en la comparación
      startDateTime.setHours(0, 0, 0, 0);
      endDateTime.setHours(0, 0, 0, 0);
  
      // Aplica el filtro sobre la copia original y asigna el resultado a this.salidas
      this.salidas = this.salidasOriginal.filter(salida => {
        const fechaSalida = new Date(salida.fecha);
        fechaSalida.setHours(0, 0, 0, 0);  // Establece la hora y el minuto a las 00:00:00
        return fechaSalida >= startDateTime && fechaSalida <= endDateTime;
      });
    }
  }  
  
  verSalida(id: number, fecha: string) {
    // Llama al servicio para obtener los detalles de la salida por su ID
    this.salidaService.getSalidaDetalle(id).subscribe(
      (detalles) => {      
        console.log(detalles);
          
        // Abre el diálogo y pasa los detalles de la salida y la fecha como datos
        const dialogRef = this.dialog.open(SalidasDetalleDialogComponent, {
          width: '260px',
          data: { detalles: detalles, fecha: fecha },  // Pasa los detalles y la fecha como datos al diálogo
        });
      },
      (error) => {
        console.error('Error al obtener detalles de la salida', error);
      }
    );
  }
  
  
}
