/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl } from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';
import { Observable } from 'rxjs';
import {
    Region,
    BusinessAddressService,
    City,
    District,
} from './business-address.service';

@Component({
    selector: 'app-business-address',
    templateUrl: './business-address.component.html',
    styleUrls: ['./business-address.component.scss'],
})
export class BusinessAddressComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    businessAddressForm: FormGroup;
    showAlert: boolean = false;
    regions$: Observable<Region[]>;
    cities$: Observable<City[]>;
    districts$: Observable<District[]>;

    constructor(
        private rootFormGroup: FormGroupDirective,
        private _businessAddressService: BusinessAddressService
    ) {}

    get region(): FormControl {
        return this.businessAddressForm.controls['businessAddress'].get(
            'region'
        ) as FormControl;
    }

    get city(): FormControl {
        return this.businessAddressForm.controls['businessAddress'].get(
            'city'
        ) as FormControl;
    }

    get district(): FormControl {
        return this.businessAddressForm.controls['businessAddress'].get(
            'district'
        ) as FormControl;
    }

    ngOnInit(): void {
        this.businessAddressForm = this.rootFormGroup.control;
        this.getRegions();
        this.getCityByRegion();
        this.getDistrictByCity();
    }

    prevStep(): void {
        this.businessAddressForm.get('step').setValue(1);
    }

    nextStep(): void {
        if (this.businessAddressForm.controls['businessAddress'].valid) {
            console.log('afilarme');
        }
    }

    getRegions(): void {
        this.regions$ = this._businessAddressService.getRegions();
    }

    getCities(nu_id_departamento: string): void {
        this.cities$ =
            this._businessAddressService.getCities(nu_id_departamento);
        this.city.setValue('');
        this.district.setValue('');
    }

    getCityByRegion(): void {
        this.region.valueChanges.subscribe((region) => {
            this.getCities(region);
        });
    }

    getDistrictByCity(): void {
        this.city.valueChanges.subscribe((district) => {
            this.getDistrict(this.region.value, district);
        });
    }

    getDistrict(nu_id_departamento: string, nu_id_provincia: string): void {
        this.districts$ = this._businessAddressService.getDistricts(
            nu_id_departamento,
            nu_id_provincia
        );
        this.district.setValue('');
    }
}
