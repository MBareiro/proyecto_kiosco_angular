import { Component, Renderer2 } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { EntradaService } from 'src/app/services/entrada.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ProductService } from '../../services/product.service';

export interface PeriodicElement {
  position: number;
  cod_product: string;
  nombre: string;
  cantidad: number;
  reserva: number;
  precio_compra: number;
  precio_venta: number;
  importe: number;
}

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})

export class IngresosComponent {
  productos: any[] = [];
  proveedores: any[] = [];
  selectedProduct: any;
  selectedProveedor: any;
  isProductoSeleccionado: boolean = false;
  isProveedorSeleccionado: boolean = false;
  isPrecioCompraValido: boolean = false;

  precioCompraInput: number | null = null;
  precioVentaInput: number | null = null;
  cantidadInput: number | null = null;
  reservaInput: number | null = null;
  total: number = 0;

  displayedColumns: string[] = [
    '',
    'Cod. Prod.',
    'Nombre',
    'Cantidad',
    'Reserva',
    'Precio compra',
    'Precio venta',
    'Importe',
    'Eliminar'
  ];
  dataSource: PeriodicElement[] = [];

  constructor(private productoService: ProductService, private proveedorService: ProveedorService, private ingresosService: EntradaService, private renderer: Renderer2, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // Inicializa la tabla con 10 filas vacías
    this.dataSource = []

    // Inicializa los campos con null
    this.cantidadInput = null;
    this.reservaInput = null;
    this.precioCompraInput = null;
    this.precioVentaInput = null;

    // Carga la lista de productos
    this.productoService.getProductos().subscribe(
      (productos) => {
        this.productos = productos;
      },
      (error) => {
        console.error('Error al obtener la lista de productos', error);
      }
    );

    // Carga la lista de productos
    this.proveedorService.getProveedores().subscribe(
      (proveedores) => {
        this.proveedores = proveedores;
      },
      (error) => {
        console.error('Error al obtener la lista de proveedores', error);
      }
    );

  }

  Producto() {
    // Verifica si la opción seleccionada no es la deshabilitada
    if (this.selectedProduct && this.selectedProduct !== '-') {
      this.isProductoSeleccionado = true;
      // Remueve la clase is-invalid si está presente
      this.renderer.removeClass(document.getElementById('productos'), 'is-invalid');
    } else {
      this.isProductoSeleccionado = false;
      // Agrega la clase is-invalid si la opción no es válida
      this.renderer.addClass(document.getElementById('productos'), 'is-invalid');
    }
  }

  Proveedor() {
    this.isProveedorSeleccionado = true;
  }

  PrecioCompraValidacion() {
    // Verifica si el valor de precioCompra es un número válido y mayor a 0
    if (this.precioCompraInput !== null && typeof this.precioCompraInput === 'number' && isFinite(this.precioCompraInput) && this.precioCompraInput > 0) {
      // Valor válido, marca como seleccionado y remueve la clase is-invalid
      this.isPrecioCompraValido = true;
      this.renderer.removeClass(document.getElementById('precio_compra'), 'is-invalid');
    } else {
      // Valor no válido, marca como no seleccionado y agrega la clase is-invalid
      this.isPrecioCompraValido = false;
      this.renderer.addClass(document.getElementById('precio_compra'), 'is-invalid');
      if (this.precioCompraInput === null) {
        this.mostrarSnackbar('Debe completar el campo Precio Compra', ['error-snackbar']);
      } else if (this.precioCompraInput <= 0) {
        this.mostrarSnackbar('El valor en el campo Precio Compra debe ser mayor a 0', ['error-snackbar']);
      } else {
        this.mostrarSnackbar('No se pueden ingresar valores negativos en el campo Precio Compra', ['error-snackbar']);
      }
    }
  }
  
