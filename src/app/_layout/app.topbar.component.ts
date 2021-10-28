import {Component} from '@angular/core';
import {AppComponent} from '../app.component';
import {AppMainComponent} from '../app.main.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    currentLang = '';

    constructor(public app: AppComponent, public appMain: AppMainComponent,
                public translate: TranslateService) {
        this.currentLang = this.translate.currentLang;
        this.translate.onLangChange.subscribe(response => {
            this.currentLang = response.lang;
        });
    }
}
