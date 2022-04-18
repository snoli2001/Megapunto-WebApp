import { Route } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export const errorRoutes: Route[] = [
    {
        path     : '',
        component: NotFoundComponent,
    }
];
