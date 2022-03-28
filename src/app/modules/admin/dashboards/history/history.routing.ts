import { Route } from '@angular/router';
import { HistoryComponent } from 'app/modules/admin/dashboards/history/history.component';

export const historyRoutes: Route[] = [
    {
        path     : '',
        component: HistoryComponent/* ,
        resolve  : {
            data: HistoryResolver
        } */
    }
];
