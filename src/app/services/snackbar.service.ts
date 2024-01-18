// snackbar.service.ts

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  mostrarSnackbar(mensaje: string, panelClass: string[] = [], duracion: number = 5000) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: duracion,
      panelClass: panelClass,
    });
  }
}
