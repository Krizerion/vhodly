import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Announcement, Floor, AccountBalances } from './interfaces';
import { CsvDataService } from './csv-data.service';
import {
  announcements as staticAnnouncements,
  accountBalances as staticAccountBalances,
} from './residents.data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private csvData = inject(CsvDataService);

  /**
   * Load all data:
   * - Announcements and Balances from constants (manually updated)
   * - Floors/Apartments from CSV file
   */
  loadData(): Observable<{
    announcements: Announcement[];
    accountBalances: AccountBalances;
    floors: Floor[];
  }> {
    return this.csvData.loadFloors().pipe(
      map((floors) => ({
        announcements: staticAnnouncements,
        accountBalances: staticAccountBalances,
        floors,
      }))
    );
  }
}