  PrecioVentaValidacion() {
    // Verifica si el valor de precioVenta es un número válido y mayor a 0
    if (this.precioVentaInput !== null && typeof this.precioVentaInput === 'number' && isFinite(this.precioVentaInput) && this.precioVentaInput > 0) {
      // Valor válido, remueve la clase is-invalid
      this.renderer.removeClass(document.getElementById('precio_venta'), 'is-invalid');
    } else {
      // Valor no válido, agrega la clase is-invalid
      this.renderer.addClass(document.getElementById('precio_venta'), 'is-invalid');
      if (this.precioVentaInput === null) {
        this.mostrarSnackbar('Debe completar el campo Precio Venta', ['error-snackbar']);
      } else if (this.precioVentaInput <= 0) {
        this.mostrarSnackbar('El valor en el campo Precio Venta debe ser mayor a 0', ['error-snackbar']);
      } else {
        this.mostrarSnackbar('No se pueden ingresar valores negativos en el campo Precio Venta', ['error-snackbar']);
      }
    }
  }
  
  CantidadValidacion() {
    // Verifica si el valor de cantidad es un número válido y mayor o igual a 0
    if (this.cantidadInput !== null && typeof this.cantidadInput === 'number' && isFinite(this.cantidadInput) && this.cantidadInput > 0) {
      // Valor válido, remueve la clase is-invalid
      this.renderer.removeClass(document.getElementById('cantidad'), 'is-invalid');
    } else {
      // Valor no válido, agrega la clase is-invalid
      this.renderer.addClass(document.getElementById('cantidad'), 'is-invalid');
      if (this.cantidadInput === null) {
        this.mostrarSnackbar('Debe completar el campo Cantidad', ['error-snackbar']);
      } else if (this.cantidadInput <= 0) {
        this.mostrarSnackbar('El valor en el campo Cantidad debe ser mayor a 0', ['error-snackbar']);
      } else {
        this.mostrarSnackbar('No se pueden ingresar valores negativos en el campo Cantidad', ['error-snackbar']);
      }
    }
  }
  
  ReservaValidacion() {
    // Verifica si el valor de reserva es un número válido y mayor o igual a 0
    if (this.reservaInput !== null && typeof this.reservaInput === 'number' && isFinite(this.reservaInput) && this.reservaInput > 0) {
      // Valor válido, remueve la clase is-invalid
      this.renderer.removeClass(document.getElementById('reserva'), 'is-invalid');
    } else {
      // Valor no válido, agrega la clase is-invalid
      this.renderer.addClass(document.getElementById('reserva'), 'is-invalid');
      if (this.reservaInput === null) {
        this.mostrarSnackbar('Debe completar el campo Reserva', ['error-snackbar']);
      } else if (this.reservaInput <= 0) {
        this.mostrarSnackbar('El valor en el campo Reserva debe ser mayor a 0', ['error-snackbar']);
      } else {
        this.mostrarSnackbar('No se pueden ingresar valores negativos en el campo Reserva', ['error-snackbar']);
      }
    }
  }

