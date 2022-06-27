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
    @Input() idInputWithPhotoFileName: string = 'documentFile3';
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    documentFrontName = 'No file chosen';
    documentBackName = 'No file chosen';
    documentWithPhoto = 'No file chosen';

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

    get vc_cadena_imagen_dni_anverso_persona(): FormControl {
        return this.personalInformationForm.controls['personalInformation'].get(
            'vc_cadena_imagen_dni_anverso_persona'
        ) as FormControl;
    }

    get vc_cadena_imagen_dni_anversoError(): boolean {
        return (
            this.personalInformationForm.controls['personalInformation'].get(
                'vc_cadena_imagen_dni_anverso'
            ).touched &&
            this.personalInformationForm.controls['personalInformation'].get(
                'vc_cadena_imagen_dni_anverso'
            ).invalid
        );
    }

    get vc_cadena_imagen_dni_reversoError(): boolean {
        return (
            this.personalInformationForm.controls['personalInformation'].get(
                'vc_cadena_imagen_dni_reverso'
            ).touched &&
            this.personalInformationForm.controls['personalInformation'].get(
                'vc_cadena_imagen_dni_reverso'
            ).invalid
        );
    }

    get vc_cadena_imagen_dni_anverso_personaError(): boolean {
        return (
            this.personalInformationForm.controls['personalInformation'].get(
                'vc_cadena_imagen_dni_anverso_persona'
            ).touched &&
            this.personalInformationForm.controls['personalInformation'].get(
                'vc_cadena_imagen_dni_anverso_persona'
            ).invalid
        );
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

    onBackDocumentWithPhotoFileSelected(event): void {
        if (event.target.files.length > 0) {
            this.documentWithPhoto = event.target.files[0].name;
            this.convertFile(event.target.files[0]).subscribe((base64) => {
                this.vc_cadena_imagen_dni_anverso_persona.setValue(base64);
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
        this.personalInformationForm.get('personalInformation').markAllAsTouched();
        if (
            this.personalInformationForm.controls['personalInformation'].valid
        ) {
            this.personalInformationForm.get('step').setValue(2);
        }
        console.log(this.personalInformationForm);
    }

    getNameByDNI(): void {
        if (this.documentType.valid && this.documentNumber.valid) {
            this._personalInformationService
                .getNameByDNI(this.documentNumber.value)
                .subscribe((resp) => {
                    this.name.setValue(resp);
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
