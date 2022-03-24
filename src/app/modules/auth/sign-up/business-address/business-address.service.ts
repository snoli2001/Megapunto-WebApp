/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/naming-convention */
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

export interface Region {
    nu_id_pais: string;
    nu_id_departamento: string;
    vc_desc_departamento: string;
}

export interface City {
    nu_id_departamento: string;
    nu_id_provincia: string;
    vc_desc_provincia: string;
}

export interface District {
    nu_id_departamento: string;
    nu_id_provincia: string;
    nu_id_distrito: string;
    vc_desc_distrito: string;
}

@Injectable({
    providedIn: 'root',
})
export class BusinessAddressService {
    constructor(private _httpClient: HttpClient) {}

    getRegions(): Observable<Region[]> {
        return this._httpClient
            .post<Region[]>(`${environment.API_URL}/Departamento/sel`, {})
            .pipe(map((resp) => resp));
    }

    getCities(nu_id_departamento: string): Observable<City[]> {
        return this._httpClient
            .post<City[]>(`${environment.API_URL}/Provincia/sel`, {
                nu_id_departamento,
            })
            .pipe(map((resp) => resp));
    }

    getDistricts(
        nu_id_departamento: string,
        nu_id_provincia: string
    ): Observable<District[]> {
        return this._httpClient
            .post<District[]>(`${environment.API_URL}/Distrito/sel`, {
                nu_id_departamento,
                nu_id_provincia,
            })
            .pipe(map((resp) => resp));
    }
}
