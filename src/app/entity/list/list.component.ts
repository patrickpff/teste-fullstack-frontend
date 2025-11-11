import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { EntityService } from '../entity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  providers: [
      provideIcons({heroPlus})
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  entities: any[] = []
  error: any;
  loading=false;

  constructor(private entityService: EntityService, private router: Router) {}

  ngOnInit () {
    this.entityService.getAll().subscribe({
      next: (data) => (this.entities = data),
      error: (err) => (this.error = err.message || 'Error to load entities'),
      complete: () => (this.loading = false)
    })
  }

  newEntity = () => {}
}
