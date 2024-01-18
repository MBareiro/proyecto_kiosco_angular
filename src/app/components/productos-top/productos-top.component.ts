// productos-top.component.ts
import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productos-top',
  templateUrl: './productos-top.component.html',
  styleUrls: ['./productos-top.component.css']
})
export class ProductosTopComponent implements OnInit {
  topProductos: any[] = [];

  constructor(private productoService: ProductService) { }

  ngOnInit(): void {
    this.obtenerTopProductos();
  }

  obtenerTopProductos() {
    // Llama al servicio para obtener los productos más vendidos
    this.productoService.obtenerTopProductosMasVendidos().subscribe(
      (productos) => {
        this.topProductos = productos;
      },
      (error) => {
        console.error('Error al obtener los productos más vendidos', error);
      }
    );
  }

  generarPDF() {
    const documentDefinition: any = {
      content: [
        { text: 'Lista de Productos Más Vendidos', style: 'header' },
        '\n',
        {
          table: {
            headerRows: 1,
            body: [
              ['Posición', 'Nombre del Producto', 'Cantidad Vendida']
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        }
      }
    };
  
    // Agrega las filas de datos de productos más vendidos al body de la tabla en documentDefinition
    this.topProductos.forEach((producto, index) => {
      (documentDefinition.content[2] as { table: { body: string[][] } }).table.body.push([
        (index + 1).toString(),
        producto.producto.nombre,
        producto.cantidad_vendida.toString()
      ]);
    });
    
    pdfMake.createPdf(documentDefinition).open(); 
  }
}
