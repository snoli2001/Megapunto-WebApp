/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { UserInterface } from 'app/core/auth/User.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../../../home.interfaces';
import jwt_decode from 'jwt-decode';
import { GetServicesResponse } from '../interfaces/GetServicesResponse';

@Injectable({
    providedIn: 'root',
})
export class PayServicesService {
    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    getEnterpriseServices(
        nu_id_empresa_servicio_app: string
    ): Observable<GetServicesResponse[]> {
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_negocio: string = user.nu_id_negocio;
        const nu_id_comercio_app: string = user.nu_id_comercio_app;

        return this._httpClient.post<GetServicesResponse[]>(
            `${environment.API_URL}/Producto_App/sel_servicios`,
            {
                nu_id_comercio_app,
                nu_id_negocio,
                nu_id_empresa_servicio_app,
            }
        );
    }

    getDebts(
        nu_id_producto_app: string,
        vc_cod_producto: string,
        vc_numero_servicio: string
    ): Observable<any> {
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_comercio_app: string = user.nu_id_comercio_app;
        return this._httpClient.post<GetServicesResponse[]>(
            `${environment.API_URL}/Transacciones_App/sel_servicio_deuda_hub`,
            {
                nu_id_comercio_app,
                nu_id_producto_app,
                vc_cod_producto,
                vc_numero_servicio,
            }
        );
    }

    payDebt(
        nu_id_producto_app: string,
        vc_cod_producto: string,
        vc_numero_servicio: string,
        vc_numero_documento: string,
        nu_precio: string,
        nu_valor_comision: string,
        vc_telefono_sol: string,
        nu_comision_cliente: string
    ): Observable<any> {
        const vc_version_app: string = 'web';
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_comercio_app: string = user.nu_id_comercio_app;
        return this._httpClient.post<any>(
            `${environment.API_URL}/Transacciones_App/ins_servicio_pago_hub`,
            {
                nu_id_comercio_app,
                nu_id_producto_app,
                vc_cod_producto,
                vc_numero_servicio,
                vc_numero_documento,
                nu_precio,
                nu_valor_comision,
                vc_telefono_sol,
                vc_version_app,
                nu_comision_cliente,
            }
        );
    }

    sendEmailInvoice(
        nu_id_trx_app: string,
        vc_email_sol: string,
    ): Observable<any> {
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_comercio_app: string = user.nu_id_comercio_app;
        return this._httpClient.post<any>(
            `${environment.API_URL}/Transacciones_App/proc_envio_email_constancia`,
            {
                nu_id_trx_app,
                nu_id_comercio_app,
                vc_email_sol,
            }
        );
    }
}
