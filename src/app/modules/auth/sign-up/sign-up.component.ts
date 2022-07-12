import { AbstractControl, FormControl } from '@angular/forms';
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

    emailRegex: RegExp = new RegExp(
        '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
    );

    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {}

    get documentNumber(): FormControl {
        return this.signUpForm
            .get('personalInformation')
            .get('documentNumber') as FormControl;
    }

    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            personalInformation: this._formBuilder.group({
                name: ['', Validators.required],
                email: [
                    '',
                    [Validators.required, Validators.pattern(this.emailRegex)],
                ],
                cellphone: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(9),
                        Validators.maxLength(9),
                    ],
                ],
                documentType: ['2', Validators.required],
                documentNumber: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(8),
                        Validators.maxLength(8),
                    ],
                ],
                birthDate: ['', [Validators.required, this.customValidator]],
                vc_cadena_imagen_dni_anverso: ['', Validators.required],
                vc_cadena_imagen_dni_reverso: ['', Validators.required],
                vc_cadena_imagen_dni_anverso_persona: ['', Validators.required],
            }),
            businessData: this._formBuilder.group({
                ruc: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(11),
                        Validators.maxLength(11),
                    ],
                ],
                tradename: ['', Validators.required],
                businessName: ['', Validators.required],
                telephone: ['', [Validators.maxLength(9)]],
                businessLine: ['', Validators.required],
                billType: ['', Validators.required],
                bi_persona_sn: ['0', Validators.required],
            }),
            businessAddress: this._formBuilder.group({
                address: ['', Validators.required],
                village: [''],
                region: ['', Validators.required],
                city: ['', Validators.required],
                district: ['', Validators.required],
                agreements: ['', Validators.requiredTrue],
                secondAgreements: ['', Validators.requiredTrue],
            }),
            step: [1],
        });
        this.changeValidatorsOfDocumentNumber();
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

    customValidator(control: AbstractControl): boolean {
        return true;
    }

    changeValidatorsOfDocumentNumber(): void {
        this.signUpForm
            .get('personalInformation')
            .get('documentType')
            .valueChanges.subscribe((value) => {
                if (value === '30') {
                    this.documentNumber.setValue('');
                    this.documentNumber.clearValidators();
                    this.documentNumber.addValidators([
                        Validators.required,
                        Validators.minLength(8),
                        Validators.maxLength(12),
                    ]);
                    this.documentNumber.updateValueAndValidity();
                }
                if (value === '2') {
                    this.documentNumber.setValue('');
                    this.documentNumber.clearValidators();
                    this.documentNumber.addValidators([
                        Validators.required,
                        Validators.minLength(8),
                        Validators.maxLength(8),
                    ]);
                    this.documentNumber.updateValueAndValidity();
                }
            });
    }
}
