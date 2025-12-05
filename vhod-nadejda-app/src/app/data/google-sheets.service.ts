import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, forkJoin } from 'rxjs';
import { Announcement, Floor, AccountBalances, Apartment } from './interfaces';

interface GoogleSheetsResponse {
  values: string[][];
}

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetsService {
  private http = inject(HttpClient);

  // TODO: Replace with your Google Apps Script Web App URL
  // After deploying the Apps Script, you'll get a URL like:
  // https://script.google.com/macros/s/AKfycby.../exec
  // IMPORTANT: Use the FULL URL including /exec at the end
  private readonly APPS_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycby-RtgtogeK-nlJ_ZkS5goBGTPs1XeHwJIZullzjKt_hlO6i3TrFg7tGu7d26OsjiJGkw/exec';

  /**
   * Load all data from Google Sheets
   */
  loadData(): Observable<{
    announcements: Announcement[];
    accountBalances: AccountBalances;
    floors: Floor[];
  }> {
    return forkJoin({
      announcements: this.loadAnnouncements(),
      accountBalances: this.loadAccountBalances(),
      floors: this.loadFloors(),
    });
  }

  /**
   * Load announcements from 'Announcements' sheet
   * Expected format:
   * Row 1: Headers (ID, Message, Icon)
   * Row 2+: Data
   */
  private loadAnnouncements(): Observable<Announcement[]> {
    return this.getSheetDataAsCsv('Announcements').pipe(
      map((values) => {
        if (!values || values.length < 2) {
          console.warn('Announcements sheet has less than 2 rows');
          return [];
        }
        // Skip header row
        const announcements = values.slice(1).map((row, index) => ({
          id: parseInt(row[0] || `${index + 1}`, 10),
          message: row[1] || '',
          icon: row[2] || 'info',
        }));
        console.log(`Loaded ${announcements.length} announcements`);
        return announcements;
      })
    );
  }

  /**
   * Load account balances from 'Balances' sheet
   * Expected format:
   * Row 1: Headers (Account, Balance)
   * Row 2: Current Expenses, <amount>
   * Row 3: Repairs, <amount>
   */
  private loadAccountBalances(): Observable<AccountBalances> {
    return this.getSheetDataAsCsv('Balances').pipe(
      map((values) => {
        if (!values || values.length < 2) {
          console.warn('Balances sheet has less than 2 rows');
          return { currentExpensesBalance: 0, repairsBalance: 0 };
        }
        // Skip header row
        const rows = values.slice(1);
        let currentExpensesBalance = 0;
        let repairsBalance = 0;

        rows.forEach((row) => {
          const account = row[0]?.toLowerCase() || '';
          const balance = parseFloat(row[1] || '0');
          if (account.includes('текущи') || account.includes('current')) {
            currentExpensesBalance = balance;
          } else if (
            account.includes('ремонти') ||
            account.includes('repairs')
          ) {
            repairsBalance = balance;
          }
        });

        console.log(
          `Loaded balances: Current=${currentExpensesBalance}, Repairs=${repairsBalance}`
        );
        return { currentExpensesBalance, repairsBalance };
      })
    );
  }

  /**
   * Load floors and apartments from 'Apartments' sheet
   * Expected format:
   * Row 1: Headers (Floor, Apartment, Residents, RepairsFee, CurrentExpensesFee, TotalDebt, LastPaymentDate)
   * Row 2+: Data
   */
  private loadFloors(): Observable<Floor[]> {
    return this.getSheetDataAsCsv('Apartments').pipe(
      map((values) => {
        if (!values || values.length < 2) {
          console.warn('Apartments sheet has less than 2 rows');
          return [];
        }
        // Skip header row
        const rows = values.slice(1);

        // Group by floor
        const floorsMap = new Map<number, Apartment[]>();

        rows.forEach((row, index) => {
          const floorNum = parseInt(row[0] || '0', 10);
          if (floorNum === 0) {
            // Empty apartment slot - still add it
            if (!floorsMap.has(1)) {
              floorsMap.set(1, []);
            }
            // Try to find the last floor number from previous rows
            let lastFloor = 1;
            for (let i = index - 1; i >= 0; i--) {
              const prevFloor = parseInt(rows[i][0] || '0', 10);
              if (prevFloor > 0) {
                lastFloor = prevFloor;
                break;
              }
            }
            if (!floorsMap.has(lastFloor)) {
              floorsMap.set(lastFloor, []);
            }
            floorsMap.get(lastFloor)!.push({ number: null });
            return;
          }

          const aptNumber =
            row[1] && row[1].trim() ? parseInt(row[1], 10) : null;
          const residentsCount =
            row[2] && row[2].trim() ? parseInt(row[2], 10) : undefined;
          const repairsFee =
            row[3] && row[3].trim() ? parseFloat(row[3]) : undefined;
          const currentExpensesFee =
            row[4] && row[4].trim() ? parseFloat(row[4]) : undefined;
          const totalDebt =
            row[5] && row[5].trim() ? parseFloat(row[5]) : undefined;
          const lastPaymentDate = row[6] && row[6].trim() ? row[6] : undefined;

          const apartment: Apartment = {
            number: aptNumber,
            residentsCount,
            repairsFee,
            currentExpensesFee,
            totalDebt,
            lastPaymentDate,
          };

          if (!floorsMap.has(floorNum)) {
            floorsMap.set(floorNum, []);
          }
          floorsMap.get(floorNum)!.push(apartment);
        });

        // Convert map to array and sort by floor number
        const floors = Array.from(floorsMap.entries())
          .map(([number, apartments]) => ({ number, apartments }))
          .sort((a, b) => a.number - b.number);

        console.log(
          `Loaded ${floors.length} floors with ${rows.length} apartment rows`
        );
        return floors;
      })
    );
  }

  /**
   * Get data from a specific sheet using Google Apps Script
   * This avoids CORS issues and doesn't require an API key
   */
  private getSheetDataAsCsv(sheetName: string): Observable<string[][]> {
    const url = `${this.APPS_SCRIPT_URL}?sheet=${encodeURIComponent(
      sheetName
    )}`;
    console.log(`Fetching data from sheet: ${sheetName}`, url);

    // Use GET with proper headers for Google Apps Script
    // Note: Google Apps Script Web Apps handle CORS automatically when deployed correctly
    return this.http
      .get<GoogleSheetsResponse>(url, {
        headers: {
          Accept: 'application/json',
        },
      })
      .pipe(
        map((response) => {
          console.log(`Received data for ${sheetName}:`, response);

          if (!response.values || response.values.length === 0) {
            console.warn(`No data received for sheet: ${sheetName}`);
            return [];
          }

          // response.values is already a string[][]
          const result = response.values.filter((row) =>
            row.some((cell) => cell && cell.trim().length > 0)
          );

          console.log(
            `Loaded ${result.length} rows from sheet: ${sheetName}`,
            result
          );
          return result;
        })
      );
  }
}
