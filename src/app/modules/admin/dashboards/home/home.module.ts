import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'app/shared/shared.module';
import { HomeComponent } from 'app/modules/admin/dashboards/home/home.component';
import { homeRoutes } from 'app/modules/admin/dashboards/home/home.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TopUpCellphoneBallanceComponent } from './home-pop-ups/top-up-cellphone-ballance/top-up-cellphone-ballance.component';
import { MatCurrencyFormatModule } from 'mat-currency-format';
import { MatStepperModule } from '@angular/material/stepper';
import { SentinelComponent } from './home-pop-ups/digital-products/sentinel/sentinel.component';
import { IncommComponent } from './home-pop-ups/digital-products/incomm/incomm.component';

@NgModule({
    declarations: [HomeComponent, TopUpCellphoneBallanceComponent, SentinelComponent, IncommComponent],
    imports: [
        RouterModule.forChild(homeRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        NgApexchartsModule,
        TranslocoModule,
        SharedModule,
        MatCurrencyFormatModule,
        MatDialogModule,
        MatStepperModule,
    ],
})
export class HomeModule {}
