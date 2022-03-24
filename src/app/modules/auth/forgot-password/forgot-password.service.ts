/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

export interface ResetPasswordResponse {
    nu_tran_stdo: string;
    nu_tran_pkey: string;
    vc_tran_codi: string;
    tx_tran_mnsg: string;
}

@Injectable({
    providedIn: 'root',
})
export class ForgotPasswordService {
    constructor(private _httpClient: HttpClient) {}

    resetPassword(
        vc_nro_dispositivo: string,
        vc_cod_comercio: string
    ): Observable<ResetPasswordResponse> {
        return this._httpClient
            .post<ResetPasswordResponse>(
                `${environment.API_URL}/Comercio_Bancario/reset_pass`,
                {
                    vc_cod_comercio,
                    vc_nro_dispositivo,
                }
            )
            .pipe(map((resp) => resp));
    }
}
