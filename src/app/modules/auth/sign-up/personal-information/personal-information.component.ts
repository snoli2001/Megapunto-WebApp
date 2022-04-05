/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arrow-parens */
import { Observable, ReplaySubject } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
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
    @Input() idInputFrontFileName: string = 'documentFile';
    @Input() idInputBackFileName: string = 'documentFile2';
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    documentFrontName = 'No file chosen';
    documentBackName = 'No file chosen';

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

    get vc_cadena_imagen_dni_anverso(): FormControl {
        return this.personalInformationForm.controls['personalInformation'].get(
            'vc_cadena_imagen_dni_anverso'
        ) as FormControl;
    }

    get vc_cadena_imagen_dni_reverso(): FormControl {
        return this.personalInformationForm.controls['personalInformation'].get(
            'vc_cadena_imagen_dni_reverso'
        ) as FormControl;
    }

    onFrontDocumentFileSelected(event): void {
        if (event.target.files.length > 0) {
            this.documentFrontName = event.target.files[0].name;
            this.convertFile(event.target.files[0]).subscribe((base64) => {
                this.vc_cadena_imagen_dni_anverso.setValue(base64);
            });
        }
    }

    onBackDocumentFileSelected(event): void {
        if (event.target.files.length > 0) {
            this.documentBackName = event.target.files[0].name;
            this.convertFile(event.target.files[0]).subscribe((base64) => {
                this.vc_cadena_imagen_dni_reverso.setValue(base64);
            });
        }
    }

    convertFile(file: File): Observable<string> {
        const result = new ReplaySubject<string>(1);
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (event): void =>
            result.next(btoa(event.target.result.toString()));
        return result;
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
