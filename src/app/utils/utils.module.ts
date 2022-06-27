import { SafePipe } from './pipes/safeUrl.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/component/alert.component';
import { AlertService } from './alert/alert.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StrictNumberOnlyDirective } from './directives/StrictNumberOnlyDirective';
import { MaxLengthDirective } from './directives/MaxLenghtDirective';

@NgModule({
    declarations: [
        AlertComponent,
        StrictNumberOnlyDirective,
        MaxLengthDirective,
    ],
    imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
    exports: [AlertComponent, StrictNumberOnlyDirective, MaxLengthDirective],
    providers: [AlertService],
})
export class UtilsModule {}
