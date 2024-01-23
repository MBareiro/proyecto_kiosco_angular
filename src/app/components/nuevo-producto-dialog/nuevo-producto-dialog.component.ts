import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service'; // Ajusta la ruta según tu estructura
import { Categoria } from '../categorias/categorias.component';

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
    private categoriaService: CategoriaService // Ajusta el servicio según tu estructura
  ) {
    this.productoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      reserva: ['', Validators.required],
      precio_compra: ['', Validators.required],
      precio_venta: ['', Validators.required],
      medida: ['', Validators.required],
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
        console.log(this.categorias);
        
      },
      (error) => {
        console.error('Error al obtener las categorías', error);
      }
    );
  }

  guardarNuevoProducto() {
    const nuevoProducto = this.productoForm.value;
    nuevoProducto.cantidad = parseInt(nuevoProducto.cantidad);

    // Puedes realizar acciones adicionales antes de cerrar el diálogo si es necesario
    this.dialogRef.close(nuevoProducto);
  }

  cerrarDialog() {
    this.dialogRef.close();
  }
}
