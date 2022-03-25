/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl } from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';
import { Loader } from '@googlemaps/js-api-loader';
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
    latitude: number;
    longitude: number;
    geocoder: google.maps.Geocoder;
    map: google.maps.Map;
    marker: google.maps.Marker;

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

    get address(): FormControl {
        return this.businessAddressForm.controls['businessAddress'].get(
            'address'
        ) as FormControl;
    }

    ngOnInit(): void {
        this.getLocation();
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

    getLocation(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;

                const loader = new Loader({
                    apiKey: 'AIzaSyCNagAMyh4X7_h3y3D_i0iVAUu-duLc6RQ',
                    version: 'weekly',
                });

                loader.load().then(() => {
                    this.map = new google.maps.Map(
                        document.getElementById('map') as HTMLElement,
                        {
                            center: { lat: this.latitude, lng: this.longitude },
                            zoom: 17,
                            mapId: '76743e0f9d3b8cfd',
                        }
                    );

                    this.marker = new google.maps.Marker({
                        map: this.map,
                        icon: 'https://maps.google.com/mapfiles/ms/micons/purple-dot.png',
                    });
                    this.marker.setPosition({
                        lat: this.latitude,
                        lng: this.longitude,
                    });
                    this.marker.setMap(this.map);
                    this.geocoder = new google.maps.Geocoder();
                    this.map.addListener(
                        'click',
                        (e: google.maps.MapMouseEvent) => {
                            this.geocode({ location: e.latLng });
                        }
                    );
                });
            });
        }
    }

    geocode(request: google.maps.GeocoderRequest): void {
        this.clear();

        this.geocoder
            .geocode(request)
            .then((result) => {
                const { results } = result;
                const address: string = `${results[0].address_components[1].long_name} ${results[0].address_components[0].long_name}, ${results[0].address_components[3].long_name}`;
                console.log(result);
                this.map.setCenter(results[0].geometry.location);
                this.marker.setPosition(results[0].geometry.location);
                this.marker.setMap(this.map);
                this.address.setValue(address);
                return results;
            })
            .catch((e) => {
                alert(
                    'Geocode was not successful for the following reason: ' + e
                );
            });
    }

    clear(): void {
        this.marker.setMap(null);
    }
}
