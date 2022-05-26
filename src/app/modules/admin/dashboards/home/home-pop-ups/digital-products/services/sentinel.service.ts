/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { UserInterface } from 'app/core/auth/User.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { DocumentInterface } from '../interfaces/Document.interface';
import { SentinelTransactionResponseInterface } from '../interfaces/SentinelTransactionResponse.interface';
import { ValidateDocumentIDResponse } from '../interfaces/ValidateDocumentIDResponse.interface';


@Injectable({
    providedIn: 'root',
})
export class SentinelService {
    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    getDocumentTypes(): Observable<DocumentInterface[]> {
        return this._httpClient.post<DocumentInterface[]>(
            `${environment.API_URL}/Tipo_Doc_Identidad/sel_sentinel_hub`,
            {}
        );
    }

    validateDocumentID(
        nu_id_tipo_doc_identidad: string,
        vc_nro_doc_identidad: string
    ): Observable<ValidateDocumentIDResponse> {
        return this._httpClient.post<ValidateDocumentIDResponse>(
            `${environment.API_URL}/Transacciones_App/get_sentinel_validar_hub`,
            {
                nu_id_tipo_doc_identidad,
                vc_nro_doc_identidad,
            }
        );
    }

    insertTransaction(
        nu_id_producto_app: string,
        vc_cod_producto: string,
        nu_id_tipo_doc_sol: string,
        vc_cod_tipo_doc_sol: string,
        vc_nro_doc_sol: string,
        vc_telefono_sol: string,
        vc_email_sol: string,
        nu_id_tipo_doc_cpt: string,
        vc_cod_tipo_doc_cpt: string,
        vc_nro_doc_cpt: string,
        nu_id_tipo_documento: string,
        vc_ruc: string = '',
        vc_version_app: string = 'web'
    ): Observable<SentinelTransactionResponseInterface> {
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_comercio: string = user.nu_id_comercio;
        const nu_id_comercio_app: string = user.nu_id_comercio_app;

        // TODO obtener del store el numero del comercio
        const vc_tran_usua_regi: string = 'numero del comercio';

        return this._httpClient.post<SentinelTransactionResponseInterface>(
            `${environment.API_URL}/Transacciones_App/ins_sentinel_hub`,
            {
                nu_id_comercio,
                nu_id_comercio_app,
                nu_id_producto_app,
                vc_cod_producto,
                nu_id_tipo_doc_sol,
                vc_cod_tipo_doc_sol,
                vc_nro_doc_sol,
                vc_telefono_sol,
                vc_email_sol,
                nu_id_tipo_doc_cpt,
                vc_cod_tipo_doc_cpt,
                vc_nro_doc_cpt,
                nu_id_tipo_documento,
                vc_ruc,
                vc_version_app,
            }
        );
    }
}
