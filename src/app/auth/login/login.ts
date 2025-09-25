import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginData: LoginData = {
    email: '',
    password: '',
    rememberMe: false
  };

  showPassword = false;
  isLoading = false;
  loginError = '';

  constructor(private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    if (!this.loginData.email || !this.loginData.password) {
      this.loginError = 'Please fill in all required fields';
      return;
    }

    this.isLoading = true;
    this.loginError = '';

    // Simulate API call
    setTimeout(() => {
      // Mock authentication
      if (this.loginData.email === 'demo@paisasplit.com' && this.loginData.password === 'demo123') {
        // Success - redirect to dashboard
        this.router.navigate(['/dashboard']);
      } else if (this.loginData.email === 'admin@paisasplit.com' && this.loginData.password === 'admin123') {
        // Admin login - redirect to dashboard
        this.router.navigate(['/dashboard']);
      } else {
        // Show error
        this.loginError = 'Invalid email or password. Try demo@paisasplit.com with demo123';
      }
      this.isLoading = false;
    }, 1500);
  }

  loginWithGoogle(): void {
    this.isLoading = true;
    this.loginError = '';

    // Simulate Google OAuth
    setTimeout(() => {
      // Mock successful Google login
      this.router.navigate(['/dashboard']);
      this.isLoading = false;
    }, 2000);
  }

  loginWithFacebook(): void {
    this.isLoading = true;
    this.loginError = '';

    // Simulate Facebook OAuth
    setTimeout(() => {
      // Mock successful Facebook login
      this.router.navigate(['/dashboard']);
      this.isLoading = false;
    }, 2000);
  }
}
