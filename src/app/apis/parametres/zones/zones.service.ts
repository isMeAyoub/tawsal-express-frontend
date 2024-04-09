import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../../environments/environment.dev" ;
import {Zone} from "../../../types/parametres/zone";

@Injectable({
    providedIn: 'root'
})
export class ZonesService {

    private baseUrl = environment.apiUrl + 'api/v1/parametre/zones';

    constructor(
        private http: HttpClient
    ) {}


    /**
     * Get all zones
     * @return Zone[]
     * @param page number
     * @param size number
     * @param search string
     */
    getZones(page: number, size: number , search: string = ''): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}?page=${page}&size=${size}&search=${search}`);
    }

    /**
     * Create a new zone
     * @param zone Zone
     */
    createZone(zone: Zone): Observable<any> {
        return this.http.post<any>(this.baseUrl, zone);
    }

    /**
     * Delete a zone
     * @param id number
     */
    deleteZone(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    /**
     * Update a zone
     * @param zone Zone
     * @param id number
     */
    updateZone(zone: Zone, id: number): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/${id}`, zone);
    }

    /**
     * Activate or deactivate a zone
     * @param id number
     */
    changeStatusOfZone(id: number): Observable<any> {
        return this.http.patch(`${this.baseUrl}/${id}`, {});
    }
}
