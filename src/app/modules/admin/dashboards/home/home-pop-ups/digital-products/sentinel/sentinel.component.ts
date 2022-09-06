import { filter, map } from 'rxjs';
/* eslint-disable arrow-parens */
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
} from '@angular/forms';
/* eslint-disable @typescript-eslint/naming-convention */
import { Observable } from 'rxjs/internal/Observable';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'app/utils/alert/alert.service';
import { MatStepper } from '@angular/material/stepper';
import { forkJoin } from 'rxjs';
import { DigitalProductDetail, DigitalProduct } from '../../../home.interfaces';
import { HomeService } from '../../../home.service';
import { DocumentInterface } from '../interfaces/Document.interface';
import { ValidateDocumentIDResponse } from '../interfaces/ValidateDocumentIDResponse.interface';
import { BalanceService } from 'app/modules/admin/dashboards/balance/balance.service';
import { SentinelService } from '../services/sentinel.service';

@Component({
    selector: 'app-sentinel',
    templateUrl: './sentinel.component.html',
    styleUrls: ['./sentinel.component.scss'],
})
export class SentinelComponent implements OnInit {
    digitalProductDetails$: Observable<DigitalProductDetail[]>;
    detailActive: DigitalProductDetail;
    nextClicked: boolean = false;
    documentTypes$: Observable<DocumentInterface[]>;
    documentsValidationForm: FormGroup;
    withRUC: boolean = false;
    validDocuments = new FormControl(false, [
        Validators.required,
        Validators.requiredTrue,
    ]);
    amountOfFree: number;
    emailRegex: RegExp = new RegExp(
        '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
    );
    disable: boolean = false;
    detailSelectedForm = new FormControl(null, [Validators.required]);
    consultantInformationForm: FormGroup;
    consulted: ValidateDocumentIDResponse;
    consultant: ValidateDocumentIDResponse;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { digitalProduct: DigitalProduct; size: any },
        public matDialogRef: MatDialogRef<SentinelComponent>,
        private homeService: HomeService,
        private sentinelService: SentinelService,
        private _alertService: AlertService,
        private fb: FormBuilder,
        private _balanceService: BalanceService
    ) {}

    get consultantDocumentNumber(): string {
        return this.documentsValidationForm.get('consultantDocumentNumber')
            .value;
    }

    get consultedDocumentNumber(): string {
        return this.documentsValidationForm.get('consultedDocumentNumber')
            .value;
    }

    get InvalidEmail(): boolean {
        return (
            this.consultantInformationForm.get('email').invalid &&
            this.consultantInformationForm.get('email').touched
        );
    }

    get InvalidRUC(): boolean {
        return (
            this.consultantInformationForm.get('ruc').invalid &&
            this.consultantInformationForm.get('ruc').touched
        );
    }

    get InvalidCellphone(): boolean {
        return (
            this.consultantInformationForm.get('cellphone').invalid &&
            this.consultantInformationForm.get('cellphone').touched
        );
    }

    get InvalidBillType(): boolean {
        return (
            this.consultantInformationForm.get('billType').invalid &&
            this.consultantInformationForm.get('billType').touched
        );
    }

    ngOnInit(): void {
        this.digitalProductDetails$ =
            this.homeService.getDigitalProductsDetails(
                this.data.digitalProduct.nu_id_grupo_app
            );
        this.matDialogRef.updateSize(this.data.size);
        this.initDocumentsValidationForm();
        this.initConsultantInformationForm();
        this.detectWithRuc();
    }

    initDocumentsValidationForm(): void {
        this.documentsValidationForm = this.fb.group({
            consultedDocumentType: ['', Validators.required],
            consultedDocumentNumber: ['', [Validators.required]],
            consultantDocumentType: ['', Validators.required],
            consultantDocumentNumber: ['', [Validators.required]],
        });
    }

    initConsultantInformationForm(): void {
        this.consultantInformationForm = this.fb.group({
            email: [
                '',
                [Validators.required, Validators.pattern(this.emailRegex)],
            ],
            cellphone: [
                '',
                [
                    Validators.required,
                    Validators.minLength(9),
                    Validators.maxLength(9),
                ],
            ],
            billType: ['2', Validators.required],
            ruc: ['', [Validators.maxLength(11), Validators.minLength(11)]],
        });
    }

    initDocumentTypes(): void {
        this.documentTypes$ = this.sentinelService
            .getDocumentTypes()
            .pipe(
                map((documents) =>
                    documents.filter(
                        (document) => document.nu_id_tipo_doc_identidad !== '2'
                    )
                )
            );
    }

    getAmountOfFree(): void {
        this.sentinelService
            .getFree(Number(this.detailActive.nu_id_producto_app))
            .subscribe((value) => (this.amountOfFree = value[0].nu_saldo));
    }

    isSentinel(): boolean {
        return this.data.digitalProduct.nu_id_grupo_app === '1';
    }

    validateDocument(
        nu_id_tipo_doc_identidad: string,
        vc_nro_doc_identidad: string
    ): Observable<ValidateDocumentIDResponse> {
        return this.sentinelService.validateDocumentID(
            nu_id_tipo_doc_identidad,
            vc_nro_doc_identidad
        );
    }

    validateDocumentsInForm(): Observable<
        [ValidateDocumentIDResponse, ValidateDocumentIDResponse]
    > {
        const consultantDocumentType = this.documentsValidationForm.get(
            'consultantDocumentType'
        ).value;
        const consultantDocumentNumber = this.documentsValidationForm.get(
            'consultantDocumentNumber'
        ).value;
        const consultedDocumentType = this.documentsValidationForm.get(
            'consultedDocumentType'
        ).value;
        const consultedDocumentNumber = this.documentsValidationForm.get(
            'consultedDocumentNumber'
        ).value;
        const validation1 = this.validateDocument(
            consultantDocumentType,
            consultantDocumentNumber
        );
        const validation2 = this.validateDocument(
            consultedDocumentType,
            consultedDocumentNumber
        );
        return forkJoin([validation1, validation2]);
    }

    toggleDigitalDetails(detail: DigitalProductDetail): void {
        this.detailActive = detail;
        this.detailSelectedForm.setValue(detail);
    }

    prevStep(stepper: MatStepper): void {
        stepper.previous();
    }

    nextStep(stepper: MatStepper): void {
        this.nextClicked = true;
        if (stepper.selectedIndex === 0 && this.nextClicked) {
            if (this.detailSelectedForm.valid) {
                this.initDocumentTypes();
                this.documentsValidationForm.markAsUntouched();
                this.getAmountOfFree();
                stepper.next();
                this.nextClicked = false;
            }
        }

        if (stepper.selectedIndex === 1 && this.nextClicked) {
            this.documentsValidationForm.markAllAsTouched();
            if (this.documentsValidationForm.valid) {
                this.disable = true;
                this.validateDocumentsInForm().subscribe((resp) => {
                    if (resp[0].codigoWS === '0' && resp[1].codigoWS === '0') {
                        this.consultant = resp[0];
                        this.consulted = resp[1];

                        this.validDocuments.setValue(true);
                        this.disable = false;
                        stepper.next();
                    } else {
                        const indexError: number[] = [];
                        const errors = resp.filter((r, index) => {
                            if (r.codigoWS !== '0') {
                                indexError.push(index);
                                return r;
                            }
                        });
                        if (errors.length === 2) {
                            this._alertService.showAlert(
                                'error',
                                'Ninguno de los documentos ingresados son validos',
                                500,
                                null
                            );
                        } else {
                            if (indexError[0] === 0) {
                                this._alertService.showAlert(
                                    'error',
                                    'El Documento del solicitante es inválido',
                                    500,
                                    null
                                );
                            }

                            if (indexError[0] === 1) {
                                this._alertService.showAlert(
                                    'error',
                                    'El Documento del consultado es inválido',
                                    500,
                                    null
                                );
                            }
                        }
                    }
                });
            }
            this.nextClicked = false;
        }
    }

    sellDigitalProduct(): void {
        this.consultantInformationForm.markAllAsTouched();
        if (this.consultantInformationForm.valid) {
            this.disable = true;
            this.sentinelService
                .insertTransaction(
                    this.detailActive.nu_id_producto_app,
                    this.detailActive.vc_cod_producto,
                    this.documentsValidationForm.get('consultantDocumentType')
                        .value,
                    this.documentsValidationForm.get('consultantDocumentType')
                        .value,
                    this.documentsValidationForm.get('consultantDocumentNumber')
                        .value,
                    this.consultantInformationForm.get('cellphone').value,
                    this.consultantInformationForm.get('email').value,
                    this.documentsValidationForm.get('consultedDocumentType')
                        .value,
                    this.documentsValidationForm.get('consultedDocumentType')
                        .value,
                    this.documentsValidationForm.get('consultedDocumentType')
                        .value,
                    this.consultantInformationForm.get('billType').value,
                    this.consultantInformationForm.get('ruc').value
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
                                            balance: Number(
                                                respBalance.nu_saldo
                                            ),
                                        },
                                        true
                                    )
                                    .afterClosed()
                                    .subscribe(() => this.close());
                            });
                    }
                    if (resp.nu_tran_stdo === '0') {
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

    detectWithRuc(): void {
        this.consultantInformationForm
            .get('billType')
            .valueChanges.subscribe((value) => {
                if (value === '1') {
                    this.withRUC = true;
                    this.consultantInformationForm
                        .get('ruc')
                        .addValidators([Validators.required]);
                    this.consultantInformationForm
                        .get('ruc')
                        .updateValueAndValidity();
                } else if (value === '2') {
                    this.withRUC = false;
                    this.consultantInformationForm
                        .get('ruc')
                        .removeValidators(Validators.required);
                    this.consultantInformationForm
                        .get('ruc')
                        .updateValueAndValidity();
                }
            });
    }

    close(): void {
        this.matDialogRef.close();
    }
}
