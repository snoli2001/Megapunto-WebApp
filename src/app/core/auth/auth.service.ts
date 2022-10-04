import { TokenService } from './../api-config/auth-service/token.service';
import jwt_decode from 'jwt-decode';
import { AuthApiService } from './../api-config/auth-service/auth-api.service';
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as encode from 'jwt-encode';
import moment from 'moment';

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
        private _authApiService: AuthApiService,
        private _tokenService: TokenService
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
                    }
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
        localStorage.removeItem('refreshToken');
        // Set the authenticated flag to false
        this._authenticated = false;
        this._httpClient
            .post(`${environment.URL_API_TOKEN_ACCESS}`, {
                // headers: head,
                Username: environment.API_TOKEN_KEY_PASS,
                Password: environment.API_TOKEN_KEY_SECRET,
            })
            .pipe(
                map((res: any) => {
                    this.saveTokenApi(res.token);
                })
            )
            .subscribe();

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

    private saveTokenApi(apiToken: string): void {
        localStorage.setItem('apiToken', apiToken);
        const today = new Date();

        const decodedToken: any = jwt_decode(apiToken);
        const ApiFechaExpire = moment(today)
            .add('second', decodedToken.exp)
            .toDate();

        localStorage.setItem(
            'apiTokenExpired',
            ApiFechaExpire.getTime().toString()
        );
    }
}
