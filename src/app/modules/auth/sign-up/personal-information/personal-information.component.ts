/* eslint-disable arrow-parens */
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl } from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';
import {
    DocumentId,
    LineOfBusiness,
    PersonalInformationService,
} from './personal-information.service';

@Component({
    selector: 'app-personal-information',
    templateUrl: './personal-information.component.html',
    styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    personalInformationForm: FormGroup;
    showAlert: boolean = false;
    today: Date = new Date();
    documentIdTypes$: Observable<DocumentId[]>;
    lineOfBusinesses$: Observable<LineOfBusiness[]>;
    constructor(
        private rootFormGroup: FormGroupDirective,
        private _personalInformationService: PersonalInformationService
    ) {}

    get documentType(): FormControl {
        return this.personalInformationForm.controls['personalInformation'].get(
            'documentType'
        ) as FormControl;
    }

    get documentNumber(): FormControl {
        return this.personalInformationForm.controls['personalInformation'].get(
            'documentNumber'
        ) as FormControl;
    }

    get name(): FormControl {
        return this.personalInformationForm.controls['personalInformation'].get(
            'name'
        ) as FormControl;
    }

    ngOnInit(): void {
        this.personalInformationForm = this.rootFormGroup.control;
        this.getDocumentIdSelection();
    }

    nextStep(): void {
        if (
            this.personalInformationForm.controls['personalInformation'].valid
        ) {
            this.personalInformationForm.get('step').setValue(2);
        }
    }

    getNameByDNI(): void {
        if (this.documentType.valid && this.documentNumber.valid) {
            this._personalInformationService
                .getNameByDNI(this.documentNumber.value)
                .subscribe((resp) => {
                    this.name.setValue(resp);
                    console.log(this.name);
                });
        } else {
            this.documentType.markAllAsTouched();
            this.documentNumber.markAllAsTouched();
        }
    }

    getDocumentIdSelection(): void {
        this.documentIdTypes$ =
            this._personalInformationService.getDocumentIdSelection();
    }


}
