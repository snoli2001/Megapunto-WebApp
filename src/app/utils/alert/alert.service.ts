/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from './component/alert.component';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    constructor(private dialog: MatDialog) {}

    showAlert(
        type: string,
        message: string,
        size: number,
        info: any,
        showBalance: boolean = false,
        nu_id_trx_app = null
    ): MatDialogRef<AlertComponent, any> {
        return this.dialog.open(AlertComponent, {
            data: {
                type: type,
                message: message,
                size: size,
                info: info,
                showBalance: showBalance,
                nu_id_trx_app,
            },
        });
    }
}
