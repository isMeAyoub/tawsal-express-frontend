import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// Component pages
import {AccueilComponent} from './accueil/accueil.component';
import {GeneralComponent} from "./parametres/general/general.component";
import {VillesLivraisonComponent} from "./parametres/villes-livraison/villes-livraison.component";
import {VillesRamassageComponent} from "./parametres/villes-ramassage/villes-ramassage.component";
import {ZonesComponent} from "./parametres/zones/zones.component";
import {TarifsComponent} from "./parametres/tarifs/tarifs.component";
import {ReclamationsComponent} from "./reclamations/reclamations.component";

const routes: Routes = [
    {
        path: "",
        component: AccueilComponent
    },
    {
        path: "parametres/general",
        component: GeneralComponent
    },
    {
        path: "parametres/villes-livraison",
        component: VillesLivraisonComponent
    },
    {
        path: "parametres/villes-ramassage",
        component: VillesRamassageComponent
    },
    {
        path: "parametres/regions",
        component: ZonesComponent
    },
    {
        path: "parametres/tarifs",
        component: TarifsComponent
    },
    {
        path: "reclamations",
        component: ReclamationsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
