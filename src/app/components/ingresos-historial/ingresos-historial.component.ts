import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EntradaService } from 'src/app/services/entrada.service';
import { EntradaDetalleDialogComponent } from '../entrada-detalle-dialog/entrada-detalle-dialog.component';
export interface Entrada {
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
const ELEMENT_DATA: Entrada[] = [];

@Component({
  selector: 'app-ingresos-historial',
  templateUrl: './ingresos-historial.component.html',
  styleUrls: ['./ingresos-historial.component.css']
})
export class IngresosHistorialComponent {
  ingresos: any[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, day)),
    end: new FormControl(new Date(year, month, day)),
  });
  ingresosOriginal: any[]= [];

  constructor(private entradaService: EntradaService,
    private dialog: MatDialog){}

  ngOnInit(): void {
    // Inicializa la tabla con 10 filas vacías
    this.dataSource = [];
    this.cargarEntradas();
  }

  cargarEntradas() {
    // Carga la lista de productos
    this.entradaService.getEntradas().subscribe(
      (ingresos) => {
        console.log(ingresos);
        
        this.ingresos = ingresos;
        this.ingresosOriginal = [...ingresos];
        this.filtrarPorFecha();
        // Ordena los ingresos por fecha y hora de manera ascendente
        this.ingresos.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
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
  
      // Aplica el filtro sobre la copia original y asigna el resultado a this.ingresos
      this.ingresos = this.ingresosOriginal.filter(salida => {
        const fechaSalida = new Date(salida.fecha);
        fechaSalida.setHours(0, 0, 0, 0);  // Establece la hora y el minuto a las 00:00:00
        return fechaSalida >= startDateTime && fechaSalida <= endDateTime;
      });
    }
  }
  
  
  verEntrada(id: number, fecha: string) {
    // Llama al servicio para obtener los detalles de la entrada por su ID
    this.entradaService.getEntradaDetalle(id).subscribe(
      (detalles) => {
        console.log(detalles);
  
        // Abre el diálogo y pasa los detalles de la entrada junto con la fecha como datos
        const dialogRef = this.dialog.open(EntradaDetalleDialogComponent, {
          width: '260px',
          data: {
            detalles: detalles,
            fecha: fecha
          },
        });
      },
      (error) => {
        console.error('Error al obtener detalles de la entrada', error);
      }
    );
  }
  
  
}
