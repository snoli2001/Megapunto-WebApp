/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'app/utils/alert/alert.service';
import { BalanceService } from '../../../balance/balance.service';

@Component({
    selector: 'app-pay-services',
    templateUrl: './pay-services.component.html',
    styleUrls: ['./pay-services.component.scss'],
})
export class PayServicesComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { nu_id_empresa_servicio_app; size: any },
        private _alertService: AlertService,
        private _balanceService: BalanceService,
        public matDialogRef: MatDialogRef<PayServicesComponent>
    ) {}

    ngOnInit(): void {}

    close(): void {
        this.matDialogRef.close();
    }
}
