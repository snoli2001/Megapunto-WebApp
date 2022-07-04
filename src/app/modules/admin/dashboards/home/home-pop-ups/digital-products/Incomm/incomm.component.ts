import { BalanceService } from 'app/modules/admin/dashboards/balance/balance.service';
import { AlertService } from './../../../../../../../utils/alert/alert.service';
import { IncommService } from './../services/incomm.service';
import { DigitalProductDetail } from './../../../home.interfaces';
import { Observable } from 'rxjs/internal/Observable';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
} from '@angular/forms';
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
        private incommService: IncommService,
        private _alertService: AlertService,
        private _balanceService: BalanceService,
        public matDialogRef: MatDialogRef<IncommComponent>
    ) {}

    get email(): string {
        return this.buyerInformationForm.get('email').value;
    }

    get cellphone(): string {
        return this.buyerInformationForm.get('cellphone').value;
    }

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
    }

    nextStep(stepper: MatStepper): void {
        this.nextClicked = true;
        if (stepper.selectedIndex === 0) {
            if (this.detailActive) {
                stepper.next();
            }
        }
    }

    sellDigitalProduct(): void {
        this.buyerInformationForm.markAllAsTouched();
        if (this.buyerInformationForm.valid) {
            this.incommService
                .insertTransaction(
                    this.detailActive.vc_cod_producto,
                    this.email,
                    this.cellphone
                )
                .subscribe((resp) => {
                    if (resp.nu_tran_stdo === '1') {
                        this._balanceService
                            .getBalance()
                            .subscribe((respBalance) => {
                                this._alertService
                                    .showAlert(
                                        'success',
                                        resp.tx_tran_mnsg,
                                        500,
                                        {
                                            balance: respBalance.nu_saldo,
                                        }
                                    )
                                    .afterClosed()
                                    .subscribe(() => this.close());
                            });
                    } else {
                        this._alertService.showAlert(
                            'error',
                            resp.tx_tran_mnsg,
                            500,
                            null
                        );
                    }
                });
        }
    }

    close(): void {
        this.matDialogRef.close();
    }
}
