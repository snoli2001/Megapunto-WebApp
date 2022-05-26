/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { UserInterface } from 'app/core/auth/User.interface';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class IncommService {
    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

}
