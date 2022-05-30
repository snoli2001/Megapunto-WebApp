/* eslint-disable arrow-parens */
import { SignUpModel } from './../personal-information/signUpModel.interface';
import { PersonalInformationService } from './../personal-information/personal-information.service';
import { environment } from './../../../../../environments/environment.prod';
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
    signUpForm: FormGroup;
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
        private _businessAddressService: BusinessAddressService,
        private _personalInformationService: PersonalInformationService
    ) {}

    get region(): FormControl {
        return this.signUpForm.controls['businessAddress'].get(
            'region'
        ) as FormControl;
    }

    get city(): FormControl {
        return this.signUpForm.controls['businessAddress'].get(
            'city'
        ) as FormControl;
    }

    get district(): FormControl {
        return this.signUpForm.controls['businessAddress'].get(
            'district'
        ) as FormControl;
    }

    get address(): FormControl {
        return this.signUpForm.controls['businessAddress'].get(
            'address'
        ) as FormControl;
    }

    get agreementsError(): boolean {
        return this.signUpForm.controls['businessAddress'].get(
            'agreements'
        ).invalid && this.signUpForm.controls['businessAddress'].get(
            'agreements'
        ).touched;
    }

    get secondAgreementsError(): boolean {
        return this.signUpForm.controls['businessAddress'].get(
            'secondAgreements'
        ).invalid && this.signUpForm.controls['businessAddress'].get(
            'secondAgreements'
        ).touched;
    }

    ngOnInit(): void {
        this.getLocation();
        this.signUpForm = this.rootFormGroup.control;
        this.getRegions();
        this.getCityByRegion();
        this.getDistrictByCity();
    }

    prevStep(): void {
        this.signUpForm.get('step').setValue(2);
    }

    nextStep(): void {
        if (this.signUpForm.controls['businessAddress'].valid) {
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
                    apiKey: environment.GOOGLE_SECRET_KEY,
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
                console.log(results[0].geometry.location.lat());
                console.log(results[0].geometry.location.lng());
                this.latitude = results[0].geometry.location.lat();
                this.longitude = results[0].geometry.location.lng();
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

    signUp(): void {
        this.signUpForm.markAllAsTouched();
        const personalInformation = this.signUpForm.controls[
            'personalInformation'
        ] as FormControl;
        const businessData = this.signUpForm.controls[
            'businessData'
        ] as FormControl;
        const businessAddress = this.signUpForm.controls[
            'businessAddress'
        ] as FormControl;

        if (this.signUpForm.valid && this.latitude && this.longitude) {
            const newUser: SignUpModel = {
                // Personal Information
                nu_id_tipo_doc_identidad:
                    personalInformation.get('documentType').value,
                vc_nro_doc_identidad:
                    personalInformation.get('documentNumber').value,
                vc_nombre_contacto: personalInformation.get('name').value,
                vc_email: personalInformation.get('email').value,
                vc_celular: personalInformation.get('cellphone').value,
                nu_dia: new Date(personalInformation.get('birthDate').value).getDay().toString(),
                nu_mes: new Date(personalInformation.get('birthDate').value).getMonth().toString(),
                nu_anio: new Date(personalInformation.get('birthDate').value).getFullYear().toString(),
                vc_cadena_imagen_dni_anverso: personalInformation.get('vc_cadena_imagen_dni_anverso').value,
                vc_cadena_imagen_dni_reverso: personalInformation.get('vc_cadena_imagen_dni_reverso').value,
                vc_cadena_imagen_dni_anverso_persona: personalInformation.get('vc_cadena_imagen_dni_anverso_persona').value,

                // Business Data
                vc_ruc_comercio: businessData.get('ruc').value,
                vc_nombre_comercio: businessData.get('tradename').value,
                vc_razon_social_comercio:
                    businessData.get('businessName').value,
                vc_telefono: businessData.get('telephone').value,
                nu_id_grupo_giro_negocio:
                    businessData.get('businessLine').value,
                ch_tipo_documento: businessData.get('billType').value,

                // Business Address
                nu_longitud: this.longitude.toString(),
                nu_latitud: this.latitude.toString(),
                vc_direccion: businessAddress.get('address').value,
                vc_centro_poblado: businessAddress.get('village').value,
                nu_id_departamento: businessAddress.get('region').value,
                nu_id_provincia: businessAddress.get('city').value,
                nu_id_distrito: businessAddress.get('district').value,

            };
            this._personalInformationService
                .signUp(newUser)
                .subscribe((resp) => console.log(resp));
        }
    }
}
