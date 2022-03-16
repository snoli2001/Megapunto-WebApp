import { AuthApiService, ITokenApi } from './auth-service/auth-api.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GeneralInterceptor implements HttpInterceptor {
    authApi: any;
    constructor(injector: Injector) {
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
                return this.authApi.refreshApiToken().pipe(
                    switchMap((newData: ITokenApi) => {
                        this.authApi.refreshLocalStorageApitoken(newData);
                        const newTokenApi = this.authApi.getTokenApi();

                        return next.handle(this.getHeader(this.authApi, req));
                    })
                );
            }
        }

        return next.handle(req);
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
