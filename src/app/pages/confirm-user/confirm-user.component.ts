import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../_services/api.service';
import {GlobalService} from '../../_services/global.service';

@Component({
    selector: 'app-confirm-user',
    templateUrl: './confirm-user.component.html',
    styleUrls: ['./confirm-user.component.scss']
})
export class ConfirmUserComponent implements OnInit {
    key;
    valid = false;
    msg = false;
    blockedPanel = false;
    password = '';

    constructor(private activatedRoute: ActivatedRoute,
                private apiService: ApiService,
                private router: Router,
                private globalService: GlobalService) {
        this.activatedRoute.params.subscribe(params => {
            this.key = params.key;
            console.log(this.key);
            this.checkVerification();
        });
    }

    ngOnInit(): void {

    }

    checkVerification() {
        this.blockedPanel = true;
        this.apiService.checkVerification(this.key).subscribe(response => {
            this.valid = response.valid;
            this.msg = response.description;
            this.blockedPanel = false;
        }, error => {
            this.blockedPanel = false;
        });
    }

    setPassword() {
        this.blockedPanel = true;
        this.apiService.setPassword(this.password, this.key).subscribe(response => {
            this.blockedPanel = false;
            if (response.valid) {
                this.router.navigate(['/login']);
            } else {
                this.globalService.showError(response.description);
            }
        }, error => {
            this.globalService.showError(error.error.message);
            this.blockedPanel = false;
        });
    }
}
