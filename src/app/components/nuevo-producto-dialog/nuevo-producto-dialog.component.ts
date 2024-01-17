import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-producto-dialog',
  templateUrl: './nuevo-producto-dialog.component.html',
  styleUrls: ['./nuevo-producto-dialog.component.css']
})
export class NuevoProductoDialogComponent {
  productoForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<NuevoProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
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

  guardarNuevoProducto() {
    // Obtén el valor del formulario
    const nuevoProducto = this.productoForm.value;
  
    // Convierte la cantidad a un número entero
    nuevoProducto.cantidad = parseInt(nuevoProducto.cantidad);
  
    // Puedes realizar acciones adicionales antes de cerrar el diálogo si es necesario
    this.dialogRef.close(nuevoProducto);
  }
  

  cerrarDialog() {
    this.dialogRef.close();
  }
}