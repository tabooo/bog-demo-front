import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {decode, encode} from '../_helper/json-util';
import {ApiService} from './api.service';
import {MessageService} from 'primeng/api';
import {UserDTO} from '../_model/UserDTO';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    readonly LOCAL_STORAGE_KEY = 'userData';

    private userSubject: BehaviorSubject<UserDTO>;
    public user: Observable<UserDTO>;
    public countsObject = new Subject();

    constructor(
        private http: HttpClient,
        private router: Router,
        private apiService: ApiService,
        private messageService: MessageService) {

        this.userSubject = new BehaviorSubject<UserDTO>(decode(localStorage.getItem(this.LOCAL_STORAGE_KEY)));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): UserDTO {
        return this.userSubject.value;
    }

    // TODO [I.G]
    updateUserData(userObj: any) {
        const userData: UserDTO = decode(localStorage.getItem(this.LOCAL_STORAGE_KEY));

        if (!userData) {
            return;
        }

        const updated: UserDTO = {
            ...userData,
            ...userObj
        };

        localStorage.setItem(this.LOCAL_STORAGE_KEY, encode(updated));
        this.userSubject.next(updated);
    }

    login(username: string, password: string) {
        const request = {
            username,
            password,
        };
        this.apiService.login(username, password).subscribe(response => {
            localStorage.setItem(this.LOCAL_STORAGE_KEY, encode(response));
            this.userSubject.next(response);

            this.router.navigate(['main/dashboard']);
        });
        /*this.http.post<UserDTO>(`${environment.apiUrl}/rest/api/auth/login?username=${username}&password=${password}`, {})
            .subscribe(response => {
                localStorage.setItem(this.LOCAL_STORAGE_KEY, encode(response));
                this.userSubject.next(response);
                this.router.navigate(['main']);
            });*/
    }

    logout() {
        this.userSubject.next(null);
        localStorage.removeItem(this.LOCAL_STORAGE_KEY);
        localStorage.clear();
        // this.router.navigate(['/login']);

        this.apiService.logout().subscribe(response => {
            window.location.href = window.location.origin;
            // this.router.navigate(['/login']);
        }, error => {
            // this.router.navigate(['/login']);
        });
    }

    logout2() {
        this.userSubject.next(null);
        localStorage.removeItem(this.LOCAL_STORAGE_KEY);
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    getUser() {
        const userData: UserDTO = decode(localStorage.getItem(this.LOCAL_STORAGE_KEY));
        /*if (userData == null) {
            this.logout2();
            return;
        }*/
        this.apiService.getSessionData().subscribe(response => {
            if (response) {
            }
        }, error => {
            if (error.status === 403) {
                this.userSubject.next(null);
                localStorage.removeItem(this.LOCAL_STORAGE_KEY);
                localStorage.clear();
            }
        });
    }
}
