import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  constructor(private http:HttpClient) { 
}
// options: {
//   headers?: HttpHeaders | {[header: string]: string | string[]},
//   observe?: 'body' | 'events' | 'response',
//   params?: HttpParams|{[param: string]: string | string[]},
//   reportProgress?: boolean,
//   responseType?: 'arraybuffer'|'blob'|'json'|'text',
//   withCredentials?: boolean,
// }

getInfo(currencyName:string): Observable<[CURRENCY]> {
    return this.http.get<[CURRENCY]>(`https://api.minerstat.com/v2/coins?list=${currencyName}`);
  }
getDoller(): Observable<any> {
  return this.http.get(`api/api?t=currency`);
  }
}


export interface CURRENCY
{
id: string,
coin: string,
name: string,
type: string,
algorithm: string,
network_hashrate: number,
difficulty: number,
reward: number,
reward_unit: string,
reward_block: number,
volume: number,
price: number
}