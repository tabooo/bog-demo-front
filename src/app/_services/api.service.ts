import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {
    }

    // AUTH

    login(username, password): Observable<any> {
        return this.http.get<any>(`/demo-java/rest/api/auth/login?username=${username}&password=${password}`, {});
    }

    logout(): Observable<any> {
        return this.http.get<any>(`/demo-java/rest/api/auth/logout`, {});
    }

    register(request): Observable<any> {
        return this.http.post<any>(`/demo-java/rest/api/auth/register`, request);
    }

    getSessionData(): Observable<any> {
        return this.http.get<any>(`/demo-java/rest/api/auth/session-data`, {});
    }

    checkVerification(key): Observable<any> {
        return this.http.get<any>(`/demo-java/rest/api/auth/check-verification?key=${key}`, {});
    }

    setPassword(password, key): Observable<any> {
        return this.http.post<any>(`/demo-java/rest/api/auth/set-password?password=${password}&key=${key}`, {});
    }

    // SHORT

    getShortUrl(key): Observable<any> {
        return this.http.get<any>(`/demo-java/rest/api/short/${key}`);
    }


    // PRODUCT

    saveProduct(request): Observable<any> {
        if (!request.id) {
            return this.http.post(`/demo-java/rest/api/product/save-product`, request);
        } else {
            return this.http.put(`/demo-java/rest/api/product/update-product`, request);
        }
    }

    searchProducts(request): Observable<any> {
        return this.http.get(`/demo-java/rest/api/product/search`, {params: request});
    }

    // FILE

    fileUpload(request): Observable<any> {
        return this.http.post(`/demo-java/rest/api/file/upload`, request);
    }

    getFile(fileId) {
        return `/demo-java/rest/api/file/files/${fileId}`;
    }
}
