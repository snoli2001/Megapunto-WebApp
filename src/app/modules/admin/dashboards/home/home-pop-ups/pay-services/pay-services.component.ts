import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
} from '@angular/forms';
/* eslint-disable arrow-parens */
import { Observable } from 'rxjs';
import { GetServicesResponse } from './interfaces/GetServicesResponse';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit } from '@angular/core';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AlertService } from 'app/utils/alert/alert.service';
import { BalanceService } from '../../../balance/balance.service';
import { PayServicesService } from './services/pay-services.service';
import { EnterpriseService } from '../../home.interfaces';
import { MatStepper } from '@angular/material/stepper';
import { ServiceDebt } from './interfaces/ServiceDebt.interface';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SendEmailComponent } from './components/send-email/send-email.component';

@Component({
    selector: 'app-pay-services',
    templateUrl: './pay-services.component.html',
    styleUrls: ['./pay-services.component.scss'],
})
export class PayServicesComponent implements OnInit {
    enterpriseServices$: Observable<GetServicesResponse[]>;
    enterpriseServiceDetailsForm: FormGroup;
    consultantCellphone = new FormControl('', [
        Validators.maxLength(9),
        Validators.required,
        Validators.minLength(9),
    ]);
    loading: boolean;
    nextClicked: boolean;
    debts: ServiceDebt[];
    debToPay: ServiceDebt;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { enterprise: EnterpriseService; size: any },
        private _alertService: AlertService,
        private fb: FormBuilder,
        private _balanceService: BalanceService,
        private payServices: PayServicesService,
        public matDialogRef: MatDialogRef<PayServicesComponent>,
        private dialog: MatDialog
    ) {}

    get enterpriseServiceSelected(): GetServicesResponse {
        return this.enterpriseServiceDetailsForm.get(
            'enterpriseServiceSelected'
        ).value;
    }

    ngOnInit(): void {
        this.matDialogRef.updateSize(this.data.size);
        this.initEnterpriseServiceDetailsForm();
        this.getServicesOfEnterprise();
    }

    initEnterpriseServiceDetailsForm(): void {
        this.enterpriseServiceDetailsForm = this.fb.group({
            enterpriseServiceSelected: [null, Validators.required],
            vc_numero_servicio: ['', Validators.required],
        });
    }

    getServicesOfEnterprise(): void {
        this.enterpriseServices$ = this.payServices.getEnterpriseServices(
            this.data.enterprise.nu_id_empresa_servicio_app
        );
        this.enterpriseServices$.subscribe((resp) => {
            this.enterpriseServiceDetailsForm
                .get('enterpriseServiceSelected')
                .setValue(resp[0]);
        });
    }

    compareFn(optionOne, optionTwo): boolean {
        return optionOne.nu_id_producto_app === optionTwo.nu_id_producto_app;
    }

    prevStep(stepper: MatStepper): void {
        if (stepper.selectedIndex === 2) {
            const enterpriseServiceDetails: GetServicesResponse =
                this.enterpriseServiceDetailsForm.get(
                    'enterpriseServiceSelected'
                ).value;
            const vc_numero_servicio: string =
                this.enterpriseServiceDetailsForm.get(
                    'vc_numero_servicio'
                ).value;
            this.payServices
                .getDebts(
                    enterpriseServiceDetails.nu_id_producto_app,
                    enterpriseServiceDetails.vc_cod_producto,
                    vc_numero_servicio
                )
                .subscribe((resp) => {
                    this.debts = resp;
                    if (resp.length === 1 && resp[0].nu_tran_stdo === '0') {
                        this._alertService.showAlert(
                            'error',
                            resp.tx_tran_mnsg,
                            500,
                            null
                        );
                        this.loading = false;
                    } else {
                        this.debToPay = this.debts[0];
                        this.loading = false;
                        stepper.previous();
                        this.nextClicked = false;
                    }
                });
        }
        if (stepper.selectedIndex === 1) {
            stepper.previous();
        }
    }

    convertToNumber(value: string): number {
        return parseFloat(value);
    }

    nextStep(stepper: MatStepper): void {
        this.nextClicked = true;
        if (stepper.selectedIndex === 0) {
            const enterpriseServiceDetails: GetServicesResponse =
                this.enterpriseServiceDetailsForm.get(
                    'enterpriseServiceSelected'
                ).value;
            const vc_numero_servicio: string =
                this.enterpriseServiceDetailsForm.get(
                    'vc_numero_servicio'
                ).value;
            if (this.enterpriseServiceDetailsForm.valid) {
                this.loading = true;
                this.payServices
                    .getDebts(
                        enterpriseServiceDetails.nu_id_producto_app,
                        enterpriseServiceDetails.vc_cod_producto,
                        vc_numero_servicio
                    )
                    .subscribe((resp) => {
                        this.debts = resp;
                        if (resp.length === 1 && resp[0].nu_tran_stdo === '0') {
                            this._alertService.showAlert(
                                'error',
                                resp.tx_tran_mnsg,
                                500,
                                null
                            );
                            this.loading = false;
                        } else {
                            this.debToPay = this.debts[0];
                            this.loading = false;
                            stepper.next();
                            this.nextClicked = false;
                        }
                    });
            }
        }
        if (stepper.selectedIndex === 1) {
            if (this.debToPay) {
                stepper.next();
            }
        }
    }

    payDebt(): void {
        const enterpriseServiceDetails: GetServicesResponse =
            this.enterpriseServiceDetailsForm.get(
                'enterpriseServiceSelected'
            ).value;
        const vc_numero_servicio: string =
            this.enterpriseServiceDetailsForm.get('vc_numero_servicio').value;
        if (
            this.consultantCellphone &&
            this.debToPay &&
            this.enterpriseServiceDetailsForm.valid
        ) {
            this.loading = true;
            this.payServices
                .payDebt(
                    enterpriseServiceDetails.nu_id_producto_app,
                    enterpriseServiceDetails.vc_cod_producto,
                    vc_numero_servicio,
                    this.debToPay.vc_numero_documento,
                    this.debToPay.nu_monto_deuda,
                    this.debToPay.nu_comision_comercio,
                    this.consultantCellphone.value,
                    this.debToPay.nu_comision_cliente
                )
                .subscribe((resp) => {
                    if (resp.nu_tran_stdo === '1') {
                        this._balanceService
                            .getBalance()
                            .subscribe((balanceResp) => {
                                this.loading = false;
                                const dialog = this.dialog.open(
                                    SendEmailComponent,
                                    {
                                        data: {
                                            message: resp.tx_tran_mnsg,
                                            nu_tran_pkey: resp.nu_tran_pkey,
                                        },
                                        width: '40%',
                                    }
                                );

                                dialog.afterClosed().subscribe((resp2) => {
                                    this._alertService.showAlert(
                                        'success',
                                        resp.tx_tran_mnsg,
                                        500,
                                        {
                                            balance:
                                                balanceResp.nu_saldo,
                                        }
                                    ).afterClosed()
                                    .subscribe(() => this.close());
                                });
                            });
                    }
                    if (resp.nu_tran_stdo === '0') {
                        this.loading = false;
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
