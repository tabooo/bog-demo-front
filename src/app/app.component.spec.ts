import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {AppBreadcrumbComponent} from './_layout/app.breadcrumb.component';
import {AppRightPanelComponent} from './_layout/app.rightpanel.component';
import {AppProfileComponent} from './_layout/app.profile.component';
import {AppFooterComponent} from './_layout/app.footer.component';
import {AppMenuComponent} from './_layout/app.menu.component';
import {AppMegamenuComponent} from './_layout/app.megamenu.component';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {PanelModule} from 'primeng/panel';
import {AppTopBarComponent} from './_layout/app.topbar.component';
import {BreadcrumbService} from './_services/app.breadcrumb.service';
import {MenuService} from './_services/app.menu.service';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, RouterTestingModule, TabViewModule, PanelModule, ButtonModule],
            declarations: [
                AppComponent,
                AppTopBarComponent,
                AppMenuComponent,
                AppMegamenuComponent,
                AppRightPanelComponent,
                AppProfileComponent,
                AppFooterComponent,
                AppBreadcrumbComponent
            ],
            providers: [BreadcrumbService, MenuService]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
