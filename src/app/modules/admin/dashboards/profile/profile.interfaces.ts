/* eslint-disable @typescript-eslint/naming-convention */
export interface ProfileInfo {
    vc_cod_comercio: string;
    vc_nombre_comercio: string;
    vc_nro_doc_identidad: string;
    vc_direccion: string;
    vc_centro_poblado: string;
    nu_longitud: number;
    nu_latitud: number;
    vc_telefono: string;
    vc_celular: string;
    vc_email: string;
    ch_tipo_documento: string;
    nu_dia: number;
    nu_mes: number;
    nu_anio: number;
    vc_nombre_contacto: string;
    vc_desc_tipo_doc_identidad: string;
    vc_desc_departamento: string;
    vc_desc_provincia: string;
    vc_desc_distrito: string;
    vc_desc_grupo_giro_negocio: string;
    vc_nombre_ejecutivo: string;
    vc_nombre_distribuidor: string;
}

export interface TransactionInfo {
    nu_id_trx_app: number;
    dt_fecha: string;
    bi_extorno: boolean;
    nu_precio: number;
    nu_valor_comision: number;
    vc_desc_producto: string;
    vc_desc_grupo: string;
    vc_desc_grupo_producto: string;
    nu_imp_trx_app: number;
}
