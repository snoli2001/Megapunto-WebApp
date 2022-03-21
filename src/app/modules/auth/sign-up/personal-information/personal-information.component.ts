import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';
import {
    DocumentId,
    DropdownService,
    LineOfBusiness,
} from './dropdown.service';

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
        private _dropdownService: DropdownService
    ) {}

    ngOnInit(): void {
        this.personalInformationForm = this.rootFormGroup.control;
        this.getDocumentIdSelection();
        this.getLineOfBusinessSelection();
    }

    nextStep(): void {
        if (
            this.personalInformationForm.controls['personalInformation'].valid
        ) {
            this.personalInformationForm.get('step').setValue(2);
        }
    }

    getDocumentIdSelection(): void {
        this.documentIdTypes$ = this._dropdownService.getDocumentIdSelection();
    }

    getLineOfBusinessSelection(): void {
        this.lineOfBusinesses$ =
            this._dropdownService.getLineOfBusinessSelection();
    }
}
