/* eslint-disable @typescript-eslint/naming-convention */
export interface InternationalRechargeRequest {
    nu_id_comercio: string;
    nu_id_comercio_app: string;
    nu_id_producto_app: string;
    vc_numero_servicio: string;
    vc_codigo_pais: string;
    nu_monto_recarga: string;
    vc_tran_usua_regi: string;
    vc_version_app: string;
}

export interface InternationalRechargeResponse {
    nu_tran_stdo: string;
    tx_tran_mnsg: string;
    nu_tran_pkey?: string;
    vc_tran_codi?: string;
}

export interface InternationalRechargeDetail {
    vc_numero_completo: string;
    vc_codigo_pais: string;
    vc_numero_servicio: string;
    nu_monto_recarga: number;
    nu_comision: number;
    nu_total: number;
}

export interface CountryCode {
    codigo: string;
    nombre: string;
    prefijo: string;
    bandera?: string;
}

export interface PresetAmount {
    valor: number;
    moneda: string;
    etiqueta: string;
}
