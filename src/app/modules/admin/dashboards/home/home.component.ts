import { IncommComponent } from './home-pop-ups/digital-products/Incomm/incomm.component';
import { SentinelComponent } from './home-pop-ups/digital-products/sentinel/sentinel.component';
import { NgZone } from '@angular/core';
/* eslint-disable @typescript-eslint/no-shadow */
import { AlertService } from 'app/utils/alert/alert.service';
/* eslint-disable arrow-parens */
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
import { map, observable, Observable, Subject, takeUntil } from 'rxjs';
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
import { Product, DigitalProduct } from './home.interfaces';
import { TopUpCellphoneBallanceComponent } from './home-pop-ups/top-up-cellphone-ballance/top-up-cellphone-ballance.component';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    operationActive: string = 'charges';
    digitalProductActive: DigitalProduct;
    deposits$: Observable<DepositInfo[]>;
    products$: Observable<Product[]>;
    commerceInfo$: Observable<ProfileInfo>;
    balance: string;
    topUpCellphoneBalanceForm: FormGroup;
    digitalProducts$: Observable<DigitalProduct[]>;

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        private _fuseNavigationService: FuseNavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _balanceService: BalanceService,
        private profileService: ProfileService,
        private homeService: HomeService,
        private fb: FormBuilder,
        private matDialog: MatDialog,
        private _alertService: AlertService,
        private ngZone: NgZone
    ) {}

    get vc_numero_servicioInvalid(): boolean {
        return (
            this.topUpCellphoneBalanceForm.get('vc_numero_servicio').invalid &&
            this.topUpCellphoneBalanceForm.get('vc_numero_servicio').touched
        );
    }

    get productInvalid(): boolean {
        return (
            this.topUpCellphoneBalanceForm.get('product').invalid &&
            this.topUpCellphoneBalanceForm.get('product').touched
        );
    }

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
        this.getDigitalProducts();
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
            product: [null, Validators.required],
            vc_numero_servicio: [
                '',
                [
                    Validators.required,
                    Validators.minLength(9),
                    Validators.maxLength(9),
                ],
            ],
        });
    }

    toggleOperation(operation: string): void {
        this.operationActive = operation;
        this.digitalProductActive = null;
        this.topUpCellphoneBalanceForm.get('product').setValue(null);
    }

    toggleDigitalProducts(digitalProduct: DigitalProduct): void {
        this.digitalProductActive = digitalProduct;
        this.topUpCellphoneBalanceForm.get('product').setValue(null);
    }

    getName(): void {
        this.commerceInfo$ = this.profileService.getProfileInfo();
    }

    getBalance(): void {
        this._balanceService
            .getBalance()
            .pipe(map((resp: any) => resp.nu_saldo))
            .subscribe((resp) => (this.balance = resp));
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

    getDigitalProducts(): void {
        this.digitalProducts$ = this.homeService.getDigitalProducts();
    }

    nextStepOfHub(): void {
        this.topUpCellphoneBalanceForm.markAllAsTouched();
        if (!this.topUpCellphoneBalanceForm.valid) {
            return;
        }

        this.ngZone.run(() => {
            const dialogRef = this.matDialog.open(
                TopUpCellphoneBallanceComponent,
                {
                    disableClose: true,
                    data: {
                        value: this.topUpCellphoneBalanceForm.value,
                        size: 500,
                    },
                }
            );

            dialogRef.afterClosed().subscribe((transResp) => {
                this._balanceService.getBalance().subscribe((resp) => {
                    this.balance = resp.nu_saldo;
                    if (transResp.nu_tran_stdo === '1') {
                        this._alertService.showAlert(
                            'success',
                            transResp.tx_tran_mnsg,
                            500,
                            {
                                balance: this.balance,
                            }
                        );
                    }
                });
            });
        });
    }

    nextStepDigitalProduct(): void {
        if (this.digitalProductActive) {
            console.log(this.digitalProductActive.nu_id_grupo_app);
            if (this.digitalProductActive.nu_id_grupo_app === '1') {
                this.ngZone.run(() => {
                    this.matDialog.open(SentinelComponent, {
                        disableClose: true,
                        data: {
                            digitalProduct: this.digitalProductActive,
                            size: 500,
                        },
                    });
                });
            }
            if (this.digitalProductActive.nu_id_grupo_app === '3') {
                this.ngZone.run(() => {
                    this.matDialog.open(IncommComponent, {
                        disableClose: true,
                        data: {
                            digitalProduct: this.digitalProductActive,
                            size: 500,
                        },
                    });
                });
            }
        }
    }
}
