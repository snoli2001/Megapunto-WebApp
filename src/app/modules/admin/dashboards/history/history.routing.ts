import { Route } from '@angular/router';
import { HistoryComponent } from 'app/modules/admin/dashboards/history/history.component';
import { HistoryResolver } from 'app/modules/admin/dashboards/history/history.resolvers';

export const historyRoutes: Route[] = [
    {
        path     : '',
        component: HistoryComponent,
        resolve  : {
            data: HistoryResolver
        }
    }
];
