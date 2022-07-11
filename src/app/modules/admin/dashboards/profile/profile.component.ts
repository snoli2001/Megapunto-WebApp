/* eslint-disable arrow-parens */
import { Directive, Inject, Injectable, Input, OnDestroy } from '@angular/core';

import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import {
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ProfileService } from 'app/modules/admin/dashboards/profile/profile.service';
import moment from 'moment';
import { Moment } from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { EditBusinessDataComponent } from './components/edit-business-data/edit-business-data.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileInfo, DepositInfo } from './profile.interfaces';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit, OnDestroy {
    range: FormGroup;
    profileInfo: ProfileInfo = null;
    deposits: DepositInfo[] = [];
    today: Moment = moment(new Date());
    dateFormat: any = {};

    minDate: Date;
    maxDate: Moment;

    alert: any = {};
    showAlert: boolean = false;

    isScreenSmall: boolean;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private profileService: ProfileService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.range = this.fb.group({
            depositsStartDate: [moment(), Validators.required],
            depositsEndDate: [moment(), Validators.required],
        });

        this.dateFormat = {
            sameDay: '[hoy]',
            nextDay: '[mañana]',
            nextWeek: 'dddd',
            lastDay: '[ayer]',
            lastWeek: '[último] dddd',
            sameElse: 'DD/MM/YYYY',
        };
        this.getProfileInfo();
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    getProfileInfo(): void {
        this.profileService
            .getProfileInfo()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((resp) => (this.profileInfo = resp));
        this.profileService
            .getDepositsInfo(
                this.formatDate(this.range.get('depositsStartDate').value),
                this.formatDate(this.range.get('depositsEndDate').value)
            )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((resp: DepositInfo[]) => (this.deposits = resp));
    }

    formatDate(date: Moment): string {
        return moment(date).format('YYYY-MM-DD');
    }

    selectFirstDate(value: Moment): void {
        const maxDate = moment(value).add(7, 'days');
        this.maxDate = maxDate;
    }

    myFilter = (d: Moment | null): boolean => {
        const day = d || moment();
        return day < moment();
    };

    resetDates(days: number): void {
        this.range.get('depositsStartDate').setValue(moment().subtract(days, 'days'));
        this.range.get('depositsEndDate').setValue(moment());
        this.maxDate = moment();
        this.selectEndDate();
    }

    selectEndDate(): void {
        if (this.range.get('depositsEndDate').value) {
            this.profileService
                .getDepositsInfo(
                    this.formatDate(this.range.get('depositsStartDate').value),
                    this.formatDate(this.range.get('depositsEndDate').value)
                )
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((resp: DepositInfo[]) => (this.deposits = resp));
        }
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

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    openEditProfileDialog(): void {
        const dialogRef = this.dialog.open(EditProfileComponent, {
            width: this.isScreenSmall ? '90%' : '40%',
            data: this.profileInfo,
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.profileService
                    .updProfileInfo(result)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((resp: any) => {
                        this.showAlert = true;
                        this.alert.type = resp.nu_tran_stdo ? 'success' : 'error';
                        this.alert.message = resp.tx_tran_mnsg;

                        this.getProfileInfo();

                        setTimeout(() => {
                            this.showAlert = false;
                        }, 5000);
                    });
            }
        });
    }

    openEditBusinessDataDialog(): void {
        const dialogRef = this.dialog.open(EditBusinessDataComponent, {
            width: this.isScreenSmall ? '95%' : '60%',
            data: this.profileInfo,
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    updatePassword(): void {
        this.router.navigate(['reset-password']);
    }
}

