import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';

@Component({
  selector: 'app-business-address',
  templateUrl: './business-address.component.html',
  styleUrls: ['./business-address.component.scss']
})
export class BusinessAddressComponent implements OnInit {

  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
  };
  businessAddressForm: FormGroup;
  showAlert: boolean = false;

  constructor(
    private rootFormGroup: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.businessAddressForm = this.rootFormGroup.control;
  }

  prevStep(): void {
    this.businessAddressForm.get('step').setValue(1);
  }

  nextStep(): void {
    if (this.businessAddressForm.controls['businessAddress'].valid) {
      console.log('afilarme');
    }
  }

}
