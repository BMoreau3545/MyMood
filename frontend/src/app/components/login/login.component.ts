import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error?: string;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  async onSubmit() {
    const result = await this.authService.login(this.email, this.password);
    if (result === 'student') {
      this.router.navigate(['/student']);
    } else if (result === 'supervisor') {
      this.router.navigate(['/supervisor']);
    } else if (result === 'admin') {
      this.router.navigate(['/admin']);
    } else if (result === 'wrong_credentials') {
      this.error = 'Wrong credentials!';
    } else if (result === 'internal_error') {
      this.error = 'Internal server error!';
    }
  }
}
