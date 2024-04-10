import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment.dev";
import {Reclamation} from "../../types/reclamations/reclamation";

@Injectable({
    providedIn: 'root'
})
export class ReclamationsService {

    private baseUrl = environment.apiUrl + 'api/v1/demandes/reclamation';

    constructor(
        private http: HttpClient
    ) {
    }

    /**
     * Get all reclamations
     * @return Reclamation[]
     * @param page number
     * @param size number
     * TODO: Add search params with client
     */
    getReclamations(page: number, size: number): Observable<any> {
        return this.http.get<any>(
            `${this.baseUrl}?page=${page}&size=${size}`);
    }

    /**
     * Create a new reclamation
     * @param reclamation Reclamation
     */
    createReclamation(reclamation: Reclamation): Observable<Reclamation> {
        return this.http.post<Reclamation>(this.baseUrl, reclamation);
    }

    /**
     * Delete a reclamation
     * @param id number
     */
    deleteReclamation(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    /**
     * Mark a reclamation as read
     * @param id number
     */
    markAsRead(id: number): Observable<any> {
        return this.http.patch(`${this.baseUrl}/${id}/read`, {});
    }

    /**
     * Mark a reclamation as treated
     * @param id number
     */
    markAsTreated(id: number): Observable<any> {
        return this.http.patch(`${this.baseUrl}/${id}/treated`, {});
    }
}
