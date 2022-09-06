/* eslint-disable arrow-parens */
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
    amountOfFree: number;
    emailRegex: RegExp = new RegExp(
        '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
    );
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

    get invalidEmail(): boolean {
        return (
            this.buyerInformationForm.get('email').invalid &&
            this.buyerInformationForm.get('email').touched
        );
    }

    get invalidCellphone(): boolean {
        return (
            this.buyerInformationForm.get('cellphone').invalid &&
            this.buyerInformationForm.get('cellphone').touched
        );
    }

    ngOnInit(): void {
        this.initBuyerInformationForm();
        this.digitalProductDetails$ =
            this.homeService.getDigitalProductsDetails(
                this.data.digitalProduct.nu_id_grupo_app
            );
        this.matDialogRef.updateSize(this.data.size);
    }

    initBuyerInformationForm(): void {
        this.buyerInformationForm = this.fb.group({
            email: [
                '',
                [Validators.required, Validators.pattern(this.emailRegex)],
            ],
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

    getAmountOfFree(): void {
        this.incommService
            .getFree(Number(this.detailActive.nu_id_producto_app))
            .subscribe((value) => {
                this.amountOfFree = value[0].nu_saldo;
            });
    }

    toggleDigitalDetails(detail: DigitalProductDetail): void {
        this.detailActive = detail;
    }

    nextStep(stepper: MatStepper): void {
        this.nextClicked = true;
        if (stepper.selectedIndex === 0) {
            if (this.detailActive) {
                this.getAmountOfFree();
                stepper.next();
            }
        }
    }

    prevStep(stepper: MatStepper): void {
        stepper.previous();
    }

    sellDigitalProduct(): void {
        this.buyerInformationForm.markAllAsTouched();
        if (this.buyerInformationForm.valid) {
            this.disable = true;
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
                        this.disable = false;
                    }
                });
        }
    }

    close(): void {
        this.matDialogRef.close();
    }
}
