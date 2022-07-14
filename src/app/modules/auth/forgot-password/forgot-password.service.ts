/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

export interface ForgotPasswordResponse {
    nu_tran_stdo: string;
    nu_tran_pkey: string;
    vc_tran_codi: string;
    tx_tran_mnsg: string;
}

export interface InfoNumContactoResponse {
    vc_texto_seteo: string;
}

@Injectable({
    providedIn: 'root',
})
export class ForgotPasswordService {
    constructor(
        private _httpClient: HttpClient,
    ) {}

    getNewPassword(
        vc_nro_dispositivo: string,
        vc_cod_comercio: string
    ): Observable<ForgotPasswordResponse> {

        const nu_id_negocio: string = '7';
        return this._httpClient
            .post<ForgotPasswordResponse>(
                `${environment.API_URL}/Comercio_Bancario/reset_pass`,
                {
                    vc_cod_comercio,
                    vc_nro_dispositivo,
                    nu_id_negocio,
                }
            )
            .pipe(map((resp) => resp));
    }

    getInfoNumContacto(): Observable<InfoNumContactoResponse> {
        const nu_id_negocio: string = '7';
        return this._httpClient
            .post<InfoNumContactoResponse>(
                `${environment.API_URL}/Seteo/get_info_num_contacto`,
                {
                    nu_id_negocio,
                }
            )
            .pipe(map((resp) => resp));
    }
}
