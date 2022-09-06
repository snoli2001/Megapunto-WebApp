import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PayServicesService } from '../../services/pay-services.service';

@Component({
    selector: 'app-send-email',
    templateUrl: './send-email.component.html',
    styleUrls: ['./send-email.component.scss'],
})
export class SendEmailComponent implements OnInit {
    sendEmailForm: FormGroup;
    showError: boolean = false;
    loading: boolean = false;
    emailRegex: RegExp = new RegExp(
        '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
    );
    constructor(
        public dialogRef: MatDialogRef<SendEmailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private _payServices: PayServicesService
    ) {}

    ngOnInit(): void {
        this.sendEmailForm = this.fb.group({
            email: [
                '',
                [Validators.pattern(this.emailRegex), Validators.required],
            ],
        });
        console.log(this.data);
    }

    onClose(data?: any): void {
        if (!data) {
            this.dialogRef.close();
            return;
        }

        if (data && this.sendEmailForm.valid) {
            this.loading = true;
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const vc_email_sol = this.sendEmailForm.get('email').value;
            this._payServices
                .sendEmailInvoice(this.data.nu_tran_pkey, vc_email_sol)
                .subscribe((resp) => {
                    this.loading = false;
                    this.dialogRef.close(resp);
                });
        } else {
            this.showError = true;
        }
    }
}
