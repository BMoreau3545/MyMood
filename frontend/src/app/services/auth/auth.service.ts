import { Injectable } from '@angular/core'; // Importation du décorateur Injectable d'Angular
import { HttpClient } from '@angular/common/http'; // Importation du module HttpClient pour effectuer des requêtes HTTP
import { Router } from '@angular/router'; // Importation du service de routage de l'application
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root' // Fournit ce service à la racine de l'application, ce qui signifie qu'il sera un singleton
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // URL de l'API

  private user?: {
    id: number,
    role: 'student' | 'supervisor' | 'admin',
  };

  constructor(private router: Router, private http: HttpClient) { } // Injection des services nécessaires   

  async login(email: string, password: string): Promise<'student' | 'supervisor' | 'admin' | 'internal_error' | 'wrong_credentials'> {
    const response = await fetch(`${this.apiUrl}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 401) {
      return 'wrong_credentials';
    }
    
    let body;
    try {
      body = await response.json();
    } catch {
      return 'internal_error';
    }

    if (!response.ok || !('role' in body) || !('id' in body)) {
      return 'internal_error';
    }

    if ((body.role === 'student' || body.role === 'supervisor' || body.role === 'admin') && typeof body.id === 'number' && Number.isSafeInteger(body.id)) {
      this.user = { id: body.id, role: body.role };
      return body.role;
    }

    return 'internal_error';
  }

  async logout() {
    this.user = undefined;
    await firstValueFrom(this.http.delete(`${this.apiUrl}/logout`));
    this.router.navigate(['']); // Redirige vers la page d'accueil
  }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  getRole(): 'student' | 'supervisor' | 'admin' | undefined {
    return this.user?.role;
  }
}