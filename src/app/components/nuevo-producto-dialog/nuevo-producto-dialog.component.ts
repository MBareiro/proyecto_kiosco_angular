import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from '../../services/categoria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from '../categorias/categorias.component';
import { CrearCategoriaDialogComponent } from '../crear-categoria-dialog/crear-categoria-dialog.component';

@Component({
  selector: 'app-nuevo-producto-dialog',
  templateUrl: './nuevo-producto-dialog.component.html',
  styleUrls: ['./nuevo-producto-dialog.component.css']
})
export class NuevoProductoDialogComponent implements OnInit {
  productoForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private dialogRef: MatDialogRef<NuevoProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.productoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      id_categoria: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.getCategorias().subscribe(
      (categorias) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error('Error al obtener las categorías', error);
      }
    );
  }

  guardarNuevoProducto() {
    const nuevoProducto = this.productoForm.value;
    this.dialogRef.close(nuevoProducto);
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

  openCrearCategoriaDialog(event: Event): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(CrearCategoriaDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.categoriaService.crearCategoria(result).subscribe(
          (createdCategoria: Categoria) => {
            this.snackBar.open('Categoría creada con éxito', 'Cerrar', {
              duration: 4000,
            });
            // Asigna la nueva categoría al campo id_categoria del formulario
            this.productoForm.patchValue({ id_categoria: createdCategoria.id });
            // Recarga las categorías para actualizar la lista en el select
            this.cargarCategorias();
          },
          (error) => {
            console.error('Error al crear la categoría', error);
          }
        );
      }
    });
  }

  formularioEsValido(): boolean {
    return this.productoForm.valid;
  }
  
}
