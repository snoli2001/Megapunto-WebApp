/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from 'environments/environment';
import {
    AppSection,
    DigitalProduct,
    DigitalProductDetail,
    EnterpriseService,
    Product,
    ServiceCategory,
} from './home.interfaces';
import { UserInterface } from 'app/core/auth/User.interface';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    getAppSections(): Observable<AppSection[]> {
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_comercio_app: string = user.nu_id_comercio_app;
        return this._httpClient.post<AppSection[]>(
            `${environment.API_URL}/SeccionApp/sel`,
            {
                nu_id_comercio_app,
            }
        );
    }

    getProducts(
        nu_id_grupo_app: string,
        nu_id_servicio_app: string
    ): Observable<Product[]> {
        const user: UserInterface = jwt_decode(this._authService.user);
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
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_comercio: string = user.nu_id_comercio;
        const nu_id_comercio_app: string = user.nu_id_comercio_app;
        const vc_tran_usua_regi: string = user.vc_nro_dispositivo;
        return this._httpClient.post<Product[]>(
            `${environment.API_URL}/Transacciones_App/ins_izipay_hub`,
            {
                nu_id_comercio_app,
                nu_id_comercio,
                nu_id_producto_app,
                vc_cod_producto,
                vc_numero_servicio,
                nu_precio,
                vc_tran_usua_regi,
                vc_version_app: 'web',
            }
        );
    }

    getDigitalProducts(): Observable<DigitalProduct[]> {
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_comercio_app: string = user.nu_id_comercio_app;
        const nu_id_seccion_app: string = '2';

        return this._httpClient.post<DigitalProduct[]>(
            `${environment.API_URL}/Grupo_Producto_APP/sel`,
            {
                nu_id_comercio_app,
                nu_id_seccion_app,
            }
        );
    }

    getDigitalProductsDetails(
        nu_id_grupo_app: string,
        nu_id_servicio_app: string = '2'
    ): Observable<DigitalProductDetail[]> {
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_comercio_app: string = user.nu_id_comercio_app;
        const nu_id_negocio: string = user.nu_id_negocio;

        return this._httpClient.post<DigitalProductDetail[]>(
            `${environment.API_URL}/Producto/sel_producto_app`,
            {
                nu_id_comercio_app,
                nu_id_negocio,
                nu_id_grupo_app,
                nu_id_servicio_app,
            }
        );
    }

    getServiceCategories(): Observable<ServiceCategory[]> {
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_comercio_app: string = user.nu_id_comercio_app;
        const nu_id_seccion_app: string = '3';
        return this._httpClient.post<ServiceCategory[]>(
            `${environment.API_URL}/Rubro_Servicio_App/sel`,
            {
                nu_id_comercio_app,
                nu_id_seccion_app,
            }
        );
    }

    getEnterprisesByService(
        nu_id_rubro_servicio_app: string
    ): Observable<EnterpriseService[]> {
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_comercio_app: string = user.nu_id_comercio_app;
        return this._httpClient.post<EnterpriseService[]>(
            `${environment.API_URL}/Empresa_Servicio_App/sel`,
            {
                nu_id_comercio_app,
                nu_id_rubro_servicio_app,
            }
        );
    }

    getPublicity(): Observable<any> {
        const user: UserInterface = jwt_decode(this._authService.user);
        const nu_id_comercio_app: string = user.nu_id_comercio_app;
        const nu_id_app: string = '1';

        return this._httpClient.post<any>(
            `${environment.API_URL}/Publicidad_App/sel`,
            {
                nu_id_app,
                nu_id_comercio_app,
            }
        );
    }

    getBusinessInformation(cellphoneNumber: string): Observable<any> {
        return this._httpClient.post<any>(
            `${environment.API_URL}/Comercio_Bancario/get_comercio_dispositivo
            `,
            {
                vc_nro_dispositivo: cellphoneNumber,
            }
        );
    }
}
