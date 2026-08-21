/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from 'app/utils/alert/alert.service';
import { InternationalRechargeService } from './services/international-recharge.service';
import {
    CountryCode,
    PresetAmount,
    InternationalRechargeDetail,
} from './interfaces/international-recharge.interface';

@Component({
    selector: 'app-international-recharge',
    templateUrl: './international-recharge.component.html',
    styleUrls: ['./international-recharge.component.scss'],
})
export class InternationalRechargeComponent implements OnInit {
    internationalRechargeForm: FormGroup;
    currentStep: number = 1;
    selectedAmount: number = null;
    countryCodes$: Observable<CountryCode[]>;
    presetAmounts: PresetAmount[] = [];
    rechargeDetail: InternationalRechargeDetail;
    disable: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<InternationalRechargeComponent>,
        private fb: FormBuilder,
        private internationalRechargeService: InternationalRechargeService,
        private _alertService: AlertService
    ) {}

    get phoneNumberInvalid(): boolean {
        const control = this.internationalRechargeForm.get('vc_numero_servicio');
        return control.invalid && control.touched;
    }

    get amountInvalid(): boolean {
        return this.selectedAmount === null;
    }

    ngOnInit(): void {
        this.matDialogRef.updateSize(this.data.size);
        this.initForm();
        this.loadCountryCodes();
        this.loadPresetAmounts();
    }

    initForm(): void {
        this.internationalRechargeForm = this.fb.group({
            vc_codigo_pais: ['+58', Validators.required],
            vc_numero_servicio: [
                '',
                [
                    Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(15),
                    Validators.pattern(/^[0-9]+$/),
                ],
            ],
        });
    }

    loadCountryCodes(): void {
        this.countryCodes$ = of([
            {
                codigo: 'VE',
                nombre: 'Venezuela',
                prefijo: '+58',
                bandera: '🇻🇪',
            },
            {
                codigo: 'CO',
                nombre: 'Colombia',
                prefijo: '+57',
                bandera: '🇨🇴',
            },
            {
                codigo: 'PE',
                nombre: 'Perú',
                prefijo: '+51',
                bandera: '🇵🇪',
            },
            {
                codigo: 'EC',
                nombre: 'Ecuador',
                prefijo: '+593',
                bandera: '🇪🇨',
            },
            {
                codigo: 'BO',
                nombre: 'Bolivia',
                prefijo: '+591',
                bandera: '🇧🇴',
            },
        ]);
    }

    loadPresetAmounts(): void {
        this.presetAmounts = [
            { valor: 100, moneda: 'Bs', etiqueta: '100 Bs' },
            { valor: 200, moneda: 'Bs', etiqueta: '200 Bs' },
            { valor: 300, moneda: 'Bs', etiqueta: '300 Bs' },
            { valor: 400, moneda: 'Bs', etiqueta: '400 Bs' },
            { valor: 500, moneda: 'Bs', etiqueta: '500 Bs' },
            { valor: 600, moneda: 'Bs', etiqueta: '600 Bs' },
            { valor: 2000, moneda: 'Bs', etiqueta: '2000 Bs' },
            { valor: 3400, moneda: 'Bs', etiqueta: '3400 Bs' },
        ];
    }

    selectAmount(amount: number): void {
        this.selectedAmount = amount;
    }

    continuar(): void {
        this.internationalRechargeForm.markAllAsTouched();

        if (!this.internationalRechargeForm.valid || !this.selectedAmount) {
            return;
        }

        this.disable = true;
        const formValue = this.internationalRechargeForm.value;

        this.internationalRechargeService
            .calculateCommission(this.selectedAmount, formValue.vc_codigo_pais)
            .subscribe({
                next: (resp) => {
                    this.disable = false;
                    if (resp.nu_tran_stdo === '1') {
                        this.rechargeDetail = {
                            vc_numero_completo: `${formValue.vc_codigo_pais} ${formValue.vc_numero_servicio}`,
                            vc_codigo_pais: formValue.vc_codigo_pais,
                            vc_numero_servicio: formValue.vc_numero_servicio,
                            nu_monto_recarga: this.selectedAmount,
                            nu_comision: parseFloat(resp.nu_comision || '0'),
                            nu_total: parseFloat(resp.nu_total || '0'),
                        };
                        this.currentStep = 2;
                    } else {
                        this._alertService.showAlert(
                            'error',
                            resp.tx_tran_mnsg ||
                                'Error al calcular la comisión',
                            500,
                            null
                        );
                    }
                },
                error: () => {
                    this.disable = false;
                    this._alertService.showAlert(
                        'error',
                        'Error al procesar la solicitud',
                        500,
                        null
                    );
                },
            });
    }

    confirmarRecarga(): void {
        this.disable = true;
        this.internationalRechargeService
            .executeInternationalRecharge(
                this.rechargeDetail.vc_codigo_pais,
                this.rechargeDetail.vc_numero_servicio,
                String(this.rechargeDetail.nu_monto_recarga)
            )
            .subscribe({
                next: (resp) => {
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
                },
                error: () => {
                    this.disable = false;
                    this._alertService.showAlert(
                        'error',
                        'Error al procesar la recarga',
                        500,
                        null
                    );
                },
            });
    }

    volver(): void {
        this.currentStep = 1;
    }

    close(): void {
        this.matDialogRef.close();
    }
}
