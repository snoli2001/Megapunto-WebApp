/* eslint-disable @typescript-eslint/naming-convention */
import { environment } from './../../../../../environments/environment';
import { AuthService } from 'app/core/auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

    updProfileInfo(profileInfo: any): Observable<ProfileInfo> {
        const user: any = jwt_decode(this._authService.user);
        const nu_id_comercio: string = user.nu_id_comercio;
        const vc_telefono: string = profileInfo.vc_telefono;
        const vc_celular: string = profileInfo.vc_celular;
        const vc_email: string = profileInfo.vc_email;

        return this._httpClient.post<ProfileInfo>(
            `${environment.API_URL}/Comercio_Bancario/upd_info_contacto`,
            {
                nu_id_comercio,
                vc_telefono,
                vc_celular,
                vc_email
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
