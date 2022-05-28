import { DigitalProductDetail } from './../../../home.interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DigitalProduct } from '../../../home.interfaces';
import { HomeService } from '../../../home.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
    selector: 'app-incomm',
    templateUrl: './incomm.component.html',
    styleUrls: ['./incomm.component.scss'],
})
export class IncommComponent implements OnInit {
    buyerInformationForm: FormGroup;
    detailActive: DigitalProductDetail;
    digitalProductDetails$: Observable<DigitalProductDetail[]>;
    disable: boolean = false;
    nextClicked: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { digitalProduct: DigitalProduct; size: any },
        private fb: FormBuilder,
        private homeService: HomeService,
        public matDialogRef: MatDialogRef<IncommComponent>
    ) {}

    ngOnInit(): void {
        this.initBuyerInformationForm();
        this.digitalProductDetails$ =
            this.homeService.getDigitalProductsDetails(
                this.data.digitalProduct.nu_id_grupo_app
            );
    }

    initBuyerInformationForm(): void {
        this.buyerInformationForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            cellphone: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(9),
                    Validators.minLength(9),
                ],
            ],
        });
    }

    toggleDigitalDetails(detail: DigitalProductDetail): void {
        this.detailActive = detail;
        console.log(detail);
    }

    nextStep(stepper: MatStepper): void {
        this.nextClicked = true;
        if (stepper.selectedIndex === 0) {
            if (this.detailActive) {
                stepper.next();
            }
        }
    }

    close(): void {
        this.matDialogRef.close();
    }
}
