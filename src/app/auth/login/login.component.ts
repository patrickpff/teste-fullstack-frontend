import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroEye, heroEyeSlash } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgIconComponent
  ],
  providers: [
    AuthService,
    provideIcons({heroEye, heroEyeSlash})
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = null;

    const {username, password} = this.loginForm.value;
    
    this.authService.login(username, password).subscribe({
      next: () => this.router.navigate(['/entity']),
      error: (err) => {
        if (err.error?.message) {
          this.error = err.error.message;
        } else {
          this.error = "Un unexpected error has occourred."
        }
        this.loading = false;
      },
      complete: () => (this.loading = false),
    })
  }
}
