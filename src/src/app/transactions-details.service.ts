import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TransactionsDetailsService {
  private btcTxCheckUrl = 'https://api.blockcypher.com/v1/btc/main/txs';  // URL to web api

  constructor(private http: HttpClient) {}

  /** GET from the server specific BTC transaction details by transaction hash */
  public getTransactionDetails(hash: string): Observable<any> {
    return this.http.get(`${this.btcTxCheckUrl}/${hash}`)
  }
}