import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { TransactionInfo } from './history.interfaces';
import { HistoryService } from './history.service';
import { Moment } from 'moment';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';

@Component({
    selector: 'history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements OnInit, OnDestroy {
    range = new FormGroup({
        trxStartDate: new FormControl(),
        trxEndDate: new FormControl(),
    });
    isScreenSmall: boolean;
    transactions: TransactionInfo[] = [];
    maxDate: Moment;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _fuseNavigationService: FuseNavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private historyService: HistoryService
    ) {}

    ngOnInit(): void {
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
        this.changeDates(0);
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

    getTransactions(): void {
        this.historyService
            .getHistoryInfo(
                this.formatDate(this.range.get('trxStartDate').value),
                this.formatDate(this.range.get('trxEndDate').value),
            )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((resp: TransactionInfo[]) => (this.transactions = resp));
    }

    myFilter = (d: Moment | null): boolean => {
        const day = d || moment();
        return day < moment();
    };

    selectFirstDate(value: Moment): void {
        const maxDate = moment(value).add(7, 'days');
        this.maxDate = maxDate;
    }

    selectEndDate(): void {
        if (this.range.get('trxEndDate').value) {
            this.getTransactions();
        }
    }

    formatDate(date: Moment): string {
        return moment(date).format('YYYY-MM-DD');
    }

    changeDates(days: number): void {
        this.range.get('trxStartDate').setValue(moment().subtract(days, 'days'));
        this.range.get('trxEndDate').setValue(moment());
        this.maxDate = moment(new Date());
        this.getTransactions();
    }
}
