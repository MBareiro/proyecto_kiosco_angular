import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-producto-dialog',
  templateUrl: './editar-producto-dialog.component.html',
  styleUrls: ['./editar-producto-dialog.component.css']
})
export class EditarProductoDialogComponent {
  productoForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditarProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.productoForm = this.formBuilder.group({
      // Define tus campos de formulario aquí
      nombre: [data.nombre, Validators.required],
      cantidad: [data.cantidad, Validators.required],
      reserva: [data.reserva, Validators.required],
      medida: [data.medida, Validators.required],
      id_categoria: [data.id_categoria, Validators.required],
      precio_venta: [data.precio_venta, Validators.required],
    });
  }

  // En EditarProductoDialogComponent
  guardarCambios() {
    // Agrega el ID del producto antes de cerrar el diálogo
    const productoEditado = { ...this.productoForm.value, id: this.data.id };
    console.log(productoEditado);
    
    this.dialogRef.close(productoEditado);
  }
  cerrarDialog() {
    this.dialogRef.close();
  }
}
