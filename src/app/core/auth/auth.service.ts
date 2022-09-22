/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from '../../../environments/environment';
import * as encode from 'jwt-encode';

export interface SignInResponse {
    nu_id_negocio: string;
    nu_tran_stdo: string;
    nu_id_comercio: string;
    nu_id_comercio_app: string;
    tx_tran_mnsg: string;
    vc_nombre_comercio: string;
    bi_cambio_contrasena: string;
}

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    get user(): string {
        return localStorage.getItem('user') ?? '';
    }
    /**
     * Setter & getter for access token
     */
    set user(token: string) {
        localStorage.setItem('user', token);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    signIn(credentials: {
        vc_nro_dispositivo: string;
        vc_contraseña: string;
        nu_id_negocio: string;
    }): Observable<any> {
        const vc_nro_dispositivo = credentials.vc_nro_dispositivo;
        return this._httpClient
            .post(
                `${environment.API_URL}/Comercio_Bancario/sel_acceso`,
                credentials
            )
            .pipe(
                switchMap((response: any) => {
                    // Store the access token in the local storage
                    if (response.nu_tran_stdo === '1') {
                        this.user = encode(
                            { ...response, vc_nro_dispositivo },
                            'secret'
                        );
                        this._authenticated = true;
                        return of(response);
                    } else {
                    }
                })
            );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Renew token
        return this._httpClient
            .post('api/auth/refresh-access-token', {
                user: this.user,
            })
            .pipe(
                catchError(() =>
                    // Return false
                    of(false)
                ),
                switchMap((response: any) => {
                    // Store the access token in the local storage
                    this.user = response.token;

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    // this._userService.user = response.user;

                    // Return true
                    return of(true);
                })
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('user');
        localStorage.removeItem('apiToken');
        localStorage.removeItem('apiTokenExpired');
        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
        name: string;
        email: string;
        password: string;
        company: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.user) {
            return of(false);
        }

        // Check the access token expire date
        // if (AuthUtils.isTokenExpired(this.user)) {
        //     return of(false);
        // }

        // If the access token exists and it didn't expire, sign in using it
        return of(true);
        // return this.signInUsingToken();
    }
}
