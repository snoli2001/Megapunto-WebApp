/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import moment from 'moment';
import { map, Observable, shareReplay } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { TokenService } from './token.service';

export interface ITokenApi {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
}

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root',
})
export class AuthApiService {
    tokenWSO = '';
    tokenApi: string;

    constructor(private http: HttpClient, private tokenService: TokenService) {
        if (!sessionStorage.getItem(TOKEN_KEY)) {
            this.generateApiToken().subscribe();
        }
        // if (!this.authenticatedApiToken()) {
        //     this.generateApiToken().subscribe();
        // }
    }

    generateApiToken(): Observable<any> {
        return this.http
            .post(`${environment.URL_API_TOKEN_ACCESS}`, {
                // headers: head,
                Username: environment.API_TOKEN_KEY_PASS,
                Password: environment.API_TOKEN_KEY_SECRET,
            });
    }

    generateNewApiToken(username: string, password: string): Observable<any> {
        return this.http
            .post(`${environment.URL_API_TOKEN_ACCESS}`, {
                // headers: head,
                Username: username,
                Password: password,
            })
            .pipe(
                map((res: any) => {
                    this.tokenService.saveToken(res.token);
                    this.tokenService.saveRefreshToken(res.refreshToken);
                })
            );
    }

    refreshToken(token: string, refreshToken: string): Observable<any> {
        console.log('refreshing', { token }, { refreshToken });
        return this.http.post(
            `${environment.URL_API_TOKEN_ACCESS}`,
            {
                // headers: head,
                token: token,
                refreshToken: refreshToken,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.tokenService.getToken()}`,
                },
            }
        );
    }

    getTimeExpiredTokenApi(): string {
        return sessionStorage.getItem('apiTokenExpired');
    }

    refreshsessionStorageApiToken(data: ITokenApi): void {
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem('apiTokenExpired');
    }

    authenticatedApiToken(): boolean {
        const fechaExpired = new Date();
        const timeExpired = Number(this.getTimeExpiredTokenApi());

        fechaExpired.setTime(timeExpired);

        if (new Date() < fechaExpired) {
            return true;
        } else {
            return false;
        }
    }

    saveTokenApi(apiToken: string): void {
        this.tokenApi = apiToken;
        sessionStorage.setItem(TOKEN_KEY, apiToken);
        const today = new Date();

        const decodedToken: any = jwt_decode(apiToken);
        const ApiFechaExpire = moment(today)
            .add('second', decodedToken.exp)
            .toDate();

        sessionStorage.setItem(
            'apiTokenExpired',
            ApiFechaExpire.getTime().toString()
        );
    }
}
