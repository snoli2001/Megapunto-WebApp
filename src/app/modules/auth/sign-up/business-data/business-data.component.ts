import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
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

    ngOnInit(): void {
        this.businessDataForm = this.rootFormGroup.control;
        this.getLineOfBusinessSelection();
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
        if (this.businessDataForm.controls['businessData'].valid) {
            this.businessDataForm.get('step').setValue(3);
        }
    }

    getLineOfBusinessSelection(): void {
        this.lineOfBusinesses$ =
            this._personalInformationService.getLineOfBusinessSelection();
    }
}
