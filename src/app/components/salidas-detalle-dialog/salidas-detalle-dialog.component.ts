import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-salidas-detalle-dialog',
  templateUrl: './salidas-detalle-dialog.component.html',
  styleUrls: ['./salidas-detalle-dialog.component.css']
})
export class SalidasDetalleDialogComponent {
  detalles: any[];  // Asegúrate de tener la propiedad detalles en tu componente
  sumaTotal!: number;

  constructor(
    public dialogRef: MatDialogRef<SalidasDetalleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.detalles = data;    
    this.calcularSumaTotal();
  }
  
  calcularSumaTotal() {
    // Convierte los importes a números antes de sumarlos
    this.sumaTotal = this.detalles.reduce((total, detalle) => total + parseFloat(detalle.importe), 0);
  }  

  cerrarDialogo(): void {
    this.dialogRef.close();
  }
}
