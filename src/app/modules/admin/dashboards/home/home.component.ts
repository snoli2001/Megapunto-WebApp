import { PayServicesComponent } from './home-pop-ups/pay-services/pay-services.component';
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
import { map, Observable, startWith, Subject, takeUntil, filter } from 'rxjs';
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
import {
    Product,
    DigitalProduct,
    ServiceCategory,
    EnterpriseService,
    Publicity,
    AppSection,
} from './home.interfaces';
import { TopUpCellphoneBallanceComponent } from './home-pop-ups/top-up-cellphone-ballance/top-up-cellphone-ballance.component';
import { PublicityComponent } from './home-pop-ups/publicity/publicity.component';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    balance: string;
    operationActive: string = 'charges';
    digitalProductActive: DigitalProduct;
    vc_tran_codi: string;

    deposits$: Observable<DepositInfo[]>;
    products$: Observable<Product[]>;
    digitalProducts$: Observable<DigitalProduct[]>;
    serviceCategories$: Observable<ServiceCategory[]>;
    commerceInfo$: Observable<ProfileInfo>;
    publicity$: Observable<Publicity[]>;
    appSections: AppSection[];

    topUpCellphoneBalanceForm: FormGroup;
    selectServiceForm: FormGroup;
    // enterprise: string;
    enterprisesService: EnterpriseService[];
    filteredEnterprisesService: Observable<EnterpriseService[]>;

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

    get nu_id_rubro_servicio_appForm(): FormControl {
        return this.selectServiceForm.get(
            'nu_id_rubro_servicio_app'
        ) as FormControl;
    }

    get nu_id_empresa_servicio_appForm(): FormControl {
        return this.selectServiceForm.get('enterprise') as FormControl;
    }

    ngOnInit(): void {
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
        this.getPublicity();
        this.initTopUpCellphoneBalanceForm();
        this.initSelectServiceForm();
        this.getName();
        this.getBalance();
        this.getDeposits();
        this.getProducts();
        this.getDigitalProducts();
        this.getServiceCategories();
        this.getAppSections();
        this.detectServiceCategoryChangeAndUpdateEnterprises();
        this.matDialog.afterAllClosed.subscribe(() => {
            this.getBalance();
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
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

    initSelectServiceForm(): void {
        this.selectServiceForm = this.fb.group({
            nu_id_rubro_servicio_app: [null, Validators.required],
            enterprise: [null, [Validators.required]],
        });
    }

    initEnterprisesFilteredOptions(): void {
        this.filteredEnterprisesService =
            this.nu_id_empresa_servicio_appForm.valueChanges.pipe(
                startWith(''),
                map((value) =>
                    typeof value === 'string' ? value : value?.vc_desc_empresa
                ),
                map((vc_desc_empresa) =>
                    vc_desc_empresa
                        ? this._filter(vc_desc_empresa)
                        : this.enterprisesService.slice()
                )
            );
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

    getServiceCategories(): void {
        this.serviceCategories$ = this.homeService.getServiceCategories();
        this.serviceCategories$.subscribe((resp) =>
            this.selectServiceForm
                .get('nu_id_rubro_servicio_app')
                .setValue(resp[0].nu_id_rubro_servicio_app)
        );
    }

    getAppSections(): void {
        this.homeService.getAppSections().subscribe({
            next: (resp) => {
                this.appSections = resp;
            },
        });
    }

    getDigitalProducts(): void {
        this.digitalProducts$ = this.homeService.getDigitalProducts();
    }

    getPublicity(): void {
        this.publicity$ = this.homeService.getPublicity();
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

    toggleOperation(operation: string): void {
        this.operationActive = operation;
        this.digitalProductActive = null;
        this.topUpCellphoneBalanceForm.get('product').setValue(null);
        this.topUpCellphoneBalanceForm.get('vc_numero_servicio').setValue('');
        this.topUpCellphoneBalanceForm
            .get('vc_numero_servicio')
            .markAsUntouched();
    }

    toggleDigitalProducts(digitalProduct: DigitalProduct): void {
        this.digitalProductActive = digitalProduct;
        this.topUpCellphoneBalanceForm.get('product').setValue(null);
    }

    displayFn(enterprise: EnterpriseService): string {
        return enterprise && enterprise.vc_desc_empresa
            ? enterprise.vc_desc_empresa
            : '';
    }

    nextStepOfHub(): void {
        this.topUpCellphoneBalanceForm.markAllAsTouched();
        if (!this.topUpCellphoneBalanceForm.valid) {
            return;
        }

        const appSection = this.appSections.find(
            (section) => section.nu_id_seccion_app === '1'
        );

        if (appSection.bi_habilitado === 'True') {
            if (
                this.topUpCellphoneBalanceForm.value.product
                    .bi_validacion_comercio === 'True'
            ) {
                this.homeService
                    .getBusinessInformation(
                        this.topUpCellphoneBalanceForm.value.vc_numero_servicio
                    )
                    .subscribe((resp) => {
                        if (resp.nu_tran_stdo === '1') {
                            this.ngZone.run(() => {
                                const dialogRef = this.matDialog.open(
                                    TopUpCellphoneBallanceComponent,
                                    {
                                        disableClose: true,
                                        data: {
                                            value: this
                                                .topUpCellphoneBalanceForm
                                                .value,
                                            size: 500,
                                        },
                                        maxWidth: '100vw',
                                    }
                                );

                                dialogRef
                                    .afterClosed()
                                    .subscribe((transResp) => {
                                        if (transResp) {
                                            this._balanceService
                                                .getBalance()
                                                .subscribe((resp) => {
                                                    this.balance =
                                                        resp.nu_saldo;
                                                    if (
                                                        transResp.nu_tran_stdo ===
                                                        '1'
                                                    ) {
                                                        this._alertService.showAlert(
                                                            'success',
                                                            transResp.tx_tran_mnsg,
                                                            500,
                                                            {
                                                                balance:
                                                                    this
                                                                        .balance,
                                                            }
                                                        );
                                                    }
                                                });
                                        }
                                        this.initTopUpCellphoneBalanceForm();
                                    });
                            });
                        } else {
                            this._alertService.showAlert(
                                'error',
                                resp.tx_tran_mnsg,
                                500,
                                null
                            );
                        }
                    });
            } else {
                this.ngZone.run(() => {
                    const dialogRef = this.matDialog.open(
                        TopUpCellphoneBallanceComponent,
                        {
                            disableClose: true,
                            data: {
                                value: this.topUpCellphoneBalanceForm.value,
                                size: 500,
                            },
                            maxWidth: '100vw',
                        }
                    );

                    dialogRef.afterClosed().subscribe((transResp) => {
                        if (transResp) {
                            this._balanceService
                                .getBalance()
                                .subscribe((resp) => {
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
                        }
                        this.initTopUpCellphoneBalanceForm();
                    });
                });
            }
        } else {
            this._alertService.showAlert(
                'error',
                appSection.vc_mensaje,
                500,
                null
            );
        }
    }

    nextStepDigitalProduct(): void {
        const appSection = this.appSections.find(
            (section) => section.nu_id_seccion_app === '2'
        );
        if (appSection.bi_habilitado === 'True') {
            if (this.digitalProductActive) {
                if (this.digitalProductActive.nu_id_grupo_app === '1') {
                    this.ngZone.run(() => {
                        this.matDialog.open(SentinelComponent, {
                            disableClose: true,
                            data: {
                                digitalProduct: this.digitalProductActive,
                                size: 600,
                            },
                            maxWidth: '100vw',
                        });
                    });
                }
                if (
                    this.digitalProductActive.nu_id_grupo_app === '3' ||
                    this.digitalProductActive.nu_id_grupo_app === '2'
                ) {
                    this.ngZone.run(() => {
                        this.matDialog.open(IncommComponent, {
                            disableClose: true,
                            data: {
                                digitalProduct: this.digitalProductActive,
                                size: 500,
                            },
                            maxWidth: '100vw',
                        });
                    });
                }
            }
        } else {
            this._alertService.showAlert(
                'error',
                appSection.vc_mensaje,
                500,
                null
            );
        }
    }

    detectServiceCategoryChangeAndUpdateEnterprises(): void {
        this.nu_id_rubro_servicio_appForm.valueChanges.subscribe((value) => {
            if (value) {
                this.homeService
                    .getEnterprisesByService(value)
                    .subscribe((resp) => {
                        this.nu_id_empresa_servicio_appForm.setValue(null);
                        this.enterprisesService = resp;
                        this.initEnterprisesFilteredOptions();
                    });
            }
        });
    }

    nextStepPayServices(): void {
        this.selectServiceForm.markAllAsTouched();
        const appSection = this.appSections.find(
            (section) => section.nu_id_seccion_app === '3'
        );
        if (appSection.bi_habilitado === 'True') {
            if (this.selectServiceForm.valid) {
                this.ngZone.run(() => {
                    this.matDialog.open(PayServicesComponent, {
                        disableClose: true,
                        data: {
                            enterprise:
                                this.nu_id_empresa_servicio_appForm.value,
                            size: 600,
                        },
                        maxWidth: '100vw',
                    });
                });
            }
        } else {
            this._alertService.showAlert(
                'error',
                appSection.vc_mensaje,
                500,
                null
            );
        }
    }

    openPublicity(): void {
        this.ngZone.run(() => {
            this.publicity$.subscribe((publicity) => {
                this.matDialog.open(PublicityComponent, {
                    maxWidth: '100vw',
                    data: publicity
                });
            });
        });
    }

    private _filter(value: string): EnterpriseService[] {
        const filterValue = value.toLowerCase();
        return this.enterprisesService.filter((enterprise) =>
            enterprise.vc_desc_empresa.toLowerCase().includes(filterValue)
        );
    }
}
