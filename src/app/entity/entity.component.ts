import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { AuthService } from '../core/services/auth.service';
import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-entity',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIconComponent, ReactiveFormsModule],
  providers: [],
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.css'
})
export class EntityComponent {
  sidebarOpen = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toogleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
