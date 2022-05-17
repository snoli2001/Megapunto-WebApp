import { DigitalProduct, DigitalProductDetail } from './../../home.interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'app/utils/alert/alert.service';
import { HomeService } from '../../home.service';

@Component({
    selector: 'app-digital-products',
    templateUrl: './digital-products.component.html',
    styleUrls: ['./digital-products.component.scss'],
})
export class DigitalProductsComponent implements OnInit {
    digitalProductDetails$: Observable<DigitalProductDetail[]>;
    detailActive: DigitalProductDetail;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DigitalProduct,
        public matDialogRef: MatDialogRef<DigitalProductsComponent>,
        private homeService: HomeService,
        private _alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.digitalProductDetails$ =
            this.homeService.getDigitalProductsDetails(
                this.data.nu_id_grupo_app
            );
    }

    toggleDigitalDetails(detail: DigitalProductDetail): void {
        this.detailActive = detail;
    }
}
