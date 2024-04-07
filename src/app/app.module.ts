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

import {FakeBackendInterceptor} from './core/helpers/fake-backend';
import {ErrorInterceptor} from './core/helpers/error.interceptor';
import {JwtInterceptor} from './core/helpers/jwt.interceptor';
import {environment} from '../environments/environment';


export function createTranslateLoader(http: HttpClient): any {
    return new TranslateHttpLoader(
        http,
        'assets/i18n/',
        '.json'
    );
}

if (environment.defaultauth === 'firebase') {
    initFirebaseBackend(environment.firebaseConfig);
} else {
    FakeBackendInterceptor;
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
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor, multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: FakeBackendInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
