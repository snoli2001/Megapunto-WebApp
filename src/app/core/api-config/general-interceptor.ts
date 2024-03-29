import { EventBusService } from './../../shared/services/event-bus.service';
import { Router } from '@angular/router';
/* eslint-disable arrow-parens */
import { TokenService } from './auth-service/token.service';
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
    EMPTY,
    filter,
    Observable,
    switchMap,
    take,
    throwError,
} from 'rxjs';
import { EventData } from 'app/shared/services/event.data';

@Injectable({
    providedIn: 'root',
})
export class GeneralInterceptor implements HttpInterceptor {
    authApi: any;
    isRefreshing: boolean;
    isRefreshingLogin: boolean;
    private refreshTokenSubject: BehaviorSubject<any> =
        new BehaviorSubject<any>(null);

    private refreshTokenSubjectLogin: BehaviorSubject<any> =
        new BehaviorSubject<any>(null);

    constructor(
        injector: Injector,
        private tokenService: TokenService,
        private _router: Router,
        private eventBusService: EventBusService
    ) {
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

        let authReq = req;
        const token = this.tokenService.getToken();
        if (token !== null) {
            authReq = this.addTokenHeader(req, token);
        }

        return next.handle(authReq).pipe(
            catchError((error, caught) => {
                if (
                    error instanceof HttpErrorResponse &&
                    !this._router.url.includes('/sign-in') &&
                    error.status === 401
                ) {
                    return this.handle401Error(req, next);
                }

                if (
                    error instanceof HttpErrorResponse &&
                    this._router.url.includes('/sign-in') &&
                    error.status === 401
                ) {
                    console.log('login error', this._router.url);
                    return this.handle401ErrorInSignIn(req, next);
                }

                if (
                    error instanceof HttpErrorResponse &&
                    !this._router.url.includes('/sign-in') &&
                    error.status === 403
                ) {
                    this.tokenService.signOut();
                    window.location.reload();
                }
                return throwError(error);
            })
        ) as any;
    }

    addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Authorization: `Bearer ${token}`,
            },
        });
    }

    private handle401Error(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            const refreshToken = this.tokenService.getRefreshToken();
            const apiToken = this.tokenService.getToken();

            if (refreshToken) {
                return this.authApi.refreshToken(apiToken, refreshToken).pipe(
                    switchMap((response: any) => {
                        this.isRefreshing = false;

                        this.tokenService.saveToken(response.token);
                        this.tokenService.saveRefreshToken(
                            response.refreshToken
                        );
                        this.refreshTokenSubject.next(response.token);

                        return next.handle(
                            this.addTokenHeader(request, response.token)
                        );
                    }),
                    catchError((err) => {
                        this.isRefreshing = false;
                        this.tokenService.signOut();
                        window.location.reload();
                        return throwError(() => console.log(err));
                    })
                );
            } else {
                this.tokenService.signOut();
                window.location.reload();
            }
        }

        return this.refreshTokenSubject.pipe(
            filter((token) => token !== null),
            take(1),
            switchMap((token) =>
                next.handle(this.addTokenHeader(request, token))
            )
        );
    }

    private handle401ErrorInSignIn(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (!this.isRefreshingLogin) {
            this.isRefreshingLogin = true;
            this.refreshTokenSubjectLogin.next(null);

            return this.authApi.generateApiToken().pipe(
                switchMap((response: any) => {
                    this.isRefreshingLogin = false;

                    this.tokenService.saveToken(response.token);
                    this.refreshTokenSubjectLogin.next(response.token);

                    return next.handle(
                        this.addTokenHeader(request, response.token)
                    );
                }),
                catchError((err) => {
                    this.isRefreshingLogin = false;
                    this.tokenService.signOut();
                    return throwError(err);
                })
            );
        }

        return this.refreshTokenSubjectLogin.pipe(
            filter((token) => token !== null),
            take(1),
            switchMap((token) =>
                next.handle(this.addTokenHeader(request, token))
            )
        );
    }
}
