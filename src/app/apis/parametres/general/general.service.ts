import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {General} from "../../../types/parametres/general";
import {environment} from "../../../../environments/environment.dev" ;

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    private baseUrl = environment.baseUrl + 'api/v1/parametre/general';

    constructor(private http: HttpClient) {
    }

    /**
     * Get general data from the API
     * @return General
     */
    getGeneral(): Observable<General> {
        return this.http.get<General>(`${this.baseUrl}`);
    }

    /**
     * Update general data
     * @param generalData General
     */
    updateGeneral(generalData: General): Observable<General> {
        return this.http.put<General>(`${this.baseUrl}`, generalData);
    }

    /**
     * Upload logo
     * @param file File
     */

}
