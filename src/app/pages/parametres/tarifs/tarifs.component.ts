import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ToastService} from "../../../shared/toast/toast-service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Tarif} from "../../../types/parametres/tarif";
import {VilleLivraison} from "../../../types/parametres/villeLivraison";
import {VilleRamassage} from "../../../types/parametres/villeRamassage";
import {TarifsService} from "../../../apis/parametres/tarifs/tarifs.service";
import {VillesLivraisonService} from "../../../apis/parametres/villes-livraison/villes-livraison.service";
import {VillesRamassageService} from "../../../apis/parametres/villes-ramassage/villes-ramassage.service";
import {GeneralService} from "../../../apis/parametres/general/general.service";
import {General} from "../../../types/parametres/general";
import Swal from 'sweetalert2';


@Component({
    selector: 'app-tarifs',
    templateUrl: './tarifs.component.html',
    styleUrls: ['./tarifs.component.scss']
})
export class TarifsComponent implements OnInit {
    breadCrumbItems!: Array<{}>;
    tarifsData: Tarif[] = [];
    villesLivraisonData: VilleLivraison[] = [];
    villesRamassageData: VilleRamassage[] = [];
    generalData!: General;
    tarifsForm!: FormGroup;
    submitted: boolean = false;
    currentPage: number = 1;
    totalPages: number = 0;
    itemsPerPage: number = 10;
    totalItems: number = 0;
    searchTerm: string = '';
    searchVilleRamassage: string = '';
    searchVilleLivraison: string = '';

    @ViewChild('content') content: any;

    constructor(
        private tarifsService: TarifsService,
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private villesLivraisonService: VillesLivraisonService,
        private villesRamassageService: VillesRamassageService,
        private generalService: GeneralService,
        private modalService: NgbModal
    ) {
    }

    ngOnInit(): void {
        this.breadCrumbItems = [
            {label: 'Paramètres'},
            {label: 'Tarifs', active: true}
        ];

        this.initializeForm();
        this.getTarifs();
        this.getVillesLivraison();
        this.getVillesRamassage();
        this.getGeneral();
    }

    /**
     * Initialize form with validators
     */
    initializeForm() {
        this.tarifsForm = this.formBuilder.group({
            tarifId: [''],
            prixLivraison: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
            prixRetour: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
            prixRefuse: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
            delaiLivraison: ['', Validators.required],
            villeLivraison: this.formBuilder.group({
                villeId: ['', Validators.required]
            }),
            villeRamassage: this.formBuilder.group({
                villeId: ['', Validators.required]
            })
        });
    }

    /**
     * Get all tarifs from API
     */
    getTarifs(searchTerm?: string, searchVilleRamassage?: string, searchVilleLivraison?: string) {
        const backendPage = this.currentPage - 1;
        this.tarifsService.getTarifs(backendPage, this.itemsPerPage, searchTerm, searchVilleRamassage, searchVilleLivraison).subscribe(data => {
            this.tarifsData = data.content;
            this.totalItems = data.totalElements;
            this.totalPages = data.totalPages;
        });
    }

    /**
     * Get all villes de livraison from API
     * Notice size is set to 1000 to get all villes
     */
    getVillesLivraison() {
        this.villesLivraisonService.getVillesLivraison(0, 1000).subscribe(data => {
            this.villesLivraisonData = data.content;
        });
    }

    /**
     * Get all villes de ramassage from API
     * Notice size is set to 1000 to get all villes
     */
    getVillesRamassage() {
        this.villesRamassageService.getVillesRamassage(0, 1000).subscribe(data => {
            this.villesRamassageData = data.content;
        });
    }

    /**
     * Get general data from API
     * Notice This is for the monnaieApplication
     */
    getGeneral() {
        this.generalService.getGeneral().subscribe(data => {
            this.generalData = data;
        });
    }

    /**
     * Search tarif
     * @param searchTerm
     * @param searchVilleRamassage
     * @param searchVilleLivraison
     */
    searchTarif(searchTerm: string, searchVilleRamassage: string, searchVilleLivraison: string) {
        this.searchTerm = searchTerm;
        this.searchVilleRamassage = searchVilleRamassage;
        this.searchVilleLivraison = searchVilleLivraison;
        this.getTarifs(this.searchTerm, this.searchVilleRamassage, this.searchVilleLivraison);
    }

    /**
     * Open modal to add or update tarif
     * @param tarif
     */
    openModal(tarif?: Tarif) {
        this.resetForm();
        if (tarif) {
            this.tarifsForm.patchValue({
                ...tarif,
                tarifId: tarif.tarifId
            });
        }
        this.modalService.open(this.content, {size: 'lg', centered: true});
    }

    /**
     * Reset form values
     */
    resetForm() {
        this.tarifsForm.reset();
        this.submitted = false;
    }

    /**
     * Save or update tarif
     */
    saveTarif() {
        this.submitted = true;
        if (this.tarifsForm.invalid) {
            return;
        }
        const formValue = this.tarifsForm.value;
        if (formValue.tarifId) {
            // Update existing tarif
            this.updateTarif(formValue, formValue.tarifId);
        } else {
            // Create new tarif
            this.createTarif(formValue);
        }
    }

    /**
     * Create a tarif
     * @param tarif
     */
    createTarif(tarif: Tarif) {
        this.tarifsService.createTarif(tarif).subscribe(() => {
            this.getTarifs();
            this.modalService.dismissAll();
            this.ShowSuccessAdd();
        });
    }

    /**
     * Update a tarif
     * @param tarif
     * @param id
     */
    updateTarif(tarif: Tarif, id: number) {
        this.tarifsService.updateTarif(tarif, id).subscribe(() => {
            this.getTarifs();
            this.modalService.dismissAll();
            this.ShowSuccessUpdate();
        });
    }

    /**
     * Confirm delete tarif operation
     * @param id
     */
    confirmDelete(id: number) {
        Swal.fire({
            title: 'Supprimer le tarif',
            text: 'Êtes-vous sûr de vouloir supprimer ce tarif?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            cancelButtonColor: '#00796B',
            confirmButtonText: 'Oui, supprimez-le!',
            cancelButtonText: 'Non, gardez-le'
        }).then((result) => {
            if (result.value) {
                Swal.fire('Supprimé!', 'Le tarif a été supprimé.', 'success');
                this.deleteTarif(id);
            }
        });
    }

    /**
     * Delete a tarif
     * @param id
     */
    deleteTarif(id: number) {
        this.tarifsService.deleteTarif(id).subscribe(() => {
            this.getTarifs();
        });
    }

    /**
     * Show success message when add is successful
     */
    ShowSuccessAdd() {
        this.toastService.show('Tarif ajouté avec succès',
            {classname: 'bg-success text-center text-light', delay: 5000});
    }

    /**
     * Show success message when update is successful
     */
    ShowSuccessUpdate() {
        this.toastService.show('Tarif modifié avec succès',
            {classname: 'bg-success text-center text-light', delay: 5000});
    }
}
