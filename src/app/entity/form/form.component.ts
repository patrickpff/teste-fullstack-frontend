import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EntityService } from '../services/entity.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionService } from '../services/region.service';
import { Region } from '../../models/region.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  isEdit: boolean = false;
  regions: Region[] = [];
  error: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private entityService: EntityService,
    private regionService: RegionService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.loading = true
      this.form = this.fb.group({
        corporate_name: ['', Validators.required],
        trade_name: ['', Validators.required],
        cnpj: ['', Validators.required],
        inauguration_date: ['', Validators.required],
        active: [true],
        region_id: ['', Validators.required]
      });

      this.loadRegions()
      
      const idParameter = this.route.snapshot.paramMap.get('id');

      if(idParameter) {
        this.isEdit = true
        this.id = +idParameter
        this.loadEntity()
      }
  }

  loadEntity() {
    this.form.disable()
    this.loading = true;
    this.entityService.getById(this.id).subscribe({
      next: (entity) => {
        this.form.patchValue(entity)
        this.form.enable()
        this.loading = false
      },
      error: (err) => {
        console.error(err)
        this.error = 'Erro ao carregar entidade'
        this.loading = false
      }
    })
  }

  loadRegions(): void {
    this.regionService.getAll().subscribe({
      next: (data) => {
        this.regions = data
        this.loading = false
      },
      error: (err) => {
        this.error = err.message || "Erro ao carregar regiões."
        this.loading = false
      }
    })
  }

  onCnpjInput(event: Event) {
    const input = event.target as HTMLInputElement
    let value = input.value.replace(/\D/g, '')

    if (value.length > 14) value = value.slice(0, 14)
    
    if (value.length <= 2) value = value.replace(/(\d{1,2})/, '$1')
    else if (value.length <= 5) value = value.replace(/(\d{2})(\d{1,3})/, '$1.$2')
    else if (value.length <= 8) value = value.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3')
    else if (value.length <= 12) value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{1,4})/, '$1.$2.$3/$4')
    else value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5')

    input.value = value
    this.form.get('cnpj')?.setValue(value, { emitEvent: false })
  }

  submit = () => {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    const entity = this.form.value
    this.loading = true

    if (this.isEdit) {
      this.entityService.update(this.id, entity).subscribe({
        next: () => this.router.navigate(['/entity']),
        error: (err) => console.error("Erro ao atualizar entidade:", err)
      })
    } else {
      this.entityService.store(entity).subscribe({
        next: () => this.router.navigate(['/entity']),
        error: (err) => console.error('Erro ao criar entidade', err)
      })
    }
  }
}
