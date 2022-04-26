import { SafePipe } from './pipes/safeUrl.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/component/alert.component';
import { AlertService } from './alert/alert.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    AlertComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    AlertService,
  ]
})
export class UtilsModule { }
