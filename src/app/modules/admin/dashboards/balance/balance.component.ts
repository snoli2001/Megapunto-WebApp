/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';

@Component({
    selector: 'balance',
    templateUrl: './balance.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceComponent implements OnInit {

    balanceForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private _fuseNavigationService: FuseNavigationService
    ) {}

    ngOnInit(): void {
        this.initBalanceForm();
    }

    toggleNavigation(name: string): void {
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if (navigation) {
            navigation.toggle();
        }
    }

    initBalanceForm(): void {
        this.balanceForm = this.fb.group({
            nu_id_comercio: ['', Validators.required],
            nu_id_tipo_moneda: ['1', Validators.required],
            nu_id_cta_cte: ['', Validators.required],
            ch_destino: ['MX', Validators.required],
            vc_nro_operacion: ['', Validators.required],
            nu_importe: ['', Validators.required],
            dt_fec_operacion: ['', Validators.required],
            vc_cadena_imagen: ['', Validators.required]
        });
    }

}
