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
    nu_precio = 0;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<TopUpCellphoneBallanceComponent>,
        private homeService: HomeService
    ) {}

    ngOnInit(): void {}

    updateNuPrecio(event): void {
        this.nu_precio = event.target.value;
    }

    topUpCellphoneBalance(): void {
        if (this.nu_precio > 0) {
            this.homeService
                .topUpCellphoneBalance(
                    this.data.product.nu_id_producto_app,
                    this.data.product.vc_cod_producto,
                    this.data.vc_numero_servicio,
                    String(this.nu_precio)
                )
                .subscribe(resp => this.close());
        }
    }

    close(): void {
        this.matDialogRef.close();
    }
}
