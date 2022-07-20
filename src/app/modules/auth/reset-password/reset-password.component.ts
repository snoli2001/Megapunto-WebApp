/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseValidators } from '@fuse/validators';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { UpdatePasswordService } from './reset-password.service';
import { Router } from '@angular/router';
import { UserInterface } from 'app/core/auth/User.interface';
import jwt_decode from 'jwt-decode';

@Component({
    selector: 'auth-reset-password',
    templateUrl: './reset-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthResetPasswordComponent implements OnInit {
    @ViewChild('resetPasswordNgForm') resetPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    updatePasswordForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _updatePasswordService: UpdatePasswordService,
        private router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.initUpdatePasswordForm();
    }

    initUpdatePasswordForm(): void {
        const user: UserInterface = jwt_decode(this._authService.user);
        this.updatePasswordForm = this._formBuilder.group(
            {
                vc_contrasena_anterior: ['', Validators.required],
                passwordConfirm: ['', [Validators.required]],
                vc_contrasena_nueva: ['', Validators.required],
                vc_nro_dispositivo: [
                    user.vc_nro_dispositivo,
                    [
                        Validators.required,
                        Validators.minLength(9),
                        Validators.maxLength(9),
                    ],
                ],
            },
            {
                validators: FuseValidators.mustMatch(
                    'vc_contrasena_nueva',
                    'passwordConfirm'
                ),
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Reset password
     */
    resetPassword(): void {
        // Return if the form is invalid
        if (this.updatePasswordForm.invalid) {
            return;
        }

        // Disable the form
        this.updatePasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Send the request to the server
        this._updatePasswordService
            .updatePassword(
                this.updatePasswordForm.get('vc_nro_dispositivo').value,
                this.updatePasswordForm.get('vc_contrasena_anterior').value,
                this.updatePasswordForm.get('vc_contrasena_nueva').value
            )
            .subscribe(
                (response) => {
                    if (response.nu_tran_stdo === '1') {
                        // Set the alert
                        this.alert = {
                            type: 'success',
                            message: response.tx_tran_mnsg,
                        };
                        // Re-enable the form
                        this.updatePasswordForm.enable();

                        // Reset the form
                        this.initUpdatePasswordForm();

                        // Show the alert
                        this.showAlert = true;

                        this.signIn();
                    }
                    if (response.nu_tran_stdo === '0') {
                        // Set the alert
                        this.alert = {
                            type: 'error',
                            message: response.tx_tran_mnsg,
                        };
                        // Re-enable the form
                        this.updatePasswordForm.enable();

                        // Reset the form
                        this.initUpdatePasswordForm();

                        // Show the alert
                        this.showAlert = true;
                    }
                },
                (error) => {
                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: error.tx_tran_mnsg,
                    };
                    // Re-enable the form
                    this.updatePasswordForm.enable();

                    // Reset the form
                    this.initUpdatePasswordForm();

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }

    signIn(): void {
        this._authService.signOut();
        this.router.navigate(['sign-in']);
    }

    goToHome(): void {
        this.router.navigate(['dashboards/home']);
    }
}
