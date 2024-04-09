import {Component, OnInit, ViewChild} from '@angular/core';
import {Zone} from "../../../types/parametres/zone";
import {ZonesService} from "../../../apis/parametres/zones/zones.service";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ToastService} from "../../../shared/toast/toast-service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-zones',
    templateUrl: './zones.component.html',
    styleUrls: ['./zones.component.scss']
})
export class ZonesComponent implements OnInit {
    breadCrumbItems!: Array<{}>;
    zonesData: Zone[] = [];
    zonesForm!: FormGroup;
    submitted: boolean = false;
    currentPage: number = 1;
    totalPages: number = 0;
    itemsPerPage: number = 10;
    totalItems: number = 0;
    searchTerm: string = '';

    @ViewChild('content') content: any;

    constructor(
        private zonesService: ZonesService,
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private modalService: NgbModal
    ) {
    }

    ngOnInit(): void {
        this.breadCrumbItems = [
            {label: 'Paramètres'},
            {label: 'Régions', active: true}
        ];

        this.initializeForm();
        this.getZones();
    }

    /**
     * Initialize form
     */
    initializeForm() {
        this.zonesForm = this.formBuilder.group({
            id: [''],
            nomZone: ['', Validators.required],
        });

    }

    /**
     * Get all zones from API
     */
    getZones(searchTerm?: string) {
        const backendPage = this.currentPage - 1;
        this.zonesService.getZones(backendPage, this.itemsPerPage, searchTerm).subscribe(response => {
            this.zonesData = response.content;
            this.totalItems = response.totalElements;
            this.totalPages = response.totalPages;
        });
    }

    /**
     * Search zone
     * @param searchTerm
     */
    searchZone(searchTerm: string) {
        this.searchTerm = searchTerm;
        this.getZones(this.searchTerm);
    }

    /**
     * Open modal to add or update zone
     */
    openModal(zone?: Zone) {
        this.resetForm();
        if (zone) {
            this.zonesForm.patchValue({
                ...zone,
                id: zone.zoneId
            });
        }
        this.modalService.open(this.content, {size: 'md', centered: true});
    }

    /**
     * Reset form Values
     */
    resetForm() {
        this.zonesForm.reset();
        this.submitted = false;
    }

    /**
     * Submit form To Add or Update Zone
     */
    submitForm() {
        this.submitted = true;
        if (this.zonesForm.invalid) {
            return;
        }
        const zone = this.zonesForm.value;
        if (zone.id) {
            // Update existing zone
            this.updateZone(zone, zone.id);
        } else {
            // Add new zone
            this.addZone(zone);
        }
    }

    /**
     * Update a zone by id
     * @param zone
     * @param id
     */
    private updateZone(zone: Zone, id: number) {
        this.zonesService.updateZone(zone, id).subscribe(response => {
            this.ShowSecussUpdate();
            this.modalService.dismissAll();
            this.getZones();
        });
    }

    /**
     * Add a new zone
     * @param zone
     */
    private addZone(zone: Zone) {
        this.zonesService.createZone(zone).subscribe(response => {
            this.ShowSuccessAdd();
            this.modalService.dismissAll();
            this.getZones();
        });
    }

    /**
     * Confirm delete zone
     * @param id
     */
    confirmDeleteZone(id: number) {
        Swal.fire({
            title: 'Supprimer La Région',
            text: 'Êtes-vous sûr de vouloir supprimer cette région?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Non, annuler'
        }).then((result) => {
            if (result.value) {
                Swal.fire('Supprimé!', 'La région a été supprimée.', 'success');
                this.deleteZone(id);
            }
        });
    }

    /**
     * Delete a zone
     * @param id
     */
    deleteZone(id: number) {
        this.zonesService.deleteZone(id).subscribe(response => {
            this.getZones();
        });
    }

    /**
     * Activate or deactivate a zone
     * @param id
     */
    changeStatusOfZone(id: number) {
        this.zonesService.changeStatusOfZone(id).subscribe(response => {
            this.getZones();
        });
    }

    /**
     * Show success message when a zone is updated
     */
    private ShowSecussUpdate() {
        this.toastService.show('Région modifiée avec succès', {classname: 'bg-success text-light', delay: 5000});
    }

    /**
     * Show success message when a zone is added
     */
    private ShowSuccessAdd() {
        this.toastService.show('Région créée avec succès', {classname: 'bg-success text-light', delay: 5000});
    }
}

