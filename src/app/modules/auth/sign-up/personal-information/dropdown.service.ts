/* eslint-disable @typescript-eslint/naming-convention */
import jwt_decode from 'jwt-decode';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DocumentId {
    nu_id_tipo_doc_identidad: string;
    vc_desc_tipo_doc_identidad: string;
}

export interface LineOfBusiness {
    nu_id_grupo_giro_negocio: string;
    vc_desc_grupo_giro_negocio: string;
}

@Injectable({
    providedIn: 'root',
})
export class DropdownService {
    constructor(private _httpClient: HttpClient) {}

    getDocumentIdSelection(): Observable<DocumentId[]> {
        return this._httpClient.post<DocumentId[]>(
            `${environment.API_URL}/Tipo_Doc_Identidad/sel`,
            {}
        );
    }

    getLineOfBusinessSelection(): Observable<LineOfBusiness[]> {
        return this._httpClient.post<LineOfBusiness[]>(
            `${environment.API_URL}/Grupo_Giro_Negocio/sel`,
            {}
        );
    }
}
