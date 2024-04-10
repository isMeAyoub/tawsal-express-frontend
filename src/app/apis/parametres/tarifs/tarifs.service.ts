import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../../environments/environment.dev";
import {Tarif} from "../../../types/parametres/tarif";

@Injectable({
    providedIn: 'root'
})
export class TarifsService {

    private baseUrl = environment.apiUrl + 'api/v1/parametre/tarifs';

    constructor(
        private http: HttpClient
    ) {
    }

    /**
     * Get all tarifs
     * @return Tarif[]
     * @param page number
     * @param size number
     * @param search string
     * @param VilleRamassage string
     * @param VilleLivraison string
     */
    getTarifs(page: number, size: number, search: string = '', VilleRamassage: string = '', VilleLivraison: string = ''):
        Observable<any> {
        return this.http.get<any>(
            `${this.baseUrl}?page=${page}&size=${size}&search=${search}&villeRamassage=${VilleRamassage}&villeLivraison=${VilleLivraison}`);
    }

    /**
     * Create a new tarif
     * @param tarif Tarif
     */
    createTarif(tarif: Tarif): Observable<Tarif> {
        return this.http.post<Tarif>(this.baseUrl, tarif);
    }

    /**
     * Delete a tarif
     * @param id number
     */
    deleteTarif(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    /**
     * Update a tarif
     * @param tarif Tarif
     * @param id number
     */
    updateTarif(tarif: Tarif, id: number): Observable<Tarif> {
        return this.http.put<Tarif>(`${this.baseUrl}/${id}`, tarif);
    }


}
