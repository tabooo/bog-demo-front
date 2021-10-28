import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from 'ngx-localstorage';
import {AuthenticationService} from './_services/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    theme = 'noir';

    layoutMode = 'static';

    megaMenuMode = 'gradient';

    menuMode = 'gradient';

    profileMode = 'inline';

    inputStyle = 'outlined';

    ripple: boolean;

    constructor(private primengConfig: PrimeNGConfig,
                private translate: TranslateService,
                private storageService: LocalStorageService,
                private authenticationService: AuthenticationService) {
        translate.addLangs(['ka', 'en', 'ru']);
        if (storageService.get('lang')) {
            translate.setDefaultLang(storageService.get('lang'));
        } else {
            translate.setDefaultLang('ka');
        }


        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('ka');

        this.getClient();
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.ripple = true;

        if (this.storageService.get('lang')) {
            this.switchLang(this.storageService.get('lang'));
        }
    }

    switchLang(lang: string) {
        this.translate.use(lang);
        this.storageService.set('lang', lang);
    }

    getClient() {
        this.authenticationService.getUser();
    }
}
