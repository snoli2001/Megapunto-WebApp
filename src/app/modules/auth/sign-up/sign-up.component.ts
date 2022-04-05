/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;

    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {}

    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            personalInformation: this._formBuilder.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: ['', Validators.required],
                cellphone: ['', Validators.required],
                documentType: ['', Validators.required],
                documentNumber: ['', Validators.required],
                birthDate: ['', Validators.required],
                vc_cadena_imagen_dni_anverso: ['', Validators.required],
                vc_cadena_imagen_dni_reverso: ['', Validators.required],
            }),
            businessData: this._formBuilder.group({
                ruc: ['', Validators.required],
                businessName: ['', Validators.required],
                tradename: ['', Validators.required],
                telephone: ['', Validators.required],
                businessLine: ['', Validators.required],
                billType: ['', Validators.required],
            }),
            businessAddress: this._formBuilder.group({
                address: ['', Validators.required],
                village: ['', Validators.required],
                region: ['', Validators.required],
                city: ['', Validators.required],
                district: ['', Validators.required],
                agreements: ['', Validators.required],
            }),
            step: [1],
        });
    }

    signUp(): void {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.signUp(this.signUpForm.value).subscribe(
            (response) => {
                // Navigate to the confirmation required page
                this._router.navigateByUrl('/confirmation-required');
            },
            (response) => {
                // Re-enable the form
                this.signUpForm.enable();

                // Reset the form
                this.signUpNgForm.resetForm();

                // Set the alert
                this.alert = {
                    type: 'error',
                    message: 'Something went wrong, please try again.',
                };

                // Show the alert
                this.showAlert = true;
            }
        );
    }

    signIn(): void {
        this._router.navigate(['sign-in']);
    }
}
