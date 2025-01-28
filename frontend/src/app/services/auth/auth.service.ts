import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role: string = '';

  setRole(role: string) {
    this.role = role;
  }

  getRole(): string {
    return this.role;
  }

  isLoggedIn(): boolean {
    return this.role !== '';
  }

  constructor() { }
}
