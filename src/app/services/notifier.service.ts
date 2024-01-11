import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(){
    this.snackBar.open('Notification message', 'Button Text', {
      duration:5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

}
