import { BankGuidePdfPopUpComponent } from './guides/bank-guide-pdf-pop-up/bank-guide-pdf-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
/* eslint-disable arrow-parens */
import { BalanceService } from 'app/modules/admin/dashboards/balance/balance.service';
import { OnDestroy } from '@angular/core';
/* eslint-disable @typescript-eslint/naming-convention */
import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { takeUntil, Observable, map } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

@Component({
    selector: 'balance',
    templateUrl: './balance.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceComponent implements OnInit, OnDestroy {
    balanceForm: FormGroup;
    balance$: Observable<string>;
    isScreenSmall: boolean;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private fb: FormBuilder,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _balanceService: BalanceService,
        private _matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
        this.initData();
        this.initBalanceForm();
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    initData(): void {
        this.balance$ = this._balanceService
            .getBalance()
            .pipe(map((resp: any) => resp.nu_saldo));
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    toggleNavigation(name: string): void {
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            navigation.toggle();
        }
    }

    openGuide(bankName: string): void {
        const dialogRef = this._matDialog.open(BankGuidePdfPopUpComponent, {
            data: bankName,
        });
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
            vc_cadena_imagen: ['', Validators.required],
        });
    }
}
