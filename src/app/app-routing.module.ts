import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {AuthGuardService} from './_services/auth-guard.service';
import {LoginGuardService} from './_services/login-guard.service';
import {DashboardComponent} from './_view/dashboard/dashboard.component';
import {RegisterComponent} from './pages/register/register.component';
import {ShortLinkComponent} from './pages/short-link/short-link.component';
import {ConfirmUserComponent} from './pages/confirm-user/confirm-user.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/main/dashboard',
                pathMatch: 'full'
            },
            {
                path: 'main',
                component: AppMainComponent,
                // canActivate: [AuthGuardService],
                children: [
                    {
                        path: 'dashboard',
                        component: DashboardComponent
                    },
                ]
            },
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent, canActivate: [LoginGuardService]},
            {path: 'register', component: RegisterComponent, canActivate: [LoginGuardService]},
            {path: 'confirm/:key', component: ConfirmUserComponent, canActivate: [LoginGuardService]},
            {path: 'short/:key', component: ShortLinkComponent, canActivate: [LoginGuardService]},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
