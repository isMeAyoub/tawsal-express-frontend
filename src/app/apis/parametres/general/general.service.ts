import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {General} from "../../../types/parametres/general";
import {environment} from "../../../../environments/environment.dev" ;

@Injectable({
    providedIn: 'root'
})
export class GeneralService {
    //
    private baseUrl = environment.baseUrl + 'api/v1/parametre/general';

    constructor(private http: HttpClient) {
    }

    getGeneral(): Observable<General> {
        return this.http.get<General>(`${this.baseUrl}`);
    }
}
