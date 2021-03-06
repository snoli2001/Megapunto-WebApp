/* eslint-disable arrow-parens */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Loader } from '@googlemaps/js-api-loader';
import {
    BusinessAddressService,
    City,
    District,
    Region,
} from 'app/modules/auth/sign-up/business-address/business-address.service';
import {
    LineOfBusiness,
    PersonalInformationService,
} from 'app/modules/auth/sign-up/personal-information/personal-information.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-edit-business-data',
    templateUrl: './edit-business-data.component.html',
    styleUrls: ['./edit-business-data.component.scss'],
})
export class EditBusinessDataComponent implements OnInit {
    editBusinessDataForm: FormGroup;
    regions: Region[];
    cities: City[];
    districts: District[];
    lineOfBusinesses: LineOfBusiness[];
    latitude: number;
    longitude: number;
    geocoder: google.maps.Geocoder;
    map: google.maps.Map;
    marker: google.maps.Marker;

    constructor(
        public dialogRef: MatDialogRef<EditBusinessDataComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private _businessAddressService: BusinessAddressService,
        private _personalInformationService: PersonalInformationService
    ) {}

    get region(): FormControl {
        return this.editBusinessDataForm.get(
            'nu_id_departamento'
        ) as FormControl;
    }

    get city(): FormControl {
        return this.editBusinessDataForm.get('nu_id_provincia') as FormControl;
    }

    get district(): FormControl {
        return this.editBusinessDataForm.get('nu_id_distrito') as FormControl;
    }

    get address(): FormControl {
        return this.editBusinessDataForm.get('vc_direccion') as FormControl;
    }

    ngOnInit(): void {
        this.getLocation();
        this.editBusinessDataForm = this.fb.group({
            vc_direccion: [this.data.vc_direccion, Validators.required],
            vc_centro_poblado: [
                this.data.vc_centro_poblado,
                Validators.required,
            ],
            nu_id_departamento: ['', Validators.required],
            vc_desc_departamento: [
                this.data.vc_desc_departamento,
                Validators.required,
            ],
            nu_id_provincia: ['', Validators.required],
            vc_desc_provincia: [
                this.data.vc_desc_provincia,
                Validators.required,
            ],
            nu_id_distrito: ['', Validators.required],
            vc_desc_distrito: [this.data.vc_desc_distrito, Validators.required],
            nu_id_grupo_giro_negocio: ['', Validators.required],
            vc_desc_grupo_giro_negocio: [
                this.data.vc_desc_grupo_giro_negocio,
                Validators.required,
            ],
            ch_tipo_documento: [
                this.data.ch_tipo_documento,
                Validators.required,
            ],
        });

        this.getRegions();
        this.getCityByRegion();
        this.getDistrictByCity();
        this.getLineOfBusinessSelection();
    }

    onClose(): void {
        this.dialogRef.close();
    }

    onConfirm(): void {
        this.dialogRef.close(this.editBusinessDataForm.value);
    }

    getRegions(): void {
        this._businessAddressService.getRegions().subscribe({
            next: (resp) => {
                this.regions = resp;
                const regionName = this.editBusinessDataForm.get(
                    'vc_desc_departamento'
                ).value;
                const region = this.regions.filter(
                    (r) => r.vc_desc_departamento === regionName
                )[0];
                this.editBusinessDataForm
                    .get('nu_id_departamento')
                    .setValue(region.nu_id_departamento);
            },
        });
    }

    getCities(nu_id_departamento: string): void {
        this._businessAddressService.getCities(nu_id_departamento).subscribe({
            next: (resp) => {
                this.cities = resp;
                if (this.editBusinessDataForm.get('vc_desc_provincia').value) {
                    const cityName =
                        this.editBusinessDataForm.get(
                            'vc_desc_provincia'
                        ).value;
                    const city = this.cities.filter(
                        (r) => r.vc_desc_provincia === cityName
                    )[0];
                    this.editBusinessDataForm
                        .get('nu_id_provincia')
                        .setValue(city.nu_id_provincia);
                }
            },
        });
    }

    getCityByRegion(): void {
        this.region.valueChanges.subscribe((region) => {
            const regionName = this.regions.filter(
                (r) => r.nu_id_departamento === region
            )[0];
            this.editBusinessDataForm
                .get('vc_desc_departamento')
                .setValue(regionName);
            this.city.setValue(null);
            this.district.setValue(null);
            this.editBusinessDataForm.get('nu_id_distrito').disable();
            this.getCities(region);
        });
    }

    getDistrictByCity(): void {
        this.city.valueChanges.subscribe((city) => {
            const cityName = this.cities.filter(
                (r) => r.nu_id_provincia === city
            )[0];
            this.editBusinessDataForm
                .get('vc_desc_provincia')
                .setValue(cityName);
            this.editBusinessDataForm.get('nu_id_distrito').enable();
            this.district.setValue(null);
            this.getDistrict(this.region.value, city);
        });
    }

    getDistrict(nu_id_departamento: string, nu_id_provincia: string): void {
        this._businessAddressService
            .getDistricts(nu_id_departamento, nu_id_provincia)
            .subscribe({
                next: (resp) => {
                    this.districts = resp;
                    if (
                        this.editBusinessDataForm.get('vc_desc_distrito').value
                    ) {
                        const districtName =
                            this.editBusinessDataForm.get(
                                'vc_desc_distrito'
                            ).value;
                        const district = this.districts.filter(
                            (r) => r.vc_desc_distrito === districtName
                        )[0];
                        this.editBusinessDataForm
                            .get('nu_id_distrito')
                            .setValue(district.nu_id_distrito);
                    }
                },
            });
    }

    getLineOfBusinessSelection(): void {
        this._personalInformationService
            .getLineOfBusinessSelection()
            .subscribe({
                next: (resp) => {
                    this.lineOfBusinesses = resp;
                    const lineName = this.editBusinessDataForm.get(
                        'vc_desc_grupo_giro_negocio'
                    ).value;
                    const line = this.lineOfBusinesses.filter(
                        r => r.vc_desc_grupo_giro_negocio === lineName
                    )[0];
                    this.editBusinessDataForm
                        .get('nu_id_grupo_giro_negocio')
                        .setValue(line.nu_id_grupo_giro_negocio);
                },
            });
    }

    getLocation(): void {
        if (navigator.geolocation) {
            this.latitude = Number(this.data.nu_latitud);
            this.longitude = Number(this.data.nu_longitud);

            const loader = new Loader({
                apiKey: environment.GOOGLE_SECRET_KEY,
                version: 'weekly',
            });

            loader.load().then(() => {
                this.map = new google.maps.Map(
                    document.getElementById('map2') as HTMLElement,
                    {
                        center: { lat: this.latitude, lng: this.longitude },
                        zoom: 17,
                        mapId: '2e53097f93a29ca7',
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
        }
    }

    geocode(request: google.maps.GeocoderRequest): void {
        this.clear();

        this.geocoder
            .geocode(request)
            .then((result) => {
                const { results } = result;
                const address: string = `${results[0].address_components[1].long_name} ${results[0].address_components[0].long_name}, ${results[0].address_components[3].long_name}`;
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
}
