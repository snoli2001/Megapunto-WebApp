import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

  sendEmailForm: FormGroup;
  showError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<SendEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.sendEmailForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  onClose(data?: any): void {
    if (!data) {
      this.dialogRef.close();
      return;
    }

    if (data && this.sendEmailForm.valid) {
      this.dialogRef.close(this.sendEmailForm.get('email').value);
    } else {
      this.showError = true;
    }
  }

}
