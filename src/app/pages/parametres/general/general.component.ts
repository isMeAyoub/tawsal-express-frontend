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
            emailEntreprise: ['', [Validators.required, Validators.email]],
            monnaieApplication: ['', Validators.required]
        });

        this.generalService.getGeneral().subscribe(data => {
            this.generalData = data;
            this.generalForm.patchValue(this.generalData);
            console.log(this.generalData);
        });
    }

    // TODO: Implement updateGeneralData method
    updateGeneralData() {
        if (this.generalForm.valid) {

            this.generalService.updateGeneral(this.generalForm.value)
                .subscribe(
                    data => {
                        this.generalData = data;
                        console.log("General data updated successfully", this.generalData);
                    },
                    error => {
                        console.log('Error', error);
                    }
                );
        }
    }
}