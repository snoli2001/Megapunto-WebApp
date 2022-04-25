import { MatDialog } from '@angular/material/dialog';
/* eslint-disable @typescript-eslint/naming-convention */
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { BalanceService } from 'app/modules/admin/dashboards/balance/balance.service';
import { ProfileInfo } from './../profile/profile.interfaces';
import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { ApexOptions } from 'ng-apexcharts';
import { HomeService } from 'app/modules/admin/dashboards/home/home.service';
import {
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { DepositInfo } from '../profile/profile.interfaces';
import { ProfileService } from '../profile/profile.service';
import moment from 'moment';
import { Product } from './home.interfaces';
import { TopUpCellphoneBallanceComponent } from './home-pop-ups/top-up-cellphone-ballance/top-up-cellphone-ballance.component';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    operationActive: string = 'charges';
    deposits$: Observable<DepositInfo[]>;
    products$: Observable<Product[]>;
    commerceInfo$: Observable<ProfileInfo>;
    balance$: Observable<string>;
    topUpCellphoneBalanceForm: FormGroup;

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        private _fuseNavigationService: FuseNavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _balanceService: BalanceService,
        private profileService: ProfileService,
        private homeService: HomeService,
        private fb: FormBuilder,
        private matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
        this.initTopUpCellphoneBalanceForm();
        this.getName();
        this.getBalance();
        this.getDeposits();
        this.getProducts();
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation && this.isScreenSmall) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
    initTopUpCellphoneBalanceForm(): void {
        this.topUpCellphoneBalanceForm = this.fb.group({
            product: [{}, Validators.required],
            vc_numero_servicio: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
        });
    }

    toggleOperation(operation: string): void {
        this.operationActive = operation;
    }

    getName(): void {
        this.commerceInfo$ = this.profileService.getProfileInfo();
    }

    getBalance(): void {
        this.balance$ = this._balanceService
            .getBalance()
            .pipe(map((resp: any) => resp.nu_saldo));
    }

    getDeposits(): void {
        this.deposits$ = this.profileService
            .getDepositsInfo(
                moment().subtract(7, 'd').format('YYYY-MM-DD'),
                moment().format('YYYY-MM-DD')
            )
            .pipe(map((resp: any[]) => resp.slice(0, 3)));
    }

    getProducts(): void {
        this.products$ = this.homeService
            .getProducts('5', '1')
            .pipe(map((resp: any[]) => resp));
    }

    nextStepOfHub(): void {
        this.topUpCellphoneBalanceForm.markAsTouched();
        if (this.topUpCellphoneBalanceForm.valid) {
            const dialogREf = this.matDialog.open(TopUpCellphoneBallanceComponent, {
                data: this.topUpCellphoneBalanceForm.value,
            });
        }
    }
}
