/* eslint-disable @typescript-eslint/naming-convention */
export interface Product {
    vc_cod_producto: string;
    vc_desc_producto: string;
    nu_precio: number;
    nu_id_producto_app: number;
    nu_valor_comision: number;
    bi_descripcion: boolean;
    vc_descripcion: string;
}

export interface DigitalProduct {
    nu_id_grupo_app: string;
    vc_cod_grupo: string;
    vc_desc_grupo: string;
    nu_cant_prod: string;
    vc_url_imagen: string;
}

export interface DigitalProductDetail {
    vc_cod_producto: string;
    vc_desc_producto: string;
    nu_precio: string;
    nu_id_producto_app: string;
    nu_valor_comision: string;
    bi_descripcion: string;
    vc_descripcion: string;
}

export interface ServiceCategory {
    nu_id_rubro_servicio_app: string;
    vc_cod_rubro: string;
    vc_desc_rubro: string;
    nu_cant_emp: string;
}

export interface EnterpriseService {
    nu_id_empresa_servicio_app: string;
    vc_cod_empresa: string;
    vc_desc_empresa: string;
    vc_url_imagen: string;
    nu_cant_prod: string;
}

export interface Publicity {
    nu_id_app: string;
    nu_id_publicidad_app: string;
    vc_desc_publicidad: string;
    vc_url_imagen: string;
    bi_estado: string;
}
