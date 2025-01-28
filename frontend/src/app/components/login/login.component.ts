import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:3000/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe((response: any) => {
      if (response.success) {
        this.authService.setRole(response.role);
        if (response.role === 'student') {
          this.router.navigate(['/student']);
        } else if (response.role === 'supervisor') {
          this.router.navigate(['/supervisor']);
        } else if (response.role === 'admin') {
          this.router.navigate(['/admin']);
        }
      } else {
        alert('Invalid email or password');
      }
    });
  }

}
