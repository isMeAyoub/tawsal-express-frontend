import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {GeneralService} from "../../../apis/parametres/general/general.service";
import {General} from "../../../types/parametres/general";
import {ToastService} from "../../../shared/toast/toast-service";

@Component({
    selector: 'app-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {


    breadCrumbItems!: Array<{}>;
    generalForm!: FormGroup;
    generalData!: General;
    selectedLogo: any = null;
    selectedFavicon: any = null;

    constructor(private generalService: GeneralService, private formBuilder: FormBuilder,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.breadCrumbItems = [
            {label: 'Paramètres'},
            {label: 'Général', active: true}
        ];

        /**
         * Form Validation for General
         */
        this.generalForm = this.formBuilder.group({
            nomEntreprise: ['', Validators.required],
            webSite: ['', Validators.required],
            adresseEntreprise: ['', Validators.required],
            telephoneEntreprise: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
            emailEntreprise: ['', [Validators.required, Validators.email]],
            monnaieApplication: ['', Validators.required]
        });

        /**
         * Get General Data from API
         */
        this.generalService.getGeneral().subscribe(data => {
            this.generalData = data;
            this.generalForm.patchValue(this.generalData);
        });
    }

    /**
     * Update General Data
     * @param event
     */
    updateGeneralData() {
        if (this.generalForm.valid) {

            this.generalService.updateGeneral(this.generalForm.value)
                .subscribe(
                    data => {
                        this.generalData = data;
                        this.generalForm.patchValue(this.generalData);
                        // call the success message
                        this.showSuccess();
                    },
                    error => {
                        // call the error message
                        this.showError();
                    }
                );
        }
    }

    /**
     * Upload Logo and Favicon
     * @param event
     */
    onLogoChange(event: any) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            // Convert the file to a base64 URL
            const reader = new FileReader();
            reader.onload = e => this.selectedLogo = reader.result;
            reader.readAsDataURL(file);

            // Upload the file
            this.generalService.uploadLogo(file)
                .subscribe(
                    data => {
                        // call the success message
                        this.showSuccess();
                    },
                    error => {
                        // call the error message
                        this.showError();
                    }
                );
        }
    }

    /**
     * Upload Favicon
     * @param event
     */
    onFaviconChange(event: any) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            // Convert the file to a base64 URL
            const reader = new FileReader();
            reader.onload = e => this.selectedFavicon = reader.result;
            reader.readAsDataURL(file);

            // Upload the file
            this.generalService.uploadFavicon(file)
                .subscribe(
                    data => {
                        // call the success message
                        this.showSuccess();
                    },
                    error => {
                        // call the error message
                        this.showError();
                    }
                );
        }
    }

    /**
     * Success message Used when any operation is done successfully
     */
    showSuccess() {
        this.toastService.show('La Mis à jour a été effectuée avec succès !',
            {classname: 'bg-success text-center text-light', delay: 3000});
    }

    /**
     * Error message Used when any operation is failed
     */
    showError() {
        this.toastService.show('Erreur lors de la mise à jour !',
            {classname: 'bg-danger text-center text-light', delay: 3000});
    }

}