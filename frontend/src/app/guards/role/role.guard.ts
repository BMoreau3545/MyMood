import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  // Injecte le service d'authentification
  const authService = inject(AuthService);
  // Injecte le service de routage
  const router = inject(Router);
  // Récupère les rôles attendus pour la route
  const expectedRoles = route.data['roles'];
  // Récupère le rôle de l'utilisateur à partir du service d'authentification
  const userRole = authService.getRole();

  // Vérifie si le rôle de l'utilisateur est inclus dans les rôles attendus
  if (expectedRoles.includes(userRole)) {
    return true; // Autorise l'accès à la route
  } else {
    router.navigate(['']); // Redirige vers la page d'accueil ou une autre page
    return false; // Refuse l'accès à la route
  }
};