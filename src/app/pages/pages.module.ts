import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CountToModule } from 'angular-count-to';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { LightboxModule } from 'ngx-lightbox';

// Load Icons
import { defineLordIconElement } from 'lord-icon-element';
import lottie from 'lottie-web';

// Pages Routing
import { PagesRoutingModule } from "./pages-routing.module";
import { SharedModule } from "../shared/shared.module";
import { WidgetModule } from '../shared/widget/widget.module';
import { AccueilComponent } from './accueil/accueil.component';
import { GeneralComponent } from './parametres/general/general.component';
import { VillesLivraisonComponent } from './parametres/villes-livraison/villes-livraison.component';
import { VillesRamassageComponent } from './parametres/villes-ramassage/villes-ramassage.component';
import { ZonesComponent } from './parametres/zones/zones.component';
import { TarifsComponent } from './parametres/tarifs/tarifs.component';
import {ToastsContainer} from "../shared/toast/toasts-container.component";

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AccueilComponent,
    GeneralComponent,
    VillesLivraisonComponent,
    VillesRamassageComponent,
    ZonesComponent,
    TarifsComponent,
    ToastsContainer
  ],
  imports: [
    CommonModule,
    NgbToastModule,
    FlatpickrModule.forRoot(),
    CountToModule,
    NgApexchartsModule,
    LeafletModule,
    NgbDropdownModule,
    SimplebarAngularModule,
    PagesRoutingModule,
    SharedModule,
    WidgetModule,
    SwiperModule,
    LightboxModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { 
  constructor() {
    defineLordIconElement(lottie.loadAnimation);
  }
}
