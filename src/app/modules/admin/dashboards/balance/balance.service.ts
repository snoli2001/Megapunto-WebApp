/* eslint-disable @typescript-eslint/naming-convention */
import jwt_decode from 'jwt-decode';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from './../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserInterface } from 'app/core/auth/User.interface';

@Injectable({
    providedIn: 'root',
})
export class BalanceService {
    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    getBalance(): Observable<any> {
        const user: any = jwt_decode(this._authService.user);
        const nu_id_negocio: string = user.nu_id_negocio;
        const nu_id_comercio: string = user.nu_id_comercio;

        return this._httpClient.post<any>(
            `${environment.API_URL}/Comercio_Bancario/get_app_saldo`,
            {
                nu_id_negocio,
                nu_id_comercio,
            }
        );
    }

    getBanks(): Observable<any> {
        const user: any = jwt_decode(this._authService.user);
        const nu_id_comercio_app: string = user.nu_id_comercio_app;

        return this._httpClient.post<any>(`${environment.API_URL}/Banco/sel`, {
            nu_id_comercio_app,
        });
    }

    getLastDepositDate(): Observable<any> {
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_comercio: string = user.nu_id_comercio;
        const ch_destino: string = 'MX';
        return this._httpClient.post<any>(
            `${environment.API_URL}/Solicitud_Deposito/get_ult_fec_comercio`,
            {
                nu_id_comercio,
                ch_destino,
            }
        );
    }
}
