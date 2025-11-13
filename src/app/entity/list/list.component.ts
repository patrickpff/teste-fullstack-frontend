import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlus, heroTrash, heroPencilSquare } from '@ng-icons/heroicons/outline';
import { EntityService } from '../services/entity.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgIconComponent, CommonModule, RouterLink, RouterOutlet, FormComponent],
  providers: [
      provideIcons({ heroPlus, heroTrash, heroPencilSquare })
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
    this.loading = true;
    this.entityService.getAll().subscribe({
      next: (data) => (this.entities = data),
      error: (err) => (this.error = err.message || 'Error to load entities'),
      complete: () => (this.loading = false)
    })
  }

  onEdit = (id: number) => {
    this.router.navigate(['/entity/edit', id])
  }

  onDelete = (id: number) => {
    if(confirm('Tem certeza que deseja excluir esta entidade?')) {
      this.entityService.delete(id).subscribe({
        next: () => {
          this.entities = this.entities.filter(entity => entity.id !== id)
        },
        error: (err) => {
          console.error('Erro ao excluir entidade', err)
          alert('Erro ao excluir entidade')
        }
      })
    }
  }
}
