import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from './component/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private dialog: MatDialog) { }

  showAlert(type: string, message: string, size: number, info: any): void {
    this.dialog.open(AlertComponent, {
      data: {
        type: type,
        message: message,
        size: size,
        info: info
      },
    });
  }
}
