/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { AlertService } from 'app/utils/alert/alert.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { RecaptchaService } from './services/recaptcha.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    captcha: string;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        public captchaSerice: RecaptchaService
    ) {}

    ngOnInit(): void {
        // Create the form
        this.signInForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required],
        });
    }

    resolved(captchaResponse: string): void {
        this.captcha = captchaResponse;
    }

    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid || !this.captcha) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService
            .signIn({
                vc_nro_dispositivo: this.signInForm.get('username').value,
                vc_contraseña: this.signInForm.get('password').value,
                nu_id_negocio: '7',
            })
            .subscribe(
                (response) => {
                    if (response.nu_tran_stdo === '1') {
                        if (response.bi_cambio_contrasena === 'False') {
                            this._router.navigateByUrl('reset-password');
                        } else {
                            this._router.navigateByUrl('/dashboards/home');
                        }
                    }

                    if (response.nu_tran_stdo === '0') {
                        this.signInForm.enable();

                        this.alert = {
                            type: 'error',
                            message:
                                'Celular o contraseña erróneos. Intente de nuevo.',
                        };
                        // Show the alert
                        this.showAlert = true;
                    }
                },
                (response) => {
                    // Re-enable the form
                    this.signInForm.enable();

                    // Reset the form
                    this.signInNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message:
                            'Celular o contraseña erróneos. Intente de nuevo.',
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }
}
