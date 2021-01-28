import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class DataService {

    constructor(private http: HttpClient
    ) {
    }
    // Dynamic data service
    public getAll<T>(apiUrl: string): Observable<T> {
        return this.http.get<T>(apiUrl)

    }

    public getSingle<T>(id: string, apiUrl: string): Observable<T> {
        return this.http.get<T>(apiUrl + id);
    }

    public add<T>(apiUrl: string, itemName: any): Observable<T> {
        return this.http.post<T>(apiUrl, itemName);
    }

    public update<T>(id: string, apiUrl: string, itemToUpdate: any): Observable<T> {
        return this.http.put<T>(apiUrl, itemToUpdate);
    }

    public delete<T>(id: string, apiUrl: string): Observable<T> {
        return this.http.delete<T>(apiUrl);
    }

}







