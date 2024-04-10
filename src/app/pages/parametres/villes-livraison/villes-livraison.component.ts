import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ToastService} from "../../../shared/toast/toast-service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {VilleLivraison} from "../../../types/parametres/villeLivraison";
import {VillesLivraisonService} from "../../../apis/parametres/villes-livraison/villes-livraison.service";
import {Zone} from "../../../types/parametres/zone";
import {ZonesService} from "../../../apis/parametres/zones/zones.service";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-villes-livraison',
    templateUrl: './villes-livraison.component.html',
    styleUrls: ['./villes-livraison.component.scss']
})
export class VillesLivraisonComponent implements OnInit {
    breadCrumbItems!: Array<{}>;
    villesLivraisonData: VilleLivraison[] = [];
    zonesData: Zone[] = [];
    villesLivraisonForm!: FormGroup;
    submitted: boolean = false;
    currentPage: number = 1;
    totalPages: number = 0;
    itemsPerPage: number = 10;
    totalItems: number = 0;
    searchTerm: string = '';

    @ViewChild('content') content: any;

    constructor(
        private villesLivraisonService: VillesLivraisonService,
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private zoneService: ZonesService,
        private modalService: NgbModal
    ) {
    }

    ngOnInit(): void {
        this.breadCrumbItems = [
            {label: 'Paramètres'},
            {label: 'Villes de livraison', active: true}
        ];

        this.initializeForm();
        this.getVillesLivraison();
        this.getZones();
    }

    /**
     * Initialize form with validators
     */
    initializeForm() {
        this.villesLivraisonForm = this.formBuilder.group({
            id: [''],
            reference: ['', Validators.required],
            nomVille: ['', Validators.required],
            zone: this.formBuilder.group({
                zoneId: ['', Validators.required]
            }),
        });
    }

    /**
     * Get all villes de livraison from API
     */
    getVillesLivraison(searchTerm?: string) {
        const backendPage = this.currentPage - 1;
        this.villesLivraisonService.getVillesLivraison(backendPage, this.itemsPerPage, searchTerm).subscribe(data => {
            this.villesLivraisonData = data.content;
            this.totalItems = data.totalElements;
            this.totalPages = data.totalPages;
        });
    }

    /**
     * Get all zones from API
     */
    getZones() {
        this.zoneService.getZones(
            0,
            1000
        ).subscribe((response: { content: Zone[]; }) => {
            this.zonesData = response.content;
        });
    }

    /**
     * Search villes de livraison
     * @param searchTerm
     */
    searchVillesLivraison(searchTerm: string) {
        this.searchTerm = searchTerm;
        this.getVillesLivraison(this.searchTerm);
    }

    /**
     * Open the modal to create or update a ville de livraison
     * @param villeLivraison
     */
    openModal(villeLivraison ?: VilleLivraison) {
        this.resetForm();
        if (villeLivraison) {
            this.villesLivraisonForm.patchValue(
                {
                    ...villeLivraison,
                    id: villeLivraison.villeId
                }
            );
        }
        this.modalService.open(this.content, {size: 'md', centered: true});
    }

    /**
     * Reset form values
     */
    resetForm() {
        this.villesLivraisonForm.reset();
        this.submitted = false;
    }

    /**
     * Form data to save or update a ville de livraison
     */
    saveVilleLivraison() {
        this.submitted = true;

        if (this.villesLivraisonForm.invalid) {
            return;
        }

        const ville = this.villesLivraisonForm.value;
        if (ville.id) {
            // Update existing ville de livraison
            this.updateVilleLivraison(ville, ville.id);
        } else {
            // Create new ville de livraison
            this.createVilleLivraison(ville);
        }
    }

    /**
     * Create a ville de livraison
     * @param ville
     */
    createVilleLivraison(ville
                             :
                             VilleLivraison
    ) {
        this.villesLivraisonService.createVilleLivraison(ville).subscribe((response) => {
            this.ShowSucessCreate();
            this.modalService.dismissAll();
            this.getVillesLivraison();
        });
    }

    /**
     * Update a ville de livraison
     * @param ville
     * @param id
     */
    updateVilleLivraison(ville: VilleLivraison, id: number) {
        this.villesLivraisonService.updateVilleLivraison(ville, id).subscribe((response) => {
            this.ShowSucessUpdate();
            this.modalService.dismissAll();
            this.getVillesLivraison();
        });
    }

    /**
     * Confirm the deletion of a ville de livraison
     * @param villeId
     */
    confirmDeleteVilleLivraison(villeId: number) {
        Swal.fire({
            title: 'Supprimer Ville de livraison',
            text: 'Êtes-vous sûr de vouloir supprimer cette ville de livraison ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Supprimé!', 'La ville de livraison a été supprimée.', 'success');
                this.deleteVilleLivraison(villeId);
            }
        });
    }

    /**
     * Delete a ville de livraison
     * @param villeId
     */
    deleteVilleLivraison(villeId
                             :
                             number
    ) {
        this.villesLivraisonService.deleteVilleLivraison(villeId).subscribe((response) => {
            this.getVillesLivraison();
        });
    }

    /**
     * Change the status of a ville de livraison
     * @param villeId
     */
    changeStatusOfVilleLivraison(villeId
                                     :
                                     number
    ) {
        this.villesLivraisonService.changeStatusOfVilleLivraison(villeId).subscribe((response) => {
            this.getVillesLivraison();
        });
    }

    /**
     * Show success message when a new ville de livraison is created
     */
    ShowSucessCreate() {
        this.toastService.show('Ville de livraison ajoutée avec succès', {
            classname: 'bg-success text-light',
            delay: 5000
        });
    }

    /**
     * Show success message when a ville de livraison is updated
     */
    ShowSucessUpdate() {
        this.toastService.show('Ville de livraison modifiée avec succès', {
            classname: 'bg-success text-light',
            delay: 5000
        });
    }

}
