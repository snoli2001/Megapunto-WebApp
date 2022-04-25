/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from 'environments/environment';
import { Product } from './home.interfaces';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    getProducts(
        nu_id_grupo_app: string,
        nu_id_servicio_app: string
    ): Observable<Product[]> {
        const user: any = jwt_decode(this._authService.user);
        const nu_id_negocio: string = user.nu_id_negocio;
        const nu_id_comercio_app: string = user.nu_id_comercio_app;

        return this._httpClient.post<Product[]>(
            `${environment.API_URL}/Producto/sel_producto_app`,
            {
                nu_id_comercio_app,
                nu_id_negocio,
                nu_id_grupo_app,
                nu_id_servicio_app,
            }
        );
    }

    topUpCellphoneBalance(
        nu_id_producto_app: string,
        vc_cod_producto: string,
        vc_numero_servicio: string,
        nu_precio: string
    ): Observable<any> {
        const user: any = jwt_decode(this._authService.user);
        const nu_id_comercio: string = user.nu_id_comercio;
        const nu_id_comercio_app: string = user.nu_id_comercio_app;

        return this._httpClient.post<Product[]>(
            `${environment.API_URL}/Transacciones_App/ins_izipay_hub`,
            {
                nu_id_comercio_app,
                nu_id_comercio,
                nu_id_producto_app,
                vc_cod_producto,
                vc_numero_servicio,
                nu_precio,
            }
        );
    }
}
