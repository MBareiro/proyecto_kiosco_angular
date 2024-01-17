import { Component, Renderer2 } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { ProductService } from 'src/app/services/product.service';
import { SalidaService } from 'src/app/services/salida.service';

export interface PeriodicElement {
  position: number;
  cod_product: string;
  nombre: string;
  cantidad: number;
  precio_venta: number;
  stock: number;
  importe: number;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css'],
})
export class SalidasComponent {
  productos: any[] = [];
  selectedProduct: any;
  isProductoSeleccionado: boolean = false;
  cantidadInput: number | null = null;
  precioVentaInput: number | null = null;
  stockInput: number | null = null;
  recibidoInput: number | null = null;
  total: number = 0;
  vuelto: number = 0;
  imprimirRecibo: boolean = false;

  displayedColumns: string[] = [
    'Cod. Prod.',
    'Nombre',
    'Cantidad',
    'Precio venta',
    'Stock',
    'Importe',
    'Eliminar'
  ];
  dataSource: PeriodicElement[] = ELEMENT_DATA;

  constructor(private productoService: ProductService, private salidaService: SalidaService, private renderer: Renderer2) { }

  ngOnInit(): void {
    // Inicializa la tabla con 10 filas vacías
    this.dataSource = [];

    this.obtenerProductos();
  }

  obtenerProductos() {
    // Carga la lista de productos
    this.productoService.getProductos().subscribe(
      (productos) => {
        this.productos = productos;
      },
      (error) => {
        console.error('Error al obtener la lista de productos', error);
      }
    );
  }
  Producto() {
    // Verifica si la opción seleccionada no es la deshabilitada
    if (this.selectedProduct && this.selectedProduct !== '-') {
      const producto = this.productos[this.selectedProduct - 1];
      console.log(producto);

      this.isProductoSeleccionado = true;
      // Remueve la clase is-invalid si está presente
      this.renderer.removeClass(document.getElementById('productos'), 'is-invalid');
      this.stockInput = producto.cantidad;
      this.precioVentaInput = producto.precio_venta;

    } else {
      this.isProductoSeleccionado = false;
      // Agrega la clase is-invalid si la opción no es válida
      this.renderer.addClass(document.getElementById('productos'), 'is-invalid');
    }
  }

  CantidadValidacion() {
    // Verifica si el valor de cantidad es un número válido
    if (this.cantidadInput !== null && typeof this.cantidadInput === 'number' && isFinite(this.cantidadInput)) {
      // Valor válido, remueve la clase is-invalid
      this.renderer.removeClass(document.getElementById('cantidad'), 'is-invalid');
    } else {
      // Valor no válido, agrega la clase is-invalid
      this.renderer.addClass(document.getElementById('cantidad'), 'is-invalid');
    }
  }



  registrarProducto() {

    // Validación de campos
    this.CantidadValidacion();
    if (
      this.cantidadInput === null ||
      this.precioVentaInput === null ||
      this.stockInput === null ||
      this.selectedProduct <= 0
    ) {
      // Muestra un mensaje de error
      console.log('Por favor, ingrese valores válidos para cantidad, precio venta y stock.');
      return;
    }

    if (
      this.cantidadInput >
      this.stockInput
    ) {
      // Muestra un mensaje de error
      console.log('Stock insuficiente');
      return;
    }

    const producto = this.productos[this.selectedProduct - 1];
    const productoExistente = this.dataSource.find((item) => item.cod_product === producto.id);

    if (productoExistente) {
      // Muestra una alerta, mensaje o toma la acción que consideres apropiada
      console.log('Este producto ya está en la tabla.');
      return;
    }

    // Manejo de valores nulos
    const cantidad = this.cantidadInput !== null ? this.cantidadInput : 0;
    const precioVenta = this.precioVentaInput !== null ? this.precioVentaInput : 0;
    const stock = this.stockInput !== null ? this.stockInput : 0;

    const newRow: PeriodicElement = {
      position: this.dataSource.length + 1,
      cod_product: producto.id,
      nombre: producto.nombre,
      cantidad: cantidad,
      precio_venta: precioVenta,
      stock: stock,
      importe: this.calcularImporte(cantidad, precioVenta),
    };

    // Añade la nueva fila al principio de la tabla
    this.dataSource.unshift(newRow);

    // Elimina la última fila si hay más de 10 filas
    if (this.dataSource.length > 10) {
      this.dataSource.pop();
    }

    // Actualiza las posiciones de las filas restantes
    this.dataSource.forEach((element, index) => {
      element.position = index + 1;
    });

    this.actualizarTotal();
    this.limpiarCampos();
    this.isProductoSeleccionado = false;
    // Llama a actualizarVuelto después de actualizar el total
    this.actualizarVuelto();
  }

