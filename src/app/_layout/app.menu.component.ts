import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppMainComponent} from '../app.main.component';
import {AuthenticationService} from '../_services/authentication.service';
import {decode} from '../_helper/json-util';
import {UserDTO} from '../_model/UserDTO';

@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true">
            </li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit, OnDestroy {
    user: UserDTO;
    model: any[] = [];
    countsObject: any = {count: 0};
    countsObjectSubscription;

    constructor(public app: AppMainComponent,
                private authenticationService: AuthenticationService) {
        this.countsObjectSubscription = authenticationService.countsObject.subscribe(value => {
            this.countsObject = value;
            this.model = [];
            this.drawMenu();
        });
    }

    ngOnInit() {
        this.user = decode(localStorage.getItem(this.authenticationService.LOCAL_STORAGE_KEY));
        this.drawMenu();
    }

    ngOnDestroy() {
        this.countsObjectSubscription.unsubscribe();
    }

    drawMenu() {
        this.model.push({label: 'მთავარი გვერდი', icon: 'pi pi-fw pi-users', routerLink: ['/main/dashboard']});
    }
}
