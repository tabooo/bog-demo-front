import {Component} from '@angular/core';
import {AppMainComponent} from '../app.main.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AppComponent} from '../app.component';
import {AuthenticationService} from '../_services/authentication.service';
import {decode} from '../_helper/json-util';
import {UserDTO} from '../_model/UserDTO';
import {Router} from '@angular/router';

@Component({
    selector: 'app-inline-profile',
    template: `
        <div class="user-profile">
            <a href="#" (click)="onProfileClick($event)" id="sidebar-profile-button">
                <img src="assets/layout/images/icon-profile.png" alt="" style="margin-left: 80px;"/>
                <span class="sidebar-profile-name" *ngIf="user">{{user?.userName}}</span>

            </a>
            <span class="sidebar-profile-role" *ngIf="!user">
                <a href="#" (click)="openLoginPage($event)"><b>ავტორიზაცია</b></a>
            </span>

            <ul id="sidebar-usermenu" class="usermenu" [ngClass]="{'usermenu-active':app.usermenuActive}"
                [@menu]="app.isSlim()? app.usermenuActive ? 'visible' : 'hidden' :
                app.usermenuActive ? 'visibleAnimated' : 'hiddenAnimated'">
                <li #profile [ngClass]="{'menuitem-active':app.activeProfileItem === profile}" *ngIf="user">
                    <a href="#" (click)="onProfileItemClick($event,profile)">
                        <i class="pi pi-fw pi-user"></i>
                        <span class="topbar-item-name">პროფილი</span>
                    </a>
                </li>
                <li #profile [ngClass]="{'menuitem-active':app.activeProfileItem === profile}" *ngIf="user">
                    <a href="#" (click)="logout()">
                        <i class="pi pi-fw pi-sign-out"></i>
                        <span class="topbar-item-name">{{ 'LOGOUT' | translate }}</span>
                    </a>
                </li>
            </ul>
        </div>
    `,
    animations: [
        trigger('menu', [
            state('hiddenAnimated', style({
                height: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            state('visible', style({
                height: '*'
            })),
            state('hidden', style({
                height: '0px'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppProfileComponent {
    user: UserDTO;
    countsObject: any;

    constructor(public app: AppMainComponent,
                private appComponent: AppComponent,
                private authenticationService: AuthenticationService,
                private router: Router) {
        this.user = decode(localStorage.getItem(this.authenticationService.LOCAL_STORAGE_KEY));
        authenticationService.user.subscribe(value => {
            this.user = value;
        });
        authenticationService.countsObject.subscribe(value => {
            this.countsObject = value;
        });
    }

    onProfileClick(event) {
        this.app.usermenuClick = true;
        this.app.usermenuActive = !this.app.usermenuActive;
        event.preventDefault();
    }

    logout() {
        this.authenticationService.logout();
    }

    onProfileItemClick(event, item) {
        this.app.usermenuClick = true;
        if (this.app.activeProfileItem === item) {
            this.app.activeProfileItem = null;
        } else {
            this.app.activeProfileItem = item;
        }

        this.router.navigate(['/main/profile']);
        event.preventDefault();
    }

    onProfileSubItemClick(event) {
        event.preventDefault();
    }

    switchLanguage(lang) {
        this.appComponent.switchLang(lang);
    }

    openLoginPage(event) {
        this.router.navigate(['/login']);
        event.preventDefault();
    }
}
