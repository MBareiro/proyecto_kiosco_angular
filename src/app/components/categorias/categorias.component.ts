import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarCategoriaDialogComponent } from '../editar-categoria-dialog/editar-categoria-dialog.component';
import { NuevaCategoriaDialogComponent } from '../nueva-categoria-dialog/nueva-categoria-dialog.component';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatSnackBar } from '@angular/material/snack-bar';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

export interface Categoria {
  id: number;
  nombre: string;
}
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent {
  categorias: Categoria[] = [];
  filtroNombre: string = '';
  categoriaSeleccionado: Categoria = { id: 0, nombre: '' };

  displayedColumns: string[] = [
    'Cod. Prov.',
    'Nombre',
    'Telefono',
    'Direccion',
    'Acciones',
  ];

  constructor(
    private categoriaService: CategoriaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarCategoria();
  }

  generarPDF() {
    const documentDefinition: any = {
      content: [
        { text: 'Lista de Categoriaes', style: 'header' },
        '\n',
        {
          table: {
            headerRows: 1,
            body: [['Cod. Prov.', 'Nombre', 'Telefono', 'Direccion']],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
      },
    };

    // Agrega las filas de datos de categorias al body de la tabla en documentDefinition
    this.categorias.forEach((categoria) => {
      (
        documentDefinition.content[2] as { table: { body: string[][] } }
      ).table.body.push([categoria.id.toString(), categoria.nombre]);
    });

    pdfMake.createPdf(documentDefinition).open();
  }

  cargarCategoria() {
    // Carga la lista de categorias
    this.categoriaService.getCategorias().subscribe(
      (categorias) => {
        this.categorias = categorias;
        // Aplica el filtro después de cargar los categorias
        this.aplicarFiltro();
      },
      (error) => {
        console.error('Error al obtener la lista de categorias', error);
      }
    );
  }
 
  eliminarCategoria(idCategoria: number) {
    // En algún componente o servicio
    this.categoriaService.eliminarCategoria(idCategoria).subscribe(
      (respuesta) => {
        console.log('Categoría eliminada correctamente.', respuesta);
        this.snackBar.open('Categoria eliminada correctamente.', 'Cerrar', {
          duration: 3000,
        });
        // Realizar otras acciones necesarias después de eliminar la categoría
        this.cargarCategoria();
      },
      (error) => {
        console.error('Error al eliminar la categoría', error);
        this.snackBar.open(
          'No se puede eliminar la categoría. Hay productos asociados.',
          'Cerrar',
          {
            duration: 3000,
          }
        );
        // Manejar el error según tus necesidades
      }
    );
  }
  editarCategoria(id: string) {
    // Mueve la lógica del diálogo dentro de la suscripción
    this.categoriaService.getCategoriaById(id).subscribe(
      (categoria) => {
        this.categoriaSeleccionado = categoria;

        if (this.categoriaSeleccionado) {
          const dialogRef = this.dialog.open(EditarCategoriaDialogComponent, {
            width: '260px',
            data: { ...this.categoriaSeleccionado },
          });

          dialogRef.afterClosed().subscribe((result: Categoria | undefined) => {
            if (result) {
              this.categoriaService.actualizarCategoria(result).subscribe(
                (resultado) => {
                  console.log('Categoria actualizado correctamente', resultado);
                  this.snackBar.open('Categoria actualizada correctamente.', 'Cerrar', {
                    duration: 4000
                  });
                  this.cargarCategoria();
                },
                (error) => {
                  console.error('Error al actualizar el categoria', error);
                }
              );
            }
          });
        }
      },
      (error) => {
        console.error('Error al obtener el categoria', error);
      }
    );
  }
  aplicarFiltro() {
    // Filtra los categorias por nombre
    this.categorias = this.categorias.filter((categoria) =>
      categoria.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }
  limpiarFiltro() {
    this.filtroNombre = '';
    this.cargarCategoria();
  }
  

  abrirDialogoNuevoCategoria() {
    const dialogRef = this.dialog.open(NuevaCategoriaDialogComponent, {
      width: '260px',
    });

    dialogRef.afterClosed().subscribe((nuevoCategoria) => {
      if (nuevoCategoria) {
        // Lógica para agregar el nuevo categoria
        this.categoriaService.crearCategoria(nuevoCategoria).subscribe(
          (resultado) => {
            console.log('Categoria agregado correctamente', resultado);
            this.snackBar.open('Categoria agregada correctamente.', 'Cerrar', {
              duration: 4000
            });
            this.cargarCategoria();
          },
          (error) => {
            console.error('Error al agregar el categoria', error);
          }
        );
      }
    });
  }
}
