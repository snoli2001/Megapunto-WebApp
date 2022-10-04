/* eslint-disable @typescript-eslint/naming-convention */
import { AuthService } from 'app/core/auth/auth.service';
import jwt_decode from 'jwt-decode';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PrintInvoiceService {
    constructor(private http: HttpClient, private _authService: AuthService) {}

    getInvoice(nu_id_trx_app: string): Observable<any> {
        const user: any = jwt_decode(this._authService.user);
        const nu_id_comercio_app: string = user.nu_id_comercio_app;
        console.log(nu_id_trx_app);

        return this.http.post<any>(
            `${environment.API_URL}/Transacciones_App/get_archivo_constancia`,
            {
                nu_id_comercio_app,
                nu_id_trx_app,
            }
        );
    }
}
