import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { EntityService } from '../services/entity.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgIconComponent, CommonModule, RouterLink, RouterOutlet, FormComponent],
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
    console.log("Load entities")
    this.entityService.getAll().subscribe({
      next: (data) => (this.entities = data),
      error: (err) => (this.error = err.message || 'Error to load entities'),
      complete: () => (this.loading = false)
    })
  }

  newEntity = () => {}
}
