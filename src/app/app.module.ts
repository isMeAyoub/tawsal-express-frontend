import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
// Auth
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// Language
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

import {initFirebaseBackend} from './authUtils';

import {AppRoutingModule} from './app-routing.module';
import {LayoutsModule} from "./layouts/layouts.module";
import {PagesModule} from "./pages/pages.module";
import {AppComponent} from './app.component';

import {environment} from '../environments/environment';


export function createTranslateLoader(http: HttpClient): any {
    return new TranslateHttpLoader(
        http,
        'assets/i18n/',
        '.json'
    );
}



@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        TranslateModule.forRoot({
            /**
             *  Set the default language for translation files, and set the current language.
             */
            defaultLanguage: 'fr',
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        BrowserAnimationsModule,
        HttpClientModule,
        BrowserModule,
        /*==============================*/
        AppRoutingModule,
        /*==============================*/
        LayoutsModule,
        PagesModule
    ],
    providers: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
