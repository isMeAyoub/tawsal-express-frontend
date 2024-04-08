import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

    breadCrumbItems!: Array<{}>;

    constructor() {
    }

    ngOnInit(): void {

        this.breadCrumbItems = [
            {label: 'Tawsal Express'},
            {label: 'Accueil', active: false}
        ];
    }

}
