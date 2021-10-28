import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    blockUi = new Subject();
    location: Location;

    constructor(private messageService: MessageService,
                private locationService: Location,
                private router: Router) {
        this.location = locationService;
    }

    showSuccess(message: string) {
        this.messageService.add({
            key: 'toastError',
            severity: 'success',
            summary: 'წარმატება',
            detail: message,
            life: 5000
        });
    }

    showError(message: string): void {
        this.messageService.add({
            key: 'toastError',
            severity: 'error',
            summary: 'შეცდომა',
            detail: message,
            life: 5000
        });
    }

    onBlockUI(bool: boolean) {
        this.blockUi.next(bool);
    }

    createUrl(data, params) {
        const url = this.router.createUrlTree(data, {queryParams: params}).toString();
        this.location.go(url);
    }

    redirectTo(uri: string) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate([uri]));
    }
}
