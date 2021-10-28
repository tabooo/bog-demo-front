import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../_services/api.service';

@Component({
    selector: 'app-short-link',
    templateUrl: './short-link.component.html',
    styleUrls: ['./short-link.component.scss']
})
export class ShortLinkComponent implements OnInit {
    key;
    blockedPanel = false;
    msg = '';

    constructor(private activatedRoute: ActivatedRoute,
                private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.key = params.key;
            this.getShortUrl();
        });
    }

    getShortUrl() {
        this.apiService.getShortUrl(this.key).subscribe(response => {
            window.location.href = response.description;
        }, error => {
            this.msg = error.error.message;
        });
    }

}
