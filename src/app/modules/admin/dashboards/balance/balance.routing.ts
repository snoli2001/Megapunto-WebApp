import { Route } from '@angular/router';
import { BalanceComponent } from 'app/modules/admin/dashboards/balance/balance.component';

export const balanceRoutes: Route[] = [
    {
        path     : '',
        component: BalanceComponent,
    }
];
