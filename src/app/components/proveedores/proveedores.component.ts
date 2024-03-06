import { Component } from '@angular/core';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarProveedorDialogComponent } from '../editar-proveedor-dialog/editar-proveedor-dialog.component';
import { NuevoProveedorDialogComponent } from '../nuevo-proveedor-dialog/nuevo-proveedor-dialog.component';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatSnackBar } from '@angular/material/snack-bar';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

export interface Proveedor {
  id: number;
  nombre: string;
  telefono: string;
  direccion: string;
}

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
  proveedores: Proveedor[] = [];
  filtroNombre: string = '';
  proveedorSeleccionado: Proveedor = { id: 0, nombre: '', telefono: '', direccion: '' };

  displayedColumns: string[] = [
    'Cod. Prov.',
    'Nombre',
    'Telefono',
    'Direccion',
    'Acciones'
  ];

  constructor(private proveedorService: ProveedorService, private dialog: MatDialog, private snackBar: MatSnackBar,) {}

  ngOnInit(): void {
    this.cargarProveedores();
  }

  generarPDF() {
    const documentDefinition: any = {
      content: [
        { text: 'Lista de Proveedores', style: 'header' },
        '\n',
        {
          table: {
            headerRows: 1,
            body: [
              ['Cod. Prov.', 'Nombre', 'Telefono', 'Direccion']
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
  
    // Agrega las filas de datos de proveedores al body de la tabla en documentDefinition
    this.proveedores.forEach(proveedor => {
      (documentDefinition.content[2] as { table: { body: string[][] } }).table.body.push([
        proveedor.id.toString(),
        proveedor.nombre,
        proveedor.telefono,
        proveedor.direccion
      ]);
    });
    pdfMake.createPdf(documentDefinition).open();
  }

  cargarProveedores() {
    // Carga la lista de proveedores
    this.proveedorService.getProveedores().subscribe(
      (proveedores) => {
        this.proveedores = proveedores;
        // Aplica el filtro después de cargar los proveedores
        this.aplicarFiltro();
      },
      (error) => {
        console.error('Error al obtener la lista de proveedores', error);
      }
    );
  }  
  
  cargarProveedor(id: string) {
    this.proveedorService.getProveedorById(id).subscribe(
      (proveedor) => {
        this.proveedorSeleccionado = proveedor;
      },
      (error) => {
        console.error('Error al obtener el proveedor', error);
      }
    );
  }
  
  eliminarProveedor(idProveedor: number) {
    // Lógica para eliminar un proveedor
    this.proveedorService.deleteProveedor(idProveedor).subscribe(
      () => {
        console.log('Proveedor eliminado correctamente.');
        this.snackBar.open('Proveedor eliminado correctamente.', 'Cerrar', {
          duration: 4000
        });
        // Vuelve a cargar la lista de proveedores después de la eliminación
        this.cargarProveedores();
      },
      (error) => {
        console.error('Error al eliminar el proveedor', error);
        this.snackBar.open(
          'No se puede eliminar proveedor. Hay entradas asociadas.',
          'Cerrar',
          {
            duration: 3000,
          }
        );
      }
    );
  }

  editarProveedor(id: string) {
    // Mueve la lógica del diálogo dentro de la suscripción
    this.proveedorService.getProveedorById(id).subscribe(
      (proveedor) => {
        this.proveedorSeleccionado = proveedor;
  
        if (this.proveedorSeleccionado) {
          const dialogRef = this.dialog.open(EditarProveedorDialogComponent, {
            width: '260px',
            data: { ...this.proveedorSeleccionado },
          });
  
          dialogRef.afterClosed().subscribe((result: Proveedor | undefined) => {
            if (result) {
              this.proveedorService.actualizarProveedor(result).subscribe(
                (resultado) => {
                  console.log('Proveedor actualizado correctamente', resultado);
                  this.snackBar.open('Proveedor actualizado correctamente.', 'Cerrar', {
                    duration: 4000
                  });
                  this.cargarProveedores();
                },
                (error) => {
                  console.error('Error al actualizar el proveedor', error);
                }
              );
            }
          });
        }
      },
      (error) => {
        console.error('Error al obtener el proveedor', error);
      }
    );
  }  
  aplicarFiltro() {
    // Filtra los proveedores por nombre
    this.proveedores = this.proveedores.filter(proveedor =>
      proveedor.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }
  limpiarFiltro() {
    this.filtroNombre = '';
    this.cargarProveedores();
  }  
  
  abrirDialogoNuevoProveedor() {
    const dialogRef = this.dialog.open(NuevoProveedorDialogComponent, {
      width: '260px',
    });
  
    dialogRef.afterClosed().subscribe((nuevoProveedor) => {
      if (nuevoProveedor) {
        // Lógica para agregar el nuevo proveedor
        this.proveedorService.crearProveedor(nuevoProveedor).subscribe(
          (resultado) => {
            console.log('Proveedor agregado correctamente', resultado);
            this.snackBar.open('Proveedor agregado correctamente.', 'Cerrar', {
              duration: 4000
            });
            this.cargarProveedores();
          },
          (error) => {
            console.error('Error al agregar el proveedor', error);
          }
        );
      }
    });
  
  }
  
}
