/* eslint-disable arrow-parens */
import { ExcelServiceService } from './../../../../utils/services/excel-service.service';
import { PrintInvoiceService } from './../../../../utils/services/print-invoice.service';
/* eslint-disable @typescript-eslint/naming-convention */
import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
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
import printJS from 'print-js';

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
    transactions: Observable<TransactionInfo[]>;
    maxDate: Moment;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _fuseNavigationService: FuseNavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private historyService: HistoryService,
        private _printInvoiceService: PrintInvoiceService,
        private excelService: ExcelServiceService
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
        if (this.range.get('trxEndDate').value) {
            this.transactions = this.historyService
                .getHistoryInfo(
                    this.formatDate(this.range.get('trxStartDate').value),
                    this.formatDate(this.range.get('trxEndDate').value)
                )
                .pipe(takeUntil(this._unsubscribeAll));
        }
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
        this.range
            .get('trxStartDate')
            .setValue(moment().subtract(days, 'days'));
        this.range.get('trxEndDate').setValue(moment());
        this.maxDate = moment(new Date());
        this.getTransactions();
    }

    printInvoice(nu_tran_pkey: string): void {
        this._printInvoiceService.getInvoice(nu_tran_pkey).subscribe((resp) => {
            printJS({
                printable: resp.vc_ruta_archivo,
                type: 'pdf',
                showModal: true,
            });
        });
    }

    downloadExcel(): void {
        this.transactions.subscribe((trans) => {
            console.log(trans);
            const data = [];
            const titleStyle: any = {
                font: {
                    name: 'Arial',
                    sz: 15,
                    bold: true,
                    italic: true,
                    // color: { rgb: '7C66F7' },
                },
                alignment: { horizontal: 'left', vertical: 'center' },
            };
            const headerStyle = {
                font: {
                    bold: true,
                    color: { rgb: 'FFFFFF' },
                },
                fill: {
                    // patternType: 'solid',
                    fgColor: { rgb: '7C66F7' },
                },
            };
            const today = new Date();
            const date =
                today.getDate() +
                '/' +
                (today.getMonth() + 1) +
                '/' +
                today.getFullYear();
            const time = ' ' + today.getHours() + ':' + today.getMinutes();
            const titulo = [
                [
                    {
                        v: 'MEGAPUNTO - Reporte de Historial de operaciones',
                        t: 's',
                        s: titleStyle,
                    },
                    { v: '', t: 's' },
                    { v: '', t: 's' },
                    { v: '', t: 's' },
                    {
                        v: 'Fecha y Hora',
                        t: 's',
                        s: {
                            font: {
                                name: 'Arial',
                                bold: true,
                                italic: true,
                            },
                        },
                    },
                    {
                        v: date + time,
                        t: 's',
                        s: {
                            font: {
                                name: 'Arial',
                            },
                        },
                    },
                ],
                [{ v: '', t: 's' }],
            ];
            titulo.forEach((c) => data.push(c));
            const headers = [
                { t: 's', v: 'Fecha', s: headerStyle },
                { t: 's', v: 'N° de Operación', s: headerStyle },
                { t: 's', v: 'Producto', s: headerStyle },
                { t: 's', v: 'Descripción', s: headerStyle },
                { t: 's', v: 'Monto', s: headerStyle },
                { t: 's', v: 'Comisión', s: headerStyle },
            ];

            data.push(headers);
            for (const t of trans) {
                const d = [
                    { t: 's', v: t.dt_fecha },
                    { t: 's', v: t.nu_id_trx_app },
                    { t: 's', v: t.vc_desc_producto },
                    { t: 's', v: t.vc_desc_grupo_producto },
                    { t: 'n', v: t.nu_precio },
                    { t: 'n', v: t.nu_valor_comision },
                ];
                data.push(d);
            }
            const colProps = [];
            colProps.push({ wpx: 120 }); // A
            colProps.push({ wpx: 120 }); // B
            colProps.push({ wpx: 200 }); // C
            colProps.push({ wpx: 220 }); // D
            colProps.push({ wpx: 100 }); // E
            colProps.push({ wpx: 100 }); // F

            const merge = [{ s: { c: 0, r: 0 }, e: { c: 2, r: 0 } }];

            this.excelService.exportDataToExcelArray(
                data,
                'reporte-transacciones-megapunto',
                colProps,
                merge
            );
        });
    }
}
