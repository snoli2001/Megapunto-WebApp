/* eslint-disable @typescript-eslint/no-shadow */
import { BalanceService } from './../../../balance/balance.service';
/* eslint-disable arrow-parens */
import { AlertService } from './../../../../../../utils/alert/alert.service';
import { HomeService } from './../../home.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-top-up-cellphone-ballance',
    templateUrl: './top-up-cellphone-ballance.component.html',
    styleUrls: ['./top-up-cellphone-ballance.component.scss'],
})
export class TopUpCellphoneBallanceComponent implements OnInit {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    nu_precio: number = null;
    disable: boolean;
    businessInformation$: any;
    // invalidAmount: boolean;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<TopUpCellphoneBallanceComponent>,
        private homeService: HomeService,
        private _alertService: AlertService
    ) {}
    get invalidAmount(): boolean {
        return Number(this.nu_precio) < this.data.value.product.nu_imp_minimo ||
            Number(this.nu_precio) > this.data.value.product.nu_imp_maximo
            ? true
            : false;
    }

    ngOnInit(): void {
        this.matDialogRef.updateSize(this.data.size);
        this.getBusinessInformation();
    }

    topUpCellphoneBalance(): void {
        if (Number(this.nu_precio) > 0) {
            this.disable = true;
            this.homeService
                .topUpCellphoneBalance(
                    this.data.value.product.nu_id_producto_app,
                    this.data.value.product.vc_cod_producto,
                    this.data.value.vc_numero_servicio,
                    String(this.nu_precio)
                )
                .subscribe((resp) => {
                    this.disable = false;
                    if (resp.nu_tran_stdo === '0') {
                        this._alertService
                            .showAlert('error', resp.tx_tran_mnsg, 500, null)
                            .afterClosed()
                            .subscribe((closeOperation) => {
                                if (closeOperation === true) {
                                    this.close();
                                }
                            });
                    } else {
                        this.matDialogRef.close(resp);
                    }
                });
        }
    }

    getBusinessInformation(): void {
        this.businessInformation$ = this.homeService.getBusinessInformation(
            this.data.value.vc_numero_servicio
        );
    }

    close(): void {
        this.matDialogRef.close();
    }
}
