/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from 'environments/environment';
import { UserInterface } from 'app/core/auth/User.interface';
import {
    CountryCode,
    PresetAmount,
    InternationalRechargeRequest,
    InternationalRechargeResponse,
} from '../interfaces/international-recharge.interface';

@Injectable({
    providedIn: 'root',
})
export class InternationalRechargeService {
    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    getCountryCodes(): Observable<CountryCode[]> {
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_comercio_app: string = user.nu_id_comercio_app;

        return this._httpClient.post<CountryCode[]>(
            `${environment.API_URL}/Pais/sel_codigos_pais`,
            {
                nu_id_comercio_app,
            }
        );
    }

    getPresetAmounts(): Observable<PresetAmount[]> {
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_comercio_app: string = user.nu_id_comercio_app;

        return this._httpClient.post<PresetAmount[]>(
            `${environment.API_URL}/Producto/sel_montos_internacional`,
            {
                nu_id_comercio_app,
            }
        );
    }

    validateInternationalNumber(
        country: string,
        phone: string
    ): Observable<any> {
        return this._httpClient.post<any>(
            `${environment.API_URL}/Validacion/validar_numero_internacional`,
            {
                vc_codigo_pais: country,
                vc_numero_servicio: phone,
            }
        );
    }

    executeInternationalRecharge(
        vc_codigo_pais: string,
        vc_numero_servicio: string,
        nu_monto_recarga: string
    ): Observable<InternationalRechargeResponse> {
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_comercio: string = user.nu_id_comercio;
        const nu_id_comercio_app: string = user.nu_id_comercio_app;
        const vc_tran_usua_regi: string = user.vc_nro_dispositivo;

        return this._httpClient.post<InternationalRechargeResponse>(
            `${environment.API_URL}/Transacciones_App/ins_recarga_internacional_hub`,
            {
                nu_id_comercio,
                nu_id_comercio_app,
                vc_codigo_pais,
                vc_numero_servicio,
                nu_monto_recarga,
                vc_tran_usua_regi,
                vc_version_app: 'web',
            }
        );
    }

    calculateCommission(
        nu_monto: number,
        vc_codigo_pais: string
    ): Observable<any> {
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_comercio_app: string = user.nu_id_comercio_app;

        return this._httpClient.post<any>(
            `${environment.API_URL}/Comision/calcular_comision_internacional`,
            {
                nu_id_comercio_app,
                nu_monto,
                vc_codigo_pais,
            }
        );
    }
}
