import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaService } from '../../services/categoria.service'; // Ajusta la ruta según tu estructura
import { Categoria } from '../categorias/categorias.component';
@Component({
  selector: 'app-editar-producto-dialog',
  templateUrl: './editar-producto-dialog.component.html',
  styleUrls: ['./editar-producto-dialog.component.css']
})
export class EditarProductoDialogComponent implements OnInit {
  productoForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private dialogRef: MatDialogRef<EditarProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService // Ajusta el servicio según tu estructura
  ) {
    this.productoForm = this.formBuilder.group({
      nombre: [data.nombre, Validators.required],
      cantidad: [data.cantidad, Validators.required],
      reserva: [data.reserva, Validators.required],
      medida: [data.medida, Validators.required],
      id_categoria: [data.id_categoria, Validators.required],
      precio_venta: [data.precio_venta, Validators.required],
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

  // En EditarProductoDialogComponent
  guardarCambios() {
    const productoEditado = { ...this.productoForm.value, id: this.data.id };
    this.dialogRef.close(productoEditado);
  }

  cerrarDialog() {
    this.dialogRef.close();
  }
}
