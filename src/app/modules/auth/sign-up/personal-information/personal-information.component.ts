import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {

  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
  };
  personalInformationForm: FormGroup;
  showAlert: boolean = false;
  today: Date = new Date();

  constructor(
    private rootFormGroup: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.personalInformationForm = this.rootFormGroup.control;
  }

  nextStep(): void {
    if (this.personalInformationForm.controls['personalInformation'].valid) {
      this.personalInformationForm.get('step').setValue(2);
    }
  }

}
