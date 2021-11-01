import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {MessageService} from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private router: Router, private authenticationService: AuthenticationService,
                private messageService: MessageService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const reqWithCredentials = req.clone({withCredentials: true});

        return next.handle(reqWithCredentials)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 200) {
                        return;
                    }

                    let errorMessage = '';

                    if (error && error.error) {
                        errorMessage = error.error.message;
                    }

                    switch (error.status) {
                        case 401:
                            // this.authenticationService.logout2();
                            break;
                        case 403:
                            // this.authenticationService.logout2();
                            break;
                        case 500:
                            // this.notifier.showError('Server Error');
                            break;
                    }

                    /*this.messageService.add({
                        severity: 'error',
                        summary: 'დაფიქსირდა შეცდომა',
                        detail: errorMessage,
                        key: 'toastError'
                    });*/
                    return throwError(error);
                })
            );
    }
}
