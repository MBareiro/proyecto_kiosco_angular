import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import * as pdfMake from 'pdfmake/build/pdfmake';

@Component({
  selector: 'app-entrada-detalle-dialog',
  templateUrl: './entrada-detalle-dialog.component.html',
  styleUrls: ['./entrada-detalle-dialog.component.css']
})
export class EntradaDetalleDialogComponent {
  detalles: any[];  // Asegúrate de tener la propiedad detalles en tu componente
  sumaTotal: number = 0;  // Inicializa la sumaTotal como un número
  fecha: any;

  constructor(
    public dialogRef: MatDialogRef<EntradaDetalleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe  // Inyecta el servicio DatePipe
  ) {
    this.detalles = data.detalles;
    this.fecha = data.fecha;
    this.calcularSumaTotal();
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
        detalle.importe
      ]);
    });

    // Agrega el total al final del contenido
    documentDefinition.content.push(
      '\n',
      { text: `Total: ${this.calcularSumaTotal()}`, bold: true },
      '\n',
      { text: `Fecha: ${fechaFormateada}`, bold: true }
    );

    // Crea y abre el PDF
    pdfMake.createPdf(documentDefinition).open();
  }

  calcularSumaTotal(): number {
    this.sumaTotal = this.detalles.reduce((total, detalle) => total + parseFloat(detalle.importe), 0);
    return this.sumaTotal;
  }

  cerrarDialogo(): void {
    this.dialogRef.close();
  }
}
