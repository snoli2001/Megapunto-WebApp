import { AuthService } from './../../../core/auth/auth.service';
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { UserInterface } from 'app/core/auth/User.interface';

export interface UpdatePasswordResponse {
    nu_tran_stdo: string;
    nu_tran_pkey: string;
    vc_tran_codi: string;
    tx_tran_mnsg: string;
}

@Injectable({
    providedIn: 'root',
})
export class UpdatePasswordService {
    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    updatePassword(
        vc_nro_dispositivo: string,
        vc_contrasena_anterior: string,
        vc_contrasena_nueva: string
    ): Observable<UpdatePasswordResponse> {
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_comercio = user.nu_id_comercio;
        const vc_tran_usua_modi = user.vc_nombre_comercio;
        return this._httpClient
            .post<UpdatePasswordResponse>(
                `${environment.API_URL}/Comercio_Bancario/upd_pass`,
                {
                    vc_nro_dispositivo,
                    nu_id_comercio,
                    vc_contrasena_anterior,
                    vc_contrasena_nueva,
                    vc_tran_usua_modi,
                }
            )
            .pipe(map((resp) => resp));
    }
}
