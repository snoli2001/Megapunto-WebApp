import { AuthService } from 'app/core/auth/auth.service';
import { AuthApiService, ITokenApi } from './auth-service/auth-api.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from 'environments/environment';
import {
    BehaviorSubject,
    catchError,
    Observable,
    switchMap,
    throwError,
} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GeneralInterceptor implements HttpInterceptor {
    authApi: any;
    private refreshTokenSubject: BehaviorSubject<any> =
        new BehaviorSubject<any>(null);
    constructor(injector: Injector, private authService: AuthService) {
        setTimeout(() => {
            this.authApi = injector.get(AuthApiService);
        });
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (
            req.url === environment.URL_API_TOKEN_ACCESS ||
            req.url.includes('assets')
        ) {
            return next.handle(req);
        }

        if (localStorage.getItem('apiToken')) {
            if (this.authApi.authenticatedApiToken()) {
                return next.handle(this.getHeader(this.authApi, req));
            } else {
                this.authService.signOut();
                this.authApi.generateApiToken().subscribe((newToken) => {});
                return next.handle(this.getHeader(this.authApi, req));
            }
        }
    }

    getHeader(authService: any, request: HttpRequest<any>): HttpRequest<any> {
        const token = authService.getTokenApi();
        return request.clone({
            setHeaders: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Authorization: `Bearer ${token}`,
            },
        });
    }
}
