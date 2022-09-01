import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BankGuidePdfPopUpComponent } from '../../../balance/guides/bank-guide-pdf-pop-up/bank-guide-pdf-pop-up.component';
import { Publicity } from '../../home.interfaces';

@Component({
    selector: 'app-publicity',
    templateUrl: './publicity.component.html',
    styles: [],
})
export class PublicityComponent implements OnInit {

    publicity: Publicity[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Publicity[],
        public matDialogRef: MatDialogRef<BankGuidePdfPopUpComponent>
    ) {}

    ngOnInit(): void {
        this.publicity = this.data;
    }

    close(): void {
        this.matDialogRef.close();
    }
}
