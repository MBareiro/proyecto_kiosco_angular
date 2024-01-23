
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nueva-categoria-dialog',
  templateUrl: './nueva-categoria-dialog.component.html',
  styleUrls: ['./nueva-categoria-dialog.component.css']
})
export class NuevaCategoriaDialogComponent {
  categoriaForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<NuevaCategoriaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.categoriaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }

  guardarNuevoCategoria() {
    // Puedes realizar acciones adicionales antes de cerrar el diálogo si es necesario
    this.dialogRef.close(this.categoriaForm.value);
  }

  cerrarDialog() {
    this.dialogRef.close();
  }
}
