import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
    selector: 'app-bank-guide-pdf-pop-up',
    templateUrl: './bank-guide-pdf-pop-up.component.html',
    styleUrls: ['./bank-guide-pdf-pop-up.component.scss'],
})
export class BankGuidePdfPopUpComponent implements OnInit {
    iframeSrc: any;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: string,
        public matDialogRef: MatDialogRef<BankGuidePdfPopUpComponent>,
    ) {
        this.iframeSrc = data;
    }

    ngOnInit(): void {}

    close(): void {
        this.matDialogRef.close();
    }
}
