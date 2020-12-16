import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
dollarAPI=environment.dollarAPI;
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
  return this.http.get(`https://cors-anywhere.herokuapp.com/https://api.codebazan.ir/arz/?type=arz`);
  // return this.http.get(`https://cors-anywhere.herokuapp.com/`+this.dollarAPI);
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