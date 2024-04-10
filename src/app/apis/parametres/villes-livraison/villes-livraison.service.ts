import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../../environments/environment.dev" ;
import {VilleLivraison} from "../../../types/parametres/villeLivraison";

@Injectable({
    providedIn: 'root'
})
export class VillesLivraisonService {

    private baseUrl = environment.apiUrl + 'api/v1/parametre/ville-livraisons';

    constructor(
        private http: HttpClient
    ) {
    }

    /**
     * Get all villes livraison
     * @return VilleLivraison[]
     * @param page number
     * @param size number
     * @param search string
     */
    getVillesLivraison(page: number, size: number, search: string = ''): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}?page=${page}&size=${size}&search=${search}`);
    }

    /**
     * Create a new ville livraison
     * @param villeLivraison VilleLivraison
     */
    createVilleLivraison(villeLivraison: VilleLivraison): Observable<VilleLivraison> {
        return this.http.post<VilleLivraison>(this.baseUrl, villeLivraison);
    }

    /**
     * Delete a ville livraison
     * @param id number
     */
    deleteVilleLivraison(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    /**
     * Update a ville livraison
     * @param villeLivraison VilleLivraison
     * @param id number
     */
    updateVilleLivraison(villeLivraison: VilleLivraison, id: number): Observable<VilleLivraison> {
        return this.http.put<VilleLivraison>(`${this.baseUrl}/${id}`, villeLivraison);
    }

    /**
     * Activate or deactivate a ville livraison
     * @param id number
     */
    changeStatusOfVilleLivraison(id: number): Observable<any> {
        return this.http.patch(`${this.baseUrl}/${id}`, {});
    }
}
