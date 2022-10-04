import { PrintInvoiceService } from './../../services/print-invoice.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import printJS from 'print-js';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<AlertComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _printInvoiceService: PrintInvoiceService
    ) {}

    ngOnInit(): void {
        this.dialogRef.updateSize(this.data.size);
    }

    tryAgain(): void {
        this.dialogRef.close(false);
    }

    onClose(): void {
        this.dialogRef.close(true);
    }

    printInvoice(): void {
        this._printInvoiceService
            .getInvoice(this.data.nu_id_trx_app)
            .subscribe((resp) => {
                printJS({
                    printable: resp.vc_ruta_archivo,
                    type: 'pdf',
                    showModal: true,
                });
            });
    }
}