  limpiarCampos() {
    // Restablece los valores de los campos a 0
    this.cantidadInput = null;
    this.precioVentaInput = null;
    this.stockInput = null;
    this.selectedProduct = null;
  }

  // Método para calcular el importe
  calcularImporte(cantidad: number, precioVenta: number): number {
    return cantidad * precioVenta;
  }

  // Método para actualizar el total
  actualizarTotal() {
    // Suma los importes de todas las filas
    this.total = this.dataSource.reduce((acc, curr) => acc + curr.importe, 0);
  }

  // Método para actualizar el total
  actualizarVuelto() {
    // Verifica si el valor de recibidoInput es un número válido
    if (this.recibidoInput !== null && typeof this.recibidoInput === 'number' && isFinite(this.recibidoInput)) {
      // Calcula el vuelto restando el total al valor recibidoInput
      this.vuelto = this.recibidoInput - this.total;
    } else {
      // Si recibidoInput no es válido, establece el vuelto como 0
      this.vuelto = 0;
    }
  }


  eliminarRegistro(position: number) {
    // Encuentra el índice del registro a eliminar
    const index = this.dataSource.findIndex((element) => element.position === position);

    if (index !== -1) {
      // Elimina el registro de la tabla
      this.dataSource.splice(index, 1);

      // Actualiza las posiciones de las filas restantes
      this.dataSource.forEach((element, i) => {
        element.position = i + 1;
      });

      // Actualiza el total cada vez que se elimina un producto
      this.actualizarTotal();
    }
  }

  limpiarTabla() {
    // Reinicializa la tabla con 10 filas vacías
    this.dataSource = [];
    // Restaura la bandera
    this.isProductoSeleccionado = false;
    // Restablece los valores de los campos a 0 antes de deshabilitarlos
    this.limpiarCampos();
    // Actualiza el total después de limpiar la tabla
    this.actualizarTotal();
  }

  guardar() {
    // Check if there are entries in the table
    if (this.dataSource.length === 0) {
      console.log('La tabla está vacía. No hay datos para guardar.');
      return;
    }

    // Create an array to hold the data to be saved for the main entry
    const salidaData = {
      fecha: new Date(),
      importe_total: this.total,
    };

    // Call the saveEntrada method from the IngresosService to save the main entry
    this.salidaService.saveSalida(salidaData).subscribe(
      (salidaResponse) => {
        console.log('Salida saved successfully:', salidaResponse);

        // Create an array to hold the data to be saved for details
        const detallesData: any[] = this.dataSource.map((element) => ({
          id_producto: element.cod_product,
          cantidad: element.cantidad,
          importe: element.importe,
        }));

        // Call the saveSalidaDetalle method from the IngresosService to save the details
        this.salidaService.saveSalidaDetalle(salidaResponse.id, detallesData).subscribe(
          (detallesResponse) => {
            console.log('Salida Detalle saved successfully:', detallesResponse);

            // Verifica si el checkbox está marcado antes de generar el PDF
            if (this.imprimirRecibo) {
              this.generarPDF();
            }
            // Reset the form or perform any other necessary actions after saving
            this.limpiarTabla();
          },
          (error) => {
            console.error('Error saving Salida Detalle:', error);
          }
        );
      },
      (error) => {
        console.error('Error saving Entrada:', error);
      }
    );
    this.obtenerProductos()
  }

  generarPDF() {
console.log("SEEEEE");

    // Contenido del documento PDF
    const documentDefinition: any = {
      content: [
        { text: 'Detalle de Salida', style: 'header' },
        '\n',
        {
          table: {
            headerRows: 1,
            body: [
              ['Cod. Prod.', 'Nombre', 'Cantidad', 'Precio Venta', 'Importe']
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

    // Agrega las filas de datos de productos al body de la tabla en documentDefinition
    this.dataSource.forEach(producto => {
      (documentDefinition.content[2] as { table: { body: string[][] } }).table.body.push([
        producto.cod_product,
        producto.nombre,
        producto.cantidad.toString(),
        producto.precio_venta.toString(),
        producto.importe.toString()
      ]);
    });

    // Abre el documento PDF en una nueva ventana
    pdfMake.createPdf(documentDefinition).open();
  }
}
