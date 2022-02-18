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
    constructor(private _router: Router) {}

    signIn(): void {
        this._router.navigate(['sign-in']);
    }

    signUp(): void {
        this._router.navigate(['sign-up']);
    }
}
