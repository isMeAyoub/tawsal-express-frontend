import {Component, TemplateRef} from '@angular/core';

import {ToastService} from './toast-service';

@Component({
    selector: 'app-toasts',
    template: `
        <ngb-toast
                *ngFor="let toast of toastService.toasts"
                [class]="toast.classname"
                [autohide]="true"
                [delay]="toast.delay || 5000"
                (hidden)="toastService.remove(toast)"
        >
            <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
                <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
            </ng-template>

            <ng-template #text>{{ toast.textOrTpl }}</ng-template>
        </ngb-toast>
    `,
    host: {
        '[class.ngb-toasts]': 'true',
        '[style.top]': "'70px'",
        '[style.right]': "'10px'",
        '[style.position]': "'fixed'",
        '[style.z-index]': "'1060'",
        '[style.text-align]': "'center'",
    },
})
export class ToastsContainer {
    constructor(public toastService: ToastService) {
    }

    isTemplate(toast: { textOrTpl: any; }) {
        return toast.textOrTpl instanceof TemplateRef;
    }
}
