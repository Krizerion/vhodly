import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'vn-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  stats = [
    {
      title: 'Общо имоти',
      value: '0',
      icon: 'home',
      color: 'primary',
      change: '+0',
    },
    {
      title: 'Активни жители',
      value: '0',
      icon: 'people',
      color: 'accent',
      change: '+0',
    },
    {
      title: 'Изчакващи поддръжка',
      value: '0',
      icon: 'build',
      color: 'warn',
      change: '0',
    },
    {
      title: 'Месечен приход',
      value: '€0',
      icon: 'attach_money',
      color: 'primary',
      change: '+0%',
    },
  ];

  recentActivities = [
    {
      type: 'payment',
      title: 'Получено плащане',
      description: 'Апартамент 101 - €5,000',
      time: 'преди 2 часа',
    },
    {
      type: 'maintenance',
      title: 'Заявка за поддръжка',
      description: 'Апартамент 205 - Проблем с водопровод',
      time: 'преди 5 часа',
    },
    {
      type: 'resident',
      title: 'Нов жител',
      description: 'Апартамент 302 - Иван Иванов',
      time: 'преди 1 ден',
    },
  ];
}