  registrarProducto() {
    this.PrecioCompraValidacion();
    this.PrecioVentaValidacion();
    this.CantidadValidacion();
    this.ReservaValidacion();
    // Validación de campos
    if (
      this.precioCompraInput === null || this.precioVentaInput === null || 
      this.reservaInput === null || this.cantidadInput === null ||
      this.precioCompraInput <= 0 || this.precioVentaInput <= 0 ||
      this.reservaInput < 0 || this.cantidadInput < 0
    ) {
      // Muestra un mensaje de error
      this.mostrarSnackbar('Por favor, complete o ingrese valores validos para los campos marcados.', ['error-snackbar']);
      return;
    }
    

    // Convertir this.selectedProduct a un número entero
    const selectedProductId = parseInt(this.selectedProduct, 10);

    // Buscar el producto por ID
    const producto = this.productos.find(producto => producto.id === selectedProductId);

    // Verificar si se encontró el producto
    if (producto) {
      // El producto fue encontrado, puedes usar la variable 'producto' aquí
      console.log(producto);
    } else {
      // El producto no fue encontrado
      console.log('Producto no encontrado');
    }



    const productoExistente = this.dataSource.find(item => item.cod_product === producto.id);

    if (productoExistente) {
      // Muestra una alerta, mensaje o toma la acción que consideres apropiada
      console.log('Este producto ya está en la tabla.');
      return;
    }

    // Manejo de valores nulos
    const cantidad = this.cantidadInput !== null ? this.cantidadInput : 0;
    const reserva = this.reservaInput !== null ? this.reservaInput : 0;
    const precioCompra = this.precioCompraInput !== null ? this.precioCompraInput : 0;
    const precioVenta = this.precioVentaInput !== null ? this.precioVentaInput : 0;
    console.log("ID: ", producto.id,);

    const newRow: PeriodicElement = {
      position: this.dataSource.length + 1,
      cod_product: producto.id,
      nombre: producto.nombre,
      cantidad: cantidad,
      reserva: reserva,
      precio_compra: precioCompra,
      precio_venta: precioVenta,
      importe: this.calcularImporte(cantidad, precioCompra),
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
  }

  limpiarTabla() {
    // Reinicializa la tabla con 10 filas vacías
    this.dataSource = [];
    // Restaura la bandera
    this.isProductoSeleccionado = false;
    // Restablece los valores de los campos a 0 antes de deshabilitarlos
    this.limpiarCampos();
    this.limpiarProveedor();
    // Actualiza el total después de limpiar la tabla
    this.actualizarTotal();
  }

  limpiarProveedor() {
    this.selectedProveedor = null;
  }

  limpiarCampos() {
    // Restablece los valores de los campos a 0
    this.cantidadInput = null;
    this.reservaInput = null;
    this.precioCompraInput = null;
    this.precioVentaInput = null;
    this.selectedProduct = null;
  }
  // Método para calcular el importe
  calcularImporte(cantidad: number, precioCompra: number): number {
    return cantidad * precioCompra;
  }
  // Método para actualizar el total
  actualizarTotal() {
    // Suma los importes de todas las filas
    this.total = this.dataSource.reduce((acc, curr) => acc + curr.importe, 0);
  }
  // Método para eliminar un registro
  eliminarRegistro(position: number) {
    // Encuentra el índice del registro a eliminar
    const index = this.dataSource.findIndex(element => element.position === position);

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

  guardar() {
    // Check if there are entries in the table
    if (this.dataSource.length === 0) {
      console.log('La tabla está vacía. No hay datos para guardar.');
      this.mostrarSnackbar('La tabla está vacía. No hay datos para guardar.', ['error-snackbar']);
      return;
    }

    // Create an array to hold the data to be saved for the main entry
    const entradaData = {
      fecha: new Date(), // Adjust based on your requirements
      id_proveedor: this.selectedProveedor,
      importe_total: this.total,
    };

    // Call the saveEntrada method from the IngresosService to save the main entry
    this.ingresosService.saveEntrada(entradaData).subscribe(
      (entradaResponse) => {
        console.log('Entrada saved successfully:', entradaResponse);

        // Create an array to hold the data to be saved for details
        const detallesData: any[] = this.dataSource.map((element) => ({
          id_producto: element.cod_product,
          cantidad: element.cantidad,
          precio_compra: element.precio_compra,
          precio_venta: element.precio_venta,
          reserva: element.reserva,
          importe: element.importe,

        }));

        // Call the saveEntradaDetalle method from the IngresosService to save the details
        this.ingresosService.saveEntradaDetalle(entradaResponse.id, detallesData).subscribe(
          (detallesResponse) => {
            console.log('Entrada Detalle saved successfully:', detallesResponse);
            this.mostrarSnackbar('Operación completada con éxito.', ['success-snackbar'], 2000);
            // Reset the form or perform any other necessary actions after saving
            this.limpiarTabla();
          },
          (error) => {
            console.error('Error saving Entrada Detalle:', error);
          }
        );
        this.limpiarProveedor();
      },
      (error) => {
        console.error('Error saving Entrada:', error);
      }
    );
  }

  mostrarSnackbar(mensaje: string, panelClass: string[] = [], duration: number = 5000): void {
    const config: MatSnackBarConfig = {
      duration: duration,
      panelClass: panelClass
    };
    this.snackBar.open(mensaje, 'Cerrar', config);
  }
}
