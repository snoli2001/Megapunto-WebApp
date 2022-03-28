// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';
// import { HistoryService } from 'app/modules/admin/dashboards/history/history.service';

// @Injectable({
//     providedIn: 'root'
// })
// export class HistoryResolver implements Resolve<any>
// {
//     /**
//      * Constructor
//      */
//     constructor(private _financeService: HistoryService)
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
//         return this._financeService.getData();
//     }
// }
