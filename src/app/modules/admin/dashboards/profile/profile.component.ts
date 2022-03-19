import { OnDestroy } from '@angular/core';
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/naming-convention */
import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
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
import { ProfileInfo, DepositInfo } from './profile.interfaces';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit, OnDestroy {
    profileInfo: ProfileInfo = null;
    deposits: DepositInfo[] = [];
    depositsDate: Moment = moment(new Date());
    today: Moment = moment(new Date());
    dateFormat: any = {};
    isScreenSmall: boolean;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private profileService: ProfileService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    ) {}

    ngOnInit(): void {
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
                this.formatDate(this.depositsDate),
                this.formatDate(this.depositsDate)
            )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((resp: DepositInfo[]) => (this.deposits = resp));
    }

    formatDate(date: Moment): string {
        return moment(this.depositsDate).format('YYYY-MM-DD');
    }

    changeDate(amount: number): void {
        this.depositsDate.add(amount, 'days');
        this.profileService
            .getDepositsInfo(
                this.formatDate(this.depositsDate),
                this.formatDate(this.depositsDate)
            )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((resp: DepositInfo[]) => (this.deposits = resp));
    }

    selectDate(value: Moment): void {
        this.depositsDate = value;
        this.profileService
            .getDepositsInfo(
                this.formatDate(this.depositsDate),
                this.formatDate(this.depositsDate)
            )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((resp: DepositInfo[]) => (this.deposits = resp));
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
}
