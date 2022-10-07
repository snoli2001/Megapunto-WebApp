import { Route, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Subscription } from 'rxjs';
import { TokenService } from './core/api-config/auth-service/token.service';
import { EventBusService } from './shared/services/event-bus.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    isLoggedIn = false;
    eventBusSub?: Subscription;

    constructor(
        private tokenStorageService: TokenService,
        private eventBusService: EventBusService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.isLoggedIn = !!this.tokenStorageService.getToken();

        this.eventBusSub = this.eventBusService.on('logout', () => {
            this.logout();
        });
    }

    ngOnDestroy(): void {
        if (this.eventBusSub) {
            this.eventBusSub.unsubscribe();
        }
    }

    logout(): void {
        console.log('logout');
        this.tokenStorageService.signOut();
        this._router.navigate(['sign-in']);
        this.isLoggedIn = false;
    }
}
