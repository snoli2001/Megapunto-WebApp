import { Route } from '@angular/router';
import { HomeComponent } from 'app/modules/admin/dashboards/home/home.component';

export const homeRoutes: Route[] = [
    {
        path     : '',
        component: HomeComponent,
    }
];
