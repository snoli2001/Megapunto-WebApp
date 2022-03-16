/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from 'app/modules/admin/dashboards/profile/profile.service';
import moment from 'moment';
import { Moment } from 'moment';
import { ProfileInfo, TransactionInfo } from './profile.interfaces';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
    profileInfo: ProfileInfo;
    transacctions: TransactionInfo[] = [];
    transactionDate: Moment = moment(new Date());
    today: Moment = moment(new Date());
    dateFormat: any = {};

    constructor(private profileService: ProfileService) {}

    ngOnInit(): void {
        this.dateFormat = {
            sameDay: '[hoy]',
            nextDay: '[mañana]',
            nextWeek: 'dddd',
            lastDay: '[ayer]',
            lastWeek: '[último] dddd',
            sameElse: 'DD/MM/YYYY'
        };
        // Mock data
        this.initMockData();
    }

    initMockData(): void {
        this.profileInfo = {
            vc_cod_comercio: 'MX000002',
            vc_nombre_comercio: 'ZAK ROBLES',
            vc_nro_doc_identidad: '73661640',
            vc_direccion: 'Jirón Napo 847, Cercado de Lima 15083, Perú',
            vc_centro_poblado: 'Breña',
            nu_longitud: -77.053408,
            nu_latitud: -12.058268,
            vc_telefono: '1151114',
            vc_celular: '962329272',
            vc_email: 'zakery_10@hotmail.com',
            ch_tipo_documento: 'BV',
            nu_dia: 11,
            nu_mes: 9,
            nu_anio: 1995,
            vc_nombre_contacto: 'Zak',
            vc_desc_tipo_doc_identidad: 'DNI',
            vc_desc_departamento: 'LA LIBERTAD',
            vc_desc_provincia: 'TRUJILLO',
            vc_desc_distrito: 'TRUJILLO',
            vc_desc_grupo_giro_negocio: 'TELECOMUNICACIONES',
            vc_nombre_ejecutivo: 'CARLOS NOLI CHAVEZ',
            vc_nombre_distribuidor: 'ZILICOM INVESTMENTS',
        };

        for (let i = 0; i < 7; i++) {
            this.transacctions.push({
                nu_id_trx_app: 11310,
                dt_fecha: '14/03',
                bi_extorno: false,
                nu_precio: 341.0,
                nu_valor_comision: 0.0,
                vc_desc_producto: 'Consumo de agua',
                vc_desc_grupo: '',
                vc_desc_grupo_producto: 'Sedapal: Consumo de agua',
                nu_imp_trx_app: 341.0,
            });
        }
    }

    changeDate(amount: number): void {
        this.transactionDate.add(amount, 'days');
    }

    selectDate(value: Moment): void {
        this.transactionDate = value;
    }
}
