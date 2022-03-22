/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { TransactionInfo } from './history.interfaces';
import jwt_decode from 'jwt-decode';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class HistoryService {
    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    getHistoryInfo(
        dt_fec_inicio: string,
        dt_fec_final: string
    ): Observable<TransactionInfo[]> {
        const user: any = jwt_decode(this._authService.user);
        const nu_id_negocio: string = user.nu_id_negocio;
        const nu_id_comercio_app: string = user.nu_id_comercio_app;

        return this._httpClient.post<TransactionInfo[]>(
            `${environment.API_URL}/Transacciones_App/sel_comercio`,
            {
                nu_id_negocio,
                nu_id_comercio_app,
                dt_fec_inicio,
                dt_fec_final,
            }
        );
    }
}
