// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';
// import { BalanceService } from 'app/modules/admin/dashboards/balance/balance.service';

// @Injectable({
//     providedIn: 'root'
// })
// export class BalanceResolver implements Resolve<any>
// {
//     /**
//      * Constructor
//      */
//     constructor(private _analyticsService: BalanceService)
//     {
//     }

//     // -----------------------------------------------------------------------------------------------------
//     // @ Public methods
//     // -----------------------------------------------------------------------------------------------------

//     /**
//      * Resolver
//      *
//      * @param route
//      * @param state
//      */
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
//     {
//         return this._analyticsService.getData();
//     }
// }
