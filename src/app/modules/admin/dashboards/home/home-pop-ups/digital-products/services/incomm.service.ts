/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { UserInterface } from 'app/core/auth/User.interface';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class IncommService {
    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    getFree(nu_id_producto_app: number): Observable<any> {
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_comercio_app: string = user.nu_id_comercio_app;

        return this._httpClient.post<any>(
            `${environment.API_URL}/Producto/sel_producto_gratuito_cantidad`,
            {
                nu_id_comercio_app,
                nu_id_producto_app,
            }
        );
    }

    insertTransaction(
        vc_cod_producto: string,
        vc_email_sol: string,
        vc_telefono_sol: string
    ): Observable<any> {
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_comercio: string = user.nu_id_comercio;
        const nu_id_comercio_app: string = user.nu_id_comercio_app;
        const vc_version_app: string = 'web';

        const vc_tran_usua_regi: string = user.vc_nro_dispositivo;


        return this._httpClient.post<any>(
            `${environment.API_URL}/Transacciones_App/ins_incomm_transaccion_hub`,
            {
                nu_id_comercio,
                nu_id_comercio_app,
                vc_cod_producto,
                vc_email_sol,
                vc_telefono_sol,
                vc_version_app,
                vc_tran_usua_regi
            }
        );
    }
}
