import { AuthService } from 'app/core/auth/auth.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'landing-home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class LandingHomeComponent {
    /**
     * Constructor
     */
    constructor(private _router: Router, private _authService: AuthService) {}

    signIn(): void {
        this._router.navigate(['sign-in']);
    }

    signUp(): void {
        this._authService.signOut().subscribe(() => {
            this._router.navigate(['sign-up']);
        });
    }
}
