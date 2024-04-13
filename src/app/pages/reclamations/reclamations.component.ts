import {Component, OnInit} from '@angular/core';
import {Reclamation} from "../../types/reclamations/reclamation";
import {ReclamationsService} from "../../apis/reclamations/reclamations.service";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ToastService} from "../../shared/toast/toast-service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-reclamations',
    templateUrl: './reclamations.component.html',
    styleUrls: ['./reclamations.component.scss']
})
export class ReclamationsComponent implements OnInit {

    breadCrumbItems!: Array<{}>;
    reclamationsData: Reclamation[] = [];
    reclamationForm!: FormGroup;
    submitted: boolean = false;
    currentPage: number = 1;
    totalPages: number = 0;
    itemsPerPage: number = 10;
    totalItems: number = 0;
    searchTerm: string = '';

    constructor(
        private reclamationsService: ReclamationsService,
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private modalService: NgbModal
    ) {
    }

    ngOnInit(): void {
        this.breadCrumbItems = [
            {label: 'Reclamations', active: true}
        ];


    }

    /**
     * Get all reclamations from the API for admin role
     * @param page
     * @param size
     */
    getReclamations(page: number = 1, size: number = 10): void {
        this.reclamationsService.getReclamations(page, size).subscribe((response: any) => {
            this.reclamationsData = response.data;
            this.totalItems = response.totalItems;
            this.totalPages = response.totalPages;
        });
    }

    /**
     * Confirm delete reclamation action
     * @param reclamationId
     */
    confirmDeleteReclamation(reclamationId: number): void {
        Swal.fire({
            title: 'Supprimer la réclamation',
            text: 'Êtes-vous sûr de vouloir supprimer cette réclamation ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Non, garder-la',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Supprimé!', 'La réclamation a été supprimée.', 'success');
                this.deleteReclamation(reclamationId);
            }
        });
    }

    /**
     * Delete a reclamation
     * @param reclamationId
     */
    deleteReclamation(reclamationId: number): void {
        this.reclamationsService.deleteReclamation(reclamationId).subscribe(() => {
            this.getReclamations();
        });
    }

    /**
     * Mark reclamation as read by admin
     * @param reclamationId
     */
    markAsRead(reclamationId: number): void {
        this.reclamationsService.markAsRead(reclamationId).subscribe(() => {
            this.getReclamations();
        });
    }

    /**
     * Mark reclamation as treated by admin
     * @param reclamationId
     */
    markAsTreated(reclamationId: number): void {
        this.reclamationsService.markAsTreated(reclamationId).subscribe(() => {
            this.getReclamations();
        });
    }

}
