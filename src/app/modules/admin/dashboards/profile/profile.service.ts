import { environment } from './../../../../../environments/environment';
/* eslint-disable @typescript-eslint/naming-convention */
import { AuthService } from 'app/core/auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ProfileInfo, DepositInfo } from './profile.interfaces';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    getProfileInfo(): Observable<ProfileInfo> {
        const user: any = jwt_decode(this._authService.user);
        const nu_id_negocio: string = user.nu_id_negocio;
        const nu_id_comercio: string = user.nu_id_comercio;

        return this._httpClient.post<ProfileInfo>(
            `${environment.API_URL}/Comercio_Bancario/get_info`,
            {
                nu_id_negocio,
                nu_id_comercio,
            }
        );
    }

    getDepositsInfo(
        dt_fec_inicio: string,
        dt_fec_final: string
    ): Observable<DepositInfo[]> {
        const user: any = jwt_decode(this._authService.user);
        const nu_id_negocio: string = user.nu_id_negocio;
        const ch_destino: string = 'MX';

        return this._httpClient.post<DepositInfo[]>(
            `${environment.API_URL}/Solicitud_Deposito/sel`,
            {
                nu_id_negocio,
                ch_destino,
                dt_fec_inicio,
                dt_fec_final,
            }
        );
    }
}
