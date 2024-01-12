import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-proveedor-dialog',
  templateUrl: './editar-proveedor-dialog.component.html',
  styleUrls: ['./editar-proveedor-dialog.component.css']
})
export class EditarProveedorDialogComponent {
  proveedorForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditarProveedorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.proveedorForm = this.formBuilder.group({
      // Define tus campos de formulario aquí
      nombre: [data.nombre, Validators.required],
      telefono: [data.telefono, Validators.required],
      direccion: [data.direccion, Validators.required],
    });
  }

  // En EditarProveedorDialogComponent
  guardarCambios() {
    // Agrega el ID del proveedor antes de cerrar el diálogo
    const proveedorEditado = { ...this.proveedorForm.value, id: this.data.id };
    this.dialogRef.close(proveedorEditado);
  }
  cerrarDialog() {
    this.dialogRef.close();
  }
}
