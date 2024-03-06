import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-categoria-dialog',
  templateUrl: './crear-categoria-dialog.component.html',
  styleUrls: ['./crear-categoria-dialog.component.css']
})
export class CrearCategoriaDialogComponent {
  categoriaForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CrearCategoriaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      // Agrega más campos según tus necesidades
    });
  }

  save() {
    if (this.categoriaForm.valid) {
      this.dialogRef.close(this.categoriaForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
