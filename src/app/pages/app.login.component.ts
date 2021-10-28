import {Component} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html',
})
export class AppLoginComponent {
    username;
    password;

    constructor(private authenticationService: AuthenticationService,
                public router: Router) {
        console.log("aaaaaaaaaaaaaaaa")
    }

    login() {
        this.authenticationService.login(this.username, this.password);
    }
}
