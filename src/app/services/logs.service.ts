import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface LogsApiResponse {
  logs: any[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private apiUrl = 'http://localhost:3001/logs';

  constructor(private _http: HttpClient) { }

  addLogs(data: any): Observable<any> {
    return this._http.post<any>(this.apiUrl, data);
  }

  getLogsList(from: number, size: number): Observable<LogsApiResponse> {
    let params = new HttpParams();
    params = params.set('from', from.toString());
    params = params.set('size', size.toString());

    return this._http.get<LogsApiResponse>(this.apiUrl, { params });
  }
}
