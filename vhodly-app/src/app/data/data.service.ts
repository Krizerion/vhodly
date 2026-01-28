import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import type {
  AccountBalances,
  Announcement,
  Bill,
  Floor,
  Transaction,
} from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  /**
   * Load all data:
   * - Announcements and Balances from API
   * - Floors/Apartments from API
   */
  loadData(): Observable<{
    announcements: Announcement[];
    accountBalances: AccountBalances;
    floors: Floor[];
  }> {
    return this.http.get<{
      announcements: Announcement[];
      accountBalances: AccountBalances;
      floors: Floor[];
    }>(`${this.apiUrl}/data/load`);
  }

  /**
   * Load bills from API
   */
  loadBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.apiUrl}/bills`);
  }

  /**
   * Load transactions for a specific bill
   */
  loadTransactions(billId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.apiUrl}/bills/${billId}/transactions`,
    );
  }

  /**
   * Load transactions for a specific account type
   */
  loadAccountTransactions(
    accountType: 'currentExpenses' | 'repairs',
  ): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.apiUrl}/accounts/${accountType}/transactions`,
    );
  }
}
