import { DigitalProduct, DigitalProductDetail } from './../../home.interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'app/utils/alert/alert.service';
import { HomeService } from '../../home.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
    selector: 'app-digital-products',
    templateUrl: './digital-products.component.html',
    styleUrls: ['./digital-products.component.scss'],
})
export class DigitalProductsComponent implements OnInit {
    digitalProductDetails$: Observable<DigitalProductDetail[]>;
    detailActive: DigitalProductDetail;
    nextClicked: boolean = false;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DigitalProduct,
        public matDialogRef: MatDialogRef<DigitalProductsComponent>,
        private homeService: HomeService,
        private _alertService: AlertService
    ) {
        console.log(data);
    }

    ngOnInit(): void {
        this.digitalProductDetails$ =
            this.homeService.getDigitalProductsDetails(
                this.data.nu_id_grupo_app
            );
    }

    isSentinel(): boolean {
        return this.data.nu_id_grupo_app === '1';
    }

    isIncomn(): boolean {
        return this.data.nu_id_grupo_app === '3';
    }

    toggleDigitalDetails(detail: DigitalProductDetail): void {
        this.detailActive = detail;
    }

    nestStep(stepper: MatStepper): void {
        this.nextClicked = true;
        if (stepper.selectedIndex === 0) {
            if (this.detailActive) {
                stepper.next();
                this.nextClicked = false;
            }
        }

        if (stepper.selectedIndex === 1) {
            stepper.next();
            this.nextClicked = false;
        }
    }

    close(): void {
        this.matDialogRef.close();
    }
}
