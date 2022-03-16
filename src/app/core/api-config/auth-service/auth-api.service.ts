/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import moment from 'moment';
import { map, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';


export interface ITokenApi {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthApiService {
    tokenWSO = '';
    tokenApi: string;

    constructor(private http: HttpClient) {
        if (!localStorage.getItem('apiToken')) {
            this.generateApiToken().subscribe((data) => {});
        }
    }

    generateApiToken(): Observable<any> {

        return this.http
            .post(`${environment.URL_API_TOKEN_ACCESS}`, {
                // headers: head,
                Username: environment.API_TOKEN_KEY_PASS,
                Password: environment.API_TOKEN_KEY_SECRET,
            })
            .pipe(
                map((res: any) => {
                    this.saveTokenApi(res.token);
                })
            );
    }

    getTokenApi(): string {
        return localStorage.getItem('apiToken');
    }

    getTimeExpiredTokenApi(): string {
        return localStorage.getItem('apiTokenExpired');
    }

    refreshApiToken(): Observable<any> {
        const keyBasic64 = btoa(
            `${environment.API_TOKEN_KEY_PASS}:${environment.API_TOKEN_KEY_SECRET}`
        );
        const Autho = `Basic ${keyBasic64}`;

        const head = new HttpHeaders({
            Authorization: Autho,
        });

        return this.http.post(`${environment.URL_API_TOKEN_ACCESS}`, null, {
            headers: head,
        });
    }

    refreshLocalStorageApitoken(data: ITokenApi): void {
        localStorage.removeItem('apiToken');
        localStorage.removeItem('apiTokenExpired');
        this.saveTokenApi(data.access_token);
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

    private saveTokenApi(apiToken: string): void {
        console.log(apiToken);
        this.tokenApi = apiToken;
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
