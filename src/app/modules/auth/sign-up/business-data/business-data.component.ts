/* eslint-disable arrow-parens */
import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import {
    LineOfBusiness,
    PersonalInformationService,
} from '../personal-information/personal-information.service';

@Component({
    selector: 'app-business-data',
    templateUrl: './business-data.component.html',
    styleUrls: ['./business-data.component.scss'],
})
export class BusinessDataComponent implements OnInit {
    businessDataForm: FormGroup;
    showAlert: boolean = false;
    lineOfBusinesses$: Observable<LineOfBusiness[]>;
    withoutRUC: FormControl = new FormControl(false, Validators.required);

    constructor(
        private rootFormGroup: FormGroupDirective,
        private _personalInformationService: PersonalInformationService
    ) {}

    get ruc(): FormControl {
        return this.businessDataForm.controls['businessData'].get(
            'ruc'
        ) as FormControl;
    }

    get businessName(): FormControl {
        return this.businessDataForm.controls['businessData'].get(
            'businessName'
        ) as FormControl;
    }

    get tradeName(): FormControl {
        return this.businessDataForm.controls['businessData'].get(
            'tradeName'
        ) as FormControl;
    }

    get billType(): FormControl {
        return this.businessDataForm.controls['businessData'].get(
            'billType'
        ) as FormControl;
    }

    get isWithoutRUC(): boolean {
        return this.withoutRUC.value === false;
    }

    ngOnInit(): void {
        this.businessDataForm = this.rootFormGroup.control;
        this.getLineOfBusinessSelection();
        this.detectWithRUCChanges();
    }

    getNameByRUC(): void {
        if (this.ruc.valid) {
            this._personalInformationService
                .getBusinessNameByRUC(this.ruc.value)
                .subscribe((resp) => {
                    this.businessName.setValue(resp);
                });
        } else {
            this.ruc.markAllAsTouched();
        }
    }
    prevStep(): void {
        this.businessDataForm.get('step').setValue(1);
    }
    nextStep(): void {
        this.businessDataForm.get('businessData').markAllAsTouched();
        if (this.businessDataForm.controls['businessData'].valid) {
            this.businessDataForm.get('step').setValue(3);
        }
        console.log(this.businessDataForm.value);
    }

    getLineOfBusinessSelection(): void {
        this.lineOfBusinesses$ =
            this._personalInformationService.getLineOfBusinessSelection();
    }

    detectWithRUCChanges(): void {
        this.withoutRUC.valueChanges.subscribe((value) => {
            if (value === false) {
                this.ruc.clearValidators();
                this.billType.clearValidators();
                this.businessName.clearValidators();

                this.ruc.updateValueAndValidity();
                this.billType.updateValueAndValidity();
                this.businessName.updateValueAndValidity();
            } else {
                this.ruc.setValidators([Validators.required]);
                this.billType.setValidators([Validators.required]);
                this.businessName.setValidators([Validators.required]);

                this.ruc.setValue(
                    this.businessDataForm.controls['personalInformation'].get(
                        'documentNumber'
                    ).value
                );
                this.billType.setValue('BV');

                this.businessName.setValue(
                    this.businessDataForm.controls['personalInformation'].get(
                        'name'
                    ).value
                );

                this.ruc.updateValueAndValidity();
                this.billType.updateValueAndValidity();
                this.businessName.updateValueAndValidity();
            }
        });
    }
}
