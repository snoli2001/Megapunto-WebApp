import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DigitalProduct } from '../../../home.interfaces';

@Component({
    selector: 'app-incomm',
    templateUrl: './incomm.component.html',
    styleUrls: ['./incomm.component.scss'],
})
export class IncommComponent implements OnInit {
    buyerInformationForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { digitalProduct: DigitalProduct; size: any },
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initBuyerInformationForm();
    }

    initBuyerInformationForm(): void {
        this.buyerInformationForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
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
}
