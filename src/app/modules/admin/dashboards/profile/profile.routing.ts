import { Route } from '@angular/router';
import { ProfileComponent } from 'app/modules/admin/dashboards/profile/profile.component';
import { ProfileResolver } from 'app/modules/admin/dashboards/profile/profile.resolvers';

export const profileRoutes: Route[] = [
    {
        path     : '',
        component: ProfileComponent,
        resolve  : {
            data: ProfileResolver
        }
    }
];
