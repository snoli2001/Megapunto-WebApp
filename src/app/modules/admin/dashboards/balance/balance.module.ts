import { SafePipe } from './../../../../utils/pipes/safeUrl.pipe';
import { UtilsModule } from './../../../../utils/utils.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'app/shared/shared.module';
import { BalanceComponent } from 'app/modules/admin/dashboards/balance/balance.component';
import { balanceRoutes } from 'app/modules/admin/dashboards/balance/balance.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BankGuidePdfPopUpComponent } from './guides/bank-guide-pdf-pop-up/bank-guide-pdf-pop-up.component';

@NgModule({
    declarations: [BalanceComponent, BankGuidePdfPopUpComponent, SafePipe],
    imports: [
        RouterModule.forChild(balanceRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        NgApexchartsModule,
        SharedModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDialogModule,
        UtilsModule
    ],
})
export class BalanceModule {}
