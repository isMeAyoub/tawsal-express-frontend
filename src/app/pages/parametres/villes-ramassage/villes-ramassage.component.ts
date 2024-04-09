import {Component, OnInit, ViewChild} from '@angular/core';
import {VilleRamassage} from "../../../types/parametres/villeRamassage";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ToastService} from "../../../shared/toast/toast-service";
import {VillesRamassageService} from "../../../apis/parametres/villes-ramassage/villes-ramassage.service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-villes-ramassage',
    templateUrl: './villes-ramassage.component.html',
    styleUrls: ['./villes-ramassage.component.scss']
})
export class VillesRamassageComponent implements OnInit {
    breadCrumbItems!: Array<{}>;
    villesRamassageData: VilleRamassage[] = [];
    villesRamassageForm!: FormGroup;
    submitted: boolean = false;
    currentPage: number = 1;
    totalPages: number = 0;
    itemsPerPage: number = 10;
    totalItems: number = 0;
    searchTerm: string = '';


    @ViewChild('content') content: any;

    constructor(
        private villesRamassageService: VillesRamassageService,
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private modalService: NgbModal
    ) {
    }

    ngOnInit(): void {
        this.breadCrumbItems = [
            {label: 'Paramètres'},
            {label: 'Villes de ramassage', active: true}
        ];

        this.initializeForm();
        this.getVillesRamassage();
    }

    /**
     * Initialize form
     */
    initializeForm() {
        this.villesRamassageForm = this.formBuilder.group({
            id: [''],
            nomVille: ['', Validators.required],
            reference: ['', Validators.required]
        });
    }

    /**
     * Get all villes de ramassage from API
     */
    getVillesRamassage(searchTerm?: string) {
        // Adjust the currentPage to be 0-based for the backend request
        const backendPage = this.currentPage - 1;
        this.villesRamassageService.getVillesRamassage(backendPage, this.itemsPerPage, searchTerm).subscribe(data => {
            this.villesRamassageData = data.content;
            this.totalItems = data.totalElements;
            this.totalPages = data.totalPages;
        });
    }

    /**
     * Search ville de ramassage
     * @param searchTerm
     */
    searchVilleRamassage(searchTerm: string) {
        this.searchTerm = searchTerm;
        this.getVillesRamassage(this.searchTerm);
    }

    /**
     * Open modal to add or update ville de ramassage
     */
    openModal(villeRamassage?: VilleRamassage) {
        this.resetForm();
        if (villeRamassage) {
            this.villesRamassageForm.patchValue({
                ...villeRamassage,
                id: villeRamassage.villeId
            });
        }
        this.modalService.open(this.content, {size: 'md', centered: true});
    }

    /**
     * Reset form values
     */
    resetForm() {
        this.villesRamassageForm.reset();
        this.submitted = false;
    }

    /**
     * Form data To Save or Update
     */
    saveVilleRamassage() {
        this.submitted = true;
        if (this.villesRamassageForm.invalid) {
            return;
        }

        const formValue = this.villesRamassageForm.value;
        if (formValue.id) {
            // Update existing ville de ramassage
            this.updateVilleRamassage(formValue, formValue.id);
        } else {
            // Create new ville de ramassage
            this.createVilleRamassage(formValue);
        }
    }

    /**
     * Create a ville de ramassage
     * @param villeRamassage
     */
    createVilleRamassage(villeRamassage: VilleRamassage) {
        this.villesRamassageService.createVilleRamassage(villeRamassage).subscribe(() => {
            this.ShowSuccessAdd();
            this.modalService.dismissAll();
            this.getVillesRamassage();
        });
    }

    /**
     * Update a ville de ramassage
     * @param villeRamassage
     * @param id
     */
    updateVilleRamassage(villeRamassage: VilleRamassage, id: number) {
        this.villesRamassageService.updateVilleRamassage(villeRamassage, id).subscribe(() => {
            this.ShowSuccessUpdate();
            this.modalService.dismissAll();
            this.getVillesRamassage();
        });
    }

    /**
     * Confirm delete operation
     * @param id
     */
    confirm(id: number) {
        Swal.fire({
            title: 'Supprimer Ville de Ramassage',
            text: 'Voulez-vous vraiment supprimer cette ville de ramassage?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f46a6a',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler'
        }).then(result => {
            if (result.value) {
                Swal.fire('Supprimé!', 'La ville de ramassage a été supprimée.', 'success');
                this.deleteVilleRamassage(id);
            }
        });
    }

    /**
     * Delete a ville de ramassage
     * @param id
     */
    deleteVilleRamassage(id: number) {
        this.villesRamassageService.deleteVilleRamassage(id).subscribe(() => {
            this.getVillesRamassage();
        });
    }

    /**
     * Change status of ville de ramassage
     * @param villeId
     */
    changeStatus(villeId: number) {
        this.villesRamassageService.changeStatusOfVilleRamassage(villeId).subscribe(() => {
            this.getVillesRamassage();
        });
    }

    /**
     * Show success message when add is successful
     */
    ShowSuccessAdd() {
        this.toastService.show('Ville de ramassage créée avec succès',
            {classname: 'bg-success text-center text-light', delay: 3000});
    }

    /**
     * Show success message when update is successful
     */
    ShowSuccessUpdate() {
        this.toastService.show('La Mis à jour a été effectuée avec succès !',
            {classname: 'bg-success text-center text-light', delay: 3000});
    }
}
