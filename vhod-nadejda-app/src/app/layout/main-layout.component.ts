import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vn-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  isSidenavOpen = window.innerWidth > 768;

  menuItems = [
    { path: '/dashboard', label: 'Табло', icon: 'dashboard' },
    { path: '/properties', label: 'Имоти', icon: 'home' },
    { path: '/residents', label: 'Жители', icon: 'people' },
    { path: '/maintenance', label: 'Поддръжка', icon: 'build' },
    { path: '/payments', label: 'Плащания', icon: 'payment' },
    { path: '/notifications', label: 'Известия', icon: 'notifications' },
    { path: '/settings', label: 'Настройки', icon: 'settings' },
  ];

  get sidenavMode(): 'side' | 'over' {
    return window.innerWidth > 768 ? 'side' : 'over';
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
