import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;
  loginResponse:any;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
                // Assuming the data is within a "result" field in the response
        if (Array.isArray(response)) {
          this.loginResponse = response; // Direct array response
        } else if (response && response.result) {
          this.loginResponse = response.result; // Nested structure
        }
        if (this.loginResponse && this.loginResponse[0].user_name == this.username) {
          // Store the token or authentication details
          localStorage.setItem('username',this.username);
          localStorage.setItem('password', this.password);
    
          // Redirect to exam list or dashboard
          this.router.navigate(['/exam-list']);
        } else {
          this.errorMessage = response.message || 'Invalid credentials.';
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        this.errorMessage = 'Login failed. Please try again.';
        console.error('Login error:', error);
        this.isSubmitting = false;
      },
    });
  }
}
