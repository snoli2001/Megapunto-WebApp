import { ForgotPasswordService } from './forgot-password.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'auth-forgot-password',
    templateUrl: './forgot-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthForgotPasswordComponent implements OnInit {
    @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    forgotPasswordForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _forgotPasswordService: ForgotPasswordService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.forgotPasswordForm = this._formBuilder.group({
            cellphone: ['', Validators.required],
            businessCode: ['', Validators.required],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Send the reset link
     */
    sendResetLink(): void {
        // Return if the form is invalid
        if (this.forgotPasswordForm.invalid) {
            return;
        }

        // Disable the form
        this.forgotPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        this._forgotPasswordService
            .resetPassword(
                this.forgotPasswordForm.get('cellphone').value,
                this.forgotPasswordForm.get('businessCode').value
            )
            .pipe(
                finalize(() => {
                    // Re-enable the form
                    this.forgotPasswordForm.enable();

                    // Show the alert
                    this.showAlert = true;
                })
            )
            .subscribe((resp) => {
                if (resp.nu_tran_stdo === '1') {
                    this.alert = {
                        type: 'success',
                        message: `${resp.tx_tran_mnsg}`,
                    };
                    // Reset the form
                    this.forgotPasswordForm.reset();
                }
                if (resp.nu_tran_stdo === '0') {
                    this.alert = {
                        type: 'warning',
                        message: `${resp.tx_tran_mnsg}`,
                    };
                }
            });
    }

    signIn(): void {
        this._router.navigate(['sign-in']);
    }
}
