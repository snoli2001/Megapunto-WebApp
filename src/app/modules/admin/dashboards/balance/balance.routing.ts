import { Route } from '@angular/router';
import { BalanceComponent } from 'app/modules/admin/dashboards/balance/balance.component';
import { BalanceResolver } from 'app/modules/admin/dashboards/balance/balance.resolvers';

export const balanceRoutes: Route[] = [
    {
        path     : '',
        component: BalanceComponent,
        resolve  : {
            data: BalanceResolver
        }
    }
];
