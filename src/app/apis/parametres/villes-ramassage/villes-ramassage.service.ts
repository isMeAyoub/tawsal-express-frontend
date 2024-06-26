import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../../environments/environment.dev" ;
import {VilleRamassage} from "../../../types/parametres/villeRamassage";


@Injectable({
    providedIn: 'root'
})
export class VillesRamassageService {

    private baseUrl = environment.apiUrl + 'api/v1/parametre/ville-ramassages';

    constructor(
        private http: HttpClient
    ) {}

    /**
     * Get all villes ramassage
     * @return VilleRamassage[]
     * @param page number
     * @param size number
     * @param search string
     */
    getVillesRamassage(page: number, size: number , search: string = ''): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}?page=${page}&size=${size}&search=${search}`);
    }

    /**
     * Create a new ville ramassage
     * @param villeRamassage VilleRamassage
     */
    createVilleRamassage(villeRamassage: VilleRamassage): Observable<VilleRamassage> {
        return this.http.post<VilleRamassage>(this.baseUrl, villeRamassage);
    }

    /**
     * Delete a ville ramassage
     * @param id number
     */
    deleteVilleRamassage(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    /**
     * Update a ville ramassage
     * @param villeRamassage VilleRamassage
     * @param id number
     */
    updateVilleRamassage(villeRamassage: VilleRamassage, id: number): Observable<VilleRamassage> {
        return this.http.put<VilleRamassage>(`${this.baseUrl}/${id}`, villeRamassage);
    }

    /**
     * Activate or deactivate a ville ramassage
     * @param id number
     */
    changeStatusOfVilleRamassage(id: number): Observable<any> {
        return this.http.patch(`${this.baseUrl}/${id}/status`, {});
    }

}
