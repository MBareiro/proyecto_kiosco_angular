import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as pdfMake from 'pdfmake/build/pdfmake';

@Component({
  selector: 'app-salidas-detalle-dialog',
  templateUrl: './salidas-detalle-dialog.component.html',
  styleUrls: ['./salidas-detalle-dialog.component.css']
})
export class SalidasDetalleDialogComponent {
  detalles: any[];
  sumaTotal!: number;
  fecha: any;

  constructor(
    private currencyPipe: CurrencyPipe,
    public dialogRef: MatDialogRef<SalidasDetalleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe
  ) {
    this.detalles = data.detalles;  // Accede a los detalles
    this.fecha = data.fecha;  // Accede a la fecha
    this.calcularSumaTotal();
  }
  
  // Dentro de tu clase SalidasDetalleDialogComponent
calcularSumaTotal(): number {
  // Convierte los importes a números antes de sumarlos
  return this.detalles.reduce((total, detalle) => total + parseFloat(detalle.importe), 0);
}
 
  generarPDF() {
    // Formatea la fecha con el servicio DatePipe
    const fechaFormateada = this.datePipe.transform(this.fecha, 'dd/MM/yyyy HH:mm:ss');
  
    const documentDefinition: any = {
      content: [
        { text: 'Entrada detalle', style: 'header' },
        '\n',
        {
          table: {
            headerRows: 1,
            body: [
              ['Nombre del producto', 'Cantidad', 'Importe']
            ]
          }
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        }
      }
    };
  
    // Agrega las filas de datos de detalles al body de la tabla en documentDefinition
    this.detalles.forEach(detalle => {
      (documentDefinition.content[2] as { table: { body: string[][] } }).table.body.push([
        detalle.nombre_producto,
        detalle.cantidad,
        this.currencyPipe.transform(detalle.importe, 'USD', 'symbol'),
      ]);
    });
  
    // Agrega el total al final del contenido
    documentDefinition.content.push(
      '\n',
      { text: `Total: ${this.currencyPipe.transform(this.calcularSumaTotal(), 'USD', 'symbol')}`, bold: true },
      '\n',
      { text: `Fecha: ${fechaFormateada}`, bold: true }
    );
  
    // Crea y abre el PDF
    pdfMake.createPdf(documentDefinition).open();
  }

  cerrarDialogo(): void {
    this.dialogRef.close();
  }
}
