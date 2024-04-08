import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {GeneralService} from "../../../apis/parametres/general/general.service";
import {General} from "../../../types/parametres/general";

@Component({
    selector: 'app-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
    breadCrumbItems!: Array<{}>;
    generalForm!: FormGroup;
    generalData!: General;

    constructor(private generalService: GeneralService, private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.breadCrumbItems = [
            {label: 'Paramètres'},
            {label: 'Général', active: true}
        ];

        this.generalForm = this.formBuilder.group({
            nomEntreprise: ['', Validators.required],
            webSite: ['', Validators.required],
            adresseEntreprise: ['', Validators.required],
            telephoneEntreprise: ['', Validators.required],
            emailEntreprise: ['', Validators.required],
            monnaieApplication: ['', Validators.required]
        });

        this.generalService.getGeneral().subscribe(
            (data) => {
                // ... handle successful data
                this.generalData = data;
                this.generalForm.patchValue({
                    nomEntreprise: this.generalData.nomEntreprise,
                    webSite: this.generalData.webSite,
                    adresseEntreprise: this.generalData.adresseEntreprise,
                    telephoneEntreprise: this.generalData.telephoneEntreprise,
                    emailEntreprise: this.generalData.emailEntreprise,
                    monnaieApplication: this.generalData.monnaieApplication
                });
                console.log('General data:', this.generalData);
            },
            (error) => {
                console.error('Error fetching general data:', error);
                // ... handle the error (e.g., display an error message)
            }
        );
    }
}