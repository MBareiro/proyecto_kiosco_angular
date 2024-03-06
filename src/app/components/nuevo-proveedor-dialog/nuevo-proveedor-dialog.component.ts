// nuevo-proveedor-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-proveedor-dialog',
  templateUrl: './nuevo-proveedor-dialog.component.html',
  styleUrls: ['./nuevo-proveedor-dialog.component.css']
})
export class NuevoProveedorDialogComponent {
  proveedorForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<NuevoProveedorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.proveedorForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }

  guardarNuevoProveedor() {
    // Puedes realizar acciones adicionales antes de cerrar el diálogo si es necesario
    this.dialogRef.close(this.proveedorForm.value);
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

  formularioEsValido(): boolean {
    return this.proveedorForm.valid;
  }
}
