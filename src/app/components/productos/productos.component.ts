import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { EditarProductoDialogComponent } from '../editar-producto-dialog/editar-producto-dialog.component';
import { NuevoProductoDialogComponent } from '../nuevo-producto-dialog/nuevo-producto-dialog.component';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

export interface Producto {
  id: number;
  nombre: string;
  cantidad: number;
  precio_venta: string;
  medida: string;
  id_categoria: string;
  reserva: number;
}

const ELEMENT_DATA: Producto[] = [];

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  productos: any[] = [];
  filtroNombre: string = '';
  productoSeleccionado: Producto = {
    id: 0,
    nombre: '',
    cantidad: 0,
    precio_venta: '',
    medida: '',
    id_categoria: '',
    reserva: 0,
  };

  constructor(
    private productoService: ProductService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    // Inicializa la tabla con 10 filas vacías
    this.dataSource = [];
    this.cargarProductos();
  }
  generarPDF() {
    const documentDefinition: any = {
      content: [
        { text: 'Lista de Productos', style: 'header' },
        '\n',
        {
          table: {
            headerRows: 1,
            body: [
              ['Cod. Prod.', 'Nombre', 'Cantidad', 'Reserva', 'Precio venta', 'Medida']
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
    this.productos.forEach(producto => {
      (documentDefinition.content[2] as { table: { body: string[][] } }).table.body.push([
        producto.id,
        producto.nombre,
        producto.cantidad,
        producto.reserva,
        producto.precio_venta,
        producto.medida
      ]);
    });
  
    pdfMake.createPdf(documentDefinition).open();
  }
  
  cargarProductos() {
    // Carga la lista de productos
    this.productoService.getProductos().subscribe(
      (productos) => {
        this.productos = productos;
        console.log(this.productos);
      },
      (error) => {
        console.error('Error al obtener la lista de productos', error);
      }
    );
  }

  aplicarFiltro() {
    // Filtra los productos por nombre
    this.productos = this.productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }
  limpiarFiltro() {
    this.filtroNombre = '';
    this.cargarProductos();
  }

  abrirDialogoNuevoProducto() {
    const dialogRef = this.dialog.open(NuevoProductoDialogComponent, {
      width: '260px',
    });

    dialogRef.afterClosed().subscribe((nuevoProducto) => {
      if (nuevoProducto) {
        // Lógica para agregar el nuevo producto
        this.productoService.crearProducto(nuevoProducto).subscribe(
          (resultado) => {
            console.log('Producto agregado correctamente', resultado);
            this.cargarProductos();
          },
          (error) => {
            console.error('Error al agregar el producto', error);
          }
        );
      }
    });
  }

  eliminarProducto(idProducto: number) {
    // Lógica para eliminar un producto
    this.productoService.deleteProducto(idProducto).subscribe(
      () => {
        console.log('Producto eliminado correctamente.');
        // Vuelve a cargar la lista de productoes después de la eliminación
        this.cargarProductos();
      },
      (error) => {
        console.error('Error al eliminar el producto', error);
      }
    );
  }
  editarProducto(id: string) {
    // Mueve la lógica del diálogo dentro de la suscripción
    this.productoService.getProductoById(id).subscribe(
      (producto) => {
        this.productoSeleccionado = producto;

        if (this.productoSeleccionado) {
          const dialogRef = this.dialog.open(EditarProductoDialogComponent, {
            width: '260px',
            data: { ...this.productoSeleccionado },
          });

          dialogRef.afterClosed().subscribe((result: Producto | undefined) => {
            if (result) {
              this.productoService.actualizarProducto(result).subscribe(
                (resultado) => {
                  console.log('Producto actualizado correctamente', resultado);
                  this.cargarProductos();
                },
                (error) => {
                  console.error('Error al actualizar el producto', error);
                }
              );
            }
          });
        }
      },
      (error) => {
        console.error('Error al obtener el producto', error);
      }
    );
  }
  
  obtenerClaseEstilo(producto: Producto): string {
    const cantidad = Number(producto.cantidad);
    const reserva = Number(producto.reserva);
    return cantidad <= reserva ? 'resaltar-rojo' : '';
  }
  
  
}
