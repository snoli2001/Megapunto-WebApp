import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    operationActive: string = 'charges';
    deposits: any[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _fuseNavigationService: FuseNavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private profileService: ProfileService,
    ) {}

    ngOnInit(): void {
        //this.getDeposits();

        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
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
    }

    getDeposits(): void {
        this.profileService
            .getDepositsInfo(
                moment().subtract(7, 'd').format('YYYY-MM-DD'),
                moment().format('YYYY-MM-DD')
            )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((resp: any[]) => {
                this.deposits = [...resp.slice(0, 3)];
                console.log('this.deposits: ', this.deposits);
            });
    }
}
