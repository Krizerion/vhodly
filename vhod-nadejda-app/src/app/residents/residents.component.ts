import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Apartment {
  number: number | null;
  debt: number;
}

interface Floor {
  number: number;
  apartments: Apartment[];
}

interface Announcement {
  id: number;
  message: string;
  date?: string;
  icon: string;
}

@Component({
  selector: 'vn-residents',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './residents.component.html',
  styleUrl: './residents.component.scss',
})
export class ResidentsComponent {
  // Important announcements (will be loaded from CSV/Excel later)
  announcements: Announcement[] = [
    {
      id: 1,
      message: 'Следващо събрание на входа: 15.03.2024 г. в 18:00 ч.',
      icon: 'event',
    },
    // Add more announcements as needed
  ];

  // Account balances (will be loaded from CSV/Excel later)
  currentExpensesBalance: number = 0;
  repairsBalance: number = 0;

  // Apartment data structure (will be loaded from CSV/Excel later)
  floors: Floor[] = [
    {
      number: 8,
      apartments: [
        { number: 136, debt: 0 },
        { number: 137, debt: 0 },
        { number: 138, debt: 0 },
      ],
    },
    {
      number: 7,
      apartments: [
        { number: 133, debt: 0 },
        { number: 134, debt: 0 },
        { number: 135, debt: 0 },
      ],
    },
    {
      number: 6,
      apartments: [
        { number: 130, debt: 0 },
        { number: 131, debt: 0 },
        { number: 132, debt: 0 },
      ],
    },
    {
      number: 5,
      apartments: [
        { number: 127, debt: 0 },
        { number: 128, debt: 0 },
        { number: 129, debt: 0 },
      ],
    },
    {
      number: 4,
      apartments: [
        { number: 124, debt: 0 },
        { number: 125, debt: 0 },
        { number: 126, debt: 0 },
      ],
    },
    {
      number: 3,
      apartments: [
        { number: 121, debt: 0 },
        { number: 122, debt: 0 },
        { number: 123, debt: 0 },
      ],
    },
    {
      number: 2,
      apartments: [
        { number: 118, debt: 0 },
        { number: 119, debt: 0 },
        { number: 120, debt: 0 },
      ],
    },
    {
      number: 1,
      apartments: [
        { number: 116, debt: 0 },
        { number: null, debt: 0 },
        { number: 117, debt: 0 },
      ],
    },
  ];
}
